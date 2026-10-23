# SEG PHASE 7.8.14 — CONTENT REVIEW QUEUE

**Mode:** `CONTROLLED ANALYSIS ONLY`
**Scope:** Priority 1 updated-source candidates; queue items are review work packages, not content records.
**Initial review state:** `PENDING_CLINICAL_REVIEW`

## Queue rules

This queue separates source-derived layers before any transformation. A queue item does not create a SEG record, assign an identity link, approve a question, establish authorship, or clear rights. Structural marker counts are evidence for review planning only.

## Review priority matrix

| Priority | Review group | Source artifacts | Candidate layers | Required closure focus |
|---:|---|---|---|---|
| 1 | Question bank | FRCEM questions; HIPPO questions | `question_bank` | Complete unit boundary, options, answer verification, explanation provenance, locator, duplicates, clinical and rights review. |
| 2 | Study books | FRCEM study book; HIPPO study book | `lesson`; educational `algorithm`; `exam_trap` signal | Chapter/section locator, source boundary, external-reference classification, taxonomy/track, no-protocol boundary, rights and clinical review. |
| 3 | Derived educational layers | Arabic mentor, flashcard, exam-trap, numerical-fact and algorithm signals | Separate layer candidates | Authorship/rewriting review, derivation lineage, duplicate review, numeric verification, and profile/design decision. |

## 1. Lesson candidates

| Queue item | Artifact | Evidence basis | Review checklist |
|---|---|---|---|
| LSN-REV-001 | `FRCEM_High_Yield_Study_Book.txt` | Chapter-organized high-yield text; management/differential/algorithm signals. | Verify chapter/section boundaries, exact locators, source-derived status, references, taxonomy/track, rights/display, medical review, and no protocol interpretation. |
| LSN-REV-002 | `HIPPO_High_Yield_Study_Book.txt` | Chapter-organized emergency-medicine study text; procedures/skills chapter signal. | Same lesson checks plus separation of skill education from competency/sign-off and procedure authorization. |

## 2. Question-bank candidates

| Queue item | Artifact | Structural signal | Review checklist |
|---|---|---|---|
| QBN-REV-001 | `frcem All_Chapters_Questions_and_Explanations_Full.txt` | 1,529 question markers, answer/explanation markers, Arabic explanation signals. | Delimit complete stem, options, answer/key state, explanation, reference and locator; verify answers independently; record missing fields; review duplicates, clinical accuracy, rights, language, taxonomy and audit. |
| QBN-REV-002 | `HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt` | 1,927 question markers with repeated answer and Arabic explanation markers. | Apply the same checks; keep Arabic explanation separate from answer key; do not treat repeated markers as proof of correctness. |

## 3. Arabic Mentor candidates

| Queue item | Artifact | Evidence basis | Required review |
|---|---|---|---|
| ARM-REV-001 | FRCEM question/explanation corpus | Arabic `شرح`/`لماذا`/`الإجابة` signals. | Establish authorship or derivative status, preserve source locator, separate explanation from question/answer, and authorize any translation, paraphrase, normalization or rewriting separately. |
| ARM-REV-002 | HIPPO Arabic question/explanation corpus | Repeated Arabic `شرح` and `الإجابة` markers. | Apply the same authorship, rights, source-boundary and rewriting checks; no SEG Original classification without explicit evidence. |

## 4. Exam intelligence candidates

| Queue item | Source scope | Candidate signals | Boundary |
|---|---|---|---|
| EXM-REV-001 | FRCEM study and question files | `exam`, `trap`, `pattern`, `red flag`, `important`. | Review annotation/candidate only; not an approved assessment item or clinical fact. |
| EXM-REV-002 | HIPPO study and question files | `exam`, `trap`, `pattern`, `red flag`, `management`. | Preserve source-derived signal; no automatic extraction, approval or numeric validation. |

## 5. Algorithm candidates

| Queue item | Artifact | Evidence basis | Required boundary review |
|---|---|---|---|
| ALG-REV-001 | `FRCEM_High_Yield_Study_Book.txt` | Algorithm and management markers. | Confirm exact source locator and context; distinguish educational sequence from protocol, order set, dose, threshold or patient-specific instruction. |
| ALG-REV-002 | `HIPPO_High_Yield_Study_Book.txt` | Limited algorithm and management signals. | Apply the same educational-only and clinical-review boundary. |

## 6. Clinical-skill candidates

| Queue item | Artifact | Evidence basis | Required review |
|---|---|---|---|
| SKL-REV-001 | `HIPPO_High_Yield_Study_Book.txt` | Explicit `EM Procedures and Skills` chapter signal. | Identify each skill only from explicit source structure; require indication, contraindication, steps, equipment, assessment method, competency level, locator, clinical review, and pathway evidence. Never create competency approval or procedure authorization. |

## Queue-wide non-actions

No queue item is a production record. No question was clinically approved, no answer was corrected, no Arabic explanation was translated or rewritten, no algorithm was treated as a protocol, and no skill was treated as a competency record.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md "Phase 7.8.11 Updated Source Registry"
[2]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_12_CONTENT_INTELLIGENCE_MAP.md "Phase 7.8.12 Content Intelligence Map"
[3]: file:///home/ubuntu/seg-internship-output/PHASE_7_8_13_TRANSFORMATION_BOUNDARY.md "Phase 7.8.13 Transformation Boundary"
