**Phase:** 6.2 — Internship Content Model Blueprint Approval Package  
**Mode:** `READ_ONLY ARCHITECTURE BLUEPRINT`  
**Generated at (UTC):** `2026-08-17T20:21:16Z`  
**Design status:** Consolidated architecture decision package only; no canonical schema amendment, JSON, import, approval, activation, or application integration.

# SEG Internship Content Model Blueprint

## 1. Purpose and decision boundary

This blueprint consolidates the approved Internship Doctor Pathway vocabulary and the Phase 6.1 candidate contract extensions into a controlled model for future implementation planning. It is a human-readable architecture blueprint, not a database schema, application change, canonical manifest amendment, conversion payload, clinical guideline, or approval record.

The Phase 6.1 governance state remains `BLOCKED_PENDING_GOVERNANCE`. The blueprint therefore defines **future contract boundaries and required evidence** while preserving all unresolved states. No section below authorizes schema conversion, JSON generation, import, learner exposure, or activation.

## 2. Pathway identity

| Field | Controlled value | Boundary |
|---|---|---|
| Professional pathway | `SEG Internship Doctor Pathway` | Approved pathway concept; design-only and not activated. |
| Audience | `Medical Intern Doctors` | Approved audience; does not prove the track of any individual source. |
| Level | `Internship / Intern Core` | Pathway-level context; per-source level evidence remains required. |
| Professional track | `02_Internship` | Must be explicitly evidenced per source; folder names and titles are insufficient. |
| Root concept | `INTERN CORE` | Contains exactly the three approved branches below. |

### Approved branch structure

| Branch | Approved sections | Mapping rule |
|---|---|---|
| Core Rotations | Internal Medicine; Surgery; Pediatrics; OBGYN | Bind only when source evidence supports the rotation and explicit `02_Internship` context. |
| Clinical Foundation | Emergency Basics; Clinical Skills; Drug Essentials; ECG; Critical Care; Toxicology | Bind only when the foundation module and track/taxonomy evidence are separately supplied. |
| Learning Engine | Learn; Practice; MCQ; Cases; Progress Analytics | Describes learning function, not content type, clinical approval, or taxonomy by itself. |

The three branches remain separate from the seven professional tracks. No resident, student, paramedic, nursing, general-practitioner, or shared-core content may be mixed into `02_Internship` without an explicit governed relationship.[1] [2]

## 3. Approved content domains for future planning

The following five domains are the controlled conceptual domains for future Internship content planning. Their schema targets remain candidates until the corresponding architecture and governance decisions are authorized.

| Domain | Future schema target | Contract status | Minimum boundary |
|---|---|---|---|
| Lesson | `content_type=lesson` | Existing candidate contract | Preserve title, source/version/locator, pathway/module/specialty/topic, review state, and approval state; remain `Pending Clinical Review` / `NOT_APPROVED` until independent evidence exists. |
| Question Bank | `content_type=question_bank` | Existing candidate contract | Preserve stable item identity, question, options, answer, explanation, reference, difficulty, specialty/topic, source/version, track/taxonomy, review, and audit evidence. |
| Clinical Case | Case candidate | Candidate extension only; no canonical `case` enum | Preserve case type, presentation, assessment, reasoning, management, references, specialty/topic, pathway, exact locators, rights, review, and audit evidence. Do not infer missing sections or management. |
| Skills / Procedures | Skills candidate | Candidate extension only; no canonical `skill` enum | Distinguish `framework_candidate` from `individual_skill_candidate`; preserve skill name, category, level, teaching material, assessment method, reviewer status, source linkage, rights, taxonomy, and audit. |
| Reference / Book | Reference/Book candidate | Candidate extension only; no generic `reference` enum; `book` requires separate decision | Preserve explicit reference type, title, author/publisher, governed version, exact locator, rights/display scope, track/taxonomy, review state, source linkage, and audit. |

`Unknown / Requires Review`, directory rows, manifests, READMEs, governance reports, and technical implementation artifacts do not receive a learner-facing domain or schema target merely because they appear in the package. Technical assets remain excluded from medical-content ingestion.[3]

## 4. Technical asset exclusion rules

TypeScript, TSX, JavaScript, route/page files, components, parsers, source-layer utilities, manifests, and other implementation artifacts are evidence or implementation assets, not medical content records. They must be excluded from medical-content ingestion and must not be transformed into Lessons, Questions, Cases, Skills, or References by filename or exported symbols.

Technical assets may be reviewed separately for implementation ownership or repository safety, but that review cannot create medical provenance, clinical meaning, learner-facing content, approval, or schema eligibility. No route, component, database, authentication boundary, asset, or application architecture is changed by this blueprint.

## 5. Source lineage rules

All future governed artifacts must preserve the inventory Source ID, any source-local identifier, immutable archive path, SHA-256, governed version, owner/publisher, accessed date, exact page/section/heading locator, rights evidence, track/taxonomy evidence, review state, and append-only audit history.

For identity conflicts such as `SRC-0078` and `phone-pediatrics-main`, both identifiers must be preserved with explicit namespaces. An authorized append-only crosswalk must state whether they are aliases or distinct identifiers, cite the exact path and SHA-256, supply the missing provenance/rights/track/taxonomy/review/audit evidence, and record the final pathway decision. No identifier may be silently renamed, overwritten, merged, or replaced.[4]

A matching path, hash, specialty, topic, filename, folder, or embedded source-local role supports an alias/crosswalk hypothesis only; it does not close identity, ownership, version, rights, or review. If evidence is insufficient, the lineage and pathway states remain `UNRESOLVED` and `BLOCKED_PENDING_REVIEW`.

## 6. Duplicate handling rules

Duplicate families remain preserved as separate source lineages until an authorized canonical review is complete. The current known families are `DUP-DRUG-001` and `DUP-EMERGENCY-001`, each containing the preserved base and `v2_Pack` candidates.

No source may be deleted, renamed, merged, overwritten, archived, or silently substituted. Future duplicate review must be append-only and must document comparison scope, overlap, structural differences, version evidence, rights evidence, primary candidate, secondary candidate, archive disposition, reviewer, date, and unresolved issues. Until that evidence exists, canonical selection, archive action, and learner-facing use remain blocked.[5]

## 7. Review and approval lifecycle

All five domains follow the same governed lifecycle:

```text
Source
  → Metadata
  → Structural / Provenance / Rights / Taxonomy Review
  → Clinical or Relevant Review
  → Governance Registration
  → Content QA
  → Implementation Authorization
  → Controlled Release / Activation
```

These states must remain distinct. A structurally valid mapping or blueprint does not certify medical correctness, grant clinical approval, close rights, or authorize activation. Each record remains `Pending Clinical Review` / `NOT_APPROVED` until an attributable independent decision covers the exact source, version, locator, track/taxonomy, and intended scope.

| Gate | Required evidence before future conversion planning can pass |
|---|---|
| Source and provenance | Stable identity, owner/publisher, accessed date, governed version, checksum, and exact locator. |
| Track and taxonomy | Explicit `02_Internship`, approved branch/module, governed taxonomy ID/version, and cross-track conflict check. |
| Rights | Independent text/image/display rights evidence and permitted scope. |
| Domain contract | Authorized target enum/contract for the selected domain, including Case, Skills, and Reference extensions where applicable. |
| Review | Attributable clinical/relevant reviewer, decision, date, cited locators, and unresolved disposition. |
| Audit | Append-only events for intake, mapping, review, decision, QA, and authorization. |
| QA and authorization | Exact artifact structural QA plus separate implementation authorization; neither is implied by this blueprint. |

## 8. Future schema conversion requirements

Future conversion may be considered only after an authorized architecture decision adopts the Case, Skills, and Reference/Book contracts and the governance blockers are closed. The future process must operate on an exact immutable artifact, not on filenames or inferred content. It must preserve source lineage and unresolved states, validate required fields and types against an explicit contract, reject missing or guessed values, verify track separation, retain `NOT_APPROVED` where approval evidence is absent, and emit a deterministic dry-run report before any separately authorized integration.

No future conversion may create a production record, database row, learner-facing asset, or activation state as a side effect of validation. JSON, adapters, database import, application binding, release, and rollback each require separate authorization and evidence. The canonical manifest remains a closed-world contract until an explicit architecture decision changes it.[6]

## 9. Current blueprint gate interpretation

The blueprint is complete as a **design package**, but it is not ready to authorize implementation planning because Phase 6.1 remains `BLOCKED_PENDING_GOVERNANCE`. The missing canonical enum decisions, lineage crosswalk, per-source track/taxonomy evidence, provenance, rights, review, audit, duplicate governance, and implementation authorization remain active blockers.

## 10. Non-actions

| Action | Result |
|---|---|
| Schema conversion | `FALSE` |
| JSON generation | `FALSE` |
| Database/import execution | `FALSE` |
| Production record creation | `FALSE` |
| Application/database/routes/components/assets modification | `FALSE` |
| Source deletion/rename/merge/archive | `FALSE` |
| Clinical approval or activation | `FALSE` |
| Commit/push/deployment/publication | `FALSE` |

## References

[1]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DOCTOR_PATHWAY_CONTRACT.md "Internship Doctor Pathway Contract"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_TAXONOMY_CLOSURE_PLAN.md "Internship Taxonomy and Track Closure Plan"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md "Internship Content Type Contract"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_LINEAGE_RECONCILIATION.md "Internship Source Lineage Reconciliation"
[5]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DUPLICATE_GOVERNANCE_DECISION.md "Internship Duplicate Governance Decision"
[6]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_1_GATE_REPORT.md "Phase 6.1 Gate Report"
