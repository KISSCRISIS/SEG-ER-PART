# SEG PHASE 7.8.13 — V1.1 COMPATIBILITY MATRIX

**Mode:** Controlled analysis / read-only
**Schema:** `/home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json`
**Schema SHA-256:** `720e748a259536df6ae1b2319717e2d55f6540cf9931d5df05d8a5395a133cf9`
**Important:** This matrix reports design compatibility and evidence state. It does not validate or generate records.

## Compatibility status vocabulary

| Status | Meaning in this phase |
|---|---|
| `READY_FOR_MAPPING` | Vocabulary and structural boundary are sufficiently specified for a separately authorized mapping exercise; this does not mean production-ready. |
| `REQUIRES_METADATA` | The target vocabulary is supported, but source/version/rights/taxonomy/locator or audit evidence is incomplete. |
| `REQUIRES_REVIEW` | Structural signals exist, but clinical, answer, authorship, duplicate, or content-boundary review is required. |
| `NOT_SUPPORTED` | The current Priority 1 evidence does not supply the target structure, or the concept is not a v1.1 content type. |

## Target compatibility matrix

| Target | v1.1 vocabulary status | Priority 1 evidence | Current status | Missing or required gates |
|---|---|---|---|---|
| `lesson` | Supported enum; v1.1 envelope rejects a `content` object for this type | FRCEM/HIPPO study-book chapter and explanatory signals | `REQUIRES_METADATA` | Exact locator, version/edition, owner/publisher, rights/display, taxonomy/track, references, medical review, audit. |
| `question_bank` | Supported enum; v1.1 envelope rejects a `content` object for this type | FRCEM/HIPPO question-answer-explanation structures | `REQUIRES_REVIEW` | Complete question units, options, answer verification, explanation boundary, duplicate review, locators, references, clinical/rights review. |
| `clinical_case` | Supported enum with closed required `content` object | No explicit case-structured Priority 1 source set was established | `NOT_SUPPORTED` | Presentation, history, examination, investigations, assessment, differential, management, clinical reasoning, references, and review evidence are not supplied as a governed case unit. |
| `clinical_skill` | Supported enum with closed required `content` object | HIPPO `EM Procedures and Skills` chapter signal only | `REQUIRES_REVIEW` | Explicit skill name/category, indications, contraindications, steps, equipment, assessment method, competency level, exact locator, pathway, clinical/relevant review. |
| `book` | Supported canonical enum; `relationships.reference_framework` is available | Study-book/reference signals | `REQUIRES_METADATA` | Reference identity, version/edition, owner/publisher, locator policy, rights/display scope, and review state. No generic reference content type is created. |

## Non-v1.1 layers

| Candidate layer | Direct v1.1 content type? | Controlled handling |
|---|---|---|
| `flashcard` | No | Derivative candidate under question-bank review or future controlled extension; no record created. |
| `exam_trap` | No | Review annotation/candidate; no record created. |
| `numerical_fact` | No | Evidence tag only; numerics remain source-located and unvalidated. |
| `algorithm` | No | Educational support candidate; not a protocol and no record created. |
| `arabic_mentor_explanation` | No | Separate layer candidate; authorship/rewriting/rights review required. |

## v1.1 envelope requirements applicable to any future record

Any future record would require a lowercase-compatible `record_id`, non-empty title and language, source identity/owner/location/access timestamp, version value and 64-hex checksum, references with locators and supports, rights fields, taxonomy ID/version, medical-review metadata, and audit events. The current Phase 7.8.11 registry leaves several of these states unresolved; therefore no target is currently promoted to production mapping.

`clinical_case` and `clinical_skill` have additional closed required objects. The present evidence does not justify reconstructing either object or filling missing fields. `lesson`, `question_bank`, and `book` are envelope-compatible, but their metadata and review gates remain open.

## Conclusion

The v1.1 vocabulary is sufficient to describe a future boundary for lesson, question bank, book, clinical case, and clinical skill. It is not sufficient evidence to execute transformation now. The correct state is target-specific `REQUIRES_METADATA`, `REQUIRES_REVIEW`, or `NOT_SUPPORTED`; no production target is `READY_FOR_MAPPING` at candidate-record level.

## References

[1]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 schema"
[2]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_FIELD_MAPPING_VALIDATION.md "Phase 7.8 Field Mapping Validation"
[3]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md "Phase 7.8.11 Updated Source Registry"
[4]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_12_CONTENT_INTELLIGENCE_MAP.md "Phase 7.8.12 Content Intelligence Map"
