import { describe, expect, it } from "vitest";
import {
  alternateHost,
  canonicalUrl,
  isAlternateHost,
  isInsecureProductionRequest,
  normalizeHost,
} from "@/lib/canonical-host";

/**
 * The `www.` → apex and HTTP → HTTPS redirects are the site's only host- and
 * scheme-based behaviour. A wrong answer here either loops or takes the Worker
 * off the air, so the rules are pinned down independently of the edge runtime.
 */
describe("canonical host", () => {
  it("targets the www variant of the canonical domain", () => {
    expect(alternateHost).toBe("www.caelmont.in");
  });

  it("normalizes case and ports", () => {
    expect(normalizeHost("WWW.Caelmont.IN:443")).toBe("www.caelmont.in");
    expect(normalizeHost("  caelmont.in  ")).toBe("caelmont.in");
    expect(normalizeHost("")).toBeNull();
    expect(normalizeHost(null)).toBeNull();
    expect(normalizeHost(undefined)).toBeNull();
  });

  it("redirects the www hostname only", () => {
    expect(isAlternateHost("www.caelmont.in")).toBe(true);
    expect(isAlternateHost("www.caelmont.in:443")).toBe(true);
    expect(isAlternateHost("WWW.CAELMONT.IN")).toBe(true);
  });

  it("leaves the apex, preview hosts, and local development alone", () => {
    expect(isAlternateHost("caelmont.in")).toBe(false);
    expect(isAlternateHost("caelmont.ahxd.workers.dev")).toBe(false);
    expect(isAlternateHost("localhost:3000")).toBe(false);
    expect(isAlternateHost("www.caelmont.in.example.com")).toBe(false);
    expect(isAlternateHost(undefined)).toBe(false);
  });

  it("builds absolute canonical urls", () => {
    expect(canonicalUrl("/")).toBe("https://caelmont.in/");
    expect(canonicalUrl("brands")).toBe("https://caelmont.in/brands");
    expect(canonicalUrl("/brands?utm_source=x")).toBe(
      "https://caelmont.in/brands?utm_source=x",
    );
  });

  it("upgrades plain http on production hostnames only", () => {
    expect(isInsecureProductionRequest("caelmont.in", "http")).toBe(true);
    expect(isInsecureProductionRequest("www.caelmont.in", "HTTP")).toBe(true);
  });

  it("never upgrades http elsewhere, or without a reported scheme", () => {
    expect(isInsecureProductionRequest("caelmont.in", "https")).toBe(false);
    expect(isInsecureProductionRequest("caelmont.in", null)).toBe(false);
    expect(isInsecureProductionRequest("localhost:3000", "http")).toBe(false);
    expect(isInsecureProductionRequest("caelmont.ahxd.workers.dev", "http")).toBe(
      false,
    );
  });
});
