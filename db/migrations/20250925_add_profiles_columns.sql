
-- 20250925_add_profiles_columns.sql
-- Purpose: Extend public.profiles with Sprint‑1 placeholders without recreating the table.
-- Safe to re-run. Does not drop or recreate existing objects.
-- Order: columns -> indexes -> helper tables/functions/triggers (for default avatar).

-- 0) Safety: gen_random_uuid() helper in case it's not already present
create extension if not exists pgcrypto;

-- 1) Ensure the role enum exists (no-op if already created)
do $$ begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type app_role as enum ('student','admin');
  end if;
end $$;

-- 2) Add new columns to public.profiles (idempotent)
alter table public.profiles
  add column if not exists cohort                 text,                -- e.g., '2026A'
  add column if not exists session_count          integer not null default 0,
  add column if not exists total_time_seconds     integer not null default 0,
  add column if not exists total_topics           text[]  not null default '{}',
  add column if not exists achievements           jsonb   not null default '[]',
  add column if not exists last_session_ended_at  timestamptz,
  add column if not exists avatar_url             text,
  add column if not exists auth_provider          text    not null default 'clerk',
  add column if not exists external_auth_id       text;

-- 3) Helpful indexes (idempotent)
create index if not exists idx_profiles_role               on public.profiles(role);
create index if not exists idx_profiles_cohort             on public.profiles(cohort);
create index if not exists idx_profiles_last_session_ended on public.profiles(last_session_ended_at);

-- 4) Optional default avatar support (idempotent)
create table if not exists public.app_config (
  key   text primary key,
  value text not null
);

insert into public.app_config(key, value)
values ('default_avatar_url', 'https://your.cdn/avatars/placeholder.png')
on conflict (key) do nothing;

create or replace function public.set_default_avatar()
returns trigger language plpgsql as $$
declare
  fallback text;
begin
  if new.avatar_url is null then
    select value into fallback from public.app_config where key = 'default_avatar_url';
    new.avatar_url := fallback;
  end if;
  return new;
end $$;

drop trigger if exists trg_profiles_default_avatar on public.profiles;
create trigger trg_profiles_default_avatar
before insert on public.profiles
for each row execute function public.set_default_avatar();

-- Notes:
-- • We intentionally do NOT touch existing RLS policies or the touch_updated_at trigger.
-- • Run with: psql -f 20250925_add_profiles_columns.sql  (or via your migration tool).
-- • If you seed data that references 'cohort', make sure this migration runs BEFORE seeds.
