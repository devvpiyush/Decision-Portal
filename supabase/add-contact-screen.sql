-- Run this ONCE if you already ran setup.sql before the contact screen existed.
-- (If you are setting up fresh, you do NOT need this: setup.sql already includes it.)
alter table public.events drop constraint if exists events_screen_check;
alter table public.events drop constraint if exists events_to_screen_check;
alter table public.events add constraint events_screen_check
  check (screen in ('unlock','decision','yes-confirm','yes-thanks','yes-contact','no-1','no-2','no-3','no-goodbye'));
alter table public.events add constraint events_to_screen_check
  check (to_screen in ('unlock','decision','yes-confirm','yes-thanks','yes-contact','no-1','no-2','no-3','no-goodbye'));

create or replace function public.screen_title(s text)
returns text language sql immutable as $$
  select case s
    when 'unlock'      then 'Secret code'
    when 'decision'    then 'Will you be mine?'
    when 'yes-confirm' then 'Really?'
    when 'yes-thanks'  then 'Thank you (YES ending)'
    when 'yes-contact' then 'Contact QR codes (YES, last screen)'
    when 'no-1'        then 'Really???'
    when 'no-2'        then 'Pakka na?'
    when 'no-3'        then 'Pleaseeee...'
    when 'no-goodbye'  then 'Thank you + goodbye (NO ending)'
    else s
  end
$$;
