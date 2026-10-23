# SEG Phase 7.8.7 — Taxonomy Mapping Update

## Controlled interpretation

The supplied legacy objects provide observed topic/family labels and relationships, but the object-level crosswalk produced no explicit joins to the 48 SEG candidates. Accordingly, this update records mapping candidates only; it does not assign pathway, taxonomy, ownership, review, or activation state.

## Asset-to-taxonomy/pathway mapping

| Legacy asset | Observed metadata basis | SEG taxonomy/pathway use | v1.1 target implication | Crosswalk status |
|---|---|---|---|---|
| `officialUnifiedTopics.json` | observed IDs/titles/topics/chapters/family labels where present; no inferred values | lesson | lesson | NO_MATCH=40 |
| `referenceLibrary.json` | observed IDs/titles/topics/chapters/family labels where present; no inferred values | book + relationships.reference_framework | book | NO_MATCH=194 |
| `flashcards.json` | observed IDs/titles/topics/chapters/family labels where present; no inferred values | question_bank candidate enrichment | question_bank | NO_MATCH=760 |
| `examTraps.json` | observed IDs/titles/topics/chapters/family labels where present; no inferred values | question_bank/lesson enrichment candidate | question_bank | NO_MATCH=415 |
| `algorithms.json` | observed IDs/titles/topics/chapters/family labels where present; no inferred values | clinical_case or clinical_skill support candidate; no direct assignment | clinical_case | NO_MATCH=28 |
| `arabicMentorExplanations.json` | observed IDs/titles/topics/chapters/family labels where present; no inferred values | lesson/question_bank enrichment layer; authorship unresolved | lesson | NO_MATCH=367 |
| `topicFamilyIndex.json` | observed IDs/titles/topics/chapters/family labels where present; no inferred values | taxonomy/index metadata only | lesson | NO_MATCH=99 |
| `antidotes.json` | observed IDs/titles/topics/chapters/family labels where present; no inferred values | lesson/clinical_skill support candidate; no direct assignment | lesson | NO_MATCH=16 |

## Pathway evidence state

- **Internship Doctor Pathway:** not assigned at object level by this report; requires explicit candidate/source crosswalk and owner authorization.
- **Emergency Medicine Resident Pathway:** not assigned at object level by this report; advanced or board relevance cannot be inferred from a topic label alone.
- **Board review relevance:** reference/exam signals may be observed, but no independent pathway assignment or learner exposure is authorized.
- **Emergency Medicine domains:** topics/families are preserved as legacy labels; a taxonomy mapping adapter would require controlled vocabulary matching and review.

## Exact taxonomy blockers

- No `SRC-xxxx` or equivalent SEG candidate key was observed in the crosswalk output for any of the 1,919 objects.
- Family/topic names are not sufficient evidence for pathway placement, level, or clinical governance status.
- No version, locator, rights, or reviewer closure was added.
- No schema records or adapter payload were generated.

## Decision

`NO_READY_FOR_ADAPTER_DRY_RUN` — retain all mappings as unresolved preparation evidence pending explicit object-to-source crosswalk evidence and required review gates.
