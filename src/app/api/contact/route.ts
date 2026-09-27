import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rate-limit";
import { trimToLength, validateContactPayload } from "@/lib/contact-validation";

/**
 * Contact form backend.
 *
 * `ContactForm` POSTs `{ name, email, topic, company, message, website }`
 * here and the row lands in `public.contact_messages` (see
 * supabase/migrations/). The write uses the secret key, so Row Level Security
 * on that table can stay deny-all for the browser — visitors never touch the
 * database directly.
 *
 * Spam protection, in layers (all server-side):
 *   1. Honeypot — a `website` field hidden from humans (CSS), tempting to
 *      bots. Any value in it is dropped with a fake success response so
 *      the bot learns nothing.
 *   2. Rate limiting — fixed-window per client IP (in-memory, per isolate;
 *      see src/lib/rate-limit.ts). IPs are used only for the limiter and are
 *      never persisted.
 *   3. Length caps + validation via src/lib/contact-validation.ts.
 *
 * When the secret key is missing, or the migration has not been applied yet,
 * this responds `503 { error: "not_configured" }`. The form treats that as
 * "no backend" and falls back to the mailto handoff so a visitor's message is
 * never silently dropped.
 */

const RATE_LIMIT = { limit: 5, windowSeconds: 10 * 60 } as const;

/** Postgres/PostgREST codes that mean "the migration has not been applied". */
const MISSING_TABLE_CODES = new Set(["PGRST205", "42P01"]);

/** Best-effort client IP behind Cloudflare/standard proxies. */
function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  // Rate limit before touching the body — cheap rejection for bursts.
  const limit = rateLimit(`contact:${clientIp(request)}`, RATE_LIMIT);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: humans never fill this in. Pretend it worked.
  if (trimToLength(raw.website, 200)) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const { payload, valid } = validateContactPayload(raw);
  if (!valid) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  try {
    const { error } = await supabase.from("contact_messages").insert({
      name: payload.name,
      email: payload.email,
      topic: payload.topic,
      company: payload.company,
      message: payload.message,
      user_agent: trimToLength(request.headers.get("user-agent"), 500) || null,
    });

    if (error) {
      const notProvisioned = MISSING_TABLE_CODES.has(error.code ?? "");
      // Log the real reason server-side; keep the response body generic.
      console.error("[contact] insert failed:", error.code, error.message);
      return NextResponse.json(
        { error: notProvisioned ? "not_configured" : "insert_failed" },
        { status: notProvisioned ? 503 : 502 },
      );
    }
  } catch (cause) {
    console.error("[contact] unexpected failure:", cause);
    return NextResponse.json({ error: "insert_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
