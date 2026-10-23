from pathlib import Path

OUT = Path('/home/ubuntu/seg-internship-output')
OUT.mkdir(parents=True, exist_ok=True)

report1 = r'''# SEG Legacy Knowledge Audit Report

**Phase:** Legacy Content Discovery & Mapping  
**Mode:** Read-only audit — no implementation  
**Final audit status:** `AUDIT_COMPLETE`

## 1. Scope and decision boundary

This report records a deterministic structural and governance audit of the eight JSON files supplied in `SEG_Legacy_Knowledge_Integration_Audit_PACKAGE.zip`. The audit inspected parseability, root structure, record counts, field presence, repeated-value patterns, identifier families, and explicit framework labels. It did **not** rewrite, clinically assess, normalize, approve, import, activate, publish, or replace any source content.

`AUDIT_COMPLETE` means that the supplied package was readable and sufficiently evidenced for a discovery-and-mapping audit. It does **not** mean that any legacy record is schema-valid, clinically approved, rights-cleared, taxonomy-approved, production-ready, or authorized for learner exposure.

> The authoritative lifecycle remains: **Source → Version → Governance Record → Clinical Review → Approval → Activation**. The present audit stops before governance approval and implementation.

## 2. Evidence basis

| Evidence item | Path | SHA-256 / status |
|---|---|---|
| Supplied legacy package | `/home/ubuntu/upload/SEG_Legacy_Knowledge_Integration_Audit_PACKAGE.zip` | `cd42010f9c349f1e3783857d19e7ec4db64a98c8fde25eb22b7b2e672df3c6ed` |
| Isolated extracted workspace | `/home/ubuntu/seg-legacy-knowledge-audit-input/` | Eight JSON files extracted read-only |
| Target profile | `/home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json` | `720e748a259536df6ae1b2319717e2d55f6540cf9931d5df05d8a5395a133cf9` |
| Structural analysis log | `/home/ubuntu/seg-manus-status/SEG_LEGACY_KNOWLEDGE_AUDIT_STRUCTURE.txt` | Deterministic metadata-only analysis |

The v1.1 profile permits the content types `lesson`, `question_bank`, `book`, `clinical_case`, and `clinical_skill`. It also defines explicit source, version, reference, rights, taxonomy, medical-review, audit, and optional reference-framework relationship structures.[9]

## 3. Legacy source inventory

| Legacy source | Size | Items | Current structure | Observed content role | Data-quality observations |
|---|---:|---:|---|---|---|
| `officialUnifiedTopics.json` | 43,523 bytes | 40 | Array of topic objects with `topicId`, `topicName`, `specialty`, `highYieldFacts`, `examTraps`, `numericalFacts`, `antidotes`, `algorithms`, `arabicMentorExplanation`, and `sourceReferences` | Unified educational topic bundle; primary future `lesson` candidate with linked enrichment | Unique `topicId` values observed. `algorithms` is present in 39/40; `numericalFacts` is empty in 14/40; `antidotes` is empty in 29/40; source references are present in all 40. |
| `referenceLibrary.json` | 299,309 bytes | 194 | Array keyed by `id`, `source`, `chapterNumber`, `chapterTitle`, `topic`, and multiple arrays/derived fields including `keyPoints`, `tables`, `visuals`, `algorithms`, traps, keywords, questions, board logic, and Arabic explanation | External-reference-oriented topic library with local enrichment co-located | `id`, source, chapter, topic, and major enrichment keys are present in all 194. `_batchFile` appears in 102/194. Empty values are frequent in tables (183), visuals (169), algorithms (184), board logic (23), and Arabic explanations (23). Source values repeat across chapters/topics; this is not by itself a duplicate-record finding. |
| `flashcards.json` | 333,868 bytes | 760 | Array of cards with `cardId`, `type`, `question`, `answer`, `source`, `yield`, optional `topicId`, `sourceFile`, and `referenceId` | Question-bank / flashcard candidate enrichment | `cardId`, question, answer, source, type, and yield occur in all 760. Three answers are empty. `topicId` occurs in 632/760, `sourceFile` in 128/760, and `referenceId` in 123/760. Repeated source and topic values are common and require explicit join rules. |
| `examTraps.json` | 104,277 bytes | 415 | Array with `id`, `text`, `topic`, and mixed `referenceId`/`source` or `topicId` linkage | Lesson and question-bank enrichment; not a standalone v1.1 record | Base identity/text/topic fields are present in all 415. `topicId` occurs in 221/415; `referenceId` and source occur in 194/415. The file contains both framework-linked and `UNI_*`/`DERIVED_*` families. |
| `algorithms.json` | 4,809 bytes | 28 | Small index of `id`, `name`, `topic`, and either topic or reference linkage | Algorithm index supporting lessons or future clinical-case enrichment | No executable algorithm body is present in the observed structure. `topicId` occurs in 18/28; reference/source linkage occurs in 10/28. It is not record-complete for `clinical_case` or `clinical_skill`. |
| `arabicMentorExplanations.json` | 180,854 bytes | 367 | Array of explanation objects with `topic`, `explanation`, and either `topicId` or `referenceId`/source linkage | Local educational explanation layer; potentially derived or SEG-authored, but authorship is not proven by filename | Explanation and topic are present in all 367. `topicId` occurs in 196/367 and reference/source linkage in 171/367, demonstrating mixed topic-derived and reference-linked origins. |
| `topicFamilyIndex.json` | 20,307 bytes | 99 | Array of taxonomy-like families with `family`, `entries`, and `count` | Taxonomy and navigation support; not a content record | All three fields are present in all 99. Entries span `UNI_*`, `DERIVED_*`, and framework-prefixed families. It lacks v1.1 source/version/rights/review/audit envelope fields. |
| `antidotes.json` | 2,344 bytes | 16 | Compact index with `id`, `name`, `topicId`, and `topic` | Toxicology enrichment for lessons/question-bank candidates | All four observed fields are present in all 16. It is an index, not a standalone v1.1 content record, and requires medical review before any learner-facing use. |

## 4. Cross-package provenance and quality findings

No explicit `SRC-xxxx` source identifiers, v1.1 record envelopes, SHA-256 version objects, rights objects, taxonomy version objects, medical-review decisions, or append-only audit events were found in the eight supplied JSON files. Framework labels and internal identifier families are evidence of references or internal organization, not proof of ownership, rights, authorship, or SEG candidate linkage.

The package contains mixed provenance signals. `officialUnifiedTopics.json` combines topic facts, traps, algorithms, antidotes, Arabic explanations, and framework references in one object. `referenceLibrary.json` similarly co-locates external source labels with local educational fields. `flashcards.json`, `examTraps.json`, and `arabicMentorExplanations.json` contain both topic-derived identifiers and reference-linked identifiers. This makes a future adapter and explicit cross-reference contract necessary; it does not support direct import.

The observed identifier families include 317 `UNI_*` mentions, 1,024 `DERIVED_*` mentions, 349 `tint_*` mentions, 418 `rosen_*` mentions, 205 `hippo_*` mentions, and 102 `frcem_*` mentions across the package. These counts are lexical observations only and must not be interpreted as unique approved entities.

## 5. Medical-governance classification

| Source | Existing Medical Source signal | SEG Original Educational Layer signal | Derived Educational Content signal | Required governance state |
|---|---|---|---|---|
| `officialUnifiedTopics.json` | `sourceReferences` and framework labels | Arabic explanation and unified local bundling are possible local layers, but authorship is not proven | Topic bundle links facts, traps, algorithms, and antidotes | `Requires Medical Owner Review`; preserve each origin separately |
| `referenceLibrary.json` | Explicit external source/chapter fields | Arabic explanation and board-logic fields may be local enrichment | Traps, keywords, question families, and linked arrays are derived/indexed layers | `Requires Medical Owner Review` plus independent rights review |
| `flashcards.json` | Source/reference labels in cards | No authorship field; cannot classify as SEG Original from structure alone | Question/answer cards are derived educational artifacts | `Requires Medical Owner Review` and source/rights traceability |
| `examTraps.json` | Framework-linked `referenceId`/source entries | No explicit authorship marker | `UNI_*` and `DERIVED_*` entries indicate derived/indexed content | `Requires Medical Owner Review` |
| `algorithms.json` | Reference-linked algorithm labels | No authorship marker | Topic-linked and derived index associations | `Requires Medical Owner Review`; no clinical protocol claim |
| `arabicMentorExplanations.json` | Some entries are reference-linked | Potential SEG educational layer, but file structure does not prove authorship | Topic-derived explanations are present | `Requires Medical Owner Review`; do not label SEG Original without evidence |
| `topicFamilyIndex.json` | Framework-family labels may refer to sources | Taxonomy organization is local structure | Internal taxonomy/index layer | `Requires taxonomy review`; not medical approval |
| `antidotes.json` | No explicit external source field in the records | No authorship marker | Topic-linked toxicology enrichment | `Requires Medical Owner Review`; not independently displayable content |

No item is clinically approved by this audit. No rights decision is inferred. External frameworks remain reference frameworks only; no ownership claim or verbatim reproduction is authorized.

## 6. Reference audit

The package explicitly contains or lexically references the following frameworks: **Tintinalli, Rosen/Rosen's, HIPPO, and FRCEM**. The supplied package did not produce positive lexical evidence for Oxford, Kaplan, or Rosh Review in the deterministic scan. This is a statement about the supplied files only; it is not a claim that those frameworks are absent from the wider SEG repository.

The external labels should map to a future `book` record plus `relationships.reference_framework` only after source identity, version, exact locator, rights status, and display scope are separately evidenced. No new citation was created in this audit.

## 7. Closed gates, blockers, and next allowed phase

| Gate | Result | Finding |
|---|---|---|
| Package availability | PASS | All eight requested files were present and parseable. |
| Structural inventory | PASS | Root types, counts, field presence, and quality indicators were recorded. |
| v1.1 target vocabulary | PASS | Mapping targets are limited to the approved five content types. |
| Provenance completeness | BLOCKED | No explicit SEG `SRC-xxxx`, version/checksum, or source-location contract in the legacy files. |
| Rights evidence | BLOCKED | No independent text/image/display rights evidence supplied. |
| Clinical review | BLOCKED | No qualified reviewer decision record supplied for these eight sources. |
| Taxonomy/track contract | BLOCKED | Family/index structures exist, but no v1.1 taxonomy version and explicit professional-track contract is supplied in the legacy files. |
| Direct integration/import readiness | BLOCKED | No adapter authorization, production record generation, database import, activation, or publication is allowed. |

The next allowed phase is a separately authorized **legacy provenance and taxonomy mapping dry run**, followed by independent clinical and rights review. A later adapter dry run may be considered only after explicit source joins, metadata completion, and governance evidence exist.

## 8. Non-actions

`content_modified=false`; `clinical_correctness_certified=false`; `approval_granted=false`; `database_import_executed=false`; `activation_performed=false`; `publication_performed=false`; `schema_modified=false`; `application_modified=false`.

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
'''

report2 = r'''# SEG Legacy-to-v1.1 Mapping Report

**Phase:** Legacy Content Discovery & Mapping  
**Mode:** Read-only mapping analysis; no adapter or import  
**Final audit status:** `AUDIT_COMPLETE`

## 1. Mapping boundary

This report proposes a source-to-target mapping for the eight supplied legacy JSON assets against the isolated `SEG_CONTENT_RECORD_V1_1` profile. It is a **design and audit mapping**, not a conversion plan authorized for execution. Original JSON assets remain immutable and are not replaced by the proposed target types.

The v1.1 profile supports `lesson`, `question_bank`, `book`, `clinical_case`, and `clinical_skill`. For `clinical_case` and `clinical_skill`, the profile requires a complete `content` object with explicit source-section states; for `book`, reference-framework relationships may be represented through `relationships.reference_framework`. The profile does not permit using a legacy index or enrichment object as a complete record without the required envelope and governance evidence.[9]

## 2. Source-to-target mapping matrix

| Legacy source | Primary target SEG content type | Secondary/support role | Mapping confidence | Required boundary |
|---|---|---|---|---|
| `officialUnifiedTopics.json` | `lesson` | Enrichment links to question-bank candidates, traps, algorithms, antidotes, and taxonomy | Conditional structural fit | Split the unified bundle into traceable sections; preserve `sourceReferences`; do not treat all local explanations as SEG Original without authorship evidence. |
| `referenceLibrary.json` | `book` plus `relationships.reference_framework` | Lesson enrichment and reference-backed topic support | Conditional structural fit | Keep external framework identity separate from local educational fields; require exact locators, version, rights, and display scope. |
| `flashcards.json` | `question_bank` | Candidate enrichment from topic/reference joins | Conditional structural fit | Validate question, answer, source/reference, and review fields; three answers are empty and many cards lack topic/reference joins. |
| `examTraps.json` | `question_bank` enrichment or `lesson` enhancement | Trap index for assessment design | Conditional, not standalone | Preserve whether each entry is framework-linked or `UNI_*`/`DERIVED_*`; do not create a standalone v1.1 type for “trap.” |
| `algorithms.json` | `lesson` support; possible `clinical_case` support | Topic/reference index for future educational algorithm sections | Low-to-conditional | The file contains labels and links, not full algorithm content; it cannot satisfy the complete clinical-case contract. It is not a clinical protocol or authorization record. |
| `arabicMentorExplanations.json` | `lesson` enrichment | Local-language educational layer | Conditional | Separate reference-backed explanations from locally authored/derived explanations; authorship and clinical review remain open. |
| `topicFamilyIndex.json` | No direct content record; taxonomy support | `taxonomy.taxonomy_id`/`taxonomy_version` support after explicit contract | Structural support only | Do not import family objects as lessons or books; taxonomy version and professional-track mapping are missing. |
| `antidotes.json` | `lesson` or `question_bank` enrichment | Toxicology topic link support | Low-to-conditional | It is an index of names and topic links, not a complete content record; all clinical claims require review. |

## 3. Envelope and field mapping

| Legacy observation | v1.1 target | Mapping rule | Current status |
|---|---|---|---|
| `topicId`, `cardId`, `id`, `referenceId` | `record_id` or explicit cross-reference metadata | Do not overwrite the original ID. Create a deterministic internal ID only in a future adapter, with a preserved cross-reference table. | Open; no authorized record generation |
| `topicName`, `topic`, `chapterTitle`, `name` | `title` | Use only after a source-specific title policy and collision check. | Conditional |
| `source`, `sourceReferences`, `referenceId`, chapter fields | `source.source_id`, `source.location`, `references[]`, `relationships.reference_framework[]` | Preserve external labels as observed; do not fabricate publisher, version, locator, or citation. | Blocked pending provenance |
| File bytes and source package hash | `version.checksum` | A file checksum is evidence for the legacy asset, not automatically the version checksum of every derived record. | Open; requires record-level version policy |
| `question`, `answer`, `type`, `yield` | `question_bank` content outside the v1.1 envelope | Preserve as source-derived fields under a future question-bank contract; validate answer completeness and references independently. | Conditional; 3 answer values empty |
| `highYieldFacts`, `examTraps`, `numericalFacts`, `antidotes`, `algorithms` | `lesson` enrichment sections | Map only with explicit section-level origin and state; never infer missing medical sections. | Conditional; multiple empty arrays observed |
| `explanation`, `arabicMentorExplanation` | `lesson` educational layer | Preserve language and origin; require authorship and clinical review evidence. | Blocked for approval; no text rewrite performed |
| `family`, `entries`, `count`, `topicId` | `taxonomy.taxonomy_id` and `taxonomy.taxonomy_version` | Taxonomy support only; exact vocabulary/version must be supplied separately. | Blocked pending taxonomy contract |
| `chapterNumber`, `chapterTitle`, `source` | `book` source/location and reference framework | Maintain book/reference separation; do not display external text by default. | Conditional pending rights/version |
| No matching fields observed | `rights`, `medical_review`, `audit` | These must be supplied through separate governance evidence; they cannot be inferred from the legacy JSON. | Blocked |

## 4. Transformation requirements by source

| Source | Adapter needed? | Schema extension needed? | Additional metadata needed | Medical review | Rights review |
|---|---|---|---|---|---|
| `officialUnifiedTopics.json` | Yes | No new v1.1 type proposed; section-level lesson contract may be needed | Source/version/location, section origin, taxonomy, track, references, audit | Required | Required for external-derived or displayed material |
| `referenceLibrary.json` | Yes | No; use `book` and `reference_framework` | Publisher/owner, edition/version, exact locator, rights, display scope, separation of local enrichment | Required | Required and independent |
| `flashcards.json` | Yes | No new v1.1 type proposed; question-bank contract must be applied | Stable card-to-topic/reference joins, answer completeness, source/version, taxonomy, review/audit | Required | Required where source-derived wording or display is involved |
| `examTraps.json` | Yes | No standalone trap type | Origin per trap, reference/source join, taxonomy, review/audit | Required | Required for external-derived display |
| `algorithms.json` | Yes | No; clinical-case contract only if full case sections exist later | Full educational section states, source locators, scope, no protocol/authorization meaning | Required | Required when external material is displayed or reproduced |
| `arabicMentorExplanations.json` | Yes | No | Authorship/origin, language, source support, reviewer, rights/display scope | Required | Required if derived from external text or translation/adaptation |
| `topicFamilyIndex.json` | Yes, as taxonomy adapter | Possibly a separate taxonomy contract, not a v1.1 content type | Taxonomy ID/version, track authorization, collision and alias policy | Taxonomy/medical-owner review required | Usually not a copyright substitute; rights still assessed if copied labels/structure are displayed |
| `antidotes.json` | Yes | No standalone type | Source/version, topic joins, clinical review, audit, display scope | Required | Required if source-derived content is displayed |

## 5. Origin and reference separation

The package should be represented as at least three distinct provenance layers:

1. **Existing Medical Source / External Reference-Based:** external framework labels, chapters, source-linked points, and any material traceable to Tintinalli, Rosen, HIPPO, or FRCEM. These should remain reference-backed and must not be claimed as SEG-owned.
2. **SEG Original Educational Layer:** only explanations or organization for which an authorized record explicitly evidences SEG authorship and non-verbatim creation. The filename `arabicMentorExplanations.json` alone is not sufficient evidence.
3. **Derived Educational Content:** flashcards, traps, topic bundles, indexes, and local combinations derived from one or more source layers. Derived does not mean clinically approved and does not remove rights or review requirements.

A single legacy object may contain more than one layer. The future adapter must split or annotate these layers rather than assign one ownership label to the entire source file.

## 6. Schema compatibility conclusion

The proposed target vocabulary is compatible with the v1.1 profile at a conceptual level, but the legacy assets are not v1.1 records. They lack the required record envelope fields, including source owner/location/access time, version/checksum per record, references with locators and supports, rights, taxonomy ID/version, medical-review decision, and audit events. The profile's `clinical_case` and `clinical_skill` objects are especially unsuitable for direct mapping because the supplied legacy files do not contain the complete required section structures.

No schema extension is recommended by this audit. The next technical artifact should be an isolated, reversible adapter design with a dry-run cross-reference map—not production JSON or an import migration.

## 7. Required future phases

| Future phase | Purpose | Gate that must remain separate |
|---|---|---|
| Legacy provenance crosswalk | Join legacy IDs to approved SEG source IDs and locations | Provenance and version evidence |
| Taxonomy/track review | Establish taxonomy ID/version and authorized professional-track boundaries | Medical-owner/taxonomy decision |
| Question-bank contract review | Validate question/options/answer/explanation/reference completeness | Clinical review and rights review |
| Educational-layer authorship review | Separate SEG-authored explanations from source-derived material | Authorship and rights evidence |
| Adapter dry run | Create mapping output only, with rollback and no database side effects | Explicit implementation authorization |
| Content QA handoff | Validate a future adapter output against v1.1 and metadata contract | Independent clinical and rights evidence |

## 8. Non-actions

This mapping report created no JSON records, changed no schema, modified no application or database, imported no content, activated no content, published no content, and did not rewrite any medical text.

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
'''

report3 = r'''# SEG Legacy Integration Priority Report

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
'''

files = {
    'SEG_LEGACY_KNOWLEDGE_AUDIT_REPORT.md': report1,
    'SEG_LEGACY_TO_V1_1_MAPPING_REPORT.md': report2,
    'SEG_LEGACY_INTEGRATION_PRIORITY_REPORT.md': report3,
}
for name, text in files.items():
    (OUT / name).write_text(text.strip() + '\n', encoding='utf-8')
    print(OUT / name)
