# SEG GitHub Upload Manifest

**المشروع:** Smart Emergency Guide (SEG)
**الوضع:** Read-only repository sync preparation
**المستودع:** `https://github.com/KISSCRISIS/manus.git`
**الفرع:** `main`
**التقرير:** جرد قبل أي commit أو push

## القرار النهائي

> **UPLOAD_MANIFEST_READY**

هذا التقرير يحدد حدود الرفع الآمن فقط. لم يتم تنفيذ `git add` أو staging أو commit أو push أو delete أو rename أو source replacement. الملفات المصنفة `REQUIRED_TO_UPLOAD` تحتاج إلى مراجعة staged-file list وsecret scan ثم تفويض مستقل قبل النشر.

## الحالة الحالية للمستودع

| البند | النتيجة |
|---|---|
| Repository root | `/home/ubuntu/seg-manus-status` |
| Branch | `main` |
| Local HEAD | `738b33d902594387ca4f6b01c6e350bb8b7ab37b` |
| Remote | `https://github.com/KISSCRISIS/manus.git` |
| Tracked files | `895` |
| Modified أو staged files | `0` |
| Untracked files في snapshot | `130` |
| Upload audit scanned files | `1,028` |
| Secret matches | `0` |
| Upload audit status | `REVIEW_REQUIRED` بسبب ثلاثة `.manus-logs` forbidden paths |

المسارات المحظورة التي يجب ألا ترفع هي `.manus-logs/browserConsole.log` و`.manus-logs/networkRequests.log` و`.manus-logs/sessionReplay.log`. لم تُحذف أو تُعدّل هذه الملفات؛ تصنيفها `DO_NOT_UPLOAD`.

## قواعد التصنيف ومواقع Git المقترحة

| التصنيف | المعنى |
|---|---|
| `REQUIRED_TO_UPLOAD` | artifact حوكمي أو معماري أو phase report يجب حفظه في المستودع، أو artifact موجود أصلًا في المستودع ويجب الحفاظ عليه. |
| `OPTIONAL_ARCHIVE` | evidence مفيد للتدقيق أو إعادة الإنتاج، لكنه لا ينبغي أن يدخل main repository افتراضيًا؛ يحفظ في continuity/restricted archive بعد rights وsize review. |
| `DO_NOT_UPLOAD` | ملفات مؤقتة أو أسرار أو logs أو builds أو scripts محلية أو duplicates أو raw copyrighted sources غير المصرح بنشرها. |

الموقع المقترح لتقارير المحتوى هو `docs/SEG-CONTENT/PHASES/7.5-7.8/`. ويقترح وضع source registries في `docs/SEG-CONTENT/SOURCE_REGISTRY/`، وأدلة TSV/checksum في `docs/SEG-CONTENT/EVIDENCE/`، والعقود والمعمارية في `docs/SEG-CONTENT/ARCHITECTURE/`، وتقارير الحوكمة والبوابات في `docs/SEG-GOVERNANCE/PHASES/`، مع إبقاء v1.1 schema في `schemas/SEG_CONTENT_RECORD_V1_1/`.

## الملفات المطلوبة للرفع: Phase 7.5–7.8.14

جميع الملفات التالية موجودة حاليًا في `/home/ubuntu/seg-internship-output/` خارج root المستودع. هذه هي مجموعة phase artifacts التي يجب حفظها، مع نقلها لاحقًا فقط بعد تفويض publication منفصل.

| الملف | التصنيف | سبب الحفظ | Git location المقترح |
|---|---|---|---|
| `SEG_PHASE_7_5_CONTENT_MAPPING_DRY_RUN_REPORT.md` | `REQUIRED_TO_UPLOAD` | سجل mapping dry-run الأول للمحتوى الحقيقي | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_5_CONTENT_MAPPING_REGISTER.tsv` | `REQUIRED_TO_UPLOAD` | evidence tabular للـ48 candidate mapping | `docs/SEG-CONTENT/EVIDENCE/` |
| `SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv` | `REQUIRED_TO_UPLOAD` | source IDs وSHA وlineage وtarget types | `docs/SEG-CONTENT/EVIDENCE/` |
| `SEG_PHASE_7_6_GATE_REPORT.md` | `REQUIRED_TO_UPLOAD` | gate report لـcandidate generation preparation | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_6_METADATA_CLOSURE_REGISTER.md` | `REQUIRED_TO_UPLOAD` | metadata closure baseline | `docs/SEG-CONTENT/SOURCE_REGISTRY/` |
| `SEG_PHASE_7_7_CONTENT_EXTRACTION_REGISTER.md` | `REQUIRED_TO_UPLOAD` | extraction lineage قبل medical review | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_7_GATE_REPORT.md` | `REQUIRED_TO_UPLOAD` | extraction gate evidence | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_7_MEDICAL_QA_QUEUE.md` | `REQUIRED_TO_UPLOAD` | medical QA queue مع إبقاء approval pending | `docs/SEG-CONTENT/REVIEW/` |
| `SEG_PHASE_7_7_5_MEDICAL_OWNER_REVIEW_REGISTER.md` | `REQUIRED_TO_UPLOAD` | owner review preparation register | `docs/SEG-CONTENT/REVIEW/` |
| `SEG_PHASE_7_7_5_CLINICAL_QA_QUEUE.md` | `REQUIRED_TO_UPLOAD` | clinical QA handoff queue | `docs/SEG-CONTENT/REVIEW/` |
| `SEG_PHASE_7_7_5_GATE_REPORT.md` | `REQUIRED_TO_UPLOAD` | medical owner review preparation gate | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_7_6_FINAL_MEDICAL_OWNER_DECISION.md` | `REQUIRED_TO_UPLOAD` | final educational classification baseline | `docs/SEG-CONTENT/REVIEW/` |
| `SEG_PHASE_7_7_6_CLINICAL_QA_CLOSURE_REGISTER.md` | `REQUIRED_TO_UPLOAD` | QA closure and unresolved review states | `docs/SEG-CONTENT/REVIEW/` |
| `SEG_PHASE_7_7_6_GATE_REPORT.md` | `REQUIRED_TO_UPLOAD` | gate closure before import preparation | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_8_IMPORT_PREPARATION_MAP.md` | `REQUIRED_TO_UPLOAD` | 48-candidate preparation map | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_8_JSON_BLUEPRINT.md` | `REQUIRED_TO_UPLOAD` | template-only blueprint; no production JSON | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_PHASE_7_8_FIELD_MAPPING_VALIDATION.md` | `REQUIRED_TO_UPLOAD` | MISSING/PENDING/UNRESOLVED field contract | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_PHASE_7_8_DUPLICATE_HANDLING_PLAN.md` | `REQUIRED_TO_UPLOAD` | duplicate lineage and no-merge policy | `docs/SEG-CONTENT/GOVERNANCE/` |
| `SEG_PHASE_7_8_REVIEW_VALIDATION_REPORT.md` | `REQUIRED_TO_UPLOAD` | governance validation of import preparation | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_8_GATE_REPORT.md` | `REQUIRED_TO_UPLOAD` | import preparation gate and blockers | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_8_5_ID_COMPATIBILITY_DECISION.md` | `REQUIRED_TO_UPLOAD` | controlled ID strategy decision | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_PHASE_7_8_5_METADATA_STATE_CLOSURE.md` | `REQUIRED_TO_UPLOAD` | OWNER/VERSION/RIGHTS/TAXONOMY/LOCATOR pending states | `docs/SEG-CONTENT/SOURCE_REGISTRY/` |
| `SEG_PHASE_7_8_5_LEGACY_ASSET_MAPPING.md` | `REQUIRED_TO_UPLOAD` | legacy asset layer mapping without direct import | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_8_6_LEGACY_EVIDENCE_INTAKE_REPORT.md` | `REQUIRED_TO_UPLOAD` | legacy evidence intake assessment | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_8_6_PROVENANCE_MATRIX.md` | `REQUIRED_TO_UPLOAD` | provenance and review-state matrix | `docs/SEG-CONTENT/SOURCE_REGISTRY/` |
| `SEG_PHASE_7_8_6_CONTENT_LAYER_SEPARATION.md` | `REQUIRED_TO_UPLOAD` | external/SEG-derived/visual/governance layer separation | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_PHASE_7_8_6_GATE_REPORT.md` | `REQUIRED_TO_UPLOAD` | legacy evidence gate | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_8_7_ADDITIONAL_EVIDENCE_REVIEW.md` | `REQUIRED_TO_UPLOAD` | additional evidence decision record | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_8_7_GATE_UPDATE.md` | `REQUIRED_TO_UPLOAD` | crosswalk gate update | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_8_7_LEGACY_OBJECT_CROSSWALK.md` | `REQUIRED_TO_UPLOAD` | 1,919-object crosswalk report | `docs/SEG-CONTENT/EVIDENCE/` |
| `SEG_PHASE_7_8_7_TAXONOMY_MAPPING_UPDATE.md` | `REQUIRED_TO_UPLOAD` | taxonomy mapping evidence | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_PHASE_7_8_8_LEGACY_IDENTITY_BRIDGE_DESIGN.md` | `REQUIRED_TO_UPLOAD` | isolated identity bridge design | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_PHASE_7_8_8_MAPPING_RULES.md` | `REQUIRED_TO_UPLOAD` | confidence rules and conflict handling | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_PHASE_7_8_8_GATE_REPORT.md` | `REQUIRED_TO_UPLOAD` | identity evidence gate | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_8_9_IDENTITY_EVIDENCE_DISCOVERY_REPORT.md` | `REQUIRED_TO_UPLOAD` | forensic discovery result: no SEG identity evidence | `docs/SEG-CONTENT/EVIDENCE/` |
| `SEG_PHASE_7_8_10_UPDATED_SOURCE_PACKAGE_REVIEW.md` | `REQUIRED_TO_UPLOAD` | updated source package review decision | `docs/SEG-CONTENT/SOURCE_REGISTRY/` |
| `SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md` | `REQUIRED_TO_UPLOAD` | separate lineage source registry | `docs/SEG-CONTENT/SOURCE_REGISTRY/` |
| `SEG_PHASE_7_8_11_LEGACY_COMPARISON_MATRIX.md` | `REQUIRED_TO_UPLOAD` | comparison against legacy assets without identity links | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_8_11_GATE_REPORT.md` | `REQUIRED_TO_UPLOAD` | source registry gate | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_8_12_CONTENT_INTELLIGENCE_MAP.md` | `REQUIRED_TO_UPLOAD` | Priority 1 content structure and candidates | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_PHASE_7_8_12_TRANSFORMATION_PRIORITY.md` | `REQUIRED_TO_UPLOAD` | transformation priority roadmap | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_PHASE_7_8_12_GATE_REPORT.md` | `REQUIRED_TO_UPLOAD` | intelligence mapping gate | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `PHASE_7_8_13_TRANSFORMATION_BOUNDARY.md` | `REQUIRED_TO_UPLOAD` | controlled transformation boundary | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `PHASE_7_8_13_V1_1_COMPATIBILITY_MATRIX.md` | `REQUIRED_TO_UPLOAD` | v1.1 target compatibility evidence | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `PHASE_7_8_13_GATE_REPORT.md` | `REQUIRED_TO_UPLOAD` | transformation design gate | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |
| `SEG_PHASE_7_8_14_METADATA_CLOSURE_REGISTER.md` | `REQUIRED_TO_UPLOAD` | metadata closure register | `docs/SEG-CONTENT/SOURCE_REGISTRY/` |
| `SEG_PHASE_7_8_14_CONTENT_REVIEW_QUEUE.md` | `REQUIRED_TO_UPLOAD` | separated review queues and priority | `docs/SEG-CONTENT/REVIEW/` |
| `SEG_PHASE_7_8_14_V1_1_GAP_REGISTER.md` | `REQUIRED_TO_UPLOAD` | supported types and additional-layer gaps | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_PHASE_7_8_14_GATE_REPORT.md` | `REQUIRED_TO_UPLOAD` | metadata/review closure gate | `docs/SEG-CONTENT/PHASES/7.5-7.8/` |

## Architecture and schema artifacts

| الملف | التصنيف | سبب الحفظ | Git location المقترح |
|---|---|---|---|
| `SEG_PHASE_7_2_FINAL_ARCHITECTURE_DECISION_REPORT.md` | `REQUIRED_TO_UPLOAD` | architecture decision prerequisite | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_PHASE_7_3_IMPLEMENTATION_READINESS_REPORT.md` | `REQUIRED_TO_UPLOAD` | v1.1 implementation readiness evidence | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_PHASE_7_4_IMPLEMENTATION_REPORT.md` | `REQUIRED_TO_UPLOAD` | isolated v1.1 implementation report | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_CLINICAL_CASE_CONTRACT_FINAL.md` | `REQUIRED_TO_UPLOAD` | clinical_case boundary contract | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_CLINICAL_SKILL_CONTRACT_FINAL.md` | `REQUIRED_TO_UPLOAD` | clinical_skill boundary contract | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_REFERENCE_FRAMEWORK_DECISION.md` | `REQUIRED_TO_UPLOAD` | reference framework decision | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_SCHEMA_EXTENSION_ADOPTION_DECISION.md` | `REQUIRED_TO_UPLOAD` | additive v1.1 adoption decision | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json` | `REQUIRED_TO_UPLOAD` | isolated v1.1 main schema artifact | `schemas/SEG_CONTENT_RECORD_V1_1/` |
| `schemas/SEG_CONTENT_RECORD_V1_1/clinical_case.schema.json` | `REQUIRED_TO_UPLOAD` | v1.1 clinical case definition | `schemas/SEG_CONTENT_RECORD_V1_1/` |
| `schemas/SEG_CONTENT_RECORD_V1_1/clinical_skill.schema.json` | `REQUIRED_TO_UPLOAD` | v1.1 clinical skill definition | `schemas/SEG_CONTENT_RECORD_V1_1/` |
| `schemas/SEG_CONTENT_RECORD_V1_1/reference_framework.schema.json` | `REQUIRED_TO_UPLOAD` | v1.1 reference framework relationship definition | `schemas/SEG_CONTENT_RECORD_V1_1/` |
| `schemas/SEG_CONTENT_RECORD_V1_1/validator/SEG_CONTENT_RECORD_V1_1_VALIDATOR.py` | `REQUIRED_TO_UPLOAD` | isolated explicit-profile validator | `schemas/SEG_CONTENT_RECORD_V1_1/validator/` |

العقود الأربعة الأولى أعلاه يجب استرجاعها من موضعها المعتمد قبل staging إن لم تكن موجودة في `seg-manus-status`; لا يُنشأ بديل جديد من الذاكرة، ولا يُعدل v1.0 canonical schema.

## Governance artifacts الموجودة أصلًا في المستودع

الملفات التالية tracked أصلًا ضمن repository ويجب الحفاظ عليها؛ لا تحتاج إلى upload جديد في هذه المراجعة. تصنيفها المنطقي `REQUIRED_TO_UPLOAD (ALREADY_TRACKED)`، وليس untracked pending upload.

| المسار | السبب |
|---|---|
| `docs/SEG-GOVERNANCE/SEG_CURRENT_STATE.md` | current state source of truth |
| `docs/SEG-GOVERNANCE/SEG_MASTER_ROADMAP.md` | roadmap and phase boundaries |
| `docs/SEG-GOVERNANCE/SEG_PENDING_TASKS.md` | pending tasks and blockers |
| `docs/SEG-GOVERNANCE/SEG_DECISION_LOG.md` | decision lineage |
| `docs/SEG-GOVERNANCE/SEG_CONTENT_PIPELINE_SPEC.md` | source-to-content pipeline |
| `docs/SEG-GOVERNANCE/SEG_DEPLOYMENT_STATUS.md` | deployment governance |
| `docs/SEG-CONTENT/SEG_CONTENT_INVENTORY.md` | content inventory contract |
| `docs/SEG-CONTENT/SEG_CONTENT_PACKAGE_STRUCTURE.md` | package structure |
| `docs/SEG-CONTENT/SEG_CONTENT_REVIEW_WORKFLOW.md` | review workflow |
| `docs/SEG-CONTENT/SEG_CONTENT_SCHEMA.md` | content schema documentation |
| `docs/SEG-CONTENT/GOVERNANCE/SEG_STATUS_MATRIX.md` | governance state vocabulary |
| `docs/SEG-CONTENT/GOVERNANCE/SEG_SOURCE_MANIFEST_TEMPLATE.md` | source registry template |
| `docs/SEG-CONTENT/GOVERNANCE/SEG_DECISION_LOG_TEMPLATE.md` | decision log template |
| `docs/SEG-CONTENT/GOVERNANCE/SEG_RELEASE_ROLLBACK_TEMPLATE.md` | rollback template |

## Optional archive: supporting evidence

هذه الملفات مفيدة للتدقيق أو إعادة الإنتاج، لكنها لا تدخل main repository افتراضيًا. يُوصى بحفظها في continuity/restricted archive فقط بعد rights، size، and retention review.

| الملف/المسار | التصنيف | السبب | موقع الأرشيف المقترح |
|---|---|---|---|
| `/home/ubuntu/seg-manus-status/phase_7_8_7_legacy_object_crosswalk.tsv` | `OPTIONAL_ARCHIVE` | raw 1,919-row crosswalk evidence | `continuity/evidence/phase-7.8.7/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_7_legacy_object_crosswalk_summary.md` | `OPTIONAL_ARCHIVE` | crosswalk summary supporting report | `continuity/evidence/phase-7.8.7/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_9_identity_evidence_raw_analysis.md` | `OPTIONAL_ARCHIVE` | forensic raw analysis | `continuity/evidence/phase-7.8.9/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_9_relationship_inventory.md` | `OPTIONAL_ARCHIVE` | legacy-internal relationship inventory | `continuity/evidence/phase-7.8.9/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_9_candidate_files.txt` | `OPTIONAL_ARCHIVE` | discovery candidate list | `continuity/evidence/phase-7.8.9/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_9_identity_evidence_hits.txt` | `OPTIONAL_ARCHIVE` | search hit inventory | `continuity/evidence/phase-7.8.9/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_10_content_overlap.md` | `OPTIONAL_ARCHIVE` | conservative overlap evidence | `continuity/evidence/phase-7.8.10/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_inventory_comparison.md` | `OPTIONAL_ARCHIVE` | updated-source comparison evidence | `continuity/evidence/phase-7.8.10/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/INTAKE_FINDINGS.md` | `OPTIONAL_ARCHIVE` | intake findings and checksums | `continuity/evidence/phase-7.8.10/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/sha256_manifest.txt` | `OPTIONAL_ARCHIVE` | source hash sidecar | `continuity/evidence/phase-7.8.10/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_6_evidence_findings.md` | `OPTIONAL_ARCHIVE` | evidence intake working findings | `continuity/evidence/phase-7.8.6/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/CONTENT_SOURCES.md` | `OPTIONAL_ARCHIVE` | original legacy evidence document; rights/size review required | `restricted-continuity/phase-7.8.6/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/EM_MASTER_TEXTBOOK_ARABIC_COMPLETION.md` | `OPTIONAL_ARCHIVE` | legacy evidence; not production content | `restricted-continuity/phase-7.8.6/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/EM_MASTER_TEXTBOOK_BUILD.md` | `OPTIONAL_ARCHIVE` | legacy evidence; not production content | `restricted-continuity/phase-7.8.6/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/FINAL_MEDICAL_CONTENT_AUDIT.md` | `OPTIONAL_ARCHIVE` | legacy governance evidence | `restricted-continuity/phase-7.8.6/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/FINAL_SCOPE.md` | `OPTIONAL_ARCHIVE` | legacy scope evidence | `restricted-continuity/phase-7.8.6/` |
| `/home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/PDF_VISUAL_MAPPING_SYSTEM.md` | `OPTIONAL_ARCHIVE` | legacy visual evidence | `restricted-continuity/phase-7.8.6/` |
| `/home/ubuntu/seg-manus-status/phase_repo_upload_audit.json` | `OPTIONAL_ARCHIVE` | read-only upload audit evidence; not main source | `continuity/evidence/repository/` |
| `/home/ubuntu/seg-manus-status/SEG_PHASE_7_8_5_LEGACY_ASSET_HASHES.tsv` | `OPTIONAL_ARCHIVE` | supporting legacy hash evidence | `continuity/evidence/phase-7.8.5/` |
| `/home/ubuntu/seg-manus-status/SEG_PHASE_7_8_5_LEGACY_ASSET_STRUCTURE.txt` | `OPTIONAL_ARCHIVE` | legacy structure evidence | `continuity/evidence/phase-7.8.5/` |
| `/home/ubuntu/seg-manus-status/SEG_PHASE_7_8_5_LEGACY_METADATA_ANALYSIS.stdout` | `OPTIONAL_ARCHIVE` | raw analysis output; not a final report | `continuity/evidence/phase-7.8.5/` |
| `/home/ubuntu/seg-manus-status/SEG_PHASE_7_8_5_LEGACY_METADATA_ANALYSIS.txt` | `OPTIONAL_ARCHIVE` | metadata analysis evidence | `continuity/evidence/phase-7.8.5/` |
| `/home/ubuntu/seg-manus-status/SEG_PHASE_7_8_6_TAXONOMY_EVIDENCE.txt` | `OPTIONAL_ARCHIVE` | taxonomy evidence output | `continuity/evidence/phase-7.8.6/` |

## Updated source package: do not upload to main repository yet

الملفات التالية هي source materials خارجية أو representations للحزمة المحدثة، وليست phase reports. بسبب unresolved owner/publisher/version/edition/locator/rights/clinical review، تُصنف حاليًا `DO_NOT_UPLOAD` إلى main repository. يمكن حفظها في restricted archive فقط بعد rights and retention approval.

| المسار | التصنيف | السبب |
|---|---|---|
| `phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book.txt` | `DO_NOT_UPLOAD` | external/updated source text؛ rights and source metadata open |
| `phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/frcem All_Chapters_Questions_and_Explanations_Full.txt` | `DO_NOT_UPLOAD` | external question/explanation source; not production record |
| `phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/HIPPO_High_Yield_Study_Book.txt` | `DO_NOT_UPLOAD` | external study source; rights and review open |
| `phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt` | `DO_NOT_UPLOAD` | external Arabic explanation source; authorship/rights/review open |
| `phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/Emergency_Oxford_Essentials.pdf` | `DO_NOT_UPLOAD` | external PDF representation; display rights and edition unverified |
| `phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/1400q_Study_Guide_UTF8.txt` | `DO_NOT_UPLOAD` | source text; answer-key and provenance gaps |
| `phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/pretestnew_Study_Guide_UTF8.txt` | `DO_NOT_UPLOAD` | `REQUIRES_SOURCE_RESTORATION` due OCR corruption |
| `phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book_Colored.pdf` | `DO_NOT_UPLOAD` | representation only; rights/size/display review open |
| `phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book_Editable.docx` | `DO_NOT_UPLOAD` | editable external representation; rights and provenance open |
| `phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/HIPPO_High_Yield_Study_Book_Colored.pdf` | `DO_NOT_UPLOAD` | representation only; rights/size/display review open |
| `phase_7_8_10_updated_source_intake/كتب علاء نص دراسي/HIPPO_High_Yield_Study_Book_Editable.docx` | `DO_NOT_UPLOAD` | editable external representation; rights and provenance open |

## Root-level untracked SEG artifacts

الملفات التالية ظهرت في Git status كـuntracked، لكنها ليست جميعًا main-repository deliverables. تصنيفها كما يلي.

| الملف | التصنيف | السبب | الموقع المقترح |
|---|---|---|---|
| `SEG_PHASE_7_4_IMPLEMENTATION_REPORT.md` | `REQUIRED_TO_UPLOAD` | v1.1 implementation evidence | `docs/SEG-CONTENT/ARCHITECTURE/` |
| `SEG_LEGACY_KNOWLEDGE_AUDIT_STRUCTURE.txt` | `OPTIONAL_ARCHIVE` | audit structure raw evidence | `continuity/evidence/legacy-audit/` |
| `SEG_PHASE_7_8_5_LEGACY_ASSET_HASHES.tsv` | `OPTIONAL_ARCHIVE` | legacy hashes | `continuity/evidence/phase-7.8.5/` |
| `SEG_PHASE_7_8_5_LEGACY_ASSET_STRUCTURE.txt` | `OPTIONAL_ARCHIVE` | raw structure inventory | `continuity/evidence/phase-7.8.5/` |
| `SEG_PHASE_7_8_5_LEGACY_METADATA_ANALYSIS.stdout` | `DO_NOT_UPLOAD` | raw stdout, reproducible and noisy | none |
| `SEG_PHASE_7_8_5_LEGACY_METADATA_ANALYSIS.txt` | `OPTIONAL_ARCHIVE` | supporting metadata evidence | `continuity/evidence/phase-7.8.5/` |
| `SEG_PHASE_7_8_6_TAXONOMY_EVIDENCE.txt` | `OPTIONAL_ARCHIVE` | taxonomy evidence output | `continuity/evidence/phase-7.8.6/` |
| `SEG_UI_PATCH1_BASELINE_NOTES.md` | `OPTIONAL_ARCHIVE` | visual change evidence; outside content phase | `continuity/evidence/ui/` |
| `SEG_UI_PATCH1_IMPLEMENTATION_REPORT.md` | `OPTIONAL_ARCHIVE` | UI implementation evidence; not part of content package | `continuity/evidence/ui/` |
| `SEG_EVIDENCE_LANDING_WAVE1_1280x720.png` | `OPTIONAL_ARCHIVE` | visual evidence image | `continuity/evidence/ui/` |
| `SEG_EVIDENCE_LANDING_WAVE1_1280x720_AFTER_NOOP.png` | `OPTIONAL_ARCHIVE` | visual evidence image | `continuity/evidence/ui/` |
| `SEG_EVIDENCE_LANDING_WAVE1_390x844_AFTER_NOOP.png` | `OPTIONAL_ARCHIVE` | visual evidence image | `continuity/evidence/ui/` |

## Untracked UI evidence bundle

العناصر التالية كلها ضمن `SEG_UI_PATCH1_EVIDENCE/`، وهي evidence مرئية مفيدة، لكنها لا تخص Phase 7.5–7.8.14 ولا يجب خلطها مع content/governance artifacts. تصنيف كل ملف هنا هو `OPTIONAL_ARCHIVE`، والموقع المقترح `continuity/evidence/ui/`.

| الملفات |
|---|
| `SEG_UI_PATCH1_EVIDENCE/baseline-contact-sheet.png` |
| `SEG_UI_PATCH1_EVIDENCE/baseline/landing-320x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/baseline/landing-360x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/baseline/landing-390x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/baseline/landing-430x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/baseline/login-320x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/baseline/login-360x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/baseline/login-390x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/baseline/login-430x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/baseline/register-320x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/baseline/register-360x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/baseline/register-390x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/baseline/register-430x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/dark-contact-sheet.png` |
| `SEG_UI_PATCH1_EVIDENCE/dark/landing-320x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/dark/landing-360x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/dark/landing-390x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/dark/landing-430x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/dark/login-320x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/dark/login-360x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/dark/login-390x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/dark/login-430x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/dark/metrics.json` |
| `SEG_UI_PATCH1_EVIDENCE/dark/register-320x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/dark/register-360x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/dark/register-390x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/dark/register-430x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/light-contact-sheet.png` |
| `SEG_UI_PATCH1_EVIDENCE/light/landing-320x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/light/landing-360x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/light/landing-390x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/light/landing-430x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/light/login-320x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/light/login-360x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/light/login-390x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/light/login-430x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/light/metrics.json` |
| `SEG_UI_PATCH1_EVIDENCE/light/register-320x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/light/register-360x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/light/register-390x844.png` |
| `SEG_UI_PATCH1_EVIDENCE/light/register-430x844.png` |

## Untracked analysis scripts and validators

هذه الملفات كلها local tooling وليست project source أو governance records. تصنيف كل ملف هو `DO_NOT_UPLOAD` إلى main repository؛ إذا احتاجها الفريق لإعادة الإنتاج، تحفظ في a separate tooling archive بعد code review.

| الملفات |
|---|
| `analyze_legacy_knowledge_audit.py` |
| `analyze_phase_7_8_12_content_intelligence.py` |
| `analyze_phase_7_8_5_legacy_assets.py` |
| `analyze_phase_7_8_5_legacy_metadata.py` |
| `analyze_phase_7_8_7_legacy_object_crosswalk.py` |
| `analyze_phase_7_8_9_identity_evidence.py` |
| `analyze_updated_source_package.py` |
| `compare_updated_package_content.py` |
| `extract_phase_7_8_6_taxonomy_evidence.py` |
| `extract_phase_7_8_9_relationships.py` |
| `generate_legacy_knowledge_audit_reports.py` |
| `generate_phase_7_7_6_reports.py` |
| `generate_phase_7_8_11_reports.py` |
| `generate_phase_7_8_12_reports.py` |
| `generate_phase_7_8_13_reports.py` |
| `generate_phase_7_8_14_reports.py` |
| `generate_phase_7_8_5_reports.py` |
| `generate_phase_7_8_6_evidence_reports.py` |
| `generate_phase_7_8_6_reports.py` |
| `generate_phase_7_8_7_object_crosswalk_reports.py` |
| `generate_phase_7_8_8_identity_bridge_reports.py` |
| `generate_phase_7_8_9_identity_evidence_report.py` |
| `generate_phase_7_8_artifacts.py` |
| `inspect_phase_7_8_7_crosswalk_inputs.py` |
| `seg_phase_7_7_6_input_parser.py` |
| `seg_phase_7_7_6_provenance_audit.py` |
| `validate_phase_7_7_6_reports.py` |
| `validate_phase_7_8_5_reports.py` |
| `validate_phase_7_8_6_evidence_reports.py` |
| `validate_phase_7_8_6_reports.py` |
| `validate_phase_7_8_7_reports.py` |
| `validate_phase_7_8_artifacts.py` |
| `validate_phase_7_8_review_report.py` |
| `scripts/capture_ui_patch1_cdp.mjs` |
| `scripts/make_ui_patch1_contact_sheet.py` |
| `scripts/make_ui_patch1_post_sheets.py` |
| `scripts/summarize_ui_patch1_metrics.py` |

## Temporary and forbidden files

| الملف/النمط | التصنيف | السبب |
|---|---|---|
| `.manus-logs/browserConsole.log` | `DO_NOT_UPLOAD` | browser console log; forbidden by upload audit |
| `.manus-logs/networkRequests.log` | `DO_NOT_UPLOAD` | network log; may expose session/request data |
| `.manus-logs/sessionReplay.log` | `DO_NOT_UPLOAD` | session replay/private local evidence |
| `phase_repo_status_snapshot.txt` | `DO_NOT_UPLOAD` | temporary Git snapshot, not a project artifact |
| `phase_root_artifact_names.txt` | `DO_NOT_UPLOAD` | temporary inventory generated during this audit |
| `phase_7_5_to_7_8_14_artifact_names.txt` | `DO_NOT_UPLOAD` | temporary inventory generated during this audit |
| `phase_architecture_artifact_names.txt` | `DO_NOT_UPLOAD` | temporary inventory generated during this audit |
| `phase_repo_upload_audit.json` | `OPTIONAL_ARCHIVE` | audit evidence only; do not upload to main source tree |
| `phase_7_8_12_content_intelligence_stdout.json` | `DO_NOT_UPLOAD` | raw stdout and reproducible temporary output |
| `phase_7_8_12_content_intelligence_raw.json` | `OPTIONAL_ARCHIVE` | raw analysis evidence; keep outside main repository |
| `phase_7_8_12_content_intelligence_raw.md` | `OPTIONAL_ARCHIVE` | raw analysis evidence; keep outside main repository |
| `seg_origin_evidence.txt` | `OPTIONAL_ARCHIVE` | origin evidence requiring separate provenance review |

## Existing tracked repository files

The repository currently contains 895 tracked files and has zero modified or staged files. Existing application source, configuration, routes, authentication boundaries, deployment files, governance docs, approved visual assets, and already tracked schema artifacts remain part of the repository state and require no new upload action in this audit. They must not be replaced by the external phase-output directory.

## Exact upload boundary

الحد الأدنى الآمن للرفع هو: تقارير Phase 7.5–7.8.14 المذكورة في جدول `REQUIRED_TO_UPLOAD`، عقود architecture المعتمدة، وv1.1 isolated schema directory. لا تُرفع raw external books أو PDF/DOCX representations أو generated JSON أو local scripts أو UI evidence إلى main repository في هذه المرحلة.

قبل أي publication لاحق يجب نقل الملفات المطلوبة إلى المواقع المقترحة، ثم تشغيل upload audit من `seg-project-continuity`، ومراجعة staged-file list، وsecret scan، وrights boundary. لا يُسمح بالـcommit أو push إلا بعد تفويض صريح منفصل؛ هذا التقرير لا يمنح publication authorization.

## Evidence and remaining blockers

الأدلة المستخدمة هي Git status snapshot، repository identity، upload audit output، قائمة artifacts Phase 7.5–7.8.14، وقراءة manifest السابق. لم يتم فحص صلاحية كل claim الطبي أو حقوق النشر لكل مصدر خارجي؛ لذلك تبقى source rights وmetadata وclinical review gates مستقلة.

**Remaining blockers:** مراجعة الملفات المطلوب نقلها فعليًا، استرجاع أي architecture contracts المطلوبة وغير الموجودة في `/home/ubuntu/seg-manus-status` من source of truth المعتمد، rights review للمصادر الخارجية، واستبعاد `.manus-logs` قبل أي staging.

**Next allowed phase:** إعداد publication staging plan بعد موافقة مستقلة، ثم staged-file review وsecret audit. لا يوجد commit أو push مصرح به ضمن هذه المهمة.
