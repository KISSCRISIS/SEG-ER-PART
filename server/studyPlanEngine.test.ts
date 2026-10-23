import { describe, expect, it } from "vitest";
import { buildStudyPlan, type StudyPlanInput } from "../shared/study-plan-engine";
const input: StudyPlanInput = { planId: "residency-year-1", dailyHours: 0.5, restDays: [], completedContent: 0, totalContent: 204, qbankCorrect: 0, qbankAttempted: 0, weakAreas: ["airway"], examDate: "2026-09-20" };
describe("study schedule constraints", () => {
  it("keeps recovery and weak-area work inside the available budget near an exam", () => {
    const plan = buildStudyPlan(input, new Date("2026-09-09T12:00:00"));
    expect(plan.dailyTasks.reduce((sum, task) => sum + task.minutes, 0)).toBe(30);
    expect(plan.dailyTasks.some(task => task.kind === "review")).toBe(true);
  });
  it("respects rest days", () => {
    const now = new Date("2026-09-09T12:00:00");
    expect(buildStudyPlan({ ...input, restDays: [now.getDay()] }, now).dailyTasks).toEqual([]);
  });
  it("rejects invalid time budgets", () => {
    expect(() => buildStudyPlan({ ...input, dailyHours: NaN })).toThrow();
  });
  it("does not schedule new study tasks on or after the exam", () => {
    expect(buildStudyPlan(input, new Date("2026-09-20T00:00:00")).dailyTasks).toEqual([]);
    expect(buildStudyPlan(input, new Date("2026-09-21T12:00:00")).dailyTasks).toEqual([]);
    expect(buildStudyPlan(input, new Date("2026-09-19T12:00:00")).dailyTasks.length).toBeGreaterThan(0);
  });
});
