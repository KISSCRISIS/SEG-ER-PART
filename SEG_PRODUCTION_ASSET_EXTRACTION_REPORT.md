# SEG Production Asset Extraction Report

**Mode:** `READ_ONLY`  
**Source authority:** Production v1.0 → supplementary reference v1.3  
**File operations:** `NONE`  
**Decision:** `SEPARATED CORE ASSETS AVAILABLE / INTERNAL-SCREEN ASSET LIBRARIES MISSING`

## Status

The two requested archives contain only **PNG** and a small number of **JPG** visual files. Neither package contains SVG or WEBP files. The primary production package contains seven named, separated brand/medical PNG entries in its authoritative `01_BRAND_IDENTITY` and `02_MEDICAL_VISUAL_ASSETS` directories; one of these is a logo-guidelines board rather than a deployable visual. The supplementary package duplicates two logos and two medical visuals, but it is lower-priority and adds no authority over Production v1.0.

The production archive also contains nine approved full-screen references, index/collection boards, generated reference boards, and five unclassified JPG files. These are **not** eligible as implementation assets because they are screen references, guidance boards, or unclassified material. No discrete icon library, background-layer library, or section-specific visual set was found for Learn, My Pathway, Practice, or Medical Journal.

## Evidence

| Check | Result |
|---|---|
| Production visual file count | 28 PNG and 5 JPG entries, including duplicate/wrapper and reference-board material. |
| Supplementary visual file count | 15 PNG entries. |
| SVG files | 0 in Production v1.0; 0 in supplementary v1.3. |
| WEBP files | 0 in Production v1.0; 0 in supplementary v1.3. |
| Separated authoritative brand/medical inventory | 3 PNG entries in `01_BRAND_IDENTITY`, including one guidelines board; 4 PNG entries in `02_MEDICAL_VISUAL_ASSETS`. |
| Full-screen/board reference inventory | 20 Production screen/index/generated-board images and 10 supplementary screen/documentation images. |
| Transparent PNG verification | PNG alpha-channel metadata is verified for `SEG_Primary_Logo_Approved.png` and `SEG_Human_Anatomy_Hologram.png`; the other separated PNGs use true-colour type without an embedded alpha channel. |

## 1. AVAILABLE FOR REUSE

| Asset | Type | Alpha status | Primary source | Supplementary duplicate | Approved reuse classification |
|---|---|---|---|---|---|
| `SEG_Primary_Logo_Approved.png` | PNG logo | **Embedded alpha channel verified** | Production v1.0 / `01_BRAND_IDENTITY` | Yes / `01_BRAND_ASSETS` | Available for approved SEG brand placements. |
| `SEG_Hero_Logo_Heart_Brain_ECG_Approved.png` | PNG hero lockup | No embedded alpha channel | Production v1.0 / `01_BRAND_IDENTITY` | Yes / `01_BRAND_ASSETS` | Available only in reference-consistent Hero/Auth placements. |
| `SEG_Brain_Heart_Intelligence_Core.png` | PNG medical visual | No embedded alpha channel | Production v1.0 / `02_MEDICAL_VISUAL_ASSETS` | No | Available only where approved references specify the core. |
| `SEG_Human_Anatomy_Hologram.png` | PNG medical visual | **Embedded alpha channel verified** | Production v1.0 / `02_MEDICAL_VISUAL_ASSETS` | No | Available for approved hologram placements; not a generic substitute for missing internal assets. |
| `SEG_Medical_AI_Assistant.png` | PNG medical visual | No embedded alpha channel | Production v1.0 / `02_MEDICAL_VISUAL_ASSETS` | Yes / `04_MEDICAL_VISUALS` | Available only in approved contexts. |
| `SEG_Emergency_Response_Visual.png` | PNG medical visual | No embedded alpha channel | Production v1.0 / `02_MEDICAL_VISUAL_ASSETS` | Yes / `04_MEDICAL_VISUALS` | Available only in approved contexts. |

> **Source-ownership boundary:** “Available for reuse” means the named source file is physically present in the primary production authority. It does **not** authorize arbitrary placement, copying, modification, or use in a screen whose reference does not specify it. No legal copyright/licence record was found in these archive inventories.

## 2. REFERENCE ONLY

| Asset group | Source | Classification rationale |
|---|---|---|
| Nine full-screen screen references: Login, My Home, My Pathway, Learn, Practice, Drug Reference, Landing, Registration, and Medical Journal | Production v1.0 / `04_SCREEN_REFERENCES` | Visual blueprints only. They must not be embedded, cropped, sliced, extracted, or treated as production UI layers. |
| `SEG_OFFICIAL_SCREEN_REFERENCES_OVERVIEW_v01.png` and the reference-collection preview | Production v1.0 | Index/collection boards, not assets. |
| `SEG_Logo_Guidelines_Board.png` | Production v1.0 and supplementary v1.3 | Guidelines board, not a deployable logo. |
| Production generated visual boards and posters | Production v1.0 / `SEG_GENERATED_VISUAL_ASSETS_READY_v1.0` | Visual authority/catalog/freezing documentation, not discrete UI assets. |
| `SEG_Final_Visual_Overview_Generated.png` and `SEG_Final_Visual_Map_Generated.png` | Supplementary v1.3 / `05_DOCUMENTATION` | Documentation/reference material only. |
| Supplementary auth/application screen PNGs | Supplementary v1.3 / `02_AUTHENTICATION` and `03_APPLICATION_SCREENS` | Lower-priority screen reference copies; do not replace Production v1.0 sources. |
| Five root-level production JPGs: `5967776819672977447_121.jpg`, `5967776819672977472_121.jpg`, `5967776819672977473_121.jpg`, `Copilot_20260720_235304.jpg`, and `seg_premium_ui_mockup (3).jpg` | Production archive root | Not listed in `SEG_FINAL_ASSET_INDEX_v1.0.json` as approved asset inventory entries; do not use without a separate authority decision. |
| Drug Reference screen reference | Production v1.0 / `04_SCREEN_REFERENCES/06_DRUG_REFERENCE` | Reference only and additionally **not final approved**; redesign/approval remains mandatory. |

## 3. MISSING

| Needed asset class | Result | Affected scope |
|---|---|---|
| SVG icon files | Missing | All internal sections; no SVG exists in either requested archive. |
| WEBP assets | Missing | All sections; no WEBP exists in either requested archive. |
| Discrete Learn hero/module/icon/background/UI files | Missing | Learn. |
| Discrete My Pathway journey/milestone/progress/icon/UI files | Missing | My Pathway. |
| Discrete Practice case/scenario/skills/icon/UI files | Missing | Practice. Drug Reference remains excluded. |
| Discrete Medical Journal brand, hero, article, icon, background, illustration, and UI-state files | Missing | Medical Journal. |
| Separated background-layer library | Missing | No independently approved PNG/SVG/WEBP background layer set was found; source boards do not qualify. |
| Production icon library | Missing | No approved physical icon set was found. |
| Asset placement manifest and licence/ownership metadata | Missing | All future copy/reuse decisions. |

## Transparent Asset Finding

Only two separated production PNGs have a verified embedded alpha channel: the primary logo and human anatomy hologram. The hero lockup, logo-guidelines board, brain/heart core, emergency response visual, and medical AI visual encode true-colour PNG data without an embedded alpha channel. The audit did not decode palette-level transparency because these files were inspected directly from their archives without extraction; none should be modified or preprocessed under this mode.

## Source Priority

| Priority | Source package | Audit use |
|---:|---|---|
| 1 | `SEG_FINAL_VISUAL_ASSETS_PACKAGE_v1.0_PRODUCTION` | Sole authority for reusable named Production assets and screen visual decisions. |
| 2 | `SEG_FINAL_VISUAL_REFERENCE_PACKAGE_COMPLETE_v1.3` | Supplementary browsing/reference source only; it confirms duplicates but cannot override Production v1.0. |

## Final Result

`AVAILABLE FOR REUSE: 6 approved separated production visual files`  
`REFERENCE ONLY: all screen captures, boards, indexes, documentation images, unindexed JPGs, and Drug Reference material`  
`MISSING: all internal-section-specific discrete assets, SVG icons, WEBP assets, background layers, placement manifests, and ownership/licence metadata`

No file was copied, extracted to a destination, modified, or used in implementation.
