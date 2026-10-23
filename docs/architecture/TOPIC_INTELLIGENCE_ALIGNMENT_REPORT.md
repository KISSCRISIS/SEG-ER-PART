# Topic Intelligence Alignment Report — Phase 4-F.5

**Aligned 3 new topics with global intelligence layer via evidence basis only. No Qbank mapping, no UI/DB changes. All 25 topics `under-review`; no official blueprint claim.**

## 1. Updated Global Topic Metadata

**File:** `medical-content/knowledge-graph/topic-registry.json` (22 → 25) — `blueprintWeight.basis` for the 3 new topics now carries **evidence basis** (Qbank chapter counts), not blueprint.

| Topic ID | System | Priority (evidence-informed) | New `blueprintWeight.basis` | Status |
|---|---|---|---|---|
| **EM_HEME_ANEMIA_COAG** | Hematology (`hematologic`) | **High** — 182 Qs across 4 banks, distinct from `EM_CRIT_SHOCK`; high clinical relevance (anemia, sickle, coagulopathy) | `Evidence: Qbank Hematologic 182 Qs (Tintinalli 39, Hippo 75, FRCEM 56, Oxford 10) — not a blueprint claim` | under-review |
| **EM_DERM_RASH** | Dermatology (`dermatology`) | **Medium** — 116 Qs, moderate board frequency, distinct from `EM_TOX`/`EM_ID` | `Evidence: Qbank Cutaneous/Dermatology 116 Qs (Tintinalli Dermatology 17, Hippo Cutaneous 73, FRCEM Dermatology 21, Oxford Dermatology 5) — not a blueprint claim` | under-review |
| **EM_ENV_HEAT_COLD** | Environmental (`environmental`) | **Medium** — 134 Qs, moderate, distinct from `EM_TOX_OPIOID` (toxin vs. heat/cold etiology) | `Evidence: Qbank Environmental 134 Qs (Tintinalli Environmental Injuries 20, Hippo Environmental 74, FRCEM Environmental 40) — not a blueprint claim` | under-review |

**Existing 22 topics:** unchanged (priorities Very High/High/Medium remain editorial triage; `basis` still `["Rosen"]` or `["Rosen","Tintinalli"]` where linked to global-layer enhancements).

## 2. Topic Intelligence References

- **Learn browsing:** `client/src/data/medical-systems.ts` already includes `hematologic` (`Hematology`, rose, `/learn/system/hematologic`) and `environmental` (`Environmental`, orange, `/learn/system/environmental`) added in Phase 4-F.4; `dermatology` pre-existed. No further UI change in this phase; new topics will appear in `Browse by Medical System` once `medical-systems-index.json` is regenerated (deferred, no Qbank mapping yet).
- **Chapter map:** `client/src/lib/high-yield-chapter-map.ts` — no change; new topics map via their own `systemId`, fallback remains `general-other` for hematology-adjacent content until curated.
- **Knowledge Graph:** `topic-registry.json` is the global metadata source; `knowledge-graph-index.json` (170 contents, 1,456 questions) not updated per “No Qbank mapping” rule — new topics have 0 `HAS_QUESTIONS` edges until Phase 4-F.6.
- **Calibration:** Priorities for the 3 new topics are evidence-informed (Q count + clinical distinctness), not blueprint-weighted; thresholds (`repeatedErrorThreshold:3`, bands 60/80) unchanged per `CALIBRATION_LAYER.md`.

## 3. Evidence Basis (only)

For each new topic, `basis` is a single string prefixed `Evidence: ... — not a blueprint claim` to prevent misinterpretation as board coverage. No `FRCEM`/`Saudi EM Blueprint`/`Arab Board` cited; those remain unverified and not claimed for any of the 25.

## 4. What Was Not Changed (per rules)

- `qbank-topic-mapping.json` (1,456/5,612) — not regenerated, no candidate promoted
- `tintinalli-candidates.json` / `tintinalli-remapped/refined-candidates.json` — not modified
- `book-topic-mapping.json` (75), `topicId-map.json` (75/827) — not regenerated (new topics have 0 mapped summaries, as intended)
- UI/DB — no migration, no API change, no new route

## 5. Validation

- `pnpm check` (`tsc --noEmit`) — **PASS**
- `pnpm test` — **48 passed, 1 skipped / 132 passed** (existing suites)
- `pnpm build` — **PASS** (1831 modules)

---

*Next: Human review of 2 remaining Tintinalli `REVIEW_REQUIRED` + per-question curation for the 3 new topics before `pnpm index:qbank-mapping`.*
