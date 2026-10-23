# Qbank Topic Coverage Report — Phase 4-E.4-C

Read-only analysis of `qbank-topic-mapping.json` (Phase 4-E.4-B). No mappings were changed in this phase.

## Overall

| Metric | Count | % |
|---|---|---|
| Total questions (5 banks) | 5,612 | 100% |
| Mapped (topicId assigned) | 1,456 | 25.9% |
| Unmapped (`reviewStatus: unmapped`) | 4,156 | 74.1% |
| High confidence | 901 | 16.1% |
| Medium confidence | 555 | 9.9% |
| Low / no-match (unmapped) | 4,156 | 74.1% |

Engine: deterministic keyword specificity order (22 topics); priority chapter → clinical keywords → explanation concepts; generic `shock` checked last to avoid stealing `sepsis`/`anaphylaxis`.

## Per source

| Source | Total | Mapped | % mapped | High | Medium | Unmapped | % unmapped |
|---|---|---|---|---|---|---|---|
| Tintinalli 9e | 756 | 243 | 32.1% | 114 | 129 | 513 | 67.9% |
| Rosen 10e | 1,044 | 231 | 22.1% | 115 | 116 | 813 | 77.9% |
| FRCEM | 1,529 | 478 | 31.3% | 285 | 193 | 1,051 | 68.7% |
| Hippo EM | 1,927 | 332 | 17.2% | 310 | 22 | 1,595 | 82.8% |
| Oxford SCE | 356 | 172 | 48.3% | 77 | 95 | 184 | 51.7% |

*Rosen sparse chapters (185 distinct, 3–6 qs each) and Hippo system-level chapters with generic titles explain lower rates; Oxford 16 chapters are more topic-proximal.*

## Per system (11 systems from 22 canonical topics)

| System | Mapped | Share of mapped |
|---|---|---|
| Gastrointestinal | 381 | 26.2% |
| Respiratory | 262 | 18.0% |
| Critical Care | 187 | 12.8% |
| Neurology | 141 | 9.7% |
| Cardiovascular | 122 | 8.4% |
| Endocrinology | 108 | 7.4% |
| Trauma | 106 | 7.3% |
| Infectious Disease | 69 | 4.7% |
| Toxicology | 60 | 4.1% |
| Obstetrics & Gynecology | 14 | 1.0% |
| Pediatrics | 6 | 0.4% |

*Top topics: `EM_GI_ABD_PAIN:336`, `EM_NEURO_STROKE:110`, `EM_CRIT_ARREST:87`, `EM_RESP_ASTHMA:86`, `EM_TRAUMA_TBI:78`. Pediatrics low because only `EM_PEDS_FEVER` exists canonically and its phrasing is narrow.*

## Per source × system (mapped only)

| Source \ System | Cardio | Trauma | Resp | Neuro | GI | CritCare | ID | Endo | Tox | OBGYN | Peds |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Tintinalli 9e | 22 | 14 | 47 | 22 | 55 | 26 | 21 | 15 | 12 | 7 | 2 |
| Rosen 10e | 17 | 15 | 39 | 26 | 45 | 32 | 11 | 28 | 18 | 0 | 0 |
| FRCEM | 51 | 62 | 93 | 36 | 74 | 85 | 19 | 40 | 12 | 4 | 2 |
| Hippo | 15 | 11 | 55 | 24 | 180 | 16 | 6 | 9 | 11 | 3 | 2 |
| Oxford SCE | 17 | 4 | 28 | 33 | 27 | 28 | 12 | 16 | 7 | 0 | 0 |

*Cells are counts of `HAS_QUESTIONS` edges for that source-system pair; 0 means no deterministic match, not missing content.*

## Gaps

- 74% unmapped is expected: the 22-topic registry covers high-yield emergencies, not the full Qbank universe (e.g., dermatology, ophthalmology, psychiatry chapters outside the registry).
- `EM_PEDS_FEVER` and `EM_OBGYN_ECTOPIC` have single-topic systems → low absolute counts.
- Source registry notes 5,612 Qbank records verified; no question was modified.

## Validation

Generated from `medical-content/emergency-board/knowledge-graph/qbank-topic-mapping.json` and `topic-registry.json` without mutation. Regenerate mapping with `pnpm index:qbank-mapping`; re-run this report from the same files.
