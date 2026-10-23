import { describe, expect, it } from "vitest";
import { assertMedicalRevisionPublishable, assertMedicalRevisionTransition } from "./medicalContentGovernance";

describe("medical content governance", () => {
  it("allows the controlled clinical review workflow", () => {
    expect(() => assertMedicalRevisionTransition("draft", "in_review")).not.toThrow();
    expect(() => assertMedicalRevisionTransition("in_review", "approved")).not.toThrow();
  });

  it("keeps approved revisions immutable", () => {
    expect(() => assertMedicalRevisionTransition("approved", "draft")).toThrow(/Invalid medical revision transition/);
  });

  it("fails closed when approval or provenance is incomplete", () => {
    expect(() => assertMedicalRevisionPublishable({ reviewStatus: "draft", sourceCount: 1 })).toThrow(/Clinical approval/);
    expect(() => assertMedicalRevisionPublishable({ reviewStatus: "approved", sourceCount: 0 })).toThrow(/provenance/);
  });

  it("accepts an attributable, sourced clinical approval", () => {
    expect(() => assertMedicalRevisionPublishable({
      reviewStatus: "approved",
      sourceCount: 2,
      reviewerName: "Clinical Reviewer",
      reviewerCredential: "Emergency Medicine Specialist",
      checklistVersion: "SEG-CR-1",
    })).not.toThrow();
  });
});
