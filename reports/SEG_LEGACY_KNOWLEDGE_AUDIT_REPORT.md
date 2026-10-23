# SEG Legacy Knowledge Audit Report

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
