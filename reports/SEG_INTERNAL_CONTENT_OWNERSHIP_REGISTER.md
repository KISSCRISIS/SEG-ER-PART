# SEG Internal Content Ownership Register

**Mode:** `CONTROLLED GOVERNANCE UPDATE`  
**Scope:** Drug HTML, OSCE Atlas, and PreTest artifacts only.  
**Register purpose:** Record the ownership classification supported by the current evidence package without inventing an owner, creation authority, license, or approval.

## 1. Determination rule

The input evidence report records artifact continuity and explicitly states that no new external source, owner statement, license, or authoritative publication was supplied or independently verified during the evidence-recovery pass.[1] Therefore, this register does **not** reclassify any artifact as `SEG_INTERNAL_ASSET`.

`SEG_INTERNAL_ASSET` may be used only after a written internal ownership declaration identifies the project owner, the covered artifact or artifact hash, the creation authority, and the permitted usage scope. No such declaration is present in the input record. The current classification is consequently `UNCONFIRMED` for all three artifacts.

This register is a documentation record only. It is not a rights approval, medical approval, source-registry update, normalization authorization, import authorization, or activation record.

## 2. Ownership register

| Source ID | Artifact identity | Ownership type | Content owner | Creation authority | Intended audience | Usage scope | Review requirement |
|---|---|---|---|---|---|---|---|
| Not available in input evidence — Drug HTML | Readable UTF-8 HTML artifact; 25,918 bytes; 394 lines; SHA-256 `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac`; 47 observed `drugList` entities | `UNCONFIRMED` | Not available; no explicit internal ownership declaration recorded | Not available; no creation-authority statement recorded | Not established by ownership evidence; learner exposure is not authorized | Internal evidence review only; no reproduction, redistribution, normalization, import, activation, or publication | Medical medication/pharmacology review; technical lineage/provenance review; rights review; version tracking and audit trail required |
| Not available in input evidence — OSCE Atlas | Recovered OSCE package; inner SHA-256 `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e`; outer recovery-container SHA-256 `8182d243fc762e29efba5adeda4233042f5e337846b3fbe819fcd374ef948758`; 14 PNG members; station-text artifact; visual-validation notes | `UNCONFIRMED` | Not available; no explicit internal ownership declaration recorded for the package, PNGs, or text | Not available; no creation-authority statement recorded | Not established by ownership evidence; learner exposure is not authorized | Internal evidence review only; no reproduction, redistribution, normalization, Atlas record creation, content mapping, activation, or publication | Emergency Medicine medical review; rights and provenance review; technical lineage review; visual-quality and accessibility review; version tracking and audit trail required |
| `UPD811-007` | `pretestnew_Study_Guide_UTF8.txt`; 131,490 bytes; 1,349 logical lines; SHA-256 `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166`; recovered text representation with recorded OCR/extraction corruption | `UNCONFIRMED` | Not available; no explicit internal ownership declaration recorded | Not available; no creation-authority statement recorded | Not established by ownership evidence; learner exposure is not authorized | Internal evidence review only; no reproduction, redistribution, OCR correction, normalization, import, activation, or publication | Emergency Medicine question-bank medical review; technical/OCR reconciliation; rights and provenance review; version tracking and audit trail required |

## 3. Internal declaration requirements

If the project owner intends to classify any listed artifact as `SEG_INTERNAL_ASSET`, a separate written declaration must be added to the governance evidence trail. The declaration must identify the declaring authority, the exact source and artifact identity, the applicable file hash or immutable artifact reference, the basis of internal ownership, the creation authority, the intended audience, the allowed usage scope, the effective date, the version, and the audit record linking the declaration to the artifact.

Until that declaration exists and the medical/review gates are complete, the `UNCONFIRMED` classification remains unchanged. Because no internal declaration is currently recorded, the absence of external publisher evidence is **not** waived by this register.

## 4. Review and governance state

| Control | Current state |
|---|---|
| Internal ownership declaration | Not recorded in the input evidence |
| Medical review status | `PENDING_REVIEW` for all three sources |
| Rights approval | Not granted |
| Version tracking | Artifact-level hashes are recorded; canonical source version remains unresolved where stated in the evidence report |
| Audit trail | Existing evidence references retained; ownership-declaration event not present |
| Source Registry | No change performed |
| Approved sources | `APPROVED_SOURCES = NONE` |
| Normalization | `BLOCKED_PENDING_APPROVED_SOURCE` |
| Content records | Not created |
| Import/activation/publication | Not performed |

The artifact facts in this register establish continuity of recovered files only. They do not establish ownership, permission to reproduce, clinical correctness, source approval, or readiness for normalization.

## 5. Final status

`SEG_INTERNAL_OWNERSHIP_DECLARATION_COMPLETE`

This status means that the ownership-declaration register was created and the current evidence was recorded. It does **not** mean that any source has been reclassified as `SEG_INTERNAL_ASSET`, approved, normalized, imported, activated, or published.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_P0_AUTHORITY_EVIDENCE_STATUS_REPORT.md "SEG P0 Authority Evidence Status Report"

**Register status:** `INTERNAL_OWNERSHIP_REGISTERED_PENDING_DECLARATION_AND_REVIEW`
