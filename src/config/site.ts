export interface NavItem {
  label: string;
  href: string;
}

/**
 * Central company identity. Every visible name, link, and email on the site
 * comes from here — never hardcode values in components.
 */
export const siteConfig = {
  name: "CAELMONT",
  domain: "caelmont.in",
  url: "https://caelmont.in",
  tagline: "Independent software products and ventures.",
  positioning:
    "An independent technology company building focused software products and ventures.",
  description:
    "CAELMONT is an independent technology company building focused software products and ventures around useful technology and real-world problems.",
  /** Provisional contact address — configurable, replace when a dedicated inbox exists. */
  email: "Caelmontholding@gmail.com",
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
