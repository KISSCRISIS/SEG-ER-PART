# Book & Summary Mapping Report (Phase 4-E.3)

Mapping key: `topicId` only (`book-topic-mapping.json`). Sources use registry
`sourceId`s. No new topics; registry, books, PDFs, Qbank, Dashboard, and
engine untouched. System-level chapters and opaque units are recorded as
unmapped by rule — never guessed. **No Qbank mapping performed in this
phase.**

## Per source

| Source | Total units | Mapped | High | Medium | Low | Unmapped | Note |
|---|---|---|---|---|---|---|---|
| tintinalli-summaries | 189 | 25 | 25 | 0 | 0 | 164 | topic-granular chapters only |
| rosh-summaries | 12 | 0 | 0 | 0 | 0 | 12 | refined: whole-system chapters (e.g. “Cardiovascular System”) cannot map to narrow clinical topics; see BOOK_MAPPING_REFINEMENT_REPORT.md |
| rosen-summaries | 626 | 50 | 50 | 0 | 0 | 576 | source-indexed topics only |
| frcem-study-book | 32 | 0 | 0 | 0 | 0 | 32 | system-level chapters; linking one to a single clinical topic would be a false claim |
| hippo-study-book | 18 | 0 | 0 | 0 | 0 | 18 | same as FRCEM |
| seg-unified-guide | 204 | 0 | 0 | 0 | 0 | 204 | system-level mirrors and opaque units (`Chapter N`, coded strings) |
| oxford (all layers) | 0 units | 0 | 0 | 0 | 0 | — | no extracted chapters/summaries; Qbank excluded this phase; PDF reference-only |

## Overall

- Total mappings: 75 (all `curated-enhancement-link`, High).
- Coverage of summary units: 75/827 (9.1%).
- Coverage of all book content units: 75/1081 (6.9%).
- Missing metadata: per-topic board weights (priorities remain editorial
  `under-review`); FRCEM/HIPPO/Unified system chapters need topic-level
  decomposition before they can map; Oxford needs chapter extraction.

## Validation

`shared/topic-graph.test.ts` enforces registered topicIds and sourceIds,
unique contentIds, exact per-source counts, resolvable `BELONGS_TO` and
`CONTAINS` endpoints, and empty `questions`. Regenerate with
`pnpm index:book-mapping`.
