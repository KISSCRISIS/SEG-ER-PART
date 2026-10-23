# Jordan EM Topic Registry

## Purpose

The Jordan EM Topic Registry is the canonical topic metadata layer for SEG Emergency Medicine knowledge mapping. It anchors future MCQ, algorithm, exam pearl, table, book mapping, and study plan metadata through a single stable key: `topicId`.

This registry is metadata only. It is not a book, not user-facing learning content, and not a replacement for source texts or Qbank records.

## topicId Rules

- `topicId` is the single primary key.
- Existing `topicId` values must not be renamed.
- New topics must include a unique `topicId`, evidence basis, and review status.
- Duplicate `topicId` values are invalid.

## Evidence-Informed Status

The registry is evidence-informed and marked as a canonical SEG metadata layer. It is not declared as an official board blueprint unless the source explicitly says so.

## Future Linking

Future content should reference topics by `topicId` only. Phase 4-D.1 prepares contracts for MCQ metadata, algorithms, exam pearls, tables, book mapping, and study plan tasks. It does not perform Phase 4-E knowledge graph mapping.

## Duplicate Prevention

Before adding or updating a topic, validate that the proposed `topicId` does not already exist in `medical-content/emergency-board/topic-registry/topic-registry.json`. If a clinical concept already exists, link to the existing `topicId` rather than creating a duplicate.
