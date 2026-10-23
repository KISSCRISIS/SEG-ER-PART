# SEG PHASE 7.8.11 — LEGACY COMPARISON MATRIX

**Mode:** `CONTROLLED GOVERNANCE / READ-ONLY`
**Purpose:** Compare the updated package with legacy knowledge assets without creating identity links, SRC/CAND IDs, mappings, or transformations.

## Classification rule

The classifications below describe evidence signals at the package/content-layer level. They do not assert that an updated artifact is the same object as a legacy object. `NEW_CONTENT` is not established by this comparison because novelty requires authoritative versioned provenance, not absence of a byte-identical file.

| Legacy asset | Legacy item count | Classification | Evidence observed | Boundary / unresolved state |
|---|---:|---|---|---|
| officialUnifiedTopics.json | 40 | OVERLAPPING_CONTENT | 10 of 40 normalized topic names occurred in the new text; selected fields showed 3 exact-line and 1 substring signal. | No shared object ID, versioned locator, or explicit relationship. NEW_CONTENT not established. |
| referenceLibrary.json | 194 | EXTERNAL_REFERENCE_CONTENT; OVERLAPPING_CONTENT | Reference signals and 4 exact-line/1 substring selected-field signals were observed. | Framework/reference language is not a rights, edition, or identity decision. NEW_CONTENT not established. |
| flashcards.json | 760 | DERIVED_CONTENT; OVERLAPPING_CONTENT | Selected fields showed 5 exact-line/1 substring signals; new package contains question/explanation material. | Similarity may reflect reuse, derivation, or common references. No object-level join. NEW_CONTENT not established. |
| examTraps.json | 415 | DERIVED_CONTENT; OVERLAPPING_CONTENT | Selected fields showed 5 exact-line/1 substring signals. | No explicit trap ID, versioned locator, or source-to-artifact relationship. NEW_CONTENT not established. |
| algorithms.json | 28 | OVERLAPPING_CONTENT | Selected fields showed 1 exact-line signal. | Single text overlap is insufficient for identity or clinical equivalence. NEW_CONTENT not established. |
| topicFamilyIndex.json | 99 | UNKNOWN | No selected text-field overlap was established in the conservative comparison. | No topic-family IDs or explicit taxonomy contract in the new package. NEW_CONTENT not established. |
| antidotes.json | 16 | OVERLAPPING_CONTENT | Selected fields showed 3 exact-line signals. | Antidote terminology overlap is not object identity or clinical approval. NEW_CONTENT not established. |

## Classification summary

| Classification | Determination |
|---|---|
| `NEW_CONTENT` | Not established for any compared asset. |
| `OVERLAPPING_CONTENT` | Observed for official topics, reference library, flashcards, exam traps, algorithms, and antidotes through limited textual/reference signals. |
| `DERIVED_CONTENT` | Applicable as a provisional layer for question/explanation and study-guide artifacts; transformation has not occurred. |
| `EXTERNAL_REFERENCE_CONTENT` | Reference/framework signals are present; rights, edition, and display scope remain pending. |
| `UNKNOWN` | Applies where the supplied evidence does not support a conservative layer determination, including topic-family direct mapping. |

## Priority 1 comparison interpretation

The four Priority 1 text artifacts are suitable for a later controlled review queue because they contain question/explanation and study-book material. They remain source candidates rather than SEG records. Their possible relationships to `officialUnifiedTopics`, `referenceLibrary`, `flashcards`, `examTraps`, `algorithms`, `topicFamilyIndex`, and `antidotes` must remain `OVERLAPPING_CONTENT`, `DERIVED_CONTENT`, `EXTERNAL_REFERENCE_CONTENT`, or `UNKNOWN` until versioned locators and independent review are supplied.

## Explicit exclusions

This matrix does not assign `SRC-*` or `CAND-*` IDs, does not create legacy-to-candidate links, does not choose professional tracks, does not create taxonomy mappings, does not determine medical correctness, and does not establish rights or ownership.

## References

[1]: file:///home/ubuntu/seg-manus-status/phase_7_8_10_content_overlap.md "Phase 7.8.10 conservative content overlap"
[2]: file:///home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_inventory_comparison.md "Phase 7.8.10 structural comparison"
[3]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/officialUnifiedTopics.json "Legacy official unified topics"
[4]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/referenceLibrary.json "Legacy reference library"
[5]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/flashcards.json "Legacy flashcards"
[6]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/examTraps.json "Legacy exam traps"
[7]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/algorithms.json "Legacy algorithms"
[8]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/topicFamilyIndex.json "Legacy topic family index"
[9]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/antidotes.json "Legacy antidotes"
