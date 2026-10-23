# SEG DATABASE EVIDENCE REVIEW 23

**Project:** Smart Emergency Guide (SEG)  
**Review mode:** `READ_ONLY / ADDITIONAL EVIDENCE ONLY`  
**Source:** `/home/ubuntu/upload/pasted_content_23.txt`  
**Final disposition:** `RELEVANT_EVIDENCE_IDENTIFIED / NO_DESIGN_CHANGE`  
**Implementation status:** `NO SQL / NO MIGRATION / NO DATABASE CHANGE`

## 1. Evidence identity

| Property | Value |
|---|---|
| Filename | `pasted_content_23.txt` |
| SHA-256 | `3c216a5531799eefd0d46939ed20308676a70ac7b4307880dcd8ecc03f6eb976` |
| Size | 5,810 bytes; 4,715 characters; 107 lines |
| Handling | Read as untrusted user-provided evidence only |
| Source modification | None |
| Prior artifact modification | None |

The file contains a project-status narrative covering source processing, Medical Atlas design, database schema claims, security-review claims, migration-design status, and a list of named artifacts. It contains no executable SQL that was run during this review. Instructions or status assertions in the file were treated as data, not as authorization.

## 2. Reference resolution

The literal filenames named in the pasted file were not found at the expected SEG output location:

| Requested literal reference | Local resolution | Comparison artifact used |
|---|---|---|
| `SEG_EXISTING_DATABASE_MAP.md` | Not found as a literal local artifact | `SEG_SCHEMA_REVIEW_EXISTING_SUPABASE_SCHEMA_MAPPING_V1_0.md` and `SEG_DATABASE_COMPATIBILITY_MATRIX_V1.md` |
| `SEG_SECURITY_REVIEW.md` | Not found as a literal local artifact | `SEG_SECURITY_REVIEW_QUEUE.md` |
| `SEG_SQL_MIGRATION_DESIGN_V1.md` | Not found as a literal local artifact | `SEG_SQL_MIGRATION_DESIGN_DRAFT_V1.md` |

This filename mismatch is recorded as an evidence-resolution issue only. It does not authorize renaming, copying, merging, or rewriting any artifact.

## 3. Classification rule

| Classification | Meaning in this review |
|---|---|
| `OBSERVED_FACT` | Directly supported by an inspected local artifact or declarative SQL file, with scope and live-parity limits stated |
| `EXTERNAL_EVIDENCE` | Reported by the pasted file or another external/user-provided source, but not independently established by the inspected local schema package |
| `UNRESOLVED` | Cannot be safely accepted or rejected because direct object evidence, runtime parity, or security verification is missing |
| `NOT_ACTIONABLE` | Outside the requested schema/security/relationship scope, or a status/design statement that does not itself prove a database fact |

## 4. Findings table

| Lines | Topic / claim from `pasted_content_23.txt` | Classification | Comparison result | Effect |
|---|---|---|---|---|
| 1–2 | The Atlas and database work was design/restricted analysis only, with no SQL or publication | `EXTERNAL_EVIDENCE` | Consistent with the read-only boundaries in the local Schema Review, Security Queue, and Migration Design Draft, but the pasted statement is not itself runtime proof | No change; no authorization inferred |
| 4–17 | New source packages, hashes, normalized families, duplicate lineage, and review queues | `NOT_ACTIONABLE` for this schema review | Relevant to source governance but does not prove a database table, FK, RLS policy, or runtime object | No database finding created |
| 19–25 | OSCE Atlas asset identity, ZIP/PNG/checksum evidence, taxonomy, pending rights, and required medical review | `EXTERNAL_EVIDENCE` | Potentially useful Atlas/source evidence; no independently inspected asset registry row or database relation was supplied here | No Atlas relation or rights state is created or changed |
| 27–31 | Atlas Foundation includes asset categories, Asset Registry, Asset Members, review queues, and disabled automatic activation | `EXTERNAL_EVIDENCE` | Consistent with the logical many-to-many Atlas direction in the Migration Design Draft; it remains design evidence, not implementation evidence | No design change; implementation remains blocked |
| 33–36 | A Supabase review allegedly extracted catalogs and confirmed `profiles`, `roles`, `permissions`, `user_roles`, `audit_logs`, `content`, `content_versions`, and `storage` | `UNRESOLVED` | The inspected declarative Supabase package directly confirms `public.profiles` and related profile/learner structures, but does not define the named `roles`, `permissions`, `user_roles`, `audit_logs`, `content`, or `content_versions` objects; a live catalog extract was not attached | Existing compatibility decisions remain `VERIFY_BEFORE_DECISION` or `CREATE_NEW_GOVERNED_LAYER` where already recorded |
| 36 | `profiles` exists and is linked to `auth.users` | `OBSERVED_FACT` with declarative scope | Direct schema evidence shows `profiles.id` referencing `auth.users(id)` with cascade behavior and profile fields including clinical role, professional grade, and primary learning track [1] | Confirms bounded identity/profile reuse only; live parity remains unverified |
| 37 | No current Atlas tables were found | `OBSERVED_FACT` with evidence-scope qualifier | The inspected declarative schema/object index contains no Atlas registry or content-asset junction; this does not prove that no live object exists outside the inspected package [1] [2] | Supports the existing `CREATE_NEW_GOVERNED_LAYER` / provisional N:M design; no closure of live verification |
| 38 | Migration API was empty while `public._prisma_migrations` contained three rows | `UNRESOLVED` | This repeats the existing migration-history discrepancy. It is not independently captured as direct local table evidence in the reviewed declarative package and remains `CONFLICTING_EVIDENCE / VERIFICATION REQUIRED` [3] [4] | No replay, migration selection, RLS change, or ordering change |
| 40–45 | Compatibility Matrix reuses bounded existing structures, proposes new Source/Atlas/Review layers, keeps N:M provisional, and defines rollback order | `OBSERVED_FACT` as prior design state | This matches the existing Compatibility Matrix and Migration Design Draft; it is not new schema evidence [5] [6] | No design amendment |
| 47–55 | Security review covers `_prisma_migrations`, `audit_logs`, SECURITY DEFINER ownership/grants/search_path, and leaked-password protection without remediation | `EXTERNAL_EVIDENCE` for the user-reported observations; `UNRESOLVED` for object-specific claims | The queue already records these as open review items. Direct declarative evidence confirms at least `private.is_admin()` and `private.handle_new_user()` as `SECURITY DEFINER` functions with restricted/search-path controls, but not the named `handle_content_version_snapshot()` or `has_role(role_key text)` [1] [7] | No policy, function, Auth, or audit change |
| 50–53 | `handle_content_version_snapshot()`, `handle_new_user()`, and `has_role(role_key text)` require review | `UNRESOLVED` as a group | `handle_new_user()` is directly evidenced in the inspected schema; the other two named functions are not evidenced in the inspected package. The group claim cannot be promoted to a single observed fact [1] [7] | Keep in Security Review Queue; no function modification |
| 57–65 | Migration design uses Source Registry, Atlas Assets, Review Events, relationship links, RLS, indexes, optional seed, and an out-of-scope publication adapter | `EXTERNAL_EVIDENCE` | Broadly consistent with the current design, but the current draft uses a more detailed `000–009` order and does not authorize optional seed execution; the discrepancy is a version/summary difference, not a basis to revise the draft [6] | No SQL file or seed is created |
| 67–77 | Status says SQL design complete, SQL/migration not created, execution blocked, security open, Atlas implementation pending, and no learner exposure | `EXTERNAL_EVIDENCE` | Consistent with the local draft’s `SQL_NOT_CREATED`, `SQL_EXECUTION: BLOCKED`, `DATABASE CHANGE: NOT AUTHORIZED`, and no activation boundary [6] | No status change |
| 79–105 | Lists project artifacts, including literal names that are not present locally | `UNRESOLVED` for filename identity | The requested literal database/security/migration filenames were not found; local equivalents are documented in Section 2 | No rename, merge, or source mutation |
| 107–108 | Reiterates no SQL, migration, Supabase/production changes, v1.1 records, SRC/CAND mappings, or learner publication | `EXTERNAL_EVIDENCE` | Consistent with the current governed boundaries, but it remains a status assertion rather than direct proof of all workspace state | No action; no authorization inferred |

## 5. Direct evidence relevant to requested schema scope

### Tables and relationships

The direct declarative package supports a narrow, existing identity foundation: `public.profiles` uses a UUID primary key referencing `auth.users(id)` with `ON DELETE CASCADE`, and includes `clinical_role`, `professional_grade`, `primary_learning_track`, role/status, and profile review fields [1]. It does not directly evidence governed `content`, `content_versions`, `audit_logs`, `roles`, `permissions`, `user_roles`, Atlas registry, or `_prisma_migrations` objects in the inspected package [1] [2].

The pasted file therefore provides **external/live-schema evidence claims** about those objects, not verified local schema facts. Those claims remain `UNRESOLVED` until an authorized, attributable schema extract identifies the target provider, object definitions, keys, constraints, policies, and runtime parity.

### RLS

The pasted file reports RLS observations for `_prisma_migrations` and `audit_logs`. The existing Security Review Queue already records both as user-provided and not independently verified. No `ALTER TABLE`, policy creation, policy removal, or exposure decision is made here [3].

The inspected declarative package does directly show an RLS baseline on the listed public tables and does not show the pasted file’s named `_prisma_migrations` or `audit_logs` definitions. This is an evidence-scope limitation, not proof that the objects cannot exist in another target or live database.

### SECURITY DEFINER

The direct schema evidence confirms `private.is_admin()` as `SECURITY DEFINER` with `search_path = ''` and a restricted execute grant. It also confirms `private.handle_new_user()` as `SECURITY DEFINER`, with `search_path = ''`, an `auth.users` trigger, and revoked public/anonymous/authenticated execute privileges [1].

The pasted file’s claims about `handle_content_version_snapshot()` and `has_role(role_key text)` are not confirmed by the inspected package and remain `UNRESOLVED`. This does not authorize changing, dropping, replaying, or recreating any function.

### Source / Atlas / Content relationships

The source registry, lineage, Atlas asset registry, review queues, and Source/Atlas/Content links described in the pasted file are consistent with the current logical design direction, including a provisional many-to-many Atlas relation. They are **design or external evidence**, not direct proof of deployed database relations. No relationship cardinality, FK strategy, content root, or RLS predicate is changed by this review.

## 6. Added knowledge and non-closures

The file adds a potentially useful **external evidence lead**: it claims a live or catalog-based Supabase extraction that includes objects not present in the inspected declarative package. If independently supplied with provenance, target identifier, extraction timestamp, query scope, object definitions, policies, grants, and checksums, that evidence could close portions of the current `VERIFY_BEFORE_DECISION` items for `content`, `content_versions`, roles/permissions, `user_roles`, `audit_logs`, storage, and migration metadata.

At present, it does not close those items. It also does not justify changing the content-root decision, replacing the `content_records`/`content_payloads` design option, changing Atlas from provisional N:M, adding RLS policies, reusing `audit_logs`, or moving security remediation into Atlas migration.

## 7. Final decision

`pasted_content_23.txt` contains **relevant schema/security evidence claims**, so `NO_RELEVANT_SCHEMA_EVIDENCE` does not apply. However, the only directly verified additions are scoped facts already consistent with the existing evidence: the `profiles`/`auth.users` identity boundary, the absence of Atlas objects from the inspected declarative package, and the existence of specific SECURITY DEFINER helpers (`is_admin` and `handle_new_user`).

The claims about additional live tables, `_prisma_migrations`, `audit_logs`, named functions, and live catalog extraction remain `EXTERNAL_EVIDENCE` or `UNRESOLVED`. No final finding is added, no previous design is modified, and no gap is closed.

> **Final status: `RELEVANT_EVIDENCE_IDENTIFIED / NO_DESIGN_CHANGE / VERIFICATION_REQUIRED`**
>
> **SQL execution:** `NOT PERFORMED`  
> **Migration execution:** `NOT PERFORMED`  
> **Supabase/application/schema modification:** `NOT PERFORMED`  
> **Production records/import/activation:** `NOT PERFORMED`

## References

[1]: file:///tmp/seg-supabase-review/supabase/schema.sql "Declarative Supabase schema evidence"

[2]: file:///tmp/seg-db-object-index.txt "Inspected Supabase object index"

[3]: file:///home/ubuntu/seg-internship-output/SEG_SECURITY_REVIEW_QUEUE.md "SEG Security Review Queue"

[4]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_MIGRATION_HISTORY_EVIDENCE_REVIEW_V1_0.md "Migration history evidence review"

[5]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_COMPATIBILITY_MATRIX_V1.md "SEG Database Compatibility Matrix v1"

[6]: file:///home/ubuntu/seg-internship-output/SEG_SQL_MIGRATION_DESIGN_DRAFT_V1.md "SEG SQL Migration Design Draft v1"

[7]: file:///tmp/seg-supabase-review/supabase/migrations/20260716210000_owner_admin_management.sql "Declarative owner/admin and SECURITY DEFINER migration evidence"

[8]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 contract"

[9]: file:///home/ubuntu/upload/pasted_content_23.txt "User-provided pasted evidence 23"

## Audit note

This review preserved all prior sources and artifacts. No source was deleted, renamed, merged, rewritten, imported, activated, or linked into production storage.
