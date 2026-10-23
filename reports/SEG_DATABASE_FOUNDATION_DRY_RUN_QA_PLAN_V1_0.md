# SEG DATABASE FOUNDATION DRY-RUN QA PLAN v1.0

**Mode:** `CONCEPTUAL / DRY-RUN / NOT IMPLEMENTED`  
**Status:** `DESIGN_EVIDENCE_READY_FOR_REVIEW`

This plan defines validation required before any authorized SQL or migration package. It is a test contract, not an execution report, and it does not query or modify Supabase.

## QA gates

| Gate | Validation | Required evidence | Pass condition |
|---|---|---|---|
| QA-01 Contract | Compare logical model with `SEG_CONTENT_RECORD_V1_1` required fields and conditional payload rules | Contract-to-entity mapping matrix | Every required envelope area has an explicit storage owner; no contract type is removed or silently added |
| QA-02 Envelope completeness | Verify source, version, references, rights, taxonomy, medical review, and audit decomposition | Field-level traceability matrix | Nested semantics remain reconstructible without flattening loss |
| QA-03 Type boundaries | Check lesson, question_bank, book, clinical_case, and clinical_skill payload ownership | Type compatibility matrix | One record maps to one governed type boundary; case/skill conditional rules are preserved |
| QA-04 Identity separation | Distinguish source, artifact, candidate, SEG record, and legacy identities | Identity test evidence | No title/topic/filename similarity creates an identity link |
| QA-05 Source/lineage | Verify checksum, representation, parent/child, duplicate, derived, related, and replacement relations | Source/lineage evidence matrix | Originals are preserved; no silent merge, overwrite, delete, or replacement occurs |
| QA-06 Relational integrity | Review proposed PK/FK direction, cardinality, uniqueness, nullability, and deletion behavior | Logical schema review | No orphaned governed object or destructive cascade is permitted |
| QA-07 Metadata closure | Check version, edition, locator, publisher/owner, rights, taxonomy, and unresolved-state handling | Metadata closure report | Unknown values remain unresolved/blocked; no inferred values are introduced |
| QA-08 Review workflow | Validate queue, assignment, medical/content/quality review, rights review, and conflict boundaries | State-machine test matrix | Invalid or unauthorized transitions are rejected |
| QA-09 Rights isolation | Test clinical approval versus display permission | Rights-policy evidence | Medical approval cannot imply display rights; rights clearance cannot imply clinical approval |
| QA-10 Pathway separation | Test Internship Doctor, EM Resident, and Shared Medical Core scopes | Cross-track negative tests | Records cannot cross scopes without explicit governed scope and review |
| QA-11 RLS | Test learner, reviewer, medical authority, rights authority, admin, service role, and audit reader | Positive/negative RLS matrix | Access matches role source, assignment, state, rights, and pathway boundaries |
| QA-12 Audit | Verify event identity, actor, timestamp, reason, prior/new state, append-only behavior | Audit immutability evidence | History cannot be silently deleted or mutated |
| QA-13 Atlas | Test asset identity, record relation, display scope, rights state, and medical-review state | Asset relation QA | No asset or relation bypasses either content or visual governance |
| QA-14 Learner downstream | Test progress/bookmarks/exam attempts against active governed record IDs | Integration/reference evidence | Learner surfaces cannot reference non-active or non-approved content |
| QA-15 Activation | Validate all gates plus implementation authorization and release manifest | Activation gate record | Only fully eligible, authorized records can become active |
| QA-16 Rollback | Verify backup, hashes, ownership, restore, and post-rollback checks | Rollback rehearsal evidence | Release can be reversed without losing source or audit history |
| QA-17 Safety boundary | Scan output for SQL execution, migration application, content import, activation, or medical/rights approval | Non-action checklist | All remain unperformed unless separately authorized |

## Required test cases

| Test ID | Scenario | Expected result |
|---|---|---|
| QA-T-001 | Valid v1.1 envelope decomposition | Passes only when all required nested areas are represented |
| QA-T-002 | `clinical_case` payload retained in logical model | Passes as a supported contract type; implementation remains blocked while `NOT_SUPPORTED` meaning is unresolved |
| QA-T-003 | Missing version or checksum | Remains unresolved/blocked; cannot become active |
| QA-T-004 | Duplicate checksum across representations | Emits duplicate signal for review; does not merge or delete |
| QA-T-005 | Pending medical review | Not learner-visible |
| QA-T-006 | Rights restricted artifact | Not learner-visible and remains storage-restricted |
| QA-T-007 | Internship learner requests resident record | Denied/not visible |
| QA-T-008 | Rights reviewer attempts medical approval | Denied |
| QA-T-009 | Medical reviewer attempts display clearance | Denied |
| QA-T-010 | Reviewer outside assignment writes decision | Denied |
| QA-T-011 | Audit event deletion attempt | Denied; history unchanged |
| QA-T-012 | Atlas relation without dual gate | Blocked or non-visible |
| QA-T-013 | Learner progress references inactive record | Denied/blocked |
| QA-T-014 | Invalid state transition | Denied and audited |
| QA-T-015 | Release hash mismatch | Release blocked and rollback path invoked |

## Clinical and rights non-invention checks

The QA package must explicitly verify that it does not:

- create or approve medical content;
- infer medication doses, clinical correctness, competency approval, or authorization;
- infer ownership, publisher, rights, license, or display permission;
- convert a folder, filename, title, topic, or checksum into a content identity link;
- treat credential review as medical-content review;
- turn a design pass into implementation authorization;
- remove `clinical_case` from the v1.1 contract because an evidence artifact said `NOT_SUPPORTED`.

## Required QA ownership

Before implementation, the owner must assign separate technical, security, medical-governance, and rights-governance reviewers. A QA pass is not clinical approval, rights approval, or publication authorization.

## References

[1]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 canonical additive profile"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_DESIGN_PACKAGE_V1_0.md "SEG Database Foundation DRY-RUN Design Package v1.0"

[3]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_RLS_MATRIX_V1_0.md "SEG Database Foundation DRY-RUN RLS Matrix v1.0"

[4]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_STATE_MACHINE_V1_0.md "SEG Database Foundation DRY-RUN State Machine v1.0"

[5]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_ROLLBACK_PLAN_V1_0.md "SEG Database Foundation DRY-RUN Rollback Plan v1.0"
