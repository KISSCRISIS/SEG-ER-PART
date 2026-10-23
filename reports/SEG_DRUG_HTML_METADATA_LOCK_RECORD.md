# SEG Drug HTML Metadata Lock Record

**Document ID:** `SEG_DRUG_HTML_METADATA_LOCK_RECORD`  
**Mode:** `OWNER GOVERNED MEDICAL CONTENT REVIEW`  
**Source:** Drug HTML  
**Ownership:** `SEG_INTERNAL_ASSET` for the declared retained artifact scope  
**Lock timestamp:** `2026-08-22T15:23:34+00:00` — observed execution timestamp  
**Current gate:** `BLOCKED_PENDING_EVIDENCE`

## 1. Metadata-lock boundary

This record locks the internally managed retained representation for review and traceability. It does not create a canonical publication identity, source edition, clinical validation, rights clearance, Content Record, normalized derivative, or production artifact. The HTML source remains preserved and unchanged.

## 2. Locked internal identity

| Field | Locked value | Status |
|---|---|---|
| Internal source/artifact identity | `LOCAL_INTAKE_ARTIFACT` | `CONFIRMED` for retained representation |
| Artifact reference | `/home/ubuntu/upload/deepseek_html_20260615_a3266b.html` | `CONFIRMED` |
| Final internal version identifier | `SEG-P0-DRUG-HTML-LOCAL-INTAKE-001` | `CONFIRMED` internal governance identifier |
| SHA-256 | `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac` | `CONFIRMED` |
| Size | 25,918 bytes | `CONFIRMED` |
| Line count | 394 lines | `CONFIRMED` |
| Internal content owner | Dr. Alaa Al-Asfar — SEG Medical Content Owner; Emergency Medicine Physician; Project Lead | `CONFIRMED` by explicit declaration |
| Ownership type | `SEG_INTERNAL_ASSET` | `CONFIRMED` for declared scope |
| Known creation/recovery date | `NOT_SUPPLIED` | Not inferred |
| Canonical source title/version/date/locator | `NOT_AVAILABLE` | Remains blocking |

The internal version identifier is a stable governance reference to this retained representation. It is not an external edition, publication version, release date, or statement of clinical currency.[1] [2]

## 3. Locked content structure

Read-only structural evidence is recorded as follows:

| Structure/field container | Observed value | Status and boundary |
|---|---:|---|
| `summaryData` sections | 19 | `CONFIRMED` structurally; not clinical validation |
| `quick` entries | 21 | `CONFIRMED` structurally; not clinical validation |
| `drugList` entities | 47 | `CONFIRMED` structurally; not clinical validation |
| `trapsList` entries | 20 | `CONFIRMED` structurally; not clinical validation |
| Embedded JavaScript/data arrays | Observed | `PARTIALLY_CONFIRMED` as structure |
| Arabic/English clinical labels | Observed | `PARTIALLY_CONFIRMED` as presentation |
| Explicit pairwise interaction table | Not observed in available evidence | `NOT_ESTABLISHED`; not evidence of absence |
| Entity-to-source/version locators | Not closed | `INCOMPLETE` |

No structure observation is treated as evidence that a medication fact, dose, interaction, contraindication, safety statement, emergency-medicine claim, or clinical field is correct or complete.

## 4. Required internal metadata fields

| Metadata field | Locked/current value | Status |
|---|---|---|
| `source_id` | `LOCAL_INTAKE_ARTIFACT` | `CONFIRMED` |
| `artifact_version_id` | `SEG-P0-DRUG-HTML-LOCAL-INTAKE-001` | `CONFIRMED` internal identifier |
| `artifact_sha256` | `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac` | `CONFIRMED` |
| `artifact_locator` | Local retained path above | `CONFIRMED` |
| `content_owner` | Dr. Alaa Al-Asfar | `CONFIRMED` |
| `ownership_type` | `SEG_INTERNAL_ASSET` | `CONFIRMED` |
| `canonical_title` | `NOT_AVAILABLE` | Blocking |
| `publisher/custodian` | `NOT_AVAILABLE` | Blocking |
| `source_version/edition` | `NOT_AVAILABLE` | Blocking |
| `source_publication/update_date` | `NOT_AVAILABLE` | Blocking |
| `original_locator` | `NOT_AVAILABLE` | Blocking |
| `professional_track` | `NOT_SUPPLIED`; not inferred | `NOT_AVAILABLE` |
| `taxonomy_id/version` | `NOT_AVAILABLE` | Blocking |
| `intended_audience` | Healthcare professionals and medical learners | `CONFIRMED` policy scope |
| `usage_scope` | Educational/professional training with controlled project access | `CONFIRMED` policy scope |
| `public_distribution` | Not authorized by current policy | `CONFIRMED` policy control |
| `external_redistribution` | Not authorized by current policy | `CONFIRMED` policy control |
| `provenance/extraction_lineage` | `NOT_AVAILABLE` | Blocking |
| `rights/display_scope` | `NOT_AVAILABLE` | Blocking |
| `review_state` | `OWNER_REQUIRES_FURTHER_REVIEW` | `CONFIRMED` current decision field |
| `approval_state` | `NOT_APPROVED` | `CONFIRMED` |
| `audit_linkage` | Prior events P0-AUD-001 through P0-AUD-023; this lock event pending append-only recording | `PARTIALLY_CONFIRMED` |

Missing values remain `NOT_AVAILABLE`, `NOT_SUPPLIED`, or `UNRESOLVED`; no value was inferred to make the metadata complete.

## 5. Lock interpretation

The lock confirms the exact retained bytes and the internally assigned governance identifier for subsequent review. It does not close canonical source identity, version, provenance, rights, professional track, taxonomy, clinical field completeness, drug safety, or audit linkage. The source file must not be overwritten, silently corrected, normalized, or replaced under this identifier.

## 6. Controls

```text
METADATA_LOCK = COMPLETE_FOR_RETAINED_INTERNAL_REPRESENTATION
CANONICAL_SOURCE_VERSION = NOT_AVAILABLE
APPROVED_SOURCES = NONE
NORMALIZATION = BLOCKED_PENDING_APPROVED_SOURCE
READY_FOR_NORMALIZATION = NOT_SET
SOURCE_REGISTRY_APPROVAL_STATES = UNCHANGED
CONTENT_MODIFIED = FALSE
```

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_DRUG_HTML_CLOSURE_STATUS.md "SEG Drug HTML Closure Status"

[2]: file:///home/ubuntu/seg-internship-output/SEG_P0_VERSION_CONTROL_REGISTER.md "SEG P0 Version Control Register"

[3]: file:///home/ubuntu/seg-internship-output/SEG_INTERNAL_OWNERSHIP_DECLARATION_v1.md "SEG Internal Ownership Declaration v1"

[4]: file:///home/ubuntu/seg-internship-output/SEG_OWNER_REVIEW_AUTHORITY_POLICY.md "SEG Owner Review Authority Policy"

[5]: file:///home/ubuntu/seg-internship-output/SEG_P0_AUDIT_TRAIL_REGISTER.md "SEG P0 Audit Trail Register"

**Document status:** `DRUG_HTML_METADATA_LOCKED_INTERNAL_VERSION_CANONICAL_VERSION_UNRESOLVED`
