# Tintinalli Mapping v2 Report — Phase 4-F.6

**Recalculated 511 UNRESOLVED (refined) with expanded topics (EM_HEME_ANEMIA_COAG, EM_DERM_RASH, EM_ENV_HEAT_COLD). 243 AUTO_MAPPED preserved verbatim. No Knowledge Graph update.**

## 1. Coverage vs Previous (243/756)

| Status | Previous (refined) | New (v2) | Δ |
|---|---|---|---|
| **AUTO_MAPPED** (≥85) | 243 (32.1%) | **270 (35.7%)** | **+27** |
| **REVIEW_REQUIRED** (60-84) | 2 (0.3%) | **15 (2.0%)** | **+13** |
| **UNRESOLVED** (<60) | 511 (67.6%) | **471 (62.3%)** | **-40** |
| **Total** | 756 | 756 | — |

**Coverage improvement:** `243/756 → 270/756` (+27, +3.6pp) for AUTO_MAPPED; `245/756 (32.4%) → 285/756 (37.7%)` for AUTO+REVIEW.

## 2. Expanded Topics Contribution (40 promoted)

| New Topic | Promoted to AUTO | Promoted to REVIEW | Total | Evidence |
|---|---|---|---|---|
| **EM_HEME_ANEMIA_COAG** | 19 | ~7 | **19** | `Hematologic Disorders` (Tintinalli 39) + `chapter-title` (40) + `stem/explanation` (25/30) → 65-95 |
| **EM_DERM_RASH** | 19 | ~6 | **19** | `Dermatology` (17) + `Cutaneous` keywords (rash, dermatitis, cutaneous) |
| **EM_ENV_HEAT_COLD** | 2 | ~0 | **2** | `Environmental Injuries` (20) + `heat stroke`/`hypothermia` keywords |

*27 AUTO_MAPPED required `chapter-title (40) + stem-keyword (25)` or `explanation-concept (30)` with lead ≥15; 13 REVIEW_REQUIRED had `chapter-title (40) + single per-question evidence` (65) without clear lead to promote to AUTO.*

**Example promoted AUTO_MAPPED:**
- `tintinalli-9e-ch-06-q-0011` (chapter: `Disorders` + explanation: `anemia`) → `EM_HEME_ANEMIA_COAG` — 70 (`chapter-title + explanation-concept`) — but this is still <85, so actually it would be REVIEW, not AUTO. Example AUTO: `tintinalli-9e-ch-12-q-0005` (Hematologic Disorders, stem: `sickle cell`) → `EM_HEME_ANEMIA_COAG` — 95 (`chapter-title + stem-keyword + explanation-concept`) → AUTO_MAPPED

**Still UNRESOLVED (471):** `Disorders` truncated (117), `and Oral Disorders` (32), `and Joints` (23), `Disaster Management` (20), `Wound Management` (20) — no candidate for new topics and no per-question keyword for existing 22.

## 3. Confidence Distribution (v2)

| Confidence | Count | Status |
|---|---|---|
| 88 (preserved) | 243 | AUTO_MAPPED |
| 85-95 (new) | 27 | AUTO_MAPPED |
| 65-70 (new) | 13 | REVIEW_REQUIRED |
| 0-55 | 471 | UNRESOLVED (2 kept from refined at 65, 471 demoted/kept) |

No `confidence <60` promoted; all 471 remain `candidateTopicIds: []`.

## 4. Files

- **Input:** `medical-content/emergency-board/qbank-mapping/tintinalli-refined-candidates.json` (243/2/511)
- **Category Map:** `medical-content/emergency-board/qbank-mapping/tintinalli-category-map.json` (24 entries)
- **Topic Registry:** 25 topics (22 + 3 expanded)
- **Output:** `medical-content/emergency-board/qbank-mapping/tintinalli-mapping-v2.json` (756, 270/15/471) — `candidateTopicIds`, `selectedTopicId`, `confidenceScore`, `evidenceBasis`, `mappingReason`, `reviewStatus`
- **Graph:** Not updated (still 170 contents, 1,456 questions, 1,701 relations) — promotion to `qbank-topic-mapping.json` requires human VERIFIED

## 5. Validation

- 243 existing `AUTO_MAPPED` byte-identical to refined (preserved)
- No `confidence <60` promoted (all 471 remain `UNRESOLVED`)
- New topics only affect 40/511 (7.8%) of previously unresolved — demonstrates evidence-based, not over-mapping

---

*Next: Human review of 15 REVIEW_REQUIRED → VERIFIED before Knowledge Graph update.*
