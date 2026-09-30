/**
 * Canonical-host rules.
 *
 * The site is published on the apex domain (`caelmont.in`); `www.caelmont.in`
 * points at the same Worker through the routes in `wrangler.jsonc`, so visitors
 * who type the `www.` form reach the real site instead of the parking origin the
 * hostname used to serve, and are then sent permanently to the canonical URL.
 *
 * Deliberately pure — no `next/server` import — so the rules can be unit
 * tested; `src/middleware.ts` only glues them to the request.
 */
import { siteDomain } from "@/config/site";

/** The `www.` form of the canonical domain, e.g. `www.caelmont.in`. */
export const alternateHost = `www.${siteDomain}`;

/**
 * Lowercases a `Host` header and drops any port, so `CAELMONT.IN:443` and
 * `caelmont.in` compare equal. Returns `null` when there is no usable host.
 */
export function normalizeHost(host: string | null | undefined): string | null {
  const name = host?.trim().toLowerCase().split(":")[0] ?? "";
  return name.length > 0 ? name : null;
}

/**
 * True when a request arrived on the `www.` variant of the canonical domain —
 * the only hostname that redirects on its own. The Worker also answers on its
 * `workers.dev` hostname and on `localhost` during development, and those must
 * keep serving the site rather than bouncing to production.
 */
export function isAlternateHost(host: string | null | undefined): boolean {
  return normalizeHost(host) === alternateHost;
}

/**
 * True when a request reached one of the production hostnames over plain HTTP —
 * used to upgrade `http://caelmont.in` and `http://www.caelmont.in` to the
 * canonical HTTPS URL.
 *
 * Deliberately narrow: only `http` counts, and only for the canonical domain
 * and its `www` variant. An absent scheme (local `next dev`, which does not set
 * `x-forwarded-proto`) and preview hostnames are left alone — upgrading those
 * would take development off the air, and a misreported scheme would loop.
 */
export function isInsecureProductionRequest(
  host: string | null | undefined,
  proto: string | null | undefined,
): boolean {
  const name = normalizeHost(host);
  if (name !== siteDomain && name !== alternateHost) return false;
  return proto?.trim().toLowerCase() === "http";
}

/**
 * Absolute canonical URL for a request path and query string, e.g.
 * `canonicalUrl("/brands?ref=x")` → `https://caelmont.in/brands?ref=x`.
 *
 * Always `https`: the origin sends `Strict-Transport-Security`
 * (`next.config.ts`), so an `http` visitor lands on the canonical URL in one hop.
 */
export function canonicalUrl(pathWithQuery: string): string {
  const path = pathWithQuery.startsWith("/") ? pathWithQuery : `/${pathWithQuery}`;
  return `https://${siteDomain}${path}`;
}
