-- ============================================================================
-- CAELMONT · contact form inbox
-- ----------------------------------------------------------------------------
-- Creates the table behind the contact form (src/app/api/contact/route.ts).
--
-- Apply it once, any of these ways:
--   • Supabase Dashboard → SQL Editor → paste this file → Run   (easiest)
--   • supabase link && supabase db push                         (CLI)
--   • psql "$DATABASE_URL" -f supabase/migrations/20260927000000_create_contact_messages.sql
--
-- Security model
--   The table is written to *only* by the server, via the route handler using
--   the secret key. Row Level Security is enabled with **no policies**, so the
--   publishable/anon key can neither read nor write. Submissions therefore stay
--   private even though the publishable key ships to every browser.
-- ============================================================================

create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 120),
  email      text not null check (char_length(email) between 3 and 254),
  topic      text not null default '' check (char_length(topic) <= 120),
  company    text not null default '' check (char_length(company) <= 160),
  message    text not null check (char_length(message) between 1 and 5000),
  user_agent text
);

comment on table public.contact_messages is
  'Inbound contact-form submissions. Written only by the server route handler; RLS is enabled with no policies on purpose.';

comment on column public.contact_messages.topic is
  'Free-form label chosen from src/config/contact.ts (contactConfig.topics).';

comment on column public.contact_messages.company is
  'Optional company/organization from the contact form. Empty when not provided.';

comment on column public.contact_messages.user_agent is
  'Requesting User-Agent, truncated to 500 chars. Useful for spotting spam bursts.';

-- The dashboard reads newest-first by default.
create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

-- Lock down: RLS on + zero policies == deny-all for anon and authenticated.
alter table public.contact_messages enable row level security;

revoke all on public.contact_messages from anon, authenticated;

-- service_role bypasses RLS; re-assert its grants so the write path is explicit.
grant all on public.contact_messages to service_role;

-- Ask PostgREST to pick up the new table without waiting for a restart.
notify pgrst, 'reload schema';
