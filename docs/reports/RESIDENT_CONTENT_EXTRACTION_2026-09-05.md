# Resident Emergency Medicine content extraction — 2026-09-05

## Outcome

The local resident-level FRCEM and HIPPO source representations were extracted without rewriting their medical text. Outputs remain unpublished and `under-review`.

| Output | Records |
| --- | ---: |
| FRCEM question bank | 1,529 questions across 32 chapters |
| HIPPO question bank | 1,927 questions across 18 chapters |
| FRCEM study book | 32 chapters |
| HIPPO study book | 18 chapters |
| Total questions | 3,456 |
| Total study chapters | 50 |

## Validation

- Missing question text: 0
- Missing option sets: 0
- Missing correct answers: 0
- Missing Arabic explanations: 0
- Duplicate generated record IDs: 0
- Invalid JSONL records: 0
- Each source checksum is recorded in the generated manifest.

## Boundaries

This is a faithful structural extraction for the `resident-emergency-medicine` track. It does not constitute clinical approval, copyright clearance, publication, or learner activation. Original source files remain unchanged.

## Outputs

Generated files are under `SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE/`. The extraction is reproducible with `node scripts/extract-resident-content.mjs`.
