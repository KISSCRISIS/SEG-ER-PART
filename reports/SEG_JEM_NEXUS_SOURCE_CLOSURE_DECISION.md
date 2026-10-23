# SEG JEM Nexus Source Closure Decision

**Review mode:** `CONTROLLED GOVERNANCE ONLY` / read-only evidence closure  
**Target:** JEM Nexus Emergency Medical Calculator  
**Path classification:** Separate tool/reference path; not a content-source row in the SEG Master Source Registry  
**Prior state:** `BLOCKED_PENDING_REVIEW` / `EXTERNAL_EVIDENCE_REQUIRED`  
**Prepared by:** **Manus AI**

> **Decision summary:** The supplied JEM Nexus package is a structurally inspected application artifact, but the evidence set does not close original identity, clinical validation, provenance, rights, software/security, intended-use, or professional-track requirements. The tool remains blocked and may be preserved only for controlled internal evidence review.

## 1. Evidence Basis and Boundary

This decision uses the controlled read-only intake and evidence-closure records for the supplied `jem-nexus---emergency-medical-calculator.zip`. The package was statically inspected; the application was not executed, no calculator was run, and no external API request was submitted. The evidence therefore establishes package observations only and does not certify clinical correctness, software safety, or deployment suitability. [1] [2]

| Evidence item | Observed evidence | Closure meaning |
|---|---|---|
| Supplied artifact | `jem-nexus---emergency-medical-calculator.zip` | Artifact available for controlled review |
| Archive integrity | ZIP integrity passed | Package-level integrity confirmed |
| Archive SHA-256 | `55cbe7690be7e188c96615127b40af9dc898ced869faf195ae9dfa0b85cdf553` | Hash confirmed for the reviewed intake |
| Package inventory | 43 archive members; 36 regular files and 7 directories | Static inventory only |
| Declared tool name | `JEM Nexus - Emergency Medical Calculator` | Package declaration; not independent ownership evidence |
| Declared package version | `0.0.0` | Package metadata only; not a validated release lineage |
| Review state | `BLOCKED_PENDING_REVIEW` | Remains blocked |

## 2. Source Identity Closure

| Identity requirement | Status | Evidence and unresolved point |
|---|---|---|
| Original title/tool name | `PARTIALLY_CONFIRMED` | The package declares `JEM Nexus - Emergency Medical Calculator`; canonical owner-controlled title evidence is not supplied. |
| Original developer/owner | `NOT_AVAILABLE` | No attributable developer or owner is evidenced. |
| Publisher/organization | `NOT_AVAILABLE` | No publisher or organizational identity is evidenced. |
| Authoring organization | `NOT_AVAILABLE` | No authoring organization is evidenced. |
| Version/edition | `PARTIALLY_CONFIRMED` | `0.0.0` is declared by the package, but no release, edition, commit, or immutable owner-controlled version lineage is supplied. |
| Publication/release date | `NOT_AVAILABLE` | No release date is supplied. |
| Original source location | `NOT_AVAILABLE` | The README contains an AI Studio application URL, but it does not establish the original developer, repository, or authoritative clinical source location. |
| Documentation | `PARTIALLY_CONFIRMED` | Run/deployment instructions are present; a clinical manual and authoritative bibliography are not evidenced. |
| **Identity gate** | **`BLOCKED`** | Required external identity and version evidence is incomplete. |

**Required identity closure evidence:** an owner-controlled source or release locator, named developer or organization, canonical title, immutable version or commit reference, release date, release notes, and documentation distinguishing software documentation from clinical authority. [1]

## 3. Provenance Closure

| Provenance requirement | Status | Evidence and unresolved point |
|---|---|---|
| Artifact origin | `PARTIALLY_CONFIRMED` | The supplied ZIP and its hash are recorded in the intake. |
| Transformation history | `NOT_AVAILABLE` | No attributable extraction, packaging, translation, rewrite, or transformation event is supplied. |
| Translation/rewrite history | `NOT_AVAILABLE` | No translation or technical-rewrite provenance record is supplied. |
| Extraction lineage | `PARTIALLY_CONFIRMED` | Static package inspection is recorded, but the original-source-to-package event and context are not independently evidenced. |
| Chain of custody | `PARTIALLY_CONFIRMED` | Intake custody of the supplied archive is recorded; a complete owner-to-SEG registry chain is not closed. |
| Source-to-registry relationship | `NOT_AVAILABLE` | JEM remains a separate reference path and has no approved SEG content or database record. |
| **Provenance gate** | **`BLOCKED`** | Hash evidence does not substitute for source lineage or custody evidence. |

## 4. Rights and License Closure

| Rights requirement | Status | Evidence and unresolved point |
|---|---|---|
| Copyright/code owner | `NOT_AVAILABLE` | No license file, copyright statement, or owner declaration is evidenced. |
| Clinical text/formula ownership or permission | `NOT_AVAILABLE` | No permission for embedded clinical text, formulas, thresholds, warnings, or medication presets is evidenced. |
| Redistribution permission | `NOT_AVAILABLE` | No permission for SEG-hosted or learner-facing redistribution is evidenced. |
| Educational-use permission | `NOT_AVAILABLE` | No educational-use grant or restriction statement is evidenced. |
| Image/table/asset rights | `NOT_AVAILABLE` | No third-party asset or image/table rights assessment is supplied. |
| Dependency and service terms | `NOT_AVAILABLE` | No complete dependency-license or external AI-service terms assessment is supplied. |
| **Rights gate** | **`BLOCKED_PENDING_EVIDENCE`** | The absence of a local license is not treated as proof of no license; permission is simply not evidenced. |

The AI Studio URL is not a license grant. Rights closure requires an owner-issued packet covering code, embedded clinical material, medication presets, references, third-party dependencies/assets, external AI-service use, and the intended SEG use model. [2]

## 5. Medical Review Gate

The static evidence identifies 16 declared calculators across respiratory/ABG, toxicology/ICU, neurology/cardiology, resuscitation, burns, and renal/electrolyte domains, together with seven ICU medication presets. These are package observations and are not clinical validation results. [2]

| Required review element | Status | Required scope |
|---|---|---|
| Emergency Medicine / ICU reviewer | `NOT_STARTED` | Review calculator scope, interpretation text, thresholds, warnings, treatment-oriented outputs, and intended clinical use. |
| Ventilation/critical-care subject review where relevant | `NOT_STARTED` | Review respiratory, ABG, oxygenation, ARDS, and ventilation-related logic and language where applicable. |
| Medication/dose review | `NOT_STARTED` | Review every medication preset, concentration, unit, default, and treatment-oriented output. |
| Formula/reference validation | `NOT_STARTED` | Map every formula and threshold to authoritative references and independently test units, rounding, boundaries, and edge cases. |
| Clinical conflicts and approval evidence | `NOT_STARTED` | Record attributable reviewer decisions, conflicts, resolutions, date, and explicit approval or rejection. |
| **Medical review gate** | **`BLOCKED`** | No qualified review decision is present. |

## 6. Technical and Security Review Gate

The reviewed package contains local calculator logic, server routes including health, clinical-insight, and emergency-consult surfaces, and an optional Gemini-backed path. The earlier review did not establish authentication/authorization, rate limiting, request-size controls, privacy/PHI handling, retention, AI safety, reproducible builds, deterministic test coverage, audit persistence, or cross-user isolation. These are review requirements, not a conclusion that every deployment has the same defect. [2]

| Required review element | Status | Required scope |
|---|---|---|
| Technical/software reviewer | `NOT_STARTED` | Review architecture, dependencies, build reproducibility, deterministic calculator tests, request validation, and deployment boundaries. |
| Security reviewer | `NOT_STARTED` | Review authentication, authorization, secrets, rate limiting, logging, retention, external data flow, isolation, and vulnerability/SCA evidence. |
| AI/data-flow review | `NOT_STARTED` | Review whether inputs, results, summaries, messages, or context can leave the permitted boundary; assess privacy, retention, prompt/output safety, and service terms. |
| **Technical gate** | **`BLOCKED`** | No attributable technical or security review decision is supplied. |

## 7. Accessibility Requirement

No accessibility evidence was supplied for a future learner-facing JEM interface or tool presentation. Accessibility is therefore **not closed**. If SEG later proposes any user-facing surface, a separate accessibility review must cover keyboard operation, screen-reader semantics, labels and error handling, contrast, responsive behavior, non-color dependence, and safe presentation of calculator inputs and outputs. This report does not authorize such a surface.

## 8. SEG Destination Decision

| Decision option | Result |
|---|---|
| `READY_FOR_NORMALIZATION` | `NO` |
| `EXTERNAL_EVIDENCE_REQUIRED` | `YES` — identity, clinical, rights, provenance, technical, security, and intended-use evidence remain open |
| `BLOCKED_PENDING_EVIDENCE` | `YES` — current gate for any SEG promotion or integration |
| `INTERNAL_REFERENCE_ONLY` | `YES` — controlled preservation and evidence inspection only |

**Final SEG destination:** `BLOCKED_PENDING_EVIDENCE`  
**Operational disposition:** `INTERNAL_REFERENCE_ONLY` / `WAITING_FOR_EVIDENCE`  
**JEM path remains separate from the Master Source Registry.**

## 9. Exact Next Allowed Action

Assemble a controlled external-evidence packet containing: authoritative developer/owner identity; canonical repository or release locator; immutable version and release date; clinical bibliography and formula-to-source traceability; independent validation of formulas, units, thresholds, ranges, warnings, doses, and treatment language; code and clinical-content rights; software/security and dependency review; AI data-flow, privacy, retention, and safety assessment; reproducible-build and deterministic-test evidence; audit/persistence/isolation evidence; intended-user evidence; and an explicit professional-track/taxonomy decision.

After evidence acquisition, the allowed sequence is independent medical and rights review, followed by technical/security review and a separate SEG tool/reference governance decision. No normalization or integration follows automatically.

## 10. Confirmed Non-Actions

```json
{
  "application_executed": false,
  "calculator_executed": false,
  "external_api_called": false,
  "content_normalized": false,
  "content_records_created": false,
  "schemas_created_or_modified": false,
  "database_or_supabase_changed": false,
  "integration_executed": false,
  "import_executed": false,
  "activation_executed": false,
  "publication_executed": false,
  "learner_exposure_enabled": false,
  "approval_granted": false,
  "git_operation_executed": false
}
```

## 11. Final Status

```text
SEG_JEM_NEXUS_SOURCE_CLOSURE_COMPLETE
FINAL_DECISION = EXTERNAL_EVIDENCE_REQUIRED
CURRENT_GATE = BLOCKED_PENDING_EVIDENCE
OPERATIONAL_DISPOSITION = INTERNAL_REFERENCE_ONLY
READY_FOR_NORMALIZATION = NO
INTEGRATION_AUTHORIZED = NO
```

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_JEM_NEXUS_CALCULATOR_SOURCE_INTAKE_REVIEW.md "SEG JEM Nexus Calculator Source Intake Review"

[2]: file:///home/ubuntu/seg-internship-output/SEG_JEM_NEXUS_EVIDENCE_CLOSURE_REPORT.md "SEG JEM Nexus Evidence Closure Report"

[3]: file:///home/ubuntu/seg-internship-output/SEG_TARGETED_EVIDENCE_CLOSURE_PLAN.md "SEG Targeted Evidence Closure Plan"

[4]: file:///home/ubuntu/seg-internship-output/SEG_MASTER_SOURCE_REGISTRY_STATUS.md "SEG Master Source Registry Status"

---

**SEG_JEM_NEXUS_SOURCE_CLOSURE_COMPLETE**
