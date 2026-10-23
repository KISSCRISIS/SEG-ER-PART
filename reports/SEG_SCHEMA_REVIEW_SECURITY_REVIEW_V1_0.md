# SEG SCHEMA REVIEW — SECURITY REVIEW v1.0

**Review mode:** `READ_ONLY / SECURITY DESIGN REVIEW`  
**Status:** `SECURITY_REVIEW_REQUIRED / IMPLEMENTATION_BLOCKED`

## Security boundary

The inspected Supabase evidence provides useful identity, profile, admin, RLS, storage, and audit patterns. It does not prove that Supabase is the current application runtime, and it does not provide content-level authorization, pathway scope, rights/display enforcement, or governed content audit tables. The current app-side code uses MySQL/Drizzle for user persistence. [1] [2] [3]

## Auth and identity mapping

| Boundary | Evidence | Security interpretation |
|---|---|---|
| Supabase identity | `public.profiles.id → auth.users.id` with cascade | Valid declarative Supabase identity pattern, live parity unverified |
| Current application identity | MySQL `users.id` plus unique Manus OAuth `openId` | Separate runtime identity model; no automatic FK to Supabase `auth.users` |
| Content actor identity | v1.1 uses string actor/reviewer values | Requires an explicit identity mapping decision before physical FK design |
| Admin boundary | `role='Admin'`, `admin_level`, capabilities/regions/languages, security-definer helpers | Reusable pattern, not sufficient for content assignment or clinical authority |
| Credential reviewer boundary | Owner/admin workflow and reviewer-not-self behavior | Reusable workflow precedent, not content-review authorization |

**Blocker:** No implementation may assume that a Manus OAuth `openId`, MySQL numeric user ID, Supabase `auth.users.id`, and v1.1 actor string are interchangeable.

## Proposed future role sources

| Future actor class | Proposed authority source | Allowed conceptual scope | Must not do |
|---|---|---|---|
| Learner | Authenticated user plus active profile/pathway | Read active content allowed for the learner’s pathway and display scope | Read pending/restricted content or write governance decisions |
| Content/structural reviewer | Explicit review assignment and reviewer role | Structural/metadata review for assigned records | Approve medical content or rights by implication |
| Medical reviewer/owner | Explicit SEG medical governance assignment | Medical decision for assigned content | Clear copyright/display rights or change auth scope |
| Rights reviewer | Explicit rights assignment | Rights/display decision for assigned source/artifact/asset | Approve clinical correctness |
| Technical/governance admin | Existing admin boundary plus explicit capability | Operate approved workflow and audit controls | Self-authorize clinical or rights approval |
| Owner admin | Existing owner-admin model where applicable | Manage administrative scope and approved release controls | Bypass source, clinical, rights, or audit gates |
| Service role | Server-side controlled boundary, if separately authorized | Limited maintenance/reconciliation under audit | Become a public learner path or silently bypass review |

## Required content read predicate

A future learner-facing read must be conjunctive, not role-only:

```text
authenticated user
AND active account
AND permitted pathway scope
AND record publication = active
AND metadata = complete
AND structural QA = passed
AND medical review = approved
AND rights/display = cleared
AND Atlas relation/asset gates pass when an asset is requested
```

A failed or unresolved predicate must result in no learner visibility. This is a future security test requirement, not an implemented policy.

## Required write predicates

| Operation | Minimum future guard | Separate approval required |
|---|---|---|
| Create source/artifact evidence | Authorized ingestion/service boundary; immutable checksum and locator capture | Source-governance review |
| Create content shell | Authorized staging workflow; no learner visibility | Metadata/structural review |
| Edit payload | Assigned reviewer or controlled adapter; versioned change | Medical review if clinical meaning changes |
| Set medical decision | Assigned authorized medical reviewer; reviewer identity recorded | Medical governance decision |
| Set rights/display decision | Assigned rights reviewer; evidence locator required | Rights governance decision |
| Attach Atlas asset | Authorized relation workflow; relation role/scope recorded | Asset rights/visual review where applicable |
| Activate/publish | Separate implementation authorization; all gates satisfied | Release/rollback/QA review |
| Delete | Default deny for governed history; use withdraw/supersede/revoke | Owner/governance decision |

## Security design blockers

| Blocker | Why it matters | Required closure |
|---|---|---|
| Runtime/provider mismatch | MySQL/Drizzle app code and Supabase evidence are separate | Decide target persistence and integration boundary before physical FKs/RLS |
| Actor identity mismatch | v1.1 actor/reviewer strings do not prove FK targets | Define canonical actor mapping and migration policy |
| Content-level pathway scope absent | Profile `primary_learning_track` is not record-level scope | Define record scope and learner resolution semantics |
| Medical versus rights role separation | Existing admin patterns do not prove separate authority | Assign explicit review roles and conflict rules |
| RLS assignment model absent | Current policies are owner/admin oriented, not content assignment oriented | Define reviewer assignment, owner, region/language scope, and negative tests |
| Service-role boundary absent | A service role can bypass ordinary RLS if misused | Define server-only usage, allowed operations, audit, and secret handling |
| Atlas relation absent | Current asset review is not content display authorization | Implement only after Gate 3 and separate asset/content gates are reviewed |
| Audit immutability not proven for future content | Existing audit patterns are domain-specific | Define append-only content audit events and mutation restrictions |
| Live parity unverified | Declarative SQL may not match a running project | Obtain authorized evidence of target schema before implementation |

## Required security test matrix before SQL authorization

| Test | Expected result |
|---|---|
| Learner reads pending medical review | Denied/not visible |
| Learner reads restricted rights scope | Denied/not visible |
| Internship user reads Resident-only content | Denied/not visible |
| Resident user reads Internship-only content | Denied/not visible unless explicitly shared |
| Rights reviewer writes medical decision | Denied |
| Medical reviewer writes rights decision | Denied |
| Reviewer outside assignment updates record | Denied |
| Non-owner admin changes owner-only capability | Denied and audited |
| Direct client attempts audit mutation | Denied |
| Service-role request without approved operation | Denied by application boundary and audited |
| Atlas asset relation without active content | Denied/not visible |
| Content activation with unresolved checksum/version | Denied |
| Content activation without implementation authorization | Denied |

## Security review decision

**Status:** `SECURITY_REVIEW_REQUIRED`  
**Implementation:** `BLOCKED`  
**SQL draft:** not authorized by this report  
**Next allowed action:** resolve target runtime/provider, actor identity mapping, record-level pathway scope, role separation, assignment model, service-role boundary, and live-parity evidence.

## References

[1]: file:///home/ubuntu/seg-manus-status/server/db.ts "Current MySQL/Drizzle application database integration"

[2]: file:///tmp/seg-supabase-review/supabase/schema.sql "Declarative Supabase base schema evidence"

[3]: file:///tmp/seg-supabase-review/supabase/migrations/20260716210000_owner_admin_management.sql "Declarative owner-admin management migration evidence"

[4]: file:///tmp/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 canonical additive profile"

[5]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_RLS_MATRIX_V1_0.md "Prior DRY-RUN RLS matrix"

[6]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
