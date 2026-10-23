# SEG Targeted Evidence Closure Plan

**Mode:** `CONTROLLED GOVERNANCE ONLY`  
**Assessment date:** `2026-08-22`  
**Authority:** YaAllah GitLab / SEG governance records remain the primary source of truth. The KISSCRISIS/manus repository remains reference-only.  
**Plan status:** `SEG_TARGETED_EVIDENCE_CLOSURE_PLAN_COMPLETE`  
**Normalization status:** `NORMALIZATION_BLOCKED`

## 1. Executive Decision

This document converts the current SEG handoff, Master Source Registry, and Evidence Closure Decision into a source-specific evidence-closure plan. It is a planning and governance artifact only. It does not close any evidence gate, approve any source, validate clinical content, authorize normalization, create mappings, create records, import content, activate learner exposure, or authorize database or repository changes. [1] [2] [3]

The plan covers eight content-source entries and one separate tool track. The eight content-source entries are Drug HTML, OSCE Atlas, PreTest, HIPPO High Yield, HIPPO QBank, FRCEM Representations, Clinical Images, and the Hamilton Ventilator Clinical Engineering Guide. JEM Nexus remains a separate tool/reference track and is not silently added to the content-source registry. [1] [2] [4]

The current decision is to preserve every candidate in controlled internal evidence review and to obtain attributable identity, rights, provenance, exact-representation review, and track evidence before reconsideration. No candidate is currently ready for normalization. [1] [2]

> **Targeted closure decision:** Obtain evidence source by source, assign the required review roles, record conflicts and audit decisions, and only then reconsider Evidence Closure. Do not bypass the sequence `SOURCE → EVIDENCE → RECOVERY → CLOSURE → TARGETED EVIDENCE CLOSURE → NORMALIZATION ONLY IF APPROVED`.

## 2. Interpretation of the Autonomous Command Package

The supplied autonomous command package authorizes continuation of the governance workflow, but its continuation language is bounded by the package restrictions and the existing SEG project governance. The allowed immediate deliverable is this targeted evidence-closure plan. The package does not override the standing prohibition on normalization of blocked sources, database changes, migrations, seeds, SQL, Prisma, Zod, mappings, imports, activation, publication, or learner exposure. [3]

The package also describes a later repository/GitHub handoff. That later action remains outside this plan and is not authorized by the current evidence-closure stage. No Git operation, repository modification, upload, or final project package publication is performed or scheduled by this document. [3]

## 3. Current Governance Boundary

The Master Source Registry records seven established source families and the Hamilton intake candidate. Seven established families remain `BLOCKED_PENDING_EVIDENCE`; Hamilton remains `BLOCKED_PENDING_REVIEW`. All eight content-source entries remain `INTERNAL_REFERENCE_ONLY` / `WAITING_FOR_EVIDENCE`, and none is normalization-ready. [1]

JEM Nexus is governed separately as a tool/reference candidate. Its Evidence Closure report records `EXTERNAL_EVIDENCE_REQUIRED`, `BLOCKED_PENDING_EVIDENCE`, and `INTERNAL_REFERENCE_ONLY`; it must not be treated as a registered content source or converted into `SEG_CONTENT_RECORD_V1_1` without a separate authorized decision. [4]

## 4. Reviewer Roles and Evidence Ownership

The following are role assignments, not named-person assignments. No reviewer is considered assigned, and no approval is implied, until the SEG governance process records the assignment and the reviewer accepts the scope.

| Role | Required responsibility | Required output |
|---|---|---|
| Medical Reviewer | Review the exact retained representation for clinical correctness, scope, warnings, doses, interpretation, and unresolved conflicts. | Signed or otherwise attributable clinical review decision with conflict disposition. |
| Rights Reviewer | Verify ownership, license, permission, redistribution, hosted-use, and third-party rights for the exact artifact and intended SEG use. | Rights evidence packet and decision: confirmed, restricted, pending, or unknown. |
| Provenance Reviewer | Verify the chain from original source through extraction and recovery to the SEG registry entry, including source-versioned locators. | Traceable provenance record with evidence references and confidence. |
| Visual Quality Reviewer | Review image legibility, fidelity, cropping, labels, visual safety, and source-specific image lineage. | Visual review findings and disposition. |
| Accessibility Reviewer | Review alternative text, contrast, text legibility, non-visual access, and accessibility metadata for retained visual assets. | Accessibility review findings and remediation/acceptance decision. |
| Technical Reviewer | Review software, device, file, representation, reproducibility, calculations, dependencies, and technical correctness as applicable. | Technical review report with unresolved issues and disposition. |
| Security Reviewer | Review authentication, authorization, data flow, secrets, logging, retention, external services, isolation, and abuse controls. | Security review decision and required controls. |
| SEG Evidence Owner | Coordinate requests, preserve evidence, maintain immutable artifact references, and prevent unsupported promotion. | Complete evidence packet with custody and audit trail. |
| External Source Owner/Publisher | Supply attributable identity, version, rights, original locator, and authoritative documentation where available. | Owner-controlled or otherwise attributable evidence. |

## 5. Source-by-Source Targeted Closure Plan

### 5.1 Drug HTML Artifact

| Field | Targeted closure decision |
|---|---|
| Source identity | Existing registry identity remains incomplete. Obtain canonical title, publisher/owner, author or responsible organization, version/date, original locator, and an attributable relationship to the retained HTML artifact. |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Evidence state | `PARTIALLY_CONFIRMED`; the registered HTML SHA-256 is recorded and matched, but byte integrity does not establish source identity, rights, or clinical validity. [1] |
| Missing evidence | Canonical source identity; original-source locator; source/version relationship; rights and redistribution permission; extraction/provenance chain; exact-artifact Emergency Medicine medication review; conflict disposition; source-specific audit evidence. |
| Required reviewer role | Medical Reviewer with Emergency Medicine/pharmacotherapy competence; Rights Reviewer; Provenance Reviewer; Technical Reviewer for HTML integrity/representation. |
| Evidence owner | SEG Evidence Owner coordinates the packet; external publisher/owner or attributable source custodian must supply identity and rights evidence. No person is assumed to be the owner. |
| Closure criteria | Identity and version are independently attributable; rights cover internal SEG use and any later intended use; original-to-extraction-to-artifact lineage is documented; the exact retained HTML representation receives medical review; conflicts and review decisions are recorded. |
| Allowed next action | Request the attributable identity, rights, provenance, and exact-artifact medication-review packet. Preserve the artifact internally only; do not normalize, map, import, or publish. |

The existing hash match is a recovery fact only. It does not close the canonical identity or medication-safety gate. [1] [2]

### 5.2 OSCE Atlas Package

| Field | Targeted closure decision |
|---|---|
| Source identity | Obtain the original atlas title, owner/publisher, edition/version, date, original PDF or authoritative locator, and the relationship between the recovered package, text, and 14 PNG files. |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Evidence state | `PARTIALLY_CONFIRMED`; recovery container, inner package, text, and 14 PNG evidence are recorded. [1] |
| Missing evidence | Original PDF/owner; text rights; image ownership and rights; image-to-source lineage; source-specific locators; OSCE clinical review; visual quality review; accessibility review; completeness evidence for the recovered atlas. |
| Required reviewer role | Medical Reviewer with OSCE/Emergency Medicine competence; Rights Reviewer; Provenance Reviewer; Visual Quality Reviewer; Accessibility Reviewer; Technical Reviewer for package integrity. |
| Evidence owner | SEG Evidence Owner coordinates recovery and custody; the original owner/publisher or attributable rights holder must supply source and rights evidence. |
| Closure criteria | The original authority and version are established; every retained text/image representation is traceable; rights permit the intended SEG use; the exact text and images receive clinical, visual, and accessibility review; completeness and unresolved conflicts are documented. |
| Allowed next action | Obtain the original atlas/authority and image-rights packet, reconcile the 14 PNGs to source locators, and queue role-based review. Do not create Atlas records, content mappings, N:M links, or learner exposure. |

OSCE PNGs remain a separate source family. They cannot close the standalone Clinical Images gap. [1] [5]

### 5.3 PreTest Question Package

| Field | Targeted closure decision |
|---|---|
| Source identity | Obtain the authoritative `pretestnew.pdf` or equivalent owner-controlled source, canonical title, publisher/author, edition/version/date, and original locator. |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Evidence state | `PARTIALLY_CONFIRMED`; the recovered representation matches registered `UPD811-007` hash, but the authoritative package and source identity remain open. [1] |
| Missing evidence | Authoritative source artifact; rights; OCR-to-source comparison; provenance; source-versioned question locators; completeness; role-based assessment review; ambiguity and conflict disposition. |
| Required reviewer role | Medical Reviewer with Emergency Medicine/assessment competence; Rights Reviewer; Provenance Reviewer; Technical Reviewer for OCR and representation integrity. |
| Evidence owner | SEG Evidence Owner coordinates recovery; the source owner/publisher or attributable rights holder must provide the authoritative representation and rights evidence. |
| Closure criteria | The authoritative representation is identified and preserved; OCR differences are reconciled; rights and provenance are closed; question completeness and numbering are evidenced; the exact assessment representation receives qualified clinical and assessment review. |
| Allowed next action | Recover or obtain the authoritative `pretestnew.pdf`, produce a read-only OCR comparison and source locator packet, and assign role-based review. Do not normalize questions or create assessment records. |

The registered hash match confirms representation identity only; it does not prove that OCR is complete or clinically accurate. [1] [2]

### 5.4 HIPPO High Yield

| Field | Targeted closure decision |
|---|---|
| Source identity | Establish canonical title, publisher/owner, author/organization where available, edition/version/date, and original locator for the High Yield source and each retained representation. |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Evidence state | `PARTIALLY_CONFIRMED`; text, colored PDF, and DOCX representations are available and checksum-verifiable. [1] |
| Missing evidence | Canonical identity/version; representation-specific rights; original-to-extraction provenance; representation locators; professional-track evidence; exact-representation clinical review; completeness and conflict disposition. |
| Required reviewer role | Medical Reviewer with Emergency Medicine/critical-care competence as applicable; Rights Reviewer; Provenance Reviewer; Technical Reviewer for representation fidelity; track/taxonomy reviewer through SEG governance. |
| Evidence owner | SEG Evidence Owner coordinates the packet; publisher/owner or attributable rights holder must establish identity and permitted use. |
| Closure criteria | All representations are tied to one canonical source/version or explicitly separated; rights cover each retained representation; provenance and locators are complete; track evidence is documented; the exact representation receives clinical review and conflict decisions. |
| Allowed next action | Obtain identity/version and representation-specific rights/provenance evidence, then queue exact-representation clinical and track review. Keep all representations internal and unnormalized. |

Checksum verification of multiple representations does not by itself establish that they are complete, authorized, or clinically current. [1] [2]

### 5.5 HIPPO QBank

| Field | Targeted closure decision |
|---|---|
| Source identity | Obtain official title, publisher/owner, author/organization, edition/version/date, canonical source locator, and any question-bank release identity. |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Evidence state | `PARTIALLY_CONFIRMED`; the registered QBank text is checksum-verifiable. [1] |
| Missing evidence | Official identity; completeness and numbering; rights; question-level locators; provenance; professional-track evidence; question-level clinical review; ambiguity and conflict disposition. |
| Required reviewer role | Medical Reviewer with Emergency Medicine/question-bank competence; Rights Reviewer; Provenance Reviewer; Technical Reviewer for completeness and numbering; track/taxonomy reviewer. |
| Evidence owner | SEG Evidence Owner coordinates the packet; official publisher/owner or attributable rights holder must provide release and rights evidence. |
| Closure criteria | The official release and completeness are established; all questions have stable source locators; rights and provenance are closed; intended professional track is evidenced; each retained question or defined review unit receives clinical review and documented conflict handling. |
| Allowed next action | Obtain official release/completeness and rights evidence, verify question locators, and assign question-level review. Do not normalize, map, import, or expose questions. |

A checksum-verifiable text file is not sufficient evidence of official completeness or question-level clinical approval. [1] [2]

### 5.6 FRCEM Representations

| Field | Targeted closure decision |
|---|---|
| Source identity | Establish the canonical authority, title, publisher/owner, edition/version/date, and representation-specific original locators for the five retained representations. |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Evidence state | `PARTIALLY_CONFIRMED`; five representations and a byte-identical relationship are recorded. [1] |
| Missing evidence | Canonical authority/version; rights; representation-level locators; original-to-extraction provenance; professional-track review; separate clinical review for study-book and Q&A representations; completeness and conflict disposition. |
| Required reviewer role | Medical Reviewer with Emergency Medicine/FRCEM examination competence; Rights Reviewer; Provenance Reviewer; Technical Reviewer for representation identity; track/taxonomy reviewer. |
| Evidence owner | SEG Evidence Owner coordinates the packet; canonical publisher/owner or attributable rights holder must establish authority and permitted use. |
| Closure criteria | The canonical edition and role of each representation are established; byte identity is documented without treating it as source authority; rights and locators are closed; study-book and Q&A materials receive separate review; professional-track and conflict decisions are recorded. |
| Allowed next action | Obtain canonical authority/version, rights, locators, and provenance; separate the study-book and Q&A review queues; then assign role-based review. Do not merge representations into a normalized source or import them. |

Byte identity is an integrity observation, not evidence that the representations are legally usable, clinically current, or interchangeable for governance purposes. [1] [2]

### 5.7 Clinical Images

| Field | Targeted closure decision |
|---|---|
| Source identity | Recover or independently locate a standalone Clinical Images source package or authoritative locator. Do not use OSCE PNGs as a substitute. |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Evidence state | `NOT_AVAILABLE` for a standalone artifact or source-specific inventory. [1] |
| Missing evidence | Standalone source package or authoritative locator; per-file inventory and SHA-256 values; ownership; rights; original-to-extraction provenance; image review; accessibility review; completeness. |
| Required reviewer role | Rights Reviewer; Provenance Reviewer; Visual Quality Reviewer; Accessibility Reviewer; Medical Reviewer with image-interpretation competence; Technical Reviewer for asset inventory. |
| Evidence owner | SEG Evidence Owner initiates a source-specific recovery request; the original owner/publisher or attributable rights holder must provide authoritative identity and rights evidence. |
| Closure criteria | A standalone source-specific package is identified; every file has stable identity and hash; rights and provenance are closed; images receive medical, visual, and accessibility review; completeness and intended SEG use are documented. |
| Allowed next action | Recover or independently locate a source-specific Clinical Images package and preserve an immutable inventory. Do not substitute OSCE assets, create image records, create links, or publish images. |

The negative recovery result is itself a governance finding, not evidence that the source may be replaced by another image family. [1] [2]

### 5.8 Hamilton Ventilator Clinical Engineering Guide

| Field | Targeted closure decision |
|---|---|
| Source identity | Obtain canonical owner/publisher, exact guide title, edition/version, publication date, original locator, device model/configuration, and applicable software/manual version. |
| Current gate | `BLOCKED_PENDING_REVIEW` |
| Evidence state | `PARTIALLY_CONFIRMED`; the ZIP and embedded 19-page PDF are hash-verified, but the retained bytes do not establish ownership, currency, authority, or permission. [1] |
| Missing evidence | Original-source locator; owner/publisher; edition/version/date; source-to-translation/rewrite provenance; rights for code, PDF, text, translation, and visuals; Emergency Medicine/Critical Care review; biomedical/device technical review; device currency and configuration verification; track/taxonomy decision. |
| Required reviewer role | Medical Reviewer with Emergency Medicine/Critical Care and ventilation competence; Technical Reviewer with biomedical/device and Hamilton configuration competence; Rights Reviewer; Provenance Reviewer; Visual Quality Reviewer and Accessibility Reviewer for retained visuals; track/taxonomy reviewer. |
| Evidence owner | SEG Evidence Owner coordinates the packet; Hamilton or the attributable original owner/publisher must establish authority, version, current manual relationship, and rights. No ownership is inferred from the artifact title or affiliation text. |
| Closure criteria | Canonical authority, device model, configuration, software version, edition/date, rights, and transformation provenance are independently established; the exact guide receives medical and device-qualified technical review; visual/accessibility findings are closed; track/taxonomy is explicitly decided. |
| Allowed next action | Request the current HAMILTON-G5/HAMILTON-S1 operator-manual relationship, exact configuration/software evidence, owner-issued rights packet, transformation provenance, and assign medical/device technical review. Keep the candidate internal and blocked. |

Hamilton is a content-source candidate with an additional device-safety review boundary. Intake and hash verification do not authorize use as a clinical protocol or learner-facing guide. [1] [5]

### 5.9 JEM Nexus Calculator — Separate Tool Track

| Field | Targeted closure decision |
|---|---|
| Tool identity | Obtain original developer/owner, canonical repository or release locator, immutable version/commit, release date, authoritative documentation, and the relationship between the supplied ZIP and the owner-controlled source. |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Evidence state | `PARTIALLY_CONFIRMED`; static artifact identity and inventory are recorded, but the tool remains a separate reference-application candidate. [4] |
| Missing evidence | Formula-by-function validation; authoritative clinical references and editions; units, rounding, thresholds, warnings, dose presets, and boundary testing; intended clinical scope; code/clinical-content rights; dependency and license review; authentication and authorization; API/request validation; privacy/PHI/retention; external AI data-flow and safety; reproducible build; deterministic tests; audit/persistence/isolation; intended-user and track decision. |
| Required reviewer role | Medical Reviewer; Technical Reviewer; Security Reviewer; Rights Reviewer; Provenance Reviewer; track/taxonomy reviewer. Clinical-domain specialists are required for the calculator and dose-presets scope. |
| Evidence owner | SEG Evidence Owner coordinates the packet; the tool developer/owner or attributable source custodian must provide release, rights, documentation, and validation evidence. |
| Closure criteria | Identity, rights, provenance, formula/reference validation, dose review, software/security review, AI data-flow/privacy review, reproducible tests, audit/isolation evidence, and intended-user/track decision are independently documented. A separate tool governance decision must authorize any later dry run. |
| Allowed next action | Assemble the external-evidence packet specified in the JEM closure report and queue medical, rights, technical, and security reviews. Do not execute the application or calculators, call APIs, integrate, map, normalize, import, or expose the tool. |

JEM Nexus is not included in the eight-item Master Source Registry count. Any future registry treatment requires a separate explicit decision. [1] [4]

## 6. Cross-Source Closure Criteria

A source may be reconsidered for Evidence Closure only when all applicable rows below are satisfied with attributable evidence and an append-only governance decision. A verified local file, checksum, static inventory, or recovery completion status cannot substitute for any row.

| Closure domain | Minimum evidence required | Applies to |
|---|---|---|
| Identity | Canonical title, owner/publisher, author/organization where relevant, immutable version/edition, date, and original locator. | All sources and JEM; device configuration additionally applies to Hamilton. |
| Artifact integrity | Exact retained artifact, inventory, SHA-256, representation relationship, and completeness statement. | All sources; standalone per-file inventory additionally applies to Clinical Images and visual assets. |
| Rights | Ownership, license/permission, redistribution/hosted-use scope, third-party assets/dependencies, and restrictions. | All sources; code/AI/service rights additionally apply to Hamilton/JEM. |
| Provenance | Original source → extraction event → recovery artifact → SEG registry relationship, with source-versioned locators. | All sources and Hamilton; tool lineage additionally applies to JEM. |
| Clinical review | Review of the exact retained representation, warnings, interpretation, doses, formulas, conflicts, and intended clinical scope. | All medical content; dose/formula and device review are expanded for Hamilton/JEM. |
| Technical/security review | File/software/device correctness, dependencies, reproducibility, data flow, access, logging, retention, and isolation as applicable. | Digital artifacts as applicable; mandatory expanded review for Hamilton and JEM. |
| Visual/accessibility review | Image fidelity, legibility, labels, alternative text, contrast, non-visual access, and image lineage. | OSCE Atlas, Clinical Images, Hamilton visuals, and any other retained visual assets. |
| Track/taxonomy | Explicit professional-track and taxonomy decision supported by educational scope evidence. | All content sources and JEM tool governance; no automatic assignment. |
| Audit and conflict | Attributable review decisions, unresolved conflicts, disposition, reviewer role, date, and append-only audit event. | Every source/candidate before promotion. |

## 7. Execution Sequence and Promotion Gate

The targeted closure workflow must proceed in the following order for each source. The order prevents a checksum or recovered artifact from being mistaken for permission, clinical approval, or normalization readiness.

```text
Evidence request and custody confirmation
        ↓
Identity and original-locator verification
        ↓
Rights and intended-use verification
        ↓
Original → extraction → recovery → registry provenance closure
        ↓
Completeness and exact-representation review
        ↓
Medical / specialist / visual / accessibility / technical / security review as applicable
        ↓
Conflict disposition and append-only audit decision
        ↓
Evidence Closure Decision reconsideration
        ↓
First Source Ready For Normalization only if separately approved
        ↓
SEG_CONTENT_RECORD_V1_1 only after the authorized normalization phase
```

The first source may enter normalization only after its own evidence packet is complete, internally consistent, independently attributable, and separately approved through the existing SEG governance process. Completion for one source does not promote any other source. No content-source candidate or JEM may bypass this sequence. [1] [2] [3]

## 8. Controlled Non-Actions

This plan performs no external evidence acquisition, no application execution, no calculator execution, no API call, no clinical validation, no rights grant, no reviewer approval, no content rewriting, no schema creation, no Zod or Prisma work, no SQL or migration, no database record creation, no mapping, no import, no seed, no activation, no publication, no learner exposure, no source deletion, no source replacement, no source merge, no application change, no Supabase change, and no Git operation.

The word “owner” in this plan denotes the evidence-responsibility role required to coordinate collection. It does not assert ownership of any source, artifact, code, image, formula, translation, or clinical text.

## 9. Final Status

```text
PLAN_STATUS = SEG_TARGETED_EVIDENCE_CLOSURE_PLAN_COMPLETE
CURRENT_OPERATIONAL_BOUNDARY = NORMALIZATION_BLOCKED
CONTENT_SOURCES_IN_SCOPE = 8
SEPARATE_TOOL_TRACKS_IN_SCOPE = 1
READY_FOR_NORMALIZATION = 0
INTEGRATION_AUTHORIZED = NO
IMPORT_AUTHORIZED = NO
ACTIVATION_AUTHORIZED = NO
GITHUB_HANDOFF_AUTHORIZED = NO
```

> **Final status:** `SEG_TARGETED_EVIDENCE_CLOSURE_PLAN_COMPLETE`
>
> **Next allowed phase:** Execute source-specific evidence requests and role-based review preparation, without promoting any source.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_MASTER_SOURCE_REGISTRY_STATUS.md "SEG Master Source Registry Status"
[2]: /home/ubuntu/seg-internship-output/SEG_EVIDENCE_CLOSURE_DECISION_REPORT.md "SEG Evidence Closure Decision Report"
[3]: /home/ubuntu/upload/SEG_TARGETED_EVIDENCE_CLOSURE_MANUS_AUTONOMOUS_COMMANDS.md "SEG Targeted Evidence Closure and Role-Based Governance Command Package"
[4]: /home/ubuntu/seg-internship-output/SEG_JEM_NEXUS_EVIDENCE_CLOSURE_REPORT.md "SEG JEM Nexus Evidence Closure Report"
[5]: /home/ubuntu/seg-internship-output/SEG_CONTENT_GOVERNANCE_FINAL_HANDOFF.md "SEG Content Governance Final Handoff"

---

**SEG_TARGETED_EVIDENCE_CLOSURE_PLAN_COMPLETE**

**Document control:** Prepared by **Manus AI**. This document records a controlled evidence-closure plan only. It does not approve, normalize, map, import, activate, publish, replace, merge, delete, or modify any medical source or production system.

Generated using the existing SEG governance evidence and preserving the distinction between established content sources, Hamilton intake, and the separate JEM Nexus tool track.

