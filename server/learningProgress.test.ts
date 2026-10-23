import { afterAll, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

vi.mock("./localStore", async importOriginal => {
  const actual = await importOriginal<typeof import("./localStore")>();
  const store = new actual.LocalStore(":memory:");
  return { ...actual, localStore: () => store, localStorageEnabled: () => true };
});

import { appRouter } from "./routers";
import { localStore } from "./localStore";

afterAll(() => localStore().close());

function api(userId: number | null) {
  return appRouter.createCaller({ user: userId === null ? null : { id: userId, role: "user" }, req: {}, res: {} } as TrpcContext).learningProgress;
}

it("persists pathway-scoped completion, supports undo, and isolates users", async () => {
  const item = { track: "resident-emergency-medicine", contentType: "tintinalli-summary-chapter", contentId: "tintinalli-manual-8e-ch-001" };
  await expect(api(null).current({ track: item.track, contentType: item.contentType })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  await api(1).set({ ...item, completed: true });
  await api(1).set({ ...item, completed: true });
  expect((await api(1).current({ track: item.track, contentType: item.contentType })).completedIds).toEqual([item.contentId]);
  expect((await api(2).current({ track: item.track, contentType: item.contentType })).completedIds).toEqual([]);
  await api(1).set({ ...item, completed: false });
  expect((await api(1).current({ track: item.track, contentType: item.contentType })).completedIds).toEqual([]);
});
