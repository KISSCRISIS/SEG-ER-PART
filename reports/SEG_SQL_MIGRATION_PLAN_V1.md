# SEG SQL MIGRATION PLAN v1

**Mode:** `DESIGN_ONLY / NO SQL EXECUTION`  
**Status:** `READY_FOR_SCHEMA_AND_SECURITY_REVIEW`  
**Migration files:** `NOT_CREATED`

## Plan rule

The sequence below is a dependency plan for a future authorized migration. It is not an instruction to run SQL. Every step remains blocked until target-provider parity, direct schema verification, security review, and explicit implementation authorization are complete.

## Ordered migration units

| Order | Unit | Goal | Depends on | New-object scope | Gate |
|---|---|---|---|---|---|
| `000` | Target/parity preflight | Confirm target provider, schema, environment, identity boundary, migration owner, and exact reusable-table definitions | Current evidence package | None | Mandatory stop gate |
| `001` | Source registry | Establish governed source identity, owner/publisher evidence, version/rights/review placeholders, and immutable source status | 000 | Source Governance | Metadata and rights model approved |
| `002` | Source artifacts | Register files/representations, format, language, edition, checksum, location, and artifact status | 001 | Source Governance | Artifact uniqueness and storage boundary approved |
| `003` | Source lineage | Record parent/child/derived/representation relationships with evidence and review state | 001, 002 | Provenance | Lineage relation vocabulary approved |
| `004` | Atlas assets | Register visual assets independently from existing `visual_asset_reviews` and storage patterns | 000; rights model | Atlas Governance | Asset rights and owner boundary approved |
| `005` | Atlas asset members | Connect Atlas assets to the chosen content root through many-to-many links, with role/order/version/scope | 004; content-root decision | Atlas Governance | Content schema, FK, cardinality, and display predicates approved |
| `006` | Review events | Record medical, rights, provenance, visual, accessibility, and publication review events; expose current projections | Role model and state machine | Review Governance | Reviewer assignment and conflict rules approved |
| `007` | Content links | Add source/artifact, reference/locator, taxonomy/pathway, rights subject, and content-to-Atlas relations | 001–006; content-root decision | Governed linkage | Existing content parity or new-root authorization |
| `008` | RLS design | Implement only after review the approved policy set for new objects and role predicates | 000–007; security review | Security boundary | Independent security sign-off |
| `009` | Indexes/constraints | Add approved indexes and constraints for new objects only | 001–008; QA | Integrity/performance | QA, backup, rollback, and authorization |

## Content-root branch

Step `007` has a controlled branch. If direct evidence proves that existing `content` and `content_versions` satisfy the v1.1 envelope and governance requirements, the plan uses them as the content root and adds only missing governed relations. If they are legacy/downstream or incomplete, the future authorized plan must introduce `content_records` and, where required, `content_payloads` before content links. This branch cannot be resolved from table names alone.

## Checkpoint requirements

Each step requires a recorded preflight and postflight checkpoint containing the target identity, object list, expected keys/constraints, RLS state, checksum of the migration artifact, execution actor, timestamp, and rollback reference. A checkpoint failure blocks the next step.

## Non-target objects

The plan does not authorize changes to `auth.users`, `public.profiles`, existing learner tables, current operational/security logs, `professional_credential_submissions`, credential review events, `_prisma_migrations`, existing Atlas-adjacent structures, Manus OAuth, application routes, or medical source/content files.

## Failure ordering

A failure in `000` stops the plan before any object creation. A failure in steps `001–007` stops downstream dependency creation. A failure in `008` leaves the governed layer non-publishable and blocks learner exposure. A failure in `009` blocks release until integrity and performance checks are rerun. No fallback may bypass review or expose pending content.

## Final plan state

`DESIGN_COMPLETE_FOR_REVIEW`  
`SQL_NOT_CREATED`  
`EXECUTION_BLOCKED`

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_SQL_MIGRATION_DESIGN_DRAFT_V1.md "SEG SQL Migration Design Draft v1"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_COMPATIBILITY_MATRIX_V1.md "SEG Database Compatibility Matrix v1"

[3]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 contract"
