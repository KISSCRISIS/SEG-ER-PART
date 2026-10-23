# UI Patch 1 — Baseline Notes

## Scope
Landing `/`, Login `/login`, Register `/register`; UI-only responsive review at 320px, 360px, 390px, and 430px. No source code changes were made during baseline capture.

## Environment
- Repository: `KISSCRISIS/manus`
- Branch: `main`
- Baseline source commit: `e2e7ee534d2c7d7f1c285ff7f55e69126423977c`
- Local runtime: `http://127.0.0.1:4317/` exposed only through a temporary preview proxy for browser inspection.
- Reference requested by user: `SEG_DESIGN_AUDIT_BRAND_UX_REPORT.md` — not found in the shared project directory or the cloned repository at baseline time.
- Available baseline/audit records reviewed: `SEG_ACCESSIBILITY_REVIEW_BASELINE.md`, `SEG_FINAL_UI_CONSISTENCY_AUDIT.md`.

## Landing baseline observation
The current Landing route rendered successfully. The observed DOM exposed the approved SEG hierarchy, `GET STARTED` CTA, capability cards, metrics, references, practice, learn, and medical-journal shell sections. The visible baseline viewport showed the current light presentation with the established top navigation, hero copy, circular emergency timer, capability cards, and medical visual panel. No content, assets, routes, auth behavior, or medical data were changed.

## Existing audit evidence
`SEG_FINAL_UI_CONSISTENCY_AUDIT.md` records current desktop and 390x844 captures as consistent with no observed horizontal overflow. `SEG_ACCESSIBILITY_REVIEW_BASELINE.md` records visible focus outlines, browser zoom preservation, reduced-motion handling, and the approved accessible controls. These records do not provide the user-requested 320/360/430 viewport evidence.

## Required next evidence
Capture or reproduce baseline screenshots for Landing, Login, and Register at 320/360/390/430 before patching; record horizontal overflow, initial-viewport form visibility, text size/readability, focus outlines, touch-target geometry, and Light/Dark state.

## Visual review notes from baseline captures
- The contact sheet covers Landing, Login, and Register at 320/360/390/430×844.
- Landing at all four widths keeps the approved hierarchy and stacks capability cards; the hero title and CTA remain visible. The narrowest capture is readable but dense, with top controls and the circular timer consuming substantial vertical space.
- Login at 320×844 keeps the full auth card, fields, remember/forgot row, primary action, provider buttons, and Register link in the initial viewport. The Remember label wraps to two lines and the Forgot password label also wraps; provider buttons are visually tight at the narrowest width. This is a confirmed readability/spacing target, not an auth-flow change.
- Register captures show the intended dark split/stacked surface and bottom navigation; the narrowest view is dominated by the story panel and only the start of the form/content is visible. This is a candidate initial-viewport/readability issue to verify against the audit scope before changing anything.

## Post-patch visual review
The Light contact sheet shows the Landing title, intro copy, benefit descriptions, CTA, Login auth card, and Register form appearing with more readable spacing at all four widths. The Register form now appears first on mobile; at 320px the language controls, heading, personal-information section, fields, and start of the role section are visible within the initial viewport. The Login card remains fully visible in the initial viewport, with the remember/forgot row and provider buttons fitting without horizontal escape.

The Dark contact sheet preserves the existing dark medical-tech identity, cyan/teal accents, glass cards, and the same responsive stacking. No new asset or placeholder appears; existing image behavior remains unchanged. The captured dark and light sheets show no visible horizontal clipping in the target pages.

Automated Light metrics record `horizontalOverflow: false` for all 12 route/viewport combinations. Focus testing must be interpreted through the existing `:focus-visible` and `:focus-within` rules: text inputs intentionally have `outline: 0`, while their parent field receives the visible focus treatment. The CTA focus outline remains 2px solid with 3px offset.
