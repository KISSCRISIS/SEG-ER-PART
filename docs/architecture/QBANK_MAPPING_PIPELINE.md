# Qbank Mapping Pipeline — Phase 4-F.1A

**Purpose:** Safe, evidence-based workflow for expanding Qbank → `topicId` coverage from 25.9% (1,456/5,612) without guessing. This phase creates **infrastructure only** — no question is mapped.

## 1. Mapping Workflow

```
Qbank JSONL (5,612) ──┐
                      ↓
        candidate-mapping.json (per question, status UNMAPPED → CANDIDATE_FOUND)
                      ↓ (score ≥85)
              AUTO_MATCHED ──→ REVIEW_REQUIRED (60-84) or VERIFIED (human)
                      ↓
        qbank-topic-mapping.json (only VERIFIED + AUTO_MATCHED ≥85 promote to HAS_QUESTIONS)
                      ↓
        knowledge-graph-index.json (HAS_QUESTIONS edges, only for VERIFIED/AUTO_MATCHED)
                      ↓
        mapping-statistics.json (aggregated counts, generated)
```

**Files in `medical-content/emergency-board/qbank-mapping/`:**
- `mapping-status.schema.json` — 5-state lifecycle.
- `candidate-mapping.schema.json` — per-question record (`questionId`, `sourceId`, `candidateTopicIds` ≤3, `confidenceScore` 0-100, `evidenceBasis`, `status`).
- `mapping-statistics.schema.json` — aggregated `byStatus`, `byConfidence`, `bySource`.

## 2. Confidence Rules

| Status | Confidence | Condition | Next step |
|---|---|---|---|
| `UNMAPPED` | 0 | No candidate topic passes evidence thresholds | Stays out of graph |
| `CANDIDATE_FOUND` | 1-59 | Weak keyword in explanation only | Requires stronger evidence or human review |
| `REVIEW_REQUIRED` | 60-84 | Stem keyword or chapter+explanation | Human reviewer must promote to `VERIFIED` or demote to `UNMAPPED` |
| `AUTO_MATCHED` | 85-100 | Chapter title + stem keyword (both) or very high stem score | Auto-promotable to graph, still auditable |
| `VERIFIED` | 85-100, single `candidateTopicIds[0]` | Human reviewer confirmed | Only `VERIFIED` + `AUTO_MATCHED` become `HAS_QUESTIONS` |

**Thresholds are calibration-ready** — change only with paired outcome data per `CALIBRATION_LAYER.md`.

## 3. Evidence Sources Priority

1. **chapter-title** — Qbank `chapterTitle` contains topic-specific phrase (e.g., `cardiac arrest` in `Resuscitation` chapter). Highest weight; requires stem or explanation corroboration to reach `AUTO_MATCHED`.
2. **stem-keyword** — `question` stem contains topic keyword (e.g., `STEMI` for `EM_CARDIO_ACS`). Primary driver for `CANDIDATE_FOUND` → `REVIEW_REQUIRED`.
3. **explanation-concept** — `englishExplanation` contains concept (lower weight; alone max `CANDIDATE_FOUND`).
4. **source-category** — `sourceId` family (e.g., `qbank-frcem` → `resuscitation` system) — tie-breaker only, never alone.

**Priority 1 alone is insufficient** — prevents broad-chapter false positives (e.g., `CARDIOLOGY` ≠ `EM_CARDIO_TAMPONADE`).

## 4. Human Review Requirements

- Every `REVIEW_REQUIRED` (60-84) must be reviewed by a qualified clinician before promotion; reviewer records `VERIFIED` with single `candidateTopicIds[0]`.
- `AUTO_MATCHED` (≥85) is auto-promotable but remains auditable — random 10% sample reviewed per batch.
- No `topicId` is invented; `topic-registry.json` (22 topics, all `under-review`) is the only allowed target. Adding a topic requires new `EM_*` entry + review.
- No book/PDF/Qbank content is copied or edited; mapping lives in the mapping layer only.

## 5. Relationship with Knowledge Graph

- **Source of truth for questions:** `qbank-topic-mapping.json` (existing, 1,456 `mapped` / 4,156 `unmapped`, `topicId: null` for unmapped) remains until pipeline produces `VERIFIED` records.
- **Graph edges:** Only `VERIFIED` + `AUTO_MATCHED` (≥85) become `HAS_QUESTIONS` in `knowledge-graph-index.json` (currently 1,456 edges). `CANDIDATE_FOUND`/`REVIEW_REQUIRED`/`UNMAPPED` stay out of graph.
- **Statistics:** `mapping-statistics.json` is generated from `candidate-mapping` records, never hand-edited; `byStatus` must sum to `totalQuestions` (5,612) and `byConfidence` to mapped count.

---

*No question mapping performed in Phase 4-F.1A. Run `pnpm check / lint / test / build` after schema creation — application logic, database, and UI remain untouched.*
