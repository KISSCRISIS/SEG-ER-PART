# Phase 4F Gap Analysis — Repository Stabilization

**Scope:** Read-only analysis of current coverage, missing mappings, and risks. No mapping or content creation in this phase. Generated 2026-09-14 from live repository state.

## 1. Current Coverage Metrics

| Layer | Total | Mapped | Unmapped | % Mapped |
|---|---|---|---|---|
| **Topics (canonical)** | 22 | 22 | 0 | 100% (all `under-review`) |
| **Summaries (Tintinalli 189 + Rosen 626 + Rosh 12)** | 827 | 75 | 752 | 9.1% |
| **Study Books (FRCEM 32 + Hippo 18 + Unified 204)** | 254 | 0 | 254 | 0% (system-level, requires decomposition) |
| **Structured Content (Algorithms/Pearls/Tables)** | 95 | 95 | 0 | 100% (layer: 22 alg + 49 pearls + 24 tables) |
| **Book Summaries via Graph (BELONGS_TO)** | 170 contents | 170 | — | 170 = 95 layer + 75 books |
| **Qbank Questions** | 5,612 | 1,456 | 4,156 | 25.9% (High 901, Medium 555) |
| **Knowledge Graph Index** | — | 170 contents, 1,456 questions, 1,701 relations | — | `BELONGS_TO:170`, `CONTAINS:75`, `HAS_QUESTIONS:1,456` |
| **Topic Registry Status** | 22 | 0 approved | 22 `under-review` | 100% awaiting clinical review |

**Per-source Qbank mapping (from `qbank-topic-mapping.json`):**
- Tintinalli 9e: 243/756 (32.1% — High 114, Medium 129)
- Rosen 10e: 231/1,044 (22.1% — High 115, Medium 116)
- FRCEM: 478/1,529 (31.3% — High 285, Medium 193)
- Hippo EM: 332/1,927 (17.2% — High 310, Medium 22)
- Oxford SCE: 172/356 (48.3% — High 77, Medium 95)

**Per-system (11 systems, from 22 topics):**
- Gastrointestinal 381 (26.2%), Respiratory 262 (18%), Critical Care 187, Neurology 141, Cardiovascular 122, Endocrinology 108, Trauma 106, Infectious Disease 69, Toxicology 60, OBGYN 14, Pediatrics 6

---

## 2. Missing Mappings

**Unmapped Qbank: 4,156 (74.1%)**
- By source: Hippo 1,595, Rosen 813, FRCEM 1,051, Tintinalli 513, Oxford 184
- By system gap: No canonical topics exist for dermatology, ophthalmology, ENT, psychiatry, hematology, nephrology, allergy, palliative, etc. — these chapters exist in Qbanks (e.g., Hippo Cutaneous 73, Psychobehavioral 68, Ophthalmology in Tintinalli) but have no `EM_*` topic to map to.
- Per-topic low coverage: `EM_PEDS_FEVER` (6 Qs total), `EM_OBGYN_ECTOPIC` (14 Qs), `EM_ENDO_HYPERK` (14 Qs) — single-topic systems.

**Unmatched Summaries: 752 + 254 = 1,006**
- 752 summary units (Rosen 576 + Tintinalli 164 + Rosh 12 system chapters refined to 0) — chapter titles too broad or opaque, or no high-yield topic match.
- 254 study-book/outline units (FRCEM 32 + Hippo 18 + Unified 204) — system-level chapters (e.g., `SURGICAL EMERGENCIES`, `CARDIOLOGY`) cannot map 1:1 to narrow clinical topics without decomposition.

**Under-Review Content (100%):**
- All 22 topics: `status: under-review`, `blueprintWeight.basis` = linked books only (e.g., `EM_CRIT_ARREST` → `["Rosen"]`), no board blueprint claimed.
- All 5,612 Qbank records: `governanceStatus: under-review` (FRCEM 482/1,529 carry `references`, others 0).
- All 95 structured content nodes: `under-review`.
- `topic-registry.json` + `source-registry.json` + `qbank-topic-mapping.json` all marked `under-review`.

**Missing Topic Mappings (graph):**
- No `HAS_CONTENT` for FRCEM/Hippo/Oxford chapters (requires topic-level curation file).
- No `HAS_QUESTIONS` for 4,156 unmapped Qs (stay out of graph by rule).
- `topics:[]` and `sources:[]` in `knowledge-graph-index.json` are empty by design (instance nodes live in registries, graph holds edges only).

---

## 3. Highest Impact Gaps

1. **Qbank coverage 25.9% → 50% (+1,344 Qs)** — Unlocks Weak Area Intelligence and Adaptive Plan for 74% of practice volume currently invisible. Highest ROI: add 3–5 topics for dermatology/psychiatry/ophthalmology (cover ~200 Qs) or broaden `EM_PEDS_FEVER` phrasing to capture pediatric fever variants.
2. **Summary coverage 9.1% → 30% (+173 units)** — Directly feeds Learn readers (`TopicEnhancements`). Next: remap Tintinalli 164 with `highYieldSectionFor` + title aliases, then Rosen 576 with source-chapter heuristics.
3. **Study-book decomposition (0% → 40%)** — FRCEM/Hippo system chapters block Pathway personalization; curate `chapter → topic[]` file (e.g., `CARDIOLOGY` → `EM_CARDIO_ACS`, `EM_CARDIO_TAMPONADE`).
4. **Clinical review sign-off (0/22 topics approved)** — All 22 remain `under-review`; without review, `boardWeight` stays editorial proxy and `CALIBRATION_LAYER.md` thresholds cannot move.
5. **Threshold calibration** — `repeatedErrorThreshold:3`, `accuracyThreshold:70`, `readiness bands 60/80`, `recovery priority 92` are documented starting values; require paired `Readiness Index` vs. mock exam outcomes.

---

## 4. Recommended Closure Order

1. **Lint stabilization (this phase)** — remove unused `q`/`e`/`c` in `scripts/build-qbank-mapping.ts` (done) → `pnpm verify` green.
2. **Qbank topic expansion (sprint 1, 1 reviewer):** Add `EM_DERM_*`, `EM_PSYCH_*`, `EM_OPHTH_*` to `topics.json` (3–5 topics), re-run `pnpm index:qbank-mapping`; target 1,456 → 2,000.
3. **Summary remap (sprint 1, parallel):** Curate 20 Tintinalli aliases (e.g., `SURGICAL EMERGENCIES` → `EM_GI_ABD_PAIN`/`EM_GI_BLEED`), re-run `pnpm index:book-mapping`; target 75 → 120.
4. **Study-book decomposition (sprint 2):** Create `chapter-topic-curation.json` for FRCEM/Hippo, validate with `topic-graph.test.ts`, incremental mapping.
5. **Clinical review queue (ongoing):** Reviewer signs 2 topics/week; `status: approved` + `boardWeight.basis` updated only with verified linked sources.
6. **Calibration data collection (sprint 3+):** Instrument Dashboard to log `Board Readiness Index` vs. mock scores; adjust thresholds only with review note per `CALIBRATION_LAYER.md`.

**Do not start:** new routes, Training page, GrowthCore data invention, or DB migrations — keep additive, review-gated changes.

---

## 5. Risks

- **False precision if guessed:** Mapping 74% unmapped Qs by keyword alone would inflate coverage but violate “never guess” rule; must stay `unmapped` until curated.
- **Board blueprint proxy:** Without official Jordan EM Board blueprint, any `HIGH` priority is editorial; claiming exam coverage would be misleading.
- **Rosh scope creep:** Rosh `FULL` strictly for in-project 12 summaries + PDFs; external Rosh resources assumed would break source audit (5,612 Qs).
- **Threshold drift:** Changing `repeatedErrorThreshold` or bands without paired outcome data breaks `CALIBRATION_LAYER.md` contract.
- **Performance:** `index 502 kB` + `knowledge-graph-index.json 447 kB` — code-split `StudyBookReader`/`QbankPortal` before adding more graph edges.

---

*Evidence: `qbank-topic-mapping.json:5612` (mapped 1456), `book-topic-mapping.json:75/827`, `knowledge-graph-index.json:170/1456/1701`, `topic-registry.json:22` (all under-review), `source-registry.json:17`, `pnpm test 48/132`, `pnpm build 1831 modules`.*
