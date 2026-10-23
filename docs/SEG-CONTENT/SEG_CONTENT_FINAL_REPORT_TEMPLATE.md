# SEG Content Final Report Template

**Purpose:** Consolidate the evidence for one governed content package or pilot handoff.
**Mode:** Evidence report only; it does not certify clinical correctness, grant approval, activate content, import records, or publish.

## 1. Report identity

| Field | Value |
|---|---|
| `final_report_id` | |
| Created date-time UTC | |
| Report owner | |
| Package ID | |
| Source IDs | |
| Record IDs / artifact IDs | |
| Source version(s) | |
| Source SHA-256 value(s) | |
| Professional track(s) | |
| Taxonomy ID/version | |
| Intended phase | |
| Overall result | `PASS` / `FAIL` / `BLOCKED` |

## 2. Inventory summary

| Measure | Value | Evidence pointer |
|---|---:|---|
| Original source files received | | |
| Accessible source files | | |
| Source-access blockers | | |
| Explicit versions recorded | | |
| SHA-256 checksums recorded | | |
| Source locators observed | | |
| Rights records supplied | | |
| Track conflicts | | |

## 3. Source and schema validation

| Gate | Contract / evidence | Result | Report ID / path |
|---|---|---|---|
| Source mapping | Metadata/source mapping report | `PASS` / `FAIL` / `BLOCKED` | |
| Canonical schema | Schema path, version, candidate hash | `PASS` / `FAIL` / `BLOCKED` | |
| Required fields | No missing, blank, or guessed values | `PASS` / `FAIL` / `BLOCKED` | |
| References and locators | Every required reference is observed and traceable | `PASS` / `FAIL` / `BLOCKED` | |
| Rights metadata | Text/image/display scope evidence | `PASS` / `FAIL` / `BLOCKED` | |
| Track/taxonomy | Explicit and non-conflicting | `PASS` / `FAIL` / `BLOCKED` | |
| Audit trail | Append-only creation/processing events | `PASS` / `FAIL` / `BLOCKED` | |

## 4. Processing or pilot results

Use this section only when a separate, explicit Pilot Converter authorization exists. Do not manufacture counts or claim processing if no pilot ran.

| Artifact type | Count | ID range/list | Source traceability coverage | Review state |
|---|---:|---|---|---|
| Knowledge Units | | | | `Pending Clinical Review` / `NOT_APPROVED` |
| Modules | | | | `Pending Clinical Review` / `NOT_APPROVED` |
| Lessons | | | | `Pending Clinical Review` / `NOT_APPROVED` |
| Flashcards | | | | Not generated unless separately authorized |
| Assessments | | | | Not generated unless separately authorized |

## 5. Governance and QA

| Gate | Required evidence | Result | Evidence pointer |
|---|---|---|---|
| Rights/provenance review | Decision record and usage scope | `PASS` / `FAIL` / `BLOCKED` | |
| Clinical review | Qualified reviewer, decision, date, cited locators | `PASS` / `FAIL` / `BLOCKED` | |
| Governance registration | Record ID, version/checksum, taxonomy, audit events | `PASS` / `FAIL` / `BLOCKED` | |
| Content QA | Exact artifact hash and deterministic QA report | `PASS` / `FAIL` / `BLOCKED` | |
| Track separation | No unauthorized mixed tracks | `PASS` / `FAIL` / `BLOCKED` | |
| Source immutability | Input hash unchanged | `PASS` / `FAIL` / `BLOCKED` | |

A structural or QA `PASS` does not replace clinical correctness review or rights clearance. A complete governance package may hand off to Content QA, but integration requires separate implementation authorization.

## 6. Integration and release readiness

| Gate | Required evidence | Result |
|---|---|---|
| Explicit target contract | Versioned target and allowed paths | `PASS` / `FAIL` / `BLOCKED` / `NOT_APPLICABLE` |
| Field mapping | Every input field mapped explicitly; no guessed fields | `PASS` / `FAIL` / `BLOCKED` / `NOT_APPLICABLE` |
| Idempotency | Stable key, duplicate/conflict/retry rules | `PASS` / `FAIL` / `BLOCKED` / `NOT_APPLICABLE` |
| Empty-state fallback | Existing fallback preserved | `PASS` / `FAIL` / `BLOCKED` / `NOT_APPLICABLE` |
| Implementation authorization | Per-run authorization exists | `PASS` / `FAIL` / `BLOCKED` / `NOT_APPLICABLE` |
| Deployment ownership | `website_id`, project/task linkage, checkpoint/source | `PASS` / `FAIL` / `BLOCKED` / `NOT_APPLICABLE` |
| Local/remote/deployed parity | Measured artifact/runtime hashes | `PASS` / `FAIL` / `BLOCKED` / `NOT_APPLICABLE` |
| Rollback | Known-good release and reversible action | `PASS` / `FAIL` / `BLOCKED` / `NOT_APPLICABLE` |

## 7. Missing items and confirmed blockers

| ID | Finding | Classification | Code | Evidence pointer | Effect | Next allowed phase |
|---|---|---|---|---|---|---|
| | | `CONFIRMED` / `UNVERIFIED` / `HISTORICAL_ONLY` / `REQUIRES_VALIDATION` | | | | |

## 8. Final handoff decision

| Field | Value |
|---|---|
| Current review status | `Pending Clinical Review` / `NOT_APPROVED` / `APPROVED` / `REJECTED` / `WITHDRAWN` / `BLOCKED` |
| Integration readiness | `NOT_READY` / `DRY_RUN_ONLY` / `READY_AFTER_AUTHORIZATION` |
| Release readiness | `NOT_READY` / `BLOCKED` / `DRY_RUN_ONLY` / `AUTHORIZED` |
| Next allowed phase | |
| Prohibited action | |
| Required human decision | |

## Explicit non-actions

```json
{
  "content_modified": false,
  "clinical_correctness_certified": false,
  "approval_granted": false,
  "database_import_executed": false,
  "activation_performed": false,
  "commit_executed": false,
  "push_executed": false,
  "publication_executed": false
}
```

## References

[1]: GOVERNANCE/SEG_STATUS_MATRIX.md "SEG unified status matrix"

[2]: SEG_CONTENT_GAP_REPORT_TEMPLATE.md "SEG content gap report"

[3]: ../../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG Content Integration Plan"

[4]: /home/ubuntu/skills/seg-content-qa/SKILL.md "SEG Content QA"
