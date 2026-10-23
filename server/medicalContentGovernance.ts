export const medicalRevisionStatuses = [
  "draft",
  "in_review",
  "changes_requested",
  "approved",
  "rejected",
] as const;

export type MedicalRevisionStatus = (typeof medicalRevisionStatuses)[number];

const allowedTransitions: Record<MedicalRevisionStatus, readonly MedicalRevisionStatus[]> = {
  draft: ["in_review"],
  in_review: ["changes_requested", "approved", "rejected"],
  changes_requested: ["in_review"],
  approved: [],
  rejected: [],
};

export function assertMedicalRevisionTransition(from: MedicalRevisionStatus, to: MedicalRevisionStatus) {
  if (!allowedTransitions[from].includes(to)) {
    throw new Error(`Invalid medical revision transition: ${from} -> ${to}`);
  }
}

export type PublishReadiness = {
  reviewStatus: MedicalRevisionStatus;
  sourceCount: number;
  reviewerName?: string | null;
  reviewerCredential?: string | null;
  checklistVersion?: string | null;
};

/** Publishing is fail-closed: an approved, attributable review and provenance are mandatory. */
export function assertMedicalRevisionPublishable(input: PublishReadiness) {
  if (input.reviewStatus !== "approved") throw new Error("Clinical approval is required before publication");
  if (input.sourceCount < 1) throw new Error("At least one provenance source is required before publication");
  if (!input.reviewerName?.trim() || !input.reviewerCredential?.trim()) {
    throw new Error("An attributable clinical reviewer and credential are required before publication");
  }
  if (!input.checklistVersion?.trim()) throw new Error("A clinical review checklist version is required before publication");
}
