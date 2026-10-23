// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import ErrorRecoveryCard from "./ErrorRecoveryCard";
import type { ClassifiedError } from "@shared/study-plan-intelligence";

const shock: ClassifiedError = {
  topic: "Shock",
  system: "critical-care",
  errorType: "Management Decision Error",
  severity: "High",
  action: "Review Shock algorithm + targeted MCQs",
  reasons: ["Qbank accuracy 35% across 12 attempts"],
};

describe("ErrorRecoveryCard", () => {
  it("displays classification, severity, and action", () => {
    render(<ErrorRecoveryCard errors={[shock]} />);
    expect(screen.getByText("Shock")).not.toBeNull();
    expect(screen.getByText(/Management Decision Error/)).not.toBeNull();
    expect(screen.getByText("High")).not.toBeNull();
    expect(
      screen.getByText(/Review Shock algorithm \+ targeted MCQs/)
    ).not.toBeNull();
    expect(
      screen.getByText(/Qbank accuracy 35% across 12 attempts/)
    ).not.toBeNull();
  });

  it("handles no classified errors", () => {
    render(<ErrorRecoveryCard errors={[]} />);
    expect(
      screen.getByText(/No classified errors right now/)
    ).not.toBeNull();
  });
});
