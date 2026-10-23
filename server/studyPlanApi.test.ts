import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

vi.mock("./localStore", async importOriginal => {
  const actual = await importOriginal<typeof import("./localStore")>();
  const store = new actual.LocalStore(":memory:");
  return { ...actual, localStore: () => store, localStorageEnabled: () => true };
});
import { appRouter } from "./routers";
import { localStore } from "./localStore";

function caller(id: number | null) {
  const ctx: TrpcContext = {
    user: id === null ? null : { id, openId: `test-${id}`, email: null, name: "Test", loginMethod: "local", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { headers: {}, protocol: "http" } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
  return appRouter.createCaller(ctx).studyPlan;
}
const settings = { planId: "residency-year-1" as const, dailyHours: 1, restDays: [] };
beforeAll(() => vi.useFakeTimers({ toFake: ["Date"] }).setSystemTime(new Date("2026-09-09T12:00:00Z")));
afterAll(() => { vi.useRealTimers(); localStore().close(); });

describe("study plan API with SQLite", () => {
  it("requires an authenticated user", async () => {
    await expect(caller(null).current()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
  it("rejects impossible exam dates", async () => {
    await expect(caller(1).save({ ...settings, examDate: "2026-02-30" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
  it("stores assigned tasks and isolates users", async () => {
    await caller(1).save(settings);
    const day = await caller(1).today();
    expect(day?.tasks.length).toBeGreaterThan(0);
    const taskId = day!.tasks[0].id;
    await caller(1).completeTask({ date: day!.date, taskId, completed: true });
    expect(await caller(1).taskCompletions({ date: day!.date })).toEqual([expect.objectContaining({ taskId, completed: true })]);
    expect(await caller(2).current()).toBeNull();
    expect(await caller(2).taskCompletions({ date: day!.date })).toEqual([]);
    await expect(caller(2).completeTask({ date: day!.date, taskId, completed: true })).rejects.toThrow();
    await expect(caller(1).completeTask({ date: "2026-09-10", taskId, completed: true })).rejects.toThrow("not assigned");
    await caller(1).save({ ...settings, dailyHours: 3 });
    expect((await caller(1).today())?.tasks).toEqual(day?.tasks);
  });
});
