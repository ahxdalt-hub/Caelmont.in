import type { NextConfig } from "next";

/*
 * Baseline security headers, applied to every route. Deliberately conservative
 * — no CSP yet, because the site renders inline styles/scripts (Motion, JSON-LD)
 * and a Content-Security-Policy must be built against the real page output
 * before it can ship. These headers cannot break rendering.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    // HTTPS-only site; harmless before the domain resolves, protective after.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  /*
   * Allow production verification builds to use a separate output directory
   * (NEXT_DIST_DIR=.next-prod) so a running dev server on the shared .next
   * directory cannot corrupt the build, and vice versa.
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    /*
     * Image optimization is handled by the remote image URLs themselves
     * (width + format params baked into src/config/images.ts).
     *
     * The Next.js built-in optimizer is disabled because this site deploys
     * to Cloudflare Workers via @opennextjs/cloudflare, where the default
     * optimizer is not available without Cloudflare Images. See README
     * ("Images") for the Phase 2 upgrade path.
     */
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
