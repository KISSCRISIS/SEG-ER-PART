# Source Taxonomy Normalization Layer — Phase 4-F.1C

**Purpose:** Bridge Tintinalli (and by extension, other Qbank) source categories (`chapterTitle` as stored) to SEG canonical `topicId` (`EM_*`, 22 topics) without modifying Qbank files or existing mappings. This layer normalizes the *taxonomy* (category names), not the questions.

## Why this layer

Tintinalli Qbank `chapterTitle` values are the only per-question topic proxy, but in the processed JSONL 5 titles are truncated verbatim:

- `and Procedural Sedation` (likely `Airway and Procedural Sedation`)
- `and Oral Disorders` (likely `Head, Ear, Eye, Nose, Throat and Oral Disorders`)
- `and Joints` (likely `Musculoskeletal and Joints`)
- `Disorders` (chapters 6, 8, 11 — original titles lost, 117 Qs affected)
- `Department` (likely `Emergency Department Administration`)

Direct `chapterTitle` → `topicId` reuse would be a false claim. The normalization layer preserves the raw `sourceCategory` verbatim, allows 0-3 `candidateTopicIds`, and carries `confidence` and `uncertainty` so no guess is promoted.

## Files

- `medical-content/emergency-board/qbank-mapping/topic-normalization.schema.json` — Entry requires `sourceCategory`, `sourceId`, `candidateTopicIds` (0-3, pattern `^EM_`), `confidence` (`High`/`Medium`/`Low`/`Unmapped`), `uncertainty` (human-readable), `evidenceBasis` (≤4: `chapter-title`, `topic-keyword`, `curated-map`, `source-category`), `status` (from `mapping-status.schema.json`).
- `medical-content/emergency-board/qbank-mapping/tintinalli-category-map.json` — 24 entries for Tintinalli's 22 distinct `chapterTitle` values (plus 2 truncated duplicates collapsed). Generated 2026-09-14, `sourceId: qbank-tintinalli-9e`.
- This doc.

## Bridging Rules

| Confidence | Candidate count | Status | Promotion |
|---|---|---|---|
| `High` | 1-3 | `AUTO_MAPPED` or `VERIFIED` only with `curated-map` + `chapter-title` both | Auto-promotable to `qbank-topic-mapping.json` (≥85) after review sample |
| `Medium` | 1-3 | `REVIEW_REQUIRED` | Must be reviewed per-question (stem + explanation) before promotion |
| `Low` | 0-3 | `REVIEW_REQUIRED` | Weak bridge, not auto-promotable |
| `Unmapped` | 0 | `UNMAPPED`/`UNRESOLVED` | No safe candidate; stays out of graph |

**Multiple candidates are required** when a source category is broader than a single canonical topic (e.g., `Cardiovascular Disorders` → `EM_CARDIO_ACS`, `EM_CARDIO_TAMPONADE`, `EM_CRIT_ARREST`, `EM_CRIT_SHOCK`).

## Tintinalli Map Summary (24 categories → 22 topics)

- **Medium (8):** `Resuscitation` (→ 3 topics), `Cardiovascular Disorders` (4), `Gastrointestinal Disorders` (2), `Gynecology` (1), `Pediatrics` (1), `Nervous System Disorders` (2), `Toxicologic Disorders` (1), `Traumatic Disorders` (2)
- **Low (1):** `Nutritional Disorders` (3, weak)
- **Unmapped (15):** `Disaster Management`, truncated 5, plus 9 with no canonical counterpart (Wound, Environmental, Hematologic, Dermatology, Psychosocial, etc.) — **all truncated titles preserved verbatim**.

## Relationship to Existing Layers

- **Does not modify** `qbank-topic-mapping.json` (still 243/756 mapped, 513 unresolved) or `knowledge-graph-index.json` (170 contents, 1,456 questions).
- **Consumed by** next phase’s per-question candidate generation: `tintinalli-candidates.json` will join this category map (source-category) with per-question `explanation-concept` and `stem-keyword` to reach `AUTO_MAPPED` (≥85) only when category + at least one per-question evidence coincide.
- **Uncertainty is preserved:** truncated titles keep their raw string; `Unmapped` entries carry empty `candidateTopicIds` and explicit `uncertainty`.

---

*No Qbank mappings modified, no UI/DB changes. Next: use this map plus per-question evidence to populate `tintinalli-candidates.json` REVIEW_REQUIRED → VERIFIED via human review.*
