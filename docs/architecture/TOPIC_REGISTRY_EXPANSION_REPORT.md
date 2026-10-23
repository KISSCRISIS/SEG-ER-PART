# Topic Registry Expansion Report — Phase 4-F.4

**Added 3 canonical topics. No Qbank mappings promoted. No UI/DB modified. All 25 topics `under-review`.**

## 1. Added Topics

| Topic ID | Topic Name | System (id) | Priority | Basis (linked sources) | Status |
|---|---|---|---|---|---|
| **EM_HEME_ANEMIA_COAG** | Hematologic Anemia & Coagulation | Hematologic (`hematologic`) | High | `[]` (no global-layer enhancement yet) | under-review |
| **EM_DERM_RASH** | Dermatologic Rash & Cutaneous Emergencies | Dermatology (`dermatology`) | Medium | `[]` | under-review |
| **EM_ENV_HEAT_COLD** | Environmental Heat & Cold Injuries | Environmental (`environmental`) | Medium | `[]` | under-review |

**Registry:** `medical-content/knowledge-graph/topic-registry.json` (22 → 25) + `medical-content/knowledge-graph/topics.json` (22 → 25). Mirrored to `medical-content/emergency-board/topic-registry/topic-registry.json` and `medical-content/emergency-board/knowledge-graph/topic-registry.json`.

**Rationale per `TOPIC_REGISTRY_EXPANSION_PROPOSAL.md`:**
- *HEME:* 182 Qs (Tintinalli Hematologic 39 + Hippo Hematologic 75 + FRCEM Haematology 56 + Oxford 10) — distinct from `EM_CRIT_SHOCK`
- *DERM:* 116 Qs (Tintinalli Dermatology 17 + Hippo Cutaneous 73 + FRCEM Dermatology 21 + Oxford 5)
- *ENV:* 134 Qs (Tintinalli Environmental Injuries 20 + Hippo Environmental 74 + FRCEM Environmental 40)

All remain `under-review`; `blueprintWeight.basis: []` until linked to a global-layer enhancement or curated source chapter with reviewer sign-off.

## 2. Affected Systems

| System ID | Title | Previous Topics | After | Change |
|---|---|---|---|---|
| `hematologic` | **Hematology** (new) | 0 | 1 (`EM_HEME_ANEMIA_COAG`) | +1 system, +1 topic |
| `dermatology` | Dermatology | 0 | 1 (`EM_DERM_RASH`) | +1 topic (system already existed for Learn browsing) |
| `environmental` | **Environmental** (new) | 0 | 1 (`EM_ENV_HEAT_COLD`) | +1 system, +1 topic |
| `critical-care` | Resuscitation & Critical Care | 3 | 3 | — |
| `cardiovascular` | Cardiovascular | 2 | 2 | — |
| Other 10 systems | — | 17 | 17 | — |
| **Total** | **15 → 17 systems** | **22** | **25** | **+3 topics, +2 systems** |

**Learn browsing:** `client/src/data/medical-systems.ts` now includes `hematologic` and `environmental` (new cards: `Hematology` / `Environmental`, routes `/learn/system/hematologic` and `/learn/system/environmental`, icons `general`, accent rose/orange). Existing 15 systems untouched; `SECTION_TO_SYSTEM` unchanged (new topics map via their own `systemId`).

## 3. Migration Impact

**What changed:**
- `topics.json` + `topic-registry.json` (22→25) — additive, no existing entry modified
- `topicId-map.json` — regenerated, still 75/827 mapped (new topics have 0 mapped summaries, as intended — no book content copied)
- `book-topic-mapping.json` — regenerated, still 75 mappings (new topics have 0 references)
- `medical-systems.ts` — added 2 systems (additive, no existing system modified)

**What did NOT change (per rules):**
- `qbank-topic-mapping.json` (1,456/5,612) — not regenerated, no candidate promoted
- `qbank-registry.json` / `source-registry.json` — not modified
- `knowledge-graph-index.json` — contents 170, questions 1,456, relations 1,701 unchanged (topics array remains `[]` by design; graph edges only for existing mapped content)
- UI/DB — no migration, no API change, no route removal

**Next steps (not in this phase):**
- Curate per-question mappings for the 3 new topics (target +~180 Qs) via `tintinalli-category-map.json` extension + human review, then `pnpm index:qbank-mapping`
- Link global-layer enhancements for the 3 topics (or create minimal `layer.json` entries) to populate `blueprintWeight.basis`
- Clinical reviewer sign-off to move `under-review` → `approved` per `MEDICAL_CONTENT_GOVERNANCE.md`

## 4. Validation

- `pnpm index:topic-graph` — **PASS** with 3 warnings (`enhancementId "heme-anemia-coag" not in global layer — treating as proposal`)
- `pnpm check` (`tsc --noEmit`) — **PASS** (after adding 2 systems)
- `pnpm test` — **48 passed, 1 skipped (49 total) / 132 passed** (existing suites)
- `pnpm build` — **PASS** (1831 modules)

---

*No Qbank mappings promoted, no candidates modified, no UI/DB changes. Expansion is additive and `under-review` only.*
