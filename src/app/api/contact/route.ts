import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Contact form backend.
 *
 * `ContactForm` POSTs `{ name, email, topic, message }` here and the row lands
 * in `public.contact_messages` (see supabase/migrations/). The write uses the
 * secret key, so Row Level Security on that table can stay deny-all for the
 * browser — visitors never touch the database directly.
 *
 * When the secret key is missing, or the migration has not been applied yet,
 * this responds `503 { error: "not_configured" }`. The form treats that as
 * "no backend" and falls back to the mailto handoff so a visitor's message is
 * never silently dropped.
 */

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_TOPIC = 120;
const MAX_MESSAGE = 5000;
const MAX_USER_AGENT = 500;

/** Deliberately loose: we only need to catch obvious typos, not RFC 5322. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Postgres/PostgREST codes that mean "the migration has not been applied". */
const MISSING_TABLE_CODES = new Set(["PGRST205", "42P01"]);

function trimmed(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = trimmed(payload.name, MAX_NAME);
  const email = trimmed(payload.email, MAX_EMAIL);
  const topic = trimmed(payload.topic, MAX_TOPIC);
  const message = trimmed(payload.message, MAX_MESSAGE);

  if (!name || !message || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  try {
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      topic,
      message,
      user_agent: request.headers.get("user-agent")?.slice(0, MAX_USER_AGENT) ?? null,
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
