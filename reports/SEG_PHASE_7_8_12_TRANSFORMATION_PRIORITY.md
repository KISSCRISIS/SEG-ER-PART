# SEG PHASE 7.8.12 — TRANSFORMATION PRIORITY

**Mode:** Controlled analysis / read-only. This is a candidate prioritization, not an execution authorization.

## Priority decision

Priority 1 content is suitable for the next **controlled review and adapter-design preparation** because its broad structures are observable. It is not ready for production transformation. The safest first review order is to separate question units from explanations, preserve chapter/source locators, and keep the Arabic mentor layer as a distinct derivative layer.

| Rank | Source group | Candidate outputs | Why this order | Required gates before any transformation |
|---:|---|---|---|---|
| 1 | HIPPO Arabic questions and explanations | question_bank; flashcard; arabic_mentor_explanation; exam_trap | Strong repeated Q/A/Arabic explanation structure: 1,927 question markers and paired Arabic markers. | Source/version/locator, rights, clinical review, taxonomy, answer completeness, duplicate review. |
| 2 | FRCEM questions and explanations | question_bank; flashcard; arabic_mentor_explanation; exam_trap | Largest explicit FRCEM question corpus with 1,529 question markers and extensive explanation signals. | Same gates as rank 1, plus question/answer/explanation boundary validation. |
| 3 | FRCEM high-yield study book | lesson; algorithm; exam_trap | Chapter-organized study layer with strong management/algorithm/red-flag signals. | Edition/locator, rights, clinical review, lesson boundary, no-protocol boundary. |
| 4 | HIPPO high-yield study book | lesson; algorithm; exam_trap | Broad emergency medicine domain coverage and a procedures/skills chapter signal. | Review of external references, lesson boundaries, clinical skill governance boundary, rights. |

## Layer separation requirements

| Layer | Handling rule |
|---|---|
| External reference-based knowledge | Keep source identity and locator; do not present as SEG-owned content. |
| Derived educational content | Preserve derivation lineage and keep `Pending Clinical Review`; do not silently merge with legacy records. |
| Arabic mentor explanation | Treat as a separate candidate layer; do not assume SEG authorship or perform translation/rewrite. |
| Exam intelligence | Keep exam-trap/pattern signals separate from clinical facts; no assessment approval. |
| Algorithms | Treat as educational algorithm support only; never as a clinical protocol. |

## Minimum evidence required for the next controlled step

- A versioned source registry with owner, publisher, edition/version, language, rights/display scope, and precise chapter/question locators.
- A reviewed content-boundary contract defining question, answer, explanation, Arabic mentor, exam-trap, and algorithm units without rewriting source content.
- An explicit manual identity/duplicate review against `officialUnifiedTopics`, `flashcards`, `examTraps`, and `topicFamilyIndex`; similarity alone remains `DUPLICATE_SIGNAL` or `MANUAL_REVIEW_REQUIRED`.
- Independent clinical review and rights review before any candidate is considered for adapter dry-run handoff.
- A separate implementation authorization before any adapter execution, import, or learner exposure.

## References

[1]: /home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/INTAKE_FINDINGS.md "Phase 7.8.10 Updated Source Intake Findings"
[2]: /home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md "Phase 7.8.11 Updated Source Registry"
[3]: /home/ubuntu/seg-manus-status/phase_7_8_10_content_overlap.md "Phase 7.8.10 Conservative Legacy Content Overlap"
