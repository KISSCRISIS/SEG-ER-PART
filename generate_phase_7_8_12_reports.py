from __future__ import annotations
import json
from pathlib import Path

OUT = Path('/home/ubuntu/seg-internship-output')
STATUS = Path('/home/ubuntu/seg-manus-status')
RAW = json.loads((STATUS / 'phase_7_8_12_content_intelligence_raw.json').read_text(encoding='utf-8'))
FILES = {x['name']: x for x in RAW['files']}

REFS = {
    'intake': '/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/INTAKE_FINDINGS.md',
    'registry': '/home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md',
    'overlap': '/home/ubuntu/seg-manus-status/phase_7_8_10_content_overlap.md',
    'raw': '/home/ubuntu/seg-manus-status/phase_7_8_12_content_intelligence_raw.json',
}


def bullet_list(items):
    return '\n'.join(f'- {x}' for x in items)


def fmt_examples(r, n=12):
    vals = r.get('chapter_examples', [])[:n]
    return '; '.join(vals) if vals else 'No normalized chapter heading was detected by the structural scan.'


def row(r, target, classification, review, evidence, duplication):
    return '| ' + ' | '.join([
        r['name'], target, classification, review, evidence, duplication
    ]) + ' |'

# 1. Content intelligence map
lines = []
lines += [
    '# SEG PHASE 7.8.12 — UPDATED SOURCE CONTENT INTELLIGENCE MAP', '',
    '**Mode:** Controlled analysis / read-only  ',
    '**Authority:** Phase 7.8.10 and Phase 7.8.11 evidence  ',
    '**Scope:** Priority 1 text artifacts only.  ', '',
    '## Executive determination', '',
    'The four Priority 1 artifacts contain usable structural signals for a controlled SEG Knowledge Layer transformation map. The result is a **candidate map**, not content conversion, clinical approval, rights approval, identity mapping, or production readiness. No claim of SEG authorship is made on the present evidence.', '',
    '> The detected structure identifies possible chapters, question units, explanations, Arabic mentor layers, and examination-oriented patterns. It does not certify the medical correctness, completeness, source edition, or copyright status of any item.', '',
    '## 1. Priority 1 artifact inventory', '',
    '| Artifact | Location | Bytes | SHA-256 | Structural signal |',
    '|---|---|---:|---|---|'
]
for name in [
    'FRCEM_High_Yield_Study_Book.txt',
    'frcem All_Chapters_Questions_and_Explanations_Full.txt',
    'HIPPO_High_Yield_Study_Book.txt',
    'HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt',
]:
    r = FILES[name]
    signal = f"{r['chapter_markers']} chapter markers; {r['question_markers']} question markers; {r['answer_markers']} answer markers; {r['explanation_markers']} explanation markers; {r['arabic_chars']} Arabic characters"
    lines.append(f"| {name} | `{r['path']}` | {r['bytes']} | `{r['sha256']}` | {signal} |")

lines += ['', '## 2. Content structure map', '', '| Artifact | Chapters/topics | Questions | Explanations | Arabic mentor layer | Exam patterns |', '|---|---|---:|---:|---|---|']
for name in [
    'FRCEM_High_Yield_Study_Book.txt',
    'frcem All_Chapters_Questions_and_Explanations_Full.txt',
    'HIPPO_High_Yield_Study_Book.txt',
    'HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt',
]:
    r = FILES[name]
    chapter_text = fmt_examples(r, 10)
    arabic = f"{r['arabic_chars']} Arabic chars; markers: {', '.join(f'{k}={v}' for k,v in r['arabic_markers'].items()) or 'limited/no dedicated marker'}"
    exam = ', '.join(f'{k}={v}' for k,v in r['exam_markers'].items()) or 'No normalized exam marker'
    lines.append(f"| {name} | {chapter_text} | {r['question_markers']} detected question markers | {r['explanation_markers']} detected explanation markers | {arabic} | {exam} |")

lines += ['', '### Interpretation of the structure', '',
          'The FRCEM high-yield text is primarily a compact lesson/study-book layer with repeated chapter markers, management and algorithm signals, and limited but non-zero Arabic annotations. The full FRCEM questions file is a question-and-explanation corpus with 1,529 detected numbered question markers and extensive Arabic explanation signals. The HIPPO high-yield text is primarily a lesson/study-book layer with an explicit procedures-and-skills chapter signal; that signal is not a competency record or procedure authorization. The HIPPO Arabic questions file has 1,927 detected question markers and a repeated Arabic `شرح`/`الإجابة` pattern, making it the strongest Arabic mentor-layer candidate in this package.', '',
          'Detected marker counts are structural observations. They are not canonical chapter totals, question-bank approval counts, or proof that every marker represents a complete standalone educational object.', '',
          '## 3. Evidence-bounded transformation candidates', '',
          '| Artifact | Potential SEG target | Evidence basis | Boundary |',
          '|---|---|---|---|']
transforms = [
    ('FRCEM_High_Yield_Study_Book.txt', 'lesson', 'chapter-organized high-yield study text; management/differential/algorithm signals', 'External/reference-based or derived educational candidate; requires source, rights, taxonomy, and clinical review.'),
    ('FRCEM_High_Yield_Study_Book.txt', 'exam_trap', 'exam/trap/red-flag/pattern markers', 'Candidate extraction only; no trap object may be created or approved here.'),
    ('FRCEM_High_Yield_Study_Book.txt', 'algorithm', 'algorithm markers and management sequences', 'Algorithm support signal only; no clinical protocol or medical correction.'),
    ('frcem All_Chapters_Questions_and_Explanations_Full.txt', 'question_bank', '1,529 question markers, 2,563 answer markers, 4,416 explanation markers', 'Requires structural completeness, source locator, clinical review, rights review, and answer-key verification.'),
    ('frcem All_Chapters_Questions_and_Explanations_Full.txt', 'flashcard', 'question/answer/explanation units may support derivative study cards', 'Derivative candidate only; no flashcard records or deduplication executed.'),
    ('frcem All_Chapters_Questions_and_Explanations_Full.txt', 'arabic_mentor_explanation', '1,387,870 Arabic characters; شرح/لماذا/الإجابة markers', 'Arabic layer candidate; authorship and rights are unresolved; no translation or rewriting performed.'),
    ('frcem All_Chapters_Questions_and_Explanations_Full.txt', 'exam_trap', 'exam/trap/pattern/red-flag signals', 'Candidate signal only; no clinical exam claim is approved.'),
    ('HIPPO_High_Yield_Study_Book.txt', 'lesson', 'chapter-organized study text across emergency medicine domains', 'External/reference-based or derived educational candidate; requires review.'),
    ('HIPPO_High_Yield_Study_Book.txt', 'algorithm', 'management/differential and limited algorithm signals', 'Educational algorithm candidate only; not a protocol.'),
    ('HIPPO_High_Yield_Study_Book.txt', 'exam_trap', 'trap/pattern/red-flag signals', 'Candidate extraction only; no assessment approval.'),
    ('HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt', 'question_bank', '1,927 detected question markers and 3,858 answer markers', 'Requires structural, clinical, rights, taxonomy, and locator review.'),
    ('HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt', 'flashcard', 'repeated question/answer/explanation unit pattern', 'Derivative candidate only; no record generation.'),
    ('HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt', 'arabic_mentor_explanation', '1,927 شرح markers and 1,927 الإجابة markers', 'Strongest Arabic mentor-layer candidate; not certified as SEG Original.'),
    ('HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt', 'exam_trap', 'exam/trap/pattern/management signals', 'Candidate signal only; requires review.'),
]
for t in transforms:
    lines.append('| ' + ' | '.join(t) + ' |')

lines += ['', '## 4. Source classification', '',
          '| Content group | Primary classification | Secondary state | Rationale |',
          '|---|---|---|---|',
          '| FRCEM high-yield study layer | EXTERNAL_REFERENCE_BASED | REQUIRES_REVIEW | FRCEM naming and external-reference signals are present; no SEG ownership evidence is supplied. |',
          '| FRCEM question/explanation layer | DERIVED_EDUCATIONAL_CONTENT | REQUIRES_REVIEW | Question-and-explanation structure appears derived/educational; source ownership and edition remain unresolved. |',
          '| HIPPO high-yield study layer | EXTERNAL_REFERENCE_BASED | REQUIRES_REVIEW | HIPPO/Rosen/Tintinalli reference signals are present; no SEG ownership evidence is supplied. |',
          '| HIPPO Arabic question/explanation layer | DERIVED_EDUCATIONAL_CONTENT | REQUIRES_REVIEW | Arabic explanation layer is a derivative educational candidate; it is not declared SEG Original. |',
          '| SEG_ORIGINAL_CANDIDATE | Not assigned to any group | REQUIRES_REVIEW | No explicit authorship evidence in Phase 7.10/7.11 supports this classification. |',
          '',
          'The label `REQUIRES_REVIEW` is retained for all groups because medical correctness, rights, version/edition, locator, taxonomy, track, and review evidence are not closed.',
          '',
          '## 5. Non-actions', '',
          bullet_list([
              'No identity links, `SRC-*` IDs, or `CAND-*` mappings were created.',
              'No production JSON, database record, schema change, import, adapter, activation, or publication was created or executed.',
              'No medical content was corrected, rewritten, translated, approved, or clinically judged.',
              'No rights or copyright decision was made.',
          ]),
          '', '## References', '',
          f"[1]: {REFS['intake']} \"Phase 7.8.10 Updated Source Intake Findings\"",
          f"[2]: {REFS['registry']} \"Phase 7.8.11 Updated Source Registry\"",
          f"[3]: {REFS['overlap']} \"Phase 7.8.10 Conservative Legacy Content Overlap\"",
          f"[4]: {REFS['raw']} \"Phase 7.8.12 Raw Structural Analysis\"",
]
(OUT / 'SEG_PHASE_7_8_12_CONTENT_INTELLIGENCE_MAP.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')

# 2. Transformation priority
lines = [
    '# SEG PHASE 7.8.12 — TRANSFORMATION PRIORITY', '',
    '**Mode:** Controlled analysis / read-only. This is a candidate prioritization, not an execution authorization.', '',
    '## Priority decision', '',
    'Priority 1 content is suitable for the next **controlled review and adapter-design preparation** because its broad structures are observable. It is not ready for production transformation. The safest first review order is to separate question units from explanations, preserve chapter/source locators, and keep the Arabic mentor layer as a distinct derivative layer.', '',
    '| Rank | Source group | Candidate outputs | Why this order | Required gates before any transformation |',
    '|---:|---|---|---|---|',
    '| 1 | HIPPO Arabic questions and explanations | question_bank; flashcard; arabic_mentor_explanation; exam_trap | Strong repeated Q/A/Arabic explanation structure: 1,927 question markers and paired Arabic markers. | Source/version/locator, rights, clinical review, taxonomy, answer completeness, duplicate review. |',
    '| 2 | FRCEM questions and explanations | question_bank; flashcard; arabic_mentor_explanation; exam_trap | Largest explicit FRCEM question corpus with 1,529 question markers and extensive explanation signals. | Same gates as rank 1, plus question/answer/explanation boundary validation. |',
    '| 3 | FRCEM high-yield study book | lesson; algorithm; exam_trap | Chapter-organized study layer with strong management/algorithm/red-flag signals. | Edition/locator, rights, clinical review, lesson boundary, no-protocol boundary. |',
    '| 4 | HIPPO high-yield study book | lesson; algorithm; exam_trap | Broad emergency medicine domain coverage and a procedures/skills chapter signal. | Review of external references, lesson boundaries, clinical skill governance boundary, rights. |',
    '',
    '## Layer separation requirements', '',
    '| Layer | Handling rule |',
    '|---|---|',
    '| External reference-based knowledge | Keep source identity and locator; do not present as SEG-owned content. |',
    '| Derived educational content | Preserve derivation lineage and keep `Pending Clinical Review`; do not silently merge with legacy records. |',
    '| Arabic mentor explanation | Treat as a separate candidate layer; do not assume SEG authorship or perform translation/rewrite. |',
    '| Exam intelligence | Keep exam-trap/pattern signals separate from clinical facts; no assessment approval. |',
    '| Algorithms | Treat as educational algorithm support only; never as a clinical protocol. |',
    '',
    '## Minimum evidence required for the next controlled step', '',
    bullet_list([
        'A versioned source registry with owner, publisher, edition/version, language, rights/display scope, and precise chapter/question locators.',
        'A reviewed content-boundary contract defining question, answer, explanation, Arabic mentor, exam-trap, and algorithm units without rewriting source content.',
        'An explicit manual identity/duplicate review against `officialUnifiedTopics`, `flashcards`, `examTraps`, and `topicFamilyIndex`; similarity alone remains `DUPLICATE_SIGNAL` or `MANUAL_REVIEW_REQUIRED`.',
        'Independent clinical review and rights review before any candidate is considered for adapter dry-run handoff.',
        'A separate implementation authorization before any adapter execution, import, or learner exposure.',
    ]),
    '', '## References', '',
    f"[1]: {REFS['intake']} \"Phase 7.8.10 Updated Source Intake Findings\"",
    f"[2]: {REFS['registry']} \"Phase 7.8.11 Updated Source Registry\"",
    f"[3]: {REFS['overlap']} \"Phase 7.8.10 Conservative Legacy Content Overlap\"",
]
(OUT / 'SEG_PHASE_7_8_12_TRANSFORMATION_PRIORITY.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')

# 3. Gate report
lines = [
    '# SEG PHASE 7.8.12 — GATE REPORT', '',
    '**Mode:** Controlled analysis / read-only  ',
    '**Scope:** Four Priority 1 text artifacts only.  ',
    '**Final status:** `CONTENT_MAPPING_READY`  ',
    '',
    '## Decision', '',
    'The content-intelligence mapping is structurally complete enough to identify transformation candidates and a conservative review order. This status does **not** mean production-ready, clinically approved, rights-cleared, identity-linked, or authorized for adapter execution.', '',
    '| Gate | Result | Evidence |',
    '|---|---|---|',
    '| Priority 1 scope isolated | PASS | Four specified text artifacts were analyzed; Priority 2/3 were excluded from structural mapping. |',
    '| Chapter/topic structure observed | PASS | Chapter markers and chapter examples were extracted for all four artifacts. |',
    '| Question/explanation structure observed | PASS | Question, answer, explanation, and Arabic-marker signals were measured where present. |',
    '| Transformation candidates defined | PASS | lesson, question_bank, flashcard, exam_trap, algorithm, and arabic_mentor_explanation candidates are documented. |',
    '| Source classification | PASS WITH REVIEW | No group was classified as SEG Original; external/derived states remain review-bound. |',
    '| Duplication analysis | PASS WITH REVIEW | Phase 7.8.10 overlap evidence was reused; no identity or duplicate decision was created. |',
    '| Identity bridge | BLOCKED/NOT IN SCOPE | No `SRC-*`/`CAND-*` mapping or identity link was created. |',
    '| Clinical review | BLOCKED/PENDING | No independent clinical approval evidence was added. |',
    '| Rights review | BLOCKED/PENDING | No rights or display approval evidence was added. |',
    '| Production/implementation | NOT AUTHORIZED | No JSON, adapter, import, database, schema, activation, or publication action occurred. |',
    '',
    '## Exact remaining gates', '',
    bullet_list([
        'Source/version/edition/locator metadata must be completed for each Priority 1 artifact.',
        'Owner, publisher, and rights/display evidence must be independently documented.',
        'Clinical review must assess the question-answer-explanation units and any algorithm/exam-trap candidates.',
        'A manual duplicate/identity review must separate overlap, derivation, and common reference language from true duplicates.',
        'The Arabic mentor layer must remain separate until authorship, derivation, rights, and clinical review are resolved.',
        'Implementation authorization is still required before any adapter dry-run or learner exposure.',
    ]),
    '',
    '## Safety confirmation', '',
    '| Non-action | Result |',
    '|---|---|',
    '| Production JSON | Not created |',
    '| Identity links / SRC/CAND mappings | Not created |',
    '| Content transformation or medical rewriting | Not performed |',
    '| Database/schema/application changes | Not performed |',
    '| Adapter/import/activation/publication | Not performed |',
    '', '## References', '',
    f"[1]: {REFS['intake']} \"Phase 7.8.10 Updated Source Intake Findings\"",
    f"[2]: {REFS['registry']} \"Phase 7.8.11 Updated Source Registry\"",
    f"[3]: {REFS['overlap']} \"Phase 7.8.10 Conservative Legacy Content Overlap\"",
    f"[4]: {REFS['raw']} \"Phase 7.8.12 Raw Structural Analysis\"",
]
(OUT / 'SEG_PHASE_7_8_12_GATE_REPORT.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
print('created Phase 7.8.12 reports')
for name in ['SEG_PHASE_7_8_12_CONTENT_INTELLIGENCE_MAP.md','SEG_PHASE_7_8_12_TRANSFORMATION_PRIORITY.md','SEG_PHASE_7_8_12_GATE_REPORT.md']:
    p = OUT / name
    print(f'{name}: bytes={p.stat().st_size}')
