/**
 * Saves every screen view and every button press straight to your Supabase database
 * from her browser — no server of your own, and it NEVER loses an answer.
 *
 *   track({ type: "view",   screen: "decision" })
 *   track({ type: "choice", screen: "decision", choice: "yes", label: "Yes" })
 *
 * How it stays safe when the internet drops or the service is unreachable:
 *  1. Every event is written to a queue in her browser (localStorage) BEFORE anything is sent,
 *     together with the real time she pressed the button.
 *  2. The queue is sent strictly in order. An event leaves the queue only after the database
 *     confirms it saved it.
 *  3. If sending fails, it retries again and again (2s, 5s, 15s, 30s, then every minute),
 *     and instantly when the internet comes back or she returns to the tab.
 *  4. If she closes the page first, the queue is still there: it is sent the next time the
 *     site is opened in that browser.
 *  5. Each event has its own id (the table's primary key), so a resend is never counted twice.
 *
 * It never blocks the screens and never throws.
 */

import { TRANSITIONS } from "./flow";

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ""; // public key: it can only ADD rows (see supabase/setup.sql)
const ENABLED = Boolean(SUPABASE_URL && SUPABASE_KEY);

const OUTBOX_KEY = "rp-outbox"; // events waiting to be delivered (survives closing the tab)
const SESSION_KEY = "rp-session-key"; // one id per visit (per tab)
const MAX_QUEUE = 300;
const REQUEST_TIMEOUT_MS = 25000;
const RETRY_STEPS_MS = [2000, 5000, 15000, 30000, 60000];

let memoryQueue = []; // used only if localStorage is blocked
let memoryKey = null;
let running = null; // the delivery loop that is currently going
let retryTimer = null;
let failures = 0;
let warned = false;

const uid = () =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}-${Math.random().toString(36).slice(2, 12)}`;

/* ---------- the browser-side queue ---------- */
function readQueue() {
  try {
    const raw = localStorage.getItem(OUTBOX_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return memoryQueue;
  }
}

function writeQueue(queue) {
  memoryQueue = queue;
  try {
    localStorage.setItem(OUTBOX_KEY, JSON.stringify(queue));
  } catch {
    /* storage blocked → the memory copy still protects against a flaky connection */
  }
}

/* ---------- one id per visit, created locally (works with no internet) ---------- */
function getSessionKey() {
  if (memoryKey) return memoryKey;
  try {
    memoryKey = sessionStorage.getItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
  if (!memoryKey) {
    memoryKey = uid();
    try {
      sessionStorage.setItem(SESSION_KEY, memoryKey);
    } catch {
      /* ignore */
    }
  }
  return memoryKey;
}

/* ---------- delivery to Supabase (plain fetch, no SDK) ---------- */
function headers() {
  const h = {
    apikey: SUPABASE_KEY,
    "Content-Type": "application/json",
    Prefer: "return=minimal", // we only need "saved", not the row back
  };
  // legacy "anon" keys are JWTs and also go in Authorization; new "publishable" keys are not
  if (SUPABASE_KEY.startsWith("eyJ")) h.Authorization = `Bearer ${SUPABASE_KEY}`;
  return h;
}

// 'done'  → saved (201), or the database already has it (409 duplicate)
// 'drop'  → the database permanently refuses THIS row (400/422: bad data) — don't block the rest
// 'retry' → offline, service unreachable/paused, rate-limited, or a key/setup problem (401/403/404)
//           → keep it, try again later (nothing is lost while you fix the setup)
async function deliver(row) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/events`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(row),
      keepalive: true,
      signal: AbortSignal.timeout?.(REQUEST_TIMEOUT_MS),
    });
    if (res.ok || res.status === 409) return "done";
    if (res.status === 400 || res.status === 422) return "drop";
    return "retry";
  } catch {
    return "retry";
  }
}

async function run() {
  for (;;) {
    const queue = readQueue();
    if (!queue.length) {
      failures = 0;
      return;
    }

    const row = queue[0];
    const outcome = await deliver(row);

    if (outcome === "retry") {
      const wait = RETRY_STEPS_MS[Math.min(failures, RETRY_STEPS_MS.length - 1)];
      failures += 1;
      clearTimeout(retryTimer);
      retryTimer = setTimeout(flush, wait);
      return;
    }

    failures = 0;
    // re-read first: another tab may have added or delivered things meanwhile
    writeQueue(readQueue().filter((r) => r.event_id !== row.event_id));
  }
}

function flush() {
  if (!ENABLED) return Promise.resolve();
  if (!running) {
    running = run()
      .catch(() => {})
      .finally(() => {
        running = null;
      });
  }
  return running;
}

// "try right now": used when the internet returns, the tab is shown again, or the page opens
export function flushNow() {
  clearTimeout(retryTimer);
  return flush();
}

export function track(event) {
  if (!ENABLED) {
    if (!warned) {
      warned = true;
      console.warn(
        "Tracking is off: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.",
      );
    }
    return Promise.resolve();
  }

  const { type, screen, choice, label } = event;

  const queue = readQueue();
  queue.push({
    event_id: uid(),
    session_key: getSessionKey(),
    type,
    screen,
    choice: choice ?? null,
    label: label ?? null,
    to_screen: type === "choice" ? (TRANSITIONS[screen]?.[choice] ?? null) : null,
    happened_at: new Date().toISOString(), // the moment she actually pressed it, even if saved later
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
    language: navigator.language ?? null,
    user_agent: (navigator.userAgent || "").slice(0, 300) || null,
  });
  writeQueue(queue.slice(-MAX_QUEUE));
  return flush();
}

/* ---------- wake-up triggers ---------- */
if (typeof window !== "undefined") {
  window.addEventListener("online", flushNow);
  window.addEventListener("focus", flushNow);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") flushNow();
  });
  flushNow(); // send anything left over from an earlier visit
}
