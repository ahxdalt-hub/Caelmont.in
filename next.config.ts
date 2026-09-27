import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
