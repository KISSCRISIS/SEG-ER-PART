# SEG DATABASE FOUNDATION DRY-RUN DESIGN PACKAGE v1.0

**Project:** Smart Emergency Guide (SEG)  
**Mode:** `CONTROLLED DESIGN / DRY-RUN / NOT IMPLEMENTED`  
**Prepared by:** Manus AI  
**Design status:** `DESIGN_EVIDENCE_READY_FOR_REVIEW`  
**Supabase implementation:** `NOT_STARTED`  
**Clinical/content activation:** `NOT_AUTHORIZED`

## 1. Purpose and non-implementation boundary

This package defines a proposed, reversible database-foundation design for governed SEG content. It is a conceptual design artifact only. It is not SQL, a migration, an import plan, a seed package, a schema change, an adapter, or an activation decision. No table, enum, policy, record, content object, source mapping, or Atlas relation is created by this package. [1] [2] [3]

The design preserves the existing SEG application and authentication boundaries. The current repository contains the existing application-side Drizzle user model, while the inspected Supabase package remains declarative evidence only; neither source is modified by this package. [4] [5]

The medical governance sequence remains mandatory:

> **Source → Version → Governance Record → Clinical Review → Rights Review → Approval → Implementation Authorization → Migration/Import → Activation** [6]

Every future source-derived content record remains `Pending Clinical Review` until independent evidence proves otherwise. Unresolved source, rights, pathway, identity, or clinical-review fields must remain unresolved or blocked; they must not be filled by inference. [2] [3] [6]

## 2. Canonical authorities and design inputs

| Authority | Role in this dry run | Design consequence |
|---|---|---|
| `SEG_CONTENT_RECORD_V1_1.schema.json` | Canonical content-record contract | The common envelope is preserved; `clinical_case` and `clinical_skill` remain in the contract. [1] |
| `SEG_DATABASE_ALIGNMENT_REPORT.md` | Current inspected-database evidence | Existing Auth/profile/RLS/operational foundations are reusable; governed content storage is not evidenced. [2] |
| `SEG_CONTENT_STORAGE_DESIGN.md` | Prior conceptual storage direction | Source registry, lineage, queue, content envelope, rights, audit, and pathway layers are kept separate. [3] |
| `SEG_DATABASE_GAP_REGISTER.md` | Open database gaps | DB-GAP-001 through DB-GAP-024 remain open; this package does not close them. [7] |
| `SEG_DATABASE_EVIDENCE_REVIEW_22.md` | Additional evidence review | Field-level requirements are enriched; no implementation evidence was added. [8] |
| `drizzle/schema.ts` | Current application-side schema source of truth | The existing user model is preserved; no content tables are added. [4] |
| `database-foundation/SKILL.md` | Governance and execution boundary | DRY-RUN proposals are allowed; SQL execution, migration, seed, RLS changes, and activation are not authorized. [6] |

## 3. Confirmed decisions before SQL

### 3.1 The content record is not a flat table

The proposed `content_records` entity is an identity and lifecycle shell, not a flattened replacement for the v1.1 envelope. The nested contract areas remain separately addressable through conceptual relations:

```text
content_records
      |
      +-- content_source_relations  --> sources / source_artifacts
      +-- content_version_states    --> source/version/checksum evidence
      +-- content_reference_relations --> source locators and framework references
      +-- content_taxonomy_scopes   --> taxonomy and pathway scope
      +-- content_review_states     --> current medical/content/quality state
      +-- content_rights_states     --> independent rights/display state
      +-- content_audit_events      --> append-only provenance and transitions
      +-- type-specific payload      --> lesson/question_bank/book/case/skill
```

The relational decomposition is a future implementation direction. It must preserve the semantic contract of `source`, `version`, `references`, `rights`, `taxonomy`, `medical_review`, and `audit`; it must not silently replace those objects with unrelated flattened status fields. [1] [8]

### 3.2 Clinical Case remains in v1.1 and is unresolved only as an implementation interpretation

The v1.1 contract explicitly enumerates `clinical_case`. The evidence artifact's `clinical_case = NOT_SUPPORTED` is therefore not accepted as a contract change. The design retains a proposed `clinical_case_records` payload boundary and records the implementation interpretation as `UNRESOLVED`:

| Possible meaning of `NOT_SUPPORTED` | Design treatment |
|---|---|
| Not supported in the current database | Consistent with the inspected absence of a case-storage layer; the gap remains open. |
| Not supported in the v1.1 contract | Conflicts with the canonical contract and cannot be adopted without a separate contract-governance decision. |

No clinical-case record is created, reviewed, approved, imported, or activated. The ambiguity must be resolved before any implementation package can claim case-domain readiness. [1] [2] [8]

### 3.3 No database gap is closed

This package refines the design definition of DB-GAP-001 through DB-GAP-024 but does not change their status. The current database-alignment gate remains `BLOCKED_PENDING_DATABASE_DESIGN` until this conceptual package is separately reviewed and converted, if authorized, into an implementation-specific change package. [7] [9]

## 4. Target logical architecture

```text
Existing SEG Core (preserved)
  Authentication / profile context / application security / learner operations
                              |
                              v
                 Governed Content Foundation
                              |
  +---------------------------+------------------------------+
  |                           |                              |
Source Governance       Content Governance              Visual Governance
  |                           |                              |
  |-- sources                 |-- content_records           |-- atlas_assets
  |-- source_artifacts        |-- type payloads             |-- asset relations
  |-- source_lineage          |-- references                |-- rights/review state
  |-- source metadata         |-- taxonomy/pathway
                              |-- review state
                              |-- rights state
                              |-- audit events
                              |
                              v
                    Approved learner-facing records only
                              |
          progress / bookmarks / exam attempts as downstream surfaces
```

The learner-operational tables remain downstream consumers. They are not canonical storage for source metadata, content review, rights, medical approval, or content provenance. [2] [3]

## 5. Proposed logical entities and relationships

The names below are **conceptual logical names**, not approved physical table names. They require a later authorized schema package before implementation.

| Logical entity | Responsibility | Proposed primary identity | Key relationships and cardinality | Governance boundary |
|---|---|---|---|---|
| `sources` | Logical source identity and provenance state | `source_id` | One source has one or more `source_artifacts`; source may have many lineage edges | Owner/publisher/version/edition/rights/provenance remain evidence-backed or unresolved |
| `source_artifacts` | Physical files or representations | `artifact_id` | Many artifacts belong to one source; artifact may participate in lineage and rights records | Preserve filename, format, location, checksum, and representation type without silent merge |
| `source_lineage_relations` | Parent/child and representation-family relationships | `lineage_id` | Relates source/artifact nodes; many-to-many relation graph is possible | Relation types include duplicate, derived, related, replacement; evidence and review required |
| `content_records` | Stable SEG record shell and lifecycle identity | `record_id` | One record has one or more source/reference/taxonomy/review/rights/audit relations; exactly one governed content type | Must not replace nested v1.1 semantics with an unreviewed flat status model |
| `content_source_relations` | Connects content record to source/artifact evidence | `content_source_relation_id` | Many relations per content record are allowed; one relation is designated primary only after review | No SRC/CAND or legacy identity is inferred by this package |
| `content_version_states` | Preserves value/checksum/version evidence | `content_version_state_id` | One current version state per record at a time; history retained through audit | Checksum is evidence, not proof of ownership, rights, or clinical correctness |
| `content_reference_relations` | Stores reference IDs, locators, and support claims | `content_reference_relation_id` | One record has one or more references; references point to source/framework evidence | No citations are invented; locator closure is required |
| `content_taxonomy_scopes` | Domain/topic/chapter/pathway scope | `content_taxonomy_scope_id` | One record may have multiple governed taxonomy entries; pathway visibility is explicit | Internship, resident, and shared core remain separated |
| `professional_tracks` | Controlled pathway vocabulary | `track_id` | One track has many content-scope relations and user-context references | Proposed identifiers are not activated values; taxonomy governance is required |
| `content_type_payloads` | Common conceptual boundary for type payloads | `payload_id` | One record has one type-specific payload | Payload must match the v1.1 `content_type` boundary |
| `lesson_records` | Lesson-specific structure | `record_id` as relation to content shell | One-to-one with a `lesson` record | Learning objectives/sections/references require source locators and review |
| `question_bank_records` | Question-bank unit boundary | `record_id` as relation to content shell | One-to-one with a `question_bank` record; question units may be a child collection in later design | Answer key and explanation states must not be guessed or merged |
| `book_records` | Reference/book framework structure | `record_id` as relation to content shell | One-to-one with a `book` record | Edition and locator remain evidence-dependent; rights/display remain independent |
| `clinical_case_records` | Case-specific payload boundary | `record_id` as relation to content shell | One-to-one with a `clinical_case` record | Retained because v1.1 supports the type; implementation interpretation remains `UNRESOLVED` |
| `clinical_skill_records` | Skill/procedure payload boundary | `record_id` as relation to content shell | One-to-one with a `clinical_skill` record | Must not become competency approval or authorization |
| `content_review_queue` | Candidate and record review worklist | `review_id` | One record/source group may have multiple review items by review type | Separate medical, rights, content, and quality review; no silent reuse of credential semantics |
| `content_review_states` | Current review snapshot | `review_state_id` | One current state per governed review dimension; events are retained separately | Pending review is non-publishable |
| `content_review_events` | Review decisions and transitions | `review_event_id` | Many events per queue item/state | Reviewer role, decision, evidence, timestamp, and conflict state required |
| `content_rights_states` | Current rights/display/derivative state | `rights_state_id` | One or more artifact/content rights states; content exposure requires a compatible state | Rights are independent from medical review |
| `rights_records` | Artifact-level rights evidence | `rights_record_id` | One artifact may have multiple reviewed rights events; one current state | Owner, license, display permission, evidence locator, and review status required |
| `content_audit_events` | Append-only record history | `event_id` | Many events per content record and governance object | No silent deletion or mutation of decision history |
| `atlas_assets` | Visual asset identity | `asset_id` | Asset may relate to zero or more governed content records through a relation | Asset rights and medical-review state are independent gates |
| `atlas_asset_relations` | Explicit content-to-asset relation | `asset_relation_id` | Many assets may relate to one record; one asset may support many records only with evidence | No Atlas asset is exposed without rights/display and medical-review state |
| `content_publication_states` | Activation/publication boundary | `publication_state_id` | One current publication state per record; transitions audited | Learner read requires approval, rights clearance, and implementation authorization |

## 6. SEG_CONTENT_RECORD_V1_1 mapping boundary

| v1.1 contract area | Proposed logical storage boundary | Required preservation rule | Current state |
|---|---|---|---|
| `record_id`, `title`, `content_type`, `language` | `content_records` | Stable SEG identity is distinct from source, candidate, and legacy identities | Proposed only |
| `source` | `sources`, `source_artifacts`, `content_source_relations` | Preserve `source_id`, owner/publisher, location, and access evidence | Missing in current DB |
| `version` | `content_version_states` plus source/artifact evidence | Preserve value and exact 64-hex checksum; unresolved version remains unresolved | Missing in current DB |
| `references` | `content_reference_relations` | At least one reference with locator and support claim; never invent citations | Missing in current DB |
| `rights` | `content_rights_states`, `rights_records` | Keep text/image usage and display scope independent from clinical review | Missing in current DB |
| `taxonomy` | `content_taxonomy_scopes`, `professional_tracks` | Preserve governed taxonomy version and explicit pathway scope | Missing at content level |
| `medical_review` | `content_review_states`, `content_review_events` | Reviewer and decision are evidence-backed; default is pending | Missing in current DB |
| `audit` | `content_audit_events` | Append-only events include event, actor, timestamp, and reason where available | Missing in current DB |
| `content` for `clinical_case` or `clinical_skill` | Type-specific payload relations | The v1.1 conditional payload rule is preserved; no contract type is removed | Case interpretation unresolved |
| `relationships.reference_framework` | `content_reference_relations` plus a future framework relation | Reference-only versus derived learner display must remain explicit | Missing in current DB |

## 7. Identity and source-lineage boundary

The design intentionally keeps four identities separate:

| Identity class | Purpose | Assignment rule in this package |
|---|---|---|
| Source identity | Logical source record | Must be assigned from governed source evidence; not created here |
| Artifact identity | Physical representation/file | Must preserve exact artifact evidence and checksum; not created here |
| Candidate identity | Pre-record transformation candidate | Remains outside this package's implementation scope |
| SEG record identity | Stable governed content record | Assigned only after authorized mapping and review; not created here |

The source lineage graph can preserve `duplicate`, `derived`, `related`, and `replacement` evidence without deletion, merge, overwrite, or automatic identity assignment. The normalized FRCEM/HIPPO family remains a separate-lineage candidate, and no relation is created by this package. [8] [9]

## 8. Review and activation boundary

The future review system is dimensioned rather than collapsed into one generic status. A record may be structurally valid while still blocked by medical review, rights review, pathway review, identity evidence, or implementation authorization.

| Review dimension | Minimum state direction | Can it alone publish? |
|---|---|---|
| Structural/content QA | `queued → in_review → pass/fail` | No |
| Medical review | `pending → under_review → approved/rejected/withdrawn` | No |
| Rights review | `pending → under_review → cleared/restricted/rejected` | No |
| Pathway/taxonomy review | `pending → reviewed → accepted/rejected` | No |
| Identity/source review | `unresolved → evidenced → rejected` | No |
| Implementation authorization | `not_requested → authorized/rejected` | No |
| Publication/activation | `not_eligible → eligible → active/withdrawn` | Only after all required gates and authorization |

A record with pending medical review, unresolved rights, unresolved identity, missing required references, or absent implementation authorization must remain non-visible to learners. The database proposal does not implement this rule; it defines the required future testable boundary. [2] [3] [6]

## 9. Logical RLS strategy

The design preserves the existing security foundation and does not alter current policies. Future content policies must be based on the actual authenticated identity source, explicit reviewer/admin boundaries, content state, rights state, and pathway scope. They must not rely on a generic `user.role` test alone. [2] [3] [6]

| Actor/context | Read scope | Write scope | Delete scope | Required future test |
|---|---|---|---|---|
| Unauthenticated/public learner | No source artifacts or unapproved records; approved active records only through intended learner surface | None | None | Pending, rights-restricted, and withdrawn records are not readable |
| Authenticated learner | Approved active records visible to the learner's governed pathway/shared-core scope | Learner-owned progress/bookmark/attempt surfaces only | Learner-owned operational rows only where current policy permits | Cross-track and non-active content is denied |
| Assigned content reviewer | Evidence required for assigned review items, including non-public artifacts subject to rights | Review decision fields/events only within assignment boundary | No deletion of governed evidence or events | Unassigned records and unrelated administrative writes are denied |
| Medical governance authority | Content medical-review state and event writes within authorized governance scope | Medical decisions/events only | No audit deletion; no source replacement | Rights state cannot be changed by medical-only authority |
| Rights governance authority | Artifact and display-rights evidence | Rights/display decisions/events only | No audit deletion; no clinical decision writes | Medical approval cannot imply display permission |
| Regional/admin boundary | Administrative metadata needed for approved capability | Explicitly scoped operational/admin actions | No silent deletion of governed content/audit history | Capability is checked separately from content approval |
| Service role | Explicitly constrained maintenance/transaction scope | Only authorized backend operations, all auditable | No bypass without audit and rollback controls | Service-role use is logged and never substitutes for RLS tests |
| Audit reader | Read-only audit visibility subject to governance scope | None | None | Append-only history is intact |

No executable RLS policy is included. A future implementation package must state the role source, owner boundary, service-role exception, read/write/delete scopes, and negative test cases before authorization. [6]

## 10. Atlas integration model

Atlas is a separate visual-governance boundary, not a shortcut around the content envelope. A future `atlas_assets` object should be related to a governed record through an explicit relation that preserves asset category, type, visual role, rights state, medical-review state, and source/locator evidence where applicable.

An Atlas asset must not become learner-visible merely because it is related to an approved content record. Conversely, an approved asset does not imply approval of the content record. Both asset and content gates must be independently satisfied, and every relation change must be auditable. No Atlas asset relation is created in this dry run. [3] [8]

## 11. Conceptual migration sequence

The following is a **design sequence only**, not an authorized migration plan and not executable SQL.

| Order | Conceptual package | Dependency and gate |
|---|---|---|
| 001 | Foundation vocabulary and common governance primitives | Exact target, identity source, timestamps, unresolved-state strategy, and audit conventions approved |
| 002 | Source governance | Source/artifact registry, checksum preservation, lineage evidence, rights boundary, and deletion behavior approved |
| 003 | Content shell and type boundaries | v1.1 relational mapping, stable identity policy, payload boundaries, and foreign-key strategy approved |
| 004 | Review and rights governance | Independent medical/content/quality review, rights/display state, assignment/conflict model, and state transitions approved |
| 005 | Taxonomy, pathway, and Atlas relations | Internship/resident/shared-core separation, taxonomy versioning, Atlas evidence, and policy tests approved |
| 006 | Security and downstream references | RLS matrix, service-role exception, learner foreign-key/reference behavior, activation checks, rollback, and QA approved |

No order item is ready for SQL generation solely because it appears in this table. The sequence must be reconciled with the actual deployment target and separately authorized. [6]

## 12. Rollback plan

Rollback must be reversible and evidence-preserving. It must never delete source originals, erase review history, or silently restore learner visibility.

| Rollback scenario | Detection evidence | Reversible response | Preservation requirement |
|---|---|---|---|
| Contract mapping mismatch | Schema-validation or mapping-test failure | Stop before implementation; revise dry-run mapping | Preserve v1.1 contract and unresolved fields |
| Review-state transition defect | State-machine test failure or unauthorized transition | Disable the affected transition path; keep current non-public state | Retain audit events and reviewer evidence |
| Rights/display leakage risk | Negative RLS/display test failure | Keep content/artifact non-visible; halt release | Preserve rights evidence and incident record |
| Pathway cross-visibility | Cross-track test failure | Block publication for affected scope; do not broaden visibility | Preserve track assignments and decision history |
| Atlas relation mismatch | Asset-rights/medical-review test failure | Detach relation in the release manifest, not by deleting source asset | Preserve asset identity, rights state, and audit history |
| Downstream learner-reference defect | Foreign-key or integration test failure | Prevent learner-reference creation or disable the affected release | Do not rewrite learner history or source records |
| Partial implementation failure | Migration/release evidence mismatch | Restore from the approved backup/release manifest under owner authorization | Record exact release/hash and rollback owner |

A future implementation package must include a release manifest, artifact hashes, ownership, backup/restore evidence, rollback command set, and QA sign-off. None is created here.

## 13. QA validation plan

The future QA pass must be read-only or executed against an isolated non-production target after separate authorization. It must validate the design against the contract and governance boundaries rather than merely checking that SQL parses.

| QA group | Validation objective | Pass condition |
|---|---|---|
| Contract alignment | Compare logical decomposition with v1.1 required fields, enum values, conditional case/skill payloads, and `additionalProperties: false` semantics | Every required envelope area has an explicit storage owner; no unsupported type is silently added or removed |
| Identity separation | Distinguish source, artifact, candidate, SEG record, and legacy identities | No automatic identity link is created from title/topic similarity; unresolved identity remains blocked |
| Source/lineage integrity | Preserve checksum, representation, parent/child, duplicate, derived, related, and replacement evidence | No source deletion, merge, overwrite, or silent replacement occurs |
| Referential integrity | Verify conceptual PK/FK direction, cardinality, uniqueness, nullability, and deletion behavior | All relations are explicit; orphaned governed records and destructive cascades are prohibited |
| Review-state machine | Validate allowed and forbidden transitions | Pending medical/rights/identity states cannot become active without required evidence and authorization |
| Rights isolation | Ensure clinical approval does not imply display permission | Rights and medical states are independently evaluated |
| Pathway separation | Test Internship Doctor, EM Resident, and Shared Medical Core scopes | Cross-track content is not visible or assignable without explicit governed scope |
| RLS matrix | Test learner, reviewer, medical, rights, admin, service-role, and audit-reader boundaries | Positive and negative cases match the approved role source and scope |
| Audit immutability | Verify append-only event behavior and actor/time/reason evidence | Decision history cannot be silently deleted or rewritten |
| Atlas boundary | Test asset relation, rights state, medical-review state, and display scope | Asset relation does not bypass either content or asset governance |
| Downstream protection | Test progress/bookmarks/exam-attempt references | Learner-operational rows reference approved governed record IDs only after authorization |
| Rollback readiness | Verify release manifest, hashes, restore ownership, and reversible response | A failed release can be blocked or rolled back without source or audit loss |
| Clinical/rights non-invention | Scan outputs for invented clinical approval, rights approval, or missing metadata filled as fact | Unresolved and blocked states are preserved verbatim |

## 14. Open decisions and blockers before any SQL

| Decision/blocker | Current status | Required evidence or authorization |
|---|---|---|
| Exact physical database target | Open | Confirm whether the target is Supabase/PostgreSQL, application-side Drizzle/MySQL, or a governed integration boundary; no assumption is allowed |
| Final logical-to-physical table mapping | Open | Review this package and approve names, keys, cardinality, nullability, indexes, and deletion behavior |
| `clinical_case` interpretation | `UNRESOLVED` | Confirm whether `NOT_SUPPORTED` means absent in current DB or unsupported by a contract; v1.1 type is retained meanwhile |
| Source identity and legacy bridge | Open | Stable identity evidence or separately governed manual bridge decision |
| Source metadata | Open | Owner, publisher, version, edition, rights, locator, and taxonomy evidence |
| Medical review | Open | Independent medical-owner review and decision records |
| Rights/display review | Open | Rights evidence and display/derivative scope decisions |
| Pathway taxonomy | Open | Approved Internship/Resident/Shared Core identifiers and separation rules |
| RLS role source | Open | Confirm actual identity provider and role/capability source for the implementation target |
| Implementation authorization | Not granted | Separate authorization specifying repository, branch, schema target, table list, migration order, owner, reviewer, security review, rollback, and QA |

## 15. Final decision

> **SEG DATABASE FOUNDATION DRY-RUN DESIGN PACKAGE v1.0: `DESIGN_EVIDENCE_READY_FOR_REVIEW`**
>
> **Supabase implementation: `NOT_STARTED`**
>
> **Next gate: independent review and authorization of the design package; no SQL before that gate.**

The package provides the requested ERD/logical model direction, proposed entities and relationships, primary-key/foreign-key intent, index strategy requirements, RLS matrix, review state machine, Atlas integration boundary, migration sequence, rollback plan, and QA validation plan. It does not authorize SQL, migration, import, adapter execution, activation, publication, or any change to the existing application, authentication, database schema, or medical governance.

## References

[1]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 canonical additive profile"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_ALIGNMENT_REPORT.md "SEG Database Alignment Report"

[3]: file:///home/ubuntu/seg-internship-output/SEG_CONTENT_STORAGE_DESIGN.md "SEG Content Storage Design"

[4]: file:///home/ubuntu/seg-manus-status/drizzle/schema.ts "Current application-side Drizzle schema"

[5]: file:///tmp/seg-supabase-review/supabase/schema.sql "Supabase declarative schema evidence"

[6]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"

[7]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_GAP_REGISTER.md "SEG Database Gap Register"

[8]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_EVIDENCE_REVIEW_22.md "Additional Evidence Review 22"

[9]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_ALIGNMENT_GATE_REPORT.md "SEG Database Alignment Gate Report"
