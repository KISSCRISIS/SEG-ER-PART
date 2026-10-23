# Tintinalli Remap Report — Phase 4-F.1D

**Reprocessed via:** `tintinalli-candidates.json` (pilot) + `tintinalli-category-map.json` (24 categories) + `topic-normalization.schema.json`. Existing 243 verified mappings preserved verbatim; Knowledge Graph not updated.

## 1. Previous vs New Coverage (756 questions)

| Status | Previous (pilot) | New (remapped) | Δ |
|---|---|---|---|
| **AUTO_MAPPED** (≥85) | 243 (32.1%) | 243 (32.1%) | 0 (preserved) |
| **REVIEW_REQUIRED** (60-84) | 0 (0%) | **220 (29.1%)** | **+220** |
| **UNRESOLVED** (<60) | 513 (67.9%) | **293 (38.8%)** | **-220** |
| **Total** | 756 | 756 | — |

**Improved:** 220 questions promoted `UNRESOLVED → REVIEW_REQUIRED` via category normalization. No low-confidence promotion (<60) and no existing mapping altered.

## 2. Confidence Changes

| Confidence | Previous | New | Evidence |
|---|---|---|---|
| 88 (preserved AUTO) | 243 | 243 | `chapter-title + stem-keyword` (existing) |
| 65 (new REVIEW) | 0 | 220 | `chapter-title + curated-map` from category map (Medium) |
| 55 (Low, not promoted) | 0 | ~20 | `Nutritional Disorders` (Low, 55) → remains UNRESOLVED per <60 rule |
| 0 (no candidate) | 513 | 273 | `Unmapped` categories (Disaster, Wound, Hematologic, etc.) |

**Example preserved (unchanged):**
- `tintinalli-9e-ch-01-q-0002` → `EM_CRIT_ARREST` — 88 — `chapter-title + stem-keyword` — “Preserved verified mapping”

**Example improved (UNRESOLVED → REVIEW_REQUIRED):**
- `tintinalli-9e-ch-02-q-0003` (Resuscitation) → `EM_CRIT_ARREST, EM_CRIT_SHOCK, EM_CRIT_ANAPHYLAXIS` — 65 — `chapter-title + curated-map` — “Improved via category normalization: 'Resuscitation' → 3 topics (Medium, broad resuscitation chapter covers arrest, shock, and anaphylaxis...)”

**Example still UNRESOLVED (correctly not promoted):**
- `tintinalli-9e-ch-06-q-0001` (Disorders, truncated) → `[]` — 0 — `chapter-title` — “Truncated source title, cannot bridge safely”

## 3. Top Promoted Categories

| Source Category (Tintinalli chapter) | Promoted to REVIEW_REQUIRED | Candidate Topics |
|---|---|---|
| Cardiovascular Disorders (67 Qs) | ~29 | 4 topics (ACS, tamponade, arrest, shock) |
| Traumatic Disorders (69 Qs) | ~22 | 2 topics (primary survey, TBI) |
| Resuscitation (21 Qs) | ~21 | 3 topics (arrest, shock, anaphylaxis) |
| Gastrointestinal Disorders (50 Qs) | ~34 | 2 topics (abd pain, bleed) |
| Pediatrics (59 Qs) | ~36 | 1 topic (fever) — broad, but now REVIEW_REQUIRED |

**Remaining UNRESOLVED (293):** `Disorders` (truncated, 117 Qs), `and Oral Disorders` (32), `Hematologic Disorders` (39), `Environmental Injuries` (20), `Wound Management` (20), `Dermatology` (17), etc. — no canonical counterpart in 22-topic registry.

## 4. Files

- **Input:** `medical-content/emergency-board/qbank-mapping/tintinalli-candidates.json` (756, 243/0/513)
- **Category Map:** `medical-content/emergency-board/qbank-mapping/tintinalli-category-map.json` (24 entries, 8 Medium, 1 Low, 15 Unmapped)
- **Output:** `medical-content/emergency-board/qbank-mapping/tintinalli-remapped-candidates.json` (756, 243/220/293) — new `selectedTopicId`, `confidenceScore`, `evidenceBasis`, `mappingReason` for 220; 243 preserved verbatim
- **Graph:** Not updated (still 170 contents, 1,456 questions, 1,701 relations) — promotion to `qbank-topic-mapping.json` requires human VERIFIED review per pipeline.

## 5. Validation

- Existing 243 `AUTO_MAPPED` byte-identical to pilot.
- No question with `confidenceScore <60` was promoted (all 293 remain `UNRESOLVED` with `candidateTopicIds: []`).
- `topic-normalization.schema.json` enforced: `Medium` entries have 1-3 candidates, `Unmapped` have 0, `confidence` matches `status`.

---

*Next: Human review of 220 REVIEW_REQUIRED → VERIFIED (single `candidateTopicIds[0]`) before `pnpm index:qbank-mapping` updates Knowledge Graph.*
