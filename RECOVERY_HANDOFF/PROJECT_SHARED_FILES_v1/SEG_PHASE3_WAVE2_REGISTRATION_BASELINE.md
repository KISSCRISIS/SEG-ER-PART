# SEG Phase 3 Wave 2 — Registration Baseline

## Scope

This is a READ_ONLY baseline capture before any Wave 2 patch. Target route: `/register`. No form data was entered and no authentication operation was submitted.

## Runtime

Temporary local runtime URL: `https://3000-i6i84ekciarkxe30hyd3n-bfe304a8.sg1.manus.computer/register`
Viewport observed: 1280px wide browser viewport with the initial viewport showing the upper Registration shell. The page reports additional content below the viewport.

## Observed structure

The page renders a split public auth surface. The left panel contains the SEG lockup, the Emergency Medicine Learning Platform label, the “Join thousands of future heroes.” hero statement, supporting copy, and benefit/trust content. The right panel contains language controls, theme toggle, “Create Your Account” heading, supporting copy, Personal Information fields, password guidance, Professional Role section, Additional Information controls, terms consent, account CTA, provider buttons, and the Login link.

Visible interactive landmarks include the Back to SEG link, English and Arabic controls, theme toggle, Full Name, Email Address, Password, Confirm Password, and password visibility buttons. Extracted content also confirms role options, country/year selectors, Create Account CTA, provider buttons, and navigation to Sign in.

## Baseline observations

- Registration is a separate public route and uses the existing auth form surface.
- The current page uses the existing SEG lockup and dark-glass / light-form split composition.
- The upper viewport shows the form beginning in the right panel while the left story panel remains visible.
- No new horizontal overflow or clipping was observed in the captured upper viewport.
- The page has additional vertical content below the initial viewport; a scroll attempt did not change the browser scroll position in the connected browser view, so the lower-state visual evidence remains incomplete and must be marked UNVERIFIED until a deterministic full-page or lower-viewport capture is available.
- No source files were modified during this baseline capture.

## Governance boundary

Do not change authentication logic, API contracts, providers, routes, database, Prisma, security boundaries, medical content, or shared auth primitives. Any authorized visual patch must remain page-local and reversible.

## Source

Observed from the connected browser at the runtime URL above; no credentials or personal data were used.

## Additional viewport inspection

A second inspection of the connected browser at the same public route showed the same upper layout and confirmed the form hierarchy through the Professional Role heading. The browser reported additional content below the viewport; the connected view did not advance on the attempted scroll, so lower-section evidence remains explicitly unverified rather than inferred. No form data was entered and no auth action was triggered.

## Wave 2 decision

Registration remains a no-op candidate pending deterministic lower-viewport evidence. No visual patch is justified solely from the current baseline.

