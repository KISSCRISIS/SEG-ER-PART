import { expect, it } from "vitest";
import { isCalendarDate, studyWeek } from "./study-calendar";
it("rejects rolled-over dates and respects leap years", () => {
  expect(isCalendarDate("2026-02-30")).toBe(false);
  expect(isCalendarDate("2024-02-29")).toBe(true);
});
it("crosses month boundaries and excludes rest and exam days", () => {
  const days = studyWeek("2026-09-30", 2, [5], "2026-10-04");
  expect(days.map(day => day.minutes)).toEqual([120, 120, 0, 120, 0, 0, 0]);
  expect(days[6].date).toBe("2026-10-06");
});
