import { COOKIE_NAME, OAUTH_STATE_COOKIE, encodeOAuthState } from "@shared/const";
import type { RequestHandler } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../db", () => ({
  upsertUser: vi.fn(),
}));

vi.mock("./sdk", () => ({
  sdk: {
    exchangeCodeForToken: vi.fn(),
    getUserInfo: vi.fn(),
    createSessionToken: vi.fn(),
  },
}));

import * as db from "../db";
import { registerOAuthRoutes } from "./oauth";
import { sdk } from "./sdk";

function getCallbackHandler(): RequestHandler {
  let callbackHandler: RequestHandler | undefined;
  const app = {
    get: (path: string, handler: RequestHandler) => {
      if (path === "/api/oauth/callback") callbackHandler = handler;
    },
  };

  registerOAuthRoutes(app as never);

  if (!callbackHandler) throw new Error("OAuth callback handler was not registered");
  return callbackHandler;
}

describe("OAuth callback destination", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(sdk.exchangeCodeForToken).mockResolvedValue({ accessToken: "provider-token" } as never);
    vi.mocked(sdk.getUserInfo).mockResolvedValue({ openId: "oauth-user", name: "OAuth User", email: "oauth@example.com" } as never);
    vi.mocked(sdk.createSessionToken).mockResolvedValue("session-token");
  });

  it("redirects a completed OAuth session directly to the protected My Home Dashboard", async () => {
    const redirect = vi.fn();
    const cookie = vi.fn();
    const clearCookie = vi.fn();
    const nonce = "known-oauth-nonce";
    const state = encodeOAuthState({ redirectUri: "https://seg-guide-bjjkqn7t.manus.space/api/oauth/callback", nonce });
    const handler = getCallbackHandler();

    await handler(
      {
        query: { code: "authorization-code", state },
        headers: { cookie: `${OAUTH_STATE_COOKIE}=${nonce}`, host: "seg-guide-bjjkqn7t.manus.space" },
        protocol: "https",
      } as never,
      { redirect, cookie, clearCookie } as never,
      vi.fn(),
    );

    expect(db.upsertUser).toHaveBeenCalledWith(expect.objectContaining({ openId: "oauth-user" }));
    expect(cookie).toHaveBeenCalledWith(COOKIE_NAME, "session-token", expect.objectContaining({ secure: true }));
    expect(redirect).toHaveBeenCalledWith(302, "/dashboard");
  });

  it("returns a request id without exposing callback failure details", async () => {
    const status = vi.fn().mockReturnThis();
    const json = vi.fn();
    const clearCookie = vi.fn();
    const nonce = "known-oauth-nonce";
    const state = encodeOAuthState({ redirectUri: "https://seg-guide-bjjkqn7t.manus.space/api/oauth/callback", nonce });
    const handler = getCallbackHandler();
    vi.mocked(sdk.exchangeCodeForToken).mockRejectedValueOnce(new Error("provider secret detail"));

    await handler(
      {
        query: { code: "authorization-code", state },
        headers: { cookie: `${OAUTH_STATE_COOKIE}=${nonce}`, host: "seg-guide-bjjkqn7t.manus.space" },
        protocol: "https",
        requestId: "request-123",
      } as never,
      { status, json, clearCookie } as never,
      vi.fn(),
    );

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      error: "OAuth callback failed",
      requestId: "request-123",
    });
    expect(json).not.toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringContaining("provider secret detail") })
    );
  });
});
