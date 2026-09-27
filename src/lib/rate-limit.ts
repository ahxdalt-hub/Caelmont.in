/**
 * Minimal in-memory fixed-window rate limiter for the contact endpoint.
 *
 * "Where practical" honesty: on Cloudflare Workers each isolate keeps its own
 * map, so limits are per-isolate rather than global. That still blunts naive
 * scripted bursts, and the durable backstop is Supabase-side (the endpoint is
 * the only writer, via the secret key). If stronger guarantees are ever
 * needed, move the counter into Cloudflare KV/Durable Objects or Upstash.
 *
 * No IP addresses are stored with submissions; keys live only in this
 * short-lived map and are never persisted.
 */

interface WindowState {
  count: number;
  resetAt: number;
}

const windows = new Map<string, WindowState>();

/** Lazily trimmed so the map can't grow without bound under garbage traffic. */
const MAX_TRACKED_KEYS = 10_000;

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the caller may retry (0 when allowed). */
  retryAfterSeconds: number;
}

export function rateLimit(
  key: string,
  { limit, windowSeconds }: { limit: number; windowSeconds: number },
  now: number = Date.now(),
): RateLimitResult {
  if (windows.size >= MAX_TRACKED_KEYS) {
    for (const [k, state] of windows) {
      if (state.resetAt <= now) windows.delete(k);
    }
    if (windows.size >= MAX_TRACKED_KEYS) windows.clear();
  }

  const existing = windows.get(key);
  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Test hook — clears all tracked windows. */
export function resetRateLimiter(): void {
  windows.clear();
}
