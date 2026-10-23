import { describe, expect, it } from "vitest";
import { getSessionCookieOptions } from "./cookies";

describe("getSessionCookieOptions", () => {
  it("marks the session cookie Secure for a public SEG hostname behind a TLS-terminating proxy", () => {
    const request = {
      protocol: "http",
      hostname: "seg-guide-bjjkqn7t.manus.space",
      headers: {},
    } as Parameters<typeof getSessionCookieOptions>[0];

    expect(getSessionCookieOptions(request)).toMatchObject({
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
    });
  });

  it("sets a host-derived domain for public DNS hosts", () => {
    const request = {
      protocol: "https",
      hostname: "seg-guide-bjjkqn7t.manus.space",
      headers: {},
    } as Parameters<typeof getSessionCookieOptions>[0];

    expect(getSessionCookieOptions(request)).toMatchObject({
      domain: ".seg-guide-bjjkqn7t.manus.space",
    });
  });

  it("keeps local HTTP development usable without weakening public hosts", () => {
    const request = {
      protocol: "http",
      hostname: "localhost",
      headers: {},
    } as Parameters<typeof getSessionCookieOptions>[0];

    expect(getSessionCookieOptions(request)).toMatchObject({
      domain: undefined,
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  });

  it("does not set a domain for IP hosts", () => {
    const request = {
      protocol: "http",
      hostname: "127.0.0.1",
      headers: {},
    } as Parameters<typeof getSessionCookieOptions>[0];

    expect(getSessionCookieOptions(request)).toMatchObject({
      domain: undefined,
    });
  });
});
