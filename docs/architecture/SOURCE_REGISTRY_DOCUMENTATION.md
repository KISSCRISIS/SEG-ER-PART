# Source Registry Documentation

## Purpose

The Source Registry is the canonical discovery layer for Emergency Medicine educational resources available inside SEG. It records which source assets exist, how mature they are, and how ready they are for future Knowledge Graph linking.

Phase 4-E.0 is preparation only. No topics, books, summaries, Qbank records, algorithms, exam pearls, or tables are mapped to `topicId` in this phase.

## Available Sources

The registry includes books, content layers, question banks, and metadata registries discovered inside the project:

- Tintinalli Emergency Medicine
- Rosen Emergency Medicine
- Rosh Emergency Medicine Review
- FRCEM High-Yield Review
- Hippo EM High-Yield Review
- Oxford Emergency Medicine
- SEG Original Content
- Algorithms
- Exam Pearls
- Tables
- Summaries
- High-Yield Reviews
- Tintinalli Qbank
- Rosen Qbank
- FRCEM Qbank
- Hippo EM Qbank
- Oxford SCE Qbank
- SEG normalized MCQ datasets
- Jordan EM Board Topic Registry v1.0

## Source Maturity Classification

`FULL` means the source has enough evidence for processed content, summaries or structured learning content, metadata, and Qbank coverage.

`PARTIAL` means the source has a useful subset, such as PDF only, Qbank only, limited processed content, or a specialized content layer.

`METADATA ONLY` means the source is a registry or reference layer and should not be displayed as educational content.

## Mapping Rules

- `sourceId` identifies source registry entries.
- `topicId` remains the future knowledge mapping key.
- Existing source data must not be renamed to force a mapping.
- Unknown mappings must be marked `needs-review` in future phases.
- Duplicate topic mappings must be rejected or manually reviewed.
- Qbank, dashboard UI, and `shared/study-plan-engine.ts` are not modified in Phase 4-E.0.

## Future Knowledge Graph Usage

Future mapping phases may connect:

Source -> Chapter / Unit / Question / Content Item -> topicId -> Knowledge Graph

Required future link types:

- Books
- Summaries
- Algorithms
- Exam Pearls
- Tables
- MCQ

Phase 4-E.0 only prepares contracts for those links. It does not perform the mappings.

