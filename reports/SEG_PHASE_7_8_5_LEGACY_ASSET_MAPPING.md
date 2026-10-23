# SEG Phase 7.8.5 — Legacy Asset Mapping

> **Mode:** Controlled preparation only. The five legacy JSON files are treated as educational enrichment metadata. They are not replacement sources, not import payloads, and not production records.
>
> **Analysis timestamp (UTC):** `2026-08-21T11:25:53Z`
>
> **Mapping status:** `METADATA_ONLY_UNRESOLVED_LINKAGE`

## 1. Input inventory and immutable evidence

| Legacy asset | SHA-256 | Records | SEG layer target | Observed metadata fields | Candidate linkage result | Allowed use in this phase |
|---|---|---|---|---|---|---|
| appFlashcards.json | 2c36ff78a3c20fa11446077e0d5c495cafb37c6abdc11ac443abac642748ac54 | 128 | question_bank candidate enrichment | cardId, question, answer, source, type, yield | No explicit SRC-xxxx candidate linkage found; UNRESOLVED linkage | No direct import; enrichment only after candidate-level review |
| fullReferenceLibrary.json | 6595cad2e2d1deb86a70825944530de137b99e55aca29b2758b8f03f955e6755 | 126 | lesson/reference_framework enrichment | id, topic, source, chapterNumber, chapterTitle, reference metadata, needsVerification | No explicit SRC-xxxx candidate linkage found; UNRESOLVED linkage | Reference framework metadata only; no verbatim display or ownership claim |
| chapterStudyMap.json | a32149f711d1f6adb7bc3723f729c9214c1da41833d002cfc7388799b58a84de | 85 | taxonomy support | chapterNumber, count, entries, source | No explicit SRC-xxxx candidate linkage found; taxonomy relationship UNRESOLVED | Support evidence only; does not close TAXONOMY_PENDING |
| masterTopicFamilyIndex.json | ce39f8a73155decad741ac48217bfb6e4fab097c242cf180317a963089a768e3 | 38 | taxonomy support | family, count, entries | No explicit SRC-xxxx candidate linkage found; taxonomy relationship UNRESOLVED | Support evidence only; does not assign taxonomy IDs or versions |
| masterTrapIndex.json | 8831609564bf5b5ad38402dab33b6ded0c507ada5adbf300577864c562441c2c | 126 | lesson enhancement | referenceId, topic, chapterNumber, chapterTitle, source, trap | No explicit SRC-xxxx candidate linkage found; lesson relationship UNRESOLVED | Enhancement candidate only; no medical text copied or activated |

The archive itself was preserved as an uploaded input with SHA-256 `f09eb079d15be2eb99218cb40a111f4a1fbf136d906548e6ba78e13a2062ce52`. The extracted working copies are read-only derivatives. The original source package and Phase 7.8 candidate map remain unchanged.

## 2. Layer mapping rules

| Legacy asset | Proposed SEG layer | Mapping decision | Evidence limitation |
|---|---|---|---|
| `appFlashcards.json` | `question_bank` candidate enrichment | Use only as a possible enrichment/reference surface for the 17 question-bank candidates after explicit candidate linkage and QA. Preserve card identity and observed answer/question presence as metadata; do not create a question record here. | The JSON contains 128 flashcard objects, but no `SRC-xxxx` identifiers matching the 48 candidate Source IDs. It cannot establish candidate ownership, clinical approval, rights, or reference linkage. |
| `fullReferenceLibrary.json` | `lesson` enrichment and `relationships.reference_framework` preparation | Treat `source`, chapter identifiers, topic labels, reference IDs, and verification flags as reference metadata candidates. External frameworks remain reference frameworks only. | The 126 objects contain declared source labels but no candidate Source ID joins. `needsVerification=true` occurs for 28 objects; `Tintinalli?` occurs 3 times and `Patch` once, so external evidence remains open. |
| `chapterStudyMap.json` | Taxonomy support | Use chapter and entry structure only as a possible taxonomy-support index. | The 85 objects do not provide the v1.1 `taxonomy_id`/`taxonomy_version` contract or candidate joins. No taxonomy state is closed. |
| `masterTopicFamilyIndex.json` | Taxonomy support | Use family labels and counts only as a candidate vocabulary-support source. | The 38 family objects do not provide an approved taxonomy ID/version or candidate joins. |
| `masterTrapIndex.json` | `lesson` enhancement | Use reference/topic/chapter/trap metadata as a possible lesson-enhancement index after separate mapping and clinical QA. | The 126 objects do not provide candidate joins; no medical text is copied into SEG records by this phase. |

## 3. Observed structural metadata

| Asset | Observed counts |
|---|---|
| Flashcards | 128 objects; types: Topic=123, Fact=3, Numerical=2; yields: High=102, Needs verification=25, Critical=1. |
| Reference library | 126 objects; source labels: Tintinalli=65, Rosen=57, Tintinalli?=3, Patch=1; `needsVerification=true` for 28. |
| Chapter study map | 85 objects; source labels: Rosen=51, Tintinalli=30, Tintinalli?=3, Patch=1. |
| Topic family index | 38 family objects. |
| Trap index | 126 objects; source labels: Tintinalli=65, Rosen=58, Tintinalli?=3. |

These counts are structural observations only. They do not establish clinical correctness, copyright permission, candidate membership, taxonomy approval, or learner display permission.

## 4. Required future join contract

Before any enrichment can be associated with a candidate, a future controlled review must define an explicit join key and evidence path. Acceptable evidence would include a candidate/source ID cross-reference, exact source/version/locator, field-level provenance, rights state, taxonomy state, and the relevant clinical/QA review record. Topic similarity, chapter name, filename, or framework name alone is not an approved join key.

No direct import, replacement, source overwrite, medical-content rewrite, or learner exposure is permitted by this mapping.

## Non-actions

| Action | Result |
|---|---|
| Original source replacement | `false` |
| Production JSON generation | `false` |
| Database import/write | `false` |
| Schema/application modification | `false` |
| Clinical approval or rights clearance | `false` |
| Activation/publication | `false` |

## References

[1]: file:///home/ubuntu/seg-phase-7-8-5-legacy-assets/appFlashcards.json "Legacy flashcards metadata asset"
[2]: file:///home/ubuntu/seg-phase-7-8-5-legacy-assets/fullReferenceLibrary.json "Legacy reference library metadata asset"
[3]: file:///home/ubuntu/seg-phase-7-8-5-legacy-assets/chapterStudyMap.json "Legacy chapter study map metadata asset"
[4]: file:///home/ubuntu/seg-phase-7-8-5-legacy-assets/masterTopicFamilyIndex.json "Legacy topic family metadata asset"
[5]: file:///home/ubuntu/seg-phase-7-8-5-legacy-assets/masterTrapIndex.json "Legacy trap metadata asset"
[6]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv "SEG Phase 7.6 candidate record map"
[7]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG Content Record v1.1 schema profile"
