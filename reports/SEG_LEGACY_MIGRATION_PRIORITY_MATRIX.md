# SEG Legacy Migration Priority Matrix

**Phase:** SEG Phase 7.8.6 — Legacy Knowledge Provenance & Taxonomy Crosswalk  
**Mode:** Read-only prioritization  
**Final crosswalk status:** `CROSSWALK_COMPLETE`

## Priority rule

Priority expresses the order for future controlled transformation **after review**. It is not import authorization, clinical approval, rights clearance, or learner-exposure permission. Every tier preserves original files, IDs, lineage, and unresolved evidence.

## Priority 1 — Ready for controlled transformation after review

| Source | Learning Engine value | Target direction | Preconditions before transformation | Current decision |
|---|---|---|---|---|
| `officialUnifiedTopics.json` (40) | Broad topic-centered organization combining high-yield facts, traps, numerical facts, algorithms, antidotes, Arabic explanations, and source references | `lesson` candidate with section-level enrichment | Source crosswalk, section-level origin, taxonomy/version, pathway level, Medical Owner review, rights review for external-derived sections | `PRIORITY_1_REVIEW_READY_NOT_IMPORT_READY` |
| `flashcards.json` (760) | Direct active-recall/question-bank value | `question_bank` candidate enrichment | Resolve three empty answers, topic/reference joins, source/version, question-bank review, rights/display scope | `PRIORITY_1_REVIEW_READY_NOT_IMPORT_READY` |
| `topicFamilyIndex.json` (99 families) | Foundation for navigation, taxonomy, and learning-engine grouping | Taxonomy support only | Define taxonomy ID/version, aliases, duplicate names, cross-domain policy, and track boundaries | `PRIORITY_1_REVIEW_READY_NOT_IMPORT_READY` |

## Priority 2 — Needs metadata completion

| Source | Learning Engine value | Target direction | Missing evidence or transformation need | Current decision |
|---|---|---|---|---|
| `examTraps.json` (415) | Assessment reinforcement and misconception targeting | `question_bank` or `lesson` enrichment | Per-entry origin, framework/source join, topic taxonomy, Medical Owner review, rights for external-derived wording | `PRIORITY_2_METADATA_PENDING` |
| `arabicMentorExplanations.json` (367) | Local-language accessibility and explanation support | `lesson` enrichment | Authorship status, source support, translation/adaptation rights, reviewer, display scope | `PRIORITY_2_METADATA_PENDING` |

## Priority 3 — Reference-only or future specialized work

| Source | Learning Engine value | Target direction | Why deferred | Current decision |
|---|---|---|---|---|
| `referenceLibrary.json` (194) | High reference context and chapter relationships | `book` plus `reference_framework`; limited enrichment | External source identity, edition/version, exact locators, rights/display scope, separation of local fields | `PRIORITY_3_REFERENCE_ONLY_PENDING_EVIDENCE` |
| `algorithms.json` (28) | Specialized algorithm index | Lesson support or future clinical-case support | No complete algorithm body; no protocol/authorization meaning; medical and rights review needed | `PRIORITY_3_FUTURE_SPECIALIZED_REVIEW` |
| `antidotes.json` (16) | Focused toxicology enrichment | Lesson/question-bank enrichment | No explicit source/authorship fields; clinical verification and pathway placement required | `PRIORITY_3_FUTURE_SPECIALIZED_REVIEW` |

## What enters first

The first controlled transformation work should be a read-only provenance and taxonomy crosswalk for `officialUnifiedTopics`, `flashcards`, and `topicFamilyIndex`. This sequence yields the Learning Engine's topic and recall scaffolding while preserving the distinction between content and navigation metadata. It must not generate production records until the missing source, version, rights, taxonomy, Medical Owner, and audit fields are supplied.

`referenceLibrary` should remain reference-only by default. A future `book` and `reference_framework` representation may identify a framework, but it does not grant a display or reproduction right. External text, tables, images, translated/adapted explanations, and source-derived questions require an independent rights review.

## Required separate phases

The following work must remain separately governed: provenance/source-ID crosswalk; taxonomy and professional-track decision; question-bank clinical review; authorship and translation review for Arabic explanations; reference edition/locator/rights review; specialized clinical review for algorithms and antidotes; and a reversible adapter dry run. None of these decisions is made by this priority matrix.

## Final priority gate

The package is sufficiently evidenced for this crosswalk, so the crosswalk status is `CROSSWALK_COMPLETE`. Integration remains blocked until the evidence gates above are completed. No item is `PRODUCTION_READY` and no item is authorized for import or activation.

## Non-actions

No legacy source was deleted, merged, overwritten, rewritten, clinically corrected, or imported. No production JSON, database write, schema change, application change, activation, publication, or learner exposure occurred.

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
[10]: file:///home/ubuntu/seg-manus-status/SEG_PHASE_7_8_6_TAXONOMY_EVIDENCE.txt "Deterministic taxonomy evidence"
[11]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 schema"
