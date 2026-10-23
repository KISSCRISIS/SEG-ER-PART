# SEG Registration Form Correction Evidence

## Scope

This evidence record covers the requested Registration form correction only: reliable country selection, the availability and default selection of **Jordan**, and the requested graduation year **2015**. No authentication, database, security, or route logic was changed.

## Direct Evidence

The public `/register` route exposed the country control and accepted a direct selection of **Jordan**. To provide a more reliable interactive and keyboard-accessible user experience, the page now uses the project’s existing Radix-based `Select` primitive rather than relying on the prior native control. The same existing primitive is used for the new Graduation Year control, whose initial value is **2015**.

## Automated Validation

The focused Registration interaction coverage verifies that the country menu opens, changes to Saudi Arabia, and renders the selected value. It also verifies that the Graduation Year control opens and initially renders **2015**. The completed validation run passed **9 tests**, `pnpm check`, and `pnpm build`.

## Browser-Level Interaction Validation

On the live development route, the Country control opened as an accessible listbox with **Jordan**, Saudi Arabia, United Arab Emirates, and Egypt. Selecting **Jordan** closed the menu and retained the requested value. The adjacent Graduation Year control displayed **2015**.

## Remaining Verification

Desktop browser verification and a full mobile capture were completed. The country control retains Jordan, the Graduation Year control retains 2015, and both fields remain legible and aligned within the approved dark-glass form layout.
