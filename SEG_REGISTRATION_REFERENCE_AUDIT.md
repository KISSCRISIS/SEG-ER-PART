# SEG Registration Reference Audit

**Authority:** User-supplied `SEG_Registration_Reference.png`  
**Route:** `/register`  
**Scope:** Visual-only reconstruction; preserve routing, validation behavior, authentication entry points, database boundaries, and security controls.

## Measured Reference Structure

| Layer | Approved reference | Current route before correction | Required correction |
|---|---|---|---|
| Desktop silhouette | Three tall panels on a deep navy canvas: narrative stage at left, near-white form panel in the middle, documentation/code stage at right. | Two dark panels with a wide form area and a medical visual stage. | Use a three-column desktop composition and retain all panels when responsive. |
| Brand and navigation | Left-panel Back to SEG control; SEG lockup at the top of the white form; compact `CREATE ACCOUNT` label. | A page-level Back to SEG control plus a dark-panel lockup. | Move hierarchy into the approved panel locations without changing destinations. |
| Form surface | Near-white, softly luminous form panel with dark typography, rounded pale fields, leading form icons, password visibility affordance, strength indicator, consent control, cyan CTA, Login text, and encryption notice. | Dark form surface, plain inputs, confirmation-password input, social controls, and no consent/strength treatment. | Rebuild the form visual structure to the approved hierarchy while retaining current submit validation. |
| Supporting visual stage | Dark narrative column with clinical-learning copy, organ-focused SEG medical illustration, cyan platform ring, and four compact benefit cards. | Dark anatomy stage placed on the opposite side. | Move the approved SEG medical media into the left narrative panel and restyle its hierarchy. |
| Right supporting stage | Dark code/documentation panel with cyan title, syntax-toned sample, and explanatory highlights. | No equivalent panel. | Add the approved visual documentation stage as presentational content only; it does not change application architecture. |
| Responsive behavior | Preserve the hierarchy without clipping or low-contrast controls. | Current route remains two-column until its existing breakpoint. | Stack the three source panels deliberately at narrow widths; retain clear focus states and form completion order. |

## Asset Decision

The implementation will reuse approved SEG medical media already registered in the application. It will not place the supplied Registration reference board itself into the live UI, and it will not introduce a new asset family or alter the authentication or data layers.

The production `SEG_Hero_Logo_Heart_Brain_ECG_Approved.png` file is a **presentation board**, but its labelled iOS app-icon region is an official logo asset. The live Registration page will use a clean crop of that isolated official icon region, stored in managed static storage. This avoids embedding the board while replacing the code-drawn header mark with approved brand imagery. The production `SEG_Primary_Logo_Approved.png` is an anatomy hologram and remains appropriate only for the left medical stage, not as a wordmark replacement.

## Final Validation

The final implementation uses the managed official brain-heart mark in both Registration brand lockups and the managed official anatomy hologram in the left narrative stage. It does not embed the supplied reference board or a presentation board in the page.

The Registration interaction test explicitly verifies required-field feedback, password visibility control, professional-track selection, successful local submit feedback, and Login navigation. The final validation run passed **7 tests**, TypeScript checking, and the production build. Desktop and mobile captures confirmed the three-panel desktop composition and intentional mobile stacking.

## Latest Approved Reference Supersession

**Latest authority:** User-supplied `ChatGPTImageAug13,2026,06_49_17AM.png` (1402 × 1122), which supersedes the earlier Registration visual direction for `/register`.

| Contract area | Latest approved direction | Implementation decision |
|---|---|---|
| Desktop layout | Two-column dark medical-tech composition: visual narrative stage at left and a wide rounded glass registration surface at right. | Replaced the prior three-panel direction with the two-column composition. |
| Medical visual | A glowing anatomical heart, ECG trace, particles, platform rings, and medical markers in the left stage. | Isolated the heart-and-ECG region from the user-approved source and uploaded it as `/manus-storage/SEG_Registration_Approved_Heart_ECG_Stage_4079b3c9.png`; it is used only in the left visual stage. |
| Form hierarchy | Language controls; personal information fields; role cards; optional details; consent; gradient CTA; social controls; sign-in path. | Implemented the same hierarchy while retaining the existing local validation and Login navigation behavior. |
| Official identity | SEG brain-heart lockup; no generic substitute. | Kept the managed official SEG brain-heart mark in the narrative lockup. |

### Selected Approved Skills

The reference rebuild selected and combined `strict-reference-fidelity`, `nextjs-tailwind-css-mastery`, `visual-fidelity-implementation`, `tailwind-glassmorphism`, and `svg-animation`. These skills governed source precedence, architecture-preserving React/Tailwind changes, glass-surface treatment, exact layout hierarchy, and accessible motion-safe ECG presentation. No authentication, database, route, or security-boundary changes were made.
