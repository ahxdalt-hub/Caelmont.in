-- ============================================================================
-- CAELMONT · contact_messages: add optional company column
-- ----------------------------------------------------------------------------
-- Companion to 20260927000000_create_contact_messages.sql. Adds the optional
-- "company / organization" field from the contact form
-- (src/components/contact/ContactForm.tsx).
--
-- Apply once (Supabase dashboard → SQL Editor → paste → Run), or:
--   supabase db push
--
-- Security model is unchanged: RLS stays enabled with zero policies; only the
-- server route handler (secret key) writes. Safe to re-run (idempotent).
-- ============================================================================

alter table public.contact_messages
  add column if not exists company text not null default ''
  check (char_length(company) <= 160);

comment on column public.contact_messages.company is
  'Optional company/organization from the contact form. Empty when not provided.';
