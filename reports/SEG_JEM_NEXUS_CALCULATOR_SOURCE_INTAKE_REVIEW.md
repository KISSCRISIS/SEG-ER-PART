# SEG JEM Nexus Calculator — Source Intake Review

**Review mode:** Controlled read-only evidence intake  
**Source candidate:** JEM Nexus — Emergency Medical Calculator  
**Review status:** `BLOCKED_PENDING_REVIEW`  
**Final status:** `SEG_JEM_NEXUS_SOURCE_INTAKE_COMPLETE`  
**Prepared by:** Manus AI  
**Review scope:** Artifact verification, application identity, static clinical-function inventory, provenance, rights, medical review, software/security review, and SEG destination recommendation.

> This document records evidence about the supplied artifact. It does not certify clinical correctness, approve the tool, authorize integration, or create a production source record.

## 1. Executive Intake Decision

The supplied ZIP is a structurally readable React/Vite/TypeScript application package containing a declared emergency-medicine and ICU calculator suite, local calculation logic, local audit-log types/UI, and server-side Gemini-backed clinical-insight and emergency-consult endpoints. These observations are based on static inspection only; the application was not executed and no calculations or network requests were submitted. [1] [4] [6] [7] [8]

The artifact is accepted as an **internal source candidate for further evidence closure**, not as an approved clinical calculator or learner-facing SEG component. The current gate remains `BLOCKED_PENDING_REVIEW` because the supplied package does not establish an authoritative source identity, release/version lineage, license or redistribution permission, independent medical validation, or software/security approval. The appropriate intake decision is therefore:

```text
INITIAL_STATUS = BLOCKED_PENDING_REVIEW
PROVENANCE = PARTIALLY_CONFIRMED
RIGHTS = PENDING_EXTERNAL_EVIDENCE
MEDICAL_REVIEW = REQUIRED / NOT_STARTED
TECHNICAL_REVIEW = REQUIRED / NOT_STARTED
SEG_DESTINATION = INTERNAL GOVERNED REFERENCE-APPLICATION CANDIDATE
NEXT_GATE = EVIDENCE CLOSURE REVIEW
```

No import, integration, normalization, database change, schema change, activation, publication, or learner exposure was performed.

## 2. Artifact Evidence

### 2.1 Archive identity and integrity

| Field | Observed evidence | Assessment |
|---|---|---|
| Submitted file | `jem-nexus---emergency-medical-calculator.zip` | `OBSERVED_FACT` |
| Absolute intake path | `/home/ubuntu/upload/jem-nexus---emergency-medical-calculator.zip` | `OBSERVED_FACT` |
| Archive size | 212,083 bytes | `OBSERVED_FACT` |
| Archive SHA-256 | `55cbe7690be7e188c96615127b40af9dc898ced869faf195ae9dfa0b85cdf553` | `OBSERVED_FACT` |
| ZIP integrity | `PASS` — `unzip -tq` reported no errors | `OBSERVED_FACT` |
| Archive members | 43 total: 36 regular files and 7 directories | `OBSERVED_FACT` |
| Standalone image assets | No standalone PNG/JPEG/SVG image files were present in the archive listing | `OBSERVED_FACT` |
| Archive execution | No application, JavaScript, server, dependency installation, or external request was executed | `OBSERVED_FACT` |

The archive contains source/configuration files rather than a compiled production bundle. The presence of `server.ts`, a `package.json`, Vite configuration, and TypeScript/TSX source indicates a runnable application package, but it does not establish that the supplied package is the canonical release or that it has passed a reproducible build. [1] [3]

### 2.2 Internal structure and file formats

The complete member inventory is recorded below. Directory entries are included explicitly to preserve the archive lineage.

```text
metadata.json
package.json
server.ts
src/
src/types.ts
src/engine/
src/engine/calculatorEngine.ts
src/components/
src/components/Header.tsx
src/data/
src/data/calculatorsList.ts
src/components/AIInsightBox.tsx
src/components/ClinicalConsultDrawer.tsx
src/components/calculators/
src/components/calculators/AnionGapCalculator.tsx
src/components/calculators/InfusionCalculator.tsx
src/components/calculators/GCSCalculator.tsx
src/components/calculators/OsmolalGapCalculator.tsx
src/components/calculators/BMICalculator.tsx
src/components/calculators/ParklandCalculator.tsx
src/components/calculators/PediatricCalculator.tsx
src/components/calculators/WintersCalculator.tsx
src/components/calculators/AaGradientCalculator.tsx
src/components/calculators/PFRatioCalculator.tsx
src/components/calculators/CrClCalculator.tsx
src/components/calculators/CorrectedSodiumCalculator.tsx
src/components/calculators/FreeWaterDeficitCalculator.tsx
src/components/calculators/MAPCalculator.tsx
src/components/calculators/QTcCalculator.tsx
src/components/calculators/DripRateCalculator.tsx
src/components/AuditLogModal.tsx
src/App.tsx
.env.example
.gitignore
assets/
assets/.aistudio/
assets/.aistudio/.gitignore
index.html
src/index.css
src/main.tsx
tsconfig.json
vite.config.ts
README.md
```

| File type | Count | Notes |
|---|---:|---|
| TSX | 22 | React components, calculator views, and UI |
| TS | 5 | Engine, types, data, server/client entry/configuration |
| JSON | 3 | App metadata and package configuration |
| CSS | 1 | Application styling |
| HTML | 1 | Application entry document |
| Markdown | 1 | README |
| ENV template | 1 | `.env.example` |
| GITIGNORE | 2 | Root and AI Studio asset ignore files |

Selected internal member hashes were recorded during the immutable scan for traceability, but they do not replace the archive hash:

| Member | SHA-256 |
|---|---|
| `src/data/calculatorsList.ts` | `89ba590203a9c209b977fb6b7584271aaf58e51238b09714e572c0671eb08d92` |
| `src/engine/calculatorEngine.ts` | `a8ac609092fe01c2527b6007a46ca2bf1714ed5b5d33dc46ce4f29a25b8d671d` |
| `metadata.json` | `c2ab551c7e47e5ede865a6060b5b13db6fa03b8989c46ad2be16b937ae8675b0` |
| `package.json` | `fd108717a34215a41b8fe0e2ae2a456c8032c9e3a614ac151de947e582d32e15` |

## 3. Tool Identity Review

### 3.1 Declared identity

| Identity field | Observed evidence | Status |
|---|---|---|
| Tool name | `JEM Nexus - Emergency Medical Calculator` in `metadata.json` | `PARTIALLY_CONFIRMED` |
| Description | Specialized clinical calculator engine and AI-supported assistant for emergency medicine and ICU | `OBSERVED_FACT` as a package declaration, not independent validation |
| Package name | `react-example` | `OBSERVED_FACT`; not a canonical product identifier |
| Package version | `0.0.0` | `OBSERVED_FACT`; not sufficient as a clinical release/version |
| Author/developer | Not supplied | `MISSING_EVIDENCE` |
| Publisher/organization | Not supplied | `MISSING_EVIDENCE` |
| Release/publication date | Not supplied | `MISSING_EVIDENCE` |
| Edition/release lineage | Not supplied | `MISSING_EVIDENCE` |
| Documentation | README contains AI Studio run/deployment instructions, but no clinical user manual or evidence bibliography | `PARTIALLY_CONFIRMED` |
| License | No license document or license field was observed | `MISSING_EVIDENCE` |
| Source repository | No canonical source repository was supplied; README contains an AI Studio app URL | `MISSING_EVIDENCE` for canonical repository |
| AI Studio context | README links to `https://ai.studio/apps/b3dcbf42-472f-42a7-9888-003ef0e4ba1c` | `OBSERVED_FACT`; this identifies an app context, not original clinical provenance |

The `0.0.0` package version must not be treated as an edition, clinical validation version, or release date. The archive timestamp, if present in filesystem metadata, is packaging evidence only and is not a publication date.

### 3.2 Application and dependency identity

The package declares a React 19/Vite 6/TypeScript application with Express, `@google/genai`, dotenv, Tailwind Vite integration, and related UI dependencies. The package scripts include development, build, start, preview, clean, and TypeScript check commands. These are software-package facts and do not establish production readiness or SEG compatibility. [3]

The supplied package contains a server component. Static inspection of `server.ts` found:

- `GET /api/health` returning a service status response.
- `POST /api/clinical-insight`, which accepts `calculatorType`, `inputs`, `results`, and `clinicalSummary`.
- `POST /api/emergency-consult`, which accepts `message` and `context`.
- Optional use of `GEMINI_API_KEY` with the Google Gemini client.
- No authentication or authorization middleware was observed in the reviewed server file.
- No explicit rate limiting, request-size policy, audit persistence policy, retention policy, or patient-data handling policy was observed in the reviewed server file.

These observations create a mandatory software/security review requirement. They are not a finding that the application is unsafe in every deployment; deployment configuration and surrounding infrastructure were not supplied. [7]

## 4. Clinical Function Review

### 4.1 Declared calculator inventory

Static inspection found 16 calculator definitions distributed across five declared categories. The list below reflects the package declarations only; it is not an independent clinical validation of any formula, threshold, range, label, dose, or recommendation. [4] [6]

| Category | Calculator IDs and declared functions | Count |
|---|---|---:|
| ABG / respiratory | `anion_gap`, `winters`, `aa_gradient`, `pf_ratio` | 4 |
| Toxicology / ICU | `infusion_rate`, `osmolal_gap` | 2 |
| Neurology / cardiology | `gcs`, `map`, `qtc` | 3 |
| Resuscitation / general / burns | `parkland`, `pediatric_weight`, `bmi`, `drip_rate` | 4 |
| Renal / electrolytes | `crcl`, `corrected_sodium`, `free_water_deficit` | 3 |
| **Total** | **Declared calculator definitions** | **16** |

The engine additionally declares seven ICU drug presets: norepinephrine, epinephrine, dobutamine, dopamine, propofol, milrinone, and vasopressin. The presets contain default doses, concentrations, preparation text, typical dose ranges, and indications. These values are high-risk medical content and require independent clinical pharmacology/emergency medicine review before any SEG use. [6]

### 4.2 Required inputs and declared outputs

The TypeScript types and engine signatures show that the tool accepts combinations of physiologic and laboratory inputs, including age, weight, height, sex/elderly flags, burn TBSA, blood pressure, heart rate, QT and RR-related data, sodium, glucose, chloride, bicarbonate, albumin, PaO2/PaCO2, FiO2, BUN, measured osmolality, creatinine, infusion dose/weight/concentration, volume/time/drop factor, and GCS component scores. Optional parameters are present for some calculators. [5] [6]

Declared outputs include numeric calculations, normal-range comparisons, severity or status labels, corrected values, dose/infusion rates, derived clinical categories, interpretation text, safety notes, clinical-action text, toxicology differentials, and ventilatory considerations. The artifact also declares output structures for pediatric resuscitation estimates, renal dosing caution, hypernatremia correction warnings, and ICU medication infusion checks. [5] [6]

The tool therefore has two distinct governance surfaces:

1. **Calculation surface:** formulas, units, rounding, boundary handling, defaults, and input validation.
2. **Clinical guidance surface:** normal ranges, differential lists, dose presets, safety warnings, airway/intubation language, ARDS/ventilation considerations, toxicology recommendations, and treatment-oriented next steps.

Both surfaces require review. A correct arithmetic implementation would not by itself establish clinical correctness or safe use.

### 4.3 Embedded references and evidence limitations

The source code names or describes formulas and frameworks including Parkland burn resuscitation, MUDPILES, Winter’s formula, A–a gradient, P/F ratio and Berlin ARDS criteria, Cockcroft–Gault, Katz/Hillier sodium correction, Devine and Mosteller calculations, GCS, MAP, QTc formulas, osmolal gap, infusion formulas, and emergency/ICU guidance language. The server prompt also refers to ACLS, Surviving Sepsis, ATLS, and Berlin ARDS criteria. [4] [6] [7]

No independent bibliography, citation list, guideline edition, DOI, publisher record, date, or source locator was supplied for these claims. The labels therefore count as **embedded reference claims**, not as closed evidence. They cannot be used to close a medical-review or provenance gate.

### 4.4 Intended users

The package language targets emergency physicians, ICU intensivists, and clinicians, while the calculator set also covers pediatric resuscitation, nursing-relevant gravity drip calculations, toxicology, renal dosing, and general clinical calculations. Because the intended audience is broad and not formally specified, the professional track is unresolved. The package must not be assigned simultaneously to physician, internship, nursing, paramedic, and student tracks without an approved SEG taxonomy and explicit separation rules.

## 5. Governance Assessment

### 5.1 Provenance status

| Provenance element | Status | Evidence / gap |
|---|---|---|
| Supplied artifact identity | `CONFIRMED` | ZIP path, size, SHA-256, and integrity verified |
| Extraction event | `CONFIRMED` for this intake | Static inventory and source inspection performed read-only |
| Original application/source owner | `MISSING_EVIDENCE` | No author, organization, canonical repository, or original source package supplied |
| Clinical source lineage | `MISSING_EVIDENCE` | No guideline editions, bibliography, or source-to-formula mapping supplied |
| Recovery artifact lineage | `PARTIALLY_CONFIRMED` | Supplied ZIP is traceable to this intake; upstream history is not established |
| SEG registry relationship | `NOT_CREATED` | No production or database registry record was created |

Overall provenance is `PARTIALLY_CONFIRMED`. The supplied ZIP is a traceable artifact for this review, but its upstream application identity and clinical evidence lineage remain open.

### 5.2 Rights and license status

**Rights status: `PENDING_EXTERNAL_EVIDENCE`.** No license file, copyright statement, ownership declaration, redistribution permission, clinical-content permission, Gemini/API terms assessment, or image/font/third-party asset inventory was supplied. The AI Studio README link is not a license grant. The absence of a local license file does not prove that the artifact is unlicensed; it means that permission is not evidenced in this intake package.

Before any SEG normalization, integration, or learner exposure, the owner must supply a rights packet covering the application code, embedded clinical text and formulas, drug presets, any external references, third-party dependencies as applicable, and any future redistribution or hosted-use model.

### 5.3 Medical review requirement

Medical review is required and has not started. At minimum, the review plan must assign qualified reviewers for the following domains:

| Review domain | Required review scope |
|---|---|
| Emergency medicine / critical care | Overall clinical intent, emergency workflows, shock, resuscitation, ventilation, airway, and safety language |
| Clinical pharmacology / toxicology | ICU drug presets, infusion concentrations, dose ranges, toxic alcohol differentials, antidote/treatment language, and medication safety warnings |
| Respiratory / ICU medicine | ABG, A–a gradient, P/F ratio, ARDS thresholds, oxygenation and ventilation considerations |
| Pediatrics / pediatric emergency care | Weight estimation, defibrillation energy, ET tube sizing, fluid bolus, and epinephrine dose outputs |
| Nephrology / acute care | Creatinine clearance, sodium corrections, free-water deficit, correction-rate warnings, and dosing-caution text |
| Cardiology / ECG | QTc formulas, sex-specific cutoffs, torsades-risk labels, and arrhythmia-related guidance |
| Clinical education governance | Intended user, professional-track separation, learning objective, disclaimer, and limits of decision-support use |

Required review evidence includes a source-by-source or function-by-function decision record, independent validation of formulas and units, review of edge cases and boundary handling, and explicit disposition of every treatment-oriented or dose-related output. The current state remains `NOT_APPROVED` / `PENDING CLINICAL REVIEW`.

### 5.4 Technical and software/security review requirement

Technical review is required and has not started. The package contains server-side AI routes and an environment-based Gemini API key path, so the review must include:

- Static dependency and license review, vulnerability/SCA review, and reproducible build assessment.
- API authentication and authorization boundaries, request validation, rate limiting, error handling, and request-size controls.
- Privacy assessment for `inputs`, `results`, `clinicalSummary`, `message`, and `context`, including whether patient-identifiable information could be sent to an external AI service.
- Secret handling, logging, retention, observability, and failure-mode review.
- Prompt and output-safety review for AI-generated clinical interpretation, emergency recommendations, and dosing references.
- Deterministic unit tests for all calculators, including invalid, extreme, missing, and boundary inputs.
- Review of local audit-log behavior, export/copy behavior, data persistence, and cross-user isolation.
- Review of deployment topology, domain/origin controls, CORS/CSRF posture, TLS, and production configuration.

The current technical status is `BLOCKED_TECHNICAL_REVIEW`; no SEG integration is authorized.

### 5.5 Track and taxonomy status

**Track status: `UNRESOLVED`.** The package is described for emergency medicine and ICU clinicians but includes content with possible relevance to multiple professional levels and roles. The provisional destination should be a governed **Reference Application / Medical Education Utility candidate**, not a content record. If a later approved SEG taxonomy requires a professional track, `07_Shared_Medical_Core` may be evaluated as a provisional tool-level destination, but no calculator or clinical guidance item should be classified there automatically. Emergency physician, internship, nursing, paramedic, and student use must remain separately reviewed and explicitly authorized.

## 6. Recommended SEG Destination

The recommended destination is:

```text
INTERNAL GOVERNED REFERENCE-APPLICATION CANDIDATE
```

It should remain outside the learner-facing content library and outside `SEG_CONTENT_RECORD_V1_1` until evidence closure, medical review, rights closure, technical/security review, and an approved decision about whether the artifact is a tool, a reference application, or a source of derived educational content.

A future approved route could be:

```text
Source Artifact
  ↓
Evidence Closure
  ↓
Medical + Rights + Technical Review
  ↓
Tool/Reference Governance Decision
  ↓
Separate track/taxonomy decision
  ↓
Authorized integration dry run only
```

This route must not be interpreted as permission to create mappings, content records, APIs, or production integrations now.

## 7. Missing Evidence and Open Blockers

| Blocker | Current state | Required closure evidence |
|---|---|---|
| Canonical identity | Open | Named developer/owner, organization, canonical title, release/version, date, and authoritative locator |
| Source repository | Open | Canonical repository or owner-controlled source release with immutable reference |
| Clinical bibliography | Open | Guideline/reference list with edition/version/date and formula-to-source traceability |
| Rights/license | Open | Code license, clinical-content ownership/permission, redistribution/hosting rights, third-party asset status |
| Clinical validation | Open | Qualified reviewer assignments, review records, formula/threshold/dose validation, unresolved-conflict decisions |
| Technical/security review | Open | Static security review, dependency review, privacy/data-flow review, auth/API review, AI safety review, test evidence |
| Intended users and tracks | Open | Approved target audience, taxonomy, and professional-track separation decision |
| Completeness/reproducibility | Open | Canonical release inventory, build instructions validated in a controlled environment, test coverage, and versioned artifact lineage |
| AI data handling | Open | External-service data-processing assessment, retention/ownership terms, PHI policy, and deployment boundary |
| Audit and persistence model | Open | Explicit determination of what is stored/exported, who can access it, retention, and separation guarantees |

## 8. Current Gate and Next Allowed Action

| Gate | Current decision |
|---|---|
| Artifact intake | Complete for this supplied ZIP |
| Source identity | `PARTIALLY_CONFIRMED` |
| Provenance | `PARTIALLY_CONFIRMED` |
| Rights | `PENDING_EXTERNAL_EVIDENCE` |
| Medical review | `BLOCKED — REQUIRED / NOT_STARTED` |
| Technical review | `BLOCKED — REQUIRED / NOT_STARTED` |
| Track/taxonomy | `UNRESOLVED` |
| Integration | `NOT_AUTHORIZED` |
| Normalization | `NOT_AUTHORIZED` |
| Production database/schema changes | `NOT_AUTHORIZED` |
| Learner exposure | `NOT_AUTHORIZED` |
| Current gate | `BLOCKED_PENDING_REVIEW` |
| Next allowed action | `EVIDENCE CLOSURE REVIEW` |

The next allowed action is to obtain and review the missing identity, source-lineage, rights, medical-review, and technical/security evidence. No calculator execution, content import, mapping, normalization, or learner publication is permitted as a consequence of this intake report.

## 9. Non-Actions and Final Status

The following non-actions are confirmed for this intake:

```json
{
  "artifact_modified": false,
  "application_executed": false,
  "clinical_correctness_certified": false,
  "approval_granted": false,
  "database_records_created": false,
  "database_import_executed": false,
  "schema_modified": false,
  "integration_executed": false,
  "activation_executed": false,
  "publication_executed": false,
  "git_operation_executed": false
}
```

**Final status:** `SEG_JEM_NEXUS_SOURCE_INTAKE_COMPLETE`

**Initial candidate status remains:** `BLOCKED_PENDING_REVIEW`

## References

The references below are local evidence locators from the supplied artifact and read-only extraction. They are not independent clinical authorities and do not close any medical, rights, provenance, or technical-review gate.

[1]: file:///home/ubuntu/upload/jem-nexus---emergency-medical-calculator.zip "Supplied JEM Nexus ZIP artifact"
[2]: file:///tmp/jem_nexus_readonly/metadata.json "JEM Nexus metadata.json"
[3]: file:///tmp/jem_nexus_readonly/package.json "JEM Nexus package.json"
[4]: file:///tmp/jem_nexus_readonly/src/data/calculatorsList.ts "JEM Nexus calculator definitions"
[5]: file:///tmp/jem_nexus_readonly/src/types.ts "JEM Nexus TypeScript result types"
[6]: file:///tmp/jem_nexus_readonly/src/engine/calculatorEngine.ts "JEM Nexus static calculator engine"
[7]: file:///tmp/jem_nexus_readonly/server.ts "JEM Nexus server and API routes"
[8]: file:///tmp/jem_nexus_readonly/src/components/AIInsightBox.tsx "JEM Nexus AI insight client component"
[9]: file:///tmp/jem_nexus_readonly/README.md "JEM Nexus README and AI Studio context"

---

**SEG_JEM_NEXUS_SOURCE_INTAKE_COMPLETE**
