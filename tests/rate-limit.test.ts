import { afterEach, describe, expect, it } from "vitest";
import { rateLimit, resetRateLimiter } from "@/lib/rate-limit";

afterEach(() => resetRateLimiter());

describe("rateLimit", () => {
  it("allows requests up to the limit within the window", () => {
    const opts = { limit: 3, windowSeconds: 60 };
    const t0 = Date.now();
    for (let i = 0; i < 3; i++) {
      expect(rateLimit("ip:a", opts, t0).allowed).toBe(true);
    }
  });

  it("blocks past the limit and reports retry-after", () => {
    const opts = { limit: 2, windowSeconds: 60 };
    const t0 = 1_000_000;
    rateLimit("ip:b", opts, t0);
    rateLimit("ip:b", opts, t0);
    const blocked = rateLimit("ip:b", opts, t0 + 1000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    expect(blocked.retryAfterSeconds).toBeLessThanOrEqual(60);
  });

  it("opens a fresh window after it elapses", () => {
    const opts = { limit: 1, windowSeconds: 10 };
    const t0 = 1_000_000;
    expect(rateLimit("ip:c", opts, t0).allowed).toBe(true);
    expect(rateLimit("ip:c", opts, t0 + 5000).allowed).toBe(false);
    expect(rateLimit("ip:c", opts, t0 + 10_500).allowed).toBe(true);
  });

  it("tracks keys independently", () => {
    const opts = { limit: 1, windowSeconds: 60 };
    rateLimit("ip:d", opts);
    expect(rateLimit("ip:e", opts).allowed).toBe(true);
    expect(rateLimit("ip:d", opts).allowed).toBe(false);
  });
});
