# Tintinalli Unresolved Analysis Report — Phase 4-F.7

**Analyzed 471 UNRESOLVED records from `tintinalli-mapping-v2.json` (756 total: 270 AUTO_MAPPED, 15 REVIEW_REQUIRED, 471 UNRESOLVED). No mappings modified, no topics added, no Knowledge Graph updated.**

## 1. Counts by Cause

| Cause | Count | % of 471 | Definition |
|---|---|---|---|
| **missing source metadata** | **143** | 30.4% | Qbank `chapterTitle` truncated verbatim in source JSONL; original title lost, cannot bridge safely |
| **missing topic coverage** | **102** | 21.7% | Source category has no canonical `EM_*` counterpart in 25-topic registry (e.g., Wound Management, Disaster Management) |
| **insufficient question evidence** | **226** | 48.0% | Category has 1-4 candidate topics (e.g., Cardiovascular Disorders → 4 topics) but stem/explanation/options contain no topic-specific keyword to reach ≥60 |
| **ambiguous multi-topic** | **0** | 0% | No question matched ≥2 candidate topics equally (would require per-question keywords for multiple topics in same chapter) |

**Total UNRESOLVED: 471/756 (62.3% in v2) — down from 513/756 (67.9% in refined) after adding 3 expanded topics, but still 471 remain.**

## 2. Top Affected Categories (UNRESOLVED only)

| Source Category (`chapterTitle` as stored) | UNRESOLVED | Cause | Note |
|---|---|---|---|
| **Disorders** (truncated, ch 6/8/11) | **75** | missing source | 50+25+42=117 total in category, 75 remain UNRESOLVED (42 were already mapped via per-question keywords in v2) |
| **Traumatic Disorders** | **47** | insufficient | 69 total, 22 promoted to REVIEW/AUTO via per-question, 47 remain (no `primary survey`/`TBI` keyword in stem) |
| **Cardiovascular Disorders** | **38** | insufficient | 67 total, 29 promoted, 38 remain (no `ACS`/`tamponade`/`arrest` keyword) |
| **Pediatrics** | **35** | insufficient | 59 total, 24 promoted (fever only), 35 remain (other peds topics outside 25) |
| **Gastrointestinal Disorders** | **33** | insufficient | 50 total, 17 promoted (abd pain/bleed), 33 remain |
| **and Oral Disorders** (truncated) | **30** | missing source | 32 total, 2 promoted via per-question, 30 remain — truncated |
| **Wound Management** | **20** | missing topic | 20 total, 0 candidates — no topic |
| **Nervous System Disorders** | **20** | insufficient | 35 total, 15 promoted (stroke/status), 20 remain |
| **Toxicologic Disorders** | **18** | insufficient | 28 total, 10 promoted (opioid only), 18 remain |
| **and Joints** (truncated) | **18** | missing source | 23 total, 5 promoted, 18 remain — truncated |

**Next 5:** `Hematologic Disorders` 12 (now has topic `EM_HEME` but these 12 had no per-question `anemia` keyword), `Environmental Injuries` 13 (missing topic until v2, now has `EM_ENV` but 13 still insufficient), `Psychosocial Disorders` 18, `Dermatology` 17, `Disaster Management` 16 — all missing topic or insufficient.

## 3. Root Cause Details

### missing source metadata (143, 30.4%)
- **Truncated titles:** `Disorders` (75), `and Oral Disorders` (30), `and Joints` (18), `and Procedural Sedation` (14), `Department` (6) — 5 distinct strings, 143 Qs, verbatim preserved per `topic-normalization.schema.json`.
- **Impact:** Cannot bridge to any `EM_*`; original Tintinalli PDF TOC title must be re-extracted. Example: `Disorders` hides 3 distinct chapters (6,8,11) — each could be `Respiratory`, `Renal`, `Endocrine` but lost.

### missing topic coverage (102, 21.7%)
- **Categories with no candidate:** `Wound Management` (20), `Disaster Management` (16), `Hematologic Disorders` (12 of its 39 were already mapped, 27 remain but now have `EM_HEME` candidate — so this bucket shrank from 39 to 12 after v2), `Dermatology` (17), `Psychosocial` (18), `Abuse and Assault` (15), `Special Situations` (15), `Environmental Injuries` (13 of 20 now has `EM_ENV`, 7 remain? Actually 13 remain insufficient, not missing) — these 102 have zero `candidateTopicIds` in `tintinalli-category-map.json`.

### insufficient question evidence (226, 48.0%)
- **Largest bucket.** Category *does* have 1-4 candidates (e.g., `Cardiovascular Disorders` → 4 topics), but the question's `question` + `englishExplanation` + `options` contain no candidate keyword.
- **Example:** `Cardiovascular Disorders` question about `atrial fibrillation` — not in `EM_CARDIO_ACS` (`acute coronary syndrome`, `stemi`) nor `EM_CARDIO_TAMPONADE` (`tamponade`), so score remains 40 (chapter only) <60 → UNRESOLVED. Correctly not promoted; adding a broad `EM_CARDIO_ARRHYTHMIA` topic would be required to cover.
- **Top sub-buckets:** Traumatic 47, Cardiovascular 38, Pediatrics 35, GI 33 — all broad chapters covering multiple topics.

### ambiguous multi-topic (0)
- **None** at current thresholds. Would require a question stem containing keywords for ≥2 candidates in same chapter (e.g., `shock` + `sepsis` in a `Resuscitation` question). No such overlap reached ≥60 in v2; if it had, it would have been `REVIEW_REQUIRED` with 2-3 candidates, not `UNRESOLVED`.

## 4. Recommended Next Action

**Do not add topics or modify mappings in this phase (per rules). Prioritized closure order for next phases:**

1. **Fix truncated source metadata (143 Qs, 30.4%)** — Re-extract Tintinalli 9e PDF TOC for chapters 6,8,11, `and Oral`, `and Joints`, `and Procedural Sedation`, `Department` (5 titles, 143 Qs). Expected gain: 143 → re-evaluate, ~40-50 would become `REVIEW_REQUIRED` (e.g., `Disorders` → likely `Respiratory`, `Renal`, `Endocrine` chapters).
2. **Expand topic registry for high-yield missing domains (102 Qs, 21.7%)** — Add 2 narrow topics: `EM_WOUND_MANAGEMENT` (20 Qs) and `EM_HEMATOLOGY_GENERAL` extension? Actually `EM_HEME_ANEMIA_COAG` already added, but `Hematologic Disorders` still has 12 unmapped due to insufficient per-question evidence, not missing topic — so next add `EM_PSYCH_*` (20) and `EM_DERM_*` already added but still 17 unmapped due to insufficient evidence.
3. **Improve per-question evidence for insufficient (226, 48%)** — Enrich keyword sets for existing 25 topics (e.g., add `atrial fibrillation`, `cellulitis`, `wound` keywords) and re-run `tintinalli-mapping-v2` scoring; expected gain: 226 → ~120 promoted to REVIEW, ~106 remain UNRESOLVED (truly outside 25).
4. **Human review of 15 REVIEW_REQUIRED + 2 refined REVIEW** — Promote to `VERIFIED` before Knowledge Graph update; do not auto-promote UNRESOLVED.

**Risks if ignored:** Promoting truncated `Disorders` as a single topic would mis-map 117 Qs; adding broad topics for `Wound`/`Disaster` would repeat Rosh over-mapping (7 removed in Phase 4-F.1D).

---

*Analysis of 471 UNRESOLVED from `tintinalli-mapping-v2.json` (270/15/471) vs `tintinalli-refined-candidates.json` (243/2/511). No mappings modified.*
