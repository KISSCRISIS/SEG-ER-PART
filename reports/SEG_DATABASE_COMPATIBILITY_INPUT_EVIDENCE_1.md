# SEG DATABASE COMPATIBILITY — INPUT EVIDENCE 1

**Evidence class:** `USER_PROVIDED_DATABASE_OBSERVATIONS`  
**Verification status:** `NOT_INDEPENDENTLY_VERIFIED / READ_ONLY`  
**Date context:** 2026-08-22 (project session context)

## Observations supplied for compatibility analysis

The task input reports the following database observations:

| Observation | Supplied state | Handling rule |
|---|---|---|
| `public._prisma_migrations` | RLS disabled | Do not enable RLS automatically; review internal-tool access and exposure first |
| `public.audit_logs` | RLS enabled, no policies | Create a security review queue item; do not modify until writer/reader/service/admin/reviewer scope is known |
| Migration history API | Returned empty | Do not treat API output as the only history source |
| Migration history table | Reported rows: `20260730_uuid_migration`, `20260801_phase2c_journal_practice`, `20260801_phase2c_practice_core_expansion` | Treat as higher-priority table evidence for compatibility review, but require captured schema/table evidence before implementation |
| Security-definer functions | Require review | Inspect owner, search path, execute grants, auth context, and audit behavior; do not alter now |
| Leaked-password protection | Requires review | Verify Auth configuration through an authorized evidence path; do not infer from public schema |
| Existing content tables | Task input proposes reuse | No table names or columns supplied; classify as unresolved until direct declarative evidence is captured |
| Existing `user_roles`, permissions, taxonomy, pathways, content, and content_versions | Listed as compatibility areas | Do not mark available solely from the list; require named object/column/constraint evidence |

## Required precedence rule

When an API history view is empty but a database-table observation reports migration rows, the discrepancy is recorded as `CONFLICTING_EVIDENCE`. The table observation is the stronger candidate for migration-history review, but it is not independently verified in this session. No migration is inferred, replayed, or applied.

## Non-execution instruction

This ledger is evidence only. It authorizes no SQL, no RLS change, no migration, no schema modification, no database query, no import, and no activation.
