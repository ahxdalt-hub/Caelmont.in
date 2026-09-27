/**
 * Supabase environment configuration.
 *
 * Supabase issues two generations of API keys and both work with
 * `@supabase/supabase-js` v2:
 *
 *   • Publishable / secret — `sb_publishable_…`, `sb_secret_…` (newer)
 *   • Anon / service role  — legacy JWTs                        (older)
 *
 * The newer names are preferred and the legacy ones stay as fallbacks, so the
 * site works against either generation without further changes.
 *
 * Only `NEXT_PUBLIC_*` values are read here — this module is safe to import
 * from browser code. The secret key lives in `./admin.ts` only.
 */

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

/** Public client key — browser-safe; Row Level Security still applies. */
export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when both public Supabase env vars are present. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
