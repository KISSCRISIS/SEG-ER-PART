# SEG Internship Schema Dry-Run Results

**Phase:** 6.0 — Controlled Schema Dry Run (Non-Production)  
**Mode:** `READ_ONLY CONVERSION SIMULATION`  
**Generated at (UTC):** `2026-08-17T20:07:13Z`  
**Overall result:** `DRY_RUN_BLOCKED`

## 1. Scope and boundary

This report documents a limited field-level simulation for exactly four selected candidates: one Learning Content candidate, one Assessment candidate, one Clinical Case candidate, and one Reference candidate. The Phase 5.11 governance gate remains `BLOCKED_PENDING_GOVERNANCE` and is not overridden by this simulation.

The exercise compares observed source structure with the candidate targets defined in Phase 5.10. It does not create a canonical record, JSON payload, database row, application artifact, approval decision, or activation state. Missing values remain missing; no medical meaning, provenance, rights, taxonomy, or review evidence was inferred.

## 2. Selected sample summary

| Sample | Source ID | Target | Pathway evidence | Dry-run result |
|---|---|---|---|---|
| Learning Content | `SRC-0007` | `lesson` | Clinical Foundation > Emergency Basics | Partial type-level match; overall blocked |
| Assessment Content | `SRC-0078` | `question_bank` | Unresolved pathway location | Partial item-payload match; overall blocked |
| Clinical Case | `SRC-0033` | Case schema simulation | Learning Engine > Clinical Cases | Not run as canonical record; blocked by missing case contract |
| Reference / Atlas | `SRC-0043` | Reference schema simulation | Core Rotations > Pediatrics | Partial book-like match; blocked by missing reference contract |

## 3. Sample-level results

## Learning Content — `SRC-0007`

| Field | Dry-run observation |
|---|---|
| Source ID | `SRC-0007` — provisional inventory identifier; not a production record ID. |
| Original file reference | `02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md` |
| SHA-256 | `6905896a44c7cd82696876ca5d6e4a7e0ca969d3d9af4e524390d26a0abc90fd` |
| Pathway location | `Clinical Foundation > Emergency Basics` |
| Target schema | `lesson` |
| Observed review state | `PENDING_METADATA_AND_REVIEW; clinical_review_status=NOT_PERFORMED` |
| Available fields/evidence | Provisional inventory source ID; exact archive path; SHA-256; title; intern level marker; source verification marker; pending review marker; lesson-like headings for initial assessment, ABCDE, common emergency presentations, escalation, and workflow; provisional pathway location. |
| Missing fields/evidence | record_id; canonical language field; publisher/owner; accessed_at; governed version value; exact content locator contract; references[] with reference_id/locator/supports; rights text/image/display fields; explicit taxonomy ID/version; reviewer identity and decision; append-only audit events; specialty/topic fields as governed values; clinical approval evidence. |
| Validation result | **PARTIAL TYPE-LEVEL MATCH / OVERALL BLOCKED. A lesson target is structurally plausible from the observed framework, but the canonical envelope and governance gates are incomplete.** |
| Blocking issues | Pending source verification; missing provenance/version/rights/taxonomy/references/reviewer/audit; no schema record created; Phase 5.11 remains BLOCKED_PENDING_GOVERNANCE. |

No medical payload was copied into this report. Only structural fields, source identifiers, headings, status markers, and governance findings were recorded.

## Assessment Content — `SRC-0078`

| Field | Dry-run observation |
|---|---|
| Source ID | `SRC-0078` — provisional inventory identifier; not a production record ID. |
| Original file reference | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-main.md` |
| SHA-256 | `189768c49b5be2df0a537a92d8c0a55ec0ea016d4f34ac10b314965a6eb10eac` |
| Pathway location | `UNRESOLVED — no unique pathway location supported by Phase 5.6 evidence` |
| Target schema | `question_bank` |
| Observed review state | `BLOCKED_PENDING_REVIEW; raw_extracted_unpublished_source; clinical_review_status=NOT_PERFORMED` |
| Available fields/evidence | Provisional inventory source ID; exact archive path; SHA-256; source-local ID phone-pediatrics-main; raw extracted/unpublished status; source-review-only audience; Pediatrics specialty marker; questionBank structure; item id; audience interns; examStyle internship-jmc; module Neonatal Respiratory Distress; MCQ type; question; options; correctAnswer; English and Arabic explanations; needsReview marker. |
| Missing fields/evidence | record_id; resolved pathway location; source ID reconciliation between SRC-0078 and phone-pediatrics-main; publisher/owner; accessed_at; governed version value; ordered item-level references/locators; rights text/image/display fields; explicit taxonomy ID/version; item-level difficulty (level=concise is not a governed difficulty value); reviewer identity and decision; append-only audit events; clinical approval evidence. |
| Validation result | **PARTIAL ITEM-PAYLOAD MATCH / OVERALL BLOCKED. The observed sample exposes question-bank-like fields, but it is raw unpublished source material and cannot pass the canonical envelope or review gates.** |
| Blocking issues | Publication policy says do_not_publish_directly; pathway unresolved; source-local ID conflict requires lineage reconciliation; missing references/rights/taxonomy/review/audit; no question-bank record created. |

No medical payload was copied into this report. Only structural fields, source identifiers, headings, status markers, and governance findings were recorded.

## Clinical Case — `SRC-0033`

| Field | Dry-run observation |
|---|---|
| Source ID | `SRC-0033` — provisional inventory identifier; not a production record ID. |
| Original file reference | `02_Internship/Emergency_Cases/emergency_cases_intern_level.md` |
| SHA-256 | `2b3afae2bf4d19d837f0075ca979c5810d49eb3e82f0dcb9356ce1a47962a99c` |
| Pathway location | `Learning Engine > Clinical Cases` |
| Target schema | `case schema simulation` |
| Observed review state | `PENDING_METADATA_AND_REVIEW; DUP-EMERGENCY-001 unresolved; clinical_review_status=NOT_PERFORMED` |
| Available fields/evidence | Provisional inventory source ID; exact archive path; SHA-256; Intern/JMC foundation level; English/main-language marker; educational-case label and disclaimer; source-informed synthesis marker; page purpose; case-thinking sequence; case-section headings including Presentation, What the intern should notice, Immediate thinking, Call senior early, and JMC/exam trap. |
| Missing fields/evidence | Authorized canonical case enum/contract; structured assessment/reasoning/management fields; case-type taxonomy; specialty/topic contract; record_id; publisher/owner; accessed_at; governed version; claim-level references and locators; rights/display scope; explicit taxonomy ID/version; reviewer identity/decision; audit events; canonical duplicate decision. |
| Validation result | **NOT RUN AS CANONICAL RECORD / BLOCKED. The current manifest has no case enum and Phase 5.10 requires an explicit authorized case contract/extension. Evidence was documented only; no unsupported case payload was simulated.** |
| Blocking issues | Missing authorized case contract/enum; duplicate family unresolved; incomplete governance metadata; no case schema target is currently legal under the canonical manifest. |

No medical payload was copied into this report. Only structural fields, source identifiers, headings, status markers, and governance findings were recorded.

## Reference / Atlas — `SRC-0043`

| Field | Dry-run observation |
|---|---|
| Source ID | `SRC-0043` — provisional inventory identifier; not a production record ID. |
| Original file reference | `02_Internship/Internship books SEG/Pediatrics_HighYield_Review.pdf` |
| SHA-256 | `9817f7cf2a905d76deb029a1658f81eb1c0e4e05e7de104ea71b6914626aee7a` |
| Pathway location | `Core Rotations > Pediatrics` |
| Target schema | `reference schema simulation` |
| Observed review state | `PENDING_METADATA_AND_REVIEW; clinical_review_status=NOT_PERFORMED` |
| Available fields/evidence | Provisional inventory source ID; exact PDF path; SHA-256; book-like title Pediatrics — High-Yield Review; author credit Dr Alaa Aqrabawi; 17-chapter table of contents; observed page locators 2–5; Pediatrics topic signal; English/Arabic content blocks; reference-style artifact classification. |
| Missing fields/evidence | Generic reference enum/contract; record_id; publisher/owner distinct from observed author credit; accessed_at; governed version; complete page/section locator register; references[] with supports; rights text/image/display scope; explicit 02_Internship track and taxonomy ID/version; reviewer identity/decision; audit events; display authorization. |
| Validation result | **PARTIAL BOOK-LIKE MATCH / OVERALL BLOCKED. A separate book-like target may be evaluated only after an explicit authorized reference contract; the current manifest has no generic reference enum.** |
| Blocking issues | Missing generic reference contract/enum; rights and provenance unresolved; no display scope decision; no canonical reference record created. |

No medical payload was copied into this report. Only structural fields, source identifiers, headings, status markers, and governance findings were recorded.


## 4. Aggregate dry-run findings

At the field-family level, the Learning candidate can be compared to the `lesson` target and the Assessment candidate exposes a question-bank-like item structure. These are **structural observations only**. Both remain blocked by the canonical envelope and governance requirements. The Clinical Case simulation was deliberately not executed as a canonical case record because the current manifest does not define a `case` enum or an authorized case contract. The Reference candidate is book-like, but the current manifest does not define a generic `reference` enum; a separate contract is required before a reference target can be validated.

| Result category | Count | Interpretation |
|---|---:|---|
| Field-level candidate matches | 2 | Learning and Assessment expose enough structural cues for a provisional comparison, not a valid record. |
| Canonical target blocked by missing contract | 2 | Clinical Case and Reference require explicit authorized contract handling. |
| Governance-ready records | 0 | Phase 5.11 remains blocked; no candidate is approved or import-ready. |

## 5. Input evidence hashes

| Input | Path | SHA-256 |
|---|---|---|
| `content_type_contract` | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md` | `d5f783057d4b4aba3bc5b89d50669abc5320d87c6581936918a4c484bc901236` |
| `field_readiness_matrix` | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_FIELD_READINESS_MATRIX.md` | `d66742ac039b3578e814f65307422a861440fc019de0e2c62728f3be32380341` |
| `source_schema_mapping_plan` | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md` | `5e6fcbbf93e974e307d08451273f1b7881de83699a7cb7e03f6b5fc6c3f13e05` |
| `phase_5_11_gate` | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_5_11_FINAL_GATE_REPORT.md` | `2c2ddf8edf96da2080dbcbc2d806b97d87fa6b1363b613818405d0b601605eb7` |
| `content_review_log` | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_REVIEW_DECISION_LOG.md` | `ee2133c373710b7a2dd99004e9d6c2c910ca693a7021d9763d160622972c880f` |

## 6. Explicit non-actions

| Action | Result |
|---|---|
| JSON production payload | `FALSE` |
| Database write/import | `FALSE` |
| Production record creation | `FALSE` |
| Application/database modification | `FALSE` |
| Original source modification | `FALSE` |
| Activation/publication | `FALSE` |
| Commit/push/deployment | `FALSE` |

## References

[1]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md "Phase 5.10 content type contract"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_FIELD_READINESS_MATRIX.md "Phase 5.10 schema field readiness matrix"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md "Phase 5.10 source-to-schema mapping plan"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_5_11_FINAL_GATE_REPORT.md "Phase 5.11 final governance gate"
[5]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_REVIEW_DECISION_LOG.md "Phase 5.9 content review decision log"
