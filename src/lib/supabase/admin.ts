import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseUrl } from "./env";

/**
 * SERVER-ONLY Supabase client backed by the secret key.
 *
 * The secret key bypasses Row Level Security, so this module must never be
 * imported from a Client Component, a browser hook, or anything else that ends
 * up in the client bundle. Two guards are in place:
 *
 *   1. The key is read from `process.env.SUPABASE_SECRET_KEY` /
 *      `SUPABASE_SERVICE_ROLE_KEY` — non-`NEXT_PUBLIC_` names, which Next.js
 *      never inlines into client bundles.
 *   2. `getSupabaseAdminClient()` returns `null` when the key is absent, so
 *      callers must handle "no backend configured" explicitly instead of
 *      throwing at import time.
 */
let adminClient: SupabaseClient | null = null;

export function getSupabaseAdminClient(): SupabaseClient | null {
  const secretKey =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !secretKey) return null;

  adminClient ??= createClient(supabaseUrl, secretKey, {
    auth: {
      // Nothing here is a user session — no cookies, no token refreshing.
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return adminClient;
}
