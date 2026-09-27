import Script from "next/script";
import { analyticsConfig, isAnalyticsEnabled } from "@/config/analytics";

/**
 * Analytics loader. Renders nothing (not even a script tag) unless a provider
 * is fully configured in `src/config/analytics.ts` — the site never depends
 * on analytics to function. Providers supported here are cookieless and load
 * after hydration (`afterInteractive`) so they never block rendering.
 */
export function Analytics() {
  if (!isAnalyticsEnabled()) return null;

  if (analyticsConfig.provider === "plausible") {
    return (
      <Script
        defer
        data-domain={analyticsConfig.siteDomain}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
    );
  }

  if (analyticsConfig.provider === "umami") {
    return (
      <Script
        defer
        data-website-id={analyticsConfig.umamiWebsiteId}
        src={analyticsConfig.umamiScriptUrl}
        strategy="afterInteractive"
      />
    );
  }

  return null;
}
