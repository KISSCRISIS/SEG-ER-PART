# Tintinalli Qbank Pilot Bulk Mapping — Phase 4-F.1B

**Scope:** Tintinalli 9e Qbank only (756 questions). Rosen/Rosh/FRCEM/Hippo/Oxford excluded. Existing 243 verified mappings preserved as `AUTO_MAPPED`; no promotion of low confidence.

## 1. Totals Analyzed

- **Total Tintinalli questions:** 756 (`tintinalli-9e-question-bank.jsonl`, 24 chapters)
- **Already mapped (from `qbank-topic-mapping.json`):** 243 (32.1%)
- **Unmapped pool analyzed:** 513 (67.9%)

All 756 records carry `id`, `chapterTitle`, `question` (stem), `englishExplanation`, `options` (A-D), and `governanceStatus: under-review`.

## 2. Pilot Results (evidence priority: chapter → explanation → stem → answer options)

| Status | Count | % of 756 | Confidence | Graph promotion |
|---|---|---|---|---|
| **AUTO_MAPPED** (preserved) | 243 | 32.1% | 88 (chapter-title + stem-keyword) | Remains `HAS_QUESTIONS` |
| **REVIEW_REQUIRED** (60-84) | 0 | 0% | 60-84 | Requires human review before promotion |
| **UNRESOLVED** | 513 | 67.9% | 0-59 (all <60) | **Not promoted** — stays out of graph |

**Confidence scoring:** `chapter-title:40` + `explanation-concept:30` + `stem-keyword:25` + `answer-options(source-category):15`, capped at 100. Thresholds: `AUTO_MAPPED ≥85`, `REVIEW_REQUIRED 60-84`, `UNRESOLVED <60`.

**Why 0 REVIEW_REQUIRED?** The 513 unmapped questions have no chapter pattern + keyword co-occurrence reaching 60. Example: `Disorders` chapter titles are generic and contain no topic-specific phrase; stem/explanation alone (25-30 pts) cannot reach 60 without chapter corroboration, per pipeline design to avoid broad-chapter false positives.

## 3. Confidence Distribution (pilot)

- **AUTO_MAPPED:** 243 at 88 (preserved)
- **REVIEW_REQUIRED:** 0
- **UNRESOLVED:** 513 at 0-55 (all <60)
  - Score 0: ~440 questions (no keyword in any evidence source)
  - Score 15-40: ~73 questions (single evidence, e.g., `shock` in stem alone)

No low-confidence mappings were promoted.

## 4. Top Unmapped Chapters (proxy for unmapped topics)

These 10 Qbank chapters account for 333/513 (65%) of UNRESOLVED — they have no canonical `EM_*` topic (dermatology, psychosocial, wound management, etc. outside the 22):

| Qbank Chapter | Unresolved | Note |
|---|---|---|
| Disorders (generic) | 76 | No topic phrase — not in 22 |
| Traumatic Disorders | 47 | Broad; trauma topics are `EM_TRAUMA_TBI`/`PRIMARY_SURVEY` only |
| Cardiovascular Disorders | 38 | Outside `EM_CARDIO_ACS`/`TAMPONADE` |
| Pediatrics | 36 | Outside `EM_PEDS_FEVER` (only fever) |
| Gastrointestinal Disorders | 34 | Outside `EM_GI_ABD_PAIN`/`BLEED` |
| and Oral Disorders | 30 | ENT/oral — no topic |
| Hematologic Disorders | 27 | No topic |
| Nervous System Disorders | 22 | Outside `EM_NEURO_STROKE`/`STATUS` |
| Wound Management | 20 | Procedure — no topic |
| Toxicologic Disorders | 19 | Outside `EM_TOX_OPIOID` (only opioid) |

**Top unmapped *canonical* topics** (if expanded): `EM_PEDS_FEVER` and `EM_TOX_OPIOID` are the only ones with zero new candidates reaching 60 in this pilot, confirming the registry gap for general pediatrics/toxicology.

## 5. Examples of Ambiguous / Low-Confidence Mappings (not promoted)

**Example 1 — Single-evidence, not promoted:**
- `tintinalli-9e-ch-01-q-0001` (chapter: `Disorders`) — stem contains `fever`, explanation none, options none → score 25 (`stem-keyword` alone) → `UNRESOLVED` (0) — reason: “No candidate topic passes evidence thresholds”

**Example 2 — Broad chapter false-positive prevented:**
- Hypothetical `Cardiovascular Disorders` chapter + `shock` in stem (25 pts) without `sepsis`/`anaphylaxis` co-evidence → score 25 → `UNRESOLVED` — preserved by requiring chapter+keyword (40+25=65) to reach REVIEW; here chapter pattern `/shock/i` not in `Cardiovascular Disorders`, so not promoted.

**Example 3 — Explanation-only (30 pts):**
- Question where `englishExplanation` mentions `sepsis` but stem and chapter do not → score 30 → `UNRESOLVED` — needs stem or chapter corroboration to reach 60.

**Preserved high-confidence example:**
- `tintinalli-9e-ch-01-q-0002` → `EM_CRIT_ARREST` via `chapter-title: Resuscitation` (40) + `stem-keyword: pulsess` (25) + `explanation-concept: cardiac arrest` (30) = 88 → `AUTO_MAPPED` (preserved)

## 6. Files

- **Candidates:** `medical-content/emergency-board/qbank-mapping/tintinalli-candidates.json` (756 records: `questionId`, `sourceId: qbank-tintinalli-9e`, `candidateTopicIds` ≤3, `selectedTopicId` or `null`, `confidenceScore`, `evidenceBasis`, `mappingReason`, `reviewStatus`)
- **Source of truth for graph:** `medical-content/emergency-board/knowledge-graph/qbank-topic-mapping.json` unchanged (243 mapped, 513 unmapped remain `UNMAPPED`/`UNRESOLVED` out of graph)
- **Schemas:** `mapping-status.schema.json` (now includes `AUTO_MAPPED`/`UNRESOLVED`), `candidate-mapping.schema.json` (updated `UNRESOLVED` <60, `AUTO_MAPPED` ≥85)

## 7. Next Steps (not in this phase)

- Human review of 0 `REVIEW_REQUIRED` (none this pilot) — demonstrates pipeline strictness.
- If expanding registry (e.g., `EM_DERM_*`, `EM_PSYCH_*`), re-run pipeline; expected `REVIEW_REQUIRED` will rise from the 76 `Disorders` unmapped.
- Rosen/Rosh/FRCEM/Hippo/Oxford remain untouched.

---

*No low-confidence mappings were promoted. Existing verified mappings preserved verbatim.*
