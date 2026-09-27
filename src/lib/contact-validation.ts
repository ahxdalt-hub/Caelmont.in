/**
 * Contact-form payload rules, shared by the client form (pre-flight) and the
 * API route (authoritative). Pure functions — no network, no env — so they
 * are unit-testable in isolation.
 */

export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  topic: 120,
  company: 160,
  message: 5000,
} as const;

/** Deliberately loose: we only need to catch obvious typos, not RFC 5322. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactPayload {
  name: string;
  email: string;
  topic: string;
  company: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  /** Field-level errors, keyed by field — used for inline client feedback. */
  fieldErrors: Partial<Record<keyof ContactPayload, string>>;
}

export function trimToLength(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

/**
 * Validates a raw record (e.g. parsed JSON or FormData entries). Returns the
 * trimmed, length-capped payload plus per-field errors; `valid` is false
 * whenever a required field is missing or an email is malformed.
 *
 * Input is a loose record so both parsed JSON (unknown shape) and the form's
 * structured field object type-check without casts.
 */
export type ContactInput = { [K in keyof ContactPayload]?: unknown };

export function validateContactPayload(
  input: ContactInput,
): ContactValidationResult & { payload: ContactPayload } {
  const payload: ContactPayload = {
    name: trimToLength(input.name, CONTACT_LIMITS.name),
    email: trimToLength(input.email, CONTACT_LIMITS.email),
    topic: trimToLength(input.topic, CONTACT_LIMITS.topic),
    company: trimToLength(input.company, CONTACT_LIMITS.company),
    message: trimToLength(input.message, CONTACT_LIMITS.message),
  };

  const fieldErrors: ContactValidationResult["fieldErrors"] = {};
  if (!payload.name) fieldErrors.name = "Please tell us your name.";
  if (!payload.email) {
    fieldErrors.email = "Please add your email so we can reply.";
  } else if (!isValidEmail(payload.email)) {
    fieldErrors.email = "That email address doesn't look right.";
  }
  if (!payload.message) fieldErrors.message = "A short message helps us help you.";

  return { payload, fieldErrors, valid: Object.keys(fieldErrors).length === 0 };
}
