# SEG DATABASE FOUNDATION DRY-RUN RLS MATRIX v1.0

**Mode:** `CONCEPTUAL / DRY-RUN / NOT IMPLEMENTED`  
**Status:** `DESIGN_EVIDENCE_READY_FOR_REVIEW`

This matrix is a future policy-test contract. It is not executable SQL and does not modify the current Supabase RLS foundation or the application-side authentication model.

## Role-source assumptions requiring confirmation

The implementation target must explicitly identify the identity provider and role source before policy authoring. The current project evidence includes application-side Manus OAuth/Drizzle structures and a separate declarative Supabase evidence package; this package does not choose between them or add an authentication provider. [1] [2]

The future policy design must distinguish account context from content governance. `user.role` alone is insufficient. A permitted read should be a conjunction of authenticated identity, learner pathway scope, content review state, publication state, rights/display state, and any explicit owner or assignment boundary.

## Matrix

| Actor/context | Source registry | Source artifacts | Content records | Review queue/events | Rights records | Atlas assets/relations | Audit events |
|---|---|---|---|---|---|---|---|
| Public/unauthenticated | No read | No read | Approved active learner-surface records only, if explicitly exposed | No read | No read | Approved/display-cleared assets only through intended surface | No read |
| Authenticated learner | No raw-source read | No raw-artifact read | Read only when active, rights-cleared, and within governed track/shared-core scope | No read of reviewer evidence unless explicitly designed | No read of internal rights evidence | Read only if content and asset gates both pass | No read of internal audit by default |
| Assigned content reviewer | Read assigned source metadata and evidence required for review | Read assigned artifacts subject to restricted storage | Read assigned candidate/record content | Read/write assigned review item and decision event within scope | Read only when rights review is part of assignment | Read assigned asset evidence | Read relevant audit history; no deletion |
| Medical governance authority | Read source/content evidence needed for medical review | Restricted read under assignment | Read/write medical-review state and decision events only | Read/write medical review dimension | Read-only rights context | Read/write medical-review state only when authorized | Append medical decision events; no deletion |
| Rights governance authority | Read source/artifact rights evidence | Read/write rights/display evidence | Read/write rights/display state only | Read/write rights review dimension only | Read/write rights decision events | Read/write asset rights state only | Append rights decision events; no deletion |
| Regional/admin capability | Explicitly scoped metadata and queue visibility | No unrestricted artifact access by default | No clinical approval write unless independently authorized | Administrative assignment/queue actions within capability | No rights approval unless independently authorized | Administrative asset metadata within capability | Read/admin events; no deletion |
| Service role | Explicit maintenance scope only | Explicit restricted storage scope | Transactional operations only when authorized and auditable | No bypass of required gates | No bypass of rights decisions | No bypass of asset gates | Append only through audited service operation |
| Audit reader | Read-only governed scope | No artifact content by default | Read-only state history | Read-only review history | Read-only rights history | Read-only relation history | Read-only append-only history |

## Required policy predicates

| Predicate | Required behavior |
|---|---|
| Authentication | Reject unauthenticated access to source, review, rights, audit, and non-public content layers. |
| Account status | Reject suspended/deactivated accounts even if a prior role or assignment exists. |
| Learner pathway | Permit only the record's explicit Internship, Resident, Shared Core, or other governed scope; never infer pathway from title alone. |
| Content medical state | Pending, rejected, withdrawn, or unresolved medical state is not learner-visible. |
| Content rights state | Rights pending, restricted, rejected, or unresolved display state is not learner-visible. |
| Publication state | A record must be explicitly eligible/active before learner read. |
| Review assignment | Reviewer write access requires explicit assignment and review dimension. |
| Medical/rights separation | Medical authority cannot grant display rights; rights authority cannot approve clinical correctness. |
| Audit immutability | No actor, including routine admin, may delete or silently update governed decision events. |
| Service-role exception | Service-role access is explicit, minimal, auditable, and tested; it is not a substitute for user-facing RLS. |
| Source artifact privacy | Copyrighted or unapproved artifacts remain storage-restricted even when derived records are approved. |
| Atlas dual gate | Asset relation is readable only when both asset and content display states permit it. |

## Negative test matrix

| Test ID | Negative case | Expected result |
|---|---|---|
| RLS-NEG-001 | Learner requests a record with `medical_review = pending` | Denied/not visible |
| RLS-NEG-002 | Learner requests rights-restricted FRCEM/HIPPO/Oxford artifact | Denied/not visible |
| RLS-NEG-003 | Internship account requests EM Resident-only record | Denied/not visible |
| RLS-NEG-004 | Resident account requests Internship-only record | Denied/not visible |
| RLS-NEG-005 | Reviewer writes a record outside assignment | Denied |
| RLS-NEG-006 | Rights reviewer changes medical decision | Denied |
| RLS-NEG-007 | Medical reviewer changes display permission | Denied |
| RLS-NEG-008 | Admin attempts to delete audit event | Denied |
| RLS-NEG-009 | Service role bypasses review/publication gate | Denied or blocked by explicit transaction guard |
| RLS-NEG-010 | Atlas asset is linked without rights/medical state | Relation blocked or non-visible |
| RLS-NEG-011 | Unresolved identity is used as a learner foreign key | Denied/blocked |
| RLS-NEG-012 | Learner creates progress/bookmark/attempt for non-active record | Denied/blocked |

## Implementation gate

No policy file, migration, Supabase update, or application change is produced by this artifact. Before implementation, the owner and reviewer must approve the actual identity source, target database, role/capability model, service-role exception, policy order, rollback behavior, and QA evidence.

## References

[1]: file:///home/ubuntu/seg-manus-status/drizzle/schema.ts "Current application-side Drizzle schema"

[2]: file:///tmp/seg-supabase-review/supabase/schema.sql "Supabase declarative schema evidence"

[3]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"

[4]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_DESIGN_PACKAGE_V1_0.md "SEG Database Foundation DRY-RUN Design Package v1.0"
