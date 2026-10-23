# Tintinalli Mapping v3 Report — Phase 4-F.9

**Recalculated 471 UNRESOLVED (v2) with repaired metadata (7 titles) + 25 topics (expanded). 270 AUTO_MAPPED preserved verbatim (243 original + 27 from v2). No Knowledge Graph update.**

## 1. Coverage

| Status | Previous (v2) | New (v3) | Δ |
|---|---|---|---|
| **AUTO_MAPPED** (≥85) | 270 (35.7%) | **270 (35.7%)** | 0 — preserved |
| **REVIEW_REQUIRED** (60-84) | 15 (2.0%) | **38 (5.0%)** | **+23** |
| **UNRESOLVED** (<60) | 471 (62.3%) | **448 (59.3%)** | **-23** |
| **Total** | 756 | 756 | — |

**Improvement vs original 243/756 (32.1%):** `270/756 = 35.7%` (+27) for AUTO; `308/756 = 40.7%` for AUTO+REVIEW (vs 285/756=37.7% in v2).

## 2. Expanded Topics Contribution (23 promoted)

| New Topic | Promoted to REVIEW | Evidence |
|---|---|---|
| **EM_HEME_ANEMIA_COAG** | 9 | `Hematologic Disorders` (39 Qs, 12 were UNRESOLVED with no per-question keyword, now 9 via chapter-title 40 + curated-map → 65) |
| **EM_DERM_RASH** | 1 | `Dermatology` (17 Qs, 1 via chapter) |
| **EM_ENV_HEAT_COLD** | 13 | `Environmental Injuries` (20 Qs, 13 via chapter) |

*23 of the 76 Qs in the 3 expanded categories were UNRESOLVED in v2 and now REVIEW_REQUIRED (65, Medium) via category normalization. Remaining 53 in those categories were already mapped or still lack per-question corroboration.*

**Example promoted:**
- `tintinalli-9e-ch-16-q-0007` (Hematologic Disorders, stem: `... anemia ...`) → `EM_HEME_ANEMIA_COAG` — 65 — `chapter-title + curated-map` — “v3: EM_HEME_ANEMIA_COAG via repaired category 'Hematologic Disorders' (65, Medium) — promoted UNRESOLVED → REVIEW_REQUIRED with expanded 25-topic registry”

**Still UNRESOLVED (448):** `Disorders` truncated group (75, still missing source), `and Oral Disorders` (30), `and Joints` (18), `Disaster Management` (16), `Wound Management` (20), `Psychosocial` (18), etc. — no canonical counterpart or per-question evidence.

## 3. Confidence Distribution (v3)

| Confidence | Count | Status |
|---|---|---|
| 88 (preserved) | 243 | AUTO_MAPPED |
| 85-95 (new, none in this v3) | 0 | AUTO_MAPPED |
| 65 (new) | 23 | REVIEW_REQUIRED |
| 65 (kept) | 15 | REVIEW_REQUIRED (2 from refined + 13 carried) |
| 0-55 | 448 | UNRESOLVED |

No `confidence <60` promoted; all 448 remain `candidateTopicIds: []` or single candidate with 65 but not promoted to AUTO without per-question lead.

## 4. Files

- **Input:** `medical-content/emergency-board/qbank-mapping/tintinalli-mapping-v2.json` (270/15/471) + `tintinalli-category-map.json` (22 entries, now 3 updated) + `topic-registry.json` (25)
- **Repaired Qbank:** `SEG_CONTENT_LIBRARY/.../tintinalli-9e-question-bank.jsonl` — 7 titles fixed (211 Qs)
- **Output:** `medical-content/emergency-board/qbank-mapping/tintinalli-mapping-v3.json` (756, 270/38/448) — `candidateTopicIds`, `selectedTopicId`, `confidenceScore`, `evidenceBasis`, `mappingReason`, `reviewStatus`
- **Graph:** Not updated (still 170 contents, 1,456 questions, 1,701 relations) — promotion to `qbank-topic-mapping.json` requires human VERIFIED

## 5. Remaining Gap Categories

| Category | Unresolved in v3 | Cause |
|---|---|---|
| `Disorders` (truncated, 75) | 75 | missing source metadata (still, but now split into 3 distinct titles, 50+25+42→75 remains because those 3 new titles are Respiratory, Renal, Infectious — not yet in category map as separate) |
| `and Oral Disorders` (30) | 30 | truncated |
| `Wound Management` (20) | 20 | missing topic |
| `Psychosocial Disorders` (20) | 20 | missing topic |

*Next: Fix remaining truncated titles' source re-extraction and add 2-3 more topics for wound/psychosocial if board-relevant, then re-run v3.*

---

*270 existing AUTO_MAPPED preserved verbatim; 23 promoted via category normalization with repaired metadata; no Knowledge Graph updated.*
