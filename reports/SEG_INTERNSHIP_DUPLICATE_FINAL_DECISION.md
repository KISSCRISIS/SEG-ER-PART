# SEG Internship Duplicate Final Decision

**Phase:** 5.3 — Internship Source Governance Handoff  
**Mode:** `READ_ONLY GOVERNANCE PREPARATION`  
**Decision scope:** Drug Essentials and Emergency Cases only, as identified by the authority reports.  
**Author:** Manus AI

## 1. Decision rule

This document records the final handoff state of duplicate decisions. It does not delete, modify, rewrite, archive, or canonically select source content. Filename/path similarity remains a candidate signal; it is not proof that one lineage is medically or editorially primary.[2] [3] [5]

## 2. Decision register

| Family | Source lineage | Candidate primary | Archive candidate | Decision state |
|---|---|---|---|---|
| Drug Essentials | Base package: `SRC-0023` `drug_essentials_intern_level_v2.md`; `SRC-0024` `implementation_notes.md`; `SRC-0025` `README.txt`.<br><br>v2 package: `SRC-0027` `drug_essentials_intern_level_v2.md`; `SRC-0028` `implementation_notes.md`; `SRC-0029` `README.txt`. | `UNRESOLVED — neither base nor v2 package can be designated primary from supplied evidence` | `NONE DESIGNATED — preserve both lineages` | `BLOCKED_PENDING_CANONICAL_REVIEW` |
| Emergency Cases | Base package: `SRC-0033` `emergency_cases_intern_level.md`; `SRC-0034` `implementation_notes.md`; `SRC-0035` `README.txt`.<br><br>v2 package: `SRC-0037` `emergency_cases_intern_level.md`; `SRC-0038` `implementation_notes.md`; `SRC-0039` `README.txt`. | `UNRESOLVED — neither base nor v2 package can be designated primary from supplied evidence` | `NONE DESIGNATED — preserve both lineages` | `BLOCKED_PENDING_CANONICAL_REVIEW` |

## 3. Decision rationale

The catalog and Phase 5.2 reports show mirrored logical roles and a base/`v2_Pack` pattern, but they do not provide attributable owner, governed version, checksums, rights evidence, exact locators, or a controlled content comparison. Every involved row remains `Needs review / verify` and `Check required`.[1] [2] [3]

Therefore, no candidate primary can be named without creating an unsupported governance decision. The phrase `candidate primary` is intentionally set to `UNRESOLVED`; it does not imply that either package is defective or secondary.

## 4. Preservation controls

No source is deleted, moved, renamed, overwritten, rewritten, or placed into an archive. `Archive candidate` is `NONE DESIGNATED` for both families. Any future audit-only disposition must be recorded only after a separately authorized canonical decision, with full lineage retained.

## 5. Next allowed decision process

A separately authorized review may: fingerprint each original; confirm owner, version, rights, track, taxonomy, and locators; compare the two lineages; obtain clinical/rights review; then record a primary source and an audit-only disposition if justified. Until then, both lineages remain available and schema conversion remains blocked.

## References

[1]: /home/ubuntu/upload/SEG_INTERNSHIP_SOURCE_CATALOG.csv "SEG Internship source catalog"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_METADATA_AUDIT.md "SEG Internship source metadata audit"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DUPLICATE_DECISION_REGISTER.md "SEG Internship duplicate decision register"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_INTEGRATION_BLOCKER_REGISTER.md "SEG Internship integration blocker register"
[5]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_5_2_READINESS_REPORT.md "SEG Internship Phase 5.2 readiness report"
