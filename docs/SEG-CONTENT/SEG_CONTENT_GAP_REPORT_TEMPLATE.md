# SEG Content Gap Report Template

**Purpose:** Record missing evidence, source-access issues, metadata gaps, and governance blockers.
**Mode:** READ_ONLY; this report identifies defects and does not repair, rewrite, summarize, approve, import, or publish content.

## Report identity

| Field | Value |
|---|---|
| `gap_report_id` | |
| Created date-time UTC | |
| Reporter | |
| Package / artifact path | |
| `source_id` / `record_id` | |
| Source version | |
| Source SHA-256 | |
| Track / taxonomy context | |
| Intended phase | |
| Overall result | `PASS` / `FAIL` / `BLOCKED` |

## Evidence inventory

| Evidence ID | Artifact/report path | Version / SHA-256 | Source location | Evidence owner | Status |
|---|---|---|---|---|---|
| | | | | | |

## Gap register

| Gap ID | Gate | Field / path | Missing, conflicting, or unverified item | Code | Evidence pointer | Impact | Next action |
|---|---|---|---|---|---|---|---|
| | | | | `SOURCE_ACCESS_BLOCKED` / `REQUIRED_VALUE_MISSING` / `SCHEMA_MISMATCH` / `METADATA_INCOMPLETE` / `LINEAGE_BROKEN` / `TRACK_MIXED` / `GOVERNANCE_STATE_INVALID` / `CLINICAL_REVIEW_EVIDENCE_MISSING` / `RIGHTS_REVIEW_EVIDENCE_MISSING` / `IMPORT_CONTRACT_MISSING` / `DEPLOYMENT_OWNERSHIP_MISSING` | | | |

## Required gate checklist

| Gate | Required evidence | Result | Gap IDs |
|---|---|---|---|
| Source access and immutability | Original files accessible, preserved, and hashable | `PASS` / `FAIL` / `BLOCKED` | |
| Provenance | Source ID, owner/location, version, checksum, references | `PASS` / `FAIL` / `BLOCKED` | |
| Canonical schema | Exact schema path/version and valid candidate | `PASS` / `FAIL` / `BLOCKED` | |
| Rights | Text usage, image usage, display scope, license/decision | `PASS` / `FAIL` / `BLOCKED` | |
| Track/taxonomy | Explicit track context and taxonomy ID/version without conflict | `PASS` / `FAIL` / `BLOCKED` | |
| Clinical review | Qualified reviewer, decision, date, cited locations, unresolved-issue disposition | `PASS` / `FAIL` / `BLOCKED` | |
| Lineage | Stable IDs, source pointers, parent/child links only under an explicit contract | `PASS` / `FAIL` / `BLOCKED` | |
| Audit | Creation and processing events are append-only | `PASS` / `FAIL` / `BLOCKED` | |
| Content QA | Exact candidate passed structural and governance QA | `PASS` / `FAIL` / `BLOCKED` | |
| Implementation | Explicit target contract and per-run authorization | `PASS` / `FAIL` / `BLOCKED` | |
| Repository safety | Allowed paths only; no secrets/prohibited artifacts; diff check clean | `PASS` / `FAIL` / `BLOCKED` | |
| Deployment ownership/parity | Required only for release; owner and measured hashes exist | `PASS` / `FAIL` / `BLOCKED` / `NOT_APPLICABLE` | |

## Impact classification

| Impact level | Meaning |
|---|---|
| `LOW` | Documentation or non-critical metadata gap; no downstream handoff yet |
| `MEDIUM` | Blocks a specific review or QA gate but does not alter source integrity |
| `HIGH` | Blocks source identity, rights, track separation, clinical review, or lineage |
| `CRITICAL` | Could expose unapproved content, alter source meaning, bypass governance, or change application/database boundaries |

## Decision and handoff

| Field | Value |
|---|---|
| Confirmed findings | |
| Unverified findings | |
| Historical-only findings | |
| Required escalation | |
| Next allowed phase | |
| Prohibited next action | |
| Recheck trigger | |

A `PASS` means only that no gap was observed under the named contract. A `FAIL` means the artifact is readable but malformed. A `BLOCKED` result requires the exact gap to be resolved or formally escalated; do not edit the artifact to make the report pass.

## Explicit non-actions

```json
{
  "source_modified": false,
  "content_modified": false,
  "medical_claims_added": false,
  "clinical_review_performed": false,
  "approval_granted": false,
  "database_import_executed": false,
  "activation_performed": false,
  "publication_performed": false
}
```

## References

[1]: ../../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "SEG governed content-record schema"

[2]: ../../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG Content Integration Plan"

[3]: /home/ubuntu/skills/seg-content-qa/SKILL.md "SEG Content QA"
