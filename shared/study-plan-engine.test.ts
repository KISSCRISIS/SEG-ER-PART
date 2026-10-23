import { describe, expect, it } from "vitest";
import { buildStudyPlan } from "./study-plan-engine";
describe("study plan engine", () => {
  it("creates linked daily tasks and bounded progress", () => {
    const plan = buildStudyPlan({ planId: "jordan-board-part-2", dailyHours: 2, restDays: [5], completedContent: 20, totalContent: 100, qbankCorrect: 70, qbankAttempted: 100, weakAreas: ["airway"] }, new Date("2026-09-09T12:00:00"));
    expect(plan.progressPercentage).toBe(40); expect(plan.dailyTasks.map(task => task.kind)).toEqual(["learn", "review", "practice", "atlas", "journal"]); expect(plan.dailyTasks.every(task => task.href.startsWith("/"))).toBe(true);
  });
  it("prioritizes weak-area recovery and supports a new user", () => {
    const fresh = buildStudyPlan({ planId: "residency-year-1", dailyHours: 1, restDays: [], completedContent: 0, totalContent: 100, qbankCorrect: 0, qbankAttempted: 0, weakAreas: [] });
    expect(fresh.progressPercentage).toBe(0); expect(fresh.dailyTasks.length).toBe(4);
    const weak = buildStudyPlan({ planId: "residency-year-3", dailyHours: 2, restDays: [], completedContent: 50, totalContent: 100, qbankCorrect: 40, qbankAttempted: 100, weakAreas: ["shock"] });
    expect(weak.dailyTasks.some(task => task.priority === "high")).toBe(true);
  });
});
