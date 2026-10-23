# Unified medical learning content

SEG exposes a canonical additive read model for every Learn resource:

`Library → Books → Chapters → Topics → Content fields`

The executable TypeScript contract and compatibility adapters live in
`shared/medical-learning-content.ts`. The portable JSON Schema lives in
`SEG_CONTENT_LIBRARY/unified-medical-learning.schema.json`.

Each topic requires full original summaries, Arabic explanations, high-yield
points, diagnosis, management, algorithms, and exam pearls. References and
provenance are optional compatibility metadata, not schema requirements. Empty
arrays mean that a source has no structured value for that field; they must not
be interpreted as permission to invent medical content.

## Backward compatibility

Existing Rosh, Tintinalli, and Rosen summary JSON is adapted by
`adaptLegacySummaryBook`. Existing FRCEM and HIPPO study-book arrays are
adapted by `adaptLegacyResidentStudyBook`. Adapters are read-only and retain
the complete source record in `legacy`, so no source field is discarded.

New content should target schema version `1`. Existing files do not need to be
rewritten or migrated to remain usable.
