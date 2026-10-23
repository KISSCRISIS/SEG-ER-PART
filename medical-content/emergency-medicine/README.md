# SEG Emergency Medicine — Global Study-Enhancement Layer

Book-independent educational layer (algorithms + exam pearls + tables) from
the SEG Emergency Medicine Master Library (Parts 1–3). It connects with all
Learn sources (Tintinalli, Rosh, Rosen, future books) through read-only
topic mappings. Original books are never edited or duplicated.

- `layer.json` — single authored source (validated by `shared/global-learning-layer.ts`).
- `algorithms/`, `exam-pearls/`, `tables/` — generated projections of the layer.
- `mappings/topic-mappings.json` — resolved `{book, unitId, title}` links.

Regenerate after edits: `pnpm index:global-layer` (then `pnpm index:medical-systems`
so system-browser flags stay in sync). Status: `under-review`.
