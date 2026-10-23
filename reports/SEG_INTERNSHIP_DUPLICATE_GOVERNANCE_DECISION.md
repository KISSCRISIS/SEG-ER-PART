# SEG Internship Duplicate Governance Decision

**Phase:** 5.11 — Governance Closure & Schema Authorization Preparation  
**Mode:** `READ_ONLY GOVERNANCE CLOSURE`  
**Generated at (UTC):** `2026-08-17T19:57:52Z`  
**Decision state:** `BLOCKED_PENDING_CANONICAL_REVIEW` for both governed families.

## 1. Scope and rule

This decision record covers only the authority-defined duplicate families `DUP-DRUG-001` and `DUP-EMERGENCY-001`. The base and `v2_Pack` lineages are preserved as separate candidates. “Primary candidate” and “secondary candidate” below describe comparison roles only; neither is selected as canonical, approved, or eligible for archive. No merge or deletion is performed.[7]

## 2. Decision table

| Duplicate family | Primary candidate field | Secondary candidate field | Evidence available | Evidence missing | Archive decision | Decision state |
|---|---|---|---|---|---|---|
| `DUP-DRUG-001` | Candidate A: base lineage `SRC-0023`, `SRC-0024`, `SRC-0025` under `02_Internship/Drug_Essentials/`; **not designated as primary** | Candidate B: `SRC-0027`, `SRC-0028`, `SRC-0029` under `02_Internship/Drug_Essentials_v2_Pack/`; **not designated as secondary** | Registry rows, mirrored logical roles/filenames, preserved paths, and inventory SHA-256 values. | Readable body comparison, section/table diff, attributable owner/version, exact locators, rights evidence, and reviewer decision. Filename `v2` is not governed version evidence. | `NONE DESIGNATED — preserve both lineages`; no archive candidate. | `BLOCKED_PENDING_CANONICAL_REVIEW` |
| `DUP-EMERGENCY-001` | Candidate A: base lineage `SRC-0033`, `SRC-0034`, `SRC-0035` under `02_Internship/Emergency_Cases/`; **not designated as primary** | Candidate B: `SRC-0037`, `SRC-0038`, `SRC-0039` under `02_Internship/Emergency_Cases_v2_Pack/`; **not designated as secondary** | Registry rows, mirrored logical roles/filenames, preserved paths, and inventory SHA-256 values. | Readable body comparison, section/table diff, attributable owner/version, exact locators, rights evidence, and reviewer decision. Filename `v2` is not governed version evidence. | `NONE DESIGNATED — preserve both lineages`; no archive candidate. | `BLOCKED_PENDING_CANONICAL_REVIEW` |

## 3. Evidence interpretation

The final canonical review explicitly records content overlap and structural differences as `UNDETERMINED`, version evidence as `PARTIAL`, recommended canonical candidate as `UNRESOLVED — no candidate recommended`, and archive decision as `NONE DESIGNATED — preserve both lineages`.[7] This report carries those findings forward and does not convert mirrored path signals into a canonical decision.

A future authorized comparison must inspect the preserved original files and record per-file SHA-256, attributable owner/version, exact content and structure findings, source locators, rights evidence, and an explicit reviewer decision. The comparison must remain append-only and must not rewrite or normalize either lineage.

## 4. Duplicate gate result

| Gate | Status | Reason |
|---|---|---|
| Lineage preservation | `PASS` | Both base and `v2_Pack` lineages remain represented and unchanged. |
| Canonical selection | `BLOCKED` | No attributable comparison or reviewer decision establishes a primary. |
| Version closure | `BLOCKED` | `v2` is a filename/path signal, not governed per-file version evidence. |
| Rights closure | `BLOCKED` | Rights evidence remains `NOT_SUPPLIED` / unresolved. |
| Archive action | `BLOCKED / NONE DESIGNATED` | No archive candidate may be designated before canonical review and authorization. |

## 5. Explicit non-actions

No primary or secondary lineage was selected as canonical. No files were merged, deleted, renamed, moved, overwritten, archived, imported, converted to JSON, activated, committed, pushed, deployed, or published. No medical correctness decision was performed.

## Evidence inputs

| Input | SHA-256 |
|---|---|
| `SEG_INTERNSHIP_PHASE_5_10_SCHEMA_GATE_REPORT.md` | `d1638ea09c734e4f49e52db782da7aedcdfa9d2a56e81a4cd1f5d151732f9b84` |
| `SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md` | `d5f783057d4b4aba3bc5b89d50669abc5320d87c6581936918a4c484bc901236` |
| `SEG_INTERNSHIP_SCHEMA_FIELD_READINESS_MATRIX.md` | `d66742ac039b3578e814f65307422a861440fc019de0e2c62728f3be32380341` |
| `SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md` | `5e6fcbbf93e974e307d08451273f1b7881de83699a7cb7e03f6b5fc6c3f13e05` |
| `SEG_INTERNSHIP_SOURCE_REGISTRY_FINAL.md` | `10af917088cf240944a7cb38eb0eca219de5bf16688950a75540f39161347829` |
| `SEG_INTERNSHIP_DOCTOR_PATHWAY_CONTRACT.md` | `caebe048d971516db09f3b034aa476bfc286e87e79da4f1c51f9594e7a43a42a` |
| `SEG_INTERNSHIP_CANONICAL_REVIEW_FINAL.md` | `404dc8920dca70602bb9eb9a1aa281aead3d9acab5475c3684e4a4a79587e6ad` |

Observed registry records: **115**.  
Observed provisional source-to-schema mapping rows: **48**.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DOCTOR_PATHWAY_CONTRACT.md "SEG Internship Doctor Pathway Contract"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_5_10_SCHEMA_GATE_REPORT.md "Phase 5.10 Schema Gate Report"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md "Content Type Contract"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_FIELD_READINESS_MATRIX.md "Schema Field Readiness Matrix"
[5]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md "Source-to-Schema Mapping Plan"
[6]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_REGISTRY_FINAL.md "Final Source Registry"
[7]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CANONICAL_REVIEW_FINAL.md "Canonical Duplicate Review — Final"
[8]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical SEG governed manifest schema"
[9]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG Content Integration Plan"
