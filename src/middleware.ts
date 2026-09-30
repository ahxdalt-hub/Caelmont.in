import { NextResponse, type NextRequest } from "next/server";
import {
  canonicalUrl,
  isAlternateHost,
  isInsecureProductionRequest,
} from "@/lib/canonical-host";

/**
 * Sends every `www.` and plain-HTTP request on the production hostnames to the
 * canonical `https://caelmont.in` URL, so every address the site publishes —
 * canonical tags, Open Graph URLs, the sitemap, the `robots.txt` host — resolves
 * to a single hostname over a single scheme.
 *
 * The hostnames point at this Worker through Cloudflare routes
 * (`wrangler.jsonc`). Apex traffic, the `workers.dev` hostname, and `localhost`
 * fall straight through. `308` preserves the method and body.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto");

  if (!isAlternateHost(host) && !isInsecureProductionRequest(host, proto)) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;
  return NextResponse.redirect(canonicalUrl(`${pathname}${search}`), 308);
}

export const config = {
  /* Every route; static assets are served by the ASSETS binding first. */
  matcher: "/:path*",
};
