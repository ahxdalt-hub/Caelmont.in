export interface NavItem {
  label: string;
  href: string;
}

/**
 * Central company identity. Every visible name, link, and email on the site
 * comes from here — never hardcode values in components.
 *
 * The canonical URL and contact email can be overridden via environment
 * variables (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`) so staging
 * and production deployments can differ without code changes; the defaults
 * are the production values.
 */
export const siteConfig = {
  name: "CAELMONT",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://caelmont.in",
  tagline: "Independent software products and ventures.",
  positioning:
    "An independent technology company building focused software products and ventures.",
  description:
    "CAELMONT is an independent technology company building focused software products and ventures around useful technology and real-world problems.",
  /** Provisional contact address — configurable, replace when a dedicated inbox exists. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "Caelmontholding@gmail.com",
  /**
   * Legal entity suffix (e.g. "Pvt. Ltd."). Deliberately unconfigured until
   * the registration decision is made — never invent one. When null, the
   * footer simply shows the brand name with no suffix.
   */
  legalSuffix: null as string | null,
  nav: [
    { label: "Brands", href: "/brands" },
    { label: "About", href: "/about" },
    { label: "Approach", href: "/approach" },
    { label: "Updates", href: "/updates" },
  ] as NavItem[],
  footerNav: [
    { label: "Brands", href: "/brands" },
    { label: "About", href: "/about" },
    { label: "Approach", href: "/approach" },
    { label: "Updates", href: "/updates" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
  legal: [{ label: "Privacy", href: "/privacy" }] as NavItem[],
};

/** Hostname derived from `url`, used in copy (e.g. "caelmont.in"). */
export const siteDomain = new URL(siteConfig.url).host.replace(/^www\./, "");
