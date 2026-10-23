# SEG DATABASE COMPATIBILITY MATRIX v1

**Project:** Smart Emergency Guide (SEG)  
**Mode:** `CONTROLLED READ_ONLY COMPATIBILITY ANALYSIS`  
**Status:** `READY_FOR_COMPATIBILITY_REVIEW / SQL_NOT_CREATED`  
**Implementation:** `NOT_STARTED`

## Scope and decision rule

This matrix compares SEG database-foundation requirements with the inspected Supabase declarative evidence, the current MySQL/Drizzle application runtime, and the new user-provided database observations. It produces only a compatibility decision: **Reuse**, **Modify**, **Create**, or **Verify before decision**. It does not execute SQL, modify policies, create migrations, create tables, import records, or activate content.

The existing Supabase SQL package remains declarative evidence. The current application runtime remains grounded in `drizzle/schema.ts` and `server/db.ts`, which show a MySQL/Drizzle user-only persistence layer. [1] [2] [3]

> **Compatibility is not implementation approval.** A `Reuse` result means “reuse as a bounded pattern or existing capability after verification,” not “modify or migrate now.”

## Decision vocabulary

| Decision | Meaning in this matrix |
|---|---|
| `REUSE` | Existing evidence supports bounded reuse for the same purpose, subject to parity/security checks |
| `REUSE_PATTERN_ONLY` | Existing structure is useful as a design precedent but must not be repurposed as governed content storage |
| `MODIFY_AFTER_REVIEW` | Existing object may be extended only after explicit schema/security review and authorization |
| `CREATE_NEW_GOVERNED_LAYER` | No compatible governed object was evidenced; a new layer is required in a future authorized design |
| `VERIFY_BEFORE_DECISION` | Claims conflict, are incomplete, or are user-provided without direct object evidence |
| `DO_NOT_REUSE` | Existing object’s purpose or security boundary is incompatible with the SEG requirement |

## Compatibility matrix

| SEG requirement | Existing evidence | Decision | Compatibility finding | Required closure |
|---|---|---|---|---|
| Supabase Auth identity boundary | `profiles.id → auth.users.id` in declarative evidence | `REUSE_PATTERN_ONLY` | Strong Supabase pattern, but live parity and app integration are unverified | Confirm target runtime/provider and live parity |
| Current app user identity | MySQL `users.id`, unique `openId`, user-only Drizzle queries | `REUSE` for current app user boundary | Runtime truth is MySQL/Drizzle; no content layer | Do not map to Supabase FKs without identity decision |
| `profiles` | Profile role, clinical role, grade, learning track, account/review fields | `REUSE` bounded | Reuse for account-level identity/routing only | Add no content semantics implicitly |
| Roles and admin capabilities | `profiles.role`, admin level/capabilities/regions/languages, private helpers | `REUSE_PATTERN_ONLY` | Useful administrative boundary; not content reviewer assignment or medical authority by itself | Define explicit content roles and conflict rules |
| `user_roles` | Named in task input but no object evidence captured in current package | `VERIFY_BEFORE_DECISION` | Cannot mark available from name alone | Capture table definition, PK/FK, RLS, policies |
| Permissions/authorization | Existing admin helpers and grants | `REUSE_PATTERN_ONLY` | General admin boundary exists; content-level permissions absent | Define record/pathway/reviewer predicates |
| `audit_logs` | User-provided: RLS enabled, no policies; not independently verified in inspected files | `VERIFY_BEFORE_DECISION` | Potentially broad audit surface with unresolved read/write exposure | Security queue; identify writers/readers/service/admin/reviewer scope |
| `content audit` | v1.1 audit envelope; no content audit relation evidenced | `CREATE_NEW_GOVERNED_LAYER` | Operational/admin logs are not content provenance audit | Design append-only content audit events |
| `_prisma_migrations` | User-provided: RLS disabled; internal metadata table | `DO_NOT_REUSE` for content | Migration metadata is not content governance storage | Security review of exposure/tool compatibility; no automatic RLS change |
| Migration history API | User-provided: empty result | `VERIFY_BEFORE_DECISION` | Conflicts with reported table rows | Capture direct table evidence and reconcile |
| Migration history table | User-provided rows: `20260730_uuid_migration`, `20260801_phase2c_journal_practice`, `20260801_phase2c_practice_core_expansion` | `VERIFY_BEFORE_DECISION` | Table evidence is stronger candidate than empty API view, but not independently captured here | Record source/query/time/checksum; no replay |
| `progress_items` | Learner progress keyed by user/item | `REUSE` downstream only | Suitable learner interaction surface after content exists | No content provenance fields implied |
| `bookmarks` | Learner bookmark keyed by user/item | `REUSE` downstream only | Suitable downstream reference surface | Do not treat `item_id` as content identity without adapter decision |
| `exam_attempts` | Learner attempt and JSON answer/topic history | `REUSE` downstream only | Suitable attempt history, not question-bank storage | Define stable content/question identity later |
| Existing `content` tables | Task input says reuse existing content tables; no direct object evidence in inspected Supabase package | `VERIFY_BEFORE_DECISION` | Prior alignment evidence classified governed content storage as missing; new claim is unresolved | Capture exact table names, PK/FK, columns, RLS, policies, provenance, versioning |
| Existing `content_versions` | Task input lists it; no direct object evidence in inspected package | `VERIFY_BEFORE_DECISION` | Could be compatible or legacy/non-governed; cannot assume | Capture exact schema and lineage semantics |
| `content_records` root | No current governed record table evidenced | `CREATE_NEW_GOVERNED_LAYER` | Needed as v1.1 envelope anchor unless verified existing table is contract-compatible | Schema review before draft |
| `content_payloads` | No current governed payload anchor evidenced | `CREATE_NEW_GOVERNED_LAYER` | Recommended normalized payload boundary | Decide typed child implementation |
| `source_registry` | No existing object evidenced | `CREATE_NEW_GOVERNED_LAYER` | Required for source_id/owner/location/accessed_at | Preserve unresolved states; no source import |
| `source_artifacts` / representations | No existing object evidenced | `CREATE_NEW_GOVERNED_LAYER` | Needed for artifact identity, format, checksum, and representation family | Define artifact/version uniqueness |
| `source_lineage` | Phase 7.8.17 evidence only; no DB relation | `CREATE_NEW_GOVERNED_LAYER` | Required for source family and derived relationships | Keep lineage candidate separate; no SRC/CAND mapping |
| SHA/version registry | v1.1 checksum field and source evidence; no DB store | `CREATE_NEW_GOVERNED_LAYER` | Required for exact version/checksum traceability | Enforce 64-hex checksum and immutable evidence |
| References/locators | v1.1 requires references with locator/supports; no DB layer evidenced | `CREATE_NEW_GOVERNED_LAYER` | Required for chapter/question/section traceability | Preserve exact locators; no invented citations |
| Taxonomy | Profile learning-track field only; no content taxonomy object | `CREATE_NEW_GOVERNED_LAYER` | Account routing is not content taxonomy | Define taxonomy ID/version and record scope |
| Pathways | `primary_learning_track` at profile level; no content/pathway relation | `CREATE_NEW_GOVERNED_LAYER` | Required to separate Internship Doctor, EM Resident, and Shared Medical Core | Define many-to-many record/pathway scope and RLS |
| `review_events` | Credential review events exist as credential-specific pattern | `REUSE_PATTERN_ONLY` | Transition/event shape is reusable as a pattern, not content review storage | Create content-specific review relation after role design |
| Review queue | Credential submission workflow only | `CREATE_NEW_GOVERNED_LAYER` | No content review queue evidenced | Define assignment, states, conflicts, and visibility |
| Medical review | v1.1 medical review object; no content medical review table | `CREATE_NEW_GOVERNED_LAYER` | Must remain separate from rights and structural review | SEG Medical Decision Owner approval required |
| Rights review | No content rights/display object evidenced | `CREATE_NEW_GOVERNED_LAYER` | Required for text/image usage, display scope, license evidence | Define rights evidence and display gates |
| Provenance | Source/lineage evidence external to DB; no governed relation | `CREATE_NEW_GOVERNED_LAYER` | Needed to connect record → artifact → locator → version | Preserve source identity and audit chain |
| Atlas registry | `visual_asset_reviews` and protected storage patterns only | `REUSE_PATTERN_ONLY` | Review/storage precedent, not Atlas registry | Create governed `atlas_assets` layer after security review |
| Atlas asset members/junction | No content↔asset relation evidenced | `CREATE_NEW_GOVERNED_LAYER` | Recommended many-to-many relation | Define role/order/version/display predicates |
| Storage | Private credential/avatar storage policies as patterns | `REUSE_PATTERN_ONLY` | Storage security patterns exist; no governed source/Atlas/content bucket model | Confirm storage owner, rights, and object path policy |
| Asset review | `visual_asset_reviews` admin-only pattern | `REUSE_PATTERN_ONLY` | Can inform review state, not content display authorization | Separate asset rights and content medical gates |
| Operational logs | `ai_usage_logs`, `protection_logs` | `REUSE` for operational accountability | Not content provenance or clinical approval audit | Keep domains separate |
| Security-definer functions | Existing private helpers; user-provided review flag | `VERIFY_BEFORE_DECISION` | Useful but high-risk boundary requiring owner/search_path/grant review | Add `SECURITY_REVIEW_QUEUE` item; no modification |
| Leaked-password protection | User-provided review requirement; not in declarative package | `VERIFY_BEFORE_DECISION` | Auth configuration evidence is incomplete | Verify through authorized Auth configuration evidence |
| Content governance envelope | v1.1 contract requires source/version/references/rights/taxonomy/medical_review/audit | `CREATE_NEW_GOVERNED_LAYER` | No compatible complete envelope evidenced | Keep contract unchanged; design relational storage |

## Key compatibility conclusions

### Existing reusable foundation

The current evidence supports bounded reuse of account identity, profile routing fields, owner/admin security patterns, operational logs, downstream learner progress/bookmark/attempt surfaces, credential review workflow patterns, and protected storage patterns. These structures must remain in their existing domains and must not be silently reinterpreted as governed content storage.

### Existing content-table claim requires verification

The task input states that existing content tables should be reused. The inspected Supabase package and prior alignment report did not evidence a governed `content` or `content_versions` layer, so the claim cannot be accepted as fact yet. It is recorded as `VERIFY_BEFORE_DECISION`, with exact table-definition capture required. If the tables exist but do not preserve the v1.1 envelope, source lineage, rights, medical review, and audit, they may be legacy/downstream structures rather than reusable governed roots.

### Missing governed layers

Unless direct evidence closes the verification items, SEG still requires new governed layers for source registry, artifact/version/lineage, content envelope, payload boundary, references/locators, taxonomy/pathway scope, review queue, medical review, rights review, content audit, Atlas registry, and Atlas relation.

### Security-sensitive objects

`_prisma_migrations` and `audit_logs` are not implementation targets in this phase. The former is internal migration metadata with an unresolved RLS/tooling exposure question. The latter has a user-provided `RLS enabled / no policies` observation that requires a separate security queue. Neither observation authorizes `ALTER TABLE`, policy creation, or table reuse.

## Final matrix status

> **`DATABASE_FOUNDATION_READY_FOR_COMPATIBILITY_ANALYSIS`**
>
> **`ATLAS_DESIGN_FOUNDATION_ACCEPTED_FOR_REVIEW`**
>
> **`CONTENT_STORAGE_REUSE_UNRESOLVED_PENDING_DIRECT_SCHEMA_EVIDENCE`**
>
> **`MIGRATION_NOT_STARTED`**
>
> **`SQL_NOT_CREATED`**

## References

[1]: file:///home/ubuntu/seg-manus-status/drizzle/schema.ts "Current application-side Drizzle schema"

[2]: file:///home/ubuntu/seg-manus-status/server/db.ts "Current application-side database integration"

[3]: file:///tmp/seg-supabase-review/supabase/schema.sql "Declarative Supabase base schema evidence"

[4]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_ALIGNMENT_REPORT.md "Prior SEG Database Alignment Report"

[5]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 contract"

[6]: file:///home/ubuntu/seg-internship-output/SEG_SCHEMA_REVIEW_EXISTING_SUPABASE_MAPPING_PACKAGE_V1_0.md "Prior Schema Review package"

[7]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_COMPATIBILITY_INPUT_EVIDENCE_1.md "User-provided compatibility input evidence ledger"

[8]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
