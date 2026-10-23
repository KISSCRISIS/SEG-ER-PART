# SEG DATABASE FOUNDATION DRY-RUN PACKAGE MANIFEST v1.0

**Project:** Smart Emergency Guide (SEG)  
**Package status:** `DESIGN_EVIDENCE_READY_FOR_REVIEW`  
**Implementation status:** `NOT_STARTED`  
**Mode:** `CONTROLLED DESIGN / DRY-RUN / NOT IMPLEMENTED`

## Package purpose

This manifest enumerates the conceptual design artifacts issued for the SEG database foundation. The package is intentionally separated from SQL, migrations, imports, adapters, production JSON, records, and activation.

## Artifact inventory

| File | Role | Contains | Explicitly does not contain |
|---|---|---|---|
| `SEG_DATABASE_FOUNDATION_DRY_RUN_DESIGN_PACKAGE_V1_0.md` | Main design package | Architecture, v1.1 mapping, logical entities, review/rights/Atlas boundaries, RLS strategy, migration sequence, rollback, QA, blockers | SQL, migration, records, implementation approval |
| `SEG_DATABASE_FOUNDATION_DRY_RUN_ERD_V1_0.md` | Logical ERD | Mermaid logical relationship diagram, cardinality, identity boundary, clinical-case interpretation | Executable DDL, created foreign keys, database objects |
| `SEG_DATABASE_FOUNDATION_DRY_RUN_LOGICAL_SCHEMA_V1_0.md` | Logical schema register | Proposed PK/FK intent, uniqueness, deletion behavior, index requirements, unresolved-state rule | SQL types, executable constraints, physical schema |
| `SEG_DATABASE_FOUNDATION_DRY_RUN_RLS_MATRIX_V1_0.md` | RLS test/design matrix | Role-source assumptions, read/write/delete scope, predicates, negative tests | Policies, policy application, auth changes |
| `SEG_DATABASE_FOUNDATION_DRY_RUN_STATE_MACHINE_V1_0.md` | Governance state machine | Review dimensions, transition direction, guards, learner visibility rule, clinical-case handling | Enum creation, state transitions on records, approvals |
| `SEG_DATABASE_FOUNDATION_DRY_RUN_ROLLBACK_PLAN_V1_0.md` | Rollback design | Failure scenarios, containment, reversible response, evidence preservation, required future artifacts | Release execution, backups, restore, rollback commands |
| `SEG_DATABASE_FOUNDATION_DRY_RUN_QA_PLAN_V1_0.md` | QA validation plan | Contract, identity, lineage, integrity, RLS, rights, pathway, Atlas, learner-downstream, rollback tests | Test execution, database queries, clinical/rights approval |

## Evidence inputs

The package was prepared against the current project evidence set, including the canonical v1.1 schema, the existing database alignment reports, the additional evidence review 22, the current application-side Drizzle schema, the declarative Supabase schema evidence, and the governed database-foundation workflow. [1] [2] [3] [4] [5] [6]

## Package-level decisions

| Decision | Status |
|---|---|
| Treat content as a relationally decomposed v1.1 envelope rather than a flat record | Adopted as design direction |
| Preserve `clinical_case` in v1.1 | Retained; `NOT_SUPPORTED` implementation interpretation remains `UNRESOLVED` |
| Close any existing database gap | No; all existing DB gaps remain open |
| Change current application architecture or auth | No |
| Change current Supabase schema/RLS | No |
| Create SQL/migration/adapter/import | No |
| Create content or source records | No |
| Activate or publish content | No |
| Next gate | Independent review and explicit implementation authorization |

## Excluded and pre-existing artifacts

The output directory contains a pre-existing `phase-4.2.2-validation.json` file. It is not a component of this Markdown design package, was not created or modified by this task, and was not read or used as a database implementation artifact. It remains excluded and untouched. No SQL, migration, seed, import, production-record, or adapter file was created by this task.

## Integrity and scope note

These files are new conceptual artifacts in the governance output directory. They do not modify the repository application, `SEG_CONTENT_RECORD_V1_1`, the declarative Supabase evidence, source packages, or medical content. No Git staging, commit, or push is part of this task.

## Final package status

> **`DESIGN_EVIDENCE_READY_FOR_REVIEW`**
>
> **Supabase implementation remains `NOT_STARTED`.**
>
> **SQL is not authorized by this package.**

## References

[1]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 canonical additive profile"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_ALIGNMENT_REPORT.md "SEG Database Alignment Report"

[3]: file:///home/ubuntu/seg-internship-output/SEG_CONTENT_STORAGE_DESIGN.md "SEG Content Storage Design"

[4]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_EVIDENCE_REVIEW_22.md "Additional Evidence Review 22"

[5]: file:///home/ubuntu/seg-manus-status/drizzle/schema.ts "Current application-side Drizzle schema"

[6]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
