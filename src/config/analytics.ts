/**
 * Analytics architecture — configurable, privacy-conscious, and OFF by
 * default. The site is fully functional with analytics disabled; nothing is
 * loaded, no cookies are set, and no data leaves the visitor's browser until
 * a provider is explicitly configured here.
 *
 * Only cookieless, privacy-focused providers are supported by design — they
 * collect no personal data and require no consent banner under GDPR/ePrivacy
 * (the providers assert this themselves; verify before relying on it in a
 * specific jurisdiction). If a cookie-setting provider is ever wanted, add a
 * consent-gate to `src/components/analytics/Analytics.tsx` first.
 *
 * To enable: set `provider` and the matching env vars below. Nothing else in
 * the codebase needs to change — and the /privacy page reads this config to
 * describe what actually runs.
 */
export type AnalyticsProvider = "plausible" | "umami" | null;

export const analyticsConfig = {
  /** Active provider. `null` = no analytics at all (current state). */
  provider: (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || null) as AnalyticsProvider,

  /**
   * Site domain as registered with the provider (defaults to the canonical
   * domain). Used by Plausible/Umami's `data-domain` attribute.
   */
  siteDomain: process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN || "caelmont.in",

  /** Umami only: the tracker script origin, e.g. "https://analytics.example.com". */
  umamiScriptUrl: process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "",
  /** Umami only: the website ID assigned by the Umami dashboard. */
  umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "",
} as const;

/** True when a fully-configured, privacy-focused provider is active. */
export function isAnalyticsEnabled(): boolean {
  switch (analyticsConfig.provider) {
    case "plausible":
      return true; // script URL is fixed; only the domain matters
    case "umami":
      return Boolean(analyticsConfig.umamiScriptUrl && analyticsConfig.umamiWebsiteId);
    default:
      return false;
  }
}
