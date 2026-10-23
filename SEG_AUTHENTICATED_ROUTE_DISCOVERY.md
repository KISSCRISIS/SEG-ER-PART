# SEG — Authenticated Route Discovery

**Mode:** Discovery only. No routes were created, and no code, authentication, database, security, or application structure was modified.

## Existing route evidence

The application router registers exactly five explicit paths: `/`, `/register`, `/login`, `/dashboard`, and `/404`. Any unmatched location falls through to `NotFound`. [1]

| Route | Registered component | Authentication classification | Evidence |
|---|---|---|---|
| `/` | `Home` | Public | Listed in the root router and absent from the protected-route helper. [1] [2] |
| `/register` | `RegisterPage` | Public | Listed in the root router and absent from the protected-route helper. [1] [2] |
| `/login` | `LoginPage` | Public | Listed in the root router and absent from the protected-route helper. [1] [2] |
| `/dashboard` | `DashboardPage` | **Only currently recognized authenticated route** | `routeRequiresAuth()` returns `true` only for this path; its page is wrapped in `DashboardLayout`. [2] [3] [4] |
| `/learn` | None | Not registered | Unmatched route resolves to `NotFound`. [1] [5] |
| `/pathway` | None | Not registered | Unmatched route resolves to `NotFound`. [1] [5] |

> `/dashboard` is the only route currently designated as protected by the application’s route helper. The shared layout displays a loading state, an unauthenticated sign-in state, or the dashboard shell according to the existing `useAuth()` result; this discovery did not alter that boundary. [2] [3]

## Component locations and current navigation targets

| Screen intent | Existing component location | Current navigation target | Availability status |
|---|---|---|---|
| **My Home** | `client/src/pages/DashboardPage.tsx` inside `client/src/components/DashboardLayout.tsx` | `/dashboard` through `SEG_ROUTES.dashboard` | Available as the existing protected Dashboard screen. [2] [3] [4] |
| **Learn** | A limited **Upcoming Learning** card in `client/src/pages/DashboardPage.tsx` | `#learn` anchor in `DashboardLayout.tsx` | Not a standalone screen or route; the sidebar only scrolls to the embedded card. [3] [4] |
| **My Pathway** | A limited **Knowledge Mastery** card in `client/src/pages/DashboardPage.tsx` | `#pathway` anchor in `DashboardLayout.tsx` | Not a standalone screen or route; the sidebar only scrolls to the embedded card. [3] [4] |

The sidebar also handles `#practice` and `#journal` as in-page anchors. It does not map Learn or My Pathway to `setLocation()` paths. Only **My Home** uses `setLocation(SEG_ROUTES.dashboard)`; navigation items whose value begins with `#` call `scrollIntoView()` instead. [3]

## Screen availability status

| Approved screen | Current availability | Discovery conclusion |
|---|---|---|
| **SEG Authenticated Dashboard — My Home** | Existing `/dashboard` route using the protected `DashboardLayout` wrapper | Existing route and source-level screen are present. Direct authenticated-browser proof remains a separate pending evidence item. |
| **SEG Learn Home** | No dedicated route or page component; direct `/learn` falls through to `NotFound` | Not currently available as an independent screen. |
| **SEG My Pathway** | No dedicated route or page component; direct `/pathway` falls through to `NotFound` | Not currently available as an independent screen. |

The fallback `NotFound` component is a generic light 404 surface and returns users to `/`; it is not an SEG authenticated screen. [5]

## Scope boundary and next state

This discovery confirms the current structure only. It does **not** authorize or perform route creation, navigation rewiring, implementation of Learn Home/My Pathway, or any authentication change. The next action remains explicit approval.

## References

[1]: /home/ubuntu/seg-phase1/client/src/App.tsx "Current Wouter route registrations"
[2]: /home/ubuntu/seg-phase1/client/src/lib/seg-navigation.ts "Canonical SEG route constants and authentication helper"
[3]: /home/ubuntu/seg-phase1/client/src/components/DashboardLayout.tsx "Protected dashboard shell and sidebar anchor navigation"
[4]: /home/ubuntu/seg-phase1/client/src/pages/DashboardPage.tsx "Embedded My Home, Learn, and Pathway content"
[5]: /home/ubuntu/seg-phase1/client/src/pages/NotFound.tsx "Generic unmatched-route fallback"
