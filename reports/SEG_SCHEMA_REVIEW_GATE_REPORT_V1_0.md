# SEG SCHEMA REVIEW GATE REPORT v1.0

**Project:** Smart Emergency Guide (SEG)  
**Phase:** `SEG DATABASE FOUNDATION — SCHEMA REVIEW`  
**Mode:** `READ_ONLY / DESIGN REVIEW / NOT IMPLEMENTED`

## Final gate decision

> **`ACCEPTED_FOR_SCHEMA_REVIEW`**
>
> **`NOT_APPROVED_FOR_DATABASE_IMPLEMENTATION`**
>
> **`BLOCKED_PENDING_EXISTING_SCHEMA_PARITY_RELATIONSHIP_DECISIONS_AND_SECURITY_REVIEW`**

The three requested reviews are documented. The package is sufficiently complete for schema review, but the evidence does not authorize a SQL migration draft or any database implementation action.

## Gate results

| Gate | Result | Evidence | Remaining blocker |
|---|---|---|---|
| Gate 1 — Existing Supabase Schema Mapping | `MAPPED_FOR_SCHEMA_REVIEW` | Declarative table, PK/FK, auth/profile, audit/review, RLS, grant, and runtime comparison | Supabase live parity and target-runtime decision |
| Gate 2 — v1.1 Storage Model | `RECOMMENDED_MODEL_PENDING_SECURITY_REVIEW` | Root `content_records` + 1:1 `content_payloads` + typed boundaries | Physical design, actor identity, pathway scope, clinical-case interpretation |
| Gate 3 — Atlas Cardinality | `RECOMMENDED_MANY_TO_MANY_PENDING_SECURITY_REVIEW` | Explicit `content_atlas_asset_relations` junction | Relation vocabulary, version targeting, display RLS, rights separation |
| Security Review | `REQUIRED` | Runtime/provider mismatch, role/assignment/pathway/service-role gaps | Independent security review and negative-test evidence |

## Exact decisions

### Existing Supabase mapping

The inspected declarative Supabase package has `public.profiles` linked to `auth.users`, learner tables, operational/security logs, `visual_asset_reviews`, certificates, credential review workflow, and admin-management audit events. The current app-side runtime is MySQL/Drizzle with user-only persistence. Therefore, Supabase is mapped as declarative evidence but not claimed as the current live application database.

### v1.1 storage model

The recommended design is normalized and relational:

```text
content_records
       |
       v
content_payloads
       |
       +--> typed content payload boundary

content_records
       +--> source/version/references
       +--> review/rights/taxonomy/audit relations
```

A flat root is rejected as the primary representation, and a generic polymorphic foreign-key table is rejected because it weakens type integrity and RLS. `clinical_case` remains in the logical model, with its `NOT_SUPPORTED` interpretation explicitly unresolved.

### Atlas cardinality

The recommended cardinality is many-to-many through an explicit junction. This supports multi-asset records, asset reuse, versioned representations, ordered relations, and independent asset/content rights and review gates. The current `visual_asset_reviews` table does not implement this relationship.

## Blockers before any SQL draft

1. Confirm whether the target persistence layer is MySQL/Drizzle, Supabase/PostgreSQL, or an explicitly integrated boundary.
2. Confirm canonical actor identity and FK mapping among Manus OAuth, MySQL users, Supabase auth users, and v1.1 reviewer/actor fields.
3. Approve the physical shape of the root, payload anchor, typed payloads, and governance relations.
4. Resolve the meaning of `clinical_case = NOT_SUPPORTED` without modifying the v1.1 contract implicitly.
5. Define record-level pathway scope and reviewer assignments for Internship Doctor, Emergency Medicine Resident, and Shared Medical Core.
6. Complete independent security review for RLS, service-role boundaries, role separation, Atlas display, and append-only audit.
7. Obtain authorized evidence of live schema parity if Supabase is the implementation target.

## Non-actions verified by scope

No SQL was executed. No migration, policy, table, function, trigger, record, adapter, import, seed, activation, or publication was performed. No application, authentication, route, schema contract, visual freeze, source package, or medical content was modified. No Git staging, commit, or push was performed.

## Next allowed phase

The next allowed phase is **Schema Review Closure**. Only after the listed blockers are closed and the project owner provides separate implementation authorization may a non-executing SQL migration draft be considered. Even then, the draft would remain subject to security, QA, rollback, medical governance, and rights review.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_SCHEMA_REVIEW_EXISTING_SUPABASE_SCHEMA_MAPPING_V1_0.md "Gate 1 Existing Supabase Schema Mapping"

[2]: file:///home/ubuntu/seg-internship-output/SEG_SCHEMA_REVIEW_V1_1_STORAGE_MODEL_DECISION_V1_0.md "Gate 2 v1.1 storage model decision"

[3]: file:///home/ubuntu/seg-internship-output/SEG_SCHEMA_REVIEW_ATLAS_CARDINALITY_DECISION_V1_0.md "Gate 3 Atlas cardinality decision"

[4]: file:///home/ubuntu/seg-internship-output/SEG_SCHEMA_REVIEW_SECURITY_REVIEW_V1_0.md "Security review"

[5]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 canonical additive profile"

[6]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
