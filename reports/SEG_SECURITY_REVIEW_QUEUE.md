# SEG SECURITY REVIEW QUEUE

**Project:** Smart Emergency Guide (SEG)  
**Mode:** `READ_ONLY / SECURITY REVIEW QUEUE`  
**Status:** `OPEN — NO SECURITY CHANGE AUTHORIZED`

## Purpose

This queue records security-sensitive findings raised during the database compatibility analysis. It does not authorize SQL, RLS changes, policy creation, function alteration, migration replay, or database writes. Each item requires independent evidence and an explicit security decision before implementation.

## Queue items

| ID | Area | Evidence state | Risk/question | Required review | Current action |
|---|---|---|---|---|---|
| SEC-QUEUE-001 | `public._prisma_migrations` RLS | User-provided: `RLS disabled`; not independently verified in inspected files | Enabling RLS may affect migration tooling; leaving it open may expose internal metadata depending on grants/runtime | Confirm owner, grants, access paths, tooling requirements, exposure, and whether the table is actually in the target runtime | **Do not execute `ALTER TABLE`; keep unresolved** |
| SEC-QUEUE-002 | `public.audit_logs` RLS/policies | User-provided: RLS enabled, no policies; not independently verified in inspected files | RLS without policies may deny access or create unclear service/admin behavior; broad audit visibility may leak governance data | Identify writers/readers, service role, admin role, reviewer role, insert/update/delete behavior, and append-only expectations | **Do not add policies or change RLS** |
| SEC-QUEUE-003 | Content audit separation | Existing operational/admin logs are evidenced; content audit is missing | Mixing operational, security, medical, rights, and Atlas audit domains can weaken traceability and access control | Define separate event domains and cross-record correlation without exposing restricted content | **Design review only** |
| SEC-QUEUE-004 | SECURITY DEFINER functions | Existing private helpers are evidenced; new user input requests review | Definer context, search path, ownership, grants, and dynamic inputs can create privilege escalation | Review owner, `search_path`, execute grants, auth context, input validation, and audit behavior | **No function changes** |
| SEC-QUEUE-005 | Leaked-password protection | User-provided review requirement; no authorized Auth configuration evidence captured | Auth configuration may be incomplete or differ by provider/runtime | Verify through the authorized Auth configuration/evidence path; do not infer from schema SQL | **No Auth change** |
| SEC-QUEUE-006 | Service-role boundary | Future content and Atlas designs require server-side operations | Service role may bypass RLS and expose pending/restricted content | Define server-only operations, allowlist, audit, secret handling, and negative tests | **Design blocker** |
| SEC-QUEUE-007 | Reviewer role separation | Medical, rights, structural, and technical review are distinct governance domains | A shared admin role may self-approve or cross-approve restricted decisions | Define assignment, conflicts, reviewer-not-self, escalation, and owner authority | **Governance/security review** |
| SEC-QUEUE-008 | Pathway RLS | Profile-level learning track exists; record-level scope is missing | Internship, Resident, and Shared Core content could leak across tracks | Define record/pathway junction and learner predicate with negative tests | **No policy implementation** |
| SEC-QUEUE-009 | Atlas display enforcement | Asset review/storage precedents exist; governed relation is missing | Rights-cleared assets and medically approved content can be mismatched | Require content gate + asset gate + relation gate + pathway/display scope | **Gate 3 review pending** |
| SEC-QUEUE-010 | Migration-history discrepancy | API reported empty; table observation reported named rows | Incorrect history can cause unsafe migration ordering or replay | Capture direct table evidence, source/time, checksum, and reconcile API/table views | **No migration replay** |
| SEC-QUEUE-011 | Runtime/provider mismatch | Current app uses MySQL/Drizzle; Supabase package is declarative evidence | Policies/FKs designed for Supabase may not protect the live app | Confirm target provider and integration boundary before physical design | **Implementation blocker** |
| SEC-QUEUE-012 | Audit immutability | Existing audit patterns are domain-specific | Update/delete privileges may rewrite governance history | Define append-only constraints, restricted grants, event actor, and rollback semantics | **No audit mutation** |

## Evidence classification

| Class | Meaning |
|---|---|
| `AVAILABLE_AS_DECLARATIVE_PATTERN` | Existing SQL or application evidence shows a pattern, but not necessarily the target content implementation |
| `USER_PROVIDED_UNVERIFIED` | Reported in task input but not independently captured in the current inspected files |
| `CONFLICTING_EVIDENCE` | Two evidence paths disagree, such as an empty API history and named table rows |
| `UNRESOLVED` | Requires an authorized source, owner decision, or security review |

## Queue exit criteria

No security item may be marked closed merely because a policy compiles or a table is reachable. Closure requires an evidence source, explicit owner/security decision, affected roles, negative tests, rollback implications, and confirmation that medical and rights governance remain separate.

## Non-actions

No SQL was executed. No RLS was enabled or disabled. No policy was created, altered, or dropped. No function, audit table, migration history, Auth setting, storage object, content record, Atlas relation, or application boundary was modified.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_COMPATIBILITY_INPUT_EVIDENCE_1.md "User-provided compatibility input evidence ledger"

[2]: file:///tmp/seg-supabase-review/supabase/schema.sql "Declarative Supabase base schema evidence"

[3]: file:///tmp/seg-supabase-review/supabase/migrations/20260716210000_owner_admin_management.sql "Declarative owner-admin and security-definer evidence"

[4]: file:///home/ubuntu/seg-manus-status/server/db.ts "Current application-side database integration"

[5]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
