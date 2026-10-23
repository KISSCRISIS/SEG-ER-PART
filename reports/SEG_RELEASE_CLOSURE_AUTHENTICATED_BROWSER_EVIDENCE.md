# SEG Release Closure — Authenticated Browser Evidence

## Capture scope

This is a read-only record of the authenticated browser flow requested for Release Closure. The user completed the login step through browser takeover. No credentials, cookies, tokens, personal identifiers, or form values are stored here.

| Step | URL | Observation | Result |
|---|---|---|---|
| Login entry | `https://seg-guide-bjjkqn7t.manus.space/login` | Login form rendered with email/password controls and OAuth options. | `RENDERED` |
| Post-login landing | `https://seg-guide-bjjkqn7t.manus.space/dashboard` | Dashboard rendered after user takeover. An authenticated role label for Emergency Medicine Physician was visible; session identity details are not recorded. | `PASS` |
| References anchor | `https://seg-guide-bjjkqn7t.manus.space/dashboard#reference` | Dashboard content included the Atlas & Visual Assets and Medical Journal sections. | `RENDERED; ANCHOR POSITION NOT INDEPENDENTLY MEASURED` |
| Laboratory Guide | `https://seg-guide-bjjkqn7t.manus.space/laboratory` | The published runtime returned the application’s 404 Page Not Found surface, not the Laboratory Foundation. | `BLOCKED` |

## Evidence interpretation

The authenticated session was successfully established and the Dashboard plus References content rendered. The published Laboratory route is unavailable in the same session, which is consistent with the independent deployment probe showing `/laboratory` as a 200 HTML shell at the HTTP layer but the browser application resolving it to a 404 route. This demonstrates deployment/source drift: the current published bundle does not contain the intended Laboratory route even though the current local source does.

No attempt was made to bypass authentication, alter cookies, submit additional forms, or modify the deployment. The failure cannot be safely closed from the current session without publishing the intended build through the governed release process.

## Closure status

- Login and Dashboard: `PASS` for the observed session state.
- References/Atlas rendering: `PASS` as rendered content; exact scroll offset and all internal interactions remain unmeasured.
- Laboratory Guide in deployed runtime: `BLOCKED — published route resolves to 404`.
- Authenticated complete user flow: `BLOCKED — Laboratory step unavailable`.
- Deployment parity: `BLOCKED — published asset hashes and route behavior differ from local candidate`.

## Additional interaction evidence

The browser returned to `https://seg-guide-bjjkqn7t.manus.space/dashboard` after the failed Laboratory navigation. The authenticated Dashboard exposed buttons for My Home, My Pathway, Learn, Practice, Atlas & Visual Assets, Medical Journal, and My Account. Clicking **Atlas & Visual Assets** kept the URL on `/dashboard` and moved the viewport to a lower page position (`pixels above viewport: 765` in the browser capture); the extracted page content included the Atlas workspace and its governance notice. The interaction did not expose a Laboratory Guide link in the published Dashboard navigation, and no additional submission or sensitive action was performed.
