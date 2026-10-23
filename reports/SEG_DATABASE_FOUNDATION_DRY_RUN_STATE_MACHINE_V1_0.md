# SEG DATABASE FOUNDATION DRY-RUN STATE MACHINE v1.0

**Mode:** `CONCEPTUAL / DRY-RUN / NOT IMPLEMENTED`  
**Status:** `DESIGN_EVIDENCE_READY_FOR_REVIEW`

This document defines proposed state dimensions and transitions for later implementation. It does not create enum values, database records, policies, or activation behavior.

## Principle

A SEG content record has multiple independent governance dimensions. A single `status` field must not collapse source identity, medical review, rights, pathway, quality, publication, and implementation authorization into one irreversible value.

## State dimensions

| Dimension | Proposed states | Initial state | Terminal/controlled states |
|---|---|---|---|
| Source identity | `unresolved`, `evidenced`, `rejected` | `unresolved` | `evidenced` only with explicit source evidence; `rejected` blocks use |
| Metadata | `incomplete`, `under_review`, `complete`, `blocked` | `incomplete` | `complete` only when required fields are evidenced; `blocked` is non-publishable |
| Content/structural QA | `queued`, `in_review`, `passed`, `failed`, `rework_required` | `queued` | `passed` does not imply medical or rights approval |
| Medical review | `pending`, `under_review`, `approved`, `rejected`, `withdrawn` | `pending` | Only authorized medical owner/reviewer may decide; `approved` is not display permission |
| Rights review | `pending`, `under_review`, `cleared`, `restricted`, `rejected`, `withdrawn` | `pending` | `cleared` is required for the relevant display scope; it is not clinical approval |
| Pathway/taxonomy | `pending`, `under_review`, `accepted`, `rejected`, `unresolved` | `pending` | `accepted` requires explicit taxonomy/pathway evidence |
| Implementation authorization | `not_requested`, `under_review`, `authorized`, `rejected`, `expired` | `not_requested` | `authorized` requires separate owner decision and QA/security evidence |
| Publication | `not_eligible`, `eligible`, `active`, `withdrawn`, `blocked` | `not_eligible` | `active` is allowed only after all gates and authorization |

## Allowed transition direction

```text
unresolved/incomplete/queued/pending/not_requested
                    |
                    v
              under_review
                    |
          +---------+---------+
          |                   |
       approved/cleared/  rejected/blocked/
       accepted/passed    withdrawn/failed
          |                   |
          +---------+---------+
                    |
                    v
      Implementation Authorization Review
                    |
          +---------+---------+
          |                   |
       authorized          rejected/expired
          |
          v
       eligible -> active
```

The diagram is a conceptual direction. It must not be interpreted as permission to transition any current or future record.

## Transition guards

| Transition | Required guards | Forbidden shortcut |
|---|---|---|
| Source `unresolved → evidenced` | Stable source evidence, locator, and identity decision | Title/topic similarity alone |
| Metadata `incomplete → complete` | Required source/version/reference/rights/taxonomy fields evidenced | Filling unknown fields from assumptions |
| Medical `pending → approved` | Independent clinical review by authorized medical owner/reviewer | External book authority or automated pass |
| Rights `pending → cleared` | Rights evidence, license/display scope, artifact locator, rights decision | Medical approval or source availability alone |
| Pathway `pending → accepted` | Approved taxonomy and explicit Internship/Resident/Shared Core scope | Folder, filename, or user role alone |
| QA `in_review → passed` | Structural and provenance checks pass | Treating parse success as clinical correctness |
| Authorization `not_requested → authorized` | Separate implementation authorization with owner, reviewer, security, rollback, and QA | Design document alone |
| Publication `eligible → active` | All required gates pass, authorization recorded, release manifest verified | Import or migration completion alone |
| Any active state → withdrawn/blocked | Evidence of rights, clinical, security, or release failure | Deleting history or silently hiding the reason |

## Global visibility rule

A learner-facing read must require, at minimum:

```text
source identity evidenced
AND metadata complete
AND structural QA passed
AND medical review approved
AND rights/display cleared for requested scope
AND pathway/taxonomy accepted
AND implementation authorized
AND publication state active
```

If any required condition is false, unresolved, rejected, restricted, withdrawn, or absent, the record remains non-visible. This is a future testable rule, not an implemented policy.

## Clinical Case handling

`clinical_case` remains a valid v1.1 content type. The evidence phrase `NOT_SUPPORTED` is represented as an unresolved implementation decision, not as a transition to `rejected` and not as removal from the contract. No case record may enter this state machine until the interpretation is resolved and the type-specific payload boundary is approved.

## Audit requirement

Every state transition must create an append-only event containing event type, actor, timestamp, prior state, new state, reason/evidence pointer where available, and the governed object identity. No transition may delete or mutate prior decision history.

## References

[1]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 canonical additive profile"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_EVIDENCE_REVIEW_22.md "Additional Evidence Review 22"

[3]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_DESIGN_PACKAGE_V1_0.md "SEG Database Foundation DRY-RUN Design Package v1.0"

[4]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
