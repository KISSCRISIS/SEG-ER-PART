**Phase:** 6.5 — Controlled Reviewer Decision Package
**Mode:** `READ_ONLY DECISION PREPARATION`
**Generated at (UTC):** `2026-08-17T20:45:00Z`
**Author:** Manus AI

# SEG Internship Duplicate Decision Forms

## 1. Decision scope

These forms prepare, but do not issue, canonical duplicate decisions for `DUP-DRUG-001` and `DUP-EMERGENCY-001`. The terms Candidate A and Candidate B are comparison roles only. They are not canonical, approved, import-eligible, archived, or learner-facing states.

## 2. Shared evidence and decision rules

The available evidence establishes preserved family membership through registry rows, mirrored logical roles/filenames, preserved archive paths, and inventory SHA-256 values. It does not yet establish content overlap, structural equivalence, governed version, owner/publisher, rights, exact locators, or a canonical primary. A filename or directory signal such as `v2` is not governed version evidence.

The current no-delete policy is absolute for this package: all original files and paths remain preserved. Any future archive treatment would require a separate, explicitly authorized and rollback-safe decision; this package does not authorize it.

## 3. DUP-DRUG-001 decision form

| Item | Evidence / current role |
|---|---|
| Candidate A | Base lineage: `SRC-0023`, `SRC-0024`, `SRC-0025` |
| Candidate B | `Drug_Essentials_v2_Pack/` lineage: `SRC-0027`, `SRC-0028`, `SRC-0029` |
| Evidence available | Registry rows, mirrored logical roles/filenames, preserved paths, inventory SHA-256 values |
| Missing evidence | Readable body/section/table comparison, attributable owner/version, exact locators, rights, reviewer decision |
| Current state | `BLOCKED_PENDING_CANONICAL_REVIEW` |

### Candidate options and consequences

| Option | Consequence | Required condition |
|---|---|---|
| D1 | Retain both lineages as separate candidates with no canonical designation | Safest preservation state; does not resolve duplicate question |
| D2 | Designate Candidate A as primary and Candidate B as secondary, with no deletion | Requires file-level comparison, governed version, rights, reviewer decision, and rollback statement |
| D3 | Designate Candidate B as primary and Candidate A as secondary, with no deletion | Same evidence requirements as D2; `v2` signal alone is insufficient |
| D4 | Determine that the family is not a duplicate and retain both as distinct sources | Requires documented comparison showing material differences and attributable decision |

**Required decision:** `PENDING`. **Primary recommendation:** `NONE DESIGNATED` until the required comparison is completed.

## 4. DUP-EMERGENCY-001 decision form

| Item | Evidence / current role |
|---|---|
| Candidate A | Base lineage: `SRC-0033`, `SRC-0034`, `SRC-0035` |
| Candidate B | `Emergency_Cases_v2_Pack/` lineage: `SRC-0037`, `SRC-0038`, `SRC-0039` |
| Evidence available | Registry rows, mirrored logical roles/filenames, preserved paths, inventory SHA-256 values |
| Missing evidence | Readable body/section/table comparison, attributable owner/version, exact locators, rights, reviewer decision |
| Current state | `BLOCKED_PENDING_CANONICAL_REVIEW` |

### Candidate options and consequences

| Option | Consequence | Required condition |
|---|---|---|
| E1 | Retain both lineages as separate candidates with no canonical designation | Safest preservation state; does not resolve duplicate question |
| E2 | Designate Candidate A as primary and Candidate B as secondary, with no deletion | Requires file-level comparison, governed version, rights, reviewer decision, and rollback statement |
| E3 | Designate Candidate B as primary and Candidate A as secondary, with no deletion | Same evidence requirements as E2; `v2` signal alone is insufficient |
| E4 | Determine that the family is not a duplicate and retain both as distinct sources | Requires documented comparison showing material differences and attributable decision |

**Required decision:** `PENDING`. **Primary recommendation:** `NONE DESIGNATED` until the required comparison is completed.

## 5. Required approver and evidence package

An authorized source/governance reviewer must select an option separately for each family, cite file-level comparisons and SHA-256 values, record owner/version/rights and exact locators, distinguish source governance from clinical correctness, preserve every original lineage, and create an append-only decision and rollback statement. No decision is granted by this form.

## Non-actions and scope boundary

This package prepares human/governance decisions only. No approval was granted. No clinical or relevant review decision was issued. No identifier was renamed, merged, replaced, or normalized. No duplicate was selected as canonical, archived, deleted, or merged. No contract was adopted as a canonical enum. No schema conversion, JSON generation, database import, production record, application/database change, activation, commit, push, deployment, or publication was performed.
## References

[1]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DUPLICATE_FINALIZATION_REPORT.md` "Phase 6.4 Duplicate Finalization Report"
[2]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DUPLICATE_GOVERNANCE_DECISION.md` "Duplicate Governance Decision"
[3]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_AUTHORIZATION_CHECKLIST.md` "Schema Authorization Checklist"
