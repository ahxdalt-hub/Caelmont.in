export const contactConfig = {
  /**
   * Contact form backend. Pointed at the Next.js route handler that writes to
   * Supabase (`src/app/api/contact/route.ts` → `public.contact_messages`).
   *
   * The form POSTs JSON `{ name, email, topic, message }`. If the endpoint is
   * unavailable, or the underlying table has not been provisioned, the form
   * falls back to the mailto: handoff so a message is never lost.
   *
   * Set to null to force the mailto: handoff everywhere (no network call).
   */
  formEndpoint: "/api/contact" as string | null,
  topics: [
    "Partnership or collaboration",
    "Question about a venture",
    "Press & media",
    "Something else",
  ] as string[],
};
