# SEG Content Canonical Schema Crosswalk

**Canonical contract:** `SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json`
**Contract title:** `SEG governed content record`
**Validation mode:** Read-only; schema validation is not clinical approval, rights approval, database validation, or integration authorization.

## Contract rules

The canonical contract is a JSON object with `additionalProperties: false`. Every supplied record must contain the ten required top-level groups below. Unknown properties are rejected at each defined object level. Date-time values must satisfy the schema’s date-time format, and hashes must satisfy the specified 64-hexadecimal SHA-256 pattern [1].

## Required top-level fields

| JSON path | Required rule | Accepted values / format | Governance meaning |
|---|---|---|---|
| `record_id` | Required | Lowercase identifier matching `^[a-z0-9][a-z0-9._-]{2,127}$` | Stable record identity; never replace an existing source ID silently |
| `title` | Required | Non-empty string | Descriptive label supplied by the source/governed record; not a clinical judgment |
| `content_type` | Required | `book`, `html`, `image`, `video`, `question_bank`, `knowledge_unit`, `module`, `lesson`, `flashcard`, `assessment` | Record kind; does not prove that derivative content has been approved |
| `language` | Required | String with at least two characters | Explicit language metadata; never inferred from filename alone |
| `source` | Required object | See source group below | Provenance and access identity |
| `version` | Required object | See version group below | Immutable version/checksum identity |
| `references` | Required array, minimum 1 | See references group below | Source-linked support locators; not a substitute for clinical review |
| `rights` | Required object | See rights group below | Text/image usage and display boundaries |
| `taxonomy` | Required object | See taxonomy group below | Explicit taxonomy identity and version |
| `medical_review` | Required object | See review group below | Observed review metadata; not assigned by this validator |
| `audit` | Required object | See audit group below | Append-only creation and processing evidence |

## Nested field crosswalk

### `source`

| JSON path | Required | Rule |
|---|---:|---|
| `source.source_id` | Yes | Non-empty string |
| `source.publisher_or_owner` | Yes | Non-empty string; use `NOT_SUPPLIED` only in a separate intake finding when absent, not to falsify a passing record |
| `source.location` | Yes | Non-empty exact location, path, URL, or supplied source locator |
| `source.accessed_at` | Yes | Date-time value |

### `version`

| JSON path | Required | Rule |
|---|---:|---|
| `version.value` | Yes | Non-empty version/release label |
| `version.published_at` | No | Date-time value when supplied |
| `version.checksum` | Yes | Exactly 64 hexadecimal characters representing SHA-256 |

### `references`

The array must contain at least one object. Every reference object must contain a non-empty `reference_id`, a non-empty `locator`, and a non-empty `supports` array. Each `supports` item is a non-empty string. A locator must point to material actually observed; it must not be invented from a filename or assumed chapter.

### `rights`

| JSON path | Required | Rule |
|---|---:|---|
| `rights.license` | No | Preserve the supplied license wording when present |
| `rights.text_usage` | Yes | Non-empty usage statement |
| `rights.image_usage` | Yes | Non-empty usage statement |
| `rights.display_scope` | Yes | Non-empty intended display scope |

### `taxonomy`

| JSON path | Required | Rule |
|---|---:|---|
| `taxonomy.taxonomy_id` | Yes | Non-empty explicit taxonomy ID |
| `taxonomy.taxonomy_version` | Yes | Non-empty explicit taxonomy version |

### `medical_review`

| JSON path | Required | Accepted values / rule |
|---|---:|---|
| `medical_review.reviewer` | Yes | Non-empty supplied reviewer identifier; never fabricated |
| `medical_review.decision` | Yes | `draft`, `under_review`, `approved`, `rejected`, or `withdrawn` |
| `medical_review.reviewed_at` | No | Date-time value when supplied |
| `medical_review.next_review_at` | No | Date-time value when supplied |

The validator reports this decision as observed metadata. It does not assign, verify, upgrade, or revoke a clinical decision. A structurally valid `approved` value still requires independently attributable governance evidence before any integration consideration.

### `audit`

| JSON path | Required | Rule |
|---|---:|---|
| `audit.created_by` | Yes | Non-empty supplied actor |
| `audit.created_at` | Yes | Date-time value |
| `audit.events` | Yes | Array with at least one event |
| `audit.events[].event` | Yes | Non-empty event name |
| `audit.events[].actor` | Yes | Non-empty supplied actor |
| `audit.events[].at` | Yes | Date-time value |
| `audit.events[].reason` | No | Preserve supplied reason |

## Fields that are not in the canonical manifest

The canonical schema does **not** contain a `track` property, parent IDs, child IDs, module membership, Lesson body, Flashcard prompts, Assessment options, database IDs, RLS fields, or application route fields. Because `additionalProperties` is false, adding `track` or any other unlisted property to a canonical record fails schema validation.

Professional-track separation remains mandatory in SEG governance. Track must therefore be carried in an explicit, separately supplied track/taxonomy context or architecture contract; it must never be inferred from a filename, folder, title, UI label, or topic. If a separate contract is absent, report track validation as `NOT_APPLICABLE` or `TRACK_UNSUPPLIED` rather than adding an unrecognized field to the canonical record [2].

The content types `knowledge_unit`, `module`, `lesson`, `flashcard`, and `assessment` are allowed values of `content_type`; they are not proof that the corresponding derivative artifact exists or has passed review. Any parent/child hierarchy for Pilot Converter outputs requires an explicit architecture contract and separate QA checks.

## Gate crosswalk

| Validation result | Meaning | Next allowed phase |
|---|---|---|
| `PASS` | Record satisfies the loaded canonical schema and supplied structural checks | READ_ONLY intake or rights/provenance review |
| `FAIL` | Record is readable but violates schema or an explicit architecture contract | Correct source package outside the validator, then re-submit |
| `BLOCKED` | Contract, source, rights, taxonomy, review, audit, or required evidence is missing or ambiguous | Evidence completion or governance escalation |

No result from this document authorizes medical review completion, approval, activation, database import, application exposure, commit, push, deployment, or publication.

## References

[1]: ../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "SEG governed content-record schema"

[2]: ../../SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG Content Integration Plan"

[3]: /home/ubuntu/skills/seg-content-architecture-schema-validator/SKILL.md "SEG structural schema validator"
