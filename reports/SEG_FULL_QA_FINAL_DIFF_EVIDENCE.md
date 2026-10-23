# SEG Full QA — Final Diff Evidence

Captured: 2026-08-22T16:41:24Z
Branch: main
HEAD: 47f1fff5a1c82820cc772a10b162a5920f3a3333

## Tracked diff stat
 client/src/App.tsx                             |  3 [32m++[m
 client/src/components/DashboardLayout.test.tsx | 26 [32m++++++++[m[31m--[m
 client/src/components/ErrorBoundary.tsx        | 20 [32m++++++[m[31m--[m
 client/src/index.css                           | 10 [32m++++[m
 client/src/lib/seg-navigation.test.ts          | 19 [32m++++++[m[31m--[m
 client/src/lib/seg-navigation.ts               | 14 [32m+++++[m[31m-[m
 client/src/pages/Home.test.tsx                 | 47 [32m++++++++++++++[m[31m----[m
 client/src/pages/Home.tsx                      |  2 [32m+[m[31m-[m
 scripts/audit-final-package.test.ts            | 67 [32m++++++++++++++++++[m[31m--------[m
 9 files changed, 162 insertions(+), 46 deletions(-)

## Tracked changed names
client/src/App.tsx
client/src/components/DashboardLayout.test.tsx
client/src/components/ErrorBoundary.tsx
client/src/index.css
client/src/lib/seg-navigation.test.ts
client/src/lib/seg-navigation.ts
client/src/pages/Home.test.tsx
client/src/pages/Home.tsx
scripts/audit-final-package.test.ts

## Untracked names (first 240)
 [31mM[m client/src/App.tsx
 [31mM[m client/src/components/DashboardLayout.test.tsx
 [31mM[m client/src/components/ErrorBoundary.tsx
 [31mM[m client/src/index.css
 [31mM[m client/src/lib/seg-navigation.test.ts
 [31mM[m client/src/lib/seg-navigation.ts
 [31mM[m client/src/pages/Home.test.tsx
 [31mM[m client/src/pages/Home.tsx
 [31mM[m scripts/audit-final-package.test.ts
[31m??[m SEG_EVIDENCE_LANDING_WAVE1_1280x720.png
[31m??[m SEG_EVIDENCE_LANDING_WAVE1_1280x720_AFTER_NOOP.png
[31m??[m SEG_EVIDENCE_LANDING_WAVE1_390x844_AFTER_NOOP.png
[31m??[m SEG_FINAL_STAGING_APPROVAL_REPORT.md
[31m??[m SEG_FINAL_STAGING_RECHECK_REPORT.md
[31m??[m SEG_GIT_ADD_VALIDATION_REPORT.md
[31m??[m SEG_LEGACY_KNOWLEDGE_AUDIT_STRUCTURE.txt
[31m??[m SEG_PHASE_7_4_IMPLEMENTATION_REPORT.md
[31m??[m SEG_PHASE_7_8_5_LEGACY_ASSET_HASHES.tsv
[31m??[m SEG_PHASE_7_8_5_LEGACY_ASSET_STRUCTURE.txt
[31m??[m SEG_PHASE_7_8_5_LEGACY_METADATA_ANALYSIS.stdout
[31m??[m SEG_PHASE_7_8_5_LEGACY_METADATA_ANALYSIS.txt
[31m??[m SEG_PHASE_7_8_6_TAXONOMY_EVIDENCE.txt
[31m??[m SEG_POST_COMMIT_VALIDATION_REPORT.md
[31m??[m SEG_POST_PUSH_VERIFICATION_REPORT.md
[31m??[m SEG_PRE_COMMIT_VALIDATION_REPORT.md
[31m??[m SEG_UI_PATCH1_BASELINE_NOTES.md
[31m??[m SEG_UI_PATCH1_EVIDENCE/baseline-contact-sheet.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/baseline/landing-320x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/baseline/landing-360x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/baseline/landing-390x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/baseline/landing-430x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/baseline/login-320x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/baseline/login-360x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/baseline/login-390x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/baseline/login-430x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/baseline/register-320x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/baseline/register-360x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/baseline/register-390x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/baseline/register-430x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark-contact-sheet.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark/landing-320x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark/landing-360x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark/landing-390x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark/landing-430x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark/login-320x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark/login-360x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark/login-390x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark/login-430x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark/metrics.json
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark/register-320x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark/register-360x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark/register-390x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/dark/register-430x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/light-contact-sheet.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/light/landing-320x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/light/landing-360x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/light/landing-390x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/light/landing-430x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/light/login-320x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/light/login-360x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/light/login-390x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/light/login-430x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/light/metrics.json
[31m??[m SEG_UI_PATCH1_EVIDENCE/light/register-320x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/light/register-360x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/light/register-390x844.png
[31m??[m SEG_UI_PATCH1_EVIDENCE/light/register-430x844.png
[31m??[m SEG_UI_PATCH1_IMPLEMENTATION_REPORT.md
[31m??[m analyze_legacy_knowledge_audit.py
[31m??[m analyze_phase_7_8_12_content_intelligence.py
[31m??[m analyze_phase_7_8_5_legacy_assets.py
[31m??[m analyze_phase_7_8_5_legacy_metadata.py
[31m??[m analyze_phase_7_8_7_legacy_object_crosswalk.py
[31m??[m analyze_phase_7_8_9_identity_evidence.py
[31m??[m analyze_updated_source_package.py
[31m??[m client/src/components/laboratory/LaboratoryCard.tsx
[31m??[m client/src/components/laboratory/LaboratoryDashboard.tsx
[31m??[m client/src/components/laboratory/LaboratorySearch.tsx
[31m??[m client/src/components/laboratory/TestDetails.tsx
[31m??[m client/src/pages/LaboratoryPage.test.tsx
[31m??[m client/src/pages/LaboratoryPage.tsx
[31m??[m compare_updated_package_content.py
[31m??[m extract_phase_7_8_6_taxonomy_evidence.py
[31m??[m extract_phase_7_8_9_relationships.py
[31m??[m generate_legacy_knowledge_audit_reports.py
[31m??[m generate_phase_7_7_6_reports.py
[31m??[m generate_phase_7_8_11_reports.py
[31m??[m generate_phase_7_8_12_reports.py
[31m??[m generate_phase_7_8_13_reports.py
[31m??[m generate_phase_7_8_14_reports.py
[31m??[m generate_phase_7_8_5_reports.py
[31m??[m generate_phase_7_8_6_evidence_reports.py
[31m??[m generate_phase_7_8_6_reports.py
[31m??[m generate_phase_7_8_7_object_crosswalk_reports.py
[31m??[m generate_phase_7_8_8_identity_bridge_reports.py
[31m??[m generate_phase_7_8_9_identity_evidence_report.py
[31m??[m generate_phase_7_8_artifacts.py
[31m??[m inspect_phase_7_8_7_crosswalk_inputs.py
[31m??[m phase_7_5_to_7_8_14_artifact_names.txt
[31m??[m phase_7_8_10_content_overlap.md
[31m??[m phase_7_8_10_updated_source_intake/INTAKE_FINDINGS.md
[31m??[m phase_7_8_10_updated_source_intake/sha256_manifest.txt
[31m??[m "phase_7_8_10_updated_source_intake/\330\247\330\263\330\246\331\204\331\207 +\330\247\331\204\330\264\330\261\330\255 \330\250\330\247\331\204\330\271\330\261\330\250\331\212/FRCEM_High_Yield_Study_Book.txt"
[31m??[m "phase_7_8_10_updated_source_intake/\330\247\330\263\330\246\331\204\331\207 +\330\247\331\204\330\264\330\261\330\255 \330\250\330\247\331\204\330\271\330\261\330\250\331\212/HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt"
[31m??[m "phase_7_8_10_updated_source_intake/\330\247\330\263\330\246\331\204\331\207 +\330\247\331\204\330\264\330\261\330\255 \330\250\330\247\331\204\330\271\330\261\330\250\331\212/frcem All_Chapters_Questions_and_Explanations_Full.txt"
[31m??[m "phase_7_8_10_updated_source_intake/\331\203\330\252\330\250 \330\271\331\204\330\247\330\241 \331\206\330\265 \330\257\330\261\330\247\330\263\331\212/1400q_Study_Guide_UTF8.txt"
[31m??[m "phase_7_8_10_updated_source_intake/\331\203\330\252\330\250 \330\271\331\204\330\247\330\241 \331\206\330\265 \330\257\330\261\330\247\330\263\331\212/Emergency_Oxford_Essentials.pdf"
[31m??[m "phase_7_8_10_updated_source_intake/\331\203\330\252\330\250 \330\271\331\204\330\247\330\241 \331\206\330\265 \330\257\330\261\330\247\330\263\331\212/FRCEM_High_Yield_Study_Book.txt"
[31m??[m "phase_7_8_10_updated_source_intake/\331\203\330\252\330\250 \330\271\331\204\330\247\330\241 \331\206\330\265 \330\257\330\261\330\247\330\263\331\212/FRCEM_High_Yield_Study_Book_Colored.pdf"
[31m??[m "phase_7_8_10_updated_source_intake/\331\203\330\252\330\250 \330\271\331\204\330\247\330\241 \331\206\330\265 \330\257\330\261\330\247\330\263\331\212/FRCEM_High_Yield_Study_Book_Editable.docx"
[31m??[m "phase_7_8_10_updated_source_intake/\331\203\330\252\330\250 \330\271\331\204\330\247\330\241 \331\206\330\265 \330\257\330\261\330\247\330\263\331\212/HIPPO_High_Yield_Study_Book.txt"
[31m??[m "phase_7_8_10_updated_source_intake/\331\203\330\252\330\250 \330\271\331\204\330\247\330\241 \331\206\330\265 \330\257\330\261\330\247\330\263\331\212/HIPPO_High_Yield_Study_Book_Colored.pdf"
[31m??[m "phase_7_8_10_updated_source_intake/\331\203\330\252\330\250 \330\271\331\204\330\247\330\241 \331\206\330\265 \330\257\330\261\330\247\330\263\331\212/HIPPO_High_Yield_Study_Book_Editable.docx"
[31m??[m "phase_7_8_10_updated_source_intake/\331\203\330\252\330\250 \330\271\331\204\330\247\330\241 \331\206\330\265 \330\257\330\261\330\247\330\263\331\212/pretestnew_Study_Guide_UTF8.txt"
[31m??[m phase_7_8_10_updated_source_inventory_comparison.md
[31m??[m phase_7_8_12_content_intelligence_raw.json
[31m??[m phase_7_8_12_content_intelligence_raw.md
[31m??[m phase_7_8_12_content_intelligence_stdout.json
[31m??[m phase_7_8_6_evidence_findings.md
[31m??[m phase_7_8_6_evidence_package/CONTENT_SOURCES.md
[31m??[m phase_7_8_6_evidence_package/EM_MASTER_TEXTBOOK_ARABIC_COMPLETION.md
[31m??[m phase_7_8_6_evidence_package/EM_MASTER_TEXTBOOK_BUILD.md
[31m??[m phase_7_8_6_evidence_package/FINAL_MEDICAL_CONTENT_AUDIT.md
[31m??[m phase_7_8_6_evidence_package/FINAL_SCOPE.md
[31m??[m phase_7_8_6_evidence_package/PDF_VISUAL_MAPPING_SYSTEM.md
[31m??[m phase_7_8_7_legacy_object_crosswalk.tsv
[31m??[m phase_7_8_7_legacy_object_crosswalk_summary.md
[31m??[m phase_7_8_9_candidate_files.txt
[31m??[m phase_7_8_9_identity_evidence_hits.txt
[31m??[m phase_7_8_9_identity_evidence_raw_analysis.md
[31m??[m phase_7_8_9_legacy_file_inventory.txt
[31m??[m phase_7_8_9_relationship_inventory.md
[31m??[m phase_architecture_artifact_names.txt
[31m??[m phase_repo_status_snapshot.txt
[31m??[m phase_repo_upload_audit.json
[31m??[m phase_root_artifact_names.txt
[31m??[m scripts/capture_ui_patch1_cdp.mjs
[31m??[m scripts/make_ui_patch1_contact_sheet.py
[31m??[m scripts/make_ui_patch1_post_sheets.py
[31m??[m scripts/summarize_ui_patch1_metrics.py
[31m??[m seg_origin_evidence.txt
[31m??[m seg_phase_7_7_6_input_parser.py
[31m??[m seg_phase_7_7_6_provenance_audit.py
[31m??[m validate_phase_7_7_6_reports.py
[31m??[m validate_phase_7_8_5_reports.py
[31m??[m validate_phase_7_8_6_evidence_reports.py
[31m??[m validate_phase_7_8_6_reports.py
[31m??[m validate_phase_7_8_7_reports.py
[31m??[m validate_phase_7_8_artifacts.py
[31m??[m validate_phase_7_8_review_report.py

## Current-task touched source paths
tracked-diff | client/src/App.tsx
tracked-diff | client/src/index.css
tracked-diff | client/src/components/ErrorBoundary.tsx
tracked-diff | client/src/components/DashboardLayout.test.tsx
tracked-diff | client/src/lib/seg-navigation.ts
tracked-diff | client/src/lib/seg-navigation.test.ts
tracked-diff | client/src/pages/Home.tsx
tracked-diff | client/src/pages/Home.test.tsx
unmodified-or-preexisting | client/src/pages/LaboratoryPage.tsx
unmodified-or-preexisting | client/src/pages/LaboratoryPage.test.tsx
unmodified-or-preexisting | client/src/components/laboratory/LaboratoryCard.tsx
unmodified-or-preexisting | client/src/components/laboratory/LaboratoryDashboard.tsx
unmodified-or-preexisting | client/src/components/laboratory/LaboratorySearch.tsx
unmodified-or-preexisting | client/src/components/laboratory/TestDetails.tsx
tracked-diff | scripts/audit-final-package.test.ts

## Forbidden architecture/data paths changed by current-task diff
NONE_IN_TRACKED_DIFF

## Diff whitespace
EXIT_CODE=0
