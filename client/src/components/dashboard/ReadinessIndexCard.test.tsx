// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import ReadinessIndexCard from "./ReadinessIndexCard";
import type { ReadinessBreakdown } from "./readiness";

const breakdown: ReadinessBreakdown = {
  coverage: 70,
  qbankPerformance: 65,
  priorityCompletion: 60,
  revisionCompliance: 80,
  recentTrend: 55,
};

describe("ReadinessIndexCard", () => {
  it("shows the green state without prediction language", () => {
    render(
      <ReadinessIndexCard score={85} band="green" breakdown={breakdown} />
    );
    expect(screen.getByText("Board Readiness Index")).not.toBeNull();
    expect(screen.getByText("On Track")).not.toBeNull();
    expect(screen.getByText("85%")).not.toBeNull();
    expect(
      screen.getByText(/not an exam outcome prediction/)
    ).not.toBeNull();
    expect(screen.queryByText(/probability of passing/i)).toBeNull();
    expect(screen.getByText("Content Coverage")).not.toBeNull();
    expect(
      screen.getByText("High Priority Topic Exposure")
    ).not.toBeNull();
  });

  it("shows the yellow state", () => {
    render(
      <ReadinessIndexCard score={70} band="yellow" breakdown={breakdown} />
    );
    expect(screen.getByText("Needs Attention")).not.toBeNull();
  });

  it("shows the red state", () => {
    render(
      <ReadinessIndexCard score={20} band="red" breakdown={breakdown} />
    );
    expect(screen.getByText("High Priority Improvement")).not.toBeNull();
  });
});
