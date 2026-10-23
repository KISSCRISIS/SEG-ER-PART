# SEG Phase 7.5 — Controlled Content Mapping Dry Run Report

| Field | Value |
|---|---|
| Phase | `7.5 — Controlled Content Mapping Dry Run` |
| Mode | `READ_ONLY CONTENT MAPPING / REAL SOURCE INTAKE` |
| Validated at (UTC) | `2026-08-21T09:27:16Z` |
| Mapping plan input | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md` |
| Mapping plan SHA-256 | `5e6fcbbf93e974e307d08451273f1b7881de83699a7cb7e03f6b5fc6c3f13e05` |
| Source root | `/home/ubuntu/seg-internship-phase-5.6/staging/extracted` |
| Candidate rows | `48` |
| Production JSON generated | `NO` |
| Content modified | `false` |
| Source preserved | `true` |

## 1. Scope and decision

This dry run maps the **48 provisional candidate rows** already defined by the approved Phase 5.10 source-to-schema mapping plan. It does not create content records, stable content IDs, JSON, clinical summaries, references, or learner-facing payloads. The source package used for fingerprinting is the extracted Internship handoff under the source root recorded above.

> The mapping result is a provenance and schema-target handoff artifact. It is not clinical review, rights approval, schema validation of a production record, import authorization, activation, or publication.

The source paths and expected SHA-256 values from the prior mapping plan were matched against the accessible source files. All 48 rows matched. This confirms source identity and integrity for this dry run; it does **not** close the missing governance fields.

## 2. Mapping summary

| Candidate target | Count | Mapping result |
|---|---:|---|
| `lesson` | 16 | `BLOCKED` pending metadata/governance closure |
| `question_bank` | 17 | `BLOCKED` pending metadata/governance closure |
| `clinical_case` | 6 | `BLOCKED` pending metadata/governance closure |
| `clinical_skill` | 5 | `BLOCKED` pending metadata/governance closure |
| `book` | 4 | `BLOCKED` pending metadata/governance closure |

| Integrity check | Result |
|---|---|
| Source rows parsed | `48/48` |
| SHA-256 matches | `48/48` |
| Missing source files | `0` |
| SHA mismatches | `0` |
| Unknown or invented source paths | `0` |

## 3. Target mapping rules

| Source evidence classification | Provisional v1.1 target | Rule applied |
|---|---|---|
| Learning Content | `lesson` | Candidate only; filename/folder is not approval. |
| Assessment | `question_bank` | Candidate only; no conversion of questions was performed. |
| Clinical Cases | `clinical_case` | Candidate only; no case fields or clinical claims were extracted. |
| Skills / Procedures | `clinical_skill` | Candidate only; no competency or sign-off meaning was assigned. |
| Reference / Atlas | `book` | Candidate only; `book` remains canonical and no generic `reference` type was created. |

The `reference_framework` relationship was not populated in this dry run because no supplied framework metadata was asserted in the mapping input. No framework name, role, locator policy, or display scope was invented.

## 4. Governance gate findings

| Gate | Result | Evidence-based finding |
|---|---|---|
| Source access and SHA | `PASS` | 48/48 expected source files were accessible and matched their recorded SHA-256. |
| Publisher / owner | `BLOCKED` | Not supplied in the source mapping handoff. |
| Governed version | `BLOCKED` | A file checksum is present, but a governed source version/edition is not supplied. |
| Rights metadata | `BLOCKED` | Text usage, image usage, and display scope are not supplied. |
| Professional track | `BLOCKED` | The handoff contains a provisional Internship pathway signal; explicit `02_Internship` confirmation remains pending. |
| Taxonomy | `BLOCKED` | Taxonomy ID and taxonomy version are not supplied. |
| Clinical review | `BLOCKED` | Prior status is `clinical_review_status=NOT_PERFORMED`; this phase did not perform clinical review. |
| Precise content locator | `BLOCKED` | No section/page/question locator was asserted because this phase performed inventory/provenance mapping only. |
| Duplicate decision | `BLOCKED` where applicable | `DUP-DRUG-001` and/or `DUP-EMERGENCY-001` remain carried-forward unresolved findings for affected candidates. |

Accordingly, the aggregate mapping status is **`BLOCKED_PENDING_METADATA_AND_GOVERNANCE_EVIDENCE`**. The source identity gate passed, but the record-level handoff gate did not pass. No downstream candidate payload is authorized.

## 5. Detailed register

The complete row-level register is delivered separately as `SEG_PHASE_7_5_CONTENT_MAPPING_REGISTER.tsv`. Each row retains the source ID, exact source path, expected and observed SHA-256, provisional target, observed review state, and blocker codes. No full medical source text is copied into the register.

## 6. Non-actions and preservation evidence

| Protected action | Result |
|---|---|
| Original source files modified | `NO` |
| Original source files renamed/deleted/merged | `NO` |
| JSON candidate records generated | `NO` |
| v1.1 production records generated | `NO` |
| Clinical claims summarized or rewritten | `NO` |
| Clinical review performed | `NO` |
| Rights approved | `NO` |
| Database/application/auth/routes changed | `NO` |
| Import/adapter executed | `NO` |
| Activation/publication/learner exposure | `NO` |

The separate mapping report and TSV register are derivative evidence artifacts. The original sources remain the authority for any future extraction, and their SHA-256 values remain unchanged.

## 7. Gate decision and next allowed phase

**Phase 7.5 operation:** `DRY_RUN_COMPLETE`
**Handoff decision:** `BLOCKED_PENDING_METADATA_AND_GOVERNANCE_EVIDENCE`
**Phase 7.6 Controlled Candidate JSON:** `NOT_READY`

The next allowed work is closure of publisher/owner, governed version, rights, explicit professional track, taxonomy, precise locators, and carried-forward duplicate decisions, followed by the separately authorized validation gate. Phase 7.6 may begin only after those gates are explicitly closed; this dry run does not authorize JSON generation, import preparation, import, activation, or publication.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md "SEG Internship Source-to-Schema Mapping Plan"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_REGISTRY_FINAL.md "SEG Internship Source Registry — Final Handoff Register"
[3]: /home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG v1.1 isolated profile schema"
[4]: /home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG Metadata & Source Mapper"
[5]: /home/ubuntu/skills/seg-content-architecture-schema-validator/SKILL.md "SEG Content Architecture / Schema Validator"
