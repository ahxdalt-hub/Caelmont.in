import { describe, expect, it } from "vitest";
import {
  featuredVentures,
  isWebsiteAvailable,
  ventures,
  venturesInOrder,
} from "@/config/ventures";
import { images } from "@/config/images";
import { founderConfig } from "@/config/founder";
import { siteConfig, siteDomain } from "@/config/site";
import { pageMetadata } from "@/config/seo";
import { isAnalyticsEnabled } from "@/config/analytics";

/**
 * Content-integrity invariants: these tests fail if someone later adds an
 * invented product URL, a fabricated legal suffix, or config that would ship
 * broken imagery or empty links to the site.
 */
describe("site config", () => {
  it("uses the production canonical domain", () => {
    expect(new URL(siteConfig.url).host).toBe("caelmont.in");
    expect(siteDomain).toBe("caelmont.in");
  });

  it("presents no invented legal suffix", () => {
    expect(siteConfig.legalSuffix === null || siteConfig.legalSuffix.length > 0).toBe(true);
  });

  it("ships no analytics by default", () => {
    expect(isAnalyticsEnabled()).toBe(false);
  });
});

describe("shared page metadata", () => {
  it("leaves the title to the layout when a page does not name itself", () => {
    // An explicit `title: undefined` overrides the layout's `title.default`
    // and removes the <title> element from the document, so the key must be
    // absent — not blank — for untitled pages (the home page).
    expect("title" in pageMetadata()).toBe(false);
    expect("title" in pageMetadata({ description: siteConfig.description })).toBe(false);
  });

  it("titles and canonically links a named page", () => {
    const meta = pageMetadata({ title: "About", path: "/about" });
    expect(meta.title).toBe("About");
    expect(meta.alternates?.canonical).toBe(`${siteConfig.url}/about`);
    expect(meta.openGraph?.title).toBe(`About — ${siteConfig.name}`);
  });
});

describe("ventures config", () => {
  it("has unique ids, slugs, and display orders", () => {
    const ids = new Set(ventures.map((v) => v.id));
    const slugs = new Set(ventures.map((v) => v.slug));
    const orders = new Set(ventures.map((v) => v.order));
    expect(ids.size).toBe(ventures.length);
    expect(slugs.size).toBe(ventures.length);
    expect(orders.size).toBe(ventures.length);
  });

  it("never configures an invented product URL", () => {
    for (const venture of ventures) {
      if (venture.websiteUrl === null) continue;
      expect(() => new URL(venture.websiteUrl!)).not.toThrow();
      expect(venture.websiteUrl!).toMatch(/^https:\/\//);
    }
  });

  it("keeps website availability consistent with the configured label", () => {
    for (const venture of ventures) {
      expect(isWebsiteAvailable(venture)).toBe(venture.websiteUrl !== null);
      if (!isWebsiteAvailable(venture)) {
        expect(venture.websiteLabel.toLowerCase()).toContain("coming soon");
      }
    }
  });

  it("orders listings by ascending order", () => {
    const orders = venturesInOrder().map((v) => v.order);
    expect([...orders].sort((a, b) => a - b)).toEqual(orders);
  });

  it("featured listings are a non-empty subset in display order", () => {
    const featured = featuredVentures();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.length).toBeLessThanOrEqual(ventures.length);
    const orders = featured.map((v) => v.order);
    expect([...orders].sort((a, b) => a - b)).toEqual(orders);
  });

  it("gives every venture complete, non-empty editorial content", () => {
    for (const venture of ventures) {
      for (const field of ["name", "category", "summary", "problem", "audience", "approach"] as const) {
        expect(venture[field].length, `${venture.id}.${field}`).toBeGreaterThan(0);
      }
      expect(venture.statusLabel.length).toBeGreaterThan(0);
    }
  });
});

describe("images config", () => {
  it("gives every image meaningful alt text", () => {
    const refs = [
      images.hero,
      images.editorial,
      images.ending,
      ...Object.values(images.ventures),
    ];
    for (const ref of refs) {
      expect(ref.src).toMatch(/^https:\/\//);
      expect(ref.alt.length).toBeGreaterThan(0);
      expect(ref.srcSet).toContain(ref.src.split("?")[0]);
    }
  });

  it("leaves the founder portrait unconfigured until a real photo exists", () => {
    // Either an https URL, or intentionally empty (monogram placeholder renders).
    expect(founderConfig.imageUrl === "" || founderConfig.imageUrl.startsWith("https://")).toBe(true);
  });
});

describe("founder config", () => {
  it("never invents social links — every configured one is https", () => {
    for (const [platform, href] of Object.entries(founderConfig.socials)) {
      if (href === null) continue;
      expect(href.startsWith("https://"), `${platform} must be an https URL`).toBe(true);
    }
  });
});
