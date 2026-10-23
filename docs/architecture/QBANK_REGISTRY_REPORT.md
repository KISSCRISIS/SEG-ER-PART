# QBANK Registry Report — Phase 4-E.4-A

Normalization layer only. **No question was modified and no `topicId` was assigned.** All counts were verified against the JSONL files on disk (line counts = records).

## Totals

- Sources: 5
- Questions: **5,612** (756 Tintinalli 9e + 1,044 Rosen 10e + 1,529 FRCEM + 1,927 Hippo + 356 Oxford SCE)

## Required fields — all present at 100%

| Field | Source field | Coverage |
|---|---|---|
| Question ID | `id` | 5,612/5,612 (100%) |
| Source | `family` | 5,612/5,612 (100%) |
| Stem | `question` | 5,612/5,612 non-empty |
| Answer | `correctAnswerKey` + `correctAnswer` | 5,612/5,612 |
| Explanation | `englishExplanation` + `arabicExplanation` | 5,612/5,612 each |
| Topic/Chapter metadata | `family` + `chapterNumber` + `chapterTitle` + `sourceQuestionNumber` | 5,612/5,612 |

Additional: `options` (A-E) 5,612/5,612; `governanceStatus=under-review` 5,612/5,612. FRCEM alone carries `references` on 482/1,529 (31.5%); all others carry `sourceLocator` + `arabicExplanationStatus`/`englishExplanationStatus` + `usageScope`.

## Chapter information (per source)

| Source | Distinct chapters | Example title | Note |
|---|---|---|---|
| Tintinalli 9e | 24 | ch-5: 67 qs | Per-question copy of book chapter |
| Rosen 10e | 185 | 3–6 qs/chapter | Sparse; chapterNumber is the anchor |
| FRCEM | 32 | SURGICAL EMERGENCIES (32), TRAUMA (171) | System-level |
| Hippo | 18 | CARDIOVASCULAR DISORDERS (148) | System-level; all `correctAnswerKey=A` artifact — audit before difficulty use |
| Oxford SCE | 16 | 20–40 qs/chapter | Smallest; system-level |

All chapters: 100% carry `chapterNumber` + `chapterTitle`.

## Mapping readiness

All 5 sources: **ready — chapter-anchored; awaiting `topicId` assignment in Phase 4-E.4-B** via priority: 1) chapter metadata → 2) category → 3) clinical keywords → 4) explanation concepts. FRCEM/Hippo/Oxford are system-level, so one-to-one chapter→topic reuse would be a false claim; per-question curation is required. Hippo carries an answer-key audit flag.

## Location

`medical-content/emergency-board/knowledge-graph/qbank-registry.json` (canonical) mirrored to `medical-content/knowledge-graph/qbank-registry.json` for the existing graph path. Registry path `emergency-board/topic-registry` remains the canonical topic registry for Phase 4-E.4-B.

## Invariants

Zero records lack stem/answer/explanation. Zero `topicId` fields exist in any source file — assignment is Phase 4-E.4-B work after this registry.
