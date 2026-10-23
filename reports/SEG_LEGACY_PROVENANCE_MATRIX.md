# SEG Legacy Provenance Matrix

**Phase:** SEG Phase 7.8.6 — Legacy Knowledge Provenance & Taxonomy Crosswalk  
**Mode:** Read-only analysis  
**Final crosswalk status:** `CROSSWALK_COMPLETE`

## Scope and authority

This matrix is derived from the completed Legacy Knowledge Audit and the eight supplied JSON assets. It records observed provenance signals and required governance actions only. It does not assign clinical approval, rights clearance, ownership, activation, or import authorization.

> A provenance signal is not a governance decision. External labels, internal identifier prefixes, or file names do not prove authorship, license, clinical correctness, or SEG ownership.

## Evidence basis

| Evidence | Location | SHA-256 / status |
|---|---|---|
| Completed Legacy Audit | `/home/ubuntu/seg-internship-output/SEG_LEGACY_KNOWLEDGE_AUDIT_REPORT.md` | Audit status `AUDIT_COMPLETE` |
| Supplied legacy package | `/home/ubuntu/upload/SEG_Legacy_Knowledge_Integration_Audit_PACKAGE.zip` | `cd42010f9c349f1e3783857d19e7ec4db64a98c8fde25eb22b7b2e672df3c6ed` |
| Isolated source workspace | `/home/ubuntu/seg-legacy-knowledge-audit-input/` | Eight JSON files, read-only |
| v1.1 target profile | `/home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json` | `720e748a259536df6ae1b2319717e2d55f6540cf9931d5df05d8a5395a133cf9` |

## Matrix

| Legacy object type | Source origin signal | External reference signal | Possible SEG educational layer | Derived content status | Required reviewer | Rights requirement |
|---|---|---|---|---|---|---|
| `officialUnifiedTopics.json` (40) | Unified topic objects with local fields and `sourceReferences`; origin is mixed at object/section level | Framework/source references are present in every object; external signal is section-specific, not object-wide | Possible local lesson organization and Arabic explanation layer; authorship is not proven by file structure | Derived topic bundle linking facts, traps, numerical facts, algorithms, and antidotes | Medical Owner for each educational section; taxonomy/track reviewer for placement | Required for any external-derived text, images, translations, or displayed references; no verbatim display by default |
| `referenceLibrary.json` (194) | Explicit `source`, chapter, and topic fields with co-located local enrichment | Strongest external-reference signal: source/chapter/locator-like fields and framework-linked IDs | Local key-point, board-logic, question-family, trap, and Arabic fields may be enrichment, but provenance must be split | Derived/reference-backed library; not a single SEG-owned layer | Medical Owner plus independent rights reviewer; reference metadata owner for edition/locator | Required for text, images, tables, source-derived questions, translations/adaptations, and display scope |
| `flashcards.json` (760) | Card IDs, question/answer, source, and optional topic/reference joins; no authorship field | `source` and `referenceId` are present only for subsets; external origin is unresolved per card | Possible SEG assessment presentation layer only after authorship/origin review | Derived exam/active-recall content; three answers are empty | Medical Owner/question-bank reviewer; provenance reviewer for each source join | Required when wording, answer/explanation, or reference display is source-derived |
| `examTraps.json` (415) | `UNI_*` and `DERIVED_*` families plus mixed topic/reference joins | `referenceId`/source in 194 records; framework-linked signals are record-specific | Possible lesson or assessment enrichment; no explicit SEG Original marker | Derived exam intelligence | Medical Owner and assessment reviewer | Required for external-derived trap wording, references, or displayed source material |
| `algorithms.json` (28) | Identifier/name/topic index with sparse topic/reference links | Reference/source linkage in 10 records; no complete source section body | Possible lesson or future clinical-case support only; not a protocol | Derived index metadata; insufficient as a complete v1.1 record | Medical Owner; separate safety reviewer if expanded into educational steps | Required if external algorithm text, figures, or exact steps are displayed |
| `arabicMentorExplanations.json` (367) | Explanation text with topic links; 171 records have reference/source linkage and 196 have topic IDs | Reference-linked subset is explicit; remaining authorship is unresolved | Possible SEG Original Educational Layer only where authorized authorship and non-verbatim evidence exist | Derived/local-language educational layer until authorship is proven | Medical Owner and language/content-origin reviewer | Required for translation/adaptation or source-derived explanations; display scope must be explicit |
| `topicFamilyIndex.json` (99 families) | Local family/index organization with `UNI_*`, `DERIVED_*`, and framework prefixes | Framework-family names and entry prefixes provide reference signals but do not establish ownership | Navigation/taxonomy layer; not learner-facing medical content by itself | Derived index/navigation metadata | Taxonomy owner and Medical Owner for pathway relevance | Assess if external taxonomy labels/structure are reproduced; not a substitute for rights evidence |
| `antidotes.json` (16) | Compact topic-linked index with name and topic ID; no authorship marker | No explicit source field in the objects; origin remains unresolved | Toxicology lesson/question-bank enrichment only | Derived clinical enrichment index | Medical Owner/toxicology reviewer | Required if source-derived wording, tables, or display content is introduced |

## Controlled origin vocabulary

Each future record or section must carry an origin state at the smallest useful granularity: `source_verbatim`, `source_derived`, or `seg_original`, matching the v1.1 source-section vocabulary. A whole-file label is insufficient for mixed files. A `seg_original` label requires explicit authorship evidence and a non-verbatim determination; it cannot be inferred from a local filename, language, or internal ID.

External frameworks remain reference frameworks only. A future `book` record plus `relationships.reference_framework` may identify a framework, but it must preserve the exact locator policy, display scope, version, rights state, and source identity. No ownership claim is made in this matrix.

## Required next evidence

Before any adapter dry run, SEG needs an explicit source crosswalk, record-level or derivation-level version/checksum policy, exact locators, taxonomy version, pathway decision, Medical Owner review evidence, and an independent rights review. Missing evidence must remain pending rather than be filled by inference.

## Non-actions

No source was modified, rewritten, deleted, merged, or imported. No production JSON, database change, schema change, activation, publication, or clinical approval was created by this matrix.

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
