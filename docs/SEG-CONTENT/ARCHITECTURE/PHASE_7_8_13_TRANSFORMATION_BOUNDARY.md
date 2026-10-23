# SEG PHASE 7.8.13 — CONTENT BOUNDARY & TRANSFORMATION DESIGN

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

- No production JSON, database record, schema modification, adapter, import, migration, activation, or publication was created or executed.
- No `SRC-*` or `CAND-*` identity mapping was created.
- No medical content was corrected, rewritten, translated, approved, or clinically judged.
- No owner, publisher, version, rights, taxonomy, track, reviewer, or citation was invented.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md "Phase 7.8.11 Updated Source Registry"
[2]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_12_CONTENT_INTELLIGENCE_MAP.md "Phase 7.8.12 Content Intelligence Map"
[3]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_12_TRANSFORMATION_PRIORITY.md "Phase 7.8.12 Transformation Priority"
[4]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_FIELD_MAPPING_VALIDATION.md "Phase 7.8 Field Mapping Validation"
