# Structured Content Mapping Report (Phase 4-E.2)

Source views: `medical-content/emergency-medicine/{algorithms,exam-pearls,tables}/`
(join of the 22 authored enhancements). Mapping key: `topicId` only, via the
curated enhancement→topic table. No new topics; registry, books, PDFs, Qbank,
Dashboard, and engine untouched. No book mapping and no Qbank mapping
performed in this phase.

## Counts

- Total algorithms: 22 — mapped 22
- Total exam pearls: 49 — mapped 49
- Total tables: 24 — mapped 24
- Total mappings: 95

## Confidence distribution

- High: 95 (`curated-enhancement-link`: deterministic content ← enhancement ←
  curated topic trace; e.g. `ALG_STEMI`-style ids resolve to `EM_CARDIO_ACS`)
- Medium: 0
- Low: 0
- Unmapped items: 0

## Graph index

`knowledge-graph-index.json` now carries 95 contents and 95 `BELONGS_TO`
relations (content → topic). `topics`, `sources`, and `questions` remain
empty by rule; questions populate in a later Qbank-mapping phase.

## Validation

`shared/topic-graph.test.ts` enforces: unique contentIds, every `topicId`
registered, every relation a `BELONGS_TO` between known endpoints, and
`questions: []`. Regenerate with `pnpm index:content-mapping`.
