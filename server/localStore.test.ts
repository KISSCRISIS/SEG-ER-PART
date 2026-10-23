import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { expect, it } from "vitest";
import { LocalStore } from "./localStore";

it("persists dates and exam position across reopening and isolates users", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "seg-local-test-"));
  const filename = path.join(directory, "workspace.sqlite");
  let store = new LocalStore(filename);
  try {
    const date = new Date();
    store.put("exams", 1, "exam", { currentIndex: 4, date }, true);
    store.put("studyPlans", 1, "current", { planId: "residency-year-2", dailyHours: 2, restDays: [5] });
    const dailyPlan = { date: "2026-09-09", tasks: [{ id: "residency-year-2-learn", href: "/learn?section=3&family=FRCEM&chapter=2", minutes: 45 }] };
    store.put("dailyPlans", 1, "2026-09-09:residency-year-2", dailyPlan, true);
    store.put("studyTaskCompletions", 1, "2026-09-09:learn", { completed: true });
    store.put("studyTaskCompletions", 1, "2026-09-10:learn", { completed: false });
    store.put("studyTaskCompletions", 2, "2026-09-09:learn", { completed: false });
    expect(() => store.put("exams", 1, "exam", {}, true)).toThrow();
    store.update("exams", 2, "exam", { currentIndex: 99 });
    store.delete("exams", 2, "exam");
    store.close();
    store = new LocalStore(filename);
    expect(store.list("exams", 1)).toEqual([{ currentIndex: 4, date }]);
    expect(store.list("exams", 2)).toEqual([]);
    expect(store.list("studyPlans", 1)).toEqual([{ planId: "residency-year-2", dailyHours: 2, restDays: [5] }]);
    expect(store.list("studyPlans", 2)).toEqual([]);
    expect(store.list("dailyPlans", 1)).toEqual([dailyPlan]);
    expect(store.list("dailyPlans", 2)).toEqual([]);
    expect(store.list("studyTaskCompletions", 1)).toEqual([{ completed: true }, { completed: false }]);
    expect(store.list("studyTaskCompletions", 2)).toEqual([{ completed: false }]);
    store.update("exams", 1, "exam", { currentIndex: 5 });
    expect(store.list("exams", 1)).toEqual([{ currentIndex: 5, date }]);
  } finally { store.close(); rmSync(directory, { recursive: true }); }
});
