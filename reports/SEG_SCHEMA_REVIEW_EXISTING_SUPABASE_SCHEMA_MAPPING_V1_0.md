# SEG SCHEMA REVIEW — EXISTING SUPABASE SCHEMA MAPPING v1.0

**Project:** Smart Emergency Guide (SEG)  
**Review mode:** `READ_ONLY / DECLARATIVE EVIDENCE ONLY`  
**Review gate:** `GATE 1 — EXISTING SUPABASE SCHEMA MAPPING`  
**Status:** `EVIDENCE_MAPPED / LIVE_PARITY_UNVERIFIED`

## Scope and authority

This report maps the inspected Supabase SQL package and migrations without executing them. The SQL files are treated as declarative evidence only. The current application runtime is separately grounded in MySQL/Drizzle files and is not assumed to use the inspected Supabase schema. [1] [2] [3]

> **Decision boundary:** Existing Supabase objects can be described from the SQL evidence, but their existence in a live project, migration order, runtime parity, and application integration remain unverified in this read-only review.

## Current application-side runtime

| Evidence | Finding | Interpretation |
|---|---|---|
| `drizzle/schema.ts` | One MySQL `users` table with numeric `id` PK and unique `openId`; no content or Atlas tables | Current executable schema is user-only |
| `server/db.ts` | `drizzle-orm/mysql2`; lazy `DATABASE_URL` connection; user upsert and lookup only | Current app-side persistence is MySQL/Drizzle, not the inspected Supabase schema |
| `.env.example` / project package context | MySQL-oriented database configuration | Supabase SQL is not proven to be the live runtime database |

This distinction is a release blocker for any implementation mapping. No auth-provider substitution or database integration change is authorized by this review.

## Supabase declarative object map

### Identity and profile boundary

| Object | Primary key | Foreign keys | Relevant constraints/fields | Evidence status |
|---|---|---|---|---|
| `public.profiles` | `id uuid` | `auth.users(id)` `ON DELETE CASCADE`; `reviewed_by → auth.users(id)` `ON DELETE SET NULL`; later `admin_scope_updated_by → auth.users(id)` `ON DELETE SET NULL` | `clinical_role`, `professional_grade`, `primary_learning_track`, `role`, `status`, account/verification/subscription/educator state, timestamps, review fields | Declaratively mapped; live parity unverified |
| `auth.users` | Supabase-managed identity key | Referenced by profiles and admin audit evidence | External/auth boundary, not a public content table | Declaratively referenced only |
| `private.is_admin()` | Function | Reads profile/admin state | Security-definer helper used by policies | Declaratively mapped; execution unverified |
| `private.is_owner_admin()` | Function | Reads `public.profiles` | Owner-admin capability boundary | Declaratively mapped; execution unverified |
| `private.admin_has_regional_capability(...)` | Function | Reads `public.profiles` | Capability, region, language scope | Declaratively mapped; execution unverified |

The profile fields support the existing professional role vocabulary, including `intern_jmc` and `em_resident`, but they do not by themselves implement content-level pathway scope, review assignment, rights scope, or content visibility.

### Existing learning and operational tables

| Table | Primary key | Main relation | Current meaning | Reusable for governed content? |
|---|---|---|---|---|
| `progress_items` | `id uuid` | `user_id → auth.users(id)` cascade | Learner progress keyed by `item_id`; unique `(user_id, item_id)` | Downstream reference pattern only; not content storage |
| `bookmarks` | `id uuid` | `user_id → auth.users(id)` cascade | Learner bookmarks keyed by `item_id`; unique `(user_id, item_id)` | Downstream reference pattern only |
| `exam_attempts` | `id uuid` | `user_id → auth.users(id)` cascade | Attempt summary and JSON answer/topic data | Downstream assessment history only |
| `ai_usage_logs` | `id uuid` | `user_id → auth.users(id)` cascade | Operational AI usage log | Not content audit |
| `protection_logs` | `id uuid` | `user_id → auth.users(id)` cascade | Security/protection event log | Not content audit |
| `visual_asset_reviews` | `id uuid` | `reviewed_by → auth.users(id)` set null; `asset_id` unique text | Admin review metadata with `mapped_topic` and `mapped_section` | Atlas-adjacent review precedent only; no content relation or asset registry |
| `certificates` | `id uuid` | `user_id → auth.users(id)` set null | Certificate records | Not content storage |

### Existing governance/review tables from migrations

| Table | Primary key | Foreign keys | Current status model | Reusable boundary |
|---|---|---|---|---|
| `professional_credential_submissions` | `id uuid` | owner/reviewer → `public.profiles(id)` | `submitted`, `under_review`, `needs_changes`, `verified`, `rejected`, `revoked` | Strong pattern for owner/reviewer workflow, protected artifact metadata, and controlled RPC review |
| `professional_credential_review_events` | `id bigint identity` | submission → credential submission cascade; owner/actor → profiles | previous/new status, note, timestamp | Append-only-style review event pattern; credential-specific and not content audit |
| `admin_management_audit_events` | `id uuid` | actor/target → `auth.users(id)` | action plus previous/new JSONB state snapshots | Audited admin-scope transition pattern; not content audit |

## RLS and grant baseline

| Area | Current declarative behavior | Boundary for future content |
|---|---|---|
| Public schema | RLS enabled on listed public tables | New content tables would need explicit policies; no inherited safety should be assumed |
| Profiles | Owner/admin select and update; helper-driven admin checks | Does not provide content assignment or pathway rules |
| Learner tables | User-owned `for all` or owner-read patterns | These policies cannot be copied to governed content without state/rights/pathway predicates |
| Visual asset reviews | Admin-only all | Review metadata is not learner display permission and has no record relation |
| Credential tables | Owner/admin read or admin update; reviewer flow via security-definer functions | Reusable review pattern only; do not repurpose credential rows for content |
| Audit tables | Restricted select; explicit grants are narrow | Future content audit must be append-only and separately scoped |
| `private` schema | Revoked from public; helper execution granted narrowly | Security-definer patterns require independent security review |

## Gate 1 findings

| Finding | Classification | Consequence |
|---|---|---|
| Existing Supabase table names, PKs, major FKs, audit/review tables, and RLS baseline are mapped from declarative evidence | `AVAILABLE_AS_DECLARATIVE_EVIDENCE` | Gate 1 evidence mapping is substantially complete |
| Supabase SQL was not executed and live project parity is unverified | `UNRESOLVED` | Cannot authorize migration or claim current production objects |
| Current app runtime is MySQL/Drizzle and user-only | `AVAILABLE` | Any future Supabase content layer requires an explicit integration/identity decision |
| No governed content-record/source/lineage/review/rights/content-audit tables appear | `MISSING` | Existing schema cannot store v1.1 content envelope without a new design and review |
| `visual_asset_reviews` is not an Atlas registry or content relation | `AVAILABLE / LIMITATION` | Do not reuse it as the Atlas junction |

## Gate 1 decision

**Gate 1:** `MAPPED_FOR_SCHEMA_REVIEW`  
**Implementation readiness:** `NOT_READY`  
**Live parity:** `UNVERIFIED`  
**Next dependency:** Gate 2 storage-model decision, Gate 3 Atlas cardinality, and security review.

## Protected boundaries

No SQL was executed. No Supabase object was created or modified. No migration, adapter, import, content record, medical decision, rights decision, activation, or Git operation was performed.

## References

[1]: file:///tmp/seg-supabase-review/supabase/schema.sql "Declarative Supabase base schema evidence"

[2]: file:///tmp/seg-supabase-review/supabase/migrations/20260714010000_professional_credential_submission_mvp.sql "Declarative credential review migration evidence"

[3]: file:///tmp/seg-supabase-review/supabase/migrations/20260716210000_owner_admin_management.sql "Declarative owner-admin management migration evidence"

[4]: file:///home/ubuntu/seg-manus-status/drizzle/schema.ts "Current application-side Drizzle schema"

[5]: file:///home/ubuntu/seg-manus-status/server/db.ts "Current application-side database integration"

[6]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_ALIGNMENT_REPORT.md "Prior SEG database alignment report"
