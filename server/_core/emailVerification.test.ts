import { describe, expect, it } from "vitest";
import { createVerificationCode, hashVerificationCode, verificationCodeMatches } from "./emailVerification";

describe("email verification codes", () => {
  it("creates six-digit codes and stores only keyed hashes", () => {
    const code = createVerificationCode();
    const hash = hashVerificationCode("Doctor@Example.com", code);
    expect(code).toMatch(/^\d{6}$/);
    expect(hash).not.toContain(code);
    expect(verificationCodeMatches("doctor@example.com", code, hash)).toBe(true);
    expect(verificationCodeMatches("doctor@example.com", "999999", hash)).toBe(false);
  });
});
