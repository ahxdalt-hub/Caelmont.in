"use client";

import { useRef, useState, type FormEvent } from "react";
import { contactConfig } from "@/config/contact";
import { siteConfig, siteDomain } from "@/config/site";
import { validateContactPayload } from "@/lib/contact-validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "sent" | "error";

const inputClass =
  "w-full border-b border-ink/20 bg-transparent py-3 text-base text-ink transition-colors placeholder:text-stone/60 focus:border-moss focus:outline-none";

const labelClass = "kicker block text-stone";

/** How a submission actually reached us — drives the confirmation copy. */
type Delivery = "api" | "mailto";

interface ContactFields {
  name: string;
  email: string;
  topic: string;
  company: string;
  message: string;
}

/**
 * Contact form. Submits to `contactConfig.formEndpoint` — a route handler that
 * writes to Supabase (`public.contact_messages`) — and confirms inline.
 *
 * Spam protection: a `website` honeypot field hidden from humans (rendered
 * off-screen and untouchable) is silently dropped server-side. Client-side
 * validation mirrors the server's rules so obvious mistakes never make a
 * round-trip; the server remains authoritative.
 *
 * If no endpoint is configured, or the backend reports itself unprovisioned
 * (503), the message is handed off to the visitor's email client instead, so a
 * submission is never lost.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [delivery, setDelivery] = useState<Delivery>("api");
  const [errorNote, setErrorNote] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFields, string>>>({});
  const honeypot = useRef<HTMLInputElement | null>(null);

  /** Last-resort handoff: open the visitor's mail client with the message filled in. */
  function handOffToEmail({ name, email, topic, message }: ContactFields) {
    const subject = encodeURIComponent(
      `[${siteDomain}] ${topic || "General"} — ${name}`,
    );
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    setDelivery("mailto");
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const fields: ContactFields = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      topic: String(data.get("topic") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    // Client-side mirror of the server's validation (server stays authoritative).
    const { valid, fieldErrors: errors } = validateContactPayload(fields);
    if (!valid) {
      setFieldErrors(errors);
      setErrorNote("Please fix the highlighted fields and try again.");
      return;
    }

    setFieldErrors({});
    setErrorNote(null);
    setStatus("submitting");

    try {
      if (!contactConfig.formEndpoint) {
        handOffToEmail(fields);
      } else {
        const response = await fetch(contactConfig.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...fields,
            // Honeypot: filled only by bots; the server drops it silently.
            website: honeypot.current?.value ?? "",
          }),
        });

        if (response.ok) {
          setDelivery("api");
        } else if (response.status === 503) {
          // No database behind the endpoint yet — don't dead-end the visitor.
          handOffToEmail(fields);
        } else {
          throw new Error(`Request failed: ${response.status}`);
        }
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setErrorNote(
        "Something went wrong sending your message — please email us directly instead.",
      );
    }
  }

  function fieldError(name: keyof ContactFields) {
    return fieldErrors[name] ? (
      <p role="alert" className="mt-2 text-xs leading-relaxed text-ember">
        {fieldErrors[name]}
      </p>
    ) : null;
  }

  if (status === "sent") {
    const viaEmail = delivery === "mailto";

    return (
      <div
        className="border border-ink/10 bg-ivory p-10 md:p-14"
        role="status"
        aria-live="polite"
      >
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
          {viaEmail ? "Message ready — thank you." : "Message received — thank you."}
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">
          {viaEmail ? (
            <>
              Your email client should have opened with everything filled in. If
              it didn&apos;t, write to us directly at{" "}
            </>
          ) : (
            <>
              It&apos;s safely with us and we&apos;ll reply by email. You can
              also reach us any time at{" "}
            </>
          )}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-ink underline decoration-brass/50 underline-offset-4"
          >
            {siteConfig.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-medium text-ink-soft underline decoration-ink/30 underline-offset-4 hover:text-ink"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-ink/10 bg-paper p-7 md:p-10">
      {/* Honeypot — visually removed but present in the DOM, so bots that fill
          every field reveal themselves. Never autofocus or label it. */}
      <input
        ref={honeypot}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your name"
            aria-invalid={Boolean(fieldErrors.name) || undefined}
            className={cn(inputClass, "mt-2")}
          />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            aria-invalid={Boolean(fieldErrors.email) || undefined}
            className={cn(inputClass, "mt-2")}
          />
          {fieldError("email")}
        </div>
        <div>
          <label htmlFor="contact-company" className={labelClass}>
            Company{" "}
            <span className="normal-case tracking-normal text-stone/70">(optional)</span>
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company or organization"
            className={cn(inputClass, "mt-2")}
          />
        </div>
        <div>
          <label htmlFor="contact-topic" className={labelClass}>
            Reason
          </label>
          <select
            id="contact-topic"
            name="topic"
            defaultValue={contactConfig.topics[0]}
            className={cn(inputClass, "mt-2 cursor-pointer appearance-none")}
          >
            {contactConfig.topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={labelClass}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="A few lines about what's on your mind…"
            aria-invalid={Boolean(fieldErrors.message) || undefined}
            className={cn(inputClass, "mt-2 resize-y")}
          />
          {fieldError("message")}
        </div>
      </div>

      {errorNote ? (
        <p role="alert" className="mt-6 text-sm text-ember">
          {errorNote}
        </p>
      ) : null}

      <div className="mt-9 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-ink px-7 py-3 text-sm font-medium text-paper transition-colors duration-300 hover:bg-charcoal disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-stone">
          {contactConfig.formEndpoint
            ? "Goes straight to our inbox — no email client needed."
            : "The form hands off to your email client — a native backend is on the way."}
        </p>
      </div>
    </form>
  );
}
