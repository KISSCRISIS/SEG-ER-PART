# SEG SQL MIGRATION DESIGN PACKAGE MANIFEST v1

**Package:** `SEG SQL MIGRATION DESIGN DRAFT v1`  
**Mode:** `DESIGN_ONLY / DRY_RUN`  
**Package status:** `READY_FOR_SCHEMA_AND_SECURITY_REVIEW`  
**SQL execution:** `BLOCKED`  
**Database change:** `NOT_AUTHORIZED`

## Included artifacts

| Artifact | Role | Boundary |
|---|---|---|
| `SEG_SQL_MIGRATION_DESIGN_DRAFT_V1.md` | Main design and decision record | Logical migration design; no executable SQL |
| `SEG_SQL_MIGRATION_PLAN_V1.md` | Ordered units `000–009` and dependency gates | Future sequence only; no migration files |
| `SEG_SQL_MIGRATION_TABLE_SPEC_V1.md` | Logical table/column/PK/FK/constraint/index/delete requirements | No engine-specific types or DDL |
| `SEG_SQL_RLS_DESIGN_DRAFT_V1.md` | Role matrix, predicates, service boundary, negative tests | No policies or grants |
| `SEG_SQL_ROLLBACK_AND_RECOVERY_DESIGN_V1.md` | Reverse dependency order and preservation rules | No rollback execution |
| `SEG_SQL_MIGRATION_QA_PLAN_V1.md` | Static, integrity, security, Atlas, pathway, and rollback acceptance plan | No tests against live database |

## Explicitly excluded

The package contains no `.sql` files, no executable migrations, no RLS policy scripts, no seed data, no medical content, no content records, no import payloads, no adapter, and no activation command. It does not include changes to `profiles`, `auth.users`, learner tables, operational/security logs, `_prisma_migrations`, `audit_logs`, storage, the application, routes, or authentication.

## Required review gates

Before any future SQL artifact, obtain independent review of target runtime/provider parity, exact reusable `content`/`content_versions` definitions, content-root choice, Atlas cardinality/FK strategy, role identity and conflict rules, RLS predicates, security queue items, migration ownership, backup/restore, rollback rehearsal, and QA acceptance.

## Final status

`DESIGN_COMPLETE_FOR_REVIEW`  
`SQL_NOT_CREATED`  
`SQL_EXECUTION_BLOCKED`  
`DATABASE_CHANGE_NOT_AUTHORIZED`

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_SQL_MIGRATION_DESIGN_DRAFT_V1.md "Main SQL Migration Design Draft"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_COMPATIBILITY_MATRIX_V1.md "Compatibility Matrix v1"

[3]: file:///home/ubuntu/seg-internship-output/SEG_SECURITY_REVIEW_QUEUE.md "Security Review Queue"

[4]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
