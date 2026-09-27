import { describe, expect, it } from "vitest";
import {
  CONTACT_LIMITS,
  isValidEmail,
  validateContactPayload,
} from "@/lib/contact-validation";

describe("isValidEmail", () => {
  it("accepts ordinary addresses", () => {
    expect(isValidEmail("you@example.com")).toBe(true);
    expect(isValidEmail("first.last+tag@sub.domain.co")).toBe(true);
  });

  it("rejects obvious junk without pretending to be an RFC validator", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("missing@tld")).toBe(false);
    expect(isValidEmail("two words@example.com")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("validateContactPayload", () => {
  const base = {
    name: "Ada Lovelace",
    email: "ada@example.com",
    topic: "Partnership or collaboration",
    company: "Analytical Engines Ltd",
    message: "Hello — I'd like to talk.",
  };

  it("accepts a complete payload and trims whitespace", () => {
    const result = validateContactPayload({ ...base, name: "  Ada Lovelace  " });
    expect(result.valid).toBe(true);
    expect(result.payload.name).toBe("Ada Lovelace");
  });

  it("rejects missing required fields with a per-field error", () => {
    const result = validateContactPayload({
      ...base,
      name: "   ",
      email: "",
      message: "",
      company: "",
      topic: "",
    });
    expect(result.valid).toBe(false);
    expect(result.fieldErrors.name).toBeTruthy();
    expect(result.fieldErrors.email).toBeTruthy();
    expect(result.fieldErrors.message).toBeTruthy();
  });

  it("rejects a malformed email", () => {
    const result = validateContactPayload({ ...base, email: "nope" });
    expect(result.valid).toBe(false);
    expect(result.fieldErrors.email).toBeTruthy();
  });

  it("treats company and topic as optional", () => {
    const result = validateContactPayload({ ...base, company: "", topic: "" });
    expect(result.valid).toBe(true);
  });

  it("caps runaway input at the configured limits", () => {
    const long = "x".repeat(10_000);
    const result = validateContactPayload({
      ...base,
      name: long,
      message: long,
      company: long,
    });
    expect(result.valid).toBe(true);
    expect(result.payload.name.length).toBe(CONTACT_LIMITS.name);
    expect(result.payload.message.length).toBe(CONTACT_LIMITS.message);
    expect(result.payload.company.length).toBe(CONTACT_LIMITS.company);
  });

  it("ignores non-string values instead of throwing", () => {
    const result = validateContactPayload({
      ...base,
      name: 42,
      message: { nested: true },
    });
    expect(result.valid).toBe(false);
    expect(result.payload.name).toBe("");
    expect(result.payload.message).toBe("");
  });
});
