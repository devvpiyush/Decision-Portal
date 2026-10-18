// External Modules
import { useEffect, useRef, useState } from "react";

// Local Modules
import Code from "./Code";

/* ---------- Small inline icons (no extra packages) ---------- */
const Svg = ({ children, className = "h-6 w-6" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const LockIcon = () => (
  <Svg className="h-7 w-7">
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <circle cx="12" cy="15.5" r="1.1" fill="currentColor" stroke="none" />
  </Svg>
);

const CheckIcon = () => (
  <Svg className="h-7 w-7">
    <path d="M5 12.5l4.5 4.5L19 7.5" strokeWidth="2.2" />
  </Svg>
);

const CrossIcon = () => (
  <Svg className="h-7 w-7">
    <path d="M7 7l10 10M17 7L7 17" strokeWidth="2.2" />
  </Svg>
);

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.6 4.5c2 0 3.6 1.1 4.4 2.6.8-1.5 2.4-2.6 4.4-2.6 3.6 0 5.7 3.8 4.2 7.3C19.5 16.4 12 21 12 21z" />
  </svg>
);

/* ---------- Status look & wording ---------- */
const STATUS = {
  idle: {
    badge: "from-rose-400 to-pink-500",
    glow: "bg-rose-300/60",
    icon: <LockIcon />,
    text: "text-rose-900/60",
  },
  success: {
    badge: "from-emerald-400 to-green-500",
    glow: "bg-emerald-300/60",
    icon: <CheckIcon />,
    text: "text-emerald-600",
    message: "Unlocked — welcome in",
  },
  error: {
    badge: "from-red-400 to-rose-600",
    glow: "bg-red-300/60",
    icon: <CrossIcon />,
    text: "text-red-500",
    message: "That doesn't match — try again",
  },
};

/**
 * Props:
 *  - secret / caseSensitive: the text she has to type
 *  - onSubmit:   called right when the correct code is typed
 *  - onWrong:    called every time a wrong code is typed (no text is passed along)
 *  - onUnlocked: called ~0.9s later, after the green "Unlocked" state (use it to navigate)
 */
function Secret({
  secret = "NISHTHA",
  caseSensitive = false,
  onSubmit,
  onWrong,
  onUnlocked,
}) {
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [attempt, setAttempt] = useState(0); // changing this clears the boxes
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleComplete = (code, isCorrect) => {
    clearTimeout(timer.current);
    if (isCorrect) {
      setStatus("success");
      onSubmit?.(code);
      timer.current = setTimeout(() => onUnlocked?.(code), 900);
    } else {
      setStatus("error");
      onWrong?.();
      // after a moment, clear the boxes so they can try again
      timer.current = setTimeout(() => {
        setAttempt((a) => a + 1);
        setStatus("idle");
      }, 1100);
    }
  };

  const s = STATUS[status];
  const subtext =
    s.message ?? `Enter the Secret Code written behind the Letter.`;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4">
      <div className="rp-rise pointer-events-auto relative w-full max-w-md overflow-hidden rounded-md bg-white px-6 pb-7 pt-10 text-center shadow-[0_30px_80px_-20px_rgba(190,40,100,0.45)] ring-1 ring-white/70 sm:px-10">
        {/* soft pink wash behind the badge */}
        <div className="pointer-events-none absolute -top-16 left-1/2 h-44 w-72 -translate-x-1/2 rounded-full bg-rose-100/80 blur-3xl" />

        {/* icon badge */}
        <div className="relative mx-auto h-16 w-16">
          <span
            className={`rp-pulse absolute inset-0 rounded-full blur-xl transition-colors duration-500 ${s.glow}`}
          />
          <div
            key={status}
            className={`rp-pop relative flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br text-white shadow-lg ring-4 ring-white transition-colors duration-500 ${s.badge}`}
          >
            {s.icon}
          </div>
        </div>

        {/* heading */}
        <h2 className="rp-bebas relative mt-5 pl-[0.3em] text-4xl font-normal tracking-[0.3em] text-rose-950 sm:text-5xl">
          SECRET CODE
        </h2>

        {/* divider with a little heart */}
        <div className="relative mx-auto mt-3 flex w-40 items-center gap-3 text-rose-400">
          <span className="h-px flex-1 bg-linear-to-r from-transparent to-rose-300" />
          <HeartIcon />
          <span className="h-px flex-1 bg-linear-to-l from-transparent to-rose-300" />
        </div>

        {/* subtext (changes with status) */}
        <p
          aria-live="polite"
          className={`relative mt-3 min-h-5 text-sm font-medium transition-colors duration-300 ${s.text}`}
        >
          {subtext}
        </p>

        {/* code boxes */}
        <div
          className={`relative mt-6 ${status === "error" ? "rp-shake" : ""}`}
        >
          <Code
            key={attempt}
            secret={secret}
            caseSensitive={caseSensitive}
            disabled={status === "success"}
            onComplete={handleComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default Secret;
