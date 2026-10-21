-- =====================================================================
--  Nishtha — save every answer straight from the browser (no backend)
--
--  Run this ONCE in Supabase:  SQL Editor → New query → paste → Run.
--
--  What it sets up
--   • events          one row per screen she opens / button she presses
--   • RLS (security)  the public key can ONLY ADD rows. It can never read,
--                     change or delete anything — so nobody (not even her)
--                     can see the answers except you, logged in to Supabase.
--   • timeline        every step in order, in plain English (for you)
--   • session_summary one line per visit: where she is, final answer, etc.
--   • choice_stats    every option pressed + how long she took to decide
-- =====================================================================

-- 1. The table ---------------------------------------------------------
create table if not exists public.events (
  event_id     text primary key check (char_length(event_id) between 8 and 64), -- made by her browser → a resend can never be stored twice
  session_key  text not null check (session_key ~ '^[A-Za-z0-9_-]{16,64}$'),    -- one id per visit
  type         text not null check (type in ('view', 'choice', 'unlock_failed', 'unlocked')),
  screen       text not null check (screen in ('unlock','decision','yes-confirm','yes-thanks','no-1','no-2','no-3','no-goodbye')),
  choice       text          check (choice in ('yes', 'no', 'confirm', 'change')),
  label        text          check (char_length(label) <= 80),                  -- the exact button text she pressed
  to_screen    text          check (to_screen in ('unlock','decision','yes-confirm','yes-thanks','no-1','no-2','no-3','no-goodbye')),
  happened_at  timestamptz not null,                                            -- when she REALLY pressed it (her device clock)
  received_at  timestamptz not null default now(),                              -- when it reached the database (later if she was offline)
  timezone     text          check (char_length(timezone) <= 60),
  language     text          check (char_length(language) <= 20),
  user_agent   text          check (char_length(user_agent) <= 300),

  -- a "choice" must say which button; other events must not
  constraint choice_has_button check ((type = 'choice') = (choice is not null)),
  -- the secret-code events only make sense on the code screen
  constraint unlock_events_on_unlock check (type not in ('unlock_failed', 'unlocked') or screen = 'unlock')
);

create index if not exists events_session_time_idx on public.events (session_key, happened_at);
create index if not exists events_time_idx         on public.events (happened_at desc);

-- 2. Security: the public key may only INSERT ---------------------------
alter table public.events enable row level security;

revoke all on public.events from anon, authenticated;
grant insert on public.events to anon;

drop policy if exists "visitors can only add events" on public.events;
create policy "visitors can only add events"
  on public.events
  as permissive
  for insert
  to anon
  with check (happened_at between now() - interval '30 days' and now() + interval '5 minutes');
-- (no SELECT / UPDATE / DELETE policy exists, so those are impossible for the public key)

-- 3. Readable names ------------------------------------------------------
create or replace function public.screen_title(s text)
returns text language sql immutable as $$
  select case s
    when 'unlock'      then 'Secret code'
    when 'decision'    then 'Will you be mine?'
    when 'yes-confirm' then 'Really?'
    when 'yes-thanks'  then 'Thank you (YES ending)'
    when 'no-1'        then 'Really???'
    when 'no-2'        then 'Pakka na?'
    when 'no-3'        then 'Pleaseeee...'
    when 'no-goodbye'  then 'Thank you + goodbye (NO ending)'
    else s
  end
$$;

-- 4. Your analysis views (only you can read them) -----------------------

-- Every step, in order, in plain English
create or replace view public.timeline with (security_invoker = true) as
select
  session_key,
  happened_at,
  case type
    when 'view'          then 'Opened "' || public.screen_title(screen) || '"'
    when 'choice'        then 'Chose "' || coalesce(label, choice) || '" on "' || public.screen_title(screen) || '" -> ' || public.screen_title(to_screen)
    when 'unlock_failed' then 'Typed a wrong secret code'
    when 'unlocked'      then 'Entered the correct secret code'
  end as what_happened,
  type,
  screen,
  choice,
  label,
  to_screen,
  -- for a "choice" this is roughly how long she took to decide
  round(extract(epoch from happened_at - lag(happened_at) over w)::numeric, 1) as seconds_since_previous,
  -- above 60 means her internet / the service was down and it was saved later
  round(extract(epoch from received_at - happened_at)::numeric, 1) as saved_late_seconds,
  received_at
from public.events
window w as (partition by session_key order by happened_at, received_at);

-- One line per visit
create or replace view public.session_summary with (security_invoker = true) as
select
  session_key,
  min(happened_at)                                                         as opened_at,
  max(happened_at)                                                         as last_activity_at,
  (array_agg(public.screen_title(screen) order by happened_at desc, received_at desc)
     filter (where type = 'view'))[1]                                      as now_on,
  case
    when (array_agg(case screen when 'yes-thanks' then 'YES' when 'no-goodbye' then 'NO' end
            order by happened_at desc, received_at desc)
            filter (where type = 'view' and screen in ('yes-thanks', 'no-goodbye')))[1] is null
      then 'still deciding'
    else (array_agg(case screen when 'yes-thanks' then 'YES' when 'no-goodbye' then 'NO' end
            order by happened_at desc, received_at desc)
            filter (where type = 'view' and screen in ('yes-thanks', 'no-goodbye')))[1]
  end                                                                      as final_answer,
  bool_or(type = 'unlocked')                                               as got_code_right,
  count(*) filter (where type = 'unlock_failed')                           as wrong_code_attempts,
  count(*) filter (where type = 'choice' and choice = 'change')            as changed_mind_times,
  coalesce(max(case screen when 'no-1' then 1 when 'no-2' then 2 when 'no-3' then 3 end)
           filter (where type = 'view'), 0)                                as deepest_no_step,   -- 0 = never, 3 = reached "Pleaseeee..."
  count(*)                                                                 as total_events,
  max(timezone)                                                            as timezone
from public.events
group by session_key;

-- Every option pressed, how many times, and the average seconds she took
create or replace view public.choice_stats with (security_invoker = true) as
select
  public.screen_title(screen) as screen_name,
  label                       as button_pressed,
  count(*)                    as times_pressed,
  round(avg(seconds_since_previous), 1) as avg_seconds_to_decide
from public.timeline
where type = 'choice'
group by screen, label
order by min(happened_at);

revoke all on public.timeline, public.session_summary, public.choice_stats from anon, authenticated;
