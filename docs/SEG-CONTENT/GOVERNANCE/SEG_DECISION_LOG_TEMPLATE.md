# SEG Decision Log Template

**Purpose:** Append-only record of observed governance and operational decisions.
**State:** Blank template; completing it does not grant approval or authorize implementation.

> Record only a decision supplied by an authorized participant or an observed evidence state. Do not create reviewer identities, credentials, signatures, clinical conclusions, rights decisions, approval dates, or deployment ownership.

## Decision record

| Field | Value |
|---|---|
| `decision_id` | |
| Decision date-time UTC | |
| Decision owner / authorized role | |
| Subject | |
| `record_id` / `source_id` / `mapping_id` | |
| Source version | |
| Source SHA-256 | |
| Professional track, explicitly supplied | |
| Taxonomy ID / version | |
| Decision type | `PROVENANCE` / `RIGHTS` / `TAXONOMY` / `CLINICAL_REVIEW` / `QA` / `IMPLEMENTATION_AUTHORIZATION` / `RELEASE` / `ROLLBACK` |
| Current operational status | `PENDING_INTAKE` / `UNDER_REVIEW` / `APPROVED` / `REJECTED` / `WITHDRAWN` / `BLOCKED` / other status from matrix |
| Canonical `medical_review.decision`, if observed | `draft` / `under_review` / `approved` / `rejected` / `withdrawn` / `NOT_APPLICABLE` |
| Supersedes decision ID | |

## Evidence and observed facts

| Evidence ID | Source / report path | Version / hash | Locator or section | Fact observed | Evidence owner |
|---|---|---|---|---|---|
| | | | | | |

## Separate decision streams

### Provenance and rights

| Field | Value |
|---|---|
| Publisher / owner evidence | |
| Location evidence | |
| Version / checksum evidence | |
| Text usage | |
| Image usage | |
| Display scope | |
| License or rights decision as supplied | |
| Rights reviewer role / identity | |
| Rights outcome | `PENDING` / `CLEAR` / `UNCLEAR` / `BLOCKED` |

### Clinical review

| Field | Value |
|---|---|
| Qualified reviewer role / identity as supplied | |
| Review scope | |
| Review date-time UTC | |
| Cited source locations | |
| Supplied clinical decision | `draft` / `under_review` / `approved` / `rejected` / `withdrawn` |
| Review comments / unresolved issues | |
| Disposition of unresolved issues | `OPEN` / `RESOLVED_BY_REVIEWER` / `ESCALATED` / `NOT_SUPPLIED` |

This template records a supplied clinical decision; it does not perform clinical reasoning or grant approval.

### QA and implementation

| Field | Value |
|---|---|
| QA report ID | |
| Exact candidate artifact path | |
| Candidate SHA-256 | |
| QA result | `PASS` / `FAIL` / `BLOCKED` |
| Implementation authorization ID | |
| Repository / branch / allowed paths | |
| Target environment | |
| Deployment owner / `website_id` / project-task linkage | |
| Idempotency and rollback evidence | |
| Implementation outcome | `NOT_AUTHORIZED` / `DRY_RUN_ONLY` / `AUTHORIZED` |

## Decision outcome

| Field | Value |
|---|---|
| Decision | `PENDING` / `APPROVED` / `REJECTED` / `DEFERRED` / `BLOCKED` / `WITHDRAWN` |
| Rationale supplied by authorized decision owner | |
| Conflicts identified | `SOURCE_CONFLICT` / `REVIEW_CONFLICT` / `TRACK_CONFLICT` / `RIGHTS_UNCLEAR` / `DOSE_OR_CLAIM_UNCLEAR` / `NONE_OBSERVED` |
| Blocker codes | |
| Next allowed phase | |
| Next review date | |
| Required escalation | |

## Append-only audit event

| Field | Value |
|---|---|
| Event name | |
| Actor | |
| Event date-time UTC | |
| Reason | |
| Previous decision ID / hash | |
| New decision record hash | |

## Explicit non-actions

```json
{
  "clinical_review_performed_by_template": false,
  "approval_granted_by_template": false,
  "activation_performed": false,
  "database_import_executed": false,
  "commit_executed": false,
  "push_executed": false,
  "deployment_executed": false
}
```

## References

[1]: ../../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "SEG governed content-record schema"

[2]: ../../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG Content Integration Plan"

[3]: /home/ubuntu/skills/seg-medical-governance/SKILL.md "SEG Medical Governance"
