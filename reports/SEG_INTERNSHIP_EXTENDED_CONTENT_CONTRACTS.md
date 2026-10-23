**Phase:** 6.1 — Content Contract Extension & Governance Closure  
**Mode:** `READ_ONLY GOVERNED DESIGN`  
**Generated at (UTC):** `2026-08-17T20:14:42Z`  
**Design status:** Candidate contracts and closure plans only; no production schema, JSON, import, approval, or activation.

# SEG Internship Extended Content Contracts

## 1. Purpose and boundary

This document defines **candidate contract extensions** identified by the Phase 6.0 dry run. It does not amend the canonical manifest schema, add a canonical enum, create a database record, or authorize conversion. The canonical manifest remains a closed-world contract; the extensions below require separate architecture and governance authorization before any exact-artifact validation.

The common governance envelope remains mandatory for any future governed artifact: stable record identity, title, language, source identity and exact location, owner/publisher, accessed date, governed version and checksum, references with locators and supports, text/image/display rights, taxonomy ID/version, observed medical/relevant review decision, and append-only audit events. Missing values remain `NOT_SUPPLIED` or `UNRESOLVED` and block handoff.

## 2. Clinical Case contract candidate

### Purpose

A Case contract would represent a source-derived clinical case as a distinct educational artifact while preserving the original case sections and their locators. It is a candidate for the `Clinical Cases` domain and is not currently a canonical `content_type` enum.

### Required type-specific fields

| Field | Requirement | Evidence rule |
|---|---|---|
| `case_type` | Case type as explicitly supplied by the source or governed reviewer | Do not infer the type from a filename or topic. |
| `presentation` | Source-preserved presentation text or locator | Do not rewrite, expand, or clinically correct it. |
| `assessment` | Source-preserved assessment section or locator | Missing sections remain missing. |
| `reasoning` | Source-preserved reasoning section or locator | Do not generate reasoning. |
| `management` | Source-preserved management section or locator | Do not generate management or doses. |
| `references` | At least one traceable reference with exact locator and supported claim/section | No reference may be invented from topic familiarity. |
| `specialty` / `topic` | Explicit source or governed taxonomy values | Ambiguous values require reviewer decision. |
| `pathway` | Explicit `02_Internship` context plus branch/module | Folder placement alone is insufficient. |

### Source linkage

The candidate must retain the inventory Source ID, any source-local identifier, immutable archive path, SHA-256, governed version, exact page/section/heading locator, owner/publisher, and accessed date. Duplicate-family identity must be carried without selecting a canonical member until separately reviewed.

### Review requirements

A qualified clinical reviewer must be attributable by role and decision, with review date, cited locators, and unresolved-issue disposition. Rights review, track/taxonomy review, duplicate review, and QA remain separate evidence streams.

### Governance requirements

A separate authorized `case` contract/enum is required. The artifact must remain `Pending Clinical Review` / `NOT_APPROVED` until independent evidence exists. No case record or case payload is created by this phase.

## 3. Skills / Procedures contract candidate

### Purpose

A Skills / Procedures contract would represent a teachable clinical skill framework or procedure candidate, while distinguishing educational framework material from an individual competency, OSCE, or sign-off record. It is a candidate for the `Skills / Procedures` domain and is not currently a canonical `skill` enum.

### Required type-specific fields

| Field | Requirement | Evidence rule |
|---|---|---|
| `skill_name` | Explicit skill/procedure name | Do not derive a skill from a generic framework title. |
| `category` | Explicit category, such as procedure or practical skill, when supplied | Keep unknown categories unresolved. |
| `required_level` | Explicit level or competency expectation | Do not infer level from the Internship folder. |
| `pathway` / `specialty` / `topic` | Explicit branch and taxonomy context | Must not mix professional tracks. |
| `teaching_material` | Source path plus exact section/locator | Do not create teaching material from source absence. |
| `assessment_method` | Explicit method, such as an authorized OSCE/checklist reference | Framework presence does not create a sign-off method. |
| `reviewer_status` | Observed review state and attributable review evidence | Do not assign a reviewer or upgrade status. |
| `record_role` | `framework_candidate` versus `individual_skill_candidate` | Required to avoid treating a framework as a competency record. |

### Source linkage

The candidate must retain source ID, source-local ID if present, archive path, checksum, version evidence, exact teaching/assessment locators, owner/publisher, rights, explicit `02_Internship` track, and taxonomy ID/version.

### Review requirements

Relevant clinical/educational review must confirm the skill identity and level without changing the source meaning. Separate assessment-contract review must confirm whether the material supports teaching, observation, checklist assessment, or sign-off. Rights and audit reviews remain independent.

### Governance requirements

A separate authorized skills contract is required, including the distinction between framework and competency/sign-off records. No competency record, OSCE result, or learner-facing procedure is created by this phase.

## 4. Reference / Book contract candidate

### Purpose

A Reference / Book contract would preserve a source as a governed reference or book-like item, with exact locators and rights/display limits. It is a candidate for `Reference / Atlas`; the canonical manifest has no generic `reference` enum, and `book` may be evaluated only under an explicitly authorized contract.

### Required type-specific fields

| Field | Requirement | Evidence rule |
|---|---|---|
| `reference_type` | Explicit type, with `book` treated as a candidate only | PDF presence does not establish the type. |
| `title` | Source title | Preserve the observed title. |
| `author` / `publisher_or_owner` | Supplied attribution | Do not infer authorship from filename or cover appearance. |
| `version` | Governed edition/release label plus checksum | Filename `v2` is not governed version evidence. |
| `locator` | Page, chapter, section, figure, or other observed locator | Do not invent page/section references. |
| `rights` | Text usage, image usage, license/decision, and display scope | Rights remain blocked when not supplied. |
| `track` / `taxonomy` | Explicit `02_Internship` and taxonomy ID/version | Topic and folder are not sufficient. |
| `review_state` | Observed review state with attributable relevant/clinical review where educationally used | No approval is assigned here. |

### Source linkage

The candidate must preserve the original file path, checksum, source ID, owner/publisher, governed version, accessed date, exact page/chapter/section locators, references, and rights evidence. A reference target must not duplicate or replace the original source.

### Review requirements

Rights/provenance review is mandatory before display or learner exposure. Relevant/clinical review is required when the source is used to support educational claims. Taxonomy and audit review remain separate gates.

### Governance requirements

A separate book/reference contract and an explicit decision about the allowed canonical enum are required. No generic `reference` record or learner-facing display authorization is created by this phase.

## 5. Cross-cutting non-actions

No canonical schema was modified. No JSON was generated. No source content was rewritten, summarized, normalized, deleted, renamed, archived, or imported. No clinical review, rights approval, activation, application change, database change, commit, push, deployment, or publication was performed.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_0_GATE_REPORT.md "Phase 6.0 Gate Report"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_CONVERSION_GAP_REPORT.md "Phase 6.0 Schema Conversion Gap Report"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md "Phase 5.10 Content Type Contract"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_FIELD_READINESS_MATRIX.md "Phase 5.10 Schema Field Readiness Matrix"
[5]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical SEG Manifest Schema"
