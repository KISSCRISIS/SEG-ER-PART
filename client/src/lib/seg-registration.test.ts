import { describe, expect, it } from "vitest";
import { isRegistrationPasswordStrong } from "./seg-registration";

describe("Registration password-strength interaction", () => {
  it("requires 12 characters with uppercase, lowercase, number, and symbol", () => {
    expect(isRegistrationPasswordStrong("")).toBe(false);
    expect(isRegistrationPasswordStrong("SEG2026")).toBe(false);
    expect(isRegistrationPasswordStrong("SEG-Clinical2026!")).toBe(true);
  });
});
