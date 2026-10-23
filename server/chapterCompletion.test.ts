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
it("persists explicit completion and undo per account, rejects invented chapters", async () => {
  const caller = (id: number) => appRouter.createCaller({ user: { id, role: "user" }, req: {}, res: {} } as TrpcContext).residentContent;
  const input = { family: "FRCEM" as const, chapterNumber: 1, completed: true };
  await caller(1).saveStudyProgress(input);
  await caller(1).saveStudyProgress(input);
  expect(await caller(1).studyProgress({ family: "FRCEM" })).toHaveLength(1);
  expect(await caller(2).studyProgress({ family: "FRCEM" })).toEqual([]);
  await caller(1).saveStudyProgress({ ...input, completed: false });
  expect((await caller(1).studyProgress({ family: "FRCEM" }))[0].completed).toBe(0);
  await expect(caller(1).saveStudyProgress({ ...input, chapterNumber: 99 })).rejects.toMatchObject({ code: "NOT_FOUND" });
});
