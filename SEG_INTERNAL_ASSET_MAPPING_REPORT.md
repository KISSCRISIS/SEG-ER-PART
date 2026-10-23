# SEG Internal Asset Mapping Report

**Mode:** `READ_ONLY / ASSET ORGANIZATION ASSESSMENT`  
**Input package:** `SEG_INTERNAL_SECTIONS_ASSET_PACKAGE_v1.0.zip`  
**Source authority:** Production v1.0 → SEG Design System → supplementary reference v1.3  
**File operations:** `NONE`  
**Decision:** `MAPPING PLAN READY / APPLY OPERATION DEFERRED`

## Status

The uploaded archive is structurally valid and contains the requested target folders and four manifests. It contains **no visual asset files**: the only non-directory entries are the four JSON manifests. Each manifest is explicitly at `asset_intake`, marks every required asset group `pending`, and says `blocked_until_approval`.

The approved source packages do contain shared SEG brand/medical assets and full-screen reference images. However, the source authority does not authorize a target-specific placement for those shared assets in Learn, My Pathway, Practice, or Medical Journal. Full-screen references are comparison material only and must never be copied, sliced, cropped, or embedded as UI. Accordingly, this report maps only verifiable statuses; it does **not** create speculative asset placements.

## Package Structure

| Destination root | Required subfolders found | Existing asset files | Manifest state |
|---|---|---:|---|
| `01_LEARN_ASSETS` | `backgrounds`, `hero`, `icons`, `modules`, `ui` | 0 | Learn: all groups `pending` |
| `02_PATHWAY_ASSETS` | `icons`, `journey`, `milestones`, `progress`, `ui` | 0 | My Pathway: all groups `pending` |
| `03_PRACTICE_ASSETS` | `cases`, `icons`, `scenarios`, `skills`, `ui` | 0 | Practice: all groups `pending` |
| `04_MEDICAL_JOURNAL_ASSETS` | `articles`, `backgrounds`, `brand`, `hero`, `icons`, `ui` | 0 | Medical Journal: all groups `pending` |
| `05_MANIFESTS` | Four section manifests | 4 JSON files | Present, pre-mapping state |
| `06_APPROVAL_RECORDS` | Folder only | 0 | No approval record included |

## Source-to-Destination Mapping

> `AVAILABLE` means an actual approved source file exists. It does not by itself authorize a copy into a screen-specific folder. `REFERENCE_ONLY` means a visual reference exists but is prohibited from implementation use. `MISSING` means no approved, separated source file was found for the destination asset need.

| Asset / asset need | Source | Proposed destination | Status | Mapping decision |
|---|---|---|---|---|
| Shared SEG primary logo | Production v1.0: `01_BRAND_IDENTITY/SEG_Primary_Logo_Approved.png` | No target-specific copy; retain as shared Dashboard/brand registry asset | AVAILABLE | Existing shared asset; no evidence authorizes duplicating it as a replacement for a section-specific brand. |
| Shared SEG Hero lockup | Production v1.0: `01_BRAND_IDENTITY/SEG_Hero_Logo_Heart_Brain_ECG_Approved.png` | No target-specific copy | AVAILABLE | Restricted to approved hero/auth use; do not infer internal-screen placement. |
| Shared Brain/Heart core | Production v1.0: `02_MEDICAL_VISUAL_ASSETS/SEG_Brain_Heart_Intelligence_Core.png` | No target-specific copy | AVAILABLE | Existing approved core asset; no reference-backed mapping into the four requested folders. |
| Shared anatomy hologram | Production v1.0: `02_MEDICAL_VISUAL_ASSETS/SEG_Human_Anatomy_Hologram.png` | No target-specific copy | AVAILABLE | No evidence authorizes use as a Learn/Pathway/Practice/Journal replacement. |
| Shared Medical AI visual | Production v1.0: `02_MEDICAL_VISUAL_ASSETS/SEG_Medical_AI_Assistant.png` | No target-specific copy | AVAILABLE | No screen-specific placement authority in the internal references. |
| Shared Emergency Response visual | Production v1.0: `02_MEDICAL_VISUAL_ASSETS/SEG_Emergency_Response_Visual.png` | No target-specific copy | AVAILABLE | No screen-specific placement authority in the internal references. |
| Learn complete screen | Production v1.0: `04_SCREEN_REFERENCES/04_LEARN/SEG_Learn_Approved_Reference.png`; v1.3 duplicate reference | `01_LEARN_ASSETS/*` | REFERENCE_ONLY | Full-screen blueprint only; never copy into implementation assets. |
| Learn hero, module illustrations, icons, backgrounds, UI states | No separated source files found in authorized packages | `01_LEARN_ASSETS/{hero,modules,icons,backgrounds,ui}` | MISSING | Await source-authorized discrete files and placement manifest. |
| My Pathway complete screen | Production v1.0: `04_SCREEN_REFERENCES/03_MY_PATHWAY/SEG_MyPathway_Approved_Reference.png`; v1.3 duplicate reference | `02_PATHWAY_ASSETS/*` | REFERENCE_ONLY | Full-screen blueprint only; no extraction/cropping permitted. |
| Journey, milestones, progress, icons, UI states | No separated source files found in authorized packages | `02_PATHWAY_ASSETS/{journey,milestones,progress,icons,ui}` | MISSING | Await approved discrete assets and placement data. |
| Practice complete screen | Production v1.0: `04_SCREEN_REFERENCES/05_PRACTICE/SEG_Practice_Visual_Reference.png`; v1.3 duplicate reference | `03_PRACTICE_ASSETS/*` | REFERENCE_ONLY | Full-screen blueprint only; Drug Reference remains excluded. |
| Cases, scenarios, skills, icons, UI states | No separated source files found in authorized packages | `03_PRACTICE_ASSETS/{cases,scenarios,skills,icons,ui}` | MISSING | Await approved discrete files; no Drug Reference content may be added. |
| Medical Journal complete screen | Production v1.0: `04_SCREEN_REFERENCES/09_MEDICAL_JOURNAL/SEG_MedicalJournal_Reference.png` | `04_MEDICAL_JOURNAL_ASSETS/*` | REFERENCE_ONLY | Full-screen blueprint only; it is not a production asset set. |
| Medical Journal logo, hero imagery, articles, icon SVGs, backgrounds, UI states | Medical Journal V2 board identifies the needs, but no individual source archive is present | `04_MEDICAL_JOURNAL_ASSETS/{brand,hero,articles,icons,backgrounds,ui}` | MISSING | Await actual files, an authoritative manifest, rights metadata, and placement mapping. |

## Manifest Update Assessment

No manifest has been updated. The requested archive remains unchanged because the current mode is READ_ONLY and every asset-group value remains factually `pending`. Changing any value to `available` without copying a verified source file or attaching source metadata would make the manifests inaccurate.

| Manifest | Current state | Correct READ_ONLY action |
|---|---|---|
| `learn-manifest.json` | `asset_intake`; all asset groups pending | Preserve unchanged. |
| `pathway-manifest.json` | `asset_intake`; all asset groups pending | Preserve unchanged. |
| `practice-manifest.json` | `asset_intake`; all asset groups pending | Preserve unchanged; retain Drug Reference exclusion. |
| `journal-manifest.json` | `asset_intake`; all asset groups pending | Preserve unchanged until individual Medical Journal files and manifest metadata are delivered. |

## Required Preconditions to Apply Mapping

1. The user must issue `EXECUTE_APPROVED` explicitly for asset organization, because applying the requested mapping requires copying files and editing manifests.
2. Each copy must have a target-specific source/placement approval; shared assets may not be duplicated simply because they exist.
3. The source package must provide missing discrete files for each internal screen. Reference screenshots remain non-copyable.
4. Each manifest update must record original filename, source package, source version, destination, status, and authority/approval record.
5. The work must remain limited to package organization; it must not alter application code, routes, authentication, database, security, or UI behavior.

## Result

`AVAILABLE SHARED ASSETS IDENTIFIED / SCREEN-SPECIFIC ASSET MAPPING BLOCKED`

The target folder structure is ready for a future apply operation, but there are no eligible target-specific assets to copy into it under the current authority. The accurate current mapping is therefore shared assets retained in their existing registry, screen references classified as `REFERENCE_ONLY`, and all requested internal-screen asset groups classified as `MISSING`.
