# Source Maturity Update Report

Final approved classification applied to `source-registry.json` via
`sourceMaturity: FULL | PARTIAL` plus per-entry notes (available layers and
allowed mapping depth). No books, Qbank, Dashboard, or engine files touched.

## FULL (7)

| Source | Records | Note |
|---|---|---|
| tintinalli-summaries | 189 | chapter/section/unit/summary/page mapping |
| rosen-summaries | 626 | chapter/section/unit/summary/page mapping |
| rosh-summaries | 12 | in-project content only; no external Rosh assumed |
| qbank-rosen-10e | 1044 | unit mapping after per-question curation |
| qbank-tintinalli-9e | 756 | unit mapping after per-question curation |
| pdf-rosh-rotation-2019 | reference-only | citation of available pages; nothing ingested |
| pdf-rosen-5min | reference-only | citation of available pages; nothing ingested |

## PARTIAL (10)

| Source | Records | Note |
|---|---|---|
| frcem-study-book | 32 | system-level chapters; no forced single-topic links |
| hippo-study-book | 18 | same as FRCEM |
| seg-unified-guide | 204 | system-level/opaque units stay unmapped |
| global-learning-layer | 22 | SEG Original; enhancement nodes only |
| qbank-frcem | 1529 | question mapping after per-question curation |
| qbank-hippo | 1927 | same as FRCEM bank |
| qbank-oxford-sce | 356 | same; Oxford family PARTIAL |
| pdf-oxford-essentials | reference-only | citation only |
| pdf-frcem-high-yield | reference-only | citation only |
| pdf-hippo-high-yield | reference-only | citation only |

## Validation

`shared/knowledge-graph.test.ts` pins every entry's maturity, requires
non-empty notes, and re-checks the Qbank total (5,612). Schema
`knowledge-graph.schema.json` requires `sourceMaturity` on SOURCE_NODE.
