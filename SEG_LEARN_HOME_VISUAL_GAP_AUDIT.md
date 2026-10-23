# SEG Learn Home — Visual Gap Audit

**Date:** 14 August 2026  
**Mode:** Read-only visual audit  
**Decision:** **NOT ACCEPTED / Remaining gaps identified**

## STATUS

The approved Learn Home visual blueprint is available in the production authority package at **1203 × 1308**. The current application has no independent `/learn` route. A direct capture of `/learn` at the matching reference viewport renders the generic light `404 / Page Not Found` surface instead of the SEG authenticated learning workspace. [1] [2]

## Evidence

| Evidence source | Finding | Audit relevance |
|---|---|---|
| Approved production reference | Defines a three-column desktop learning workspace: permanent dark rail, primary learning canvas, and secondary progress/continuation rail. | Primary visual contract. [1] |
| Current route map | Registers `/`, `/register`, `/login`, `/dashboard`, and `/404` only. Learn is not registered as a route. | Establishes the route-level screen absence. [2] |
| Current Dashboard implementation | Provides only an internal `#learn` **Upcoming Learning** card with three rows. | Establishes that the current internal section is not a visual equivalent of Learn Home. [3] |
| Current managed asset registry | Contains anchor SEG brand/core assets, but no registered Learn-specific category-card illustration set or approved profile portrait mapping for the reference. | Establishes the current asset mapping gap. [4] |
| Current viewport capture | `/learn` displays a generic white 404 card at 1203 × 1308. | Confirms the visual mismatch directly. |

## Current Status

The target screen is **not available as an independently renderable current screen**. The existing Dashboard's `#learn` anchor is intentionally an internal section under the frozen Dashboard architecture; it remains a compact Upcoming Learning panel rather than a substitute route or implementation of the approved Learn Home composition. This audit does not recommend creating a route or modifying that architecture without explicit approval.

## Matching Elements

The current project has reusable SEG identity foundations: the shared protected Dashboard rail, dark-glass token system, primary logo, official app icon, clean Brain/Heart Core, and a small learning-list pattern. These are **foundational reuse candidates only**. They do not establish visual alignment because the current `/learn` canvas does not render them. [3] [4]

## Visual Gaps

| Layer | Approved Learn Home reference | Current state | Gap assessment |
|---|---|---|---|
| Screen availability | Authenticated Learn workspace at the reference viewport. | `/learn` renders the generic 404 fallback. | **Blocking.** |
| Overall silhouette | Dark three-zone composition: fixed navigation rail, broad learning canvas, narrow secondary rail. | Light centered 404 card; Dashboard `#learn` is only a small card. | **Blocking.** |
| Header | **Learn** title, supporting learning subtitle, centered Emergency Action treatment, and compact utility icons. | No Learn header at `/learn`; Dashboard header belongs to My Home rather than Learn. | **Blocking.** |
| Hero | **Knowledge Intelligence Core** with a brain/heart medical-intelligence visual, evidence statement, and three metrics. | No Learn hero or learning metrics. | **Blocking.** |
| Module explorer | Category tabs, filter affordance, eight illustrated module cards, state labels, module counts, difficulty labels, and directional controls. | Three text-only rows within Upcoming Learning; no categories, filter, visual cards, counts, or difficulty metadata. | **Blocking.** |
| Learning pathways | Dedicated multi-option pathway band below the module grid. | No equivalent component. | **Blocking.** |
| Popular topics | Bottom horizontal topic rail with labeled medical topics. | No equivalent component. | **Blocking.** |
| Progress rail | Learning Overview ring, Study Streak, Continue Learning cards, and Recommended For You list. | My Home has a separate general progress card, but no Learn-specific right rail or continuation list. | **Blocking.** |
| Left-rail support panels | Physician profile, Quick Access list, and Dark Mode control. | The shared Dashboard rail has profile, Quick Access, and Dark Mode after the approved My Home correction, but it is not visible at `/learn`. | **Present as reusable shell pieces; absent from the target screen.** |
| Surfaces and typography | Dark navy canvas, cyan/blue holographic illumination, glass cards, white/cyan hierarchy, dense learning-card rhythm. | Generic white 404 page with blue call-to-action. | **Blocking visual-system mismatch.** |
| Spacing and density | High-information desktop grid with consistent compact gutters and layered vertical bands. | Centered sparse fallback composition. | **Blocking.** |

## Missing Approved Assets and Component Mapping

The production package makes the primary brand identity and medical core assets available, and the current registry exposes several of those assets through managed URLs. However, the Learn reference contains eight distinctive learning-module visuals—airway, cardiac, respiratory, neurological, fluid/electrolyte, ECG, trauma, and infectious-disease imagery—and a physician portrait treatment. No discrete, approved managed mappings for these reference-specific visuals are registered in the current `segAssets` registry. The reference image itself must **not** be embedded as a product screenshot or sliced into implementation cards. A future implementation requires a source-authorized, individually deliverable asset map before any UI work. [1] [4]

| Reference element | Current reuse status | Future prerequisite |
|---|---|---|
| Primary logo and app icon | Available in `segAssets`. | Reuse the approved managed URLs. |
| Brain/Heart learning hero | A related approved Brain/Heart Core is available. | Confirm its exact reference suitability before use; do not substitute without approval. |
| Eight illustrated module cards | No specific mappings registered. | Obtain/confirm clean approved exports and managed URLs. |
| Physician portrait | No Learn-specific portrait mapping registered. | Obtain/confirm an approved portrait asset or explicit approval for an existing approved profile image. |
| Utility and ordinary controls | Existing icon library may support non-distinct controls. | Use only for ordinary controls after asset review; do not replace distinctive SEG visuals. |

## Acceptance Criteria for a Future Approved Implementation

An implementation should be evaluated only after explicit authorization and a source-authorized asset map. At that stage, the current architecture must remain protected: `/dashboard` stays the sole protected route unless the user explicitly changes that constraint; authentication, database, and security boundaries remain unchanged. The approved Learn composition must then render with all primary zones, core learning surfaces, card hierarchy, asset fidelity, reference-scale desktop validation, responsive validation, navigation/interactions, TypeScript validation, tests, and production build success. [1] [2]

> **NOT ACCEPTED / Remaining gaps identified**

The current internal Learn fragment does not satisfy the approved Learn Home reference. The absence of a renderable Learn screen, reference composition, learning module system, right rail, visual assets, and dark SEG surface is sufficient to block any visual-freeze declaration for Learn Home. This is an audit-only decision and authorizes **no implementation**.

## Next Step

Wait for explicit implementation authorization. Before any code change, confirm whether the user authorizes a visual-layer implementation inside the frozen Dashboard-only architecture, and provide/approve clean individual exports for the reference-specific module visuals if the production package does not already contain them.

## References

[1]: file:///tmp/seg-phase1-source/production/SEG_FINAL_VISUAL_ASSETS_PACKAGE_v1.0_PRODUCTION/SEG_FINAL_VISUAL_ASSETS_PACKAGE_v1.0_PRODUCTION/04_SCREEN_REFERENCES/04_LEARN/SEG_Learn_Approved_Reference.png "Approved SEG Learn Home production reference"

[2]: ./client/src/App.tsx "Current application route map"

[3]: ./client/src/pages/DashboardPage.tsx "Existing internal Dashboard Learn fragment"

[4]: ./client/src/lib/seg-assets.ts "Current managed SEG asset registry"
