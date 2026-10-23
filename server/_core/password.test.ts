import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("password hashing", () => {
  it("uses a salted one-way hash and verifies the correct password", async () => {
    const password = "Strong-Clinical-Password-2026!";
    const first = await hashPassword(password);
    const second = await hashPassword(password);

    expect(first).not.toContain(password);
    expect(first).not.toBe(second);
    await expect(verifyPassword(password, first)).resolves.toBe(true);
    await expect(verifyPassword("wrong-password", first)).resolves.toBe(false);
  });

  it("rejects malformed stored hashes without throwing", async () => {
    await expect(verifyPassword("anything", "not-a-valid-hash")).resolves.toBe(false);
  });
});
