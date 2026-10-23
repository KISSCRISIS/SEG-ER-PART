# SEG Content Integration Plan

**Project:** Smart Emergency Guide (SEG)  
**Mode:** Governed preparation; no medical-content activation  
**Status:** Ready for READ_ONLY intake review; implementation integration blocked  
**Author:** Manus AI

## 1. Objective

This plan defines how SEG can move from an empty content-preparation structure to a controlled, reversible integration of approved learning material. It does not import, transform, summarize, classify, or publish medical content. It does not modify the application until a separate implementation command is authorized.

## 2. Non-negotiable boundaries

The Visual Freeze, current Vite/Express architecture, protected `/dashboard` route, internal Dashboard anchors, Manus OAuth, database schema, approved asset registry, existing content library, and Medical Journal governed empty state remain unchanged.

Legacy packages are not implementation authority. The current repository and canonical governance files remain the source of truth. No record may be rendered in the application merely because it exists in a source folder.

## 3. Staged workflow

| Stage | Operation | Output | Entry gate | Exit gate |
|---|---|---|---|---|
| 0. Source handoff | Receive files or URLs from an identifiable owner or publisher | Immutable intake location and handoff note | User supplies a source package | Package inventory exists without content edits |
| 1. READ_ONLY intake | Inspect metadata, provenance, version, checksum, rights, references, taxonomy, reviewer assignment, and audit fields | Intake checklist and findings | Source package is accessible | Missing fields are documented; source remains unchanged |
| 2. Rights and provenance review | Confirm publisher/owner, license, text usage, image usage, display scope, and source version | Rights decision record | Source identity is traceable | Rights are clear or the record is blocked |
| 3. Medical review | Qualified reviewer evaluates claims and assigns a decision and review date | Medical-review decision record | References and taxonomy are available | Record is approved, rejected, or held |
| 4. Governance registration | Register the record, checksum, references, taxonomy version, rights decision, and immutable audit events | Governed record in `under-review` or `approved` status | Prior gates have evidence | Decision is reproducible and auditable |
| 5. Separate implementation authorization | Authorize a narrowly scoped adapter or import implementation | Approved implementation command | Governance decision is complete | Scope, rollback, and test criteria are explicit |
| 6. Reversible adapter | Expose only `approved` records through an adapter while retaining the empty-state fallback | Adapter code and tests | Separate implementation authorization | Tests pass and rollback path is documented |
| 7. Controlled publication | Publish the approved source and evidence through the authorized repository/deployment workflow | Commit, report, and verification evidence | User confirms target and consequence | Local and remote state match and no boundaries changed |

## 4. Required record contract

Every candidate record must satisfy `SEG_CONTENT_LIBRARY/manifest.schema.json`. At minimum, the record must carry a stable ID, title, content type, language, source owner and location, version, SHA-256 checksum, references linked to supported claims, text and image rights, intended display scope, taxonomy ID and version, medical reviewer and decision, and audit events.

The source payload must remain immutable during intake. Any normalized or derived output must be a separate, traceable artifact and cannot replace the source. A withdrawn record cannot return to `approved` without a new documented decision.

## 5. Status transitions

The permitted lifecycle is:

`pending-intake` → `under-review` → `approved` or `rejected`.

`approved` → `withdrawn` is permitted when a governance decision requires removal. `withdrawn` → `approved` is not automatic and requires a new review and decision. Records lacking provenance, rights, references, taxonomy, medical review, or audit evidence remain blocked.

## 6. Application integration boundary

No application integration occurs during intake. After separate approval, an adapter may expose only records whose governance status is `approved`. The adapter must be additive, covered by tests, isolated from authentication and database changes unless separately authorized, and reversible. The existing Medical Journal empty state remains the fallback for unavailable or withdrawn records.

The adapter must not infer medical taxonomy from UI labels, convert visual sections into clinical categories, or expose a draft or under-review record to learners.

## 7. Publication and rollback

Before any external publication, run the repository safety audit, review the staged-file list, confirm that no secrets or prohibited artifacts are included, and obtain explicit confirmation for the target repository and branch. After publication, compare local and remote commit IDs, verify repository visibility, and record the exact commit and evidence.

Rollback consists of disabling the adapter or reverting the dedicated integration commit while leaving source records and governance evidence intact. Rollback must not require a Visual Freeze change or a database migration.

## 8. Current gate

The current project is **ready for Stage 1 READ_ONLY intake review** once a source package is supplied. It is **not ready for Stage 5 implementation authorization** and must not enter public medical-content integration until Medical Review and Copyright/Rights Review are complete.
