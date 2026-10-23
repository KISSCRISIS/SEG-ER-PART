// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import TopicEvidenceCard from "./TopicEvidenceCard";
import type { TopicEvidence } from "@shared/study-plan-intelligence";

const sepsis: TopicEvidence = {
  topic: "Sepsis",
  system: "infectious-disease",
  learning: "In Progress",
  accuracy: 45,
  attempts: 12,
  repeatedErrors: 3,
  review: "Due",
  priority: 78,
  reasons: ["Qbank accuracy 45% across 12 attempts"],
};

describe("TopicEvidenceCard", () => {
  it("displays evidence for a priority topic", () => {
    render(<TopicEvidenceCard items={[sepsis]} />);
    expect(screen.getByText("Sepsis")).not.toBeNull();
    expect(screen.getByText("In Progress")).not.toBeNull();
    expect(screen.getByText("45% accuracy")).not.toBeNull();
    expect(screen.getByText("3")).not.toBeNull();
    expect(screen.getByText("Due")).not.toBeNull();
    expect(
      screen.getByText(/Qbank accuracy 45% across 12 attempts/)
    ).not.toBeNull();
  });

  it("handles missing evidence", () => {
    render(<TopicEvidenceCard items={[]} />);
    expect(
      screen.getByText(/No topic evidence yet/)
    ).not.toBeNull();
  });
});
