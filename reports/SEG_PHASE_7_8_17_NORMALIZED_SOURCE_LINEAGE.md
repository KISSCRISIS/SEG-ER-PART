# SEG Phase 7.8.17 — Normalized Source Lineage

**Mode:** `CONTROLLED / READ-ONLY STRUCTURAL PREPARATION`  
**Status:** `LINEAGE_REGISTERED — DOWNSTREAM GOVERNANCE BLOCKED`  
**Prepared by:** Manus AI  
**Source package:** `كتبعلاءنصدراسي.zip`  
**Package SHA-256:** `34650a96c8b244c65a0bfb4969a658df1c9d45220636c9ed661b11acf2358bf3`

## 1. Scope and boundary

This report registers the normalized structural lineage of the four Priority 1 text artifacts and the known byte-identical FRCEM study-book representation. It records source identity, location, size, checksum, observed structural role, and unresolved governance states. It does **not** create SEG content records, question-bank records, lessons, flashcards, assessments, JSON payloads, database rows, adapter mappings, or activation decisions.

> Normalization in this phase means deterministic structural observation only. It does not mean medical normalization, editorial correction, source replacement, ownership attribution, or permission to merge content.

The source package remains a `SEPARATE_LINEAGE_CANDIDATE`. Intake-local identifiers beginning with `UPD811-` are registry identifiers only; they are not `SRC-*`, `CAND-*`, content IDs, identity links, or production identifiers.

## 2. Priority 1 lineage register

| Intake source ID | Exact source location | Artifact role | Bytes | SHA-256 | Structural state | Governance state |
|---|---|---|---:|---|---|---|
| `UPD811-001` | `.../اسئله +الشرح بالعربي/FRCEM_High_Yield_Study_Book.txt` | FRCEM study-book text | 519,822 | `f5fb6b3f88b94a1b5a1a360acfe4616a5b3a5940a4b0854a35ba646f5f95a4a1` | Primary observed text representation | Owner: `PREPARER_SIGNAL_ONLY`; publisher: `NOT_SUPPLIED`; version: `UNRESOLVED`; rights: `PENDING_EXTERNAL_EVIDENCE`; clinical review: `PENDING_CLINICAL_REVIEW` |
| `UPD811-004` | `.../كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book.txt` | FRCEM study-book text representation | 519,822 | `f5fb6b3f88b94a1b5a1a360acfe4616a5b3a5940a4b0854a35ba646f5f95a4a1` | Byte-identical to `UPD811-001`; retained as a separate observed location | `duplicate_of: UPD811-001`; no merge; same unresolved governance states |
| `UPD811-002` | `.../اسئله +الشرح بالعربي/HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt` | HIPPO QBank with Arabic explanation layer | 2,137,094 | `b9c1636f84f802d9f68794a3fa6f3d6ca34617fc08eda0a9ffb863262001771b` | Question/explanation text; 18 observed chapter markers; 1,927 question markers | Owner: `NOT_SUPPLIED`; publisher: `NOT_SUPPLIED`; version: `UNRESOLVED`; rights: `PENDING_EXTERNAL_EVIDENCE`; clinical review: `PENDING_CLINICAL_REVIEW` |
| `UPD811-003` | `.../اسئله +الشرح بالعربي/frcem All_Chapters_Questions_and_Explanations_Full.txt` | FRCEM QBank with explanations | 5,249,304 | `08d73b475a7ff1eda0cbbe905c5109628598b5210e8710ac0e8fae19dddad995` | Question/explanation text; 32 observed chapter candidates; 1,529 question markers | Owner: `NOT_SUPPLIED`; publisher: `NOT_SUPPLIED`; version: `UNRESOLVED`; rights: `PENDING_EXTERNAL_EVIDENCE`; clinical review: `PENDING_CLINICAL_REVIEW` |
| `UPD811-005` | `.../كتب علاء نص دراسي/HIPPO_High_Yield_Study_Book.txt` | HIPPO study-book text | 304,644 | `fe9b1df0eae11416195c919095aa946c80212ed48e3ef59f9c0a50e2db5eef5c` | Study-book text; 18 normalized chapter candidates; reference-like chapter signals require separation | Owner: `NOT_SUPPLIED`; publisher: `NOT_SUPPLIED`; version: `UNRESOLVED`; rights: `PENDING_EXTERNAL_EVIDENCE`; clinical review: `PENDING_CLINICAL_REVIEW` |

The byte-identical FRCEM pair is preserved as two lineage rows because identical bytes do not prove that the two locations have identical provenance, intended role, or rights scope. The structural result is `BYTE_IDENTICAL_REPRESENTATION`, not an instruction to delete, overwrite, rename, merge, or archive either source.

## 3. Metadata closure state

The following values remain unresolved because the intake evidence does not supply them. No value is inferred from filenames, folder names, reference names, preparer signals, or chapter titles.

| Metadata field | Phase 7.8.17 state | Downstream effect |
|---|---|---|
| Source owner | `PREPARER_SIGNAL_ONLY` for the FRCEM study-book text; `NOT_SUPPLIED` for the remaining Priority 1 texts | Cannot be treated as ownership evidence |
| Publisher | `NOT_SUPPLIED` | Publisher provenance remains open |
| Edition/version | `UNRESOLVED` | No deterministic edition-level identity can be assigned |
| Rights/display scope | `PENDING_EXTERNAL_EVIDENCE` | No verbatim display, publication, or activation authorization |
| Clinical review | `PENDING_CLINICAL_REVIEW` | No clinical approval or activation |
| Professional track | `NOT_SUPPLIED` | No track assignment inferred |
| Taxonomy | `NOT_SUPPLIED` | No taxonomy mapping inferred |
| Stable SEG identity | `NOT_ASSIGNED` | No `SRC-*`, `CAND-*`, content ID, or legacy bridge created |

## 4. Preservation and non-actions

All original source files remain in their original intake locations. `content_modified` is `false`; `source_preserved` is `true`. No original text was rewritten, translated, corrected, split into records, or replaced. No source package was copied into the repository. No production JSON, database write, schema change, import, adapter, approval, activation, commit, or push was performed as part of Phase 7.8.17 preparation.

## 5. Evidence references

[1]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md "Phase 7.8.11 Updated Source Registry"
[2]: file:///home/ubuntu/seg-manus-status/tmp/seg-phase-7-8-17/artifact_inventory.tsv "Phase 7.8.17 structural artifact inventory"
[3]: file:///home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/sha256_manifest.txt "Updated source package checksum sidecar"
[4]: file:///home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_inventory_comparison.md "Updated source inventory comparison"

## Final lineage decision

**`LINEAGE_REGISTERED — BLOCKED_PENDING_METADATA_RIGHTS_CLINICAL_REVIEW`**. The register is sufficient for controlled structural review and later mapping design, but it is not sufficient for production transformation or source replacement.
