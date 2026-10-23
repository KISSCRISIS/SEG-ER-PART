# SEG Phase 7.8.8 — Mapping Rules

## Rule status

These rules are a fail-closed design for a future identity bridge. They do not classify any current legacy object as linked, do not create bridge rows, and do not override the completed Phase 7.8.7 result.

## Controlled confidence vocabulary

| Mapping confidence | Qualification rule | Automatic assignment allowed? | Current count |
|---|---|---:|---:|
| `EXACT_ID_MATCH` | The exact legacy source/object ID appears in an explicitly authorized legacy-to-SEG cross-reference and resolves to one unique candidate. Namespace and collision checks must pass. | Only after the explicit cross-reference is supplied and reviewed | 0 |
| `EXACT_TITLE_MATCH` | The complete observed legacy title equals the complete target-comparable candidate title under a documented exact comparison rule; one unique candidate only. No fuzzy similarity, synonym, translation, or partial-title matching. | Only when candidate title evidence is present and uniqueness is proven | 0 established |
| `TOPIC_RELATION_MATCH` | A controlled taxonomy/pathway relation explicitly maps one legacy topic/family to one candidate, with versioned vocabulary and collision rules. Topic similarity alone is insufficient. | No, until the relation contract and review are supplied | 0 established |
| `REFERENCE_RELATION_MATCH` | An explicit reference/chapter/locator relation identifies the same source object and resolves to one candidate; book/reference context alone is insufficient. | No, until source locator/version evidence is supplied | 0 established |
| `MANUAL_REVIEW_REQUIRED` | A human identity reviewer must decide because evidence is ambiguous, non-unique, duplicate-family related, missing, or conflicting. The reviewer must record evidence and disposition. | No automatic link | 0 bridge rows created |
| `NO_LINK` | No sufficient identity evidence exists, or the object is index/navigation/enrichment-only and no direct SEG candidate is authorized. | Yes as an explicit non-link disposition only; never as a candidate assignment | 0 reviewer-confirmed; 1,919 current rows are `NO_MATCH`, not confirmed `NO_LINK` |

## Deterministic evaluation order

1. Verify the legacy namespace: exact asset filename, object ID/key, and object type must be preserved.
2. Check an authorized exact ID cross-reference first. If one unique target exists, record `EXACT_ID_MATCH`; if multiple targets or contradictory targets exist, stop at `MANUAL_REVIEW_REQUIRED` or `CONFLICT` in a later governed workflow.
3. Check exact title equality only when both sides contain complete comparable title values. A missing title, partial title, translation, synonym, or topic label cannot pass this rule.
4. Check topic/family relationships only through an explicit, versioned taxonomy/pathway contract. Do not promote a topic label to an identity key.
5. Check reference/chapter relations only when source identity, version/edition if known, locator, and one target candidate are explicit. A reference framework signal is not a record join.
6. Route ambiguity, duplicate lineage, missing target evidence, or conflicting signals to `MANUAL_REVIEW_REQUIRED`.
7. If no rule passes and no authorized review is available, record `NO_LINK`; preserve the object for future evidence intake.

## Evidence precedence and conflict handling

| Evidence condition | Required handling |
|---|---|
| Exact ID and exact title agree | Candidate may be proposed at the corresponding confidence, subject to review status and governance gates. |
| Exact ID conflicts with title/topic | Do not choose silently; route to manual identity review and record the conflict. |
| Multiple candidates share the same title/topic | No automatic link; route to manual review. |
| Duplicate lineage is present | Preserve every source/candidate row; no merge, overwrite, deletion, or silent primary selection. |
| Only external reference name is present | Keep as reference relation/context; do not assign a SEG candidate. |
| Only family/index relationship is present | Keep as taxonomy/navigation support; do not create a direct content link. |
| Rights or clinical review is missing | Identity may be reviewed as a mapping proposal, but the target remains non-production and non-learner-facing. |

## Asset-specific default handling

| Legacy asset | Default bridge treatment |
|---|---|
| `officialUnifiedTopics.json` | Potential lesson-candidate source only; exact topic/title is not a candidate join without explicit target evidence. |
| `referenceLibrary.json` | Book/reference-framework context; no direct lesson or candidate link without explicit source/locator relation. |
| `flashcards.json` | Question-bank enrichment candidate; no direct candidate link from `FC_*` alone. |
| `examTraps.json` | Question-bank/lesson enrichment candidate; `TRP_*` alone is not a target identity. |
| `algorithms.json` | Clinical-case/skill support candidate; no direct target assignment from `ALG_*` alone. |
| `arabicMentorExplanations.json` | Educational-layer enrichment with authorship/review state unresolved; no direct candidate link from the object key alone. |
| `topicFamilyIndex.json` | Taxonomy/navigation support only; no direct v1.1 record or candidate link. |
| `antidotes.json` | Toxicology enrichment/support candidate; no direct target assignment from `ANT_*` alone. |

## Required review statuses

| State | Meaning |
|---|---|
| `UNRESOLVED` | No target identity has been established. |
| `PENDING_IDENTITY_REVIEW` | Evidence package is ready for a designated identity reviewer; no link is active. |
| `IDENTITY_REVIEWED_NOT_GOVERNANCE_APPROVED` | Identity relation was reviewed as a mapping fact, but clinical/rights/implementation gates remain open. |
| `NO_LINK_CONFIRMED` | Reviewer explicitly confirms no SEG candidate relation for the current scope. |
| `CONFLICT_ESCALATED` | Conflicting identity evidence is preserved and requires escalation. |

## Current rule application

Applying these rules to the available evidence does not yield any deterministic target assignment. The prior result remains `MATCHED=0`, `PROBABLE_MATCH=0`, `NO_MATCH=1919`, `CONFLICT=0`. This is an identity-evidence result, not a clinical content rejection.

## Non-actions

No bridge rows, JSON, adapter, import, database write, schema modification, content rewrite, approval, activation, or publication was performed.
