# SEG P0 Version Control Register

**Document ID:** `SEG_P0_VERSION_CONTROL_REGISTER`  
**Mode:** `CONTROLLED GOVERNANCE EXECUTION`  
**Scope:** Drug HTML, OSCE Atlas package, and PreTest content artifacts.  
**Purpose:** Maintain an evidence-only version and artifact-identity register for internally owned P0 assets. This register does not approve, normalize, import, activate, publish, or create content records.

## 1. Version-control boundary

The internal ownership declaration establishes that the listed retained artifacts are managed as `SEG_INTERNAL_ASSET` within SEG. It does not establish a canonical publication edition, release number, creation date, source version, completeness, or rights for incorporated third-party material.[1] Version fields below distinguish the **retained artifact representation** from the **unresolved canonical source version**.

A date shown as an observed tracker assessment date is not treated as an artifact creation date, recovery timestamp, publication date, or effective ownership date. No date has been invented where the evidence does not provide one.

## 2. P0 version-control register

| Asset name | Current artifact identifier | SHA-256 if available | Known creation/recovery date | Current version status | Version owner | Missing version information |
|---|---|---|---|---|---|---|
| Drug HTML | Retained readable UTF-8 HTML representation; 25,918 bytes; 394 lines; observed `drugList` count: 47 | `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac` | `NOT_AVAILABLE`; the cross-source tracker records assessment date `2026-08-22`, but no artifact creation/recovery timestamp is established | `NOT_AVAILABLE` for canonical source version; retained artifact identity is `PARTIALLY_CONFIRMED` | Dr. Alaa Al-Asfar as declared Content Owner; formal version-owner designation is `NOT_SUPPLIED` | Canonical title, edition/release/version label, publication date, original source-version locator, extraction/version event, future-version lineage, and change history |
| OSCE Atlas package | Recovered container with inner package; 14 PNG members; station-text artifact; visual-validation notes | Inner package: `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e`; outer recovery container: `8182d243fc762e29efba5adeda4233042f5e337846b3fbe819fcd374ef948758` | `NOT_AVAILABLE`; the cross-source tracker records assessment date `2026-08-22`, but no artifact creation/recovery timestamp is established | `NOT_AVAILABLE` for canonical atlas version; recovered package identity is `PARTIALLY_CONFIRMED` | Dr. Alaa Al-Asfar as declared Content Owner; formal version-owner designation is `NOT_SUPPLIED` | Canonical atlas title, edition/release/version label, publication date, original source-version locator, package/member extraction event, image/text revision lineage, completeness baseline, and change history |
| PreTest content artifacts | Recovered text representation `pretestnew_Study_Guide_UTF8.txt`; registry reference `UPD811-007`; 131,490 bytes; 1,349 logical lines; OCR/extraction corruption recorded | `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166` | `NOT_AVAILABLE`; the cross-source tracker records assessment date `2026-08-22`, but no artifact creation/recovery timestamp is established | `NOT_AVAILABLE` for canonical PreTest edition/version; retained representation identity is `CONFIRMED` for registry reference `UPD811-007` | Dr. Alaa Al-Asfar as declared Content Owner; formal version-owner designation is `NOT_SUPPLIED` | Authoritative PDF/equivalent, canonical title, edition/release/version label, publication date, source-version locator, OCR/extraction event, comparison baseline, completeness/numbering version, and change history |

## 3. Status interpretation

| Status | Application in this register |
|---|---|
| `CONFIRMED` | Applies only to the specific retained artifact fact supported by the cited evidence, such as the PreTest registry reference and hash. It does not mean that the canonical source version or medical content is approved. |
| `PARTIALLY_CONFIRMED` | Applies where artifact/package continuity is evidenced but canonical identity, source lineage, or version closure remains incomplete, as with Drug HTML and OSCE Atlas. |
| `NOT_AVAILABLE` | Applies where a canonical edition/version, release date, creation date, or formal version-owner designation is not supplied or independently established. |

`UPD811-007` is treated as an artifact/registry reference, not as a canonical edition or release number. The OSCE package hashes identify retained containers, not an authoritative atlas edition. The Drug HTML hash identifies the retained representation, not a publication version.[2]

## 4. Version-control requirements before later approval

Before any source-level approval is considered, the audit trail must link each future version event to the exact artifact or source representation, immutable hash, effective date supplied by an authorized owner or custodian, change description, source locator, reviewer evidence, and disposition of superseded representations. New or changed artifacts must receive new immutable identity evidence; an existing hash must not be reused to represent a different version.

The formal version owner remains `NOT_SUPPLIED` as a distinct appointment. The declared Content Owner may provide or authorize that appointment through a separately recorded governance event. No version change, replacement, merge, deletion, or normalization is authorized by this register.

## 5. Current governance controls

| Control | Current state |
|---|---|
| Ownership type | `SEG_INTERNAL_ASSET` under `SEG_INTERNAL_OWNERSHIP_DECLARATION_v1` |
| Source approvals | `APPROVED_SOURCES = NONE` |
| Normalization | `BLOCKED_PENDING_APPROVED_SOURCE` |
| Medical review | `PENDING_REVIEW` for all three P0 assets |
| Rights for incorporated third-party material | `PENDING_REVIEW` / `NOT_AVAILABLE` where not supplied |
| Source Registry | Unchanged |
| Content transformation/import/activation/publication | Not performed |

## 6. Final register state

`SEG_P0_VERSION_CONTROL_REGISTER_COMPLETE`

This status confirms creation of the evidence-only version-control register. It does not grant source approval, clinical approval, rights approval, or production authorization.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_INTERNAL_OWNERSHIP_DECLARATION_v1.md "SEG Internal Ownership Declaration v1"

[2]: file:///home/ubuntu/seg-internship-output/SEG_P0_AUTHORITY_EVIDENCE_STATUS_REPORT.md "SEG P0 Authority Evidence Status Report"

[3]: file:///home/ubuntu/seg-internship-output/SEG_CONTENT_RECOVERY_EXECUTION_TRACKER.md "SEG Content Recovery Execution Tracker"

**Document status:** `VERSION_CONTROL_REGISTER_RECORDED_PENDING_VERSION_CLOSURE`
