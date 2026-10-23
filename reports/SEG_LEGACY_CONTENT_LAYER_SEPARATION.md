# SEG Legacy Content Layer Separation

**Phase:** SEG Phase 7.8.6 — Legacy Knowledge Provenance & Taxonomy Crosswalk  
**Mode:** Read-only analysis  
**Final crosswalk status:** `CROSSWALK_COMPLETE`

## Separation principle

The supplied legacy package is mixed-origin. A single file or object may contain external reference signals, local educational organization, and derived exam intelligence at the same time. Therefore, SEG must separate provenance **by object or section**, not label an entire file as SEG Original or external-owned.

## Layer model

| Layer | Definition | Observed legacy evidence | Allowed SEG relationship | Governance boundary |
|---|---|---|---|---|
| **Layer A — External Reference Knowledge** | Knowledge signals tied to books, frameworks, chapters, source labels, or reference-linked objects | `referenceLibrary.source`, chapter fields, `sourceReferences`, `referenceId`, and `tint`/`rosen`/`hippo`/`frcem` entry families | `book` plus `relationships.reference_framework`; references attached to lessons/question banks when exact locators exist | Reference-only by default; no ownership claim, no verbatim display, rights and version review required |
| **Layer B — SEG Original Educational Layer** | Locally authored, non-verbatim explanation or organization with explicit authorship evidence | Possible Arabic explanations, unified topic organization, board-logic fields, and local bundling | Lesson sections or derived educational layer only when authorship and review are explicitly evidenced | Filename, language, `UNI_*`, or local structure alone is insufficient to mark `seg_original` |
| **Layer C — Derived Exam Intelligence** | Content assembled, indexed, or derived for recall and assessment use | `flashcards`, `examTraps`, `highYieldFacts`, numerical facts, question families, and `DERIVED_*` identifiers | `question_bank` candidates and lesson enrichment | Must retain source joins, missing fields, review state, and rights state; derived does not mean approved |
| **Layer D — Navigation/Index Metadata** | Organization used to find, group, or relate content rather than teach it directly | `topicFamilyIndex`, topic IDs, algorithm index, antidote index, and optional source-file/batch fields | Taxonomy support and relationships only | Not a standalone learner-facing v1.1 content record; taxonomy/version and pathway review required |

## File-to-layer assignment

| Source | Layer A | Layer B | Layer C | Layer D | Separation action |
|---|---|---|---|---|---|
| `officialUnifiedTopics.json` | `sourceReferences`, framework signals | Possible Arabic/local organization | Facts, traps, numerical facts, algorithms, antidotes as derived sections | `topicId` and specialty grouping | Decompose object into section-level origin/state fields |
| `referenceLibrary.json` | Source/chapter/related reference fields | Possible local key points, board logic, Arabic explanations | Related traps, keywords, question families, algorithms | IDs and batch grouping | Split book/reference metadata from local enrichment before any display |
| `flashcards.json` | Card source/reference fields | No proven authorship layer | Question/answer/yield cards | `cardId`, `topicId`, `sourceFile` | Preserve card IDs; validate question-bank fields and explicit joins |
| `examTraps.json` | Reference-linked subset | No proven authorship marker | Trap text and `DERIVED_*`/`UNI_*` families | Topic/reference IDs | Keep trap as enrichment; do not create a new content type |
| `algorithms.json` | Reference/source links where present | No proven authored body | Algorithm name/index association | IDs and topic links | Retain as index; do not interpret as a clinical protocol |
| `arabicMentorExplanations.json` | Reference-linked subset | Possible local-language educational layer | Topic-derived explanation layer | Topic/reference IDs | Require authorship and source-support decision per object |
| `topicFamilyIndex.json` | Framework-prefixed entries | Local taxonomy organization | Derived family groupings | Primary navigation index | Keep outside content records; map only through taxonomy contract |
| `antidotes.json` | No explicit source field observed | No proven authorship | Toxicology enrichment index | IDs and topic links | Use only as reviewed enrichment; no standalone record |

## Layer separation rules for future v1.1 mapping

A future adapter should carry origin at section level using the v1.1 source-section vocabulary: `source_verbatim`, `source_derived`, or `seg_original`. When a section is absent or unresolved, it must remain `absent` or `unresolved`; no value should be invented to satisfy a schema.

External reference knowledge must be represented through source/reference fields and, where appropriate, `book` plus `reference_framework`. A framework relationship is not permission to copy a book, table, image, or question. Learner display should remain `reference_only` unless an independent rights decision authorizes a different scope.

Derived exam intelligence must never be treated as a substitute for clinical review. A flashcard answer, trap, algorithm label, or antidote association remains a candidate until a Medical Owner reviews it and the source/rights lineage is documented.

Navigation metadata must not be promoted into medical content merely because it contains topic names. `topicFamilyIndex`, algorithm indexes, and antidote indexes support relationships and taxonomy; they do not satisfy a lesson, clinical case, or clinical skill contract.

## Non-actions

No layer was imported, normalized in place, assigned ownership, clinically approved, rights-cleared, or exposed to learners. No source or schema was modified.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_LEGACY_KNOWLEDGE_AUDIT_REPORT.md "Completed Legacy Knowledge Audit"
[2]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/officialUnifiedTopics.json "Supplied officialUnifiedTopics source"
[3]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/referenceLibrary.json "Supplied referenceLibrary source"
[4]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/flashcards.json "Supplied flashcards source"
[5]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/examTraps.json "Supplied examTraps source"
[6]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/algorithms.json "Supplied algorithms source"
[7]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/arabicMentorExplanations.json "Supplied Arabic explanations source"
[8]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/topicFamilyIndex.json "Supplied topic family index"
[9]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/antidotes.json "Supplied antidote index"
[10]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 schema"
