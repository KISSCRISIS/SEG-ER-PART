# SEG Content Source Selection and Intake Rules

**Purpose:** Classify supplied source material before extraction or pilot conversion.
**Principle:** `Original Source = Preserved Reference`; selection is not approval.

## Source classifications

| Classification | Meaning | Examples of supplied material | Downstream boundary |
|---|---|---|---|
| `REFERENCE_SOURCE` | Source used for traceable reference and locator support | PDF book, HTML resource, structured medical reference | Must remain immutable and rights-reviewed |
| `LEARNING_CONTENT_SOURCE` | Supplied material intended to support learning artifacts | Chapter, lesson source, educational handout | No derivative without source mapping and governance |
| `ASSESSMENT_CONTENT_SOURCE` | Supplied question-bank or assessment source | Question bank, answer key, rationale source | No generated learner assessment without separate authorization |
| `VISUAL_ASSET_SOURCE` | Supplied image, table, figure, or visual material | Image, table, figure, scan | Image rights and display scope required |
| `ARCHIVE_SOURCE` | Preserved material not currently selected for processing | Historical or superseded package | Preserve; do not delete or silently substitute |

## Required source-selection metadata

| Field | Required evidence |
|---|---|
| `source_id` | Stable supplied or governed identifier |
| Original file name | Exact name as received |
| File type / MIME type | Observed type |
| Immutable location | Intake path or supplied URL |
| File size | Observed bytes |
| SHA-256 | Calculated without modifying the source |
| Publisher / owner | Supplied or independently verifiable |
| Version / edition | Supplied release label or `NOT_SUPPLIED` |
| Published date | Supplied date or `NOT_SUPPLIED` |
| Accessed date-time UTC | Intake observation time |
| Language | Supplied or independently verified; never guessed from filename |
| Text usage | Supplied rights metadata |
| Image usage | Supplied rights metadata |
| Display scope | Intended use boundary |
| Reference locators | Observed page/section/table/figure/timestamp/question ID |
| Taxonomy ID/version | Explicit supplied taxonomy context |
| Professional track | Explicit supplied track only |
| Processing status | `NOT_STARTED` / `IN_INTAKE` / `BLOCKED` |
| Governance status | `NOT_REVIEWED` / `PENDING` / observed decision |

## Track separation

Keep these tracks separate at selection time and through all derivatives:

`01_Emergency_Medicine_Physician`
`02_Internship`
`03_Medical_Students`
`04_Paramedic_EMS`
`05_Emergency_Nursing`
`06_General_Practitioner`
`07_Shared_Medical_Core`

Do not infer a track from folder, filename, title, UI label, or topic. Record `TRACK_UNSUPPLIED` or `TRACK_CONFLICT` when evidence is missing or inconsistent. Do not merge tracks without an explicit taxonomy relationship.

## Selection decision

| Field | Value |
|---|---|
| Selection ID | |
| Source ID | |
| Classification | |
| Selected for intake | `YES` / `NO` / `DEFERRED` |
| Reason | |
| Rights status | `NOT_REVIEWED` / `CLEAR` / `UNCLEAR` / `BLOCKED` |
| Track status | `SUPPLIED` / `NOT_SUPPLIED` / `CONFLICT` / `BLOCKED` |
| Taxonomy status | `SUPPLIED` / `NOT_SUPPLIED` / `CONFLICT` / `BLOCKED` |
| Locator status | `OBSERVED` / `INCOMPLETE` / `UNVERIFIED` |
| Next allowed phase | |

## Prohibited selection behavior

Never delete or replace original sources, copy unverified material into learner-facing content, fill metadata from memory, resolve conflicting editions silently, create medical claims, or treat selection as extraction, clinical review, approval, activation, import, commit, push, deployment, or publication.

## References

[1]: GOVERNANCE/SEG_SOURCE_MANIFEST_TEMPLATE.md "SEG source manifest template"

[2]: SEG_CONTENT_INVENTORY.md "SEG content inventory and intake checklist"

[3]: ../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "SEG governed content-record schema"

[4]: /home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG Metadata & Source Mapper"
