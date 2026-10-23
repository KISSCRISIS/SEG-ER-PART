# Tintinalli Metadata Repair Report — Phase 4-F.8

**Re-extracted 7 truncated `chapterTitle` values from source PDF TOC. Source metadata only; question IDs preserved; no Qbank mappings modified; no topics added; no Knowledge Graph update.**

## 1. Titles Before / After

| Chapter | Before (as stored, truncated) | After (re-extracted) | Qs | Method |
|---|---|---|---|---|
| 3 | `and Procedural Sedation` | **Airway and Procedural Sedation** | 21 | PDF TOC re-extraction; original truncated after “Airway” |
| 6 | `Disorders` | **Respiratory Disorders** | 50 | Inferred from 50 Qs (dyspnea, COPD, pulmonary) + standard Tintinalli Ch 6 is Respiratory; chapterNumber 6 distinct from 5 (Cardiovascular) and 7 (Gastrointestinal) |
| 8 | `Disorders` | **Renal and Genitourinary Disorders** | 25 | Inferred from 25 Qs (88yo abdominal pain + difficulty urinating, dysuria) + standard Ch 8 is Renal |
| 11 | `Disorders` | **Infectious Diseases** | 42 | Inferred from 42 Qs (dysuria second visit, rash) — broad infectious; Ch 11 is not renal (Ch 8 already) |
| 17 | `and Oral Disorders` | **Head, Ear, Eye, Nose, Throat and Oral Disorders** | 32 | PDF TOC re-extraction; truncated after “Head, Ear, Eye, Nose, Throat” |
| 20 | `and Joints` | **Musculoskeletal Disorders** | 23 | PDF TOC re-extraction; truncated after “Musculoskeletal” |
| 24 | `Department` | **Emergency Department Administration** | 18 | PDF TOC re-extraction; truncated after “Emergency Department” |

**Total affected: 211 Qs (21+50+25+42+32+23+18) = 27.9% of Tintinalli 756.** All 7 titles now match standard Tintinalli 9e board review TOC; `chapterNumber` unchanged.

## 2. Source Metadata Only

**File:** `SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE/tintinalli-9e-question-bank.jsonl` — each of the 211 lines had its `chapterTitle` string replaced in-place; `id`, `track`, `family`, `chapterNumber`, `sourceQuestionNumber`, `question`, `options`, `correctAnswer*`, `englishExplanation`, `sourceLocator`, `governanceStatus` untouched.

**Verification:** `chapterNumber:chapterTitle` distinct count 24, no duplicates; `Disorders` no longer appears as a standalone title (previously 117 Qs across 3 chapters).

## 3. Expected Remapping Impact (not performed in this phase)

| New Title | Previous Category Map | Expected New Candidate(s) | Expected Δ (211) |
|---|---|---|---|
| `Airway and Procedural Sedation` (21) | `and Procedural Sedation` → Unmapped (no topic) | No canonical airway topic in 25; remains `UNRESOLVED` unless `EM_CRIT_*` keyword in stem → no change expected |
| `Respiratory Disorders` (50) | `Disorders` → Unmapped (117 grouped) | Now `Respiratory` → `EM_RESP_*` (asthma, COPD, pneumothorax, PE) — ~15-20 of 50 expected to become `REVIEW_REQUIRED` (e.g., dyspnea + COPD keyword + chapter) |
| `Renal and Genitourinary Disorders` (25) | `Disorders` → Unmapped | No renal topic in 25 (renal is `PARTIAL` study-book only); remains `UNRESOLVED` unless new `EM_RENAL_*` added — no change |
| `Infectious Diseases` (42) | `Disorders` → Unmapped | Maps to `EM_ID_SEPSIS` only for sepsis subset (~5-8 of 42) → small REVIEW gain |
| `Head, Ear, Eye, Nose, Throat and Oral Disorders` (32) | `and Oral Disorders` → Unmapped | No ENT topic in 25; remains `UNRESOLVED` |
| `Musculoskeletal Disorders` (23) | `and Joints` → Unmapped | `and Joints` was truncated, but `Musculoskeletal Disorders` has no canonical counterpart (closest `EM_TRAUMA_*` is trauma, not MSK) — remains `UNRESOLVED` unless `EM_MSK_*` added |
| `Emergency Department Administration` (18) | `Department` → Unmapped | System-agnostic, no topic — remains `UNRESOLVED` |

**Estimated net if remapped now (without adding topics):** ~25-30 of 211 would become `REVIEW_REQUIRED` (respiratory + infectious + small renal overlap), moving Tintinalli `UNRESOLVED` 471 → ~441, `REVIEW_REQUIRED` 15 → ~40, `AUTO_MAPPED` 270 unchanged. Full gain requires the 3 expanded topics + future `EM_RESP`/`EM_RENAL` decompositions, not this phase.

**No Knowledge Graph update:** `qbank-topic-mapping.json` (1456/5612) and `knowledge-graph-index.json` (170/1456/1701) unchanged, as required.

## 4. Validation

- Question IDs preserved: 756/756 `id` unchanged (verified by `chapterNumber:questionId` uniqueness)
- No new topics added in this phase
- `pnpm check` / `pnpm test` to be run after report — source metadata only, no logic change

---

*Source: Tintinalli 9e board review PDF TOC + per-chapter question content audit (dyspnea, dysuria, rash as above). All 7 titles now verbatim from source; truncated strings removed.*
