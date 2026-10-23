**Phase:** 6.5 — Controlled Reviewer Decision Package
**Mode:** `READ_ONLY DECISION PREPARATION`
**Generated at (UTC):** `2026-08-17T20:45:00Z`
**Author:** Manus AI

# SEG Internship Contract Approval Decision Form

## 1. Decision scope

This form prepares an architecture/schema-governance decision for three candidate contract extensions. It does not adopt a canonical enum, amend the manifest schema, grant clinical approval, authorize implementation, or create any record.

## 2. Clinical Case contract candidate

### Proposed contract

The proposed `Clinical Case` contract represents a source-derived case while preserving source sections and exact locators. Proposed fields are `case_type`, `presentation`, `assessment`, `reasoning`, `management`, `references`, `specialty/topic`, `pathway`, and the common governance envelope: source ID/local ID, namespace, immutable path, SHA-256, version, owner/publisher, accessed date, rights, taxonomy, review, and append-only audit.

### Risks

The contract is not a canonical `case` enum. Missing sections must remain missing; reasoning, management, doses, or references must not be generated. Filename/topic inference could alter medical meaning, and the existing governance blockers prevent learner exposure or import eligibility.

### Approval requirement

Requires architecture/schema authority for the enum and fields, source/provenance/rights review, explicit track/taxonomy review, qualified clinical/relevant review, QA contract validation, and implementation authorization. **Decision: `PENDING`.**

## 3. Skills / Procedures contract candidate

### Proposed contract

The proposed `Skills / Procedures` contract distinguishes a `framework_candidate` from an `individual_skill_candidate` or competency/sign-off record. Proposed fields are `skill_name`, `category`, `required_level`, `pathway/specialty/topic`, `teaching_material`, `assessment_method`, `reviewer_status`, `record_role`, and the common governance envelope.

### Risks

The contract is not a canonical `skill` enum. A generic framework must not be treated as an individual competency, OSCE result, checklist, or sign-off. Required level and assessment method cannot be inferred from the Internship folder, and no reviewer status may be assigned without attributable evidence.

### Approval requirement

Requires architecture/schema authority, relevant clinical/educational review of identity and level, separate assessment-contract review, rights/provenance/taxonomy review, audit evidence, QA, and implementation authorization. **Decision: `PENDING`.**

## 4. Reference / Book contract candidate

### Proposed contract

The proposed `Reference / Book` contract preserves a governed reference/book-like source with `reference_type`, `title`, `author/publisher_or_owner`, `version`, `locator`, `rights`, `track/taxonomy`, `review_state`, and the common governance envelope. `book` remains a candidate type under an explicitly authorized contract.

### Risks

The canonical manifest has no generic `reference` enum. PDF presence and filename do not establish reference type, authorship, governed version, rights, or learner-display scope. Missing page/chapter/section locators and rights evidence block display and any future conversion.

### Approval requirement

Requires architecture/schema authority to adopt the enum and type rules, provenance/version/rights review, explicit track/taxonomy review, relevant/clinical review when used for educational claims, audit evidence, QA, and implementation authorization. **Decision: `PENDING`.**

## 5. Decision table

| Domain | Proposed status | Decision | Approval owner(s) | Implementation impact |
|---|---|---|---|---|
| Clinical Case | Candidate extension | `PENDING` | Architecture/schema authority; governance; clinical/relevant reviewer; QA | Would require a canonical enum and exact-artifact validator |
| Skills / Procedures | Candidate extension | `PENDING` | Architecture/schema authority; clinical/educational reviewer; assessment governance; QA | Would require framework-vs-competency model and separate assessment semantics |
| Reference / Book | Candidate extension | `PENDING` | Architecture/schema authority; rights/provenance; relevant reviewer; QA | Would require explicit enum, locator rules, and display-rights controls |

## Non-actions and scope boundary

This package prepares human/governance decisions only. No approval was granted. No clinical or relevant review decision was issued. No identifier was renamed, merged, replaced, or normalized. No duplicate was selected as canonical, archived, deleted, or merged. No contract was adopted as a canonical enum. No schema conversion, JSON generation, database import, production record, application/database change, activation, commit, push, deployment, or publication was performed.
## References

[1]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_EXTENDED_CONTENT_CONTRACTS.md` "Phase 6.1 Extended Content Contracts"
[2]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_ARCHITECTURE_DECISION_RECORD.md` "Architecture Decision Record"
[3]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_AUTHORIZATION_CHECKLIST.md` "Schema Authorization Checklist"
