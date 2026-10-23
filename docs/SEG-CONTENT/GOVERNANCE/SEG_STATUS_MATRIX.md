# SEG Unified Status Matrix

**Purpose:** Use separate operational states for intake, provenance, rights, clinical review, QA, implementation, and release.
**Important:** A status in this matrix is an observed evidence state. It does not grant clinical approval, activation, import, or publication.

## Operational states

| State | Meaning | Minimum evidence | Owner / decision source | Next allowed phase |
|---|---|---|---|---|
| `NOT_STARTED` | No work has been performed for the named gate | Identified record or package only | Intake owner | Source handoff |
| `PENDING_INTAKE` | Source package is handed off but not fully inventoried | Handoff owner, timestamp, intake location | Source mapper | READ_ONLY intake |
| `IN_INTAKE` | Metadata and file identity are being inspected | File inventory and observed fields | Source mapper | Schema validation or blocker register |
| `UNDER_SCHEMA_REVIEW` | Candidate is being checked against the named canonical/architecture contract | Exact schema path/version and candidate hash | Schema validator | Rights/provenance review or correction outside validator |
| `BLOCKED` | A critical field, evidence, identity, rights, taxonomy, track, access, or authorization gate is absent or ambiguous | Exact blocker code and evidence pointer | Gate owner / escalation | Evidence completion or escalation |
| `RIGHTS_UNDER_REVIEW` | Text/image usage and display scope are awaiting an independent decision | Rights evidence package | Rights reviewer | Medical review only when rights gate permits |
| `RIGHTS_CLEAR` | Rights evidence is complete and internally consistent | Usage fields and rights decision record | Rights reviewer | Medical review / governance registration |
| `CLINICAL_REVIEW_PENDING` | Qualified clinical review has not yet completed | Reviewer assignment or pending decision record | Clinical governance owner | Clinical review |
| `UNDER_CLINICAL_REVIEW` | Qualified reviewer is evaluating the supplied artifact | Reviewer identity/role, source locators, review scope | Clinical reviewer | Governance decision record |
| `APPROVED` | An independent governance record explicitly evidences approval | Clinical and rights decisions, track/taxonomy, audit | Authorized governance record | Content QA; later integration only with separate authorization |
| `REJECTED` | An independent governance record rejects the candidate | Rejection decision and rationale/evidence | Authorized governance record | Remain unavailable; new candidate or new decision |
| `WITHDRAWN` | Previously governed content is withdrawn by an evidenced decision | Withdrawal decision, timestamp, reason | Authorized governance record | Remain unavailable; new review required for any return |
| `PILOT_PENDING_REVIEW` | Provisional Pilot Converter output exists | Source/output hashes and traceability package | Pilot Converter | Clinical review; never learner-facing |
| `QA_PENDING` | Exact artifact is awaiting Content QA | Artifact path/hash and input contract | QA owner | Content QA |
| `QA_PASS` | Exact artifact passed structural and governance QA checks | QA report, hashes, gate results | Content QA | Authorized integration/release dry-run only |
| `QA_FAIL` | Artifact is readable but fails a QA gate | Exact failure code and path | Content QA | Return to source owner or prior gate; do not repair silently |
| `IMPLEMENTATION_AUTHORIZATION_PENDING` | Governance/QA may be complete but no per-run implementation command exists | Named target, artifact, allowed paths, consequence missing or awaiting confirmation | Implementation owner | Dry-run preparation only |
| `INTEGRATION_DRY_RUN` | Field mapping, target, idempotency, isolation, and rollback are being checked | Explicit contract and dry-run report | Integration owner | Separate implementation authorization |
| `RELEASE_DRY_RUN` | Release candidate and rollback evidence are being assembled | Release manifest, exact hashes, gates, owner | Release owner | Explicit release authorization |
| `RELEASE_BLOCKED` | Release lacks governance, QA, ownership, parity, or rollback evidence | Blocker code such as `DEPLOYMENT_OWNERSHIP_MISSING` | Release gate | Evidence recovery; current release unchanged |
| `RELEASED_NOT_ACTIVATED` | Authorized repository release exists, but learner-facing activation is not evidenced | Commit/release identity and verification | Release owner | Separate activation decision, if allowed |
| `ACTIVATED` | Only approved content was exposed through an authorized reversible adapter | Approval, QA, implementation, release, runtime, and rollback evidence | Authorized implementation/release record | Monitoring and periodic review |
| `DEFERRED` | Work is intentionally postponed with a recorded reason | Decision log entry and next review point | Authorized decision owner | Explicitly named future phase |

## Canonical medical-review mapping

The canonical manifest’s `medical_review.decision` accepts only `draft`, `under_review`, `approved`, `rejected`, and `withdrawn` [1]. Operational states such as `PENDING_INTAKE`, `BLOCKED`, `QA_PASS`, and `RELEASE_DRY_RUN` must remain external status metadata and must not be inserted into the canonical decision field.

`APPROVED` is valid only when observed in an independently attributable governance record. A mapper, schema validator, Pilot Converter, QA report, template, integration dry-run, or release plan cannot assign it. `WITHDRAWN` cannot return to `APPROVED` automatically; a new documented review decision is required [2].

## Gate transition rules

| From | To | Required condition |
|---|---|---|
| `PENDING_INTAKE` | `IN_INTAKE` | Source package is accessible and preserved |
| `IN_INTAKE` | `UNDER_SCHEMA_REVIEW` | Source identity/version/location/checksum and required metadata are mapped or blockers recorded |
| `UNDER_SCHEMA_REVIEW` | `RIGHTS_UNDER_REVIEW` | Canonical/architecture validation result is structurally usable |
| `RIGHTS_UNDER_REVIEW` | `CLINICAL_REVIEW_PENDING` | Rights evidence is clear or explicitly marked as the permitted pending state |
| `CLINICAL_REVIEW_PENDING` | `UNDER_CLINICAL_REVIEW` | Qualified reviewer role/identity and scope are supplied |
| `UNDER_CLINICAL_REVIEW` | `APPROVED` / `REJECTED` / `WITHDRAWN` | Independent decision record with cited evidence exists |
| `APPROVED` | `QA_PENDING` | Exact approved artifact is identified and hashes are recorded |
| `QA_PASS` | `INTEGRATION_DRY_RUN` | Separate implementation target contract is supplied |
| `INTEGRATION_DRY_RUN` | `RELEASE_DRY_RUN` | Mapping, idempotency, isolation, and rollback checks pass |
| `RELEASE_DRY_RUN` | `RELEASED_NOT_ACTIVATED` | Explicit per-run authorization names artifact, target, branch, and consequence |
| Any state | `BLOCKED` | A required gate is absent, ambiguous, conflicting, or unsafe |

## Forbidden transitions

No operational state can by itself authorize medical claims, clinical review completion, approval, activation, database import, application exposure, commit, push, deployment, or publication. Draft, under-review, rejected, and withdrawn records must not be exposed to learners.

## References

[1]: ../../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "SEG governed content-record schema"

[2]: ../../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG Content Integration Plan"

[3]: /home/ubuntu/skills/seg-medical-governance/SKILL.md "SEG Medical Governance"

[4]: /home/ubuntu/skills/seg-content-qa/SKILL.md "SEG Content QA"
