# SEG Database Gap Register

**Project:** Smart Emergency Guide (SEG)  
**Mode:** `CONTROLLED ANALYSIS ONLY / READ-ONLY`  
**Status:** `BLOCKED_PENDING_DATABASE_DESIGN`  
**Prepared by:** Manus AI

## 1. Register purpose

This register records evidence-based gaps between the inspected Supabase architecture and the governed SEG content-storage requirements. It does not prescribe executable SQL, does not create migrations, and does not close clinical, rights, identity, or implementation gates.

The attached `supabase.zip`, `pasted_content_21.txt`, the isolated `SEG_CONTENT_RECORD_V1_1` profile, and the completed Phase 7.8.11–7.8.17 evidence were reviewed as read-only sources.

## 2. Gap register

| ID | Area | Required capability | Evidence state | Severity | Closure requirement | Current status |
|---|---|---|---|---|---|---|
| DB-GAP-001 | Content envelope | Store the common v1.1 envelope for governed records | No governed content-record storage found | Critical | Authorized database-foundation design covering identity, type, metadata, review, rights, and audit | `OPEN` |
| DB-GAP-002 | Content domains | Persist `lesson`, `question_bank`, `book`, `clinical_case`, and `clinical_skill` with explicit type boundaries | Existing learner tables are operational, not content storage | Critical | Type-specific storage design and validation matrix | `OPEN` |
| DB-GAP-003 | Source registry | Store source artifacts and source-level metadata | Source registry exists in reports, not inspected DB | Critical | Source registry design with stable source IDs and unresolved-state handling | `OPEN` |
| DB-GAP-004 | Source lineage | Preserve representation, duplicate, derivative, and parent/child relationships | Phase 7.8.17 documents lineage; DB relation absent | Critical | Lineage model with evidence type and no-silent-merge rules | `OPEN` |
| DB-GAP-005 | Checksum | Persist SHA-256 evidence tied to the source/version object | SHA exists in source artifacts and v1.1 contract, not DB | High | Checksum storage and immutability/verification rule | `OPEN` |
| DB-GAP-006 | Version and edition | Preserve version, edition, and unresolved states without inference | Version/edition unresolved for updated sources | Critical | Version/edition model and evidence closure | `OPEN` |
| DB-GAP-007 | Locator | Preserve chapter, question, section, or other precise source location | Locator is required by v1.1 but absent from content storage | High | Locator model tied to source and representation | `OPEN` |
| DB-GAP-008 | References | Preserve existing reference signals without inventing citations | No content reference relation found | High | Reference relation and citation-evidence policy | `OPEN` |
| DB-GAP-009 | Rights | Store rights status and display/derivative scope separately from clinical review | No content rights/display layer found | Critical | Rights data model, storage boundary, and policy tests | `OPEN` |
| DB-GAP-010 | Medical review | Store clinical-review state, reviewer role, decision, and date | No content clinical-review queue found | Critical | Independent medical-governance storage and event model | `OPEN` |
| DB-GAP-011 | Content audit | Provide append-only events for content governance and state transitions | Operational/security logs exist; content audit absent | Critical | Content audit design with actor, event, time, evidence, and immutability | `OPEN` |
| DB-GAP-012 | Review queue | Hold candidates before v1.1 mapping and activation | Credential review queue pattern is not content-specific | Critical | Separate content review queue and reviewer boundaries | `OPEN` |
| DB-GAP-013 | Pathway scope | Store controlled content-level pathway and shared-core scope | Profile track fields exist; content scope absent | Critical | Content pathway relation and separation constraints | `OPEN` |
| DB-GAP-014 | Internship/resident separation | Prevent silent mixing of SEG Internship Doctor and EM Resident content | No content-level RLS/constraint evidence | Critical | Explicit track model, review rule, and policy test matrix | `OPEN` |
| DB-GAP-015 | Normalized source family | Relate normalized FRCEM/HIPPO family evidence to review queue without import | Phase 7.8.17 is report-only; DB relation absent | High | Source-family design and authorized review-queue integration | `OPEN` |
| DB-GAP-016 | Identity | Distinguish source IDs, candidate IDs, record IDs, and legacy IDs | Identity bridge remains unresolved in Phase 7.8.8/7.8.9 | Critical | Explicit identity policy and evidence-based assignment | `OPEN` |
| DB-GAP-017 | Display artifacts | Separate plain-text analysis from PDF/DOCX/image display artifacts | No governed content-artifact boundary found | High | Rights-controlled artifact storage and exposure policy | `OPEN` |
| DB-GAP-018 | Learner references | Connect progress/bookmarks/attempts to approved content records only | Learner tables exist without governed v1.1 source target | High | Downstream foreign-key/reference design after content model approval | `OPEN` |
| DB-GAP-019 | Review assignment | Represent reviewer role, track, conflict, and decision evidence | Credential review assignment does not establish content governance | High | Content reviewer assignment and conflict model | `OPEN` |
| DB-GAP-020 | Rollback | Provide reversible content release and rollback evidence | No content-release/rollback structure found | High | Release manifest, hashes, activation state, and rollback ownership | `OPEN` |
| DB-GAP-021 | Audit separation | Separate operational logs from medical/content governance audit | Existing logs serve operational/security purposes | High | Distinct content audit boundary and retention policy | `OPEN` |
| DB-GAP-022 | RLS policy | Protect source, review, approved content, and audit layers by role | RLS foundation exists but no content policies | Critical | Explicit role source, owner/reviewer/admin scopes, service-role exception, and tests | `OPEN` |
| DB-GAP-023 | Activation boundary | Prevent learner exposure before approval and authorization | No governed content activation model found | Critical | Activation state machine tied to all gates | `OPEN` |
| DB-GAP-024 | Taxonomy | Persist domain/topic/chapter/pathway taxonomy without mixing tracks | Taxonomy evidence remains document-based | High | Controlled taxonomy relation and governance review | `OPEN` |

## 3. Reusable strengths not counted as closed content gaps

The following existing capabilities are useful foundations but do not close the content gaps: Supabase Auth linkage through `auth.users`, profile-level clinical and professional fields, RLS-enabled public tables, private security-definer helpers, administrative role boundaries, learner-operational tables, operational/security logs, and the credential submission/review-event pattern.

These strengths should be preserved. Reusing them for content must be a separate design decision with explicit RLS and governance review; the credential workflow must not be silently repurposed as medical content review.

## 4. Gate dependencies

The database gaps are not the only blockers. Even after a future schema design exists, the normalized FRCEM/HIPPO source family remains blocked by unresolved source metadata, rights/display review, stable identity evidence, professional-track classification, and independent clinical review. Database readiness cannot substitute for those gates.

| Dependency | Database design can solve? | Required external/governance evidence |
|---|---|---|
| Source ID field | Partly | Stable identity evidence and source registry authority |
| SHA-256 storage | Yes, as storage | Checksum evidence already recorded; preserve exact value |
| Version/edition fields | Partly | Owner/publisher/version/edition evidence |
| Rights status field | Partly | Rights/display decision and scope |
| Medical-review field | Partly | Independent clinical review decision |
| Pathway scope field | Partly | Approved taxonomy and track decision |
| Clinical correctness | No | Medical owner review |
| Copyright/display permission | No | Rights review |
| Legacy identity bridge | No | Explicit join evidence or manual bridge review |
| Implementation authorization | No | Separate authorization |

## 5. Required next design package

Before any adapter or import work, SEG needs a separate authorized database-foundation package containing a concrete model, keys and cardinality, nullability and uniqueness, indexes, deletion behavior, RLS role matrix, audit-event model, review-state transitions, source-artifact boundary, activation/rollback plan, and QA test matrix. That package must remain a dry run until explicitly authorized.

**Register conclusion:** `BLOCKED_PENDING_DATABASE_DESIGN`

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_ALIGNMENT_REPORT.md "SEG Database Alignment Report"

[2]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 isolated schema profile"

[3]: file:///tmp/seg-supabase-review/supabase/schema.sql "Attached Supabase declarative schema evidence"

[4]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_17_NORMALIZED_SOURCE_LINEAGE.md "SEG Phase 7.8.17 Normalized Source Lineage"

[5]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_14_METADATA_CLOSURE_REGISTER.md "SEG Phase 7.8.14 Metadata Closure Register"
