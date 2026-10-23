---
name: supabase-auth-pkce-flow
description: Supabase OAuth and authentication with PKCE, including verifier/challenge handling, state validation, callback code exchange, secure session persistence, and failure handling. Use when implementing or auditing Supabase Auth OAuth, Magic Link, sign-up, or password-recovery flows that require PKCE; do not use to modify Manus OAuth or another protected authentication system.
---

# Supabase Auth PKCE Flow

Use this skill for **Supabase Auth** integrations that use the Authorization Code flow with PKCE. Keep the implementation scoped to Supabase and the explicitly authorized application. Treat authentication, cookies, redirects, and tokens as security-sensitive.

## Non-negotiable boundaries

1. **Identify the auth authority first.** Inspect the existing project before editing. If the project uses Manus OAuth, a custom OAuth gateway, or an auth system not explicitly identified as Supabase Auth, stop and report that this skill is not applicable. In SEG, never replace, wrap, or alter Manus OAuth through this skill.
2. Do not change routes, database schema, roles, provider configuration, redirect allowlists, or security boundaries without explicit authorization.
3. Never expose access tokens, refresh tokens, code verifiers, client secrets, service-role keys, or cookie values in logs, URLs other than the provider callback URL, screenshots, commits, or error messages.
4. Use only the Supabase publishable/anonymous client key in browser code. Keep service-role and provider client secrets server-side.
5. Treat this as an authentication implementation, not as medical-content work. Do not import, modify, approve, or activate medical content.

## Decision workflow

### 1. Classify the application

Determine whether the application is:

- **Browser-only:** use `@supabase/supabase-js` with `flowType: 'pkce'` and the documented storage behavior.
- **SSR/server-side:** use the current Supabase SSR integration and a request-scoped server client with cookie adapters.
- **Custom backend callback:** exchange the code on the server only when the project explicitly requires it and the cookie/session contract is documented.

Do not mix browser and server session ownership implicitly. Record which side owns the callback, token refresh, and session persistence.

### 2. Validate configuration before coding

Confirm, without printing secrets:

- Supabase project URL is present and uses HTTPS outside local development.
- The provider is enabled in Supabase Auth.
- The callback URL is allowlisted exactly, including scheme, host, path, and relevant port.
- The application has a defined post-login destination.
- The package version and framework match the chosen integration pattern.
- The project is not actually using Manus OAuth or another protected auth boundary.

If the redirect allowlist, provider setup, or auth authority is unknown, stop before implementation.

## PKCE flow

Supabase's SDK handles most PKCE mechanics when configured with `flowType: 'pkce'`. The conceptual flow is:

1. Generate a high-entropy `code_verifier` and retain it in the same browser/device context as the authorization start.
2. Compute `code_challenge = BASE64URL(SHA-256(code_verifier))` without padding.
3. Generate a cryptographically random `state`; bind it to the initiation attempt and validate it on callback.
4. Start OAuth with a registered `redirectTo` URL.
5. Receive a one-time `code` at `/auth/callback`.
6. Validate callback parameters and state before exchanging the code.
7. Call `exchangeCodeForSession(code)` through the appropriate Supabase client.
8. Persist and refresh the session using the selected browser or server storage contract.
9. Remove the authorization code from the visible URL and redirect to a clean, authorized destination.

The Supabase authorization code is short-lived and single-use. Do not retry a failed exchange with the same code; restart the authorization flow after diagnosing the failure.

## Client initialization example

Use the project's existing environment-variable conventions. Do not hard-code values or add secrets to source control.

```ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: true,
      persistSession: true,
      autoRefreshToken: true,
    },
  },
)
```

Use `detectSessionInUrl` only when the selected client owns callback detection. If the server callback performs the exchange, avoid having a second client exchange the same code.

## Starting OAuth

Use the SDK rather than hand-building provider authorization URLs unless a custom provider integration is explicitly required.

```ts
const redirectTo = `${window.location.origin}/auth/callback`

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github', // replace only with an explicitly configured provider
  options: { redirectTo },
})

if (error) {
  // Show a generic user-safe message; log only a correlation ID and safe error class.
  throw new Error('OAuth initiation failed')
}

if (!data?.url) {
  throw new Error('OAuth provider did not return an authorization URL')
}

window.location.assign(data.url)
```

Do not accept an arbitrary `redirectTo` from a query parameter. Use an allowlisted destination selected by the application.

## Callback and code exchange

For a browser-owned callback:

```ts
const params = new URLSearchParams(window.location.search)
const code = params.get('code')
const errorCode = params.get('error')

if (errorCode) {
  // Convert provider errors to a safe, non-sensitive UI message.
  throw new Error('OAuth provider returned an error')
}

if (!code) {
  throw new Error('OAuth callback did not contain an authorization code')
}

const { error } = await supabase.auth.exchangeCodeForSession(code)

if (error) {
  // Do not retry the same code. Restart the flow after recording a safe diagnostic.
  throw new Error('OAuth callback exchange failed')
}

window.history.replaceState({}, document.title, '/auth/callback')
window.location.replace('/dashboard')
```

For an SSR or server-owned callback, create the Supabase server client **inside the request handler**, use the framework's supported cookie adapter, exchange the code once, apply the returned cookie updates to the response, and redirect with `Cache-Control: private, no-store` when the route can set or refresh authenticated cookies. Never store a user-specific Supabase client or session in module-level state.

## State, verifier, and overlapping flows

The SDK normally stores the verifier according to its configured storage. The callback must execute in the same browser/device context that initiated the flow. A missing verifier commonly means a different browser, cleared storage, expired storage, or a second flow overwrote the first verifier.

If the application intentionally supports concurrent PKCE attempts in the same browser, use the current Supabase experimental flow-ID option only after checking the installed SDK version and official documentation. Pass the matching flow ID to the exchange. Do not invent a custom verifier key format that conflicts with the SDK.

If the application maintains its own `state`, store only the minimum opaque correlation data, bind it to the initiation attempt, expire it quickly, and compare using a constant-time strategy where applicable. Do not place access tokens or PII in `state`.

## Cookie and session storage rules

Choose storage based on the rendering model:

- For browser-only applications, use the SDK's documented persistent storage behavior and its auth-state listener. Do not claim that every browser session must use an HttpOnly cookie; browser-side token refresh may require client-readable storage depending on the integration.
- For SSR, use the current `@supabase/ssr` cookie integration or the framework's supported adapter. Cookies should use HTTPS in production and a carefully selected `SameSite` policy, commonly `Lax` when compatible with the login flow.
- If a custom server-managed session explicitly requires `HttpOnly`, verify that the browser client does not need direct refresh-token access and document the server refresh contract. `HttpOnly`, `Secure`, and `SameSite` are not a substitute for correct session rotation, cache control, CSRF protection, or logout validation.
- Do not cache personalized responses that contain `Set-Cookie`. Avoid ISR or CDN caching on routes that refresh or set authentication cookies unless the cache policy is proven safe.

## Error handling matrix

| Failure | Safe diagnosis | Required response |
|---|---|---|
| Missing `code` | Callback was opened directly or provider returned an incomplete redirect | Show a generic callback error and offer a fresh sign-in |
| Provider error | `error`/`error_description` present | Sanitize the message; never echo arbitrary provider text into HTML |
| State mismatch | Callback does not match the initiation attempt | Reject the callback and restart authentication |
| Missing verifier | Different device, cleared storage, expired flow, or overwritten concurrent flow | Reject reuse; restart the flow |
| Invalid/reused/expired code | Code is single-use or no longer valid | Do not retry; start a new authorization flow |
| Redirect mismatch | Callback URL is not allowlisted or differs in exact form | Fix configuration, not by accepting arbitrary redirects |
| Cookie/session refresh failure | Cookie adapter, cache, or stale refresh token issue | Reconcile the supported SSR integration and invalidate safely |
| Network/provider outage | Auth server or provider unavailable | Provide retry guidance without exposing internals |

## Verification checklist

Before declaring the integration complete:

- Test successful sign-in for every explicitly configured provider.
- Test denial, cancellation, missing code, state mismatch, verifier loss, reused code, expired code, and redirect mismatch.
- Confirm callback code and tokens never appear in logs, analytics, screenshots, or final URLs.
- Confirm session refresh, logout, and server-side user validation.
- Confirm cookie flags and `Cache-Control` behavior in the deployed environment.
- Confirm no open redirect, provider-secret exposure, client-side service-role key, or cross-user session leakage.
- Run typecheck, build, route checks, and browser checks appropriate to the existing project.
- For SEG, verify Manus OAuth, protected routes, database schema, and Visual Freeze remain unchanged. If any would change, stop and request a separate authorization.

## Official references

- Supabase PKCE flow: https://supabase.com/docs/guides/auth/sessions/pkce-flow
- Supabase server-side advanced guide: https://supabase.com/docs/guides/auth/server-side/advanced-guide
- Supabase JavaScript `exchangeCodeForSession`: https://supabase.com/docs/reference/javascript/auth-exchangecodeforsession
- OAuth 2.0 PKCE overview: https://oauth.net/2/pkce/
