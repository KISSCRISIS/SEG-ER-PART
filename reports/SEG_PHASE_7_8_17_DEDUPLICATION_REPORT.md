# SEG Phase 7.8.17 — Structural Deduplication Report

**Mode:** `CONTROLLED / READ-ONLY STRUCTURAL DEDUPLICATION`  
**Status:** `DEDUP_EVIDENCE_READY — NO_MERGE`  
**Content modification:** `false`  
**Source preservation:** `true`

## 1. Deduplication boundary

This report evaluates deterministic structural evidence only: SHA-256 equality, observed representation families, raw locator structure, and exact normalized-block overlap output. It does not determine medical equivalence, edition equivalence, ownership, rights, authorship, clinical correctness, or SEG identity. No source was deleted, renamed, overwritten, merged, archived, or replaced.

> A byte-identical representation is evidence of identical bytes at two observed locations. It is not evidence that the two locations have identical provenance, rights scope, intended audience, or governance history.

## 2. Deterministic evidence matrix

| Evidence class | Members | Evidence | Classification | Controlled action |
|---|---|---|---|---|
| Exact byte equality | `UPD811-001`, `UPD811-004` | Same size `519,822` bytes and SHA-256 `f5fb6b3f88b94a1b5a1a360acfe4616a5b3a5940a4b0854a35ba646f5f95a4a1` | `DUPLICATE_REPRESENTATION_PRESERVE_LINEAGE` | Keep both observed locations; record a duplicate signal; no merge or deletion |
| FRCEM representation family | `UPD811-001`, `UPD811-004`, `UPD811-009`, `UPD811-011` | Supplied filenames and intake structure identify text/PDF/DOCX representations; hashes differ for the PDF/DOCX entries | `SAME_LINEAGE_CANDIDATE_REQUIRES_VERSION_REVIEW` | Keep each artifact separately; require version/edition evidence before any family-level decision |
| HIPPO representation family | `UPD811-005`, `UPD811-010`, `UPD811-012` | Supplied filenames and intake structure identify text/PDF/DOCX representations; hashes differ across representations | `SAME_LINEAGE_CANDIDATE_REQUIRES_VERSION_REVIEW` | Keep each artifact separately; require version/edition evidence before any family-level decision |
| FRCEM versus HIPPO QBank exact normalized blocks | `UPD811-003` versus `UPD811-002` | `qbank_exact_overlap.tsv` contains a header and no data rows | `NO_EXACT_NORMALIZED_QBANK_OVERLAP_OBSERVED_IN_THIS_RUN` | Do not infer content distinctness or approval; retain separate sources and queue for review |
| Updated text versus legacy JSON assets | Legacy signals across seven reviewed files | Signals such as `frcem`, `hippo`, `chapter`, `question`, `exam`, `tintinalli`, and `rosen` are classified as reference/overlap signals only | `REFERENCE_OR_OVERLAP_SIGNAL_ONLY_REQUIRES_REVIEW` | Do not create identity links, merge objects, or infer source lineage |

## 3. FRCEM exact duplicate handling

`UPD811-001` and `UPD811-004` are byte-identical text files observed at different intake locations. The safe state is:

```text
UPD811-001 ── exact SHA equality ── UPD811-004
        │
        └── duplicate representation signal; lineage preserved
```

The duplicate signal may support a future human-reviewed representation registry. It does not authorize selecting one location as canonical, deleting the other, or treating the pair as a single governed source record.

## 4. Representation-family handling

The FRCEM and HIPPO text/PDF/DOCX groups are representation families, not proven edition families. The current evidence does not supply publisher, edition, release, conversion provenance, or rights/display scope sufficient to determine whether the representations are source-preserving exports, edited variants, or separately governed artifacts. Therefore the family state remains `SAME_LINEAGE_CANDIDATE_REQUIRES_VERSION_REVIEW`.

The PDF and DOCX representations remain outside the Priority 1 text transformation scope. They are not copied to the repository and are not treated as production payloads.

## 5. Question-bank deduplication boundary

The HIPPO QBank contains `1,927` observed question markers with `NONE_OBSERVED` duplicate IDs in the extracted field. The FRCEM QBank contains `1,529` observed question markers, but repeated low-number IDs are present and the observed ID range is only `1`–`21`. This makes the visible FRCEM numeric marker insufficient as a deterministic question identity.

The exact normalized-block comparison emitted no rows. This is negative structural evidence for this run only. It does not prove that the QBank content is medically distinct, does not close an identity bridge, and does not authorize merging, replacement, answer verification, or production question records.

## 6. Safe deduplication rules for a later review queue

A future review queue may retain the following evidence tuple without turning it into a production ID:

```text
source_id
+ source_sha256
+ artifact_location
+ representation_type
+ normalized_chapter_review_key
+ observed_question_marker
+ exact_line_locator
+ evidence_class
+ review_status
```

The queue must preserve `UNRESOLVED`, `PENDING_EXTERNAL_EVIDENCE`, and `PENDING_CLINICAL_REVIEW`. It must not synthesize version, rights, taxonomy, professional track, citation, answer correctness, or approval values.

## 7. Governance blockers preserved

| Blocker | State | Effect |
|---|---|---|
| Owner/publisher provenance | `NOT_SUPPLIED` or `PREPARER_SIGNAL_ONLY` | No ownership attribution or source replacement |
| Edition/version | `UNRESOLVED` | No deterministic edition-level merge |
| Rights/display scope | `PENDING_EXTERNAL_EVIDENCE` | No verbatim display, publication, or activation |
| Clinical review | `PENDING_CLINICAL_REVIEW` | No medical approval or activation |
| Professional track/taxonomy | `NOT_SUPPLIED` | No inferred pathway assignment |
| Stable SEG identity | `NOT_ASSIGNED` | No `SRC-*`, `CAND-*`, content ID, or legacy bridge |

## 8. Non-actions

No production JSON was generated. No SEG content records, question-bank records, lessons, flashcards, assessments, database rows, adapter mappings, imports, schema changes, application changes, clinical corrections, rights decisions, approvals, activation, commit, or push were performed as part of this report.

## 9. Evidence references

[1]: file:///tmp/seg-phase-7-8-17/dedup_evidence.tsv "Exact SHA and representation-family evidence"
[2]: file:///tmp/seg-phase-7-8-17/qbank_exact_overlap.tsv "Exact normalized QBank overlap output"
[3]: file:///tmp/seg-phase-7-8-17/question_structure.tsv "Question structure evidence"
[4]: file:///tmp/seg-phase-7-8-17/legacy_overlap_signals.tsv "Legacy overlap signals"
[5]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_17_NORMALIZED_SOURCE_LINEAGE.md "Phase 7.8.17 lineage register"

## Final deduplication decision

**`DEDUP_EVIDENCE_READY — BLOCKED_PENDING_VERSION_RIGHTS_CLINICAL_REVIEW`**. The only deterministic duplicate is preserved as a lineage signal; representation families remain separate; no production normalization or merge is authorized.
