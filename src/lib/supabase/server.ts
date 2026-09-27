import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseAnonKey, supabaseUrl, isSupabaseConfigured } from "./env";

/**
 * Server Supabase client for Server Components / Route Handlers (Phase 2).
 * Returns null while Supabase env vars are unset.
 */
export async function getSupabaseServerClient() {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) return null;

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll can be called from a Server Component where cookie writes
          // are not allowed — safe to ignore when middleware refreshes
          // sessions (Phase 2).
        }
      },
    },
  });
}
