# SEG_CONTENT_LIBRARY

## Purpose

`SEG_CONTENT_LIBRARY` is the controlled preparation boundary for future SEG learning content. It separates source materials, processed-content outputs, medical governance records, visual-atlas organization, and the final import gate from the application UI.

This library currently contains **governance and workflow artifacts only**. It contains no medical article, claim, lesson, module, assessment, book, image, video, or reference record.

## Current gate

> **NOT READY FOR MEDICAL CONTENT ACTIVATION.**

A source package may enter the intake workflow only after its provenance, version, checksum, rights, references, taxonomy, medical-review assignment, and audit trail are available. A record may be promoted to `approved` only through a separately documented decision. The application must consume `approved` records through a reversible adapter; the Medical Journal governed empty state remains the fallback until that gate is closed.

## Directory roles

| Directory | Role | Current status |
|---|---|---|
| `01_SOURCE_MATERIALS` | Controlled landing areas for source packages by type | Empty of source content |
| `02_PROCESSED_CONTENT` | Reserved outputs for knowledge units, modules, lessons, flashcards, and assessments | Empty of processed content |
| `03_MEDICAL_GOVERNANCE` | Source, version, review, rights, and audit controls | Contains workflow templates only |
| `04_VISUAL_ATLAS` | Reserved visual-atlas categories | Empty of new content |
| `05_IMPORT_READY` | Final gate for separately approved records | Blocked and empty of import records |

## Record and status rules

The root `manifest.json` is intentionally empty. Templates are not content records and must not be promoted or rendered as medical material. Status transitions are:

`pending-intake` → `under-review` → `approved` or `withdrawn`.

A record cannot enter `approved` without completed source, version, checksum, references, rights, taxonomy, medical review, and audit evidence. `withdrawn` records require a new decision before any reactivation.

## Protected boundaries

This preparation layer does not change React/Vite/Express code, routes, Dashboard architecture, Manus OAuth, the database schema, approved visual assets, or the Visual Freeze. It does not copy, move, rename, process, or import any existing medical content.

## Next authorized action

The next safe action is a **READ_ONLY intake review** of a separately supplied source package. That review must record missing fields and rights or medical-review gaps without editing the source package. Integration remains blocked until an independent approval authorizes a reversible adapter and approved records only.
