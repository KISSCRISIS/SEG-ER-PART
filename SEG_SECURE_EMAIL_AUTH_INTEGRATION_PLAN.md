# SEG — Secure Email Authentication Integration Plan

**Status:** Planning only — no implementation authorized  
**Prepared:** 14 August 2026  
**Scope:** Post-visual-freeze design review for secure email/password sign-in, verification, and recovery.

## STATUS

The approved **My Home** visual freeze remains unchanged. This report is a read-only implementation plan; it does **not** modify SEG code, OAuth, database schema, cookies, secrets, connectors, deployment, or production configuration.

> **Decision:** SEG should preserve the existing Manus OAuth session boundary and introduce email/password only through a deliberately selected identity architecture. An email-delivery service alone is not an authentication system.

## Current State and Evidence

The current application authenticates through a one-time OAuth-state nonce and a server callback. After a successful exchange, the backend upserts a user from the upstream identity, creates a signed application session, stores it in the existing HTTP-only session cookie, and redirects to `/dashboard`. The sole protected screen remains `/dashboard`; no independent local email-auth endpoints, password credentials, verification records, or recovery procedures are currently present.

| Current boundary | Evidence in the project | Planning consequence |
|---|---|---|
| OAuth is the only sign-in path | `client/src/const.ts`, `server/_core/oauth.ts` | Do not add a second callback or weaken the one-time OAuth-state validation. |
| Sessions use the existing signed cookie / bearer-preview fallback | `server/_core/sdk.ts`, `server/_core/cookies.ts`, `client/src/main.tsx` | Any future email flow must result in the same valid session contract, preserve HTTP-only and Secure cookie semantics, and not break preview fallback. |
| The user table is keyed by a non-null unique `openId` | `drizzle/schema.ts` | A new identity must map to one stable opaque subject; email must not become an uncontrolled replacement primary key. |
| Local password and recovery procedures do not exist | `server/routers.ts` | Registration, verification, sign-in, reset, and account-linking APIs require a separate approved build scope. |
| Email-capable services are visible but disabled | Read-only connector configuration review on 14 August 2026 | No provider is selected, configured, or authorized by this plan. |

## Recommended Target Architecture

The least disruptive future approach is a **managed identity provider** that owns password handling, verification, recovery, abuse controls, and optional MFA. SEG should receive only a verified, stable provider subject and use it to resolve an existing internal user. The application can then establish its current SEG session after that identity has been verified.

This choice avoids introducing raw password handling into an application whose current identity source is upstream OAuth. It also preserves the active Dashboard authorization boundary and the existing `users.role` model.

| Option | Compatibility with SEG | Security and delivery assessment | Recommendation |
|---|---|---|---|
| Extend the existing upstream identity solution with verified email/password, if its product capabilities and contract permit it | Highest; retains one identity authority and current session lifecycle | Minimizes account-linking and session-bridge complexity | **Preferred, subject to provider confirmation.** |
| Add a dedicated managed identity provider and bridge its verified subject to one SEG user | Moderate; requires an explicit identity-mapping layer and session issuance design | Provider owns password, verification, recovery, throttle, and optional MFA; SEG must protect the bridge and linking rules | **Acceptable fallback after architecture approval.** |
| Build first-party password storage and recovery in SEG | Lowest; requires new credential, token, rate-limit, audit, and migration components | High implementation and review burden; passwords must never be plaintext or reversibly encrypted [1] | **Not recommended unless a specific business or compliance requirement mandates it.** |

## Required Security Controls

Email ownership must be verified before an email identity can activate an account. Verification and reset credentials must be cryptographically random, single-use, time-limited, and invalidated after use [2]. Reset and sign-in responses must avoid account enumeration and should be rate limited; logs must not contain complete email addresses, authentication tokens, or verification URLs [2] [3].

If SEG is explicitly required to own passwords instead of delegating them, credentials must use a modern password-hashing implementation such as Argon2id with unique salts. The database must retain only the verifier/hash and algorithm metadata, never a plaintext password, reversible ciphertext, or reset token in plaintext [1]. This option needs a separate security design review before implementation.

| Control area | Mandatory plan requirement | Validation criterion |
|---|---|---|
| Identity keying | Store a stable opaque identity subject and provider name; keep the email as verified profile/contact data with a documented canonical comparison policy. | A user can sign in via the approved identity method without duplicate accounts or email-based identity collision. |
| Account linking | Define whether a verified email that matches an OAuth profile can link automatically, requires an authenticated confirmation, or stays separate. | Every linking path proves ownership and creates an auditable event; no silent account merge occurs. |
| Session continuity | Reuse the current signed session format, HTTP-only cookie, `Secure` public-host policy, and protected `/dashboard` boundary. | OAuth regression tests and new email-session tests pass without changing the current callback behavior. |
| Registration and verification | Return generic public responses, issue single-use bounded-lifetime tokens, and activate only after verified ownership. | Expired, reused, malformed, and cross-account tokens fail safely with no account activation. |
| Password reset | Use generic responses and rate limits; send a side-channel reset link/token but never the password. Do not create a full user session solely from a reset token [3]. | Existing and non-existing email requests are indistinguishable to the client; reset cannot be replayed. |
| Abuse protection | Apply per-IP and per-identity throttling, monitor failures, and offer MFA for sensitive account actions. | Automated bursts are constrained; alert/audit records are redacted and attributable. |
| Privacy and logging | Mask or pseudonymize email addresses in logs, and exclude all password, token, and reset-link data. | Log review confirms no secret or complete sensitive identifier is emitted. |

## Staged Implementation Plan

| Stage | Scope | Deliverables | Explicitly not done in this planning task |
|---|---|---|---|
| 0. Architecture decision | Choose one identity authority, transactional email provider, account-linking policy, password policy, and MFA posture. Confirm regulated-data and retention requirements. | Approved architecture decision record and threat model. | No provider activation, connector enablement, secret request, or user-data migration. |
| 1. Data model design | Design the identity mapping, verified-email metadata, verification/reset-token storage, rate-limit/audit data, and migration/rollback strategy. | Schema proposal and reviewed migration plan. | No schema edit or SQL execution. |
| 2. Provider and secret design | Define only the required provider configuration categories: identity-provider tenant/client credentials, trusted origins/redirects, transactional-email domain and sender, and any secret-vault pepper. | Secret inventory and domain-verification checklist. | No secret is requested or stored. |
| 3. Server implementation | Add validated registration, verification, sign-in, reset, resend, account-link, and session-bridge procedures; preserve existing OAuth callback, cookie helper, and role behavior. | Server contract, rate limiting, audit redaction, and unit tests. | No change is made under this report. |
| 4. Client implementation | Add approved email flows using the SEG visual system; distinguish loading, generic-success, expired-link, and support states without disclosing account existence. | Accessible forms and interaction tests. | No new route or visual work is started. |
| 5. Verification and rollout | Run negative security tests, OAuth regression, migration rehearsal, deliverability checks, production monitoring, and staged release. | Security acceptance record and rollback playbook. | No production rollout is initiated. |

## Required Configuration Categories

No secret value is needed for this review. At the point of a separately approved implementation, values must be collected through the project’s secure configuration process rather than committed or placed in source code.

| Configuration category | Purpose | Decision owner / prerequisite |
|---|---|---|
| Identity-provider credentials and issuer configuration | Establishes the selected provider’s verified identity flow. | Product and security approval of the identity authority. |
| Transactional-email service, verified domain, sender identity, and templates | Delivers verification, reset, and security-notification messages. | Domain ownership and deliverability approval. |
| Trusted frontend origins and fixed redirects | Prevents email links or callbacks from redirecting to untrusted destinations. | Production and preview domain inventory. |
| Credential-hash / provider security parameters | Required only if first-party passwords are explicitly chosen. | Security review and operational capacity assessment. |
| Rate-limit and monitoring configuration | Limits enumeration, credential-stuffing, reset abuse, and token guessing. | Security and operations approval. |

## Regression and Security Acceptance Matrix

| Test group | Minimum cases for a future implementation | Acceptance condition |
|---|---|---|
| Existing OAuth | Valid nonce succeeds, invalid/missing nonce fails closed, redirect remains `/dashboard`, public-host session cookie remains Secure and HTTP-only. | All existing OAuth and logout tests remain green. |
| Registration / verification | Valid verified email completes; duplicate, expired, replayed, malformed, and cross-user tokens fail; resend is rate limited. | No unverified identity receives access. |
| Sign-in | Valid credentials succeed; invalid email/password has generic response and comparable timing; automated bursts are throttled. | No enumeration signal or unauthorized session. |
| Recovery | Existing/non-existing email requests return the same generic result; reset links are bounded, one-time, and invalidate on use; password is never emailed. | Reset cannot be replayed or used to gain a broad session. |
| Account linking | OAuth-to-email and email-to-OAuth linking require the adopted proof policy; conflict cases are deterministic. | No duplicate or silently merged user account. |
| Session and authorization | New identity can access only the current protected `/dashboard` after authentication; logout clears the session; role checks remain intact. | No route, database authorization, or cookie-policy regression. |
| Privacy / observability | Application logs and error reporting are inspected for password, token, reset-link, and full-email leakage. | No prohibited sensitive data is present. |

## Risks Requiring Explicit Decisions

The current user identity is synchronized from the Manus OAuth service whenever the internal user record is missing. A second identity source cannot simply reuse that fallback without an identity-mapping rule, otherwise first-time local-email sign-in may incorrectly call the upstream OAuth lookup. Similarly, the client currently redirects every unauthenticated tRPC error to the OAuth launcher; a future email-auth form must be isolated from that global behavior so a wrong password renders a generic form error rather than launching OAuth.

The product decision that matters most is the relationship between existing OAuth accounts and future email/password accounts. SEG must select one of three explicit policies: authenticated linking with confirmation, invitation-only linking, or no linking with manual support review. Automatic linking based only on a matching email is not recommended in this plan because email comparison, verification state, and provider ownership can diverge [2].

## Implementation Authorization Gate

No implementation should begin until the following decisions are explicitly approved:

1. The identity authority: existing upstream provider capability, or a named managed identity provider.
2. The account-linking policy for people who already use OAuth.
3. Whether SEG permits passwords at all, versus verified email magic links or provider-hosted credentials.
4. The transactional-email service and verified sending domain.
5. The required MFA posture for account changes and other sensitive medical-profile actions.
6. Approval to request the necessary secrets, propose a schema migration, and write new server/client tests.

## Conclusion

**Planning status: complete.** The current SEG OAuth and session architecture can remain intact, but secure email/password access must be introduced as a distinct, approved identity layer rather than as an ad hoc form submission. The recommended next action is an architecture-decision review, not provider setup or code changes.

## References

[1]: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html "OWASP Password Storage Cheat Sheet"
[2]: https://cheatsheetseries.owasp.org/cheatsheets/Email_Validation_and_Verification_Cheat_Sheet.html "OWASP Email Validation and Verification in Identity Systems Cheat Sheet"
[3]: https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html "OWASP Forgot Password Cheat Sheet"
