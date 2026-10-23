# SEG My Pathway — Visual Gap Audit

**Date:** 14 August 2026  
**Mode:** Read-only visual audit  
**Decision:** **NOT ACCEPTED / Remaining gaps identified**

## Current State

The approved My Pathway reference is available at **1197 × 1314** and defines a dedicated, information-dense learning-pathway view within the authenticated SEG visual system. [1] The current application preserves My Pathway only as an internal Dashboard anchor, `#pathway`, which renders a compact **Knowledge Mastery** radar card in the left Dashboard column. It does not render the approved pathway workspace. [2] [3]

The isolated managed-preview screenshot at the reference dimensions currently stops at **“Preparing your secure workspace…”** because that browser has no authenticated SEG session. This is an evidence-environment limitation, not a claim that the protected My Pathway section has failed. Code inspection is therefore the current evidence for the internal section; the historical authenticated Dashboard evidence establishes that Dashboard itself is reachable after sign-in. [2]

## Matching Elements

| Area | Reference expectation | Current matching evidence | Assessment |
|---|---|---|---|
| Architectural placement | My Pathway is visually part of the authenticated application. | **My Pathway** remains an internal `#pathway` target in the existing protected Dashboard; no new route exists. | **Matched boundary.** [2] |
| Shared SEG shell | Dark left rail, utility header, compact navigation, cyan accents, dark-glass surfaces. | `DashboardLayout` provides a matching dark rail, primary navigation, profile card, Dark Mode visual control, and header utility controls. | **Partial structural match.** [2] |
| Brain/heart medical-tech motif | The Journey hero uses a brain-over-heart holographic composition. | `GrowthCore` already uses the approved clean Brain/Heart Core asset with holographic treatment elsewhere in Dashboard. | **Reusable foundation only; not positioned as the Pathway hero.** [3] [4] |
| Progress language | The reference shows overall pathway progress and learning categories. | The current Dashboard has a **My Progress Overview** card and a compact Knowledge Mastery visualization. | **Partial conceptual match; not visual parity.** [3] |
| Visual identity | Dark navy canvas, cyan/blue highlights, red Emergency Action priority, glass cards. | Existing Dashboard components use the same SEG dark-glass and alert hierarchy. | **Partial design-system match.** [2] [3] |

## Visual Gaps

| Layer | Approved My Pathway reference | Current implementation | Gap assessment |
|---|---|---|---|
| Screen composition | Three-zone pathway workspace: persistent rail, broad timeline canvas, and right-hand analytics rail. | Standard My Home Dashboard grid with one compact `#pathway` card. | **Blocking.** |
| Contextual title | **My Learning Pathway** and the subtitle “Track your progress. Master emergency medicine.” | No My Pathway page/section title or pathway subtitle. Header still reads **My Home**. | **Blocking.** |
| Hero | **Your Journey to Excellence** hero with descriptive copy, 24/6/128 statistics, and large brain/heart visual. | No Pathway hero. The current GrowthCore is a different My Home component and contains course nodes rather than pathway statistics. | **Blocking.** |
| Learning timeline | Sequential pathway timeline with six stage cards, completion/progress/locked states, status labels, percentages, and Review/Continue/Locked controls. | No timeline, stage cards, lock treatment, filter, percentages by module, or pathway-level controls. | **Blocking.** |
| Filter and all-modules action | **Filter: All Modules** and **View All Modules** are visible within the pathway canvas. | No equivalent element. | **Blocking.** |
| Right analytics rail | Pathway Level, Pathway Progress breakdown, Next Milestone, Recent Achievements, and Study Streak. | No right rail; general Dashboard cards use different hierarchy and content. | **Blocking.** |
| Pathway Overview | Bottom summary band for total modules, completed, in-progress, locked, total hours, and certificates. | No equivalent summary band. | **Blocking.** |
| Rail support panels | Profile portrait, Quick Access shortcut list, Dark Mode, and footer. | Profile text and Dark Mode are present, but there is no portrait image, Quick Access list, or reference-aligned footer composition. | **Partial to blocking**, depending on implementation scope. |
| Typography and spacing | High-density card rhythm, narrow vertical timeline, and clear right-rail segmentation at the reference viewport. | Current Dashboard uses a broader bento grid optimized for My Home. | **Blocking layout mismatch.** |
| Controls and iconography | Reference-specific milestone badges, lock/status indicators, timeline nodes, and contextual pathway controls. | General Lucide icons and a radar illustration only; no pathway state system. | **Blocking component mismatch.** |

## Missing Assets

The current asset registry includes approved primary branding, a clean Dashboard Brain/Heart Core, a general Brain/Heart Intelligence Core, anatomy hologram, medical AI, and emergency visual assets. It does not register a clean profile portrait or a discrete set of Pathway-specific milestone, achievement, timeline, and module images from the reference. [4]

| Reference asset or treatment | Registry status | Required decision before implementation |
|---|---|---|
| Brain-over-heart Journey hero | Related approved Brain/Heart assets are available. | Confirm the exact suitable production asset for the My Pathway hero; do not repurpose a Dashboard asset without visual-authority confirmation. |
| Physician portrait | No Pathway-specific portrait asset is registered. | Supply/confirm an approved portrait, or explicitly authorize a profile-text-only deviation. |
| Milestone and achievement graphics | No discrete production mappings are registered. | Confirm clean approved exports or authorize ordinary status-control icons where the reference does not require distinctive art. |
| Timeline, completion, progress, and lock markers | No separate visual asset required is evidenced; these appear to be UI-state treatments. | Recreate with SEG design tokens and ordinary controls only after implementation authorization. |
| Brand logo, app icon, and ordinary utility icons | Approved logo/app icon are available; ordinary controls exist in the shared shell. | Reuse existing managed URLs and shell controls. |

## Required Corrections Before Acceptance

The following corrections are planning requirements only. They authorize no code change.

| Priority | Required future correction inside Dashboard | Boundary that must remain unchanged |
|---|---|---|
| 1 | Expand `#pathway` into a source-backed My Pathway workspace inside the existing Dashboard content tree. | `/dashboard` remains the only protected route; no `/pathway` route. |
| 2 | Build the reference title, Journey hero, module timeline, filter and all-modules control using approved assets and SEG tokens. | No generated or placeholder medical/identity assets; no medical-content assumptions. |
| 3 | Add the right analytics rail and bottom overview band as visual-only panels, with any reference values explicitly treated as static presentation data unless separately integrated. | No tRPC, database, or business-logic changes. |
| 4 | Align rail profile/Quick Access/portrait only after relevant source assets are confirmed. | Preserve current `useAuth`, OAuth, session, logout, and navigation behavior. |
| 5 | Validate at 1197 × 1314 and a narrow viewport, then run interaction checks, Vitest, type check, and production build. | No final-freeze claim without authenticated visual evidence. |

## Acceptance Criteria

Future implementation can be accepted only if it reproduces the approved My Pathway hierarchy inside the existing Dashboard architecture, uses source-authorized assets, preserves all application boundaries, supports the internal navigation anchor, renders responsively, and passes visual comparison at the reference viewport. The generic preview’s unauthenticated state cannot serve as final visual evidence; an authenticated capture will be required after implementation. [1] [2]

> **NOT ACCEPTED / Remaining gaps identified**

The current `#pathway` card supplies an internal navigation target and some conceptual mastery context, but it is not an implementation of the approved My Pathway screen. The missing pathway hero, learning timeline, module states, analytics rail, overview band, profile/Quick Access alignment, and reference-specific asset confirmations block visual acceptance. This report is read-only and does not authorize implementation.

## References

[1]: file:///tmp/seg-phase1-source/production/SEG_FINAL_VISUAL_ASSETS_PACKAGE_v1.0_PRODUCTION/SEG_FINAL_VISUAL_ASSETS_PACKAGE_v1.0_PRODUCTION/04_SCREEN_REFERENCES/03_MY_PATHWAY/SEG_MyPathway_Approved_Reference.png "Approved SEG My Pathway production reference"

[2]: ./client/src/components/DashboardLayout.tsx "Current protected Dashboard shell and internal My Pathway navigation"

[3]: ./client/src/pages/DashboardPage.tsx "Current Dashboard My Pathway anchor and surrounding components"

[4]: ./client/src/lib/seg-assets.ts "Current managed SEG asset registry"
