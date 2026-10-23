# SEG Preview/Runtime Relink — Internal Checkpoint

**Project:** Smart Emergency Guide (SEG)  
**Checkpoint date:** 2026-08-16  
**Mode:** Internal operational checkpoint; READ_ONLY application boundary  
**Author:** Manus AI

## Purpose

This checkpoint records the verified state immediately after separating the stale Preview runtime and reconnecting Preview to the existing SEG project root. It is a continuity record only. It does not authorize a new implementation phase, medical-content activation, database work, schema work, source edits, design changes, or GitHub publication.

> **Governed Source Intake BLOCKED — No Medical Content Activation**

## Verified project binding

| Item | Verified value |
|---|---|
| Repository | `https://github.com/KISSCRISIS/manus.git` |
| Branch | `main` |
| Project root | `/home/ubuntu/seg-phase1` |
| Local HEAD at checkpoint | `416345fcf309695d15360845d1f0f232ec64b172` |
| Local cached `origin/main` | `416345fcf309695d15360845d1f0f232ec64b172` |
| Runtime port | `4318` |
| Start command | `PORT=4318 pnpm dev` |

The Git check was read-only. No fetch, checkout, staging, commit, push, or remote publication was performed for this checkpoint. The worktree already contained governance and pre-integration changes; those changes were not produced by the runtime relink.

## Runtime separation and replacement

The stale process was PID `6650`, running `node dist/index.js` from `/tmp/seg-phase3-delivery-verify`. It was an orphaned or stale runtime rooted outside the current project. The process was stopped without deleting or changing project files.

The active runtime is:

```text
pnpm dev
  → tsx watch server/_core/index.ts
    → Node/Express
      → Vite development serving
```

The active working directory is `/home/ubuntu/seg-phase1`. This confirms that Preview is attached to the existing Vite/Express application rather than the temporary verification path or a static-only artifact.

## Verification results

| Check | Result | Evidence |
|---|---|---|
| Stale temporary runtime stopped | PASS | PID `6650` stopped; no files deleted |
| Correct project root | PASS | `/home/ubuntu/seg-phase1` |
| Correct repository and branch | PASS | `origin` points to `KISSCRISIS/manus.git`; branch is `main` |
| Node/Express runtime | PASS | `pnpm dev → tsx watch server/_core/index.ts → Node/Express` |
| `GET /healthz` | PASS | HTTP 200 with `status: ok`, `service: seg-api`, `environment: development` |
| `GET /` | PASS | HTTP 200; SEG title returned |
| Preview rendering | PASS | SEG interface rendered; `Loading preview` was not observed |
| Current source serving | PASS | Vite served the current `/src/main.tsx` through the active development runtime |
| Browser console | PASS | No application errors; only the informational React DevTools message |
| Protected boundaries | PASS | No application source, design, route, database, schema, OAuth, content, asset, or dependency change |

## Build and bundle limitation

No new build was generated because the approved operation explicitly prohibited rebuilding. Development-mode Vite transforms and serves the current source, so the served module is not expected to equal raw TypeScript bytes byte-for-byte. The relink gate was therefore validated through the runtime root, Express health endpoint, Vite source serving, HTTP root response, and rendered SEG interface.

The startup warning that `OAUTH_SERVER_URL` is not configured remained unchanged. It did not prevent the local Preview from rendering and was outside the approved relink scope.

## Current SEG governance state

The following conditions remain unchanged:

| Boundary | State |
|---|---|
| Visual Freeze | Preserved |
| Authentication and OAuth | Unchanged |
| Database and schema | Unchanged |
| Protected routes and Dashboard architecture | Unchanged |
| Medical content | No content loaded, modified, approved, or activated |
| Batch 1 | Structure-only 269-row review queue; all rows remain `NOT_APPROVED` |
| Governed Source Intake | BLOCKED until a separately supplied and verifiable source package exists |
| GitHub publication | Not performed as part of this checkpoint |

## Recovery instruction

To reproduce the local Preview session without changing the application:

```bash
cd /home/ubuntu/seg-phase1
PORT=4318 pnpm dev
```

Then verify:

```bash
curl -i http://127.0.0.1:4318/healthz
curl -i http://127.0.0.1:4318/
```

A successful health response must be HTTP 200 from the current Node/Express runtime. If the sandbox suspends, the runtime may need to be restarted; that does not indicate source loss.

## References

1. [`LAST_MANUS_STATE.md`](LAST_MANUS_STATE.md) — execution history and current continuation state.
2. [`NEXT_PENDING_COMMANDS.md`](NEXT_PENDING_COMMANDS.md) — completed commands, gates, and stop conditions.
3. [`../../05_RECOVERY_AND_TRANSFER/CURRENT_STATUS_CHECKLIST.md`](../05_RECOVERY_AND_TRANSFER/CURRENT_STATUS_CHECKLIST.md) — project status checklist.
4. [`../../../../SEG_PROJECT_CONTINUITY_PACKAGE_FINAL.md`](../../../../SEG_PROJECT_CONTINUITY_PACKAGE_FINAL.md) — master continuity package index.
5. External runtime evidence retained during the session: `/tmp/SEG_PREVIEW_RELINK_REPORT.md` and `/tmp/seg_preview_runtime_after_relink.txt`.
