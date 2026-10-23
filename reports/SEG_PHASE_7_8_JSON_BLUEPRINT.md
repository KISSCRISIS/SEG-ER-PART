# SEG Phase 7.8 — JSON Blueprint (Template Only)

> **Status:** Non-production blueprint. This document defines field placement only; it contains no candidate JSON, no generated medical record, and no import payload.

## 1. Envelope template for all five content types

| v1.1 field | Template source/evidence | Preparation rule |
|---|---|---|
| `record_id` | Candidate ID from the candidate map | Preserve identity evidence; do not silently lowercase or normalize. v1.1 lowercase pattern compatibility remains blocked. |
| `title` | Extraction register when `EXTRACTED` | Map only source-supported title evidence. |
| `content_type` | `target_type` from candidate map | Must be one of `lesson`, `question_bank`, `book`, `clinical_case`, `clinical_skill`. |
| `language` | Not supplied by the authorized preparation inputs as a complete v1.1 field | `MISSING_FROM_SOURCE`; do not infer. |
| `source` | `source_id`, source path, owner/publisher/access evidence | Preserve source ID and location; missing owner/publisher/access fields remain flagged. |
| `version` | SHA-256 from candidate map plus source version evidence | Preserve checksum; version value remains missing when not supplied. |
| `references` | Extraction register reference status | Preserve source locator status; do not create citations. |
| `rights` | Candidate map rights state and separate review stream | `PENDING_EXTERNAL_EVIDENCE` until independently reviewed. |
| `taxonomy` | Explicit taxonomy evidence only | `MISSING_FROM_SOURCE` / pending; do not derive from filename or topic. |
| `medical_review` | Observed Phase 7.7.6 status | Preserve as governance evidence; do not convert educational closure into clinical approval. |
| `audit` | Existing append-only governance evidence | Map only supplied events; no fabricated reviewer, date, or approval event. |
| `content` | Required only for `clinical_case` and `clinical_skill` by v1.1 | Use source-section states; absent/unresolved sections stay flagged. |
| `relationships` | `reference_framework` when explicitly supported | Preserve reference-only boundary; do not create a generic reference type. |

## 2. `lesson` template

The template uses the v1.1 envelope with `content_type=lesson`. Source-supported title, educational objective, teaching-section headings, key-learning headings, and explicit references may be mapped only when their extraction status is `EXTRACTED`. Missing lesson content, owner/publisher, version, taxonomy, rights, and review evidence remain flagged. The v1.1 conditional profile rejects a `content` object for this type; no content object is generated here.

## 3. `question_bank` template

The template uses the v1.1 envelope with `content_type=question_bank`. The preparation checklist preserves the source status for `question_text`, `options`, `correct_answer`, `explanation`, and `reference`. A missing question-bank field remains `MISSING_FROM_SOURCE` or `UNRESOLVED`; no answer, option, explanation, or citation is reconstructed. The v1.1 conditional profile rejects a `content` object for this type.

## 4. `clinical_case` template

| `content` member | v1.1 shape | Source-state rule |
|---|---|---|
| `case_type` | Non-empty string | Required target field; source evidence and review state must be supplied. |
| `presentation` | Source section object | Preserve `present`, `absent`, or `unresolved`; present values require origin and locator. |
| `history` | Source section object | `MISSING_FROM_SOURCE` / `UNRESOLVED` remains flagged. |
| `examination` | Source section object | No patient-record interpretation; source state only. |
| `investigations` | Source section object | Do not invent tests or results. |
| `assessment` | Source section object | Do not infer clinical conclusions. |
| `differential` | Source section object | Do not add diagnoses not present in source. |
| `management` | Source section object | Do not add treatment steps or doses. |
| `clinical_reasoning` | Source section object | Educational framework only; no clinical approval. |
| `references` | Non-empty reference array | Preserve only declared references and locators. |

A Clinical Case remains an educational case structure for emergency-medicine learning. It is not a clinical protocol, patient record, or competency approval.

## 5. `clinical_skill` template

| `content` member | v1.1 shape | Source-state rule |
|---|---|---|
| `skill_name` | Non-empty string | Preserve source-supported identity only. |
| `category` | Non-empty string | Do not infer category from filename. |
| `indication` | Source section object | Missing source state remains flagged. |
| `contraindication` | Source section object | Do not add contraindications. |
| `steps` | Source section object | Do not add procedural steps. |
| `equipment` | Source section object | Do not add equipment lists. |
| `assessment_method` | Source section object | Educational assessment only; no sign-off. |
| `competency_level` | Non-empty string | Must be explicit evidence; no competency approval is created. |

A Clinical Skill is an educational skill framework only. It is not a learner competency record, procedure authorization, or sign-off.

## 6. `book` template

The template uses the v1.1 envelope with `content_type=book`. The four book candidates remain `External Reference Based`. They may support a `relationships.reference_framework` mapping only when the book record ID, framework name, role, citation locator policy, and display scope are independently evidenced. No verbatim book text, ownership claim, or learner-display permission is created. The v1.1 conditional profile rejects a `content` object for this type.

## 7. Blueprint safety rules

This blueprint is not executable, contains no candidate values, and is not an import payload. Any future recordization requires a separate, explicitly authorized dry-run contract and must preserve `MISSING_FROM_SOURCE`, `PENDING_EXTERNAL_EVIDENCE`, and `UNRESOLVED` without clinical repair or rights assumptions.

## References

[1]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG Content Record v1.1 schema profile"
[2]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_7_CONTENT_EXTRACTION_REGISTER.md "Phase 7.7 content extraction register"
[3]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_7_6_FINAL_MEDICAL_OWNER_DECISION.md "Phase 7.7.6 Final Medical Owner Decision"
