# SEG Content Package Structure and Boundary Rules

**Purpose:** Standardize the empty, governed content-preparation structure before source intake.
**Rule:** Folder presence is not evidence of approval, activation, or application exposure.

## Standard structure

```text
SEG_CONTENT_PACKAGE/
├── 00_README.md
├── 01_PROJECT_SCHEMA/
├── 02_SOURCE_CONTENT/
├── 03_REFERENCES/
├── 04_QUESTIONS/
├── 05_IMAGES_TABLES/
├── 06_EXISTING_APP_DATA/
├── 07_REVIEW_AUDIT/
└── 08_NOTES/
```

## Folder responsibilities

| Folder | Intended use | Allowed state | Boundary |
|---|---|---|---|
| `00_README.md` | Package identity, scope, owner, version, rights note, and current gate | Documentation only | Must not contain medical claims that substitute for source material |
| `01_PROJECT_SCHEMA/` | Canonical schema copies, versioned contracts, crosswalks, and validation references | Read-only contracts | Never infer database tables or alter the canonical manifest |
| `02_SOURCE_CONTENT/` | Original supplied source files | Immutable intake | Never delete, rename, overwrite, normalize in place, or replace originals |
| `03_REFERENCES/` | Source-linked references and locator records | Traceability artifacts | Never invent locators or reference support |
| `04_QUESTIONS/` | Supplied question-bank or assessment-source material | Source-preserved, not learner-facing | No generated questions without separate governed authorization |
| `05_IMAGES_TABLES/` | Original visual/table source material and rights metadata | Source-preserved | No asset activation or image replacement |
| `06_EXISTING_APP_DATA/` | Read-only references to existing application data when explicitly authorized | Inspection only | No database dump, migration, schema change, or content overwrite |
| `07_REVIEW_AUDIT/` | Mapping reports, schema reports, rights records, clinical-review decisions, QA, and append-only audit events | Evidence records | Evidence does not grant approval unless an authorized reviewer supplied it |
| `08_NOTES/` | Non-authoritative working notes and unresolved issues | Clearly labelled notes | Notes cannot become medical content or governance decisions by themselves |

## Preservation and naming rules

Original source files remain the authority for source identity, version, checksum, ordering, qualifiers, and unreadable sections. Derived files must carry a separate ID, source pointer, source version, checksum, track context when explicitly supplied, review state, and audit event. Do not reuse an original filename for a derivative.

Use stable, descriptive names. Do not store secrets, `.env` files, database dumps, production credentials, or unrelated application source in this package. Inspect the allowed-path list and run repository safety checks before any file handoff.

## Gate boundaries

The package can support the following sequence only when each preceding gate has evidence:

```text
02_SOURCE_CONTENT
  → 03_REFERENCES / source mapping
  → 01_PROJECT_SCHEMA / canonical validation
  → 07_REVIEW_AUDIT / rights and medical governance
  → provisional derivatives for Pilot Converter
  → Content QA
  → separate implementation authorization
```

Nothing in this folder structure authorizes extraction, Pilot Conversion, clinical review completion, approval, activation, database import, application exposure, commit, push, deployment, or publication. The existing application empty state remains the fallback until a separately authorized, governed integration exists.

## References

[1]: SEG_CONTENT_INVENTORY.md "SEG content inventory and intake checklist"

[2]: GOVERNANCE/SEG_SOURCE_MANIFEST_TEMPLATE.md "SEG source manifest template"

[3]: ../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG Content Integration Plan"

[4]: /home/ubuntu/skills/seg-content-importer-integration/SKILL.md "SEG guarded integration dry-run"
