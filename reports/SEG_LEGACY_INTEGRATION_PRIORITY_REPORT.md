# SEG Legacy Integration Priority Report

**Phase:** Legacy Content Discovery & Mapping  
**Mode:** Read-only prioritization; no implementation  
**Final audit status:** `AUDIT_COMPLETE`

## 1. Prioritization method

Priority is based on usefulness to the SEG Learning Engine, structural proximity to an approved v1.1 target, breadth of reusable educational relationships, and the amount of unresolved provenance, rights, clinical, and taxonomy work. A high priority is a recommendation for controlled review order; it is not approval or import authorization.

## 2. Priority ranking

### Priority 1 — Learning-engine foundations and question-bank enrichment

| Source | Why first | Target role | Required review action |
|---|---|---|---|
| `officialUnifiedTopics.json` | Forty unified topic objects provide the broadest local organization of facts, traps, algorithms, antidotes, Arabic explanations, and source references in one topic-centered structure. | Primary `lesson` candidate map with enrichment relationships | Establish section-level origin states, source/version/location, taxonomy, track, and Medical Owner review. Do not treat the bundle as one undifferentiated ownership class. |
| `flashcards.json` | Seven hundred sixty question/answer objects are closest to the Learning Engine's active-recall use case. | `question_bank` candidate enrichment | Run a question-bank completeness audit; three answers are empty, and many topic/reference joins are absent. Preserve all card IDs and source labels. |
| `topicFamilyIndex.json` | Ninety-nine family objects provide the clearest taxonomy/navigation support across `UNI_*`, `DERIVED_*`, and framework families. | Taxonomy support only | Define taxonomy ID/version, alias/collision rules, and explicit professional-track boundaries before using it to classify content. |

Priority 1 does not authorize learner exposure. It establishes the minimum structure needed to make later content mappings traceable.

### Priority 2 — Reference and assessment enrichment

| Source | Why second | Target role | Required review action |
|---|---|---|---|
| `referenceLibrary.json` | One hundred ninety-four topic/reference objects carry chapter-level source metadata and many reusable relationships, but external source content and local enrichment are co-located. | `book` plus `reference_framework`; lesson/reference enrichment | Separate external framework identity from local educational layers; resolve edition/version/locator and rights/display scope; then perform clinical review. |
| `examTraps.json` | Four hundred fifteen trap entries support assessment and lesson reinforcement and show both framework-linked and derived families. | Question-bank or lesson enrichment | Classify each trap's origin and source linkage; do not create a standalone v1.1 content type. |
| `arabicMentorExplanations.json` | Three hundred sixty-seven explanations provide a local-language educational layer and may increase accessibility. | Lesson enrichment | Establish authorship/origin and source support; perform independent clinical and rights review before any display or derivation. |

### Priority 3 — Specialized enrichment and future-case support

| Source | Why later | Target role | Required review action |
|---|---|---|---|
| `algorithms.json` | Twenty-eight entries are an index of algorithm names and links rather than complete educational algorithms. | Lesson support or future `clinical_case` support | Define a section contract and safety boundary; do not interpret the index as a clinical protocol or procedure authorization. |
| `antidotes.json` | Sixteen toxicology mappings are useful but narrow and contain only index-level fields. | Lesson/question-bank toxicology enrichment | Establish source/version and clinical review evidence; retain as enrichment, not a standalone content record. |

## 3. Recommended integration order

The recommended order is **taxonomy and provenance first, then learning content, then reference separation, then specialized enrichment**. First, establish a read-only crosswalk for topic, card, reference, trap, and family identifiers, preserving every original ID and source checksum. Second, use `topicFamilyIndex.json` and `officialUnifiedTopics.json` to design taxonomy and lesson relationships without creating records. Third, validate `flashcards.json` as question-bank candidates, keeping missing answers and missing joins flagged. Fourth, separate `referenceLibrary.json` into external reference metadata and local educational enrichment, with `book` and `reference_framework` remaining reference-scoped. Fifth, attach traps and Arabic explanations only through explicit, traceable relationships. Algorithms and antidotes should remain specialized enrichment until their own medical review and contract checks are complete.

## 4. What should enter first, what needs conversion, and what remains reference-only

| Decision area | Recommendation | Reason |
|---|---|---|
| Enter first into controlled preparation | Topic taxonomy crosswalk, official topic organization, and flashcard completeness metadata | Highest Learning Engine value and closest fit to lesson/question-bank preparation, while still remaining non-production |
| Requires adapter/conversion | All eight files | None has the complete v1.1 record envelope; all require ID preservation, explicit joins, metadata, and audit fields |
| Reference-only by default | External framework labels, chapter/source material, and source-derived fields in `referenceLibrary.json` | No ownership or display rights are established; map to `book`/`reference_framework` only |
| Requires separate phase | Arabic explanations, exam traps, algorithms, antidotes, and clinical-case/skill claims | Origin, clinical correctness, rights, and safety boundaries are not resolved by structural inspection |
| Never direct-import | Topic-family indexes and mixed unified bundles | Indexes and co-located mixed-origin objects are not v1.1 records and need explicit decomposition |

## 5. Governance gates before any adapter dry run

Before a future adapter dry run, SEG should obtain a source crosswalk with explicit SEG source IDs and locations; record asset-level and record-level checksums; separate external framework references from local educational layers; establish taxonomy ID/version and track authorization; and retain unresolved values rather than filling them by inference.

A qualified Medical Owner must review medical claims, including question answers, explanations, traps, algorithms, antidote associations, and any proposed case or skill interpretation. An independent rights review must separately assess external text, images, translations/adaptations, question wording, references, and display scope. Implementation authorization must be separately documented before any adapter or import action.

## 6. Final recommendation

The legacy package is valuable as a **read-only enrichment and relationship-discovery source**, with the highest immediate utility in `officialUnifiedTopics.json`, `flashcards.json`, and `topicFamilyIndex.json`. It should not be imported as-is. The correct next phase is a controlled provenance/taxonomy crosswalk and candidate-level dry-run mapping, followed by separate clinical and rights review. The audit status is therefore `AUDIT_COMPLETE`, while integration readiness remains blocked pending the stated gates.

## 7. Non-actions

No legacy source was deleted, merged, overwritten, normalized in place, clinically judged, or rewritten. No JSON production record was created; no schema, application, database, authentication, route, or content structure was modified; and no import, activation, publication, or learner exposure occurred.

## References

[1]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/officialUnifiedTopics.json "Supplied officialUnifiedTopics source"
[2]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/referenceLibrary.json "Supplied referenceLibrary source"
[3]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/flashcards.json "Supplied flashcards source"
[4]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/examTraps.json "Supplied examTraps source"
[5]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/algorithms.json "Supplied algorithms source"
[6]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/arabicMentorExplanations.json "Supplied Arabic explanation source"
[7]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/topicFamilyIndex.json "Supplied topic family index"
[8]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/antidotes.json "Supplied antidote index"
[9]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 schema"
[10]: file:///home/ubuntu/seg-manus-status/SEG_LEGACY_KNOWLEDGE_AUDIT_STRUCTURE.txt "Deterministic structural analysis log"
