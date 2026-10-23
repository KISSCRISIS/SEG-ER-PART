# SEG Practice — Visual Gap Audit

**Date:** 14 August 2026  
**Mode:** Read-only visual audit  
**Decision:** **NOT ACCEPTED / Remaining gaps identified**

## 1. Current State

The approved Practice reference is available at **1215 × 1295** and defines an information-dense clinical-practice workspace within the SEG authenticated visual language. [1] In the current application, Practice remains an internal Dashboard target, `#practice`, as required by the frozen Dashboard architecture. It currently renders only a compact **Quick Actions** card containing six icon buttons, rather than the reference Practice workspace. [2] [3]

The managed preview capture at the reference-like desktop viewport stops at **“Preparing your secure workspace…”** because the isolated browser does not have an authenticated SEG session. This is a visual-evidence limitation, not a reported application failure. Code inspection establishes the current `#practice` content; prior user-supplied evidence establishes authenticated Dashboard availability. [2]

## 2. Matching Elements

| Area | Reference expectation | Current matching evidence | Assessment |
|---|---|---|---|
| Architectural placement | Practice sits in the authenticated SEG workspace. | Practice is an internal `#practice` target inside the single protected `/dashboard` architecture. | **Matched boundary.** [2] [3] |
| Shared shell | Dark navigation rail, compact top utility controls, red Emergency Action treatment, and dark-glass cards. | `DashboardLayout` already provides the dark rail, existing Practice navigation item, utility header, profile presentation, and visual-only Dark Mode control; Dashboard has an Emergency Action treatment. | **Partial structural match.** [2] [3] |
| Dark medical-tech system | Deep navy canvas, cyan/blue illumination, white/cyan type hierarchy, glass-card borders. | Existing `seg-reference-card`, `seg-dashboard-card`, cyan icons, and dark SEG tokens are used in Dashboard. | **Partial design-system match.** [2] |
| Practice intent | The reference emphasizes simulation and skill practice. | The current Quick Actions panel offers a limited set of practice-adjacent actions, and Dashboard contains a separate Practice Performance summary. | **Conceptual match only.** [2] |
| Performance language | Reference uses practice score and skills progress. | Existing Dashboard has a compact Practice Performance card with questions, average score, and top score. | **Partial content match; different visual hierarchy.** [2] |

## 3. Visual Gaps

| Layer | Approved Practice reference | Current implementation | Gap assessment |
|---|---|---|---|
| Overall layout structure | Three-column clinical workspace: persistent rail, wide practice canvas, and stacked right analytics rail. | Standard My Home Dashboard bento grid; `#practice` is only a 7-column Quick Actions card. | **Blocking.** |
| Title and header | **Practice** title with “Sharpen your skills. Be ready to save lives.” and centered Emergency Action. | No Practice-specific heading or subtitle; shared Dashboard heading remains My Home. | **Blocking.** |
| Hero area | **Clinical Practice Environment** hero with brain/heart medical visual, descriptive copy, and four headline metrics. | No Practice hero, no central clinical visual, and no reference metrics (48+, 12, 356, 92%). | **Blocking.** |
| Practice Performance | Right-rail donut score, Excellent/Good/Needs Work legend, and period selector. | Compact inline three-stat card; no donut, segmented legend, or reference rail placement. | **Blocking.** |
| Skills Overview | Five specialty progress rows with colored accents and **View All**. | No Practice-specific skills-overview panel. General Weak Areas card has unrelated categories. | **Blocking.** |
| Practice Mode cards | Five large visual cards: Skill Trainer, Case Scenarios, Simulation Lab, Assessment, and Quick Practice. | Six small generic icon buttons inside Quick Actions; no clinical imagery, descriptions, or Start controls. | **Blocking.** |
| Recent Practice Activity | Structured activity table with visual thumbnail, type, score, time, and status badges. | General Recent Activity card has a small icon list and no practice-specific columns or status system. | **Blocking.** |
| Quick Practice and recommendations | Dedicated right-rail lists with clinical thumbnails, duration, chevrons, scenario level, and New/Popular badges. | Dashboard has a generic Recommended For You panel with percentages, not Practice lists. | **Blocking.** |
| Skills Labs | Five large photo-based skill cards plus More Skills; circular competency values and levels. | No equivalent visual component. | **Blocking.** |
| Typography and spacing | Dense, aligned clinical dashboard rhythm: compact 12–14px labels, clearly segmented rails, uniform visual cards. | Broader My Home bento spacing and small generic Quick Actions labels. | **Blocking visual hierarchy and spacing mismatch.** |
| Navigation consistency | Practice is highlighted in the rail; reference also shows profile, Quick Access, and Dark Mode. | Practice navigation and Dark Mode exist, but the current rail lacks the reference portrait treatment and Quick Access list. | **Partial.** |
| Drug Reference item in source image | The visual reference depicts a Drug Reference quick-access label. | The approved project governance explicitly excludes Drug Reference from frozen implementation. | **Conflict: do not reproduce; requires an approved safe substitution or omission.** |

## 4. Missing Approved Assets

The registry contains reusable SEG foundation assets—primary logo, official app icon, multiple approved brain/heart assets, emergency-response visual, anatomy hologram, and medical-AI visual. It does **not** currently map clean individual exports for the Practice hero as composed in the reference, five Practice Mode visual cards, activity thumbnails, recommended-scenario thumbnails, clinical Skills Labs photography, or a confirmed Practice profile portrait. [4]

| Reference asset or treatment | Current registry status | Required decision before implementation |
|---|---|---|
| Clinical Practice Environment brain/heart hero | Related approved Brain/Heart assets exist. | Confirm the exact approved asset that matches the Practice reference; do not automatically reuse the Dashboard Core. |
| Five Practice Mode visual cards | No individual clean mappings registered. | Provide/confirm source-approved exports; do not create placeholders or generate alternatives. |
| Recent Activity and Quick Practice thumbnails | No specific mappings registered. | Provide/confirm clean approved thumbnail exports. |
| Skills Labs procedure photography | No individual photographic exports registered. | Provide/confirm approved clinical imagery and usage scope. |
| Profile portrait | A landing thumbnail exists, but no Practice-specific approval is recorded. | Confirm reuse or supply an approved portrait. |
| Achievement/status/control icons | Ordinary UI controls may be represented by the current icon system only where they are not a distinctive SEG asset. | Confirm each distinctive visual treatment before use. |
| Drug Reference quick link | Project governance prohibits Drug Reference implementation. | Explicitly approve a safe replacement or omit; no drug content or prescribing feature may be inferred. |

## 5. Required Corrections Before Acceptance

These are future visual requirements only and authorize no implementation.

| Priority | Required correction inside the existing Dashboard | Preservation boundary |
|---|---|---|
| 1 | Expand the existing `#practice` section into the reference-aligned Practice workspace within Dashboard. | `/dashboard` remains the sole protected route; no `/practice` route. |
| 2 | Add the Practice title, subtitle, clinical hero, metric blocks, right analytics rail, and Skills Overview using source-authorized assets only. | No OAuth, session, database, backend, or business-logic change. |
| 3 | Replace the small generic Quick Actions treatment with reference-backed Practice Mode, Recent Practice Activity, Quick Practice, recommendations, and Skills Labs components. | No placeholder assets, generated replacements, or content assumptions. |
| 4 | Preserve the shared rail and Dark Mode control, while adding reference Quick Access/profile treatments only after relevant asset and governance decisions. | Do not recreate the prohibited Drug Reference entry. |
| 5 | Validate at 1215 × 1295 and narrow breakpoints inside an authenticated Dashboard session, then run keyboard checks, Vitest, type check, and production build. | No freeze decision without authenticated visual evidence. |

## 6. Implementation Risks

| Risk | Impact | Required control |
|---|---|---|
| Building a separate `/practice` route | Violates the frozen Dashboard-only architecture. | Retain `#practice` as the only target and reject route changes. |
| Replacing absent medical visuals with generic or generated assets | Violates strict visual authority and user restrictions. | Suspend visual-card implementation until clean approved exports exist. |
| Treating reference metrics as live performance data | Creates an unsupported product/data claim. | Keep any future reference values as explicitly static visual content unless a separately approved data model exists. |
| Reintroducing Drug Reference | Violates the project’s non-final Drug Reference exclusion. | Omit it or use a separately approved safe identity-card replacement. |
| Overloading `DashboardPage.tsx` | Risks regressions in My Home and internal sections. | Consider an internal `PracticeSection` component only after implementation approval; it must not register a route. |
| Clinical imagery use without source approval | Risks incorrect asset reuse and medical-context mismatch. | Require asset-by-asset source confirmation before coding. |
| Narrow-screen rail density | Can cause unreadable controls or horizontal overflow. | Define responsive stacking and keyboard focus order before implementation. |

## Acceptance Criteria

Future implementation can be accepted only when the full Practice hierarchy renders inside `#practice`, matches the reference composition and glass system, uses only source-authorized assets, preserves the existing Dashboard and authentication boundaries, excludes Drug Reference unless separately approved, and passes authenticated desktop comparison at **1215 × 1295**, responsive review, interaction validation, Vitest, TypeScript, and production build checks. [1] [2]

> **NOT ACCEPTED / Remaining gaps identified**

The current `#practice` section preserves the architecture and some dashboard visual foundations, but it is not an implementation of the approved Practice screen. The absent clinical hero, analytics rail, Practice Mode visuals, activity table, practice/recommendation lists, Skills Labs gallery, reference spacing system, and source-authorized media prevent visual acceptance. This audit changes no code and grants no implementation authority.

## References

[1]: file:///tmp/seg-phase1-source/production/SEG_FINAL_VISUAL_ASSETS_PACKAGE_v1.0_PRODUCTION/SEG_FINAL_VISUAL_ASSETS_PACKAGE_v1.0_PRODUCTION/04_SCREEN_REFERENCES/05_PRACTICE/SEG_Practice_Visual_Reference.png "Approved SEG Practice production reference"

[2]: ./client/src/pages/DashboardPage.tsx "Current internal Practice section and related Dashboard cards"

[3]: ./client/src/components/DashboardLayout.tsx "Current protected Dashboard shell and Practice navigation"

[4]: ./client/src/lib/seg-assets.ts "Current managed SEG asset registry"
