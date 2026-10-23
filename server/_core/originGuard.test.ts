import type { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { requireSameOrigin } from "./originGuard";

function invoke({
  method = "POST",
  origin,
  host = "localhost:3000",
  protocol = "http",
}: { method?: string; origin?: string; host?: string; protocol?: string } = {}) {
  const next = vi.fn();
  const json = vi.fn();
  const status = vi.fn(() => ({ json }));
  const headers: Record<string, string | undefined> = { origin, host };
  const req = {
    method,
    protocol,
    requestId: "request-1",
    get: (name: string) => headers[name.toLowerCase()],
  } as unknown as Request;
  const res = { status } as unknown as Response;
  requireSameOrigin(req, res, next);
  return { next, status, json };
}

describe("API same-origin guard", () => {
  it("allows safe requests and same-origin mutations", () => {
    expect(invoke({ method: "GET", origin: "https://evil.example" }).next).toHaveBeenCalledOnce();
    expect(invoke({ origin: "http://localhost:3000" }).next).toHaveBeenCalledOnce();
  });

  it("rejects cross-origin browser mutations", () => {
    const result = invoke({ origin: "https://evil.example" });
    expect(result.next).not.toHaveBeenCalled();
    expect(result.status).toHaveBeenCalledWith(403);
    expect(result.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Cross-origin request rejected" }));
  });

  it("allows non-browser clients without an Origin header", () => {
    expect(invoke().next).toHaveBeenCalledOnce();
  });
});
