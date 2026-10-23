# SEG — Phase 2 UX & WCAG 2.1 AA Accessibility Audit

**Mode:** READ_ONLY audit  
**Scope:** Landing (`/`), Login (`/login`), Registration (`/register`), and the currently unauthenticated Dashboard gate (`/dashboard`)  
**Audit baseline:** Checkpoint `c4e7c43f`; React/Vite preview  
**Audit date:** 15 August 2026

## STATUS

The current SEG interface has a consistent responsive visual system, generally named public controls, semantic form controls, a shared 44 × 44 px theme switch, and an explicit reduced-motion path for Dashboard navigation. Desktop and 390 px mobile captures show the reviewed public surfaces reflowing without an observed visual clipping failure. [1] [2] [3]

However, the audited release **does not currently meet a WCAG 2.1 AA release gate**. A global viewport setting prevents user zoom, a light-theme gradient CTA has measured text contrast below the AA threshold, and several semantic-landmark / ARIA issues were detected by the automated inspection. No code, CSS, assets, routes, database, authentication, or medical content was changed during this audit.

> **Decision:** **REMAINING ACCESSIBILITY REQUIREMENTS.** The corrective items in this report require a separate explicit implementation authorization.

## Evidence and Method

The audit used four complementary evidence streams: responsive captures at **1280 × 720** and **390 × 844**; source inspection of the page structure, shared controls, themes, and motion rules; an isolated `axe-core` inspection with local Chromium; and a deterministic WCAG contrast calculation for explicit foreground/background pairs. The automated run checked the public pages and the Dashboard’s unauthenticated protection state; it did not bypass the existing OAuth boundary. [1] [2] [3] [4]

The effective browser state was persisted **light** theme. The dark-theme tokens and reduced-motion rules were inspected statically, but a separate interactive dark-theme pass remains required after corrective work because the isolated automated browser did not reproduce an authenticated or persisted dark-theme session. This is an evidence limitation, not a negative finding.

## 1. Automated Audit Summary

| Route / State | Confirmed Violations | Notable Result |
|---|---:|---|
| Landing (`/`) | 2 | Global zoom restriction; nested complementary landmark. |
| Login (`/login`) | 2 | Global zoom restriction; language indicator is outside a landmark and has an invalid ARIA pattern. |
| Registration (`/register`) | 1 confirmed, 2 ARIA review flags | Global zoom restriction; two generic labeled containers require semantic correction. |
| Dashboard (`/dashboard`, unauthenticated) | 2 | Global zoom restriction; protection gate lacks a `main` landmark. |
| Public labels and button/link names | 0 automated violations | The inspected Login and Registration controls expose names through labels, visible text, or supplied accessible names. |

The automated findings are corroborated by the affected markup rather than treated as generic tool output. The current viewport includes `maximum-scale=1`; the Landing countdown is an `aside` nested in `main`; the unauthenticated Dashboard returns plain `div` wrappers around its heading and explanation; and the Login language indicator is a generic labeled `div`. [5] [6] [7] [8]

## 2. Confirmed Findings

| ID | Severity | WCAG 2.1 Criterion | Evidence | Required Correction Scope |
|---|---|---|---|---|
| A11Y-01 | **Critical** | **1.4.4 Resize Text (AA)** | Every audited route inherits `maximum-scale=1` from `client/index.html`, preventing user zoom on mobile. | Remove the maximum-scale restriction; then retest 200% text enlargement and mobile reflow. |
| A11Y-02 | **High** | **1.4.3 Contrast (Minimum) (AA)** | In light mode, the Landing CTA uses white text over `#0D9488 → #0EA5E9`; measured endpoint ratios are **3.74:1** and **2.77:1**, respectively. | Use an approved darker gradient / solid background, or an approved sufficiently dark text treatment; verify all CTA states. |
| A11Y-03 | **Medium** | **1.3.1 Info and Relationships (A)** | The Landing countdown uses `<aside>` inside `<main>`, triggering `landmark-complementary-is-top-level`. | Change only the countdown wrapper’s semantics to a non-complementary structural element or relocate it into a valid top-level complementary relationship without altering the visual composition. |
| A11Y-04 | **Medium** | **1.3.1 Info and Relationships (A)** | The unauthenticated Dashboard gate has no `main` landmark; its `h1` and explanatory paragraph are outside landmark containment. | Wrap the existing protected-state content in a semantic `main`; preserve the existing OAuth event-handler flow. |
| A11Y-05 | **Medium** | **1.3.1 Info and Relationships (A)** | Login exposes `EN` through a generic `<div aria-label="Current language: English">`, producing `aria-prohibited-attr` review evidence and a `region` failure. | Place language/status controls in a semantic header or a valid labeled group; do not use an ARIA label on a generic `div`. |
| A11Y-06 | **Low** | **1.3.1 Info and Relationships (A)** | Registration has generic `div` elements with `aria-label` for the benefits block and language selection, flagged for ARIA review. | Use a semantic `section` with a programmatic name for benefits and a valid labeled `group` for language buttons. |

WCAG requires text to be resizable to 200% without lost content/functionality, and places responsibility on authors not to interfere with browser scaling. It also requires normal text at least 4.5:1, with a lower 3:1 threshold only for qualifying large text; the light CTA’s sky-blue endpoint is below both thresholds. [9] [10]

## 3. UX, Keyboard, and Responsive Findings

| Area | Result | Evidence / Limitation |
|---|---|---|
| Responsive layout | **Pass — observed baseline** | Landing cards/metrics reflow; Login controls remain sequential; Registration fields and role choices stack; Dashboard anchor workspaces remain vertically ordered at 390 px. [1] |
| Native form usability | **Pass — source and automated baseline** | Login and Registration inputs use labels or screen-reader labels; password visibility buttons and selects have accessible names. [11] [12] |
| Dashboard anchor navigation | **Pass — source baseline** | Existing navigation respects `prefers-reduced-motion`, announces the target in a polite live region, and retains the frozen anchor architecture. [7] |
| Motion safety | **Pass — source baseline** | Essential transitions are bounded at 220 ms / 180 ms and suppressed under `prefers-reduced-motion: reduce`. [3] |
| Focus visibility | **Pass — source baseline** | Light mode defines a visible focus outline; the shared theme switch is at least 44 × 44 px. A live keyboard traversal remains required after corrections. [3] |
| Tables and responsive containers | **Not applicable** | No application table, reader module, or `overflow-x` table container exists in current `client/src`. No table requirement can be passed by assumption. |
| Reader / chapter navigation / TOC | **Blocked / not present** | No approved Reader Component, book data, chapters, or TOC is currently implemented. This must be assessed only after approved source content and a Reader scope are supplied. [13] |
| Authenticated Dashboard interaction | **Evidence-limited** | This audit did not bypass OAuth. The unauthenticated gate was tested; authenticated keyboard order, menu focus management, and dark-mode runtime interactions remain a focused post-fix validation item. |

## 4. Theme and Contrast Assessment

The explicit light-theme reading pairs meet normal-text AA where flat pairs can be calculated: `#334155` on `#F8FAFC` is **9.90:1**; `#64748B` on white is **4.76:1**; `#0F172A` on white is **17.85:1**; and Atlas navigation `#0F766E` on white is **5.47:1**. The inspected dark flat pairs also pass: `#F8FAFC` on `#06111F` is **18.12:1**, and `#E0F2FE` on `#0F172A` is **15.56:1**. [3]

Gradients, translucent glass surfaces, background imagery, and layered CSS overrides generated additional automated **incomplete** contrast checks. Those are not counted as confirmed failures without a computed foreground/background result. They require a targeted runtime contrast verification in both themes after A11Y-02 is corrected. The report does not infer a pass for them.

## 5. Recommended Correction Order

| Order | Authorized Scope Needed | Reason |
|---:|---|---|
| 1 | `client/index.html` viewport only | Removes the global critical zoom barrier without changing layout, routes, auth, or assets. |
| 2 | Landing CTA color token / classes only | Resolves the confirmed light-mode AA contrast failure while retaining the approved visual identity. |
| 3 | Landing, Login, Registration, and unauthenticated Dashboard semantic wrappers only | Resolves the confirmed landmark / ARIA issues without redesigning screens or changing authentication behavior. |
| 4 | Focused test additions and repeat audit | Confirms no regression in semantic markup, dark/light themes, keyboard behavior, and mobile zoom. |

## 6. Validation Required After Authorization

The following evidence is required before a Phase 2 acceptance decision can be issued:

1. Re-run automated `axe-core` checks on all four public/protected-gate routes with zero violations for A11Y-01, A11Y-03, A11Y-04, A11Y-05, and A11Y-06.
2. Recalculate the corrected CTA contrast across all gradient/state endpoints and confirm WCAG 2.1 AA compliance in light theme; repeat dark-theme sampling.
3. Perform keyboard-only traversal for Landing navigation, Login, Registration roles/selects/password controls, theme switch, Dashboard gate, and authenticated Dashboard if a session is available.
4. Verify 200% text resizing and mobile reflow at 390 px without clipped content or loss of access to controls.
5. Run `pnpm test`, `pnpm check`, and `pnpm build`; capture desktop and mobile visual evidence for the approved correction scope.

## 7. Risk and Governance

The recommended work is limited to viewport, color, and semantic corrections. It must preserve approved visual assets, the single protected `/dashboard` architecture, internal anchors, Manus OAuth, database boundaries, the frozen visual system, and the prohibition on inventing medical content. No Drug Reference, Reader, Medical Journal content, route, or framework migration is part of this Phase 2 correction scope. [14]

## Next Step

**Await explicit approval** for the six narrowly scoped accessibility corrections listed in Section 2. Phase 3 remains gated by the separate Vite-versus-Next.js framework decision recorded in `SEG_RELEASE_ORCHESTRATOR.md`.

## References

[1]: file:///home/ubuntu/seg-phase1/SEG_PHASE2_AUDIT_EVIDENCE.md "Responsive screenshot evidence log"  
[2]: file:///tmp/seg-axe-results/ "Isolated axe-core route reports"  
[3]: file:///home/ubuntu/seg-phase1/client/src/index.css "Theme, focus, transition, reduced-motion, and light-mode styling"  
[4]: file:///tmp/seg-contrast-check.mjs "Deterministic contrast-pair calculation method and outputs"  
[5]: file:///home/ubuntu/seg-phase1/client/index.html "Global viewport configuration"  
[6]: file:///home/ubuntu/seg-phase1/client/src/pages/Home.tsx "Landing landmark structure and CTA"  
[7]: file:///home/ubuntu/seg-phase1/client/src/components/DashboardLayout.tsx "Protected-state landmark structure and anchor navigation"  
[8]: file:///home/ubuntu/seg-phase1/client/src/pages/LoginPage.tsx "Login language and main-region structure"  
[9]: https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html "W3C — Understanding SC 1.4.4 Resize Text"  
[10]: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html "W3C — Understanding SC 1.4.3 Contrast (Minimum)"  
[11]: file:///home/ubuntu/seg-phase1/client/src/pages/RegisterPage.tsx "Registration controls and form semantics"  
[12]: file:///home/ubuntu/seg-phase1/client/src/components/ThemeToggle.tsx "Accessible theme-switch naming and state"  
[13]: file:///home/ubuntu/webdev-static-assets/SEG_FINAL_PACKAGE/data/path_audit.json "Current final-package content and asset inventory"  
[14]: file:///home/ubuntu/seg-phase1/SEG_RELEASE_ORCHESTRATOR.md "SEG release guardrails and phase gates"
