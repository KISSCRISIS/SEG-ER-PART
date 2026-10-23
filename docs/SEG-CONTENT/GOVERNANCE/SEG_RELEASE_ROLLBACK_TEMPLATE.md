# SEG Release and Rollback Template

**Purpose:** Prepare an auditable, reversible release dry-run for a governed SEG content artifact or adapter.
**Default state:** `DRY_RUN_ONLY`; this template never executes commit, push, import, activation, deployment, or rollback by itself.

## 1. Release identity

| Field | Value |
|---|---|
| `release_decision_id` | |
| Candidate release ID | |
| Known-good release ID | |
| Candidate artifact ID(s) | |
| Source ID / record ID | |
| Source version | |
| Source SHA-256 | |
| Candidate artifact SHA-256 | |
| Professional track | |
| Taxonomy ID / version | |
| Prepared date-time UTC | |
| Release owner | |
| Current decision | `PASS` / `FAIL` / `BLOCKED` / `DRY_RUN_ONLY` |

## 2. Repository and target identity

| Field | Value |
|---|---|
| Repository URL | |
| Branch | |
| Intended commit / release commit | |
| Exact allowed paths | |
| Target environment | `NONE` / `STAGING` / `PRODUCTION` |
| Website ID | |
| Project/task owner | |
| Latest checkpoint | |
| Deployment source linkage | |
| Local build identity/hash | |
| Remote commit identity/hash | |
| Deployed runtime identity/hash | |

Missing deployment ownership must remain `BLOCKED`. Do not create a new Website/WebDev project, guess ownership, or deploy through an unrelated target.

## 3. Gate matrix

| Gate | Required evidence | Result | Evidence pointer / blocker |
|---|---|---|---|
| Candidate identity | Artifact hash matches QA and release manifest | `PASS` / `FAIL` / `BLOCKED` | |
| Source/provenance | Source, version, checksum, references, locators | `PASS` / `FAIL` / `BLOCKED` | |
| Rights | Text/image/display scope and independent rights decision | `PASS` / `FAIL` / `BLOCKED` | |
| Clinical governance | Qualified reviewer, decision, date, cited locations | `PASS` / `FAIL` / `BLOCKED` | |
| Track/taxonomy | Explicit, non-conflicting context | `PASS` / `FAIL` / `BLOCKED` | |
| Content QA | Exact candidate passed QA | `PASS` / `FAIL` / `BLOCKED` | |
| Implementation authorization | Per-run target, artifact, scope, consequence | `PASS` / `FAIL` / `BLOCKED` | |
| Repository safety | Allowed paths, no secrets/prohibited files, clean diff check | `PASS` / `FAIL` / `BLOCKED` | |
| Deployment ownership | Website/project/task/checkpoint/source linkage | `PASS` / `FAIL` / `BLOCKED` | |
| Deployment parity | Local, remote, deployed identity/runtime hashes agree | `PASS` / `FAIL` / `BLOCKED` | |
| Rollback readiness | Known-good release and reversible recovery path | `PASS` / `FAIL` / `BLOCKED` | |

Recommended blocker codes include `RELEASE_ARTIFACT_MISMATCH`, `GOVERNANCE_GATE_BLOCKED`, `QA_EVIDENCE_MISSING`, `IMPLEMENTATION_AUTHORIZATION_MISSING`, `REPOSITORY_TARGET_MISMATCH`, `SECRET_OR_PROHIBITED_FILE`, `DEPLOYMENT_OWNERSHIP_MISSING`, `DEPLOYMENT_PARITY_BLOCKED`, and `ROLLBACK_PLAN_MISSING`.

## 4. Dry-run actions

| Sequence | Proposed action | Exact artifact/path | Expected evidence | Executed? |
|---:|---|---|---|---|
| 1 | Verify candidate identity | | Hash comparison | `false` |
| 2 | Verify allowed paths and repository safety | | Staged-file list and diff check | `false` |
| 3 | Verify governance and QA package | | Decision/QA IDs | `false` |
| 4 | Verify target ownership and parity prerequisites | | Website/project/checkpoint evidence | `false` |
| 5 | Confirm rollback and fallback behavior | | Known-good release and recovery steps | `false` |

## 5. Rollback plan

| Field | Value |
|---|---|
| Known-good commit/build | |
| Known-good artifact hash | |
| Rollback trigger | |
| Reversible action | Disable dedicated adapter / revert dedicated release / restore known-good build / return to governed empty state |
| Content visibility fallback | |
| Source records preserved | `true` |
| Governance records preserved | `true` |
| Audit/evidence preserved | `true` |
| Post-rollback checks | Authentication, routes, database boundaries, asset registry, content visibility, runtime health |
| Rollback owner | |

Rollback must not delete source files, governance records, audit events, or evidence packages. It must not require an unrelated schema migration or Visual Freeze change.

## 6. Final release decision

| Field | Value |
|---|---|
| Gate result | `PASS` / `FAIL` / `BLOCKED` |
| Exact blockers | |
| Required human confirmation | Repository, branch, artifact, target, consequence |
| Next allowed phase | |
| Current release unchanged | `true` / `false` |

## Explicit non-actions

```json
{
  "commit_executed": false,
  "push_executed": false,
  "deployment_executed": false,
  "database_import_executed": false,
  "activation_performed": false,
  "source_deleted": false,
  "rollback_executed": false
}
```

## References

[1]: ../../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG Content Integration Plan"

[2]: /home/ubuntu/skills/seg-release-rollback/SKILL.md "SEG Release and Rollback"

[3]: /home/ubuntu/skills/seg-content-qa/SKILL.md "SEG Content QA"
