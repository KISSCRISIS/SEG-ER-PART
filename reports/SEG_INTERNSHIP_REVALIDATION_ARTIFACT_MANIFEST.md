# SEG Internship Revalidation Artifact Manifest

**Phase:** 7.0 — Controlled Evidence Collection & Closure Execution  
**Mode:** `READ_ONLY EVIDENCE COLLECTION`  
**Generated at (UTC):** `2026-08-18T00:00:00Z`  
**Manifest state:** `DRAFT — EXACT ARTIFACTS IDENTIFIED; SHA/OWNERSHIP RECONCILIATION REQUIRED`

## 1. Manifest purpose and scope

This manifest names the exact governance artifacts and source-package members currently identified for a future, separately authorized, non-production schema-revalidation review. It is an inventory and scope-control document only. It does not freeze a final revalidation scope, close evidence gates, authorize schema conversion, generate JSON, create records, import content, or activate content.

The candidate source population is limited to the 48 A–E records listed in the Phase 5.10 source-to-schema mapping plan. Their carried-forward review states remain in force. Technical implementation assets are listed separately as exact exclusions and must not enter medical-content ingestion. Broad-folder or filename-only scope is not accepted as a substitute for this manifest.

All paths below are preserved archive/staging references from the governed Internship package. Source IDs and source-local identifiers are not replaced. The listed SHA-256 values are carried-forward references from prior controlled extraction/mapping artifacts; independent verification and reconciliation to preserved originals remain required before any revalidation entry decision.

## 2. Governance and control artifacts

| Artifact | Absolute path | SHA-256 | Inclusion reason |
|---|---|---|---|
| Phase 6.8 governance acceptance decision | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_GOVERNANCE_ACCEPTANCE_DECISION_RECORD.md` | `ecbb1cf9b821379f594c1e8770a59f00d7e748cfac601e919b9639678253eea9` | Records design-level acceptance and explicit non-authorization limits. |
| Phase 6.8 gate report | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_8_GATE_REPORT.md` | `90780515cc218414bdaf8dcd575f73160ea2e4d3318ad34b0dae3324b78f1f16` | Records `GOVERNANCE_ACCEPTANCE_RECORDED` and remaining gates. |
| Evidence closure matrix | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_EVIDENCE_CLOSURE_MATRIX.md` | `0d0c4ce2fea433e9f83e6b8b5f76dc8b1e3ee9a67907f9fdfc82e8b9201388cc` | Defines required evidence fields and closure criteria. |
| Schema-revalidation entry checklist | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_REVALIDATION_ENTRY_CHECKLIST.md` | `e6751b628c31d01b8320cad983ee05397c1e8b96d10b531eebc827b015591c1c` | Defines entry conditions and separate authorization requirements. |
| Phase 6.9 gate report | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_9_GATE_REPORT.md` | `76a6b5a834ba7690e924c159dcaab8e938384033a560b8f05871ea72af3b63e5` | Records `BLOCKED_PENDING_EVIDENCE_COLLECTION`. |
| Evidence collection register | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_EVIDENCE_COLLECTION_REGISTER.md` | `060351134962affecc3a8c13d63e3c73593382f6a641593e5f9d7582750f3a59` | Tracks existing evidence, missing evidence, owners, and closure status. |
| Source-to-schema mapping plan | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md` | `5e6fcbbf93e974e307d08451273f1b7881de83699a7cb7e03f6b5fc6c3f13e05` | Exact candidate source IDs, paths, hashes, domain/schema candidates, and review states. |
| Final source evidence matrix | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_FINAL_SOURCE_EVIDENCE_MATRIX.md` | `f74996c651ee1f391b895779a1a57cd659033276e560eaaa0506dfe45f31d6f9` | Field-level evidence status for source records. |
| Technical asset separation report | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_TECHNICAL_ASSET_SEPARATION_REPORT.md` | `9a5a26b9f3d8317cad7044516db993e838cd0e9c5b565f1e48ba177995d64a97` | Exact technical asset exclusions and hashes. |
| Governance evidence status | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_GOVERNANCE_EVIDENCE_STATUS.md` | `a1ab67cb56e3a22ae73f0d4f421ad2e997cd4afb49c6a58dae21367de21bcfd5` | Prior gate-level evidence status. |
| Phase 6.7 gate report | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_7_GATE_REPORT.md` | `28ebab5b74cb60cca82ed3143ff5e542f155c70ebe0b18ed2d0ec27d5534075e` | Prior acceptance checkpoint baseline. |

These governance files are included as evidence context and decision lineage. They do not themselves prove clinical correctness, rights closure, canonical source status, or schema readiness.

## 3. Candidate source artifacts — included for controlled evidence review

The following 48 records are the exact A–E candidate rows carried forward from the Phase 5.10 mapping plan. They are **candidates only**. Each remains subject to provenance, version, rights, reviewer, track, taxonomy, audit, contract, duplicate, and lineage closure.

| Source ID | Preserved archive path | SHA-256 | Candidate domain / target | Current carried-forward state | Inclusion reason |
|---|---|---|---|---|---|
| `SRC-0003` | `02_Internship/Assessments/Assessment_Structure.md` | `8c1df6ff33d01eaa58d996ca218485701db3b25afdc3c0aee3eb3f30227de7f2` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Candidate assessment artifact; unique pathway mapping unresolved. |
| `SRC-0004` | `02_Internship/Assessments/README.md` | `c09e38390df246d1702365db11796e05fef1e378d9e71bcfb766831ac778246a` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Candidate assessment artifact; unique pathway mapping unresolved. |
| `SRC-0007` | `02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md` | `6905896a44c7cd82696876ca5d6e4a7e0ca969d3d9af4e524390d26a0abc90fd` | Learning Content / `lesson` | `PENDING_METADATA_AND_REVIEW` | Emergency Basics candidate; source and review evidence remain open. |
| `SRC-0008` | `02_Internship/Clinical_Rotations/Emergency_Basics/README.md` | `4e70507f9248eb1e8babef0a7d0882989c2609934725cfd4b757a16474560a86` | Learning Content / `lesson` | `PENDING_METADATA_AND_REVIEW` | Emergency Basics candidate; source and review evidence remain open. |
| `SRC-0010` | `02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md` | `8c5ba43ad4d14a788f8f152a8fab65e9bb2c5478404538726a22106c66626988` | Learning Content / `lesson` | `PENDING_METADATA_AND_REVIEW` | Internal Medicine rotation candidate; governance closure remains open. |
| `SRC-0012` | `02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md` | `6028f47c68a813428aa563166e93cd28bc18cb082eee7437e8993d3938dd8bef` | Learning Content / `lesson` | `BLOCKED_PENDING_REVIEW` | Rotation candidate; unique pathway mapping unresolved. |
| `SRC-0014` | `02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md` | `4e179a35361f619bc63d495d871473d6cbad232c71188956f4ea23015de4ba72` | Learning Content / `lesson` | `PENDING_METADATA_AND_REVIEW` | Pediatrics rotation candidate; governance closure remains open. |
| `SRC-0015` | `02_Internship/Clinical_Rotations/README.md` | `94d6b002261f320a9c8e71188926204837e5918d073a40e170b3d3b50a31b62a` | Learning Content / `lesson` | `BLOCKED_PENDING_REVIEW` | Rotation candidate; unique pathway mapping unresolved. |
| `SRC-0017` | `02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md` | `1cc4aa679dce0c3ef1fc9f1a8abd193945041804296e044c524a292b0f0a348a` | Learning Content / `lesson` | `PENDING_METADATA_AND_REVIEW` | Surgery rotation candidate; governance closure remains open. |
| `SRC-0019` | `02_Internship/Clinical_Skills/Clinical_Skills_Internship_Framework.md` | `2ee9c201e9e431fac17ab1644bfb826ecfd5d546683acc5ec128b8482ab10d27` | Skills / Procedures / contract candidate | `PENDING_METADATA_AND_REVIEW` | Skills framework candidate; explicit contract and competency boundary required. |
| `SRC-0020` | `02_Internship/Clinical_Skills/README.md` | `6e3156e5deabcbbf63b6b8c7f0c097bf66941a59c0267a4f86603e254901119b` | Skills / Procedures / contract candidate | `PENDING_METADATA_AND_REVIEW` | Skills candidate; explicit contract and competency boundary required. |
| `SRC-0023` | `02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md` | `bb0508f5b5a4bbdbf4919d28f4115f444c26ed514c2c4f50f13723bab91225fb` | Learning Content / `lesson` | `PENDING_METADATA_AND_REVIEW; DUP-DRUG-001 unresolved` | Preserved Base-family member for independent duplicate comparison. |
| `SRC-0024` | `02_Internship/Drug_Essentials/implementation_notes.md` | `810d08ed40ef7f190995b2eead2d8ee670d06de511223e1455dea5bb3d9d1e1e` | Learning Content / `lesson` | `PENDING_METADATA_AND_REVIEW; DUP-DRUG-001 unresolved` | Preserved Base-family member and lineage evidence. |
| `SRC-0025` | `02_Internship/Drug_Essentials/README.txt` | `64469d1134e1045a96230469388ea31b7f4adc797be7f2260696df30a0e93401` | Learning Content / `lesson` | `PENDING_METADATA_AND_REVIEW; DUP-DRUG-001 unresolved` | Preserved Base-family member and lineage evidence. |
| `SRC-0027` | `02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md` | `2bc084ccf0d074cf22573b8ca352b0918eb1ca448eed8f2a6885a3f5e2777d27` | Learning Content / `lesson` | `PENDING_METADATA_AND_REVIEW; DUP-DRUG-001 unresolved` | Preserved v2_Pack primary design candidate for controlled comparison only. |
| `SRC-0028` | `02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md` | `5a30d419e6aa14626652532d3d657a7657f4cea2dc49980805497d29d5a36831` | Learning Content / `lesson` | `PENDING_METADATA_AND_REVIEW; DUP-DRUG-001 unresolved` | Preserved v2_Pack family member and comparison evidence. |
| `SRC-0029` | `02_Internship/Drug_Essentials_v2_Pack/README.txt` | `5c2377e8c30aa6c901eb5bb5a3b4c6679c33f27de883c480a42e38eab6282eb5` | Learning Content / `lesson` | `PENDING_METADATA_AND_REVIEW; DUP-DRUG-001 unresolved` | Preserved v2_Pack family member and comparison evidence. |
| `SRC-0033` | `02_Internship/Emergency_Cases/emergency_cases_intern_level.md` | `2b3afae2bf4d19d837f0075ca979c5810d49eb3e82f0dcb9356ce1a47962a99c` | Clinical Cases / case contract candidate | `PENDING_METADATA_AND_REVIEW; DUP-EMERGENCY-001 unresolved` | Preserved Base-family member for independent duplicate comparison. |
| `SRC-0034` | `02_Internship/Emergency_Cases/implementation_notes.md` | `6b74fe4e4b450289df6cb54358f32f46da737236646310da9784d5cefde649a8` | Clinical Cases / case contract candidate | `PENDING_METADATA_AND_REVIEW; DUP-EMERGENCY-001 unresolved` | Preserved Base-family member and lineage evidence. |
| `SRC-0035` | `02_Internship/Emergency_Cases/README.txt` | `e22eeb24f6ed69e75ae1d4d6c90e4ce67a4b0549a2c7af5364e578011e8a17bd` | Clinical Cases / case contract candidate | `PENDING_METADATA_AND_REVIEW; DUP-EMERGENCY-001 unresolved` | Preserved Base-family member and lineage evidence. |
| `SRC-0037` | `02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md` | `455983813a4f540fc6b5f9520e245886ed775c1ae472ade79ce7089b6ed068a4` | Clinical Cases / case contract candidate | `PENDING_METADATA_AND_REVIEW; DUP-EMERGENCY-001 unresolved` | Preserved v2_Pack primary design candidate for controlled comparison only. |
| `SRC-0038` | `02_Internship/Emergency_Cases_v2_Pack/implementation_notes.md` | `4fedbe459e19e938cb63fb164d025e651593d0b7dc56a75237d05c8fd83d3495` | Clinical Cases / case contract candidate | `PENDING_METADATA_AND_REVIEW; DUP-EMERGENCY-001 unresolved` | Preserved v2_Pack family member and comparison evidence. |
| `SRC-0039` | `02_Internship/Emergency_Cases_v2_Pack/README.txt` | `81d8a30163db1bc453c936dc9815a42630acebd88f48905d4befb44b626c0ce1` | Clinical Cases / case contract candidate | `PENDING_METADATA_AND_REVIEW; DUP-EMERGENCY-001 unresolved` | Preserved v2_Pack family member and comparison evidence. |
| `SRC-0041` | `02_Internship/Internship books SEG/IM_HighYield_Review.pdf` | `d6374402fc43b236023cebf6679240c4229d6e570be4f81a216a9498a9f7543d` | Reference / Atlas / reference contract candidate | `BLOCKED_PENDING_REVIEW` | Reference candidate; unique pathway mapping and rights evidence unresolved. |
| `SRC-0042` | `02_Internship/Internship books SEG/ObGyn_HighYield_Review_Dr_Alaa_Aqrabawi.pdf` | `2ea59d2787806fc09d0922f0e8116b08e41ca57c2aaa2aa42b4d179f1f9138f9` | Reference / Atlas / reference contract candidate | `BLOCKED_PENDING_REVIEW` | Reference candidate; unique pathway mapping and rights evidence unresolved. |
| `SRC-0043` | `02_Internship/Internship books SEG/Pediatrics_HighYield_Review.pdf` | `9817f7cf2a905d76deb029a1658f81eb1c0e4e05e7de104ea71b6914626aee7a` | Reference / Atlas / reference contract candidate | `PENDING_METADATA_AND_REVIEW` | Reference candidate; rights and review closure remain open. |
| `SRC-0044` | `02_Internship/Internship books SEG/Surgery_HighYield_Review.pdf` | `c5d05145b2cb796da45a07870ef4b7917890efb42731761f3cbba96282c8dc8f` | Reference / Atlas / reference contract candidate | `PENDING_METADATA_AND_REVIEW` | Reference candidate; rights and review closure remain open. |
| `SRC-0046` | `02_Internship/Internship_Guides/Intern_Professionalism_Guide.md` | `9b86500a51bef6b28db1b8636f99b77f153353711392c59e91ccf191eb7863f1` | Learning Content / `lesson` | `BLOCKED_PENDING_REVIEW` | Guide candidate; unique pathway mapping unresolved. |
| `SRC-0047` | `02_Internship/Internship_Guides/Intern_Transition_Guide.md` | `0fa4aaff3bc1e698e15f8e51a405aa33d2ec8f72199a54e8271ed38e62d0efc2` | Learning Content / `lesson` | `BLOCKED_PENDING_REVIEW` | Guide candidate; unique pathway mapping unresolved. |
| `SRC-0068` | `02_Internship/JMC_Exam_Practice/Reviewed/internal-medicine-intern-jmc.md` | `7fe6260a61598ba5aaf41652cee25c9a6fb63cdccc511e176005109eb5d2feb0` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Assessment candidate; unique pathway mapping unresolved. |
| `SRC-0069` | `02_Internship/JMC_Exam_Practice/Reviewed/obgyn-intern-jmc.md` | `d7516728cccd2f008f2d1d17ccb20c12724dee94566a780aa05f4c093d6159ee` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Assessment candidate; unique pathway mapping unresolved. |
| `SRC-0070` | `02_Internship/JMC_Exam_Practice/Reviewed/pediatrics-intern-jmc.md` | `b6b682469b93b74713589db3747e00aa94d33a8e75a439e91f2d79f382c6122b` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Assessment candidate; unique pathway mapping unresolved. |
| `SRC-0071` | `02_Internship/JMC_Exam_Practice/Reviewed/surgery-intern-jmc.md` | `8e0e975051fb0bf814d84516b356de0171d5cc24ac41d4c5340cb0dd6827d035` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Assessment candidate; unique pathway mapping unresolved. |
| `SRC-0072` | `02_Internship/JMC_Exam_Practice/Reviewed/_manifest.md` | `f69b14e2030f58e348d8591743a4ba10a95a1fcb41a8fe06f2dfefa581e7a34c` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Manifest-like assessment artifact; unique pathway mapping unresolved. |
| `SRC-0074` | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-internship.md` | `d36ae18c178d3677eed265264418550e7453c6f7d9552d47f3e914922c76b706` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Source-local assessment candidate; mapping and namespace evidence unresolved. |
| `SRC-0075` | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-study-summary.md` | `8ee1ac17b5443ad879e4e4777a188c6a540afc867f2ee60522e8f96b5b61d1f4` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Source-local assessment candidate; mapping and namespace evidence unresolved. |
| `SRC-0076` | `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-main.md` | `973e9403b5731bee2f4cb2a3308bc5dfd3a6906bf09fe5ebc79333dbe1d93c04` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Source-local assessment candidate; mapping and namespace evidence unresolved. |
| `SRC-0077` | `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-study-summary.md` | `7826588463334182241ae2a7143e16f990b7ded39340bae4cf592a0cd20cf066` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Source-local assessment candidate; mapping and namespace evidence unresolved. |
| `SRC-0078` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-main.md` | `189768c49b5be2df0a537a92d8c0a55ec0ea016d4f34ac10b314965a6eb10eac` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Lineage crosswalk candidate; preserve with `phone-pediatrics-main`, no identifier replacement. |
| `SRC-0079` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary-questions.md` | `608017bb39330062570d6faf664f74ec2c85573c426fb31c967161a560acd5ae` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Source-local assessment candidate; mapping and namespace evidence unresolved. |
| `SRC-0080` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary.md` | `9d5404b0ca18949c0a0d1e514af8b87a9fb3824de9923ba9bd29680391225755` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Source-local assessment candidate; mapping and namespace evidence unresolved. |
| `SRC-0081` | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-internship.md` | `91a73199e4eebbdc1d85abb8993d5a2ae488f41499699952091bb0a5dcec736f` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Source-local assessment candidate; mapping and namespace evidence unresolved. |
| `SRC-0082` | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-summary.md` | `641fcea76723575ef7e6ac94b6d643f1c65e66a060848731823f87b55ab9e9b6` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Source-local assessment candidate; mapping and namespace evidence unresolved. |
| `SRC-0083` | `02_Internship/JMC_Exam_Practice/Sources_Phone/_manifest.md` | `7c4bdd6c7e9a0bde90f4372f4b63bb2c730cf2b9bb5db92d39df77688eb4f3e8` | Assessment / `question_bank` | `BLOCKED_PENDING_REVIEW` | Source-local manifest candidate; mapping and namespace evidence unresolved. |
| `SRC-0090` | `02_Internship/Logbook/Logbook_Requirements.md` | `8537c2e245f2240e3df6c66dd6191c17de03832a554e445ee0b4f355c899bad8` | Skills / Procedures / contract candidate | `PENDING_METADATA_AND_REVIEW` | Logbook/skills candidate; explicit contract and competency boundary required. |
| `SRC-0094` | `02_Internship/OSCE/OSCE_Internship_Framework.md` | `e0b5d40f2fd4ca2cca65ba6dec73c826b3ff6076a06865e26afa7fd0198a91c9` | Skills / Procedures / contract candidate | `PENDING_METADATA_AND_REVIEW` | OSCE framework candidate; explicit competency contract required. |
| `SRC-0095` | `02_Internship/OSCE/README.md` | `18356f2b7d2ae19d5290ad486229afdb900b0085a0d25dff0b607a1f6b699b88` | Skills / Procedures / contract candidate | `PENDING_METADATA_AND_REVIEW` | OSCE candidate; explicit competency contract required. |
| `SRC-0111` | `02_Internship/Study/Roadmap/README.md` | `a03ace5aec416597ccf949c2d258fa69b72ca473f08852f752711fcaaa7f3cab` | Learning Content / `lesson` | `BLOCKED_PENDING_REVIEW` | Roadmap candidate; unique pathway mapping unresolved. |

## 4. Technical implementation assets — exact exclusions

The following 61 members are preserved for technical lineage and explicitly excluded from medical-content ingestion. They do not receive a medical Source ID in this manifest. Their exact archive paths and SHA-256 values are retained here so they cannot be silently included in a future revalidation scope.

| Member | Preserved archive path | SHA-256 | Exclusion reason |
|---:|---|---|---|
| 50 | `02_Internship/JMC_Exam_Practice/Internal_Medicine/page.tsx` | `c9e3a239fc1d678915cb502aa22930526e4593e1e5672a9fc9e936563dc490f3` | Route/page implementation asset; excluded. |
| 51 | `02_Internship/JMC_Exam_Practice/Internal_Medicine/questionData.ts` | `df8b1b79cb5e0f4adcb33c46ac611b24bbb11758c785bb5f15831182c3123fc3` | Question-data implementation utility; excluded. |
| 53 | `02_Internship/JMC_Exam_Practice/Internal_Medicine/[moduleSlug]/page.tsx` | `47e307f70003e0d9e866010effda578c09f35191bae3a10a9aa26aa2e4c35c43` | Route/page implementation asset; excluded. |
| 55 | `02_Internship/JMC_Exam_Practice/OBGYN/page.tsx` | `5a31d5d5e6255fbbef745589684ad572616eb2f8c620aea6161fa7793e3fd8d9` | Route/page implementation asset; excluded. |
| 56 | `02_Internship/JMC_Exam_Practice/OBGYN/questionData.ts` | `e5747d584d406ffdbb2f3dc06d185c1967d062c540a5a37e4f416f7a53431f2d` | Question-data implementation utility; excluded. |
| 58 | `02_Internship/JMC_Exam_Practice/OBGYN/[moduleSlug]/page.tsx` | `10f76aa87261507ef2795b2f843f1231bd0e9be56aa3f9fbd732506eccab21d9` | Route/page implementation asset; excluded. |
| 59 | `02_Internship/JMC_Exam_Practice/page.tsx` | `56ddca31cabf7b5afcafc37a1c675aad1f3bfa0226732cb779daad59a4507dd5` | Route/page implementation asset; excluded. |
| 60 | `02_Internship/JMC_Exam_Practice/parseQuestions.ts` | `fcfa41252e19935f6b06a24698b91e4d2042a28f28f5831f4b4c48ce7162f9d2` | Parser implementation utility; excluded. |
| 62 | `02_Internship/JMC_Exam_Practice/Pediatrics/page.tsx` | `72a8f05b1dc37f8459036867d6094cab1681c60bdcc44b682f84b23c57f48b26` | Route/page implementation asset; excluded. |
| 63 | `02_Internship/JMC_Exam_Practice/Pediatrics/questionData.ts` | `2a49c5447764cfdf5d4e1723bb1366e3cece11d50a95efc869ec74479b434ad2` | Question-data implementation utility; excluded. |
| 65 | `02_Internship/JMC_Exam_Practice/Pediatrics/[moduleSlug]/page.tsx` | `f9978cad1b0be51662204578977922d6b60bc8653a740880262dcff0cca5d9bd` | Route/page implementation asset; excluded. |
| 66 | `02_Internship/JMC_Exam_Practice/QuestionCard.tsx` | `9e61049cbd6a2364af938b477725e9c5264d465e6b6c9df0143be6b5490c2a27` | UI component implementation asset; excluded. |
| 85 | `02_Internship/JMC_Exam_Practice/Surgery/page.tsx` | `f9ca06bb654653dc98611ff8abaa57986b9cd7d674a22dc6bbad512984d8ff8c` | Route/page implementation asset; excluded. |
| 86 | `02_Internship/JMC_Exam_Practice/Surgery/questionData.ts` | `d448920683bb5bacd8765033a01e8d69b89eeffa5a42e0132d65ff72dee0221a` | Question-data implementation utility; excluded. |
| 88 | `02_Internship/JMC_Exam_Practice/Surgery/[moduleSlug]/page.tsx` | `687126b340f3ccb588d258c1ae9afe300f6c4aae2060c7f5dd2eb26b4d953496` | Route/page implementation asset; excluded. |
| 112 | `02_Internship/Study/Airway_Basics/page.tsx` | `7294319e7c82a228fd57a03a812c55ee2f6857e39425ec1c9b17ca48d267e5bd` | Route/page implementation asset; excluded. |
| 114 | `02_Internship/Study/ED_Workflow/page.tsx` | `d9c80b510fc3598ec3469de00ff936b8e70d4be091307e418e557eedeccef4d6` | Route/page implementation asset; excluded. |
| 116 | `02_Internship/Study/Exam_Focus_Map/page.tsx` | `80dc9be0a828cece04b9a19f4f6fb30c76027a5d43a4592c2b54a50b00c91c0a` | Route/page implementation asset; excluded. |
| 118 | `02_Internship/Study/First_Night_Shift/page.tsx` | `1e9c2fe8fd62211b7678484bbb30ac84a6ce241a2222d61b7a9ecc93702b1c65` | Route/page implementation asset; excluded. |
| 120 | `02_Internship/Study/Handover/page.tsx` | `fe99d8013c7a9de32fa887f1a5d553ecbe51d3c7b1c89c9c0e8163d769757f58` | Route/page implementation asset; excluded. |
| 122 | `02_Internship/Study/Overview/page.tsx` | `f11c3734488ea556af452263b8d823fc53acaae518c8d102fe0b6581572a07d0` | Route/page implementation asset; excluded. |
| 123 | `02_Internship/Study/page.tsx` | `72fbcbe1560f8fbbcf3a00a951e8cf6c1dd41bf6afc83b0a74310667dfb8fa2c` | Route/page implementation asset; excluded. |
| 129 | `02_Internship/Study/Study_Plan/internal-medicine/emergency-cardiology/page.tsx` | `5d14df180faec40e5c228fe2a02cd61c165fc33b1507b216cb3f9d79c1345aad` | Route/page implementation asset; excluded. |
| 131 | `02_Internship/Study/Study_Plan/internal-medicine/endocrine-emergencies/page.tsx` | `cda89ec5cbd8ef6ccf62a1ea9a833529337b8ef937ccf608d0225bcfb84907b2` | Route/page implementation asset; excluded. |
| 133 | `02_Internship/Study/Study_Plan/internal-medicine/gi-emergencies/page.tsx` | `eda7df9ad7fea7177675563fa071fdc0a17c4de020325d9121c081252f20d1ea` | Route/page implementation asset; excluded. |
| 135 | `02_Internship/Study/Study_Plan/internal-medicine/infectious-disease/page.tsx` | `2c31782a7e79406430d867f07889d24c16fb027df8d29e0436effc49afd3f56d` | Route/page implementation asset; excluded. |
| 137 | `02_Internship/Study/Study_Plan/internal-medicine/nephrology-electrolytes/page.tsx` | `66353bbdd6ced37f19f62c85df1c73a714c447e5700d00d43458dc0a19b9b815` | Route/page implementation asset; excluded. |
| 139 | `02_Internship/Study/Study_Plan/internal-medicine/neurology-emergencies/page.tsx` | `09eb6df521ec17c9aea1b22271b62acfa81b11b3849a8f442f78584353b71e52` | Route/page implementation asset; excluded. |
| 140 | `02_Internship/Study/Study_Plan/internal-medicine/page.tsx` | `a537c3b62054e0ca73235fac77f988922ee8a21fe45baf8f76d3dfebf3393504` | Route/page implementation asset; excluded. |
| 142 | `02_Internship/Study/Study_Plan/internal-medicine/respiratory-emergencies/page.tsx` | `9a8930b3e497e7e07269dc9dc9ffac8e31164d176cde4e7f4100b126070e61fe` | Route/page implementation asset; excluded. |
| 145 | `02_Internship/Study/Study_Plan/obgyn/breast-disorders/page.tsx` | `eb7a303a8ea2e5eaa809cc67553ebea1f8b1b409fbe3c939a1a6145a98e31f57` | Route/page implementation asset; excluded. |
| 147 | `02_Internship/Study/Study_Plan/obgyn/contraception-oncology-basics/page.tsx` | `0e7a9f050ae5b0932529a15d51aec1dc201a998466364d36e3caa951d37dd0c8` | Route/page implementation asset; excluded. |
| 149 | `02_Internship/Study/Study_Plan/obgyn/early-pregnancy-bleeding/page.tsx` | `4970b507e1c6409289b9c69fb008a805359ea901059e80d36edef7d740b7bd91` | Route/page implementation asset; excluded. |
| 151 | `02_Internship/Study/Study_Plan/obgyn/ectopic-pregnancy/page.tsx` | `0990752b9a19f2960cf062d00db6080f1bbfe531f573c5fdc3ea090de18770c0` | Route/page implementation asset; excluded. |
| 153 | `02_Internship/Study/Study_Plan/obgyn/gynecologic-emergencies/page.tsx` | `6b631de3bbe6a79e0d1acdee003a440fe264192ec608c2a9036662d2ff2288ac` | Route/page implementation asset; excluded. |
| 155 | `02_Internship/Study/Study_Plan/obgyn/hypertensive-disorders/page.tsx` | `cbaba09267ab33fed104f94286752b4d770b6a653d80073b54da663b8a73665a` | Route/page implementation asset; excluded. |
| 157 | `02_Internship/Study/Study_Plan/obgyn/labor-delivery/page.tsx` | `f92b4ed2effa7807f101d3d8cf90f5704583936dbc4460c2cdce5e5625cec084` | Route/page implementation asset; excluded. |
| 159 | `02_Internship/Study/Study_Plan/obgyn/menstrual-hormonal-disorders/page.tsx` | `c7d17a48e1532bb75471e6d15c9601b2120fed4d38960391cba959c5e9f07533` | Route/page implementation asset; excluded. |
| 160 | `02_Internship/Study/Study_Plan/obgyn/page.tsx` | `bd1d52204836f053898cadebc76f2ac2e2d6290a7147f29bfcdacd78987c7242` | Route/page implementation asset; excluded. |
| 162 | `02_Internship/Study/Study_Plan/obgyn/perinatal-infections/page.tsx` | `e525c6b0d1e6cfffcaf3cffd29190120888815b167f31d52a4b4cfff39cb95d7` | Route/page implementation asset; excluded. |
| 164 | `02_Internship/Study/Study_Plan/obgyn/postpartum-hemorrhage/page.tsx` | `26aef93c064cd446a00624cdf81c10d11d22da2743973e4f640db558571e1d9c` | Route/page implementation asset; excluded. |
| 166 | `02_Internship/Study/Study_Plan/obgyn/prenatal-care-testing/page.tsx` | `6a2b91cc60090606202b9db2780bc7b8cb4f75aef2b3f7e3ea5da77a1c8f11a3` | Route/page implementation asset; excluded. |
| 168 | `02_Internship/Study/Study_Plan/obgyn/reproductive-basics/page.tsx` | `65111f7aa155e41684b22f5a20aa33656be615fad9d9cd13efc3fc3b8297efc7` | Route/page implementation asset; excluded. |
| 170 | `02_Internship/Study/Study_Plan/obgyn/stds-vaginal-infections/page.tsx` | `57cd3e958beeca44d400bdb558b8cf502db1f594ee6cbda36c262f981eae12ac` | Route/page implementation asset; excluded. |
| 171 | `02_Internship/Study/Study_Plan/page.tsx` | `3979206f4147fe9ff8ceec82876d6008e6543e7cec85b5918a0d7fd06f4aa019` | Route/page implementation asset; excluded. |
| 174 | `02_Internship/Study/Study_Plan/pediatrics/dehydration-gastroenteritis/page.tsx` | `afd15ca78624621aa9d46292b0f1825a2048ada918120846e89a467befd15182` | Route/page implementation asset; excluded. |
| 176 | `02_Internship/Study/Study_Plan/pediatrics/emergency-cases/page.tsx` | `156fc6f684dd4fc01eb36482a7631de90303b32a9e17aa49d1665d84739db14c` | Route/page implementation asset; excluded. |
| 178 | `02_Internship/Study/Study_Plan/pediatrics/infectious-disease-vaccines/page.tsx` | `2f5683dd42caed4ddd6a115239bb07fefd86511c1033c90f6bcea203b864e6a4` | Route/page implementation asset; excluded. |
| 180 | `02_Internship/Study/Study_Plan/pediatrics/neonatal-emergencies/page.tsx` | `c492d3722b47a65fdf5a627eaa22350f01bdd3d3a98a4604eb39625f71e35658` | Route/page implementation asset; excluded. |
| 181 | `02_Internship/Study/Study_Plan/pediatrics/page.tsx` | `aefb8cf88a2a3615da90911169cd8c035a7dab38854282fbb11f167fe2d59646` | Route/page implementation asset; excluded. |
| 183 | `02_Internship/Study/Study_Plan/pediatrics/red-flags/page.tsx` | `a955a7f9e59e58f94c7846b1b05faba05214f634c7935f85f84598d9839fa056` | Route/page implementation asset; excluded. |
| 185 | `02_Internship/Study/Study_Plan/pediatrics/respiratory-emergencies/page.tsx` | `99cad34ab2e6eafd6c6d084363b37ebb27eb69df7fa802ca441452e47a904cac` | Route/page implementation asset; excluded. |
| 188 | `02_Internship/Study/Study_Plan/surgery/acute-abdomen/page.tsx` | `308bb8c6eef2cb217f8fccc3107ef00cf3c9ed80a0e820e509b60bc65376d5f2` | Route/page implementation asset; excluded. |
| 190 | `02_Internship/Study/Study_Plan/surgery/fluids-electrolytes-transfusion/page.tsx` | `a5a635c35d2c5e7423fcdab41d23647902ae301e82c0f6bbe94f4929897813a1` | Route/page implementation asset; excluded. |
| 191 | `02_Internship/Study/Study_Plan/surgery/page.tsx` | `664f9521dbc487ce97dd18ece7f5ff92606d8d0ded6b9e4d5324850e0d27d2e4` | Route/page implementation asset; excluded. |
| 193 | `02_Internship/Study/Study_Plan/surgery/procedures/page.tsx` | `bc6886ee3f7a6066fbe7e17da7ce75bf6d081544bbdb9a5b5ab309da71aefac1` | Route/page implementation asset; excluded. |
| 195 | `02_Internship/Study/Study_Plan/surgery/surgical-basics/page.tsx` | `325ed591d0123bf19d9e989697463ab521181e76f9df41f835fd2766748d3aa3` | Route/page implementation asset; excluded. |
| 197 | `02_Internship/Study/Study_Plan/surgery/trauma/page.tsx` | `6f4554490728aacbba394e0d887b694196149ce1a67584e57248c8d8b804fd5b` | Route/page implementation asset; excluded. |
| 199 | `02_Internship/Study/Study_Plan/surgery/vascular-urology/page.tsx` | `a05759dd69b75b2d5ea52d8f5fc31234fcc2fb93fff8f215334f604bbc63eac5` | Route/page implementation asset; excluded. |
| 201 | `02_Internship/Study/Study_Plan/surgery/wounds-infections/page.tsx` | `5647a1dd03b1e9124c59dd6ac5c464008620001fe3ce2a3babd62525890f660e` | Route/page implementation asset; excluded. |
| 203 | `02_Internship/Study/Study_Plan_Overview/page.tsx` | `20670472f8c122f56383db66cf301dab537950cd6c2e90a7b3399d6a7841058b` | Route/page implementation asset; excluded. |

The technical set remains preserved in the original archive/staging lineage. No technical asset is a source for medical-content ingestion in this phase.

## 5. Exact scope controls and exclusions

| Scope item | Manifest decision |
|---|---|
| Candidate medical-content artifacts | 48 exact A–E source records listed in Section 3; all remain pending evidence/review. |
| Technical implementation assets | 61 exact members listed in Section 4; excluded from medical-content ingestion. |
| Unknown/requires-review population | 20 items remain held back; no final domain/schema target is assigned by this manifest. |
| Carried-forward unresolved rows | 67 rows remain unresolved in the prior pipeline and are not silently promoted by this manifest. |
| Approved records | 0; no source-to-schema mapping is approved for production. |
| Duplicate families | `DUP-DRUG-001` and `DUP-EMERGENCY-001` are preserved for separate comparison; `v2_Pack` remains a design candidate, not canonical. |
| Lineage conflict | `SRC-0078` and `phone-pediatrics-main` remain preserved crosswalk identifiers; namespace closure is open. |
| Other professional tracks | Excluded; no Resident, Student, EMS, Nursing, GP, or Shared Core content is silently mixed. |
| Production artifacts | Excluded; no database/application records, JSON payloads, routes, assets, or activation outputs are in scope. |

## 6. Manifest validation status

| Check | Result |
|---|---|
| Exact candidate paths listed | `PASS — 48 A–E rows listed` |
| Source IDs preserved | `PASS — no identifier replacement` |
| Candidate SHA-256 references included | `PASS — carried-forward values listed; independent verification pending` |
| Technical assets explicitly excluded | `PASS — 61 exact members listed` |
| Governance artifact paths and SHA-256 included | `PASS` |
| Final immutable scope freeze | `NOT EXECUTED` |
| Independent SHA reconciliation to preserved originals | `PENDING` |
| Evidence gates closed | `FALSE` |
| Schema-revalidation authorization | `NOT GRANTED` |
| JSON/schema conversion/import/application changes | `FALSE` |
| Original source deletion/rename/merge/archive | `FALSE` |

## References

[1]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md` "Phase 5.10 Source-to-Schema Mapping Plan"  
[2]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_TECHNICAL_ASSET_SEPARATION_REPORT.md` "Phase 5.8 Technical Asset Separation Report"  
[3]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_FINAL_SOURCE_EVIDENCE_MATRIX.md` "Phase 5.5 Final Source Evidence Matrix"  
[4]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_GOVERNANCE_ACCEPTANCE_DECISION_RECORD.md` "Phase 6.8 Governance Acceptance Decision Record"  
[5]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_9_GATE_REPORT.md` "Phase 6.9 Gate Report"  
