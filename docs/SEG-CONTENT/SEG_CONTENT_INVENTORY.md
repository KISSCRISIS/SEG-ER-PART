# SEG Content Inventory and READ_ONLY Intake Checklist

**Project:** Smart Emergency Guide (SEG)
**Phase:** Phase 4 — Content Pipeline Preparation
**Current readiness:** Ready for Stage 1 READ_ONLY intake when a source package is supplied

## Purpose

Inventory and control original medical-content sources before any extraction, conversion, clinical review, integration, or publication. This document records package identity and evidence availability; it does not summarize or validate medical claims.

## Intake rules

1. Preserve every original file in an immutable intake location. Do not delete, rename, overwrite, normalize in place, or replace source materials.
2. Record only supplied or independently verifiable metadata. Missing values remain `NOT_SUPPLIED`, `UNRESOLVED`, or `BLOCKED`; they are never guessed.
3. Calculate and preserve a SHA-256 checksum for each accessible file. A checksum identifies a version; it does not prove rights or clinical correctness.
4. Keep professional tracks separate: `01_Emergency_Medicine_Physician`, `02_Internship`, `03_Medical_Students`, `04_Paramedic_EMS`, `05_Emergency_Nursing`, `06_General_Practitioner`, and `07_Shared_Medical_Core`.
5. Do not create Knowledge Units, Modules, Lessons, Flashcards, or Assessments during inventory. Do not alter the Medical Journal empty state or application content.
6. Do not infer source owner, version, language, taxonomy, track, rights, or source location from a filename, folder, title, or topic.

## Package registration

| Field | Value |
|---|---|
| `package_id` | |
| Package name | |
| Handoff owner / publisher | |
| Handoff date-time UTC | |
| Immutable intake location | `02_SOURCE_CONTENT/` or supplied external location |
| Intake operator | |
| Package checksum / manifest checksum | |
| Intended track, if explicitly supplied | |
| Inventory status: `NOT_STARTED` / `IN_PROGRESS` / `BLOCKED` / `READY_FOR_SCHEMA` | |

## File inventory

| Source ID | Original filename | Type | Size | SHA-256 | Version | Language | Owner | Location | Access | Track | Status |
|---|---|---|---:|---|---|---|---|---|---|---|---|
| | | | | | | | | | `PASS` / `SOURCE_ACCESS_BLOCKED` | | `NOT_STARTED` / `IN_INTAKE` / `BLOCKED` |

## Intake completeness checklist

| Check | Status | Evidence pointer / blocker |
|---|---|---|
| Source package is accessible | `PASS` / `BLOCKED` | |
| Handoff owner or publisher is identifiable | `PASS` / `NOT_SUPPLIED` / `BLOCKED` | |
| Original files are preserved | `PASS` / `BLOCKED` | |
| File names and types are recorded | `PASS` / `BLOCKED` | |
| File size and SHA-256 are recorded | `PASS` / `BLOCKED` | |
| Source version or edition is supplied | `PASS` / `NOT_SUPPLIED` / `BLOCKED` | |
| Language is explicitly supplied or verified | `PASS` / `NOT_SUPPLIED` / `BLOCKED` | |
| Exact source location is recorded | `PASS` / `BLOCKED` | |
| Rights metadata is supplied for text and images | `PASS` / `NOT_SUPPLIED` / `BLOCKED` | |
| Explicit track is supplied without conflict | `PASS` / `NOT_SUPPLIED` / `CONFLICT` | |
| Taxonomy ID and version are supplied | `PASS` / `NOT_SUPPLIED` / `BLOCKED` | |
| Source locators are observed, not invented | `PASS` / `BLOCKED` | |
| Review and audit fields are available | `PASS` / `NOT_SUPPLIED` / `BLOCKED` | |
| Canonical schema validation can begin | `PASS` / `BLOCKED` | |

## Status semantics

`NOT_STARTED` means no intake inspection has been performed. `IN_PROGRESS` means the package is being inventoried and remains non-actionable. `BLOCKED` means a critical source, provenance, rights, track, taxonomy, access, or integrity gate is missing or ambiguous. `READY_FOR_SCHEMA` means only that the intake evidence is sufficiently complete for canonical schema validation; it is not approval, activation, or integration readiness.

## Next allowed phase

After inventory, hand off the separate manifest to `seg-metadata-source-mapper` and then `seg-content-architecture-schema-validator`. Do not proceed to Pilot Conversion, Medical Review, Content QA, database integration, learner exposure, commit, push, deployment, or publication from an inventory result alone.

## References

[1]: SEG_CONTENT_PACKAGE_STRUCTURE.md "SEG package structure"

[2]: GOVERNANCE/SEG_SOURCE_MANIFEST_TEMPLATE.md "SEG source manifest template"

[3]: ../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG Content Integration Plan"

[4]: /home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG Metadata & Source Mapper"
