# Global study-enhancement layer

A book-independent Learn layer carrying algorithms, exam pearls, and tables
from the SEG Emergency Medicine Master Library (Parts 1–3).

- Authored once in `medical-content/emergency-medicine/layer.json` against
  the executable contract in `shared/global-learning-layer.ts`.
- `pnpm index:global-layer` validates the layer, resolves topic aliases to
  real `{book, unitId}` links, and emits the `algorithms/`, `exam-pearls/`,
  `tables/`, and `mappings/` views plus the runtime
  `client/public/content/global-enhancements-index.json`.
- `client/src/components/learn/TopicEnhancements.tsx` renders the layer
  inside Rosh, Tintinalli, and Rosen readers as additional cards; the full
  source explanation is untouched. Topics without a mapping render nothing.
- `pnpm index:medical-systems` consumes the resolved mappings so system
  cards, counts, and the Algorithms/Pearls/Tables filters reflect the layer.

Sources stay separated: book content lives in the summary sources, layer
content lives in `medical-content/`, and only the generated mappings join
them at runtime. Status remains `under-review`.
