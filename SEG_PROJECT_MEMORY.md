# SEG Project Memory Bank

This is a compact, evidence-backed continuity artifact for the SEG project. It records validated reusable patterns and confirmed corrections. It does not replace current user direction, the production asset package, or the SEG design system.

## Validated Patterns

## Pattern: Reference-derived medical-stage compositing
**Use when:** An approved SEG screen reference contains a distinctive medical visual without a separate clean asset export.
**Reuse:** `/home/ubuntu/webdev-static-assets/` deterministic crop and matte-cleanup scripts, then `client/src/lib/seg-assets.ts` registry entries.
**Validated by:** Login and Landing desktop/mobile visual captures; project tests, TypeScript check, and production build.
**Constraints:** Crop only from the approved reference; retain source visual identity; use managed asset storage; do not replace with generic line icons or invented images.

## Pattern: Public reference-led route rebuild
**Use when:** Replacing an approved SEG public page visual layer while preserving behavior.
**Reuse:** Target route component, `SEG_ROUTES`, `seg-assets.ts`, shared `index.css` tokens, route-focused page test, Vitest/jsdom configuration.
**Validated by:** Rebuilt `/login` and `/` routes; focused DOM tests, TypeScript check, production build, and desktop/mobile screenshots.
**Constraints:** Preserve OAuth event handlers, public navigation, route labels, and source-authority order; keep all non-essential motion below 300 ms and respect reduced motion.

## Pattern: Registration accessible selection controls
**Use when:** A Registration detail must be selected reliably on desktop, mobile, and keyboard navigation.
**Reuse:** `client/src/components/ui/select.tsx` with a controlled `Select`, `SelectTrigger`, `SelectContent`, and `SelectItem`; preserve `seg-register-v2-*` visual classes.
**Validated by:** Country listbox opening and retaining Jordan in the browser, Registration interaction coverage, TypeScript validation, production build, and mobile capture.
**Constraints:** Use existing primitives rather than introducing a new selector; keep form state local unless a backend contract has been explicitly approved.

## Non-repeatable Corrections

### Do not replace distinctive approved SEG medical imagery with generic icons
**Trigger:** Earlier Login and Landing visual gaps used simplified icon substitutes for reference-specific stages.
**Never:** Use Lucide or other generic icons for a primary brain, heart, hologram, official mark, or reference-specific intelligence core.
**Instead:** Use the exact approved asset or a transparent crop derived only from the currently approved source reference.
**Evidence:** SEG production source-authority rules; approved Login and Landing visual corrections.

### Do not assume protected dashboard visibility
**Trigger:** The My Home route is protected by external OAuth and the active browser session reached a CAPTCHA gate.
**Never:** Claim an authenticated My Home review without a rendered dashboard capture from a completed session.
**Instead:** Request user-controlled authentication completion; perform only a read-only review after direct authenticated evidence is available.
**Evidence:** Protected route rendering and external authentication browser state.

### Do not rely on native select styling for critical dark-glass Registration fields
**Trigger:** The country control was reported as not opening reliably in the Registration experience.
**Never:** Treat a native select as sufficient when the existing accessible Select primitive can provide an explicit trigger, listbox, and menu interaction.
**Instead:** Reuse the controlled project Select primitive, add a focused browser/test interaction check, and preserve the approved dark-glass visual shell.
**Evidence:** Direct browser opening of the corrected Country listbox, mobile visual capture, and passing Registration interaction test.
