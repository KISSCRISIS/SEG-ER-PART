# SEG Legacy-to-v1.1 Mapping Report

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
