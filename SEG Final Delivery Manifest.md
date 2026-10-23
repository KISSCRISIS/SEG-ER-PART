# SEG Final Delivery Manifest

## Delivery scope

This delivery is the complete safe source/recovery package rebuilt from the current canonical working tree plus the non-duplicate, non-secret files found in the SEG project shared workspace. Canonical source files were preserved without modification. Added external files are recorded in `SEG_SOURCE_ADDITION_MANIFEST.tsv` and stored under `RECOVERY_HANDOFF/PROJECT_SHARED_FILES_v1/` in the ZIP.

## Package identity

| Item | Result |
|---|---|
| Package | `SEG_FINAL_LOCAL_PROJECT_PACKAGE.zip` |
| Included safe files | 1,055 |
| Additional non-duplicate project-shared files | 23 source/evidence files + addition manifest |
| SHA-256 | `e7de33837515c4c66914a3f5c33c20e413b30c53302d5d5cce3f1e171f9ab72e` |
| ZIP integrity | PASS |
| Source-to-ZIP file set | 0 missing, 0 unexpected |
| Source-to-ZIP hash comparison | 0 mismatches |
| Duplicate ZIP names | 0 |
| Forbidden archive entries | 0 |
| High-confidence secret findings in archive | 0 |
| Readable images | 137/137 |

## Required project roots verified inside the ZIP

| Root | File count |
|---|---:|
| `client/` | 108 |
| `server/` | 27 |
| `shared/` | 3 |
| `drizzle/` | 6 |

`RECOVERY_HANDOFF/`, `.env.example`, and `RECOVERY_HANDOFF/PROJECT_SHARED_FILES_v1/` are present in the ZIP.

## Sources and project-shared additions

The canonical source-like inventory contained 141 files, including the available PDF/DOCX/HTML and image artifacts; all 141 are represented in the ZIP. The shared workspace contained 23 non-duplicate, safe additions, including the available Phase 3 screenshots, visual findings, runtime observations, layout measurements, continuity notes, and related reports. Duplicate shared files were not copied a second time; their canonical equivalents remain included. A generated shared ZIP was not nested into the final ZIP.

## Environment files

The canonical source contains no local `.env` file. It contains `.env.example` only. A separate delivered `.env.example` in the output folder contains the complete variable-name template with blank values and no secrets.

The separate `SEG_CURRENT_ENV_VARIABLE_NAMES.txt` records the exact result for the current local environment file: `NO_LOCAL_DOTENV_FILE_FOUND`.

Actual values must be supplied privately through the deployment Secret Manager or a protected local environment. They must not be committed to GitHub, placed in Netlify frontend variables, or sent through chat.

## Drizzle database-structure files

The following files are present in the project and in the ZIP:

- `drizzle/schema.ts`
- `drizzle/relations.ts`
- `drizzle/0000_fast_bucky.sql`
- `drizzle/meta/0000_snapshot.json`
- `drizzle/meta/_journal.json`
- `drizzle/migrations/.gitkeep`
- `drizzle.config.ts` at the project root

These files describe the current Drizzle schema and migration state. No migration was executed during this delivery.

## Security and rights boundary

The delivery excludes real `.env` files, credentials, API keys, tokens, cookies, private keys, `.git`, dependencies, build outputs, coverage, caches, logs, temporary archives, and internal `.manus` tooling. Raw source documents are included only when they are already present in the canonical source and safe to preserve locally; no new source content was invented, normalized, activated, imported, or published. Rights and clinical-review status remain governed separately and are not changed by packaging.
