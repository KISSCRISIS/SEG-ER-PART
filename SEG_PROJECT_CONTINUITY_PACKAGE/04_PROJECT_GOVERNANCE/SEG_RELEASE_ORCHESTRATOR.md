# SEG Release & Production Orchestrator

**Status:** Project-approved operational reference  
**Scope:** SEG repository release preparation, verification, and phase gates  
**Applicability:** Use this reference when a user requests an SEG release audit, final-package preparation, accessibility review, production-readiness work, or release checkpoint.

> This is a **repository reference**, not a replacement for the global skill registry. It records the repeatable SEG workflow and the project-specific restrictions that every future release task must preserve.

## 1. Operating Mandate

Operate as the **SEG Release & Production Orchestrator**. Execute the phases in order, create a checkpoint after a completed implementation phase, and report evidence before advancing. Treat unspecified work as **READ_ONLY**. Do not begin a later phase while an earlier phase has unresolved blocking conditions, unless the user explicitly accepts a documented exception. [1] [2]

| Priority | Authority | Operational Rule |
|---:|---|---|
| 1 | `SEG_FINAL_VISUAL_ASSETS_PACKAGE_v1.0_PRODUCTION` | Treat as the primary visual source of truth for approved assets. |
| 2 | `SEG_DESIGN_SYSTEM.md` and `seg-design-system` | Apply only approved SEG Dark Glass Medical-Tech tokens, geometry, hierarchy, and accessibility rules. |
| 3 | `SEG_FINAL_DESIGN_FREEZE_ACCEPTANCE_GATE.md` | Preserve frozen scope; do not reopen accepted visual work without explicit authorization. |
| 4 | `CLAUDE.md` and current project architecture | Preserve the existing React/Vite/TypeScript, Manus OAuth, database, and security boundaries. |

## 2. Non-Negotiable Release Guardrails

| Guardrail | Required Behavior |
|---|---|
| Dashboard architecture | Keep `/dashboard` as the only protected Dashboard route. Preserve internal anchors: `#pathway`, `#learn`, `#practice`, `#reference`, `#journal`, and `#account`. |
| Asset integrity | Never generate, replace, alter, crop, or substitute an approved asset without explicit approval. Do not use screenshots or reference boards as UI assets. |
| Medical-content governance | Never invent medical claims, articles, clinical references, book content, chapter copy, tables, charts, or datasets. Require approved source, version, review status, and audit trail. |
| Drug Reference | Keep the Drug Reference module excluded until a separate audit and explicit authorization. |
| Security boundary | Do not change OAuth, authentication flow, routes, database schema, or security controls merely to satisfy a visual or release task. |
| Static media | Keep static media outside the deployed project tree under `/home/ubuntu/webdev-static-assets/`; reference production media through its registered managed URL. [3] |
| Motion and accessibility | Keep non-essential animations below 300 ms and support `prefers-reduced-motion`. Preserve keyboard access, visible focus states, and semantic interactions. [2] |

## 3. Current Technical Baseline

The current SEG project is a **React 19 + Vite + TypeScript + Tailwind CSS 4 + Express + tRPC** application. It is **not a Next.js application**: there is no `next` dependency and no `next.config.js`. Therefore, do not write Next.js-specific configuration, `getStaticProps`, `generateStaticParams`, ISR, or `next/image` code unless the user explicitly authorizes a framework migration. [4]

| Concern | Current Approved Baseline | Release Implication |
|---|---|---|
| Build | `vite build` plus bundled Node server | Validate with `pnpm build`. |
| Authentication | Manus OAuth via existing `startLogin()` flow | Preserve event-handler invocation and session boundary. |
| Visual deployment | Managed `/manus-storage/...` URLs | Verify URL resolution rather than copying media into `client/public` or `client/src`. |
| Dashboard navigation | Single protected page with smooth anchor navigation | Do not create internal-section routes. |
| Theme | Persisted dark/light theme; dark glass is primary | Audit both themes whenever contrast or navigation is changed. |

## 4. Phase 0 — Authorization and Baseline Gate

Before beginning an execution phase, document the user’s authorization, inspect the relevant authority files and active implementation, and append a specific unchecked item to `todo.md`. Classify the request as one of the following:

| Classification | Permitted Action |
|---|---|
| `READ_ONLY` | Inspect, validate, and report. Do not modify code, assets, manifests, routes, database, or authentication. |
| `EXECUTE_APPROVED` | Apply only the explicitly approved scope, then test, build, visually verify where relevant, update `todo.md`, and checkpoint. |
| `BLOCKED` | Do not invent a substitute. Report the exact source file, approval, content, framework, or access requirement. |

## 5. Phase 1 — Repository & Asset Audit

### Objective

Remove only verified disposable traces, construct or verify the final-package hierarchy, audit asset references, and produce auditable asset metadata. Preserve all approved source assets and formal SEG decision records.

### Required Layout

```text
/home/ubuntu/webdev-static-assets/SEG_FINAL_PACKAGE/
├── assets/
│   └── images/
├── data/
│   ├── metadata.json
│   └── path_audit.json
├── content/
└── assets_manifest.json
```

The package is intentionally external to the deployed repository, in accordance with the static-media rule. The project’s inspection and audit scripts remain under `/home/ubuntu/seg-phase1/scripts/`. [3] [5]

### Required Procedure

1. Inventory `.log`, `.tmp`, `.bak`, obsolete trace records, and any legacy `SEG_CHECKPOINTS/` directory. Determine whether each candidate is tracked, ignored, or authoritative before deleting it.
2. Delete only confirmed disposable traces and non-authoritative backups. Never delete an approved asset package, formal decision report, manifest, authentication source, or database artifact.
3. Build or validate `assets`, `data`, and `content` folders without generating unavailable content.
4. Maintain `assets_manifest.json` with asset key, source, source version, approval status, usage scope, registered managed URL, local audit copy when applicable, and restrictions.
5. Run the path audit. It must verify required folders, local asset paths, published managed URLs, and content-declared references.
6. Write an evidence-first phase report that distinguishes **PASS**, **PARTIAL**, and **BLOCKED** conditions.

### Current Phase 1 Commands

```bash
cd /home/ubuntu/seg-phase1
pnpm audit:final-package
pnpm test
pnpm check
pnpm build
```

The current `audit:final-package` command uses `scripts/audit-final-package.mjs` and writes its machine-readable result to `SEG_FINAL_PACKAGE/data/path_audit.json`. Its corresponding unit test is `scripts/audit-final-package.test.ts`. [5] [6]

### Current Phase 1 Status

Phase 1 is complete as of checkpoint `be578552`: the package has 21 registered managed assets, 9 verified local source-image audit copies, 0 local or remote asset-path failures, and no declared content-reference failures. The package has no approved `processed_book.json`, sections, chapters, charts, or tables; these remain documented blockers rather than fabricated files. [5] [7]

## 6. Phase 2 — Frontend UX & Accessibility Audit

### Objective

Perform an evidence-based WCAG 2.1 AA audit of the current SEG application, including desktop and mobile behavior, without inventing an absent Reader Component or book content.

### Required Checks

| Check Area | Required Evidence | Constraint |
|---|---|---|
| Automated accessibility | Run an appropriate accessibility audit using `axe-core` or Lighthouse against reachable public pages and permitted authenticated Dashboard state. | Treat authentication-restricted routes as an evidence limitation; do not bypass access controls. |
| Interactive semantics | Verify accessible names, ARIA labeling where required, keyboard navigation, visible focus, and usable control state for navigation, theme switch, forms, menus, and any zoom control that actually exists. | Do not add a Reader Component or control solely to satisfy a checklist. |
| Color contrast | Measure text and interactive-state contrast in both dark and light themes against a minimum **4.5:1** for normal text. | Keep the approved SEG dark glass identity primary. |
| Tables | Verify any existing large data table is wrapped in an appropriate responsive overflow container. | If no table exists, report **not applicable**, not a pass by assumption. |
| Typography and navigation | Verify responsive type, reflow, reduced-motion behavior, anchor navigation, fixed header, and TOC behavior where a TOC actually exists. | Do not add content structures without approval. |
| Reader Component | Inspect only if present in the project. | Current release baseline has no approved book-reader module; otherwise report **blocked/not applicable** pending content and component authorization. [7] |

### Deliverable and Gate

Create `SEG_PHASE2_UX_ACCESSIBILITY_AUDIT_REPORT.md` with the evidence, findings, impact level, route or component scope, required correction, and validation method. Do not implement accessibility corrections until the user approves their explicit scope.

## 7. Phase 3 — Production Readiness and Framework Gate

### Mandatory Decision Before Execution

The user must select one of these paths before any Next.js-specific work begins.

| Option | Description | Permitted Phase 3 Work |
|---|---|---|
| A — Maintain Vite | Preserve the current stack. | Audit and implement Vite/Express equivalents for security headers, static pre-rendering strategy where appropriate, image strategy, bundle analysis, error boundaries, and logging. |
| B — Migrate to Next.js | Explicitly authorize a planned framework migration with routing/authentication/database preservation criteria. | Create a migration plan and separate checkpoint before introducing Next.js, SSG/ISR, `next/image`, or `next.config.js`. |

### Vite-Equivalent Release Checklist (Option A)

1. Add security headers in the current Express/Vite serving boundary only after reviewing the OAuth, storage, and development implications of CSP and HSTS.
2. Perform bundle analysis and identify code-splitting opportunities. Do not alter chunks solely to suppress warnings; validate routes and loading behavior afterward.
3. Use the existing managed image URLs and set explicit dimensions or responsive behavior where the rendering surface needs it. Do not import or relocate approved static media into the client bundle.
4. Review existing error boundaries and logging output. Add only scoped, privacy-safe release diagnostics that do not expose secrets or health data.
5. Run tests, TypeScript checking, production build, and public/authenticated visual checks appropriate to the modified scope.

### Next.js Controls (Option B Only)

If and only if migration is authorized, first create a migration design that covers existing Wouter navigation, single-route Dashboard anchors, Manus OAuth lifecycle, tRPC contracts, database access, managed storage URLs, visual freeze, and rollback. Do not treat SSG/ISR as applicable until the actual route/data model supports it.

## 8. Validation, Reporting, and Checkpoint Standard

Every execution phase must follow this sequence:

1. Update `todo.md` with a specific unchecked task before implementation.
2. Make the smallest authorized change.
3. Add or update focused tests for new deterministic logic.
4. Run the relevant validation commands, normally `pnpm test`, `pnpm check`, and `pnpm build`.
5. Capture desktop/mobile visual evidence when the task changes UI. Do not use snapshots or screenshots as UI assets.
6. Produce a report in the format **STATUS / Evidence / Current State / Changes Planned or Applied / Risk / Validation / Next Step**.
7. Mark completed items in `todo.md` and read it before saving a checkpoint.
8. Save a checkpoint. With auto-publish enabled, a successful checkpoint publishes the current state.

> Never report an inferred pass. A missing asset, absent medical content source, unavailable authenticated session, or incompatible framework must be recorded as a specific blocker with the narrowest safe next action.

## 9. Reference Files

| File | Use |
|---|---|
| `SEG_PHASE1_REPOSITORY_ASSET_AUDIT_REPORT.md` | Phase 1 execution evidence and current asset/content blockers. |
| `SEG_VISUAL_ASSET_REGISTRY_FINAL_REPORT.md` | Pre-release visual asset registry evidence and source-governance gaps. |
| `SEG_FINAL_VISUAL_FREEZE_ACCEPTANCE_DECISION.md` | Frozen approved visual implementation scope. |
| `SEG_DASHBOARD_UX_FINAL_REPORT.md` | Current Dashboard UX baseline and anchor-navigation evidence. |
| `SEG_FINAL_PACKAGE/data/path_audit.json` | Machine-readable path-audit result in the external static-asset workspace. |
| `scripts/audit-final-package.mjs` | Repeatable final-package path-audit implementation. |

## References

[1]: file:///home/ubuntu/projects/yarab-4d75d104/SEG_FINAL_VISUAL_ASSETS_PACKAGE_v1.0_PRODUCTION.zip "SEG production visual asset authority"  
[2]: file:///home/ubuntu/projects/yarab-4d75d104/SEG_DESIGN_SYSTEM.md "SEG Design System"  
[3]: file:///home/ubuntu/seg-phase1/SEG_PHASE1_REPOSITORY_ASSET_AUDIT_REPORT.md "Phase 1 repository and asset audit evidence"  
[4]: file:///home/ubuntu/seg-phase1/package.json "Current SEG technical baseline"  
[5]: file:///home/ubuntu/seg-phase1/scripts/audit-final-package.mjs "Final package audit command"  
[6]: file:///home/ubuntu/seg-phase1/scripts/audit-final-package.test.ts "Final package manifest test"  
[7]: file:///home/ubuntu/webdev-static-assets/SEG_FINAL_PACKAGE/data/path_audit.json "Current final package path-audit result"
