# SEG Knowledge Graph — Content Intelligence Foundation (Phase 4-D)

`topicId` (`EM_<SYSTEM>_<TOPIC>`) is the canonical key joining topics,
questions, algorithms, pearls, tables, books, and summaries.

- `topics.json` — hand-curated canonical table (single edit point).
- `topic-registry.json` — generated registry (22 topics, `under-review`).
- `topicId-map.json` — generated `<book>:<unitId>` → `topicId` map plus
  coverage and the unmapped list (745 topics await Phase 4-E curation).
- `book-topic-mapping.json` — generated reference links (no book content
  copied: `{source, chapter, unitId, kind}` only).
- `*-metadata.schema.json` — frozen contracts for MCQ/algorithm/pearl/table
  nodes. Full-bank MCQ population is Phase 4-E work.
- Executable contracts + cross-reference tests: `shared/topic-graph.ts`.

Regenerate: `pnpm index:topic-graph` (requires `pnpm index:global-layer`
output). Board-body blueprint coverage is NOT claimed; `blueprintWeight.basis`
lists resolved linked sources only.
