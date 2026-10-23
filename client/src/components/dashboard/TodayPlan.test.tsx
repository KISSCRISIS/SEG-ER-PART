// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import TodayPlan from "./TodayPlan";

const trainingPlan = {
  label: "PGY-3",
  focus: "Critical care",
  primarySectionId: 3,
  readingMinutes: 12,
  questionTarget: 20,
  reviewMinutes: 10,
};

describe("TodayPlan intelligence display", () => {
  it("shows task categories and layer-provided reasons", () => {
    render(
      <TodayPlan
        mastery={{
          attempted: 10,
          correct: 5,
          accuracy: 50,
          strongest: [],
          weakest: [
            {
              sectionId: 6,
              sectionTitle: "Stroke",
              attempted: 10,
              correct: 5,
              accuracy: 50,
              questionCount: 40,
            },
          ],
        }}
        practice={{
          attempted: 4,
          correct: 1,
          recent: [
            {
              questionId: "q-sepsis-1",
              family: "FRCEM",
              chapterNumber: 1,
              correct: 0,
              attemptedAt: "2026-09-10T10:00:00Z",
            },
            {
              questionId: "q-sepsis-1",
              family: "FRCEM",
              chapterNumber: 1,
              correct: false,
              attemptedAt: "2026-09-11T10:00:00Z",
            },
            {
              questionId: "q-sepsis-1",
              family: "FRCEM",
              chapterNumber: 1,
              correct: 0,
              attemptedAt: "2026-09-12T10:00:00Z",
            },
          ],
        }}
        exams={[]}
        notes={[]}
        trainingPlan={trainingPlan}
      />
    );
    expect(screen.getAllByText("LEARN").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("PRACTICE").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("REVIEW").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/RECOVERY · 92/)).not.toBeNull();
    expect(
      screen.getByText("Daily reading target — continue the current section")
    ).not.toBeNull();
    expect(
      screen.getAllByText(/3 repeated errors in recent attempts/).length
    ).toBeGreaterThanOrEqual(1);
  });
});
