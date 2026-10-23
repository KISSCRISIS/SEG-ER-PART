# SEG Content Transfer Matrix

**Project:** Smart Emergency Guide (SEG)  
**Mode:** Read-only analysis only  
**Input:** `/home/ubuntu/upload/pasted_content_26.txt`  
**Input SHA-256:** `af116c7c13e5f7f550c8f6fbc51f5e1000a33d092eebef43ee32343d291e3505`  
**Target authority:** YaAllah GitLab — Next.js + Prisma + Supabase + `seg-design-system`  
**Governed content authority:** SEG canonical content-record contract and content integration plan  
**Decision:** **REVIEW_REQUIRED; transfer blocked until metadata, rights, track, taxonomy, and medical-review evidence are complete.**

## Executive decision

The content section of `pasted_content_26.txt` proposes a diff of `SEG_CONTENT_LIBRARY/`, inspection of `SEG_CONTENT_RECORD_V1_1`, duplicate detection, precedence for a claimed YaAllah 71-drug model, conversion from Manus/Drizzle structures to Prisma, and SHA-256/metadata review. [1] These are planning claims and search instructions. The attachment does not contain the medical source files, JSON records, Markdown payloads, schema directory, source registry, rights evidence, clinical-review record, or audit events needed for a governed transfer.

Accordingly, the matrix does not accept any medical candidate for transfer. It distinguishes reusable governance requirements from content-specific decisions. Any future candidate must remain immutable at intake, retain full lineage, remain separated by professional track, and stay in a non-approved state until independent rights and medical review are recorded. The current content integration plan explicitly blocks medical-content activation and limits future adapter exposure to records with an approved governance status. [2]

## Required transfer envelope

Every candidate must carry the following metadata. A package-level SHA-256 for `pasted_content_26.txt` proves only the integrity of this handoff; it does not prove the integrity or provenance of any medical source artifact.

| Required field | Required treatment | Current package result |
|---|---|---|
| Content ID | Stable, unique identifier for the candidate record | **NOT SUPPLIED** |
| Content type | Explicit governed type such as lesson, question bank, book, clinical case, or clinical skill | **NOT SUPPLIED** |
| Source ID and source owner | Exact publisher/owner and immutable source identity | **NOT SUPPLIED** |
| Source location/locator | Page, chapter, section, question ID, URL fragment, or other observed locator | **NOT SUPPLIED** |
| Source version/edition | Exact supplied version or edition; never inferred from filenames | **NOT SUPPLIED** |
| Source SHA-256 | Hash of the exact source artifact and any separately derived artifact | **NOT SUPPLIED** |
| Language | Explicit language value | **NOT SUPPLIED** |
| Rights status | Text/image rights, license/evidence locator, and intended display scope | **NOT SUPPLIED** |
| Taxonomy ID/version | Explicit taxonomy mapping and version | **NOT SUPPLIED** |
| Professional track | One authorized track; no inference from title or folder | **NOT SUPPLIED** |
| Medical review status | Reviewer, decision, date, and evidence record | **NOT SUPPLIED** |
| Audit trail | Append-only intake, mapping, review, and state-transition events | **NOT SUPPLIED** |
| Approval state | `pending-intake`, `under-review`, `approved`, `rejected`, or `withdrawn` under the active contract | **NOT SUPPLIED** |

The absence of these fields is a governance blocker, not a reason to invent values or accept the content based on apparent clinical familiarity.

## Candidate-level classification

| Item in `pasted_content_26.txt` | Classification | Evidence and transfer rule |
|---|---|---|
| Inspect `SEG_CONTENT_RECORD_V1_1` for newer protocols, drug interactions, or guidelines | **REVIEW_REQUIRED** | The attachment instructs an inspection but supplies no record or source. A future review may identify candidates only from accessible immutable sources. |
| Treat the attachment’s “new in Manus” statement as evidence of new clinical content | **REJECT** | It is an unverified search claim, not source evidence. No clinical novelty may be inferred. |
| Duplicate detection across YaAllah and Manus | **ADAPT** | Reuse the duplicate-detection objective, but compare exact source IDs, versions, locators, hashes, and governed records. Do not merge by title or topic. |
| Claimed YaAllah precedence for a model containing `ClinicalRiskLevel` on 71 drugs | **REVIEW_REQUIRED** | Precedence may be decided by the target authority, but the count, field, versions, and clinical meaning are not established by this attachment. No clinical conflict is resolved here. |
| “Unless the Manus version adds verifiable clinical updates” | **ADAPT** | Keep the verification principle; require source/version/locator and qualified medical-review evidence. “Update” cannot be decided by automated text diff alone. |
| Manus content relies on Drizzle ORM schemas | **REJECT** as a transfer dependency | Drizzle is reference-repository architecture and conflicts with the target Prisma/Supabase boundary. |
| Reformat extracted content to the YaAllah Prisma schema before ingestion | **ADAPT** | A future adapter may map an approved canonical record to the target model, but it requires explicit implementation authorization after schema, rights, clinical review, and QA gates. No reformatting occurs here. |
| Exact SHA-256 generation for source artifacts | **REUSE** | Preserve immutable source hashes and separately hash derived artifacts. The attachment’s package hash is not a medical-source hash. |
| Metadata review for medical accuracy | **ADAPT** | Metadata review must remain distinct from qualified clinical review. It may prepare fields and flag gaps but cannot certify clinical correctness. |
| Transfer updated JSON/Markdown from `SEG_CONTENT_LIBRARY/` | **REVIEW_REQUIRED** | The attachment contains no payloads. Any supplied candidate must pass the full record contract and rights/clinical gates. |
| Merge Manus content into YaAllah production content | **REJECT** | Direct merge and production ingestion are outside the current governed preparation phase. |
| Activate records for learners after conversion | **REJECT** | Only independently approved records may be exposed through a future authorized adapter; the present task grants no activation authority. |
| Preserve source/version/SHA/rights/medical review/audit trail | **REUSE** | This is mandatory and directly compatible with SEG governance. |

## Track and taxonomy gate

The attachment does not provide a professional track or taxonomy for any candidate. No record may be assigned to a track from a filename, repository, title, or perceived difficulty. The controlled tracks remain distinct:

`01_Emergency_Medicine_Physician`, `02_Internship`, `03_Medical_Students`, `04_Paramedic_EMS`, `05_Emergency_Nursing`, `06_General_Practitioner`, and `07_Shared_Medical_Core`.

A candidate with an absent, conflicting, or inferred track is **REVIEW_REQUIRED and blocked**, not silently placed into the Internship or Resident pathway. The same applies to absent taxonomy ID/version, ambiguous audience, unresolved edition, or a source that mixes professional levels without an explicit governed relationship.

## Medical-content state machine for future handoff

The current content plan defines the following controlled sequence: `pending-intake` → `under-review` → `approved` or `rejected`; an approved record may later become `withdrawn`, and withdrawal does not automatically restore approval. [2]

| Gate | Required evidence | Current result for this package |
|---|---|---|
| Source handoff | Identifiable owner/publisher and immutable intake location | **BLOCKED** |
| Read-only intake | Inventory, version, checksum, locator, track, taxonomy, and audit fields | **BLOCKED** |
| Rights/provenance review | Text/image use, license/evidence locator, display scope | **BLOCKED** |
| Medical review | Qualified reviewer, decision, date, and source references | **BLOCKED** |
| Governance registration | Reproducible record and append-only events | **BLOCKED** |
| Adapter authorization | Explicit target scope, tests, and rollback | **NOT AUTHORIZED** |
| Controlled publication | Approved target/branch and repository safety evidence | **NOT AUTHORIZED** |
| Learner exposure | Approved record only, with fallback for unavailable/withdrawn content | **BLOCKED** |

## Proposed future mapping boundary

The safe future relationship is:

```text
Immutable source artifact
        ↓
Source/version/hash/rights registry
        ↓
Read-only intake and review queue
        ↓
SEG_CONTENT_RECORD_V1_1 validation
        ↓
Independent medical and rights decisions
        ↓
Authorized adapter to YaAllah Prisma/Supabase
        ↓
Approved-only exposure
```

No step in the supplied package authorizes bypassing the queue, replacing the canonical source, or converting a draft into a production record. Derived content must be a separate traceable artifact and must never replace the original source. [2]

## Minimum evidence required before a candidate can leave review

A future content handoff must provide the exact source package, source owner, version/edition, SHA-256 for each source file, precise locators, language, rights decision and evidence locator, explicit professional track and taxonomy version, references, medical reviewer and decision, audit events, and a valid schema-conformant record. It must also demonstrate that no unauthorized track mixing, duplicate identity, broken lineage, or unreviewed clinical update is present.

Even if structural validation passes, the overall handoff remains blocked until independent clinical and rights evidence is complete. A structural pass is not clinical approval.

## Validation and non-actions

| Check | Result |
|---|---|
| Attachment fingerprinted | **PASS** |
| Medical source artifacts included in attachment | **NO** |
| Production JSON included | **NO** |
| Exact source hashes included | **NO** |
| Rights evidence included | **NO** |
| Medical-review evidence included | **NO** |
| Track/taxonomy assignments included | **NO** |
| Content modified | **NO** |
| Clinical correctness certified | **NO** |
| Approval granted | **NO** |
| Database import executed | **NO** |
| Code or schema changed | **NO** |
| Git operation executed | **NO** |

## Final status

**Content transfer status: REVIEW_REQUIRED — TRANSFER BLOCKED**

The reusable result is the governance envelope, duplicate-detection objective, immutable hashing requirement, and approved-only adapter boundary. No medical content from `pasted_content_26.txt` is accepted, adapted into a record, imported, activated, or merged.

## References

[1]: file:///home/ubuntu/upload/pasted_content_26.txt "Supplied pasted_content_26 extraction package; content section and claims at lines 92-110"  
[2]: file:///home/ubuntu/projects/seeeeeeeg-aadd8500/SEG_CONTENT_INTEGRATION_PLAN.md "SEG governed content integration plan"  
[3]: file:///home/ubuntu/seg-manus-status/SEG_CONTENT_LIBRARY/manifest.schema.json "Canonical SEG content-record manifest schema"  
[4]: file:///home/ubuntu/skills/seg-content-qa/SKILL.md "SEG read-only content QA and governance gates"  
[5]: file:///home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG source metadata, provenance, rights, and track rules"  
