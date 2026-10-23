# SEG Content Intake Checklist

**Mode:** READ_ONLY intake gate  
**Current decision:** Not ready for medical-content activation  
**Use:** One checklist per separately supplied source package; do not edit the source during review.

## Package identity

| Check | Required evidence | Status |
|---|---|---|
| Package owner or publisher identified | Name, organization, or accountable source owner | Not started |
| Source package location recorded | Stable file path or URL | Not started |
| Package inventory recorded | File names, types, sizes, and count | Not started |
| No source mutation during intake | Before/after checksum evidence | Not started |

## Provenance and version

| Check | Required evidence | Status |
|---|---|---|
| Stable source ID | Source registry identifier | Not started |
| Version recorded | Publisher version or release date | Not started |
| SHA-256 recorded | Checksum for each source file or immutable package | Not started |
| Access date recorded | UTC timestamp | Not started |

## References and claims

| Check | Required evidence | Status |
|---|---|---|
| References identifiable | DOI, PMID, publisher URL, or equivalent trusted locator | Not started |
| Claim-to-reference mapping available | Mapping record or annotation supplied by the reviewer | Not started |
| Citation scope recorded | What the reference supports and what it does not support | Not started |

## Rights and display scope

| Check | Required evidence | Status |
|---|---|---|
| Text rights documented | License, permission, or usage basis | Not started |
| Image rights documented | License, permission, or usage basis for each visual | Not started |
| Display scope documented | Internal, educational, public, or restricted use | Not started |
| Derivative-use limits documented | Processing, excerpting, translation, or transformation limits | Not started |

## Medical review and taxonomy

| Check | Required evidence | Status |
|---|---|---|
| Medical reviewer assigned | Named accountable reviewer | Not started |
| Medical decision recorded | Draft, under review, approved, rejected, or withdrawn | Not started |
| Review date and next-review date recorded | Review timestamps and expiry policy | Not started |
| Taxonomy source identified | Taxonomy ID and version separate from UI labels | Not started |
| Learning-track mapping reviewed | Mapping decision without changing existing tracks | Not started |

## Audit and import gate

| Check | Required evidence | Status |
|---|---|---|
| Creation event recorded | Actor, timestamp, and reason | Not started |
| Review events recorded | Actor, timestamp, decision, and reason | Not started |
| Change history recorded | Immutable event sequence | Not started |
| Withdrawal path recorded | Trigger, actor, timestamp, and consequence | Not started |
| Approved-record gate passed | All required sections complete and independently approved | Blocked |
| Reversible adapter authorized | Separate implementation decision with tests and rollback | Blocked |

## Stop conditions

Stop the review and mark the package **blocked** if its owner or source cannot be established, the checksum is missing or changes unexpectedly, rights are unclear, references cannot be verified, a medical reviewer is not assigned, taxonomy conflicts with the governed taxonomy, audit events are incomplete, or the requested work would require changing routes, OAuth, the database, the Visual Freeze, or approved assets.

## Current project status

`SEG_CONTENT_LIBRARY` is structurally complete and contains no medical records. This checklist is a governance tool only. It does not approve, import, transform, summarize, publish, or render medical material.
