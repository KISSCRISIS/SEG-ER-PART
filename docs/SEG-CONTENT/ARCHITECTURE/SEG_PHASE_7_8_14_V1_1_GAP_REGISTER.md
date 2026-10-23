# SEG PHASE 7.8.14 — V1.1 GAP REGISTER

**Mode:** `CONTROLLED ANALYSIS ONLY`
**Schema:** `SEG_CONTENT_RECORD_V1_1`
**Schema SHA-256:** `720e748a259536df6ae1b2319717e2d55f6540cf9931d5df05d8a5395a133cf9`

## Status interpretation

This register distinguishes vocabulary support from evidence readiness. `Supported` means the v1.1 vocabulary can represent the target; it does not mean that the current source package has complete metadata, review evidence, or a production-ready record.

## Supported v1.1 content types

| Target | Vocabulary status | Current evidence state | Closure status | Main gap |
|---|---|---|---|---|
| `lesson` | Supported enum | FRCEM/HIPPO study-book chapter and explanation signals. | `REQUIRES_METADATA` | Exact locators, version/edition, owner/publisher, rights/display, taxonomy/track, references, medical review and audit. |
| `question_bank` | Supported enum | FRCEM/HIPPO question-answer-explanation structures. | `REQUIRES_REVIEW` | Complete question units, options, answer verification, explanation boundary, duplicate review, locators, references, clinical and rights review. |
| `book` | Supported canonical enum; `reference_framework` relationship available | Study-book/reference signals. | `REQUIRES_METADATA` | Reference identity, version/edition, owner/publisher, locator policy, rights/display scope and review state. |
| `clinical_case` | Supported enum with closed required object | No governed case-structured Priority 1 source set established. | `NOT_SUPPORTED` for current package evidence | Required presentation, history, examination, investigations, assessment, differential, management, clinical reasoning and references are not supplied as a governed case unit. |
| `clinical_skill` | Supported enum with closed required object | HIPPO procedures/skills chapter signal only. | `REQUIRES_REVIEW` | Explicit skill fields, locator, pathway, clinical review and competency boundary evidence. |

## Additional layers requiring design decision

| Layer | Direct v1.1 content type | Current handling | Required design decision |
|---|---|---|---|
| `flashcard` | No | Derivative candidate under question-bank review. | Decide whether to keep it as a derived sub-layer, map through question-bank enrichment, or adopt a separately governed extension. |
| `exam_trap` | No | Review annotation/candidate only. | Define storage and review semantics without treating it as a clinical fact or approved assessment. |
| `algorithm` | No | Educational support candidate only. | Define a safe layer and explicit exclusion from protocol/order-set semantics. |
| `numerical_fact` | No | Source-located evidence tag only. | Define numeric evidence and verification contract; no automatic dose/threshold extraction. |
| `arabic_mentor_explanation` | No | Separate derivative layer candidate. | Decide layer vocabulary, authorship/translation/rewriting state, rights scope, and relationship to question/topic. |

## Gap closure rules

No additional layer is promoted into the v1.1 enum by this register. No clinical case or clinical skill object is reconstructed from incomplete signals. Missing fields remain `MISSING_FROM_SOURCE`, `PENDING_EXTERNAL_EVIDENCE`, or `UNRESOLVED` according to the existing field-mapping contract.

## Non-actions

No schema modification, production JSON, database record, content transformation, identity link, adapter, import, activation, publication, medical approval or rights approval was created or executed.

## References

[1]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 schema"
[2]: file:///home/ubuntu/seg-internship-output/PHASE_7_8_13_V1_1_COMPATIBILITY_MATRIX.md "Phase 7.8.13 V1.1 Compatibility Matrix"
[3]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_FIELD_MAPPING_VALIDATION.md "Phase 7.8 Field Mapping Validation"
