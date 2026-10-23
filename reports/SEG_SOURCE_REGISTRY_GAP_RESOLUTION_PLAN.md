# SEG Source Registry Gap Resolution Plan

**Mode:** Evidence Management Only — Controlled Read-Only

**Date:** 2026-08-22

**Final status:** `SOURCE_GOVERNANCE_GAP_MATRIX_COMPLETE`

## 1. Purpose and control boundary

This document converts the latest SEG source-governance evidence into an actionable **gap-resolution matrix**. It does not normalize content, create mappings, define or modify database contracts, create production records, import files, or activate content. It is a planning artifact only. All source families remain subject to the sequence **evidence → governance review → clinical review → approval → later normalization/import**, with no step skipped.

The authoritative SEG target remains the YaAllah GitLab architecture: Next.js, Prisma, Supabase, and `seg-design-system`. The recovered Manus/KISSCRISIS materials are evidence and reference artifacts only. No item in this plan authorizes Vite, Express, Drizzle, Manus OAuth, SQL, Prisma changes, Zod contracts, or database writes.

## 2. Priority definitions

| Priority | Meaning | Effect |
|---|---|---|
| **P0** | Platform-level governance blocker | Blocks the next source-processing phase for all affected source families and blocks any normalization, contract work, mapping, or import that would treat unresolved governance evidence as settled. |
| **P1** | Source-specific blocker | Blocks progression for the named source family or representation, but does not by itself decide unrelated source families. |
| **P2** | Quality improvement before publication | Does not necessarily block evidence intake, but must be completed before any learner-facing publication or equivalent activation. |

A priority does not waive any gate. A source cannot progress merely because a P0 or P1 item is marked resolved; the evidence must be independently attached, fingerprinted, reviewed, and recorded in the governed registry.

## 3. Cross-source P0 controls

The following controls are common to the entire package and are treated as P0 because they govern all subsequent source handling:

| Gap ID | Required closure evidence | Why it is P0 | Closure test |
|---|---|---|---|
| **SRG-P0-001** | A canonical source identity record for every family: title, publisher/owner, author where available, edition/version, date, and original locator. | Without stable identity, the artifact cannot be distinguished from a representation, duplicate, derivative, or unrelated file. | Each source has an authoritative identity citation or owner-supplied evidence; “recovered” or filename alone is insufficient. |
| **SRG-P0-002** | A complete provenance chain from original source through extraction event and recovery artifact to the existing registry entry. | File integrity does not prove origin, extraction circumstances, or registry lineage. | Each link has an evidence reference, timestamp/event identifier where available, and matching artifact SHA. |
| **SRG-P0-003** | Rights decision with evidence locator and scope. | No source may be normalized, imported, or exposed without a supported rights state. | License/permission/rights notice is attached to the exact source or artifact and covers the proposed SEG use. |
| **SRG-P0-004** | Governance review assignment and medical-review gate definition. | A technical recovery does not constitute clinical validation or approval. | A named specialty reviewer or approved assignment record exists, with review scope, unresolved issues, decision state, and approval evidence requirements. |
| **SRG-P0-005** | Audit-event requirements for intake, hashing, recovery, rights review, clinical review, and subsequent decisions. | The recovery process must remain traceable and reversible. | Append-only evidence events identify actor/process, time, source ID, artifact path/member, SHA, outcome, and next gate. |
| **SRG-P0-006** | Professional-track decision with explicit handling of shared versus advanced material. | Mixing Internship, Resident, Shared Core, and Advanced content would violate SEG track separation. | A track decision is made from source scope and reviewer evidence; no automatic inference from filenames or difficulty labels. |

**P0 disposition:** These are not closed by the current recovery package. The package improves file availability and checksum evidence but does not complete identity, rights, clinical-review, track, or audit closure for all families.

## 4. Source-family resolution matrix

### 4.1 OSCE Atlas Package

| Gap area | Current state | Missing evidence | Priority | Resolution evidence required | Progression block |
|---|---|---|---|---|---|
| Identity | Recovered OSCE text and an archive containing 14 PNG members are present; the source family is identified as OSCE/emergency-medicine imaging in the recovery evidence. | Canonical title, publisher/owner, author/editor, edition/version, publication date, and original locator are not fully established. | P0 | Owner/source citation or original package documentation linked to the recovered archive and text. | Blocks governed Atlas/source closure. |
| Provenance | Recovery package contains archive/member evidence, manifest data, and per-member SHA verification. | Original source → extraction event → recovery event → registry-entry relationship is not fully evidenced. | P0 | Extraction/recovery event records with member paths and exact SHA lineage. | Blocks Atlas registry/mapping. |
| Rights | No package-level permission or license evidence is sufficient for Atlas/PNG use. | Rights holder, license scope, derivative/display permission, and evidence locator. | P0 | Rights evidence covering the text and each visual member or the governing archive license. | Blocks visual use and publication. |
| Medical review | Visual validation notes exist, but they are not clinical approval. | Specialty reviewer, imaging/OSCE review scope, clinical conflicts, and approval decision. | P0 | Named emergency-medicine/appropriate imaging reviewer and append-only review decision. | Blocks clinical use and activation. |
| Track | Likely relevant to Internship and/or Resident OSCE, but no final track decision is authorized from filenames alone. | Explicit Internship versus Resident versus Shared Core classification. | P1 | Track decision based on intended curriculum and reviewer evidence. | Blocks pathway assignment. |
| Audit | Archive and member fingerprints are available. | Complete event lineage and future decision events. | P1 | Closure event specification and evidence references. | Blocks publication audit completeness. |

**Allowed next step:** obtain source-owner/rights/identity evidence and assign clinical/track reviewers. Do not create Atlas records, content mappings, or N:M links.

### 4.2 Drug HTML Artifact

| Gap area | Current state | Missing evidence | Priority | Resolution evidence required | Progression block |
|---|---|---|---|---|---|
| Identity | `deepseek_html_20260615_a3266b.html` is present with verified SHA `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac`; structural review recorded 19 sections, 21 quick summaries, 47 drug entities, and 20 exam-trap entries. | Canonical source title, original publisher/owner, author/editor, edition/version, publication date, and original locator are not evidenced by the HTML alone. | P0 | Source-level citation or owner statement tying the HTML to the canonical source. | Blocks governed drug-content progression. |
| Provenance | Artifact SHA and extraction identity are known. | Original source and extraction-event evidence, including the tool/context that produced the HTML. | P0 | Extraction log/event with source locator, timestamp, process identity, and artifact SHA. | Blocks lineage closure. |
| Rights | No confirmed permission for the HTML or derived medical content is recorded. | Rights/license evidence and intended SEG use scope. | P0 | License/permission or documented public-use basis with locator. | Blocks normalization/import/display. |
| Medical review | Structural review exists; no clinical approval is implied. | Emergency-medicine/clinical pharmacology reviewer, dose/interactions scope, conflicts, and approval evidence. | P0 | Review assignment, issue register, and signed/recorded decision. | Blocks medical content use. |
| Track | May support Shared Core, Internship, and/or Advanced material; no automatic track assignment is allowed. | Explicit per-section or source-level track rationale. | P1 | Curriculum owner decision with reviewer evidence. | Blocks track-separated derivative work. |
| Audit | SHA and structural counts exist. | Source, rights, clinical, and later decision events. | P1 | Append-only event references. | Blocks publication audit completeness. |

**Allowed next step:** close identity, rights, clinical reviewer, and track evidence. Do not convert the HTML into a contract or records.

### 4.3 Pretest Package

| Gap area | Current state | Missing evidence | Priority | Resolution evidence required | Progression block |
|---|---|---|---|---|---|
| Identity | Recovered Pretest representations are present; the previous registry identifies the family/representation but does not close canonical bibliographic identity. | Canonical title, publisher/owner, authors, edition/version, date, and original locator. | P0 | Original package/source citation and edition evidence. | Blocks Pretest-specific progression. |
| Provenance | Recovery package preserves a representation and prior SHA `UPD811-007` is recorded for the all-chapters representation; separate representation handling is preserved. | Complete source-to-extraction-to-recovery chain, plus restoration history for corrupted OCR/extraction. | P0 | Restoration/recovery event with original and recovered SHAs, member/path evidence, and no silent rewrite. | Blocks safe normalization. |
| Rights | No closure evidence is recorded. | Rights holder and license/permission scope for the recovered representation and any derivative use. | P0 | Rights evidence with exact locator. | Blocks import/display. |
| Medical review | Earlier records identify OCR corruption/source-restoration concerns; no clinical approval. | Specialty reviewer, question/explanation review scope, corrupted sections, conflicts, and approval evidence. | P0 | Restoration acceptance plus medical-review decision and issue log. | Blocks clinical use. |
| Track | Could relate to Internship, Resident/Board Prep, or Shared Core; no inference is permitted. | Explicit pathway classification. | P1 | Curriculum/medical-owner track decision. | Blocks pathway-specific derivatives. |
| Audit | Representation SHA and restoration concern are recorded. | Append-only restoration, rights, medical-review, and decision events. | P1 | Event evidence linked to each representation. | Blocks audit-complete publication. |

**Allowed next step:** restore/verify the original source evidence and document the restoration event. Do not normalize corrupted text or merge representations.

### 4.4 1400 Questions Package

| Gap area | Current state | Missing evidence | Priority | Resolution evidence required | Progression block |
|---|---|---|---|---|---|
| Identity | Two recovered representations are kept separate: a study-guide representation and a questions/explanations representation, with README evidence. | Canonical title, publisher/owner, authors, edition/version, date, and original locator for each representation/family. | P0 | Source/owner documentation and edition evidence. | Blocks 1400q progression. |
| Provenance | Separate packages and README evidence preserve non-merging. | Original source and extraction-event evidence, plus explicit registry relationships for both representations. | P0 | Per-package source-to-recovery lineage and SHA references. | Blocks mapping/normalization. |
| Rights | No confirmed permission/license is recorded. | Rights status and allowed SEG use for study guide and question/explanation components. | P0 | Exact rights evidence for each component or family. | Blocks import/display. |
| Medical review | No medical approval is established. | Emergency-medicine/education reviewer, question accuracy scope, conflicts, and approval evidence. | P0 | Review plan and recorded decision for each component. | Blocks clinical publication. |
| Track | Could support Internship, Resident/Board Prep, or Shared Core; separate representations do not resolve track. | Explicit track decision. | P1 | Track classification with owner/reviewer rationale. | Blocks pathway assignment. |
| Audit | Separate package structure and SHA evidence are available. | Complete extraction/recovery and governance event lineage. | P1 | Append-only event set. | Blocks audit-complete publication. |

**Allowed next step:** close bibliographic, rights, reviewer, and track evidence independently for the guide and QBank/explanations. Do not merge them.

### 4.5 HIPPO High Yield

| Gap area | Current state | Missing evidence | Priority | Resolution evidence required | Progression block |
|---|---|---|---|---|---|
| Identity | HIPPO High Yield is listed as a distinct source family in the registry/recovery context. | Canonical title, publisher/owner, author/editor, edition/version, date, and original locator are not closed. | P0 | Source-owned bibliographic evidence. | Blocks HIPPO HY progression. |
| Provenance | Family-level registry/recovery references exist. | Artifact-specific extraction/recovery lineage and registry relationship. | P0 | Exact artifact path/SHA and extraction/recovery events. | Blocks governed derivative work. |
| Rights | Pending/unknown in the current evidence set. | License/permission and display/derivative scope. | P0 | Rights evidence from owner/publisher or applicable license. | Blocks import/display. |
| Medical review | No closed review decision is present. | Emergency-medicine reviewer, domain scope, unresolved conflicts, and approval evidence. | P0 | Named reviewer and decision record. | Blocks clinical use. |
| Track | Likely Advanced Reference and/or Resident/Board Prep, but not final. | Explicit separation from Internship and Shared Core. | P1 | Track decision with curriculum rationale. | Blocks pathway assignment. |
| Audit | Family is preserved as distinct. | Artifact-level audit events and decision history. | P1 | Append-only event chain. | Blocks publication audit completeness. |

**Allowed next step:** recover and attach source-specific identity, rights, and clinical-review evidence. Keep HIPPO HY separate from HIPPO QBank.

### 4.6 HIPPO QBank

| Gap area | Current state | Missing evidence | Priority | Resolution evidence required | Progression block |
|---|---|---|---|---|---|
| Identity | HIPPO QBank is tracked separately from HIPPO High Yield. | Canonical question-bank title, owner/publisher, authors/editors, edition/version, date, and original locator. | P0 | Source-owned identity evidence. | Blocks QBank-specific progression. |
| Provenance | Separate family label is retained. | Per-artifact extraction/recovery lineage and registry relationship. | P0 | Artifact manifest and event chain. | Blocks normalization. |
| Rights | Not confirmed. | License/permission for question text, answers, explanations, and derivative educational use. | P0 | Rights evidence with scope. | Blocks import/display. |
| Medical review | No complete medical approval evidence. | Emergency-medicine/question-bank reviewer, domain scope, conflicts, and approval evidence. | P0 | Review assignment and decision per package/edition. | Blocks clinical publication. |
| Track | Likely Resident/Board Prep or Advanced Reference; must not be merged with Internship without evidence. | Final professional-track classification. | P1 | Track review decision. | Blocks pathway separation. |
| Audit | Family separation is known. | Artifact-level source/recovery/rights/clinical events. | P1 | Append-only events. | Blocks release audit completeness. |

**Allowed next step:** resolve QBank-specific identity and rights separately from HIPPO HY. No combining by publisher name alone.

### 4.7 FRCEM Representations

| Gap area | Current state | Missing evidence | Priority | Resolution evidence required | Progression block |
|---|---|---|---|---|---|
| Identity | Multiple FRCEM representations are registered and duplicate/representation lineage is preserved; prior registry entries include `UPD811-001`, `UPD811-003`, `UPD811-004`, `UPD811-009`, and `UPD811-011`. | Canonical title/volume, publisher/owner, author/editor, edition/version, date, and original locator for each representation. | P0 | Per-representation bibliographic evidence and duplicate relationship evidence. | Blocks FRCEM-specific progression. |
| Provenance | Existing registry records preserve representation relationships. | Source-to-extraction-to-recovery evidence and per-representation artifact SHA linkage are incomplete. | P0 | Representation-level lineage chain and fingerprint evidence. | Blocks safe deduplication/normalization. |
| Rights | Not closed. | Rights evidence for every FRCEM representation and proposed SEG use. | P0 | Exact license/permission evidence. | Blocks import/display. |
| Medical review | No closed approval is recorded. | Emergency-medicine/FRCEM-aligned reviewer, domain scope, conflicts, and approval evidence. | P0 | Named reviewer and decision record per representation/family. | Blocks clinical publication. |
| Track | May align to Emergency Medicine Resident/Board Prep and Advanced Reference; no mixing with Internship is allowed without evidence. | Final track decisions per representation/module. | P1 | Curriculum owner/reviewer classification. | Blocks pathway assignment. |
| Audit | Duplicate/representation history is preserved. | Full audit events for identity, rights, review, and future canonical decisions. | P1 | Append-only event chain. | Blocks release audit completeness. |

**Allowed next step:** obtain authoritative edition/rights evidence and review each representation separately. Do not delete, merge, or replace any representation.

### 4.8 Oxford Reference

| Gap area | Current state | Missing evidence | Priority | Resolution evidence required | Progression block |
|---|---|---|---|---|---|
| Identity | An Oxford representation is recorded in the prior registry as `UPD811-008`; local evidence may identify a PDF/title/author, but official canonical identity is not closed. | ISBN or equivalent identifier, edition, publisher/imprint, publication date, author/editor confirmation, and original locator. | P0 | Official bibliographic record or publisher evidence. | Blocks Oxford progression. |
| Provenance | Representation-level registry evidence exists. | Complete source/extraction/recovery chain and exact artifact relationship. | P0 | Source and event evidence with SHA. | Blocks normalization. |
| Rights | Unknown/pending. | License/permission for copying, derivative use, display, and educational distribution. | P0 | Rights evidence from Oxford/publisher or applicable license. | Blocks import/display. |
| Medical review | No final medical review is evidenced. | Appropriate emergency-medicine/clinical-domain reviewer, scope, conflicts, and approval evidence. | P0 | Review assignment and decision record. | Blocks clinical publication. |
| Track | Could be Shared Core, Internship support, Resident support, or Advanced Reference depending on the exact title; cannot be inferred. | Explicit track classification. | P1 | Curriculum-owner and clinical-review decision. | Blocks pathway assignment. |
| Audit | Prior representation identity is preserved. | Full identity/rights/review decision trail. | P1 | Append-only event events. | Blocks publication audit completeness. |

**Allowed next step:** obtain official Oxford bibliographic and rights evidence before assigning a pathway or proceeding to normalization.

### 4.9 Clinical Images

| Gap area | Current state | Missing evidence | Priority | Resolution evidence required | Progression block |
|---|---|---|---|---|---|
| Identity | No source-specific Clinical Images artifact, inventory, or closed registry evidence is present in the current evidence set. | Canonical source collection/title, owner, creator/author, edition/version/date, and original locator for every image or governed collection. | P0 | Source inventory and authoritative origin evidence. | Blocks the Clinical Images family completely. |
| Provenance | No original-source-to-recovery chain is available for this family. | Original source, extraction event, recovery artifact, and registry relationship. | P0 | Per-image or governed-collection lineage with file SHA and event IDs. | Blocks any asset handling. |
| Rights | Unknown because no source-specific artifact/rights evidence is available. | Rights holder, consent where applicable, license scope, derivative/display permission, and restrictions. | P0 | Per-image/collection rights evidence and consent/permission evidence as applicable. | Blocks all use. |
| Medical review | No clinical-image review package is available. | Specialty reviewer, diagnostic/educational scope, de-identification/privacy review, conflicts, and approval evidence. | P0 | Named reviewer, image-level review requirements, and decision records. | Blocks clinical publication. |
| Track | Cannot be assigned from absence of source evidence. | Explicit Internship/Resident/Shared Core/Advanced classification. | P1 after P0 source recovery | Track decision based on verified source and curriculum use. | Blocks pathway assignment. |
| Audit | No artifact-level audit chain is present. | Intake, hash, provenance, rights, privacy, medical, and activation-decision events. | P0 | Append-only event chain. | Blocks all progression. |

**Allowed next step:** recover source-specific image artifacts and rights/privacy evidence. Do not substitute OSCE PNGs for Clinical Images or create placeholders.

## 5. Recommended resolution order

| Sequence | Work package | Sources | Exit evidence | Permitted after exit |
|---:|---|---|---|---|
| 1 | Common governance baseline | All families | P0 identity/provenance/rights/reviewer/track/audit templates and owners are established as evidence requirements, not database schemas. | Evidence collection only. |
| 2 | Source recovery and identity closure | Clinical Images, OSCE, Pretest, 1400q, Drug HTML | Original locators, identity citations, edition/version, owner, and artifact/member fingerprints. | Source-level review preparation. |
| 3 | Rights closure | All families | Rights evidence with scope and exact locators; restricted/unknown states remain explicit. | Rights review queue may proceed; no import. |
| 4 | Clinical and track review | Medical source families and images | Named specialty reviewer, domain scope, unresolved-conflict list, track decision, and approval evidence. | Governance decision preparation; no activation. |
| 5 | Registry closure decision | Each family independently | Closure record links all preceding evidence and retains unresolved issues. | Readiness decision for later normalized-pilot planning only. |
| 6 | Separate later technical design gate | Only after governance closure | Explicit authorization for contract/mapping work. | A future task may evaluate normalization, but this document does not authorize it. |

## 6. Global blockers

The current package is **not ready for normalization** because the following remain open: canonical identity for multiple families; original locator evidence; rights/permission scope; named clinical reviewers and approval evidence; final pathway classification; complete source-to-extraction-to-recovery lineage; and append-only audit events. Pretest additionally retains the source-restoration/OCR concern. Clinical Images remains unsubstantiated as a source family. OSCE recovery improves file evidence but does not close Atlas rights or clinical governance.

No source should be treated as eligible for Zod contract design, Prisma mapping, normalization, import, seed, learner exposure, or activation until its own closure evidence is complete and a separate authorization is issued.

## 7. Required evidence package per source

Every source family must eventually provide the following evidence bundle, without rewriting the source payload:

1. An identity citation containing canonical title, owner/publisher, author where available, edition/version, date, and original locator.
2. A cryptographic fingerprint for the exact recovered artifact and, where applicable, archive member or image file.
3. A provenance chain that names the original source, extraction event, recovery artifact, and registry relationship.
4. A rights record with rights state, scope, evidence locator, restrictions, and reviewer/decision event.
5. A medical-review record with specialty, domain, unresolved conflicts, decision, reviewer identity, and approval evidence requirement.
6. A professional-track decision that keeps Internship, Emergency Medicine Resident, Shared Core, and Advanced Reference separate.
7. An append-only audit trail for all intake, recovery, evidence, review, and decision events.

## 8. Final governance decision

**`SOURCE_GOVERNANCE_GAP_MATRIX_COMPLETE`**

This is a complete gap-resolution plan, not a governance approval. All unresolved evidence remains open, and the next allowed phase is **evidence acquisition and reviewer assignment**, not normalization or import.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_SOURCE_REGISTRY_GOVERNANCE_CLOSURE_REPORT.md "SEG Source Registry Governance Closure Report"
[2]: file:///home/ubuntu/seg-internship-output/SEG_SOURCE_EVIDENCE_RECOVERY_VALIDATION_REPORT.md "SEG Source Evidence Recovery Validation Report"
[3]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md "SEG Phase 7.8.11 Updated Source Registry"
[4]: file:///home/ubuntu/seg-internship-output/SEG_DRUG_HTML_SOURCE_REVIEW.md "SEG Drug HTML Source Review"
[5]: file:///home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG Metadata Source Mapper Governance Rules"
[6]: file:///home/ubuntu/skills/seg-content-qa/SKILL.md "SEG Content QA Governance Rules"
[7]: file:///home/ubuntu/skills/database-foundation/SKILL.md "SEG Database Foundation Governance Rules"
[8]: file:///home/ubuntu/skills/seg-project-continuity/SKILL.md "SEG Project Continuity Governance Rules"
