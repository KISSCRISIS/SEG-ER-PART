# SEG — Visual Asset Registry Final Report

**Mode:** READ_ONLY — evidence and organization check only  
**Scope:** Approved SEG visual assets, current application registry, Dashboard core, and Atlas & Visual Assets identity  
**Decision date:** 15 August 2026

## STATUS

The application registry contains **21 managed visual-asset entries**. Every registered managed URL resolved successfully from the published SEG site during this check. The primary production package is present and identifies itself as **version 1.0**; its authoritative brand and medical filenames reconcile with the production-aligned registry entries. [1] [2]

The strict documentation result is **not a complete manifest pass** because several later approved, screen-specific registry entries are represented by the application registry and earlier approval records, but do not have individual canonical asset-manifest records with all requested metadata. This is a **registry-traceability gap**, not evidence of an unavailable published asset or an instruction to replace one. It does not reopen the completed visual-freeze implementation. [3] [4]

> **Authority relationship.** `SEG_FINAL_VISUAL_ASSETS_PACKAGE_v1.0_PRODUCTION` remains the primary visual authority. The shared `seg-design-system` governs token and component use; it does not supersede or replace approved imagery. [5] [6]

## 1. Asset Inventory

| Asset | Location | Version | Status | Usage Scope |
|---|---|---:|---|---|
| `primaryLogo` — `SEG_Primary_Logo_Approved.png` | Production v1.0 `01_BRAND_IDENTITY`; shared approved package; managed registry | v1.0 | **APPROVED / exists / published** | My Pathway brand stage; approved primary-brand placements only. |
| `heroLogo` — `SEG_Hero_Logo_Heart_Brain_ECG_Approved.png` | Production v1.0 `01_BRAND_IDENTITY`; shared approved package; managed registry | v1.0 | **APPROVED / exists / published** | Learn hero/approved authentication-lockup placements only. |
| `brainHeartCore` — `SEG_Brain_Heart_Intelligence_Core.png` | Production v1.0 `02_MEDICAL_VISUAL_ASSETS`; shared approved package; managed registry | v1.0 | **APPROVED / exists / published** | Approved central-core placement inside the existing internal Dashboard presentation. |
| `anatomyHologram` — `SEG_Human_Anatomy_Hologram.png` | Production v1.0 `02_MEDICAL_VISUAL_ASSETS`; shared approved package; managed registry | v1.0 | **APPROVED / exists / published** | Practice visual stage only where reference-consistent. |
| `emergencyResponse` — `SEG_Emergency_Response_Visual.png` | Production v1.0 `02_MEDICAL_VISUAL_ASSETS`; managed registry | v1.0 | **APPROVED / exists / published** | Production-aligned emergency visual; use only in approved reference-consistent contexts. |
| `medicalAi` — `SEG_Medical_AI_Assistant.png` | Production v1.0 `02_MEDICAL_VISUAL_ASSETS`; managed registry | v1.0 | **APPROVED / exists / published** | Production-aligned medical-assistant visual; scope remains reference-controlled. |
| `dashboardBrainHeartCoreClean` — `SEG_Dashboard_Brain_Heart_Core_Clean_Approved.png` | Project-support asset store and managed registry | Not recorded | **APPROVED placement / exists / published; restricted** | Dashboard **Professional Growth Core** only. Do not generalize to another screen. |
| `officialBrainHeartMark` | Managed registry and published storage | Not recorded | **APPROVED later crop / published; manifest gap** | Registration mark only. |
| `officialAppIcon` | Managed registry and published storage | Not recorded | **APPROVED later crop / published; manifest gap** | Shared compact brand component only. |
| `registrationHeartStage` | Managed registry and published storage | Not recorded | **APPROVED screen-specific stage / published; manifest gap** | Registration page only. |
| `loginOfficialLockup` | Managed registry and published storage | Not recorded | **APPROVED screen-specific stage / published; manifest gap** | Login page only. |
| `loginHeartStage` | Managed registry and published storage | Not recorded | **APPROVED screen-specific stage / published; manifest gap** | Login page only. |
| `loginBrainHeartStage` | Managed registry and published storage | Not recorded | **APPROVED screen-specific stage / published; manifest gap** | Login page only. |
| `landingOfficialLockup` | Managed registry and published storage | Not recorded | **APPROVED screen-specific stage / published; manifest gap** | Landing page only. |
| `landingAnatomyStage` | Managed registry and published storage | Not recorded | **APPROVED screen-specific stage / published; manifest gap** | Landing page only. |
| `landingBrainHeartStage` | Managed registry and published storage | Not recorded | **APPROVED screen-specific stage / published; manifest gap** | Landing page only. |
| `landingEmergencyResponseStage` | Managed registry and published storage | Not recorded | **APPROVED screen-specific stage / published; manifest gap** | Landing page only. |
| `landingMedicalAssistantStage` | Managed registry and published storage | Not recorded | **APPROVED screen-specific stage / published; manifest gap** | Landing page only. |
| `landingProfileThumbnail` | Managed registry and published storage | Not recorded | **APPROVED screen-specific stage / published; manifest gap** | Landing page only; it is not implicitly authorized for Pathway or Practice. |
| `atlasVisualAssetsHero` — `SEG_ATLAS_VISUAL_ASSETS_HERO_v1.0.png` | Atlas package `04_ATLAS_VISUAL_ASSETS/hero`; managed registry | v1.0 | **APPROVED / exists / checksum verified / published** | Existing Dashboard `#reference` Atlas identity stage only; not medical content or clinical guidance. |
| `medicalJournal` — `SEG_MedicalJournal_Reference_Final.png` | Standalone reference and managed registry | Not recorded | **REFERENCE ONLY / exists / published; restricted** | Visual comparison only. It is not a reusable Journal production UI asset or medical-content source. |

All locations marked **published** returned HTTP `200` after following the project storage redirect on `https://seg-guide-bjjkqn7t.manus.space`. The registry source is `client/src/lib/seg-assets.ts`; project-support source-file copies were additionally confirmed for the six production-aligned PNGs, the clean Dashboard core, and the standalone Medical Journal reference. [2] [3]

## 2. Manifest Verification — **FAIL (strict metadata completeness)**

The required authoritative registrations that *do* exist are valid:

| Verification Item | Result | Evidence |
|---|---|---|
| Production authority package and index available | **PASS** | The shared package exists; `SEG_FINAL_ASSET_INDEX_v1.0.json` identifies version `1.0` and the expected brand/medical files. [1] |
| Four explicitly organized shared production assets have checksum-bearing manifest records | **PASS** | `shared-assets-manifest.json` records source, version, approval, intended usage, destination, and SHA-256 for the primary logo, hero logo, brain-heart core, and anatomy hologram. [7] |
| Atlas hero has complete dedicated manifest record | **PASS** | Atlas manifest records its v1.0 source, approval, package location, managed URL, SHA-256, size, intended use, and restrictions. [8] |
| Every one of the 21 application registry entries has an individual canonical manifest with source, version, approval, and usage scope | **FAIL** | The application registry and prior inventory provide scope controls, but no separate canonical manifest was located for the two crops, clean Dashboard core, ten Login/Registration/Landing stages, or the standalone Medical Journal reference. [3] [4] |

The failed item is **documentation completeness only**. It must not be interpreted as approval to regenerate, replace, or alter any approved image.

## 3. Atlas Asset Verification — **PASS**

The approved display identity is consistently **Atlas & Visual Assets**, with the approved display-only structure **Anatomy**, **ECG**, **Imaging**, **Ultrasound** → **Point-of-Care Ultrasound (POCUS)**, **Critical Care**, and **Toxicology**. The internal Dashboard anchor remains `#reference`; no Atlas route was created. [8] [9]

| Atlas Check | Result | Evidence |
|---|---|---|
| Naming consistency | **PASS** | Current Dashboard implementation uses `Atlas & Visual Assets`; the retained `#reference` anchor is an architectural compatibility target rather than visible legacy naming. [9] |
| Hero registration | **PASS** | `atlasVisualAssetsHero` maps to the dedicated v1.0 manifest and managed asset URL. [2] [8] |
| File existence and integrity | **PASS** | The file exists at the registered package location, is `2,140,928` bytes, and matches SHA-256 `82a89a0ff66e4eb79976c93ff327ac41409f246d8cc41647fff856c43f2e7479`. [8] |
| No replacement or generated medical visual used for Atlas | **PASS** | The manifest constrains this exact approved identity image: do not modify, regenerate, or replace it. The dashboard code references that registered asset rather than a screenshot board. [8] [9] |
| Medical-content boundary preserved | **PASS** | The asset is expressly a visual identity only and is not a source of medical content, clinical guidance, or feature data. [8] |

## 4. Missing or Restricted Assets

No registered managed URL is missing or unresolved. The following restrictions and documentation gaps remain recorded without remediation, in line with the requested READ_ONLY scope.

| Category | Finding | Required Handling |
|---|---|---|
| Canonical metadata | The later approved crop/clean variants and Login, Registration, and Landing-specific stages lack per-file canonical manifests carrying every requested field. | Record only. Do not change manifests or files during this final check. |
| Dashboard clean core | The asset is live and scoped to My Home, but its version is not explicitly recorded in a separate JSON manifest. | Keep it restricted to the existing Professional Growth Core placement. |
| Medical Journal | The standalone image is a reference only, not an approved separated production asset, medical-content package, or reusable UI background. | Do not use it as interface content; future Journal assets remain separately governed. |
| Internal medical content | No new Anatomy, ECG, Imaging, Ultrasound/POCUS, Critical Care, or Toxicology content asset is implied by the Atlas hero. | Keep Atlas display-only until separately approved, source-governed content is delivered. |
| Drug Reference | Drug Reference remains explicitly excluded from final implementation and registry reuse. | Do not add, rename, or infer a replacement asset. [5] [6] |

## 5. Final Decision

# REMAINING ASSET GAPS

**Reason:** Strict registry verification cannot pass until the existing later approved crop/clean and screen-specific stage entries have canonical per-file metadata records for **source location, version, approval status, and usage scope**. The Atlas asset and the primary Production v1.0 brand/medical records pass their relevant checks.

This decision identifies a documentation and governance traceability gap only. It does **not** identify a broken published asset, an Atlas defect, an unauthorized replacement, a generated medical visual, or a need to reopen frozen UI implementation. No assets, manifests, images, code, routes, authentication, database, or security boundaries were changed in preparing this report.

## References

[1]: file:///home/ubuntu/projects/yarab-4d75d104/SEG_FINAL_VISUAL_ASSETS_PACKAGE_v1.0_PRODUCTION.zip "SEG Final Visual Assets Package v1.0 Production"  
[2]: file:///home/ubuntu/seg-phase1/client/src/lib/seg-assets.ts "Current SEG application visual asset registry"  
[3]: file:///home/ubuntu/seg-phase1/SEG_ASSET_INVENTORY.md "SEG visual asset inventory and scope controls"  
[4]: file:///home/ubuntu/seg-phase1/SEG_DASHBOARD_BRAIN_HEART_CORE_CLEAN_ASSET_REVIEW.md "Dashboard clean core approval record"  
[5]: file:///home/ubuntu/skills/seg-design-system/references/source-authority.md "SEG source authority and asset priority"  
[6]: file:///home/ubuntu/projects/yarab-4d75d104/SEG_DESIGN_SYSTEM.md "SEG Design System Authority"  
[7]: file:///home/ubuntu/webdev-static-assets/SEG_SHARED_APPROVED_ASSETS_v1.0/03_METADATA/shared-assets-manifest.json "Shared approved assets manifest"  
[8]: file:///home/ubuntu/webdev-static-assets/SEG_INTERNAL_SECTIONS_ASSET_PACKAGE_v1.0/04_ATLAS_VISUAL_ASSETS/asset-manifest.json "Atlas & Visual Assets v1.0 manifest"  
[9]: file:///home/ubuntu/seg-phase1/SEG_ATLAS_VISUAL_ASSETS_UPDATE_REPORT.md "Atlas identity registration and architecture validation"
