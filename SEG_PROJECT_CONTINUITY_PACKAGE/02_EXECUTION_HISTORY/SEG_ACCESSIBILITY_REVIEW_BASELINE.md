# SEG Accessibility Review Baseline

Date: 2026-08-15
Scope: Landing (`/`), Login (`/login`), Registration (`/register`), Dashboard gate (`/dashboard`).

## Continuity guardrails

The active continuity package defines this review as limited to zoom, contrast, landmarks, ARIA relationships, keyboard-visible focus, and reduced-motion behavior. The visual freeze, OAuth boundary, database boundary, dashboard routing, and content governance remain unchanged.

## Automated source baseline

`pnpm check` passed. The approved remediation guardrail test file is present at `client/src/accessibility-remediation.test.ts`. The repository still contains an external asset-manifest test whose missing external package is independent of this review.

## Runtime baseline

The production build was started locally with safe non-production placeholder variables. `/healthz` returned HTTP 200. The local review server was bound to 127.0.0.1:4317 only.

## Landing findings

The live DOM exposed one `main`, a labeled primary `nav`, a `h1` with id `landing-title`, labeled sections, and named controls. The viewport meta content is `width=device-width, initial-scale=1.0`, preserving browser zoom. The light CTA `.seg-landing-v4-action` computed to background `rgb(15, 118, 110)`, border `rgb(15, 118, 110)`, and text `rgb(255, 255, 255)`, matching the approved AA-safe styling. No unnamed interactive controls were found in the runtime sample.

## Login findings

The live DOM exposed labeled inputs for Email Address and Password, a checkbox with a visible label, named buttons for Forgot password, Login, Google, Microsoft, and Apple, and a Register link. The existing source guardrail expects a semantic display-settings nav and no generic language-control aria-label pattern.

## Registration findings

The live DOM exposed named password-visibility controls, role buttons with `role="radio"`, named Country and Graduation year combobox controls, Terms and Privacy links, and named social-login buttons. The source guardrail expects a benefits section with an accessible label and a language-selection group with `role="group"` and an accessible label.

## Dashboard findings

The unauthenticated dashboard gate rendered a `main` with `aria-labelledby="dashboard-sign-in-title"`, a matching heading, and a named Login button. No authentication was bypassed. Internal authenticated anchor behavior remains covered by the existing DashboardLayout and DashboardPage tests.

## Initial conclusion

The scoped runtime baseline confirms the approved six remediation areas are present at the source/runtime boundary. The next step is to run the focused accessibility tests and inspect keyboard focus and reduced-motion behavior; any fixes must remain limited and must not reopen the visual freeze.

Evidence console outputs:

- `/home/ubuntu/console_outputs/exec_result_2026-08-15_21-23-37_671.txt`
- `/home/ubuntu/console_outputs/exec_result_2026-08-15_21-23-55_117.txt`
- `/home/ubuntu/console_outputs/exec_result_2026-08-15_21-24-15_995.txt`
- `/home/ubuntu/console_outputs/exec_result_2026-08-15_21-24-32_240.txt`

## Keyboard and motion baseline

The live Landing DOM returned a 2px solid `rgb(13, 148, 136)` outline for the sampled links and buttons when focused, including the primary CTA. The current browser preference reported `prefers-reduced-motion: false`; the source already contains reduced-motion handling and this review did not alter it. No sampled control lacked a visible focus outline.

Evidence: `/home/ubuntu/console_outputs/exec_result_2026-08-15_21-25-36_802.txt`.
