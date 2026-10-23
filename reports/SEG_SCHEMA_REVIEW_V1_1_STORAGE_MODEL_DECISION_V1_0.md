# SEG SCHEMA REVIEW — SEG_CONTENT_RECORD_V1_1 STORAGE MODEL DECISION v1.0

**Review mode:** `READ_ONLY / DESIGN DECISION FOR REVIEW`  
**Review gate:** `GATE 2 — SEG_CONTENT_RECORD_V1_1 MAPPING`  
**Decision status:** `RECOMMENDED_MODEL_PENDING_SECURITY_REVIEW`

## Decision summary

The recommended logical model is:

```text
content_records                         -- governed record identity and envelope anchor
        |
        | 1:1
        v
content_payloads                        -- typed payload anchor and contract snapshot
        |
        +--> lesson_payload              -- only after a type-specific contract exists
        +--> question_bank_payload       -- only after a type-specific contract exists
        +--> book_payload                -- only after a type-specific contract exists
        +--> clinical_case_payload       -- v1.1 conditional content boundary
        +--> clinical_skill_payload      -- v1.1 conditional content boundary

content_records
        |
        +--> source/version/reference/rights/taxonomy/review/audit relations
```

This is a **normalized shell-plus-typed-payload design**. It is not a flat `content_records` table and it is not a catch-all polymorphic foreign-key model.

## Options considered

| Option | Strength | Failure mode for SEG | Decision |
|---|---|---|---|
| Flat `content_records` | Simple initial reads | Flattens nested envelope, mixes governance with payload, weakens conditional type rules, encourages unreviewed JSON/columns | Rejected as the primary model |
| `content_records` + `content_payloads` with typed child boundary | Preserves envelope identity, supports exact v1.1 reconstruction, permits type-specific constraints, separates governance from payload | Requires deliberate FK/cardinality and type review | **Recommended for schema review** |
| Single polymorphic payload table | Flexible early | Generic `entity_id/entity_type` links weaken referential integrity, RLS predicates, uniqueness, and type-specific validation | Rejected as the primary model |
| One table per content type with duplicated envelope | Strong type constraints | Duplicates source/version/rights/audit logic and makes cross-type governance inconsistent | Rejected as the primary model |

## Mapping of v1.1 envelope areas

| v1.1 field/area | Logical storage owner | Required behavior |
|---|---|---|
| `record_id`, `title`, `content_type`, `language` | `content_records` | Stable governed identity; content type is constrained to the v1.1 enum; no legacy identity inference |
| `source` | Source registry plus `content_source_relations` | Preserve source ID, publisher/owner, location, accessed time, relation type, and unresolved state |
| `version` | Version/artifact registry related to the record | Store value and 64-hex checksum as evidence; distinguish source artifact version from derived record version |
| `references[]` | `content_references` and reference-support relation | Preserve reference ID, locator, and `supports[]`; no citation invention |
| `rights` | `content_rights_state` plus rights evidence relation | Store text/image usage, display scope, license evidence, and decision history separately from medical review |
| `taxonomy` | Taxonomy relation/scope table | Store taxonomy ID/version and explicit pathway scope; folder or filename is insufficient |
| `medical_review` | Current medical review state plus append-only review events | Keep reviewer, decision, reviewed time, notes, and governance history; no automatic approval |
| `audit` | Append-only `content_audit_events` | Preserve created-by/created-at and every state/evidence event; no history rewrite |
| `content` for `clinical_case` | `clinical_case_payload` behind `content_payloads` | Required when type is `clinical_case`; fields follow v1.1 only; interpretation of current database support remains unresolved |
| `content` for `clinical_skill` | `clinical_skill_payload` behind `content_payloads` | Required when type is `clinical_skill`; fields follow v1.1 only |
| `relationships.reference_framework` | `content_reference_framework_relations` | Preserve book record identity, framework role, locator policy, and display scope |

## Conditional type rules

The v1.1 contract requires `content` for `clinical_case` and `clinical_skill`, and forbids `content` for `lesson`, `question_bank`, and `book`. [1] The relational design therefore must enforce a one-to-one payload anchor and a type-compatible child boundary. A row cannot be learner-visible merely because a payload row exists.

The `clinical_case` phrase `NOT_SUPPORTED` from the additional evidence is retained as an unresolved implementation interpretation. The type remains in the logical design because it is present in v1.1. This report does not decide whether the phrase means “not supported by the current database” or “not supported by the contract.” [2]

## Identity and version boundary

The following identities must remain distinct:

| Identity | Purpose | Prohibited substitution |
|---|---|---|
| `source_id` | External/source registry identity | Do not replace with title or filename |
| `artifact_id` | Specific preserved file/representation | Do not replace with source family |
| `version_id` | Version/checksum identity | Do not infer from timestamps alone |
| `record_id` | SEG governed record identity | Do not derive from legacy object ID without evidence |
| `payload_id` | Type-specific payload anchor | Do not use as source identity |
| `legacy_object_id` | Legacy evidence identity | Do not treat as SEG identity |

## Schema-review conclusion

**Recommended logical decision:**

> Use `content_records` as the governed main table, with a one-to-one `content_payloads` anchor and type-specific child boundaries. Keep source, version, references, rights, taxonomy, medical review, audit, and Atlas relations outside the flat root row. Reject a generic polymorphic foreign-key pattern as the primary storage model.

This decision is **accepted for schema review only**. It does not authorize SQL, migration generation, adapter creation, import, or activation.

## Remaining blockers for Gate 2 closure

| Blocker | Status |
|---|---|
| Exact physical columns/types and JSONB-versus-typed-field choice for each payload | `OPEN — requires schema review` |
| Runtime target: MySQL/Drizzle versus Supabase/PostgreSQL | `OPEN — integration decision required` |
| Clinical-case support interpretation | `UNRESOLVED` |
| Content-level pathway scope representation | `OPEN` |
| Reviewer identity/assignment model | `OPEN — security and governance review` |
| Rights evidence and display enforcement | `OPEN` |

## References

[1]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 canonical additive profile"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_EVIDENCE_REVIEW_22.md "Additional Evidence Review 22"

[3]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_DESIGN_PACKAGE_V1_0.md "Prior DRY-RUN foundation design package"

[4]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
