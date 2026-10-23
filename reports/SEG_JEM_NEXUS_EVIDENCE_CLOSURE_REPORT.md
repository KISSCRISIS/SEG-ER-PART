# SEG JEM Nexus — Evidence Closure Review Report

**Review mode:** Controlled read-only governance review  
**Target:** JEM Nexus Emergency Medical Calculator  
**Review status:** `SEG_JEM_NEXUS_EVIDENCE_CLOSURE_COMPLETE`  
**Final decision:** `EXTERNAL_EVIDENCE_REQUIRED`  
**Operational status:** `BLOCKED_PENDING_EVIDENCE` / `INTERNAL_REFERENCE_ONLY`  
**Prepared by:** Manus AI

> JEM Nexus does not have sufficient evidence to progress beyond `BLOCKED_PENDING_REVIEW`. The supplied intake package is a traceable application artifact, but it does not close the identity, clinical-validation, software-governance, rights, or intended-use gates required for SEG normalization or integration.

## 1. Evidence Basis and Review Boundary

This decision is based on the controlled read-only evidence recorded in `SEG_JEM_NEXUS_CALCULATOR_SOURCE_INTAKE_REVIEW.md`. That intake verified the supplied ZIP as a structurally readable React/Vite/TypeScript application package, recorded its archive hash and integrity, and performed static inspection of the calculator definitions, engine, server routes, AI components, metadata, and package documentation. The application was not executed, no calculator was run, and no external request was submitted. [1]

| Evidence field | Current evidence | Closure assessment |
|---|---|---|
| Supplied artifact | `jem-nexus---emergency-medical-calculator.zip` | Confirmed for this intake |
| Archive integrity | ZIP integrity `PASS` | Confirmed |
| Archive SHA-256 | `55cbe7690be7e188c96615127b40af9dc898ced869faf195ae9dfa0b85cdf553` | Confirmed for this intake |
| Package status | 43 archive members; 36 regular files and 7 directories | Confirmed |
| Intake status | `BLOCKED_PENDING_REVIEW` | Remains unchanged |
| Evidence type | Static artifact inspection only | Insufficient for clinical or production approval |
| External evidence added in this review | None | No gate closure |

## 2. Executive Decision

JEM Nexus remains **blocked**. The artifact demonstrates the presence of a declared emergency-medicine and ICU calculator suite, local calculation logic, seven ICU medication presets, local audit-log UI/types, and server-side Gemini-backed clinical-insight and emergency-consult routes. These are package observations, not evidence that the formulas, thresholds, doses, clinical guidance, AI outputs, security controls, or intended deployment are correct or approved. [1]

The appropriate SEG disposition is a **reference-only tool candidate held internally for further evidence closure**. It must not be treated as an approved medical calculator module, a learner-facing learning utility, a source for `SEG_CONTENT_RECORD_V1_1`, or an integrated decision-support component. The final decision is therefore `EXTERNAL_EVIDENCE_REQUIRED`, with the operational state `INTERNAL_REFERENCE_ONLY` until all required gates are independently closed. [1]

## 3. Source Identity Closure

The artifact contains a declared tool name, `JEM Nexus - Emergency Medical Calculator`, and a package version of `0.0.0`. The package version is not sufficient evidence of a clinical release, edition, or validated version. The intake also records that no developer, publisher, organization, release date, edition lineage, canonical source repository, or authoritative clinical source locator was supplied. The README provides an AI Studio application URL, but that URL identifies an application context rather than the original developer, repository, or clinical provenance. [1]

| Identity requirement | Current status | Decision |
|---|---|---|
| Original developer/owner | `MISSING_EVIDENCE` | Not closed |
| Publisher/organization | `MISSING_EVIDENCE` | Not closed |
| Canonical repository/source location | `MISSING_EVIDENCE` | Not closed |
| Version/edition lineage | `MISSING_EVIDENCE`; package declares `0.0.0` only | Not closed |
| Release/publication date | `MISSING_EVIDENCE` | Not closed |
| Documentation | `PARTIALLY_CONFIRMED`; README contains run/deployment instructions but no clinical manual or bibliography | Not closed |
| Source identity decision | `PARTIALLY_CONFIRMED` | Remains blocked |

**Required identity evidence:** an owner-controlled source or release locator, named developer or organization, canonical title, immutable version or commit reference, release date, release notes, and documentation that distinguishes software documentation from clinical authority.

## 4. Clinical Evidence Closure

Static inspection identifies 16 declared calculators across ABG/respiratory, toxicology/ICU, neurology/cardiology, resuscitation/general/burns, and renal/electrolyte domains. It also identifies seven ICU drug presets for norepinephrine, epinephrine, dobutamine, dopamine, propofol, milrinone, and vasopressin. The engine declares formulas or frameworks associated with Parkland resuscitation, MUDPILES, Winter's formula, A–a gradient, P/F ratio, Berlin ARDS criteria, Cockcroft–Gault, sodium correction methods, Devine and Mosteller calculations, GCS, MAP, QTc, osmolal gap, and infusion calculations. [1]

These observations establish only that the package contains named formulas, thresholds, outputs, warnings, and treatment-oriented text. The intake found no independent bibliography, guideline edition, DOI, publisher record, date, formula-to-source traceability, or validation record. It also found no clinical-review decision for the dose presets, normal ranges, interpretation text, toxicology differentials, airway/ventilation language, or other treatment-oriented outputs. Therefore, the existence of code-level formulas cannot close the clinical evidence gate. [1]

| Clinical closure requirement | Current status | Decision |
|---|---|---|
| Formula inventory | Observed statically; 16 calculator definitions | Inventory only; not validated |
| Formula correctness | No independent validation evidence | Not closed |
| Units, rounding, defaults, boundary handling | No completed validation record | Not closed |
| Clinical references/citations | Embedded reference claims only; no authoritative bibliography | Not closed |
| Thresholds, ranges, labels, warnings | Present in package declarations; no independent validation | Not closed |
| Medication dose/concentration presets | Present as high-risk clinical content; no independent review | Not closed |
| Intended clinical scope | Broad clinician-facing scope; formal scope not established | Not closed |
| Medical evidence decision | `REQUIRED / NOT_STARTED` | Remains blocked |

**Required clinical evidence:** a function-by-function validation matrix, authoritative reference list with edition/version/date, independent formula and unit checks, edge-case and boundary testing, review of every dose and treatment-oriented output, documented conflicts and resolutions, qualified reviewer assignments, and signed review decisions. No such evidence was supplied in the intake package. [1]

## 5. Software Governance and Security Review

Static inspection records a server component with `GET /api/health`, `POST /api/clinical-insight`, and `POST /api/emergency-consult` routes. The clinical-insight route accepts calculator type, inputs, results, and clinical summary; the emergency-consult route accepts a message and context; and the package includes an optional Gemini API-key path. The reviewed server file did not show authentication or authorization middleware, explicit rate limiting, request-size policy, audit persistence policy, retention policy, or patient-data handling policy. These observations require review but do not by themselves prove the security posture of every possible deployment. [1]

The AI surface creates an additional governance boundary because calculator inputs, results, clinical summaries, messages, and context may be sent to an external AI service. The intake did not establish a privacy policy, PHI handling rule, retention/ownership terms, prompt/output safety control, or deployment boundary for this data flow. No technical review, dependency/security assessment, reproducible build evidence, deterministic calculator test suite, or cross-user isolation evidence was supplied. [1]

| Software-governance area | Current status | Decision |
|---|---|---|
| Dependency and license/SCA review | Not supplied | Not closed |
| Authentication and authorization | No middleware observed in reviewed server file; deployment boundary unknown | Not closed |
| Request validation and rate limiting | No completed evidence | Not closed |
| Privacy, PHI, retention, and external AI data flow | No completed evidence | Not closed |
| AI prompt/output safety | No completed evidence | Not closed |
| Deterministic tests and reproducible build | No completed evidence | Not closed |
| Audit, persistence, export, and isolation | No completed evidence | Not closed |
| Technical/security decision | `BLOCKED_TECHNICAL_REVIEW` | Remains blocked |

**Required technical evidence:** a static dependency and license review, vulnerability/SCA results, reproducible-build evidence, API authentication and request-validation review, privacy and data-flow assessment, secret/logging/retention review, AI safety review, deterministic tests for valid/invalid/extreme/boundary inputs, audit and persistence review, and deployment security review. Integration remains unauthorized until these gates are separately closed. [1]

## 6. Rights Closure

The intake found no license file, copyright statement, ownership declaration, redistribution permission, clinical-content permission, or assessment of third-party assets and service terms. The AI Studio URL is not a license grant. The absence of a local license file does not prove that the artifact is unlicensed; it means that permission is not evidenced. [1]

| Rights requirement | Current status | Decision |
|---|---|---|
| Code license | `MISSING_EVIDENCE` | Not closed |
| Clinical text/formula ownership or permission | `MISSING_EVIDENCE` | Not closed |
| Redistribution and hosted-use permission | `MISSING_EVIDENCE` | Not closed |
| Third-party dependencies/assets review | `MISSING_EVIDENCE` | Not closed |
| External AI/service terms assessment | `MISSING_EVIDENCE` | Not closed |
| Rights decision | `PENDING_EXTERNAL_EVIDENCE` | Remains blocked |

**Required rights evidence:** an owner-issued rights packet covering application code, embedded clinical text and formulas, medication presets, external references, third-party dependencies/assets, AI-service use, and the intended SEG redistribution or hosted-use model. [1]

## 7. SEG Classification Decision

The artifact should not yet be classified as an approved **medical calculator module** because clinical validation, source lineage, rights, and software/security review are incomplete. It should also not be treated as a learner-facing **learning utility** or converted into content records. The safest provisional classification is:

```text
REFERENCE-ONLY TOOL CANDIDATE
INTERNAL GOVERNED REFERENCE-APPLICATION CANDIDATE
```

This provisional classification is operational rather than clinical approval. It means the artifact may remain available for controlled evidence review only; it does not authorize execution, integration, mapping, normalization, database registration, or learner exposure. The professional track and taxonomy remain unresolved. A future decision may evaluate `07_Shared_Medical_Core` at the tool level, but no individual calculator, dose preset, or clinical guidance item may be assigned to that track automatically. [1]

| Classification option | Current decision | Rationale |
|---|---|---|
| Medical calculator module | `NOT_APPROVED` | Requires clinical and technical closure |
| Reference-only tool | `PROVISIONAL / INTERNAL_ONLY` | Best current operational destination |
| Learning utility | `NOT_APPROVED` | Learner scope, content evidence, and safety review are open |
| Not suitable pending further evidence | Applies to learner-facing or integrated use | Further evidence is mandatory before promotion |
| Final SEG decision | `EXTERNAL_EVIDENCE_REQUIRED` | No progression beyond blocked state |

## 8. Final Decision and Exact Next Action

The evidence closure decision is:

```text
FINAL_DECISION = EXTERNAL_EVIDENCE_REQUIRED
CURRENT_GATE = BLOCKED_PENDING_EVIDENCE
OPERATIONAL_DISPOSITION = INTERNAL_REFERENCE_ONLY
READY_FOR_NORMALIZATION = NO
INTEGRATION_AUTHORIZED = NO
LEARNER_EXPOSURE_AUTHORIZED = NO
```

The exact next action is to assemble and review a controlled external-evidence packet containing the following items: authoritative developer/owner identity; canonical repository or release locator; immutable version and release date; clinical bibliography and formula-to-source traceability; independent validation records for formulas, units, thresholds, ranges, warnings, doses, and treatment language; code and clinical-content rights; software/security and dependency review; AI data-flow, privacy, retention, and safety assessment; reproducible-build and deterministic-test evidence; audit/persistence/isolation evidence; and an approved intended-user and professional-track decision. [1]

After that evidence packet is complete, the allowed sequence is **medical review and rights review**, followed by **technical/security review**, followed by a separate SEG tool/reference governance decision. Only an explicitly authorized dry run could be considered after those gates; this report does not authorize mappings, records, normalization, integration, import, activation, or publication.

## 9. Confirmed Non-Actions

The following constraints remain in force for this review:

```json
{
  "application_executed": false,
  "calculator_executed": false,
  "external_api_called": false,
  "clinical_correctness_certified": false,
  "approval_granted": false,
  "database_records_created": false,
  "schema_modified": false,
  "mapping_created": false,
  "integration_executed": false,
  "normalization_executed": false,
  "import_executed": false,
  "activation_executed": false,
  "publication_executed": false,
  "git_operation_executed": false
}
```

## 10. Final Status

**Final status:** `SEG_JEM_NEXUS_EVIDENCE_CLOSURE_COMPLETE`  
**Final decision:** `EXTERNAL_EVIDENCE_REQUIRED`  
**Current gate:** `BLOCKED_PENDING_EVIDENCE`  
**Operational disposition:** `INTERNAL_REFERENCE_ONLY`

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_JEM_NEXUS_CALCULATOR_SOURCE_INTAKE_REVIEW.md "SEG JEM Nexus Calculator — Source Intake Review"

---

**SEG_JEM_NEXUS_EVIDENCE_CLOSURE_COMPLETE**
