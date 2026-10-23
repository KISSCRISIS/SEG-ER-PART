# SEG SCHEMA REVIEW — ATLAS CARDINALITY DECISION v1.0

**Review mode:** `READ_ONLY / DESIGN DECISION FOR REVIEW`  
**Review gate:** `GATE 3 — ATLAS CARDINALITY`  
**Decision status:** `RECOMMENDED_MANY_TO_MANY_PENDING_SECURITY_REVIEW`

## Decision summary

The recommended logical relationship is:

```text
atlas_assets
      |
      | 1 : many
      v
content_atlas_asset_relations
      ^
      | many : 1
content_records
```

Therefore, the effective relationship between `atlas_assets` and `content_records` is **many-to-many**.

## Why 1:1 is insufficient

A single governed content record may require multiple visual assets, such as an ECG figure, an imaging panel, an anatomy illustration, a procedure diagram, or a sequence of step images. A single Atlas asset may also be reused in multiple governed records when the same asset is cleared for multiple contexts. A 1:1 relation would force duplication or overwrite and would conflict with the project rule to reuse and organize original assets rather than duplicate them unnecessarily.

The existing `public.visual_asset_reviews` table has a unique `asset_id` and review metadata, but no foreign key to a content record, no asset registry identity/version boundary, no display-scope relation, and no content-to-asset junction. It is therefore an admin review precedent, not the Atlas model. [1]

## Recommended logical entities

| Entity | Purpose | Key design requirement |
|---|---|---|
| `atlas_assets` | Stable Atlas asset identity and preserved artifact metadata | Asset identity must be distinct from file representation and content relation |
| `atlas_asset_versions` | Version/checksum/format/rights evidence for a specific artifact | Preserve original and derived representations; do not overwrite evidence |
| `content_atlas_asset_relations` | Junction between a governed record and an asset/version | Composite uniqueness prevents duplicate relation rows while allowing reuse |
| `atlas_asset_review_state` | Current visual/rights/review state if separated from the asset root | Must not imply clinical content approval |
| `atlas_asset_audit_events` | Append-only asset/relation state history | Preserve actor, prior/new state, reason, evidence pointer, and time |

These are logical design names only. No tables or records exist as a result of this review.

## Junction relation fields for schema review

| Field | Purpose | Required review question |
|---|---|---|
| `relation_id` | Stable relation identity | UUID versus composite-only identity |
| `record_id` | FK to governed `content_records` | Must reference a real governed record, not a title or legacy ID |
| `asset_id` | FK to stable `atlas_assets` | Must not be only a storage path |
| `asset_version_id` | FK to preserved artifact version | Decide whether relation targets a version or resolves current version |
| `relation_role` | e.g., illustration, figure, algorithm, cover, procedure_step | Taxonomy and allowed vocabulary require review |
| `display_scope` | Learner display boundary | Must be independent from medical review and rights evidence |
| `sequence_index` | Ordering within a content record | Unique per record/context where applicable |
| `locator` | Placement or source/display locator | Required when the source or artifact needs exact traceability |
| `relation_state` | proposed, reviewed, restricted, active, withdrawn | Must not bypass asset or content gates |
| `created_at` / audit identity | Provenance | Append-only event history required |

## Cardinality matrix

| Scenario | 1:1 | Many-to-many | Recommended result |
|---|---:|---:|---|
| One lesson uses multiple ECG figures | Fails without duplication | Supports | Many-to-many |
| Same approved figure reused in two related lessons | Forces duplicate asset or overwrite | Supports reuse with separate relations | Many-to-many |
| One asset has original, cropped, annotated, and compressed versions | Cannot model versions cleanly | Supports asset/version separation | Many-to-many plus version table |
| One clinical skill uses ordered step images | Poor fit | Supports ordered junction rows | Many-to-many |
| Dedicated one-off cover image | Can be represented as a constrained special relation | Also supports it | Use many-to-many base; optional role-specific uniqueness |

## Governance and rights implications

The junction must not turn an asset into learner-visible content. Display requires both content-level and asset-level gates:

```text
content record active
AND content medical review approved
AND content rights/display cleared
AND asset version rights/display cleared
AND relation state active
AND requested pathway scope allowed
```

A rights clearance for an image does not approve the medical content in which it appears. Medical approval of a record does not clear an image for display. An Atlas relation must remain blocked if either side is unresolved, restricted, rejected, withdrawn, or unauthorized.

## Security-review questions

| Question | Current answer |
|---|---|
| Can learner reads resolve the junction? | Only after future RLS predicates include active content, asset, relation, rights, and pathway scope |
| Can a reviewer create a relation? | Not decided; assignment and role separation required |
| Can a rights reviewer approve medical content through the relation? | Must be denied |
| Can a medical reviewer clear image display rights? | Must be denied |
| Can one asset be attached across tracks? | Only with explicit governed scope and rights evidence; default cross-track exposure is blocked |
| Does current `visual_asset_reviews` implement this model? | No |

## Gate 3 decision

**Recommended cardinality:** `MANY_TO_MANY`  
**Schema-review status:** `READY_FOR SECURITY REVIEW`  
**Implementation status:** `NOT_STARTED`  
**Current table status:** no Atlas registry or content relation is present in the inspected schema evidence.

This is a design decision for review, not approval to generate or execute SQL.

## References

[1]: file:///tmp/seg-supabase-review/supabase/schema.sql "Declarative Supabase base schema evidence; visual_asset_reviews"

[2]: file:///tmp/seg-supabase-review/supabase/migrations/20260714002000_admin_identity_avatar_verification_review.sql "Declarative protected avatar storage evidence"

[3]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 canonical additive profile"

[4]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_DESIGN_PACKAGE_V1_0.md "Prior Atlas integration design boundary"
