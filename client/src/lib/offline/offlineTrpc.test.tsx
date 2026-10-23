/**
 * Facade hook tests: useQueries mapper style (as ResidentPracticePage uses
 * it) plus queryOptions objects, against the real bundled content.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { beforeAll, describe, expect, it } from "vitest";
import { offlineTrpc } from "./offlineTrpc";
import { authProcedures } from "./procedures";
import { stubContentFetch } from "./test-utils";

beforeAll(() => {
  stubContentFetch();
});

function wrapper({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
}

describe("offlineTrpc batch queries", () => {
  it("runs a useQueries mapper over questionsByIds chunks", async () => {
    await authProcedures.login({ email: "hooks@example.com", remember: true });
    const { result } = renderHook(
      () =>
        (offlineTrpc.useQueries as (mapper: (t: any) => any[]) => Array<{ data?: unknown[] }>)((t: any) => [
          t.residentContent.questionCatalog({}),
        ]),
      { wrapper }
    );
    await waitFor(() => expect(result.current[0]?.data).toBeDefined(), { timeout: 60000 });
    const banks = result.current[0].data as Array<{ count: number }>;
    expect(banks.reduce((sum, bank) => sum + bank.count, 0)).toBeGreaterThan(1000);
  }, 90000);

  it("exposes queryOptions objects for manual useQueries", async () => {
    await authProcedures.login({ email: "hooks2@example.com", remember: true });
    const options = (offlineTrpc.residentContent as any).chapters.queryOptions({ family: "HIPPO" });
    expect(Array.isArray(options.queryKey)).toBe(true);
    expect(typeof options.queryFn).toBe("function");
    const chapters = await options.queryFn();
    expect(chapters.length).toBeGreaterThan(0);
    expect(chapters.every((c: { family: string }) => c.family === "HIPPO")).toBe(true);
  }, 90000);
});
