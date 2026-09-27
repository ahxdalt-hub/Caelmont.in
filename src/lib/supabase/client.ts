import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl, isSupabaseConfigured } from "./env";

type BrowserClient = ReturnType<typeof createBrowserClient>;

let browserClient: BrowserClient | null = null;

/**
 * Browser Supabase client (Phase 2). Returns null while Supabase env vars are
 * unset so Phase 1 builds and runtime never touch the network.
 */
export function getSupabaseBrowserClient(): BrowserClient | null {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) return null;
  browserClient ??= createBrowserClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
}
