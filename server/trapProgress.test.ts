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
function api(id: number | null) {
  return appRouter.createCaller({ user: id === null ? null : { id, role: "user" }, req: {}, res: {} } as TrpcContext).revisionProgress;
}
it("requires authentication, validates trap IDs and isolates users", async () => {
  await expect(api(null).current()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  await expect(api(1).set({ trapId: "missing", completed: true })).rejects.toMatchObject({ code: "NOT_FOUND" });
  await api(1).set({ trapId: "TRP_0173", completed: true });
  await api(1).set({ trapId: "TRP_0173", completed: true });
  expect((await api(1).current()).completed).toBe(1);
  expect((await api(2).current()).completed).toBe(0);
});
it("undo updates requirements and imports cannot resurrect explicit undo", async () => {
  await api(1).set({ trapId: "TRP_0173", completed: false });
  await api(1).importLocal({ ids: ["TRP_0173", "TRP_0174", "TRP_0174", "missing"] });
  const progress = await api(1).current();
  expect(progress.completedIds).toEqual(["TRP_0174"]);
  expect(progress.remaining).toBe(progress.total - 1);
  expect(progress.requirementCompleted).toBe(false);
  expect(progress.nextHref).toContain("/practice/exam-traps?page=");
  await api(1).set({ trapId: "TRP_0174", completed: false });
  expect((await api(1).current()).completed).toBe(0);
});
