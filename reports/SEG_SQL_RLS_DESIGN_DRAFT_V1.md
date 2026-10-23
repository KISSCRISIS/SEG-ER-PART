# SEG SQL RLS DESIGN DRAFT v1

**Mode:** `DESIGN_ONLY / NO POLICY EXECUTION`  
**Status:** `SECURITY_REVIEW_REQUIRED`

## Purpose

This document translates the accepted logical role model into future RLS requirements. It is not SQL and does not create, alter, enable, or disable policies. It does not change existing RLS on `profiles`, learner tables, `audit_logs`, `_prisma_migrations`, storage, or any other object.

## Identity source and trust boundary

The implementation must first resolve the target runtime/provider and actor identity. Supabase Auth identity and the current MySQL/Drizzle application identity must not be treated as interchangeable. A future policy may use an approved identity bridge only after owner and security review; it must not infer reviewer authority from a profile label alone.

Role predicates must be evaluated from an approved role/assignment source, with explicit record, source, asset, and pathway scope. `profiles.clinical_role`, `professional_grade`, and `primary_learning_track` are account-routing signals; they do not by themselves grant medical, rights, provenance, or Atlas approval.

## Future role/access matrix

| Role | Metadata read | Governed write | Review-event write | Delete | Explicit limits |
|---|---|---|---|---|---|
| Atlas Operator | Assigned Atlas metadata and link state | Asset metadata and assigned links | Visual/accessibility events only if assigned | No hard delete | Cannot grant medical or rights approval |
| Medical Reviewer | Assigned content and relevant provenance | Medical review state/events | Medical review only | No hard delete | Cannot change rights or source evidence; conflict blocks self-approval |
| Rights Reviewer | Assigned artifact/asset/content rights evidence | Rights state/events and display evidence | Rights review only | No hard delete | Cannot grant medical approval |
| Provenance Reviewer | Source, artifact, lineage, locator, checksum | Provenance metadata/events | Provenance review only | No hard delete | Cannot activate or publish |
| Admin | Controlled metadata, assignments, operational oversight | Only within approved admin scope | Administrative events; review events only if separately authorized | Retire/restrict through governed workflow | Admin role alone is not medical/rights authority |
| Learner | Published and permitted record/asset metadata and payload | None | None | None | No pending, blocked, restricted, audit, or source-restricted reads |
| Service role | Controlled system/migration access | Only during approved change window | Must attribute actor/context | Not a bypass for content approval | Never exposed to ordinary client requests |

## Policy predicate requirements

Every future policy must document the following predicates before implementation:

1. **Actor identity:** the authenticated principal and approved role source.
2. **Assignment scope:** whether the actor is assigned to the record, source family, asset, pathway, or review dimension.
3. **Owner boundary:** whether the actor owns the object or has delegated authority.
4. **Conflict boundary:** whether the actor created, transformed, or previously approved the subject.
5. **Track/pathway scope:** whether the object is permitted for Internship Doctor, Emergency Medicine Resident, Shared Medical Core, or another governed track.
6. **Review dimension:** whether the proposed write is medical, rights, provenance, visual, accessibility, publication, or administrative.
7. **Publication gate:** whether all applicable gates are approved before learner read.
8. **Withdrawal/restriction:** whether the object is revoked, blocked, superseded, or rights-restricted.
9. **Service-role condition:** whether access is part of a recorded authorized maintenance operation rather than an end-user request.

## Learner visibility predicate

A learner read must require all applicable conditions simultaneously: the record is published, the record’s medical review is approved, rights/display state is approved, required visual/accessibility states are approved, pathway scope matches the learner, no withdrawal/restriction is active, and the linked Atlas asset is independently display-permitted. A source artifact may remain restricted even when a derivative educational record is publishable; the policy must not expose the original artifact accidentally.

## Append-only audit requirements

Future content review and audit events must be insert-only for ordinary roles. No reviewer, learner, or admin policy should permit mutation or deletion of an event. Corrections must be represented as a new event referencing the prior event. Any retention/deletion exception requires a separate legal/security decision and must not be hidden inside a migration.

## Security-sensitive exclusions

`_prisma_migrations` remains `DO_NOT_REUSE` for content. `audit_logs` remains `VERIFY_BEFORE_DECISION`; its current RLS/policy state cannot be changed by this design. Existing SECURITY DEFINER functions must undergo owner, `search_path`, grant, input-validation, and audit-attribution review before any new governed function is proposed. Leaked-password protection remains an Auth configuration review item and is not addressed by Atlas or content migration.

## Negative test matrix

| Test | Expected result |
|---|---|
| Learner reads pending medical review | Deny |
| Learner reads rights-pending asset | Deny |
| Learner reads content outside primary pathway scope | Deny |
| Learner reads restricted source artifact | Deny |
| Medical Reviewer edits rights state | Deny |
| Rights Reviewer edits medical state | Deny |
| Provenance Reviewer activates publication | Deny |
| Atlas Operator approves medical review | Deny |
| Reviewer self-approves created content | Deny or require independent reviewer |
| Admin reads audit events | Only within explicit audit-read scope |
| Admin mutates append-only review event | Deny |
| Client impersonates service role | Deny |
| Service role writes without audit attribution | Deny or fail closed |
| Withdrawn record appears in learner query | Deny |
| Asset relation points to out-of-scope track | Deny or remain non-publishable |

## Security review gate

No future policy artifact may be considered implementation-ready until target identity parity, role assignment source, conflict rules, pathway semantics, audit ownership, service-role boundary, and direct evidence for existing table policy state are independently reviewed.

## Status

`RLS_DESIGN_COMPLETE_FOR_REVIEW`  
`POLICIES_NOT_CREATED`  
`POLICIES_NOT_EXECUTED`

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_RLS_MATRIX_V1_0.md "Prior conceptual RLS matrix"

[2]: file:///home/ubuntu/seg-internship-output/SEG_SECURITY_REVIEW_QUEUE.md "SEG Security Review Queue"

[3]: file:///home/ubuntu/seg-internship-output/SEG_SQL_MIGRATION_DESIGN_DRAFT_V1.md "SEG SQL Migration Design Draft v1"

[4]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
