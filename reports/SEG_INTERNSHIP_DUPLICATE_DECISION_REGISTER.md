# SEG Internship Duplicate Decision Register

**Phase:** 5.2 — Internship Governed Source Metadata & Duplicate Review  
**Mode:** `READ_ONLY GOVERNANCE REVIEW`  
**Authority scope:** The four supplied authority inputs only.  
**Author:** Manus AI

## 1. Decision policy

The authority reports identify two duplicate families requiring canonical selection: **Drug Essentials** and **Emergency Cases**.[3] [4] This register documents the observed family members and the decision needed. It does not compare or rewrite medical meaning, select a canonical version, archive a source, or delete an original.

A repeated filename or path pattern is a duplicate **candidate signal**, not proof of semantic identity. A future decision requires attributable owner/version evidence, content comparison under a controlled review, source locators, rights status, and an explicit decision record.

## 2. Duplicate family register

| Register ID | Duplicate family | Original files observed | Similarity reason | Recommended canonical source | Archive candidates | Decision status |
|---|---|---|---|---|---|---|
| `DUP-DRUG-001` | Drug Essentials | Base package and `Drug_Essentials_v2_Pack` contain matching logical roles: `drug_essentials_intern_level_v2.md`, `implementation_notes.md`, and `README.txt` | Same module, same logical filenames/topics, and mirrored base / `v2_Pack` path pattern in the catalog | `UNRESOLVED — no canonical source can be recommended from the supplied metadata alone` | `NOT_DESIGNATED`; after explicit canonical decision, the non-primary lineage may become audit-only if separately authorized | `BLOCKED_PENDING_CANONICAL_REVIEW` |
| `DUP-EMERGENCY-001` | Emergency Cases | Base package and `Emergency_Cases_v2_Pack` contain matching logical roles: `emergency_cases_intern_level.md`, `implementation_notes.md`, and `README.txt` | Same module, same logical filenames/topics, and mirrored base / `v2_Pack` path pattern in the catalog | `UNRESOLVED — no canonical source can be recommended from the supplied metadata alone` | `NOT_DESIGNATED`; preserve every lineage until a separate decision authorizes audit-only treatment | `BLOCKED_PENDING_CANONICAL_REVIEW` |

## 3. Family evidence

### 3.1 `DUP-DRUG-001` — Drug Essentials

The six catalog rows are:

- `SRC-0023` — `02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md`
- `SRC-0024` — `02_Internship/Drug_Essentials/implementation_notes.md`
- `SRC-0025` — `02_Internship/Drug_Essentials/README.txt`
- `SRC-0027` — `02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md`
- `SRC-0028` — `02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md`
- `SRC-0029` — `02_Internship/Drug_Essentials_v2_Pack/README.txt`

The base and `v2_Pack` pattern is the similarity reason recorded by the authority report. The catalog does not supply a governed version, checksum, owner, rights status, or content comparison result. Therefore, this register makes no winner/loser determination.[1] [3] [4]

### 3.2 `DUP-EMERGENCY-001` — Emergency Cases

The six catalog rows are:

- `SRC-0033` — `02_Internship/Emergency_Cases/emergency_cases_intern_level.md`
- `SRC-0034` — `02_Internship/Emergency_Cases/implementation_notes.md`
- `SRC-0035` — `02_Internship/Emergency_Cases/README.txt`
- `SRC-0037` — `02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md`
- `SRC-0038` — `02_Internship/Emergency_Cases_v2_Pack/implementation_notes.md`
- `SRC-0039` — `02_Internship/Emergency_Cases_v2_Pack/README.txt`

The authority report names the family as **Emergency Cases versions**. The catalog shows the base and `v2_Pack` pattern under Emergency Basics, with every row still `Needs review / verify` and `Check required`. No canonical source is selected.[1] [3] [4]

## 4. Non-duplicate candidate signals not adjudicated here

The catalog contains repeated `page` and `README` topics across multiple rotation or source-layer rows. Those repetitions may represent distinct pages, implementation artifacts, or source records, and the supplied authority report does not identify them as additional duplicate families. They remain `SOURCE_ROLE_OR_DUPLICATE_UNRESOLVED`; this register does not expand the authority-defined duplicate scope.[1] [4]

## 5. Preservation and non-actions

All original source paths remain preserved as catalog evidence. No source was deleted, renamed, overwritten, moved, normalized, or archived. No canonical content record was created, no medical content was rewritten, and no schema conversion, database import, application change, clinical approval, activation, commit, push, or deployment was performed.

## 6. Next allowed decision

A separately authorized duplicate review may compare the base and `v2_Pack` source contents using immutable fingerprints, explicit versions, owner/rights evidence, and traceable locators. The reviewer must record the canonical decision and the disposition of the non-primary lineage without deleting the original.

## References

[1]: /home/ubuntu/upload/SEG_INTERNSHIP_SOURCE_CATALOG.csv "SEG Internship source catalog"
[2]: /home/ubuntu/upload/SEG_INTERNSHIP_CONTENT_MASTER_MAP.md "SEG Internship Content Master Map"
[3]: /home/ubuntu/upload/SEG_INTERNSHIP_GAP_AND_DUPLICATE_REPORT.md "SEG Internship Gap and Duplicate Report"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_MAPPING_READINESS_REPORT.md "SEG Internship Schema Mapping Readiness Report"
