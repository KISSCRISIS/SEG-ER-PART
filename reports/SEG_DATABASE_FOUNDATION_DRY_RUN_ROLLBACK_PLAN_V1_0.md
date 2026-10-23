# SEG DATABASE FOUNDATION DRY-RUN ROLLBACK PLAN v1.0

**Mode:** `CONCEPTUAL / DRY-RUN / NOT IMPLEMENTED`  
**Status:** `DESIGN_EVIDENCE_READY_FOR_REVIEW`

This rollback plan is a future release-control design. It does not create a release manifest, run a migration, alter a database, or delete any source, record, asset, or audit event.

## Rollback principles

Rollback must be reversible, evidence-preserving, and scoped to the affected release or state transition. It must not delete original source materials, erase review decisions, rewrite audit history, silently merge representations, or restore learner visibility before all gates pass.

## Scenario matrix

| Scenario | Detection evidence | Immediate containment | Reversible response | Required preservation |
|---|---|---|---|---|
| v1.1 mapping mismatch | Contract-validation failure or unresolved relational semantics | Stop before implementation or publication | Mark design/release blocked; return to mapping review | Preserve canonical v1.1 contract and evidence notes |
| Incorrect source relation | Source/locator/identity review failure | Prevent record activation | Detach or supersede the relation through a reviewed event; do not delete source | Preserve source/artifact and lineage evidence |
| Checksum mismatch | Artifact hash differs from registered evidence | Block artifact and dependent record | Restore the last verified artifact/version from an approved manifest | Preserve both observed hashes and incident event |
| Review-state defect | Unauthorized or invalid transition detected | Freeze affected record scope | Revert current state to last governed non-public state through an auditable transition | Preserve prior/new states, actor, reason, and time |
| Rights/display leakage | Rights or display-scope test fails | Deny public/learner read immediately | Set display state to restricted/non-visible; investigate before any re-release | Preserve rights evidence, scope decision, and incident history |
| Cross-track visibility | Internship/Resident/Shared Core negative test fails | Block publication for affected scope | Restrict or withdraw the affected release; re-run pathway tests | Preserve track scope and policy evidence |
| Atlas asset issue | Asset rights/medical-review/locator mismatch | Hide asset relation from learner surfaces | End the relation in release state; do not delete asset identity | Preserve asset, rights, and relation audit history |
| Downstream learner reference defect | Progress/bookmark/exam-attempt integrity failure | Prevent new downstream references | Revoke affected release reference target under owner authorization | Do not rewrite learner history or source records |
| Partial release failure | Release manifest/hash mismatch or incomplete transaction | Hold all affected publication states | Restore from approved backup/release manifest | Preserve release ID, hashes, owner, and rollback event |
| Security/RLS regression | Positive/negative policy test failure | Disable affected read/write path | Restore last verified policy/release version through approved change control | Preserve test output and policy change history |

## Required rollback artifacts before implementation

| Artifact | Minimum content |
|---|---|
| Release manifest | Record IDs, source/artifact identities, versions, checksums, pathway scope, review and rights states |
| Backup/restore evidence | Target, timestamp, owner, restore test, integrity result |
| State-transition log | Prior state, new state, actor, reason, evidence pointer, timestamp |
| RLS test evidence | Positive and negative cases for learner, reviewer, governance, admin, service role, and audit reader |
| Ownership record | Medical owner, rights owner, technical owner, security reviewer, rollback authority |
| Rollback runbook | Exact reversible steps for the authorized target; not included in this dry run |
| Post-rollback verification | Visibility, lineage, audit immutability, pathway separation, and downstream-reference checks |

## Stop conditions

The release must remain blocked when source identity, version/checksum, rights/display, medical review, pathway scope, or implementation authorization is unresolved. A rollback is not a substitute for missing evidence or clinical review.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_DESIGN_PACKAGE_V1_0.md "SEG Database Foundation DRY-RUN Design Package v1.0"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_GAP_REGISTER.md "SEG Database Gap Register"

[3]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
