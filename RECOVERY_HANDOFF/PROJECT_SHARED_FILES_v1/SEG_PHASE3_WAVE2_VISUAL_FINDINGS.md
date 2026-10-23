# SEG Phase 3 Wave 2 — Visual Findings

## Scope

Registration and Login only. Read-only visual comparison before any source patch. Authentication logic, routes, providers, API contracts, database, and security boundaries are protected.

## Login 1440×900

The current Login surface renders as a centered white glass card on a pale background. The card includes the Welcome Back heading, supporting copy, email and password inputs, remember-me and forgot-password row, primary Login CTA, OAuth buttons, and Register link. The visible surface uses the existing cyan/teal accent and rounded controls. The top brand lockup appears with a broken/missing image presentation in the captured runtime, showing alt text instead of the intended logo asset. This is an asset/runtime evidence issue and must not be repaired by changing authentication logic or inventing a new asset.

## Registration 1440×900

The current Registration surface renders a dark branded story panel on the left and a large light form panel on the right. The form includes language/theme controls, Create Your Account heading, personal-information fields, password helper, professional-role cards, optional information controls, and terms/privacy checkbox. The captured runtime also shows a broken/missing image presentation at the lower edge of the dark story panel. The role row includes an empty-looking trailing tile in the current viewport; this needs source/component inspection before any visual change because it may be an intentional grid placeholder or an asset/content issue.

## Preliminary gap decision

No safe visual patch is justified yet. The main observable differences are missing/broken asset rendering and a possible empty role tile, both of which require asset registry/component evidence before changing CSS or JSX. Preserve current auth screens until the asset/component cause is confirmed. Continue with source/test/build evidence and do not modify auth behavior.

## Evidence paths

- Login screenshot: `SEG_PHASE3_WAVE2_SCREENSHOTS/login_1440x900.png`
- Registration screenshot: `SEG_PHASE3_WAVE2_SCREENSHOTS/register_1440x900.png`
- Registration baseline: `SEG_PHASE3_WAVE2_REGISTRATION_BASELINE.md`
- Login baseline: `SEG_PHASE3_WAVE2_LOGIN_BASELINE.md`

## Change boundary

No source files changed at this point. No medical content, routes, auth handlers, providers, API contracts, database, Prisma, or security boundaries changed.

## Mobile screenshots — 390×844

### Login

The mobile Login card fits within the 390px viewport with visible side margins. The form fields, remember-me row, primary CTA, social buttons, register link, and first trust cards remain readable. No horizontal overflow or clipped form control is visible in the captured viewport. The top lockup image is broken/missing and exposes its alternative text across two lines; this confirms a rendered asset failure in the current runtime, not a layout overflow. The theme control remains visible at the upper right.

### Registration

The mobile Registration form fits within the viewport with a single-column field layout and readable hierarchy. The language controls and theme toggle remain visible, the four personal-information fields stack correctly, the password helper wraps within the content width, and the professional-role cards use a two-column grid without visible horizontal overflow. The captured viewport ends during the role grid, so lower sections remain unverified in this screenshot. The dark story panel and its broken lower asset are not visible in this mobile viewport. No confirmed mobile CSS patch is justified from the captured state.

## Updated preliminary decision

Login has a confirmed missing/broken brand-lockup asset rendering in the runtime. Registration has a confirmed missing/broken story asset at desktop, but the observed responsive layout itself remains structurally sound in the captured mobile viewport. Before patching, verify asset availability and the storage proxy behavior; do not alter page structure or auth logic to compensate for a runtime asset issue.

## Runtime asset probe

The local runtime returned `HTTP 500 Internal Server Error` for the Login lockup, Registration brain/heart mark, and Registration heart/ECG stage paths under `/manus-storage/`. The storage proxy source explicitly returns 500 when Forge storage configuration is missing, and returns 502 for backend/signing failures. This is direct evidence that the broken image rendering is an environment/storage configuration artifact in the captured local runtime. It is not evidence of a CSS, page-layout, or authentication implementation defect. No fallback asset, placeholder, or source-side compensation is authorized by the current scope.

## Final visual finding classification

- `VR-AUTH-001` — Login brand lockup: `ENVIRONMENT_ARTIFACT`, P2, confirmed at 1440×900 and 390×844; source asset binding is present, local `/manus-storage/` probe returns 500.
- `VR-AUTH-002` — Registration story/brand assets: `ENVIRONMENT_ARTIFACT`, P2, confirmed at 1440×900; local `/manus-storage/` probes return 500. The 390×844 capture does not expose the story panel because the approved responsive order shows the form first.
- `VR-AUTH-003` — Registration trailing role tile: `EXPECTED`, P3, desktop-only intentional layout filler. Source renders `.seg-register-v2-role-blank`; CSS hides it at `max-width: 1120px`, so it is not a missing role option or content defect.
- `VR-AUTH-004` — Mobile auth layout: `PASS` for the captured 390×844 state, with no observed horizontal overflow or clipped action; complete seven-width responsive acceptance is not claimed because only 390px and 1440px captures are available in this Wave 2 package.

Date: 2026-08-18
