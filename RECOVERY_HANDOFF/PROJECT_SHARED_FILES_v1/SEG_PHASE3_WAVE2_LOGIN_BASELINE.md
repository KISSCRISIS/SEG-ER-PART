# SEG Phase 3 Wave 2 — Login Baseline

## Scope

This is a READ_ONLY baseline capture before any Wave 2 patch. Target route: `/login`. No credentials were entered, no form was submitted, and no OAuth provider action was triggered.

## Runtime

Temporary local runtime URL: `https://3000-i6i84ekciarkxe30hyd3n-bfe304a8.sg1.manus.computer/login`.

The browser reported additional content below the initial viewport. The observed public state was light mode.

## Observed structure

- Public login surface with a system-status pill, language indicator, theme toggle, SEG lockup, central glass login card, form fields, remember-me and forgot-password controls, login CTA, provider continuation buttons, registration link, and two trust cards.
- Interactive landmarks exposed by the browser included theme toggle, email input, and password input. Extracted content confirmed Remember me, Forgot password, Login, Google/Microsoft/Apple continuation, Register, Secure & Private, and Trusted By content.
- `LoginPage.tsx` keeps authentication event handling in `startLogin()` and event handlers; no auth behavior was changed during baseline capture.

## Visual observations

- The existing central-card composition and glass surface are present.
- No form data was entered and no sensitive browser operation was performed.
- The connected browser screenshot showed the approved shell elements, but the temporary preview overlay obscured the lower part of the initial viewport. Lower trust-card and footer evidence should be treated as incomplete until a deterministic screenshot capture is available.
- The screenshot also showed a broken/absent visible lockup image render in the connected preview state while the extracted DOM retained the intended alt text. This is recorded as an evidence/runtime asset issue, not repaired speculatively without confirming the asset registry and runtime parity.

## Governance boundary

Do not change authentication logic, OAuth providers, API contracts, routes, database, Prisma, security boundaries, medical content, or shared auth primitives. Any authorized visual patch must remain page-local and reversible.

## Decision status

Login requires deterministic runtime/asset comparison before any patch decision. Do not infer a new visual design from the preview overlay or from a single incomplete viewport.
