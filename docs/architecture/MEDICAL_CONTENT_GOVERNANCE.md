# Medical-content governance

## Data model

- `medicalContentItems`: stable identity, slug, content type, lifecycle, and current version number.
- `medicalContentRevisions`: immutable localized snapshots with evidence date and review state.
- `medicalSources`: normalized guidelines, journals, regulators, textbooks, and local protocols with access date and optional checksum.
- `medicalRevisionSources`: claim-level source mapping with locator and scope.
- `medicalClinicalReviews`: append-only decision, reviewer identity/credential, notes, checklist version, and timestamp.

## Controlled workflow

`draft -> in_review -> approved | changes_requested | rejected`

`changes_requested -> in_review`

Approved and rejected revisions are terminal. Any correction creates the next integer version. `server/medicalContentGovernance.ts` enforces allowed transitions and publication readiness. Database writes must be transactional: insert the review decision, update revision status, and update the stable item's current version only after all publication gates pass.

## Minimum publication gate

1. At least one provenance source is linked to the exact revision.
2. The latest clinical decision is `approved`.
3. Reviewer name and clinical credential are attributable.
4. The checklist version is recorded.
5. The item and revision locale/type pass schema validation.
6. The source review-through date is visible to users and monitored for staleness.

No seed content is approved by default. Imported legacy material starts as `draft` until provenance and clinical review are complete.
