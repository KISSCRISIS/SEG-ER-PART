# SEG Phase 7.6 — Controlled Metadata Closure Register

| Field | Value |
|---|---|
| Phase | `7.6 — Controlled Metadata Closure & Candidate Record Preparation` |
| Mode | `CONTROLLED CONTENT PREPARATION / READ-ONLY SOURCE PROTECTION` |
| Prepared at (UTC) | `2026-08-21T09:41:21Z` |
| Input | `SEG_PHASE_7_5_CONTENT_MAPPING_REGISTER.tsv` |
| Input register SHA-256 | `21f6cf96d77cf5c7b9bcf3337c9c76562d1e5265666a490e53e3655b50247370` |
| Source root | `/home/ubuntu/seg-internship-phase-5.6/staging/extracted` |
| Candidate rows | `48` |
| Metadata closure result | `PARTIAL / OPEN` for all candidate records |
| Production JSON | `NOT GENERATED` |

## 1. Purpose and boundaries

This register prepares a controlled metadata assessment for the 48 verified candidate rows from Phase 7.5. It creates provisional candidate record identifiers and metadata sidecar values for handoff; it does not create production records or a JSON payload. The candidate IDs are scoped to this preparation artifact and are not stable production content IDs.

> A metadata closure assessment is a descriptive governance artifact. It does not constitute clinical approval, external review, rights clearance, schema activation, import authorization, or learner exposure.

The source content was not opened for extraction or rewritten in this phase. The exact source path and SHA-256 from the Phase 7.5 register were preserved. Values not supplied by the governed handoff are represented explicitly as `NOT_SUPPLIED`, `OPEN`, `PENDING`, or a provisional task-scope value; no edition, publisher, locator, taxonomy ID, reviewer, or rights decision was invented.

## 2. Candidate distribution

| Content type | Records | Metadata status | Closure status |
|---|---:|---|---|
| `lesson` | 16 | `PARTIAL` | `OPEN` |
| `question_bank` | 17 | `PARTIAL` | `OPEN` |
| `clinical_case` | 6 | `PARTIAL` | `OPEN` |
| `clinical_skill` | 5 | `PARTIAL` | `OPEN` |
| `book` | 4 | `PARTIAL` | `OPEN` |

## 3. Fixed metadata policy

| Metadata field | Controlled value or state | Interpretation |
|---|---|---|
| `record_id` | `CAND-7.6-SRC-####` | Provisional sidecar identifier; not a production content ID. |
| `title` | Path-derived candidate label plus open title status | Not clinically verified and not a final learner-facing title. |
| `source.owner` / `source.publisher` | `NOT_SUPPLIED` | No ownership or publisher evidence was supplied in the input handoff. |
| `source.locator` | `FILE_PATH_ONLY:<original path>` | Exact file path preserved; page/section/question locator remains open. |
| `version.source_version_status` | `NOT_SUPPLIED` | SHA-256 preserves file identity but is not treated as a governed edition/version. |
| `pathway` | `SEG Internship Doctor Pathway` | Task-scope candidate value; source-level confirmation remains pending. |
| `track` | `02_Internship` | Task-scope candidate value; no level inference from filename alone. |
| `audience` | `Medical Intern Doctors` | Provisional task-scope audience; not an approval of educational level. |
| `taxonomy` | `NOT_SUPPLIED`; status `OPEN` | No taxonomy ID or version was supplied. |
| `medical_review_status` | `OWNER_REVIEW_AVAILABLE_PENDING_RECORDIZATION` | No external approval is claimed; clinical review remains pending. |
| `rights_status` | `PENDING_SCOPE_CLASSIFICATION` | No copyright or display clearance is claimed. |
| `references` | Approved framework candidate list only; assignment `UNASSIGNED` | No book text or false citation locator was created. |

## 4. Content-type handling

| Content type | Preparation performed | Explicit non-action |
|---|---|---|
| `lesson` | Metadata envelope candidate prepared. | Lesson content was not extracted or rewritten. |
| `question_bank` | Assessment metadata envelope candidate prepared. | `question_text`, `options`, `correct_answer`, `explanation`, and `reference` were not extracted. |
| `clinical_case` | v1.1 contract target recorded. | No patient record, clinical case fields, or protocol was created. |
| `clinical_skill` | v1.1 contract target recorded. | No competency record, authorization, or sign-off was created. |
| `book` | Canonical `book` target and relationship candidate recorded. | No generic `reference` type, book text, or false framework locator was created. |

## 5. Duplicate lineage handling

| Duplicate marker | Records | v2_Pack role | Base role | Required handling |
|---|---:|---|---|---|
| `DUP-DRUG-001` | 6 | `PRIMARY EDUCATIONAL CANDIDATE` | `HISTORICAL LINEAGE PRESERVED` | No deletion, merge, overwrite, or archive. |
| `DUP-EMERGENCY-001` | 6 | `PRIMARY EDUCATIONAL CANDIDATE` | `HISTORICAL LINEAGE PRESERVED` | No deletion, merge, overwrite, or archive. |

The v2_Pack designation is recorded as a provisional candidate role only. It is not a final duplicate approval or activation decision. The full per-record duplicate lineage is preserved in the TSV candidate map.

## 6. Per-record metadata assessment

| Candidate ID | Source ID | Title candidate | Type | Original path | SHA status | Metadata | Closure | Duplicate lineage |
|---|---|---|---|---|---|---|---|---|
| CAND-7.6-SRC-0003 | SRC-0003 | Assessment_Structure | question_bank | 02_Internship/Assessments/Assessment_Structure.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0004 | SRC-0004 | README | question_bank | 02_Internship/Assessments/README.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0007 | SRC-0007 | Emergency_Basics_Intern_Framework | lesson | 02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0008 | SRC-0008 | README | lesson | 02_Internship/Clinical_Rotations/Emergency_Basics/README.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0010 | SRC-0010 | Rotation_Objectives | lesson | 02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0012 | SRC-0012 | Rotation_Objectives | lesson | 02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0014 | SRC-0014 | Rotation_Objectives | lesson | 02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0015 | SRC-0015 | README | lesson | 02_Internship/Clinical_Rotations/README.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0017 | SRC-0017 | Rotation_Objectives | lesson | 02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0019 | SRC-0019 | Clinical_Skills_Internship_Framework | clinical_skill | 02_Internship/Clinical_Skills/Clinical_Skills_Internship_Framework.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0020 | SRC-0020 | README | clinical_skill | 02_Internship/Clinical_Skills/README.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0023 | SRC-0023 | drug_essentials_intern_level_v2 | lesson | 02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md | MATCH | PARTIAL | OPEN | DUP-DRUG-001 |
| CAND-7.6-SRC-0024 | SRC-0024 | implementation_notes | lesson | 02_Internship/Drug_Essentials/implementation_notes.md | MATCH | PARTIAL | OPEN | DUP-DRUG-001 |
| CAND-7.6-SRC-0025 | SRC-0025 | README | lesson | 02_Internship/Drug_Essentials/README.txt | MATCH | PARTIAL | OPEN | DUP-DRUG-001 |
| CAND-7.6-SRC-0027 | SRC-0027 | drug_essentials_intern_level_v2 | lesson | 02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md | MATCH | PARTIAL | OPEN | DUP-DRUG-001 |
| CAND-7.6-SRC-0028 | SRC-0028 | implementation_notes | lesson | 02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md | MATCH | PARTIAL | OPEN | DUP-DRUG-001 |
| CAND-7.6-SRC-0029 | SRC-0029 | README | lesson | 02_Internship/Drug_Essentials_v2_Pack/README.txt | MATCH | PARTIAL | OPEN | DUP-DRUG-001 |
| CAND-7.6-SRC-0033 | SRC-0033 | emergency_cases_intern_level | clinical_case | 02_Internship/Emergency_Cases/emergency_cases_intern_level.md | MATCH | PARTIAL | OPEN | DUP-EMERGENCY-001 |
| CAND-7.6-SRC-0034 | SRC-0034 | implementation_notes | clinical_case | 02_Internship/Emergency_Cases/implementation_notes.md | MATCH | PARTIAL | OPEN | DUP-EMERGENCY-001 |
| CAND-7.6-SRC-0035 | SRC-0035 | README | clinical_case | 02_Internship/Emergency_Cases/README.txt | MATCH | PARTIAL | OPEN | DUP-EMERGENCY-001 |
| CAND-7.6-SRC-0037 | SRC-0037 | emergency_cases_intern_level | clinical_case | 02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md | MATCH | PARTIAL | OPEN | DUP-EMERGENCY-001 |
| CAND-7.6-SRC-0038 | SRC-0038 | implementation_notes | clinical_case | 02_Internship/Emergency_Cases_v2_Pack/implementation_notes.md | MATCH | PARTIAL | OPEN | DUP-EMERGENCY-001 |
| CAND-7.6-SRC-0039 | SRC-0039 | README | clinical_case | 02_Internship/Emergency_Cases_v2_Pack/README.txt | MATCH | PARTIAL | OPEN | DUP-EMERGENCY-001 |
| CAND-7.6-SRC-0041 | SRC-0041 | IM_HighYield_Review | book | 02_Internship/Internship books SEG/IM_HighYield_Review.pdf | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0042 | SRC-0042 | ObGyn_HighYield_Review_Dr_Alaa_Aqrabawi | book | 02_Internship/Internship books SEG/ObGyn_HighYield_Review_Dr_Alaa_Aqrabawi.pdf | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0043 | SRC-0043 | Pediatrics_HighYield_Review | book | 02_Internship/Internship books SEG/Pediatrics_HighYield_Review.pdf | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0044 | SRC-0044 | Surgery_HighYield_Review | book | 02_Internship/Internship books SEG/Surgery_HighYield_Review.pdf | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0046 | SRC-0046 | Intern_Professionalism_Guide | lesson | 02_Internship/Internship_Guides/Intern_Professionalism_Guide.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0047 | SRC-0047 | Intern_Transition_Guide | lesson | 02_Internship/Internship_Guides/Intern_Transition_Guide.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0068 | SRC-0068 | internal-medicine-intern-jmc | question_bank | 02_Internship/JMC_Exam_Practice/Reviewed/internal-medicine-intern-jmc.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0069 | SRC-0069 | obgyn-intern-jmc | question_bank | 02_Internship/JMC_Exam_Practice/Reviewed/obgyn-intern-jmc.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0070 | SRC-0070 | pediatrics-intern-jmc | question_bank | 02_Internship/JMC_Exam_Practice/Reviewed/pediatrics-intern-jmc.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0071 | SRC-0071 | surgery-intern-jmc | question_bank | 02_Internship/JMC_Exam_Practice/Reviewed/surgery-intern-jmc.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0072 | SRC-0072 | _manifest | question_bank | 02_Internship/JMC_Exam_Practice/Reviewed/_manifest.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0074 | SRC-0074 | internal-medicine-internship | question_bank | 02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-internship.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0075 | SRC-0075 | internal-medicine-study-summary | question_bank | 02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-study-summary.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0076 | SRC-0076 | obgyn-main | question_bank | 02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-main.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0077 | SRC-0077 | obgyn-study-summary | question_bank | 02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-study-summary.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0078 | SRC-0078 | pediatrics-main | question_bank | 02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-main.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0079 | SRC-0079 | pediatrics-summary-questions | question_bank | 02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary-questions.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0080 | SRC-0080 | pediatrics-summary | question_bank | 02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0081 | SRC-0081 | surgery-internship | question_bank | 02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-internship.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0082 | SRC-0082 | surgery-summary | question_bank | 02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-summary.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0083 | SRC-0083 | _manifest | question_bank | 02_Internship/JMC_Exam_Practice/Sources_Phone/_manifest.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0090 | SRC-0090 | Logbook_Requirements | clinical_skill | 02_Internship/Logbook/Logbook_Requirements.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0094 | SRC-0094 | OSCE_Internship_Framework | clinical_skill | 02_Internship/OSCE/OSCE_Internship_Framework.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0095 | SRC-0095 | README | clinical_skill | 02_Internship/OSCE/README.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |
| CAND-7.6-SRC-0111 | SRC-0111 | README | lesson | 02_Internship/Study/Roadmap/README.md | MATCH | PARTIAL | OPEN | NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF |

The detailed field-level mapping is in `SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv`. The row-level blocker list includes missing owner/publisher/version/taxonomy/rights/precise locator evidence, provisional pathway confirmation, scope-limited non-extraction, and duplicate decisions where applicable.

## 7. Audit and preservation

| Check | Result |
|---|---|
| Source IDs preserved | `48/48` |
| Source paths preserved | `48/48` |
| Source SHA-256 preserved and rechecked | `48/48` |
| Existing lineage markers preserved | `YES` |
| Duplicate lineage rules applied | `YES` |
| Source content modified | `NO` |
| Audit actor | `Manus` |
| Audit timestamp | `2026-08-21T09:41:21Z` |
| Audit operation | `metadata-closure-preparation` |
| Audit meaning | Descriptive assessment only; no clinical or rights approval claimed. |

## 8. Closure status

No candidate reached `CLOSED`. Every row is `metadata_status=PARTIAL` and `closure_status=OPEN` because the input does not supply the complete owner, publisher, governed version, rights, taxonomy, precise locator, and independent review evidence required for a production record. The expected phase outcome is therefore `METADATA_CLOSURE_PREPARED`, not `READY_FOR_IMPORT` or `PRODUCTION_READY`.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_PHASE_7_5_CONTENT_MAPPING_REGISTER.tsv "SEG Phase 7.5 Content Mapping Register"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md "SEG Internship Source-to-Schema Mapping Plan"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_REGISTRY_FINAL.md "SEG Internship Source Registry — Final Handoff Register"
[4]: /home/ubuntu/skills/metadata-audit-tagger/SKILL.md "Metadata & Audit Tagger"
