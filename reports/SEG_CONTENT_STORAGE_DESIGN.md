# SEG Content Storage Design

**Project:** Smart Emergency Guide (SEG)  
**Mode:** `CONTROLLED ANALYSIS ONLY / READ-ONLY`  
**Design state:** `CONCEPTUAL / NOT IMPLEMENTED`  
**Prepared by:** Manus AI

## 1. Purpose and non-implementation boundary

This document defines a future, governed storage direction for SEG content. It is a design review artifact, not a migration, SQL proposal, seed plan, adapter, import, or activation decision. The attached Supabase package and `pasted_content_21.txt` were used as evidence only. No database was queried or changed.

The design preserves the SEG sequence:

> **Source → Version → Governance Record → Clinical Review → Rights Review → Approval → Implementation Authorization → Migration/Import → Activation**

The current status of every future source-derived content item remains **Pending Clinical Review** unless an independent governance record proves otherwise.

## 2. Target relationship

The future relationship is intentionally staged and reversible:

```text
Normalized Source Family
        ↓
Source Registry / Lineage
        ↓
Review Queue
        ↓
SEG_CONTENT_RECORD_V1_1 Mapping
        ↓
Database Storage
        ↓
Learner Interaction Surfaces
```

The existing Supabase profile, authentication, RLS, and operational logging foundation should remain outside the content record itself. Learner progress, bookmarks, attempts, and analytics should reference governed content IDs only after content records pass their required gates.

## 3. Conceptual storage layers

The following layers are conceptual entities for a future database-foundation review. They are not approved table names and no schema change is authorized by this document.

| Conceptual layer | Purpose | Minimum provenance/governance responsibility | Current evidence state |
|---|---|---|---|
| Source registry | One authoritative row per source artifact and representation | `source_id`, artifact identity, format, SHA-256, language, owner/publisher/version/edition/rights states, locator policy | `MISSING` in current DB |
| Source lineage | Preserve parent/child, byte-identical, representation-family, and derivative relationships without silent merge | lineage relation, evidence type, source/target IDs, confidence, review status | `MISSING` in current DB; documented in reports |
| Review queue | Hold source groups and candidate records before clinical/rights review | queue state, reviewer role, evidence links, blockers, decision state, timestamps | `PARTIAL` pattern exists for credentials; content queue missing |
| Content record envelope | Persist the v1.1 common envelope after authorization | record identity, content type, language, source, version, references, rights, taxonomy, medical review, audit | `MISSING` |
| Type-specific content payload | Store the content-type-specific fields for lesson, question bank, book, clinical case, or clinical skill | payload validation, type boundary, source locator, review state | `MISSING` |
| Content references | Preserve source and framework references without inventing citations | reference label, source relation, locator, evidence state | `MISSING` |
| Pathway scope | Separate SEG Internship Doctor Pathway, Emergency Medicine Resident Pathway, and any shared core | controlled track/pathway values, visibility and review boundary | `MISSING` at content level |
| Content audit events | Append-only governance and implementation history | event, actor, timestamp, prior/new state, reason, evidence pointer | `MISSING`; credential event pattern is reusable only conceptually |
| Display/storage rights boundary | Prevent exposure of unapproved text, PDF, DOCX, image, or copyrighted material | rights state, display scope, artifact location, reviewer decision | `MISSING` |

## 4. Recommended envelope direction

The future content record should treat `SEG_CONTENT_RECORD_V1_1` as the governing contract rather than reusing learner-operational tables as a substitute. The common envelope should remain stable across the five supported domains:

| v1.1 envelope area | Storage design intent | Gate dependency |
|---|---|---|
| `record_id` | Stable internal record identity distinct from source IDs and legacy IDs | Identity evidence and controlled assignment |
| `title` and `content_type` | Explicit type boundary for `lesson`, `question_bank`, `book`, `clinical_case`, or `clinical_skill` | Structural validation and review queue |
| `language` | Preserve source language and derived-language state | Source evidence and authorship/rewrite review where applicable |
| `source` | Link to source registry and lineage without replacing the original source | Source metadata closure |
| `version` | Preserve checksum and version/edition states; unresolved fields remain unresolved | Version/edition evidence |
| `references` | Preserve existing reference signals and locators; never invent citations | Reference audit and locator closure |
| `rights` | Store display/derivative/use status separately from clinical review | Rights review |
| `taxonomy` | Preserve domain, topic, chapter, and pathway states | Taxonomy review and pathway separation |
| `medical_review` | Store review state, reviewer role, decision, and date only when evidenced | Independent clinical review |
| `audit` | Append-only provenance and state-transition record | Governance and security review |

## 5. Source-family and representation handling

The normalized FRCEM/HIPPO package must remain a set of separate source lineages. A byte-identical representation may be recorded as an evidence relationship, but it must not trigger automatic deletion, merge, overwrite, replacement, or identity assignment. PDF and DOCX representations must remain separate rights/display concerns from plain-text analysis artifacts.

A future storage design should therefore distinguish at least three concepts: the source artifact, the representation or extraction, and the educational record candidate. The candidate must point back to the source artifact and locator. It must not become a source replacement merely because its text is structurally easier to analyze.

## 6. Review queue direction

The existing credential review tables show that the Supabase architecture can support restricted submission and event-history patterns. A future SEG content queue would need a separate content-governance boundary and should not reuse credential semantics or statuses silently.

Conceptually, a content review queue would need to hold a source group or candidate reference, review track, required reviewer role, current state, unresolved blockers, evidence links, and immutable decision events. The queue must support independent clinical review and rights review, with neither gate implied by the other. Queue entries should remain non-publishable until all required gates and implementation authorization are recorded.

## 7. Professional pathway separation

The existing account fields `clinical_role`, `professional_grade`, and `primary_learning_track` are useful for user context, but content storage requires a separate content-level scope. A future content record should be able to state whether it belongs to the SEG Internship Doctor Pathway, the Emergency Medicine Resident Pathway, Shared Medical Core, or another explicitly governed scope.

This content-level scope must not be inferred from a user's account role. It must be source- and governance-derived, reviewable, and protected by policy. The database design should prevent silent cross-track activation and should preserve the distinction between internship-level and resident-level content.

## 8. Security and RLS design direction

The current Supabase RLS and private-helper foundation should be preserved. A future content design would require separate policy tests for at least the following boundaries:

| Boundary | Required future behavior |
|---|---|
| Public learner read | Only approved, active, rights-cleared content is readable through the intended learner surface. |
| Reviewer access | Assigned reviewers can read the evidence needed for their review without receiving unauthorized administrative write access. |
| Medical-governance write | Review decisions are restricted to the authorized medical governance boundary. |
| Rights-governance write | Rights/display decisions are independent and restricted to the authorized rights boundary. |
| Source artifact access | Unapproved copyrighted source artifacts remain non-public and storage-restricted. |
| Service-role access | Any service-role exception is explicit, auditable, and not a substitute for RLS testing. |
| Audit immutability | Governance events are append-only or otherwise protected against silent alteration. |

No policy is implemented or proposed as executable SQL in this document.

## 9. Relationship to existing learner tables

`progress_items`, `bookmarks`, `exam_attempts`, and related learner-operational structures may become downstream consumers of approved `record_id` values. They should not be used as the canonical store for source metadata, content review, rights, or medical approval. This separation protects the existing learner architecture while preventing operational tables from becoming an accidental content repository.

## 10. Required future design decisions

Before implementation, SEG must separately authorize a database-foundation package that specifies the exact schema target, table names, foreign keys, cardinality, nullability, uniqueness, indexes, deletion behavior, RLS role source, service-role exception, review-state transitions, audit-event model, rollback strategy, and QA matrix. It must also define how unresolved states are represented without inventing values.

**Design conclusion:** The future relationship is conceptually compatible with the current Supabase security foundation, but the governed content storage layer is not currently implemented. This document does not authorize its implementation.

## References

[1]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 isolated schema profile"

[2]: file:///tmp/seg-supabase-review/supabase/schema.sql "Attached Supabase declarative schema evidence"

[3]: file:///tmp/seg-supabase-review/supabase/migrations/20260714010000_professional_credential_submission_mvp.sql "Credential review migration evidence"

[4]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_17_NORMALIZED_SOURCE_LINEAGE.md "SEG Phase 7.8.17 Normalized Source Lineage"

[5]: file:///home/ubuntu/seg-internship-output/PHASE_7_8_13_TRANSFORMATION_BOUNDARY.md "SEG Phase 7.8.13 Transformation Boundary"
