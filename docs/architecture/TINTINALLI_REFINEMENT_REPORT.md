# Tintinalli Refinement Report — Phase 4-F.1E

**Refined only REVIEW_REQUIRED (220) via per-question stem/explanation/options evidence. AUTO_MAPPED (243) preserved verbatim; UNRESOLVED (293) untouched; Knowledge Graph not updated.**

## 1. Coverage

| Status | Previous (remapped) | New (refined) | Δ |
|---|---|---|---|
| **AUTO_MAPPED** (≥85) | 243 (32.1%) | **243 (32.1%)** | 0 — preserved |
| **REVIEW_REQUIRED** (60-84) | 220 (29.1%) | **2 (0.3%)** | **-218** |
| **UNRESOLVED** (<60) | 293 (38.8%) | **511 (67.6%)** | **+218** |
| **Total** | 756 | 756 | — |

## 2. Refinement Logic

For each of the 220 REVIEW_REQUIRED (category-level `65` via `chapter-title + curated-map`):

- Re-scored per candidate topic using per-question evidence:
  - `chapter-title:40` + `explanation-concept:30` + `stem-keyword:25` + `answer-options(source-category):15`, capped at 100
- **Promoted to AUTO_MAPPED** only if top candidate ≥85 **and** has `stem-keyword` or `explanation-concept` **and** lead ≥15 over next candidate
- **Kept REVIEW_REQUIRED** if top score 60-84 with at least one per-question evidence
- **Demoted to UNRESOLVED** if top score <60 (i.e., category alone without per-question corroboration) — preserves uncertainty, does not promote low confidence

**Result:** 0 promoted (no candidate reached 85 with strong per-question evidence and clear lead), 2 kept (top score 65-70 with per-question keyword), 218 demoted (score 40 alone <60).

## 3. Confidence Distribution (refined)

| Confidence | Count | Evidence |
|---|---|---|
| 88 (preserved AUTO) | 243 | `chapter-title + stem-keyword` |
| 65-70 (kept REVIEW) | 2 | `chapter-title + stem-keyword` or `explanation-concept` (e.g., Resuscitation question with `cardiac arrest` in stem) |
| 55 (Low, UNRESOLVED) | ~20 | `Nutritional Disorders` (Low category, 55) |
| 0-40 (UNRESOLVED) | 491 | No per-question keyword for any candidate topic |

All 511 UNRESOLVED have `candidateTopicIds: []` and `selectedTopicId: null` — no low-confidence promotion.

## 4. Examples

**Preserved AUTO_MAPPED (unchanged):**
- `tintinalli-9e-ch-01-q-0002` → `EM_CRIT_ARREST` — 88 — `chapter-title + stem-keyword`

**Kept REVIEW_REQUIRED (refined, still 65):**
- 2 questions (e.g., `Resuscitation` chapter with `shock` in stem) — scored 65 via `chapter-title + stem-keyword`, insufficient lead to promote, remains `REVIEW_REQUIRED` with single candidate

**Demoted UNRESOLVED (218, correctly not promoted):**
- `tintinalli-9e-ch-05-q-0011` (Cardiovascular Disorders, no `ACS`/`tamponade` keyword in stem/explanation/options) — score 40 (chapter only) <60 → `UNRESOLVED` — reason: “top EM_CARDIO_ACS scored 40 (<60) via chapter-title — demoted to UNRESOLVED, no safe single topic”

## 5. Files

- **Input:** `medical-content/emergency-board/qbank-mapping/tintinalli-remapped-candidates.json` (243/220/293)
- **Output:** `medical-content/emergency-board/qbank-mapping/tintinalli-refined-candidates.json` (243/2/511) — `candidateTopicIds`, `selectedTopicId`, `confidenceScore`, `evidenceBasis`, `mappingReason`, `reviewStatus` for all 756; existing 243 + 293 untouched
- **Graph:** Not updated (still 170 contents, 1,456 questions, 1,701 relations) — promotion to `qbank-topic-mapping.json` requires human VERIFIED

## 6. Implication

The drop 220 → 2 demonstrates that category-level bridging alone (65) is insufficient for per-question precision; only per-question stem/explanation evidence justifies REVIEW or AUTO. This preserves uncertainty and prevents false promotion, as required. Next human review should focus on the 2 remaining REVIEW_REQUIRED plus re-evaluation of the 218 demoted with refined keyword sets if needed.

---

*No AUTO_MAPPED modified, no low-confidence promoted, no Knowledge Graph updated.*
