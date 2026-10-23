# Knowledge Graph Architecture

## Purpose

Phase 4-E.1 creates the foundational SEG Emergency Board Knowledge Graph architecture. It defines graph node types, allowed relationship types, and an empty graph index for future mapping work.

This phase is schema creation only. No books, Qbank records, content items, questions, or topics are mapped in Phase 4-E.1.

## Canonical Registries

The graph architecture is prepared from two canonical registries:

- `medical-content/emergency-board/topic-registry/topic-registry.json`
- `medical-content/emergency-board/metadata/source-registry.json`

## Node Types

`TOPIC_NODE` represents a canonical emergency medicine topic:

- `topicId`
- `topicName`
- `system`
- `priority`

`SOURCE_NODE` represents an available SEG source:

- `sourceId`
- `name`
- `category`
- `availability`

`CONTENT_NODE` is reserved for future mapped content:

- `contentId`
- `contentType`
- `sourceId`
- `topicId`
- `status`

`QUESTION_NODE` is reserved for future mapped MCQ items:

- `questionId`
- `sourceId`
- `topicId`
- `difficulty`
- `status`

## Relationship Rules

Allowed future relations:

- `TOPIC_NODE HAS_SOURCE SOURCE_NODE`
- `TOPIC_NODE HAS_CONTENT CONTENT_NODE`
- `TOPIC_NODE HAS_QUESTIONS QUESTION_NODE`
- `CONTENT_NODE BELONGS_TO SOURCE_NODE`

No relations are instantiated during Phase 4-E.1.

## topicId Role

`topicId` is the primary key for Emergency Medicine knowledge mapping. Future mapped content and question nodes must reference a valid `topicId` from the Jordan EM Board Topic Registry.

## sourceId Role

`sourceId` identifies each source in the Source Registry. Future content and question nodes must reference a valid `sourceId` from the Source Registry.

## Future Mapping Workflow

Future phases may populate the graph in this order:

1. Validate canonical topics and sources.
2. Create source nodes from the Source Registry.
3. Create topic nodes from the Topic Registry.
4. Map content items only after source-specific review.
5. Map MCQs only after question metadata review.
6. Validate every relationship against `topicId` and `sourceId`.

Phase 4-E.1 stops before step 2 and keeps the graph index empty.

## Mapping Depth Rule (binding)

- FULL sources (`mappingDepth: full` — summaries, study books, enhancement
  layer, Qbanks): chapter/unit-level mapping is allowed.
- PARTIAL sources (`mappingDepth: partial` — reference PDFs): only already
  available layers may be mapped; missing chapters or summaries are never
  created to fill gaps.
- Enforced by `shared/knowledge-graph.test.ts`: partial sources carry no
  unit counts and contribute zero `topicId-map` keys.

