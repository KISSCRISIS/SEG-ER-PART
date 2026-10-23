# SEG Medical Governance Templates

This file is a template index only. It contains no source, claim, clinical guidance, reference, or medical decision.

## Required future templates

| Template | Required fields | Promotion rule |
|---|---|---|
| Source Registry | `source_id`, owner/publisher, location, access date, source type | No intake without a traceable source |
| Version Control | version, release date, SHA-256 checksum, supersedes/superseded-by | Any checksum change creates a new review event |
| Rights Review | text license, image license, display scope, derivative-use limits, decision | Ambiguous rights block intake and publication |
| Medical Review | reviewer, decision, reviewed date, next-review date, rationale | Only an explicit `approved` decision can pass the medical gate |
| Audit Trail | actor, timestamp, event, reason, prior status, next status | Events are append-only and must be reproducible |
| Taxonomy Mapping | taxonomy ID, taxonomy version, mapping rationale, reviewer | UI labels cannot substitute for medical taxonomy |

## Permitted status values

`pending-intake`, `under-review`, `approved`, `rejected`, and `withdrawn`.

## Governance rule

A template is not a record. Do not place a source file, medical text, image, claim, citation, or reviewer decision in this directory until a separate governed intake command authorizes it.
