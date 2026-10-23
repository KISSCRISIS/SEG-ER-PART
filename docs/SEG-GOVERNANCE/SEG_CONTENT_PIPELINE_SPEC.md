# SEG Content Pipeline Specification

**Version:** 1.1
**Date:** 2026-08-17
**Mode:** Governed preparation; no medical-content activation

## Objective

Define a controlled, traceable, and reversible workflow for preparing supplied medical resources for SEG learning-content governance. The pipeline preserves original sources, separates professional tracks, and stops at every missing or ambiguous evidence gate.

This specification is not a medical guideline. It does not summarize, correct, translate, clinically adjudicate, approve, activate, import, or publish medical content.

## Supported source types

Initial source categories include PDF books, images, HTML resources, question banks, videos when explicitly supplied, and structured medical references. Each source remains in its original form and receives a separate intake identity, version, checksum, rights context, and source locator record.

## Governed pipeline

```text
Source Handoff
    ↓
READ_ONLY Intake / Inventory
    ↓
Metadata & Source Mapping
    ↓
Canonical Schema Validation
    ↓
Rights and Provenance Review
    ↓
Explicitly Authorized Pilot Conversion, if needed
    ↓
Medical Review
    ↓
Governance Registration
    ↓
Content QA
    ↓
Separate Implementation Authorization
    ↓
Integration Dry-Run
    ↓
Controlled Release / Activation of approved records only
```

The governing sequence is:

> **Source → Version → Governance Record → Clinical Review → Approval → Activation**

Extraction, Pilot Conversion, QA, integration, and release planning support the sequence but cannot replace its gates.

## Required evidence contract

Every candidate record must be checked against the canonical `manifest.schema.json` [1]. At minimum, the record or its separate intake context must preserve:

- Stable record/source identity.
- Source owner and exact location.
- Source version and SHA-256 checksum.
- Language and observed reference locators.
- Text usage, image usage, and display scope.
- Explicit taxonomy ID and version.
- Professional-track context where supplied, with no unauthorized mixing.
- Observed medical-review decision and reviewer evidence.
- Append-only creation and processing audit events.

The canonical manifest has `additionalProperties: false`; fields not in that contract must not be inserted into a canonical record. Track, parent/child hierarchy, implementation target fields, database mappings, and release fields require separate explicit contracts [1] [2].

## Medical governance requirements

Every medical-content candidate requires independent provenance, rights, clinical-review, taxonomy/track, and audit evidence. A schema or QA `PASS` does not certify clinical correctness and does not grant approval. The canonical observed decisions are `draft`, `under_review`, `approved`, `rejected`, and `withdrawn`; operational states such as `BLOCKED`, `QA_PASS`, and `RELEASE_DRY_RUN` remain external status metadata.

Records with missing provenance, rights, references, taxonomy, medical-review evidence, or audit events remain blocked. Draft, under-review, rejected, and withdrawn records must not be exposed to learners.

## Implementation boundaries

No application integration occurs during intake, source mapping, schema validation, rights review, pilot conversion, medical review, governance registration, or Content QA. A future adapter or importer requires a separate, per-run implementation authorization naming the exact artifact, target contract, allowed paths, branch, consequence, idempotency policy, and rollback behavior.

The existing React/Vite/Express/tRPC architecture, authentication/OAuth, database schema, routes, approved assets, Visual Freeze, and Medical Journal empty-state fallback remain unchanged unless a separate implementation scope explicitly authorizes an additive and reversible adapter.

## Release and rollback

Before publication, verify the exact candidate identity, repository safety, governance and QA evidence, deployment ownership, local/remote/deployed parity, and known-good rollback. If deployment ownership is missing, return `BLOCKED`; do not create a new Website/WebDev project or deploy through an unrelated target.

Rollback must disable or revert the dedicated adapter/release while preserving original sources, source versions, governance records, audit events, and evidence packages. It must not require deleting content or changing unrelated architecture.

## Implementation strategy

Begin with one explicitly identified source set, one specialty or scope, one language, and one professional track. Complete READ_ONLY intake and schema validation before any bounded pilot. Scale only after the supplied governance, QA, implementation, release, and rollback evidence is complete.

## Current readiness

The project is ready for Stage 1 READ_ONLY intake when a source package is supplied. It is not ready for implementation authorization, learner-facing medical-content integration, or public activation until the required governance and QA gates are independently evidenced.

## References

[1]: ../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "SEG governed content-record schema"

[2]: ../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG Content Integration Plan"

[3]: /home/ubuntu/skills/seg-content-architecture-schema-validator/SKILL.md "SEG structural schema validator"

[4]: /home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG Metadata & Source Mapper"

[5]: /home/ubuntu/skills/seg-medical-governance/SKILL.md "SEG Medical Governance"

[6]: /home/ubuntu/skills/seg-content-qa/SKILL.md "SEG Content QA"

[7]: /home/ubuntu/skills/seg-content-importer-integration/SKILL.md "SEG guarded integration dry-run"

[8]: /home/ubuntu/skills/seg-release-rollback/SKILL.md "SEG Release and Rollback"
