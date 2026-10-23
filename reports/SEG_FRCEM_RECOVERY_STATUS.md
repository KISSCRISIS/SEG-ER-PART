# SEG FRCEM Representations Recovery Status

**Execution mode:** `CONTROLLED READ-ONLY RECOVERY`  
**Batch run timestamp (UTC):** `2026-08-22T05:57:41.397874+00:00`  
**Source family:** **FRCEM Representations**  
**Source authority:** YaAllah SEG source/governance records remain controlling.  
**Recovery gate:** `BLOCKED_PENDING_EVIDENCE`  
**No production transformation:** `true`

## Recovery Result

All five registered FRCEM representations are available and hash-consistent. Recovery confirms representation inventory, including a byte-identical duplicate text representation, but does not confirm official FRCEM edition, rights, track, or medical review.

## Artifact Inventory and Integrity

| Registry reference | Artifact path | Type | Bytes | Logical lines | SHA-256 | Registry comparison |
|---|---|---|---:|---:|---|---|
| `UPD811-001` | `/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/اسئله +الشرح بالعربي/FRCEM_High_Yield_Study_Book.txt` | UTF-8 text | 519822 | 5048 | `f5fb6b3f88b94a1b5a1a360acfe4616a5b3a5940a4b0854a35ba646f5f95a4a1` | MATCH |
| `UPD811-003` | `/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/اسئله +الشرح بالعربي/frcem All_Chapters_Questions_and_Explanations_Full.txt` | UTF-8 text | 5249304 | 55591 | `08d73b475a7ff1eda0cbbe905c5109628598b5210e8710ac0e8fae19dddad995` | MATCH |
| `UPD811-004` | `/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book.txt` | UTF-8 text | 519822 | 5048 | `f5fb6b3f88b94a1b5a1a360acfe4616a5b3a5940a4b0854a35ba646f5f95a4a1` | MATCH |
| `UPD811-009` | `/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book_Colored.pdf` | PDF | 734042 | N/A | `9011b079fea60f8b981616eba1602a84b75041806093f895c12f5ea9b602de67` | MATCH |
| `UPD811-011` | `/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book_Editable.docx` | DOCX | 228099 | N/A | `6075e82c335b1375a14664914c63fefa75fe9c64d12968d972becfd2b92025ea` | MATCH |

The listed representations were fingerprinted as separate evidence items. Identical hashes are reported as duplicate evidence and are not merged by this batch.

All listed artifacts were read for fingerprinting only. No artifact was rewritten, normalized, renamed, deleted, or executed.

## Recovery Observations

- Registered representations `UPD811-001`, `UPD811-003`, `UPD811-004`, `UPD811-009`, and `UPD811-011` are present and hash-consistent.
- `UPD811-001` and `UPD811-004` have the same SHA-256 and remain separately identified for lineage; no merge or deletion was performed.
- Prior intake evidence observes a 1,529-question/32-chapter study-book signal and a 1,529-question/32-chapter Q&A signal; these are structural observations, not official completeness evidence.
- TXT, PDF, and DOCX representations remain separate and are not treated as interchangeable source authority.

These are structural or provenance observations only. They are not clinical correctness findings, dose validation, interaction validation, approval, or activation.

## Governance State

| Governance field | Current observed state |
|---|---|
| Source identity | Canonical FRCEM publisher/owner, author, official edition/version, date, and original locators remain unresolved. |
| Provenance | Local paths, hashes, duplicate relationship, and representation relationships are confirmed; authoritative source and attributable extraction event remain open. |
| Rights | `PENDING_EXTERNAL_EVIDENCE`; no source-specific ownership, license, display, educational-use, redistribution, attribution, or publication terms supplied. |
| Medical review | `PENDING_CLINICAL_REVIEW`; no attributable Emergency Medicine/examination reviewer decision for the exact study-book or Q&A representation. |
| Professional track | No final track is assigned. Resident/Advanced and possible Shared Core signals remain provisional pending explicit evidence. |
| Allowed use | `INTERNAL_REFERENCE_ONLY` / `WAITING_FOR_EVIDENCE` |

## Remaining Blockers

- Canonical FRCEM authority and edition/version.
- Rights evidence for text, PDF, and DOCX representations.
- Representation-level source locators.
- Explicit professional-track/taxonomy decision.
- Role-based Emergency Medicine/examination review with conflict disposition.
- Attributable extraction and source-to-registry provenance.

## Next Allowed Action

Proceed to Evidence Closure Decision. Preserve the duplicate and all representations as separate traceable evidence; do not merge, delete, normalize, or import.

No normalization, schema mapping, content record creation, import, activation, publication, or learner exposure is authorized by this recovery report.

## Non-actions

| Action | Performed |
|---|---|
| Source modification | `false` |
| Medical content correction or rewriting | `false` |
| SQL or migration | `false` |
| Database/Supabase change | `false` |
| Prisma/Zod/mapping creation | `false` |
| Content import or activation | `false` |
| Clinical approval or rights approval | `false` |
| Git operation | `false` |

## References

[1]: /home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md
[2]: /home/ubuntu/seg-internship-output/SEG_MASTER_SOURCE_REGISTRY_STATUS.md
[3]: /home/ubuntu/seg-internship-output/SEG_CONTENT_RECOVERY_EXECUTION_TRACKER.md

---

**Report status:** `RECOVERY_EVIDENCE_CAPTURED_PENDING_GOVERNANCE_CLOSURE`
