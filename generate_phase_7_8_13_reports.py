from pathlib import Path

OUT = Path('/home/ubuntu/seg-internship-output')
REG = '/home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md'
INTEL = '/home/ubuntu/seg-internship-output/SEG_PHASE_7_8_12_CONTENT_INTELLIGENCE_MAP.md'
PRIORITY = '/home/ubuntu/seg-internship-output/SEG_PHASE_7_8_12_TRANSFORMATION_PRIORITY.md'
FIELD = '/home/ubuntu/seg-internship-output/SEG_PHASE_7_8_FIELD_MAPPING_VALIDATION.md'
SCHEMA = '/home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json'
SCHEMA_SHA = '720e748a259536df6ae1b2319717e2d55f6540cf9931d5df05d8a5395a133cf9'

def bl(items):
    return '\n'.join(f'- {x}' for x in items)

boundary = f'''# SEG PHASE 7.8.13 — CONTENT BOUNDARY & TRANSFORMATION DESIGN

**Mode:** `CONTROLLED ANALYSIS ONLY`  
**Input authority:** Phase 7.8.11 Source Registry and Phase 7.8.12 Content Intelligence Map  
**Package state:** `SEPARATE_LINEAGE_CANDIDATE`; Phase 7.8.11 gate remains `BLOCKED_PENDING_METADATA`  

## Executive decision

The controlled transformation boundary is defined for the four Priority 1 artifacts. The design identifies eligible and excluded material, required metadata, review boundaries, and candidate destinations. It does not create records, transform source content, assign identity links, approve medical content, or clear rights.

> The boundary describes **what could be reviewed for a future mapping step**. It does not mean that the source is ready for import, learner display, clinical approval, or rights-approved reproduction.

## 1. Lesson transformation boundary

The two study-book artifacts are eligible for a future lesson review only at the level of explicit chapter/section structure and source-supported educational explanation. A future reviewer may examine chapter titles, explicit topic headings, stated objectives or learning points, source-linked explanatory sections, and explicit references or locators. Management, differential, algorithm, mnemonic, red-flag, and exam-pattern signals may be retained as review annotations or separate candidates; they must not silently become clinical protocols or approved medical guidance.

| Eligible lesson component | Boundary rule |
|---|---|
| Explicit chapter and section title | Preserve as source text with exact locator; do not infer taxonomy or track. |
| Explicit learning objective or key point | Candidate only when visibly present and attributable to the source. |
| Source-supported explanatory paragraph | Keep `source_derived` or `source_verbatim` distinction; no silent paraphrase. |
| Explicit topic grouping | Use as navigation evidence only until taxonomy/pathway review. |
| Explicit reference signal | Preserve only with a verifiable version/edition/locator. |
| Arabic annotation inside the study book | Keep as a separate Arabic-layer review signal; do not assume SEG authorship. |

| Excluded from lesson transformation | Reason |
|---|---|
| Verbatim book reproduction without rights/display decision | Rights gate remains open. |
| OCR-corrupted or incomplete text | Not applicable to the four Priority 1 files as a blanket approval; any damaged subsection remains unresolved. |
| Question stem, options, answer key, or exam trap | Route to question-bank/exam-intelligence review, not silent lesson inclusion. |
| Algorithm presented as a protocol, dose, threshold, or patient-specific order | `algorithm` is an educational candidate only; no protocol or patient record. |
| Skill sign-off, competency result, or procedure authorization | Explicitly excluded from content transformation. |
| Inferred taxonomy, audience, clinical correction, or ownership | Requires separate evidence and review. |

### Required metadata before any lesson mapping

`source_id` and exact source location; SHA-256 checksum; version/edition or an explicit unresolved state; language; owner/publisher evidence; rights and display scope; chapter/section locator; taxonomy ID/version; professional-track evidence; reference linkage; medical-review state; and append-only audit lineage. The current registry marks several of these as `UNRESOLVED`, `MISSING_FROM_SOURCE`, or `PENDING_EXTERNAL_EVIDENCE`.

## 2. Question Bank transformation boundary

The FRCEM and HIPPO question artifacts are eligible for a future question-bank review when a complete question unit can be delimited. A unit must keep the question stem, all options where present, answer/key state, explanation state, source locator, language, and any explicit reference signal together. Structural marker counts are inventory evidence only and do not establish that every marker is a complete question.

| Question object requirement | Verification boundary |
|---|---|
| Question stem | Must be present and delimited; do not reconstruct missing text. |
| Options | Preserve all observed options; missing options remain `MISSING_FROM_SOURCE`. |
| Answer/key | Verify against an attributable source locator or independent qualified review; never infer from explanation or pattern. |
| Explanation | Preserve source-derived status and locator; do not rewrite or clinically correct here. |
| Reference | Keep only explicit reference/locator evidence; no citation invention. |
| Difficulty/exam tag | Preserve only when explicitly supplied; do not derive from wording. |
| Language/Arabic explanation | Separate from the answer object when it is a mentor-layer candidate; do not treat translation as authorship. |

### Answer verification requirements

Answer verification requires a complete key or explicit unresolved state, an exact question locator, source/version evidence, and independent clinical review before a question is considered clinically usable. A repeated answer marker is not proof of correctness. Explanation-answer disagreement must become a conflict for review, not a correction.

### Explanation handling

English and Arabic explanations remain source-derived candidates unless explicit authorship evidence establishes otherwise. The Arabic explanation is a distinct layer and may not be silently merged into the question stem, answer key, or SEG Original content. Any translation, paraphrase, normalization, or medical rewriting requires a separately authorized review step.

### Duplicate detection requirements

Use exact source/object IDs when available; there are no shared legacy-to-SEG IDs in the current evidence. Exact normalized question-text equality, same source locator, same chapter/question number, and answer/explanation similarity may be recorded as `DUPLICATE_SIGNAL` only. A human reviewer must decide `DUPLICATE`, `OVERLAPPING`, `DERIVED`, or `NO_LINK`; no merge, overwrite, or deletion is allowed.

## 3. Arabic Mentor Layer boundary

An Arabic mentor explanation may become a future `arabic_mentor_explanation` candidate layer when it is visibly separated from the question/answer or study text, its source location is preserved, and its relationship to the source question or topic is explicit. In the current profile this is a **layer concept**, not a permitted `content_type` enum.

Authorship review is required to determine whether the Arabic explanation was written by SEG, derived from an external source, translated, or prepared by another contributor. Rewriting review is required before any paraphrase, translation, normalization, correction, or pedagogic restructuring. No group is classified as `SEG_ORIGINAL_CANDIDATE` by this design.

## 4. Exam Intelligence Layer

| Candidate layer | Evidence signal | Boundary |
|---|---|---|
| `exam_trap` | Explicit `trap`, `red flag`, exam-pattern, or warning signal | Review annotation/candidate only; not a clinical fact or approved assessment item. |
| `numerical_fact` | Explicit number, threshold, score, dose, time, or statistic with exact locator | Not a target content type in v1.1; never extract or validate numerics automatically. |
| `algorithm` | Explicit algorithm/sequence/management pathway signal | Educational support candidate only; not a protocol, order set, or patient-specific instruction. |
| `clinical_skill` | Explicit procedures/skills chapter or teachable skill signal | Requires complete v1.1 clinical-skill fields and review; never competency approval or sign-off. |

No exam-intelligence records are created in this phase. Numerical values, doses, thresholds, and clinical recommendations remain untouched and unapproved.

## 5. Boundary exclusions and safety

{bl([
    'No production JSON, database record, schema modification, adapter, import, migration, activation, or publication was created or executed.',
    'No `SRC-*` or `CAND-*` identity mapping was created.',
    'No medical content was corrected, rewritten, translated, approved, or clinically judged.',
    'No owner, publisher, version, rights, taxonomy, track, reviewer, or citation was invented.',
])}

## References

[1]: file://{REG} "Phase 7.8.11 Updated Source Registry"
[2]: file://{INTEL} "Phase 7.8.12 Content Intelligence Map"
[3]: file://{PRIORITY} "Phase 7.8.12 Transformation Priority"
[4]: file://{FIELD} "Phase 7.8 Field Mapping Validation"
'''
(OUT / 'PHASE_7_8_13_TRANSFORMATION_BOUNDARY.md').write_text(boundary, encoding='utf-8')

compat = f'''# SEG PHASE 7.8.13 — V1.1 COMPATIBILITY MATRIX

**Mode:** Controlled analysis / read-only  
**Schema:** `{SCHEMA}`  
**Schema SHA-256:** `{SCHEMA_SHA}`  
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

[1]: file://{SCHEMA} "SEG_CONTENT_RECORD_V1_1 schema"
[2]: file://{FIELD} "Phase 7.8 Field Mapping Validation"
[3]: file://{REG} "Phase 7.8.11 Updated Source Registry"
[4]: file://{INTEL} "Phase 7.8.12 Content Intelligence Map"
'''
(OUT / 'PHASE_7_8_13_V1_1_COMPATIBILITY_MATRIX.md').write_text(compat, encoding='utf-8')

gate = f'''# SEG PHASE 7.8.13 — GATE REPORT

**Mode:** `CONTROLLED ANALYSIS ONLY`  
**Input:** Phase 7.8.11 Source Registry and Phase 7.8.12 Content Intelligence Map  
**Final status:** `TRANSFORMATION_DESIGN_READY`

## Decision

The content boundary and v1.1 compatibility design are complete enough for a future controlled review package. The design is **not** an authorization to transform content, create records, run an adapter, import data, activate content, publish content, or expose material to learners.

| Gate | Result | Evidence-based finding |
|---|---|---|
| Priority 1 scope | PASS | Four requested text artifacts were kept in scope; Priority 2/3 were not transformed. |
| Lesson boundary | PASS WITH OPEN GATES | Eligible/excluded components and required metadata are defined; source and governance metadata remain incomplete. |
| Question-bank boundary | PASS WITH OPEN GATES | Question, option, answer, explanation, locator, and duplicate rules are defined; answer and clinical review remain open. |
| Arabic mentor boundary | PASS WITH OPEN GATES | Layer separation, authorship review, and rewriting review are defined; no authorship decision is made. |
| Exam intelligence boundary | PASS WITH OPEN GATES | `exam_trap`, `numerical_fact`, `algorithm`, and `clinical_skill` are bounded as candidates only. |
| V1.1 compatibility | PASS AS DESIGN / NOT RECORD VALIDATION | Target statuses are assigned; no JSON record was validated or generated. |
| Identity links | NOT PERFORMED | No `SRC-*`, `CAND-*`, or legacy identity links were created. |
| Medical approval | BLOCKED/PENDING | No clinical review or approval evidence was added. |
| Rights approval | BLOCKED/PENDING | No rights/display decision was added. |
| Implementation | NOT AUTHORIZED | No schema/database/application/adapter/import action occurred. |

## Exact remaining gates

{bl([
    'Complete source/version/edition/locator metadata for each Priority 1 artifact.',
    'Complete owner/publisher and rights/display evidence before any verbatim or learner-facing use.',
    'Perform independent clinical review of question-answer-explanation units and any algorithm, exam-trap, numerical, or skill candidates.',
    'Perform manual duplicate/overlap review against officialUnifiedTopics, flashcards, examTraps, and topicFamilyIndex; textual similarity remains a signal only.',
    'Resolve authorship and rewriting boundaries for Arabic mentor explanations; do not classify them as SEG Original without explicit evidence.',
    'Keep clinical_case as NOT_SUPPORTED unless a governed case-structured source is separately supplied.',
    'Obtain separate implementation authorization before any adapter design execution, import, activation, or publication.',
])}

## Non-actions confirmation

No production JSON, import, database write, schema change, application change, content rewriting, medical correction, clinical approval, rights approval, identity mapping, adapter execution, activation, or publication was performed.

## References

[1]: file://{REG} "Phase 7.8.11 Updated Source Registry"
[2]: file://{INTEL} "Phase 7.8.12 Content Intelligence Map"
[3]: file://{PRIORITY} "Phase 7.8.12 Transformation Priority"
[4]: file://{FIELD} "Phase 7.8 Field Mapping Validation"
[5]: file://{SCHEMA} "SEG_CONTENT_RECORD_V1_1 schema"
'''
(OUT / 'PHASE_7_8_13_GATE_REPORT.md').write_text(gate, encoding='utf-8')
print('created Phase 7.8.13 reports')
for name in ['PHASE_7_8_13_TRANSFORMATION_BOUNDARY.md', 'PHASE_7_8_13_V1_1_COMPATIBILITY_MATRIX.md', 'PHASE_7_8_13_GATE_REPORT.md']:
    p = OUT / name
    print(f'{name}: bytes={p.stat().st_size}')
