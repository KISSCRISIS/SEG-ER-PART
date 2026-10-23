# SEG Source Manifest Template

**Purpose:** READ_ONLY source handoff and intake record.
**State:** Blank template; no source has been approved, converted, activated, imported, or published by completing this document.

> Fill only from supplied or independently verifiable evidence. Use `NOT_SUPPLIED`, `UNRESOLVED`, or `BLOCKED` where appropriate. Never invent a publisher, edition, version, checksum, rights status, taxonomy, professional track, or locator.

## 1. Intake identity

| Field | Value |
|---|---|
| `mapping_id` | |
| Handoff owner / publisher | |
| Handoff date and time UTC | |
| Intake operator | |
| Immutable intake location | |
| Package name | |
| Intended professional track (explicitly supplied only) | |
| Intake status: `pending-intake` / `blocked` / `under-review` | |

## 2. Source file inventory

Create one row per original file. Do not rename, delete, normalize in place, or replace originals.

| Field | Value |
|---|---|
| `source_id` | |
| Original file name | |
| File type / MIME type | |
| File size in bytes | |
| Original location | |
| Source SHA-256 | |
| Source version / edition | |
| Published date | |
| Accessed date-time UTC | |
| Language | |
| Publisher / owner | |
| Source access result: `PASS` / `SOURCE_ACCESS_BLOCKED` | |
| Processing status: `NOT_STARTED` / `IN_INTAKE` / `BLOCKED` | |

## 3. Provenance and reference locators

| Field | Value |
|---|---|
| Exact source location / URL | |
| Reference ID | |
| Locator type: page/chapter/section/table/figure/timestamp/question ID | |
| Locator value | |
| What the locator supports | |
| Locator observed directly: `YES` / `NO` | |
| Locator issue code | |

Do not create a locator for a page, section, table, figure, timestamp, or question that was not directly observed.

## 4. Rights and display boundaries

| Field | Value |
|---|---|
| License wording as supplied | |
| Text usage | |
| Image usage | |
| Display scope | |
| Rights decision record ID | |
| Rights reviewer role / identity, if supplied | |
| Rights status: `NOT_REVIEWED` / `CLEAR` / `UNCLEAR` / `BLOCKED` | |
| Rights evidence locator | |

Missing or ambiguous rights evidence blocks derivative creation and integration. The mapper does not grant rights approval.

## 5. Taxonomy and professional-track context

| Field | Value |
|---|---|
| Explicit taxonomy ID | |
| Taxonomy version | |
| Explicit professional track | |
| Track evidence locator | |
| Track conflict | |
| Taxonomy status: `SUPPLIED` / `NOT_SUPPLIED` / `CONFLICT` / `BLOCKED` | |

Allowed SEG tracks remain separate: `01_Emergency_Medicine_Physician`, `02_Internship`, `03_Medical_Students`, `04_Paramedic_EMS`, `05_Emergency_Nursing`, `06_General_Practitioner`, and `07_Shared_Medical_Core`. Never infer a track from a filename, folder, title, UI label, or topic.

The canonical manifest does not contain a `track` property. This section is intake/provenance context and must not be copied into a canonical record unless a separate explicit contract authorizes it.

## 6. Observed governance state

| Field | Value |
|---|---|
| Observed `medical_review.decision`: `draft` / `under_review` / `approved` / `rejected` / `withdrawn` | |
| Reviewer identity / role as supplied | |
| Review date | |
| Next review date | |
| Governance record ID | |
| Unresolved issue IDs | |
| Audit event IDs | |
| Overall intake finding: `PASS` / `FAIL` / `BLOCKED` | |
| Next allowed phase | |

An observed `approved` value is evidence to be independently verified; entering it here does not grant approval.

## 7. Missing-data and blocker register

| Blocker ID | Field / path | Code | Evidence pointer | Effect | Next action |
|---|---|---|---|---|---|
| | | `SOURCE_ID_MISSING` / `SOURCE_VERSION_MISSING` / `SOURCE_CHECKSUM_MISSING` / `SOURCE_LOCATION_MISSING` / `RIGHTS_METADATA_MISSING` / `TRACK_UNSUPPLIED` / `TRACK_CONFLICT` / `TAXONOMY_UNSUPPLIED` / `LOCATOR_UNVERIFIED` / `SOURCE_ACCESS_BLOCKED` | | | |

## 8. Audit and non-actions

| Field | Value |
|---|---|
| `created_by` | |
| `created_at` UTC | |
| Audit event | |
| Audit actor | |
| Audit timestamp UTC | |
| Audit reason | |
| Source preserved unchanged | `true` |
| Content modified | `false` |
| Clinical review performed by mapper | `false` |
| Approval granted by mapper | `false` |
| Activation performed | `false` |
| Database import executed | `false` |
| Publication performed | `false` |

## Handoff rule

A complete source manifest permits canonical schema validation and READ_ONLY intake review only. It does not permit Pilot Conversion, clinical approval, database integration, application exposure, commit, push, deployment, or publication. Preserve this manifest as a separate audit artifact linked to the original source package.

## References

[1]: ../../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "SEG governed content-record schema"

[2]: ../../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG Content Integration Plan"

[3]: /home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG Metadata & Source Mapper"
