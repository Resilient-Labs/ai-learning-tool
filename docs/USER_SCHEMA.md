# USER_SCHEMA.md — AI Learning Platform (Sprint‑1)

This document defines the **`public.profiles`** table and related auth/RLS behavior used by the app. It reflects the base schema you already ran plus the Sprint‑1 placeholder fields (progress + analytics) added via a non‑destructive migration.

> **Status:** Sprint‑1 ready. Safe to seed and build API routes against.

---

## Table: `public.profiles`

| Column | Type | Nullable | Default | Description |
|---|---|---:|---|---|
| `user_id` | `uuid` | NO | `gen_random_uuid()` | Internal primary key for FK use (not exposed to the client). |
| `clerk_user_id` | `text` | NO | — | The user’s **Clerk** `user.id` (globally unique). |
| `email` | `text` | NO | — | Login email. Unique. |
| `role` | `app_role` | NO | `'student'` | App‑level role. Enum values: `'student'`, `'admin'`. |
| `full_name` | `text` | YES | — | User’s display name from Clerk (can be edited later). |
| `created_at` | `timestamptz` | NO | `now()` | Creation timestamp. |
| `updated_at` | `timestamptz` | NO | `now()` + trigger | Auto‑updated by `profiles_touch_updated_at` trigger on every update. |
| `cohort` | `text` | YES | — | Program cohort label, e.g. `"2026A"`. |
| `session_count` | `integer` | NO | `0` | Cumulative count of learning/chat sessions. |
| `total_time_seconds` | `integer` | NO | `0` | Total engaged time in seconds (client‑reported or server‑tallied). |
| `total_topics` | `text[]` | NO | `'{}'` | Distinct topic slugs/labels the user has engaged with (e.g., `{javascript,react}`). |
| `achievements` | `jsonb` | NO | `'[]'` | Array of lightweight achievement objects (see schema below). |
| `last_session_ended_at` | `timestamptz` | YES | — | When the user most recently ended a session. |
| `avatar_url` | `text` | YES | *(nullable)* | Optional user avatar URL. May be set by UI or DB trigger. |
| `auth_provider` | `text` | NO | `'clerk'` | Identity provider label; keep `'clerk'` unless you add more IdPs. |
| `external_auth_id` | `text` | YES | — | Optional external auth identifier (e.g., SSO subject) for future providers. |

### Primary Key & Uniqueness
- **PK:** `user_id`
- **Unique:** `clerk_user_id`, `email`

### Indexes
- `(clerk_user_id)` — exact lookups from Clerk webhooks / auth context
- `(role)` — admin roster and role filters
- `(cohort)` — lists, dashboards, and reporting by cohort
- `(last_session_ended_at)` — recency queries for engagement

> All new indexes are created with `IF NOT EXISTS` in the migration and are safe to re‑run.

### Enum: `app_role`
```sql
create type app_role as enum ('student','admin');
```
> Keep role semantics minimal. Use feature flags/permissions later if needed rather than over‑growing the enum.

---

## Triggers & Functions

### `touch_updated_at` (already installed)
Ensures `updated_at` is set to `now()` on every row update.
```sql
create or replace function public.touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end $$ language plpgsql;

create trigger profiles_touch_updated_at
before update on public.profiles
for each row execute function public.touch_updated_at();
```

### (Optional) Default Avatar
A small trigger can set `avatar_url` from a config value if it is `NULL` on insert. You can **remove or keep** this depending on whether you prefer to enforce defaulting in the UI.
- Table: `public.app_config (key text primary key, value text not null)`
- Key: `default_avatar_url` → e.g., `https://your.cdn/avatars/placeholder.png`
- Trigger: `trg_profiles_default_avatar` → calls `public.set_default_avatar()`

> If you keep this, ensure the CDN URL is accessible and versioned.

---

## Row‑Level Security (RLS) Overview

RLS is **enabled** on `public.profiles`. The API sets JWT claims into Postgres via `set_config('request.jwt.claims', ...)` so the DB can evaluate access.

Helper functions:
```sql
-- Return a JWT claim, e.g. 'sub' or 'role'
create or replace function public.jwt_claim(text) returns text ...;

-- Who is the caller?
create or replace function public.jwt_user_id() returns text ...;  -- typically Clerk user id

-- What role do they have?
create or replace function public.jwt_role() returns text ...;     -- 'student' | 'admin'
```

Typical policies (summarized):
- **Students (self‑read):** can `SELECT` their own row where `clerk_user_id = jwt_user_id()`.
- **Admins (read‑all):** can `SELECT` any row when `jwt_role() = 'admin'`.
- **Students (self‑update):** can `UPDATE` only their own row; restricted to non‑privileged fields (no role escalation). A `WITH CHECK` prevents changing `role`.
- **Admins (update‑all):** can `UPDATE` any row.

> Keep business logic for privilege changes on the server/API; don’t widen student update rights beyond profile fields.

---
---

## Claims Contract (Auth → DB)

Row-Level Security (RLS) policies depend on a lightweight claims contract set in the Postgres session.

**Normalized Claims Shape**
```ts
type Claims = {
  sub: string;                // Clerk user ID → maps to profiles.clerk_user_id
  role: "student" | "admin";  // Sourced from profiles.role
};
```

---


## JSON Shape — `achievements`

Each element in `achievements` is a small, immutable record of something earned. Start minimal and evolve as needed.

```json
{
  "slug": "first-chat",
  "name": "First Chat",
  "description": "Completed your first chatbot session",
  "earned_at": "2025-09-24T14:00:00Z"
}
```

**Field notes**
- `slug` *(string, required)*: machine‑readable unique key.
- `name` *(string, required)*: human‑readable title.
- `description` *(string, optional)*: brief context.
- `earned_at` *(ISO datetime, required)*: when the achievement was granted.

**Recommended constraints (application‑level)**
- Prevent duplicates by `(user_id, slug)` in the API when appending.
- Keep the objects small; this field is designed for quick badging, not full analytics.

---

## Cohorts & Topics

- **Cohort (`text`):** format like `2026A`, `2026B`, or `2026-Fall`. Choose a single convention and document it in onboarding.
- **Topics (`text[]`):** store lowercase slugs or short labels; dedupe client‑side before patching (`['javascript','react']`).

---

## Example: Minimal Insert (admin context)

```sql
insert into public.profiles
  (clerk_user_id, email, role, full_name, cohort)
values
  ('user_stu_001','ada@example.com','student','Ada Lovelace','2026A');
```

## Example: Student Self‑Update (allowed fields)

```sql
update public.profiles
set
  full_name = 'Ada L.',
  session_count = session_count + 1,
  total_time_seconds = total_time_seconds + 900,
  total_topics = array( select distinct unnest(total_topics || array['javascript']) ),
  achievements = achievements || jsonb_build_array(
    jsonb_build_object(
      'slug','first-15m',
      'name','First 15 Minutes',
      'earned_at', now()::text
    )
  ),
  last_session_ended_at = now()
where clerk_user_id = public.jwt_user_id();
```

> The `WITH CHECK (role = role)` policy prevents students from changing their role in self‑updates.

---

## Seed Guidance (Sprint‑1)

- Provide at least **55 test users** across 2–3 cohorts.
- Ensure **unique** pairs for `clerk_user_id` and `email`.
- Pre‑seed **1–2 admins** for testing broad reads and updates.
- Keep `achievements` small to reduce payload size; demo badges are OK.

---

## Definition of Done (Schema)

- `public.profiles` exists with all columns in this doc.
- Indexes present: `(clerk_user_id)`, `(role)`, `(cohort)`, `(last_session_ended_at)`.
- RLS enabled with policies for **self‑read**, **admin‑read**, **self‑update (limited)**, **admin‑update**.
- Trigger `profiles_touch_updated_at` in place.
- `docs/SEEDING_GUIDE.md` available with seed scripts + smoke tests.

---

## Changelog

- **2025‑09‑25:** Added Sprint‑1 placeholders: `cohort`, `session_count`, `total_time_seconds`, `total_topics`, `achievements`, `last_session_ended_at`, `avatar_url`, `auth_provider`, `external_auth_id`; created helpful indexes.
- **2025‑09‑24:** Base `profiles` schema + `app_role` enum + `touch_updated_at` trigger.
