# SEG Content Review Workflow and Pipeline Crosswalk

**Project:** Smart Emergency Guide (SEG)
**Scope:** Phase 4 content-pipeline preparation
**Mode:** Governed, read-only preparation unless a separate authorization is recorded

## Purpose

This document maps the operational content-preparation stages to the SEG governance sequence. It is a workflow contract, not a medical guideline and not an implementation command. Original sources remain immutable, every derivative remains traceable, and no learner-facing content may be exposed because a file exists in a source folder.

The governing sequence is:

> **Source → Version → Governance Record → Clinical Review → Approval → Activation** [1] [2]

Pilot conversion and Content QA prepare evidence around that sequence; they do not replace clinical review, rights review, approval, or implementation authorization.

## Stage crosswalk

| Stage | Operation | Required evidence | Output | Exit condition | Forbidden shortcut |
|---|---|---|---|---|---|
| 0 | Source handoff | Identifiable owner or publisher, handoff time, immutable intake location | Handoff note and package inventory | Source package is accessible and preserved | Editing, renaming, deleting, or replacing originals |
| 1 | READ_ONLY intake and source mapping | Source ID, owner/location, file identity, language, version, SHA-256, explicit track/taxonomy when supplied, rights fields, locators, audit entry | Source manifest and intake findings | Missing or conflicting fields are documented | Guessing metadata, track, taxonomy, rights, or source locations |
| 2 | Canonical schema validation | `manifest.schema.json` path/version/hash and a readable candidate record | Per-field schema report | Record is structurally valid or blocked | Treating schema validity as clinical approval or database compatibility |
| 3 | Rights and provenance review | Publisher/owner, license or rights decision, text usage, image usage, display scope, version, references | Rights/provenance decision record | Rights are clear or the record is blocked | Using unclear or unverified material in a derivative |
| 4 | Bounded pilot conversion | Explicit pilot authorization, one source set, one specialty/scope, one explicit professional track, precise locators, source/version hashes | Provisional Knowledge Units, Modules, and Lessons | Every output is traceable and remains `Pending Clinical Review` / `NOT_APPROVED` | Adding claims, resolving conflicts, merging tracks, or generating production content |
| 5 | Medical review | Qualified reviewer role/identity, cited source locations, decision, review date, unresolved-issue disposition | Clinical-review decision record | Decision is explicitly evidenced as held, approved, rejected, or withdrawn | Allowing a structural PASS to become approval |
| 6 | Governance registration | Provenance, rights, taxonomy, review decision, version/checksum, append-only audit events | Governed record and decision package | Record is reproducible and auditable | Assigning an approval state without independent evidence |
| 7 | Content QA | Exact artifact hash, schema/metadata/lineage checks, track separation, rights and clinical evidence, repository safety | Deterministic QA report | QA is PASS or the exact blocker is returned | Repairing the artifact to make QA pass |
| 8 | Separate implementation authorization and integration dry-run | Explicit target contract, allowed paths, mapping, idempotency, rollback, authorization | Integration dry-run report | Target and actions are unambiguous | Inferring database tables, executing SQL, importing, or changing application code |
| 9 | Controlled publication and activation | Approved candidate, QA report, implementation authorization, release manifest, deployment ownership, parity evidence, rollback plan | Commit/release report and runtime evidence | Authorized release is verified; activation remains limited to approved records | Publishing draft/under-review/rejected/withdrawn records or deploying without ownership |

## Handoff rules

The permitted handoff order is:

```text
Source Handoff
  → READ_ONLY Intake / Metadata & Source Mapping
  → Canonical Schema Validation
  → Rights and Provenance Review
  → Bounded Pilot Conversion (when explicitly authorized)
  → Medical Review
  → Governance Registration
  → Content QA
  → Separate Implementation Authorization
  → Integration Dry-Run
  → Controlled Release / Activation of approved records only
```

A failed gate stops the handoff. The next phase must be stated as a governance phase, not inferred from the file type or folder. A record without provenance, rights, references, taxonomy, medical-review evidence, or audit events remains blocked.

## State rules

The canonical `medical_review.decision` values are `draft`, `under_review`, `approved`, `rejected`, and `withdrawn` [1]. Operational intake states such as `pending-intake` and `blocked` are reported separately and must not be silently written into the canonical decision field. `approved` is observed evidence only; it is not granted by a validator, mapper, QA report, template, or integration dry-run.

All provisional outputs from Pilot Converter must remain `Pending Clinical Review` and `NOT_APPROVED` [3]. Content QA may return structural `PASS`, but the overall handoff remains blocked when independent clinical, rights, governance, implementation, or rollback evidence is missing [4].

## Non-negotiable boundaries

The workflow does not modify React/Vite/Express/tRPC source, authentication/OAuth, database schema, routes, assets, Visual Freeze, or original source materials. It does not create medical claims, doses, recommendations, or assessments. It does not import, activate, publish, commit, push, or deploy without a separate authorization that names the exact artifact, target, branch, and consequence.

## References

[1]: ../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "SEG governed content-record schema"

[2]: ../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG Content Integration Plan"

[3]: /home/ubuntu/skills/seg-pilot-converter/SKILL.md "SEG Pilot Converter boundaries"

[4]: /home/ubuntu/skills/seg-content-qa/SKILL.md "SEG Content QA gate"
