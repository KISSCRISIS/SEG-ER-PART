# SEG Phase 7.8 — Field Mapping Validation

> **Status:** Controlled source-to-v1.1 mapping review only. No candidate JSON was generated and no missing value was filled.

## 1. Contract and validation scope

Canonical target profile: `/home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json` with SHA-256 `720e748a259536df6ae1b2319717e2d55f6540cf9931d5df05d8a5395a133cf9`. The v1.1 profile declares the five permitted content types and closed required objects. This report validates mapping availability and evidence states; it does not claim that any candidate passes the full schema or governance gates.

| Source / legacy field | SEG_CONTENT_RECORD_V1_1 target | State | Rule |
|---|---|---|---|
| `candidate_record_id` | `record_id` | `UNRESOLVED` | Existing IDs are preserved as evidence. v1.1 requires a lowercase pattern; no normalization or new ID was created. |
| Source title | `title` | `SOURCE_STATUS_VARIES` | Map only `EXTRACTED` title values from the extraction register. |
| `target_type` | `content_type` | `PASS_FOR_VOCABULARY` | Cross-checked counts: lesson 16, question_bank 17, clinical_case 6, clinical_skill 5, book 4. |
| No complete language field in authorized inputs | `language` | `MISSING_FROM_SOURCE` | Do not infer language from folder or text. |
| `source_id` | `source.source_id` | `PASS_FOR_PRESERVATION` | Preserve exact Source ID. |
| `source_path` | `source.location` | `PASS_FOR_PRESERVATION` | Preserve exact relative source path. |
| Owner/publisher evidence | `source.publisher_or_owner` | `MISSING_FROM_SOURCE` | Candidate map explicitly marks owner/publisher as not supplied. |
| Access timestamp | `source.accessed_at` | `PENDING_EXTERNAL_EVIDENCE` | No RFC3339 accessed-at evidence is supplied in the authorized inputs. |
| Source version | `version.value` | `MISSING_FROM_SOURCE` | Do not replace with a guessed version. |
| `sha256` | `version.checksum` | `PASS_FOR_PRESERVATION` | Preserve exact 64-hex checksum from the candidate map and decision baseline. |
| Source `reference` / `references` | `references[]` | `UNRESOLVED` / `PENDING_EXTERNAL_EVIDENCE` | Preserve only extracted references and locators; no citation is created where source verification is pending. |
| Candidate rights state | `rights.text_usage`, `rights.image_usage`, `rights.display_scope` | `PENDING_EXTERNAL_EVIDENCE` | Rights review remains independent and open. |
| Taxonomy and track evidence | `taxonomy.taxonomy_id`, `taxonomy.taxonomy_version` | `MISSING_FROM_SOURCE` / `PENDING_EXTERNAL_EVIDENCE` | Do not derive taxonomy; explicit `02_Internship` source confirmation remains pending where flagged. |
| Observed Medical Owner status | `medical_review.reviewer`, `medical_review.decision` | `UNRESOLVED` | Preserve educational closure as governance evidence; do not translate it into clinical approval or invent reviewer credentials. |
| Existing governance events | `audit.created_by`, `audit.created_at`, `audit.events[]` | `UNRESOLVED` | Future recordization must map supplied append-only events; no event is fabricated here. |
| Case extraction fields | `content` → Clinical Case object | `MISSING_FROM_SOURCE` / `UNRESOLVED` | Preserve field-level status for presentation, history, examination, investigations, assessment, differential, management, reasoning, and references. |
| Skill extraction fields | `content` → Clinical Skill object | `MISSING_FROM_SOURCE` / `UNRESOLVED` | Preserve field-level status for indication, contraindication, steps, equipment, assessment method, and competency level. |
| Book/framework evidence | `relationships.reference_framework[]` | `PENDING_EXTERNAL_EVIDENCE` | Reference-only relationship; no generic reference type, ownership claim, or display permission. |

## 2. Candidate field-state preservation

| Domain | Required source fields audited | Preservation rule | Current result |
|---|---|---|---|
| Lesson | title, educational objective, teaching sections, key learning points, references | Keep `MISSING_FROM_SOURCE` when absent; keep extracted heading evidence source-linked | `BLOCKED_PENDING_METADATA_AND_REVIEW` |
| Question Bank | question text, options, correct answer, explanation, reference | Missing question/options/answer/explanation remain flagged per candidate | `BLOCKED_WITH_FIELD_FLAGS` |
| Clinical Case | presentation, history, examination, investigations, assessment, differential, management, reasoning | No case field is reconstructed; absent/unresolved fields remain exact | `BLOCKED_WITH_FIELD_FLAGS` |
| Clinical Skill | skill name, indication, contraindication, equipment, steps, assessment method | No skill steps or competency evidence is added | `BLOCKED_WITH_FIELD_FLAGS` |
| Book | title, author/identity, edition/version if explicit, source identity, framework relation | External reference boundary and rights evidence remain separate | `BLOCKED_PENDING_EXTERNAL_EVIDENCE` |

## 3. Required status vocabulary

| Status | Meaning in this preparation package |
|---|---|
| `MISSING_FROM_SOURCE` | The authorized source/extraction register does not supply the field. No value is inserted. |
| `PENDING_EXTERNAL_EVIDENCE` | The field depends on independent rights, reviewer, taxonomy, locator, version, or other evidence not supplied in this phase. |
| `UNRESOLVED` | The field or lifecycle mapping cannot be safely resolved from the authorized inputs without inference or a separate governance decision. |

## 4. Validation conclusion

Vocabulary and checksum-preservation mappings are available for preparation. Candidate-level schema compatibility is not a PASS because no records are generated, `record_id` compatibility remains unresolved, and required metadata, rights, taxonomy, medical-review, audit, and source-field evidence remain incomplete. This report is not a clinical review, rights clearance, import authorization, or activation decision.

## References

[1]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG Content Record v1.1 schema profile"
[2]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv "Phase 7.6 candidate record map"
[3]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_7_CONTENT_EXTRACTION_REGISTER.md "Phase 7.7 content extraction register"
[4]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_7_6_FINAL_MEDICAL_OWNER_DECISION.md "Phase 7.7.6 Final Medical Owner Decision"
[5]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_7_6_CLINICAL_QA_CLOSURE_REGISTER.md "Phase 7.7.6 Clinical QA Closure Register"
