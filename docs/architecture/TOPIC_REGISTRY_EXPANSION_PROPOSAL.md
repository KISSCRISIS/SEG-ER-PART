# Topic Registry Expansion Proposal — Phase 4-F.3

**Proposal only. No `topic-registry.json` or mapping modified. Generated 2026-09-14 from live Qbank counts (5,612 Qs) and `tintinalli-category-map.json` (24 categories).**

## Summary

Propose **3 narrow, high-impact topics** to close the highest-yield gaps identified in `TOPIC_REGISTRY_GAP_REPORT.md` (Phase 4-F.2). All remain `under-review` until clinical reviewer sign-off; no existing 22 topics merged or removed.

| Proposed Topic | System | Priority Proposal | Tintinalli | All Sources | Total Affected |
|---|---|---|---|---|---|
| **EM_HEME_ANEMIA_COAG** | Hematologic | High | 39 | FRCEM 56 + Hippo 75 + Oxford 10 | **~180** |
| **EM_DERM_RASH** | Dermatology | Medium | 17 | Hippo Cutaneous 73 + FRCEM Dermatology 21 + Oxford Dermatology 5 | **~116** |
| **EM_ENV_HEAT_COLD** | Environmental / Critical Care | Medium | 20 | Hippo Environmental 74 + FRCEM Environmental 40 + Tintinalli Environmental Injuries 20 | **~154** |

---

## 1. EM_HEME_ANEMIA_COAG — Hematologic Anemia & Coagulation

**Clinical rationale:** Hematologic emergencies (acute anemia, sickle crisis, thrombocytopenia, coagulopathy, transfusion reactions) are board-relevant and absent from the 22. Tintinalli `Hematologic Disorders` (39 Qs) + Hippo `Hematologic Disorders` (75 Qs) + FRCEM `Haematology` (56 Qs) + Oxford `HAEMATOLOGY` (10 Qs) form a coherent clinical domain distinct from `EM_CRIT_SHOCK` or `EM_CARDIO`. Current unmapped 39 Tintinalli Qs in this chapter stay `UNRESOLVED` (67.9%).

**Affected Qbank count:**
- Tintinalli 9e: 39 (chapter `Hematologic Disorders`)
- Hippo EM: 75 (`Hematologic Disorders`)
- FRCEM: 56 (`Haematology`) + 2 (`Haematology` variants)
- Oxford SCE: 10 (`HAEMATOLOGY`)
- **Total: ~182** (3.2% of 5,612)

**Source coverage:** 4/5 Qbanks (all except Rosen, which has no hematology chapter). `source-registry.json` categories: `qbank-*` families `TINTINALLI_9E`, `HIPPO`, `FRCEM`, `OXFORD_SCE` — all `PARTIAL` (Tintinalli/Rosen families are `FULL` but this topic is outside their 22).

**Related existing topics:** None directly overlapping. Closest are `EM_CRIT_SHOCK` (resuscitation) and `EM_CARDIO_ACS` (chest pain) — distinct by system (`Hematologic` vs `critical-care`/`cardiovascular`). No merge; keep separate.

**Migration impact:**
- Add 1 entry to `topics.json` / `topic-registry.json`: `{ topicId: EM_HEME_ANEMIA_COAG, topicName: "Hematologic Anemia & Coagulation", system: "Hematologic", systemId: "hematologic", priority: "High", status: "under-review" }`
- Regenerate: `pnpm index:topic-graph` → `topic-registry.json` (23 topics), `pnpm index:qbank-mapping` → re-score 39+75+56+10 Qs (expected +~80 mapped, 1,456→~1,536, 25.9→27.4%)
- Tests: `shared/topic-graph.test.ts` (expects 22 → update to 23), `shared/knowledge-graph.test.ts` (Qbank total unchanged)
- Graph: `knowledge-graph-index.json` adds ~80 `HAS_QUESTIONS` edges; no `BELONGS_TO` change (no book summary for hematology).

**Risk if not added:** 182 Qs remain `UNRESOLVED`, Weak Area Intelligence cannot surface hematologic weakness.

---

## 2. EM_DERM_RASH — Dermatologic Rash & Cutaneous Emergencies

**Clinical rationale:** Cutaneous emergencies (Stevens-Johnson, erythema multiforme, cellulitis mimics, drug rash) are tested and distinct from `EM_TOX_OPIOID` or `EM_ID_SEPSIS`. No dermatology topic exists in 22. Current `Dermatology` chapters (Tintinalli 17, Hippo Cutaneous 73) stay unmapped.

**Affected Qbank count:**
- Tintinalli 9e: 17 (`Dermatology`)
- Hippo EM: 73 (`Cutaneous Disorders`)
- FRCEM: 21 (`Dermatology`)
- Oxford SCE: 5 (`DERMATOLOGY`)
- **Total: ~116** (2.1%)

**Source coverage:** 4/5 Qbanks.

**Related existing topics:** `EM_DERM_RASH` is skin-specific; no overlap with `EM_TOX_OPIOID` (toxicology) or `EM_GI_*`. Keep separate; do not merge into `EM_ENV`.

**Migration impact:** Same as above — 1 new `EM_DERM_*` entry, re-index, ~60-70 additional mapped (keyword `rash`, `dermat`, `cellulitis`, `urticaria` in stem → `High` 85 with chapter+stem).

---

## 3. EM_ENV_HEAT_COLD — Environmental Heat & Cold Injuries

**Clinical rationale:** Heat stroke, hypothermia, frostbite, drowning-adjacent environmental injuries are core EM and tested separately from toxicology. Tintinalli `Environmental Injuries` (20) + Hippo `Environmental Disorders` (74) + FRCEM `Environmental Emergencies` (40) form a coherent domain outside the 22 (closest is `EM_TOX_OPIOID`, but environmental is distinct).

**Affected Qbank count:**
- Tintinalli 9e: 20 (`Environmental Injuries`)
- Hippo EM: 74 (`Environmental Disorders`)
- FRCEM: 40 (`Environmental Emergencies`)
- **Total: ~134** (2.4%) — plus Oxford `ENVIRONMENTAL` if present

**Source coverage:** 3/5 Qbanks.

**Related existing topics:** `EM_ENV_HEAT_COLD` vs `EM_TOX_OPIOID` (both environmental but toxin vs. heat/cold) and vs `EM_CRIT_SHOCK` (heat stroke can present as shock but distinct etiology) — keep separate; `EM_ENV` is `critical-care` system but environmental etiology.

**Migration impact:** 1 new entry, re-index, ~50-60 additional mapped.

---

## 4. Truncated Source Titles Requiring Re-extraction (blocking 211 Qs)

These 5 `chapterTitle` values are verbatim truncated in `tintinalli-9e-question-bank.jsonl` and **must be re-extracted from the source PDF before any topic proposal** — adding a topic for `Disorders` would encode a data artifact:

| Stored `chapterTitle` | Likely Original | Qs | Action |
|---|---|---|---|
| `Disorders` (chapters 6,8,11) | Unknown (e.g., `Respiratory Disorders`, `Renal Disorders`, `Endocrine Disorders`) | 117 (50+25+42) | **Re-extract** from `Tintinalli 9e` PDF TOC; do not add topic |
| `and Oral Disorders` | `Head, Ear, Eye, Nose, Throat and Oral Disorders` | 32 | Re-extract |
| `and Joints` | `Musculoskeletal and Joints` | 23 | Re-extract |
| `and Procedural Sedation` | `Airway and Procedural Sedation` | 21 | Re-extract |
| `Department` | `Emergency Department Administration` | 18 | Re-extract |

**Total blocked: 211 Qs (27.9% of Tintinalli).** No `EM_*` proposal for these until source fix.

Other unmapped but non-truncated categories (keep unmapped, no topic): `Disaster Management` (20), `Wound Management` (20), `Psychosocial Disorders` (20), `Abuse and Assault` (15), `Special Situations` (15) — too vague or system-agnostic.

---

## 5. Overall Impact if 3 Topics Added

- **Topics:** 22 → 25 (+13.6%)
- **Tintinalli mapped:** 243 → ~320 (+77, 32→42%)
- **Total Qbank mapped:** 1,456 → ~1,650 (+~194, 25.9→29.4%)
- **Unmapped:** 4,156 → ~3,962
- **Graph edges:** `HAS_QUESTIONS` +~194

No existing 22 topics modified, no book/PDF/Qbank content copied, no `UNRESOLVED` promoted without per-question evidence.

---

## 6. Validation & Next Steps

- **This phase:** Proposal only — `pnpm check` must pass, no `topic-registry.json` change.
- **Next (with reviewer sign-off):** Add 3 entries to `medical-content/knowledge-graph/topics.json` (all `under-review`), run `pnpm index:topic-graph` → `pnpm index:qbank-mapping` → `pnpm test` (update `topic-graph.test.ts` 22→25, `qbank-registry` Q count unchanged) → `pnpm build`.
- **Calibration:** New topics start `Low`/`Medium` confidence; promotion to `High` only after per-question stem+explanation review per `QBANK_MAPPING_PIPELINE.md`.

---

*No registry or mapping modified in this phase. All 3 proposals remain `under-review` until clinical reviewer approves.*
