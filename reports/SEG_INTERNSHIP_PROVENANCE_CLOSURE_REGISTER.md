# SEG Internship Provenance Closure Register

**Phase:** 6.11 — Controlled Decision Closure & Schema Revalidation Gate Preparation  
**Mode:** `READ_ONLY GOVERNANCE EXECUTION`  
**Scope:** The 48 exact candidate medical-content artifacts in the governed revalidation manifest.  
**Status:** Evidence references recorded; provenance, governed version, rights, reviewer, track/taxonomy, audit, and production closure remain open or partial.

## 1. Purpose and evidence boundary

This register carries forward only the `Source ID`, preserved archive path, and SHA-256 values explicitly listed in the controlled revalidation artifact manifest. It does not recalculate or independently verify the checksums, create source records, select canonical content, or infer publisher, owner, rights, reviewer, governed version, taxonomy ID, or clinical status.[1]

The manifest states that these 48 records are candidates only, with 0 approved production mappings; 61 technical implementation assets are excluded, 20 unknown items remain held back, and 67 prior rows remain unresolved. The manifest also preserves `SRC-0078` / `phone-pediatrics-main` as an open crosswalk and keeps both duplicate families non-canonical.[1]

## 2. Provenance register

| Source ID | Preserved path | SHA-256 | Existing version evidence | Existing lineage evidence |
|---|---|---|---|---|
| `SRC-0003` | `02_Internship/Assessments/Assessment_Structure.md` | `8c1df6ff33d01eaa58d996ca218485701db3b25afdc3c0aee3eb3f30227de7f2` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0004` | `02_Internship/Assessments/README.md` | `c09e38390df246d1702365db11796e05fef1e378d9e71bcfb766831ac778246a` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0007` | `02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md` | `6905896a44c7cd82696876ca5d6e4a7e0ca969d3d9af4e524390d26a0abc90fd` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0008` | `02_Internship/Clinical_Rotations/Emergency_Basics/README.md` | `4e70507f9248eb1e8babef0a7d0882989c2609934725cfd4b757a16474560a86` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0010` | `02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md` | `8c5ba43ad4d14a788f8f152a8fab65e9bb2c5478404538726a22106c66626988` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0012` | `02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md` | `6028f47c68a813428aa563166e93cd28bc18cb082eee7437e8993d3938dd8bef` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0014` | `02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md` | `4e179a35361f619bc63d495d871473d6cbad232c71188956f4ea23015de4ba72` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0015` | `02_Internship/Clinical_Rotations/README.md` | `94d6b002261f320a9c8e71188926204837e5918d073a40e170b3d3b50a31b62a` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0017` | `02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md` | `1cc4aa679dce0c3ef1fc9f1a8abd193945041804296e044c524a292b0f0a348a` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0019` | `02_Internship/Clinical_Skills/Clinical_Skills_Internship_Framework.md` | `2ee9c201e9e431fac17ab1644bfb826ecfd5d546683acc5ec128b8482ab10d27` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0020` | `02_Internship/Clinical_Skills/README.md` | `6e3156e5deabcbbf63b6b8c7f0c097bf66941a59c0267a4f86603e254901119b` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0023` | `02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md` | `bb0508f5b5a4bbdbf4919d28f4115f444c26ed514c2c4f50f13723bab91225fb` | `NOT_SUPPLIED`; filename contains `v2`, which is not governed version evidence. | `DUP-DRUG-001` Base-family lineage preserved; non-canonical. |
| `SRC-0024` | `02_Internship/Drug_Essentials/implementation_notes.md` | `810d08ed40ef7f190995b2eead2d8ee670d06de511223e1455dea5bb3d9d1e1e` | `NOT_SUPPLIED`; no governed version supplied. | `DUP-DRUG-001` Base-family lineage preserved; non-canonical. |
| `SRC-0025` | `02_Internship/Drug_Essentials/README.txt` | `64469d1134e1045a96230469388ea31b7f4adc797be7f2260696df30a0e93401` | `NOT_SUPPLIED`; no governed version supplied. | `DUP-DRUG-001` Base-family lineage preserved; non-canonical. |
| `SRC-0027` | `02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md` | `2bc084ccf0d074cf22573b8ca352b0918eb1ca448eed8f2a6885a3f5e2777d27` | `NOT_SUPPLIED`; `v2_Pack`/`v2` filename signal is not governed version evidence. | `DUP-DRUG-001` v2_Pack lineage preserved; primary design candidate only, non-canonical. |
| `SRC-0028` | `02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md` | `5a30d419e6aa14626652532d3d657a7657f4cea2dc49980805497d29d5a36831` | `NOT_SUPPLIED`; `v2_Pack` filename signal is not governed version evidence. | `DUP-DRUG-001` v2_Pack lineage preserved; non-canonical. |
| `SRC-0029` | `02_Internship/Drug_Essentials_v2_Pack/README.txt` | `5c2377e8c30aa6c901eb5bb5a3b4c6679c33f27de883c480a42e38eab6282eb5` | `NOT_SUPPLIED`; `v2_Pack` filename signal is not governed version evidence. | `DUP-DRUG-001` v2_Pack lineage preserved; non-canonical. |
| `SRC-0033` | `02_Internship/Emergency_Cases/emergency_cases_intern_level.md` | `2b3afae2bf4d19d837f0075ca979c5810d49eb3e82f0dcb9356ce1a47962a99c` | `NOT_SUPPLIED`; manifest candidate state only. | `DUP-EMERGENCY-001` Base-family lineage preserved; non-canonical. |
| `SRC-0034` | `02_Internship/Emergency_Cases/implementation_notes.md` | `6b74fe4e4b450289df6cb54358f32f46da737236646310da9784d5cefde649a8` | `NOT_SUPPLIED`; no governed version supplied. | `DUP-EMERGENCY-001` Base-family lineage preserved; non-canonical. |
| `SRC-0035` | `02_Internship/Emergency_Cases/README.txt` | `e22eeb24f6ed69e75ae1d4d6c90e4ce67a4b0549a2c7af5364e578011e8a17bd` | `NOT_SUPPLIED`; no governed version supplied. | `DUP-EMERGENCY-001` Base-family lineage preserved; non-canonical. |
| `SRC-0037` | `02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md` | `455983813a4f540fc6b5f9520e245886ed775c1ae472ade79ce7089b6ed068a4` | `NOT_SUPPLIED`; `v2_Pack`/`v2` filename signal is not governed version evidence. | `DUP-EMERGENCY-001` v2_Pack lineage preserved; primary design candidate only, non-canonical. |
| `SRC-0038` | `02_Internship/Emergency_Cases_v2_Pack/implementation_notes.md` | `4fedbe459e19e938cb63fb164d025e651593d0b7dc56a75237d05c8fd83d3495` | `NOT_SUPPLIED`; `v2_Pack` filename signal is not governed version evidence. | `DUP-EMERGENCY-001` v2_Pack lineage preserved; non-canonical. |
| `SRC-0039` | `02_Internship/Emergency_Cases_v2_Pack/README.txt` | `81d8a30163db1bc453c936dc9815a42630acebd88f48905d4befb44b626c0ce1` | `NOT_SUPPLIED`; `v2_Pack` filename signal is not governed version evidence. | `DUP-EMERGENCY-001` v2_Pack lineage preserved; non-canonical. |
| `SRC-0041` | `02_Internship/Internship books SEG/IM_HighYield_Review.pdf` | `d6374402fc43b236023cebf6679240c4229d6e570be4f81a216a9498a9f7543d` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0042` | `02_Internship/Internship books SEG/ObGyn_HighYield_Review_Dr_Alaa_Aqrabawi.pdf` | `2ea59d2787806fc09d0922f0e8116b08e41ca57c2aaa2aa42b4d179f1f9138f9` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0043` | `02_Internship/Internship books SEG/Pediatrics_HighYield_Review.pdf` | `9817f7cf2a905d76deb029a1658f81eb1c0e4e05e7de104ea71b6914626aee7a` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0044` | `02_Internship/Internship books SEG/Surgery_HighYield_Review.pdf` | `c5d05145b2cb796da45a07870ef4b7917890efb42731761f3cbba96282c8dc8f` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0046` | `02_Internship/Internship_Guides/Intern_Professionalism_Guide.md` | `9b86500a51bef6b28db1b8636f99b77f153353711392c59e91ccf191eb7863f1` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0047` | `02_Internship/Internship_Guides/Intern_Transition_Guide.md` | `0fa4aaff3bc1e698e15f8e51a405aa33d2ec8f72199a54e8271ed38e62d0efc2` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0068` | `02_Internship/JMC_Exam_Practice/Reviewed/internal-medicine-intern-jmc.md` | `7fe6260a61598ba5aaf41652cee25c9a6fb63cdccc511e176005109eb5d2feb0` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0069` | `02_Internship/JMC_Exam_Practice/Reviewed/obgyn-intern-jmc.md` | `d7516728cccd2f008f2d1d17ccb20c12724dee94566a780aa05f4c093d6159ee` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0070` | `02_Internship/JMC_Exam_Practice/Reviewed/pediatrics-intern-jmc.md` | `b6b682469b93b74713589db3747e00aa94d33a8e75a439e91f2d79f382c6122b` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0071` | `02_Internship/JMC_Exam_Practice/Reviewed/surgery-intern-jmc.md` | `8e0e975051fb0bf814d84516b356de0171d5cc24ac41d4c5340cb0dd6827d035` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0072` | `02_Internship/JMC_Exam_Practice/Reviewed/_manifest.md` | `f69b14e2030f58e348d8591743a4ba10a95a1fcb41a8fe06f2dfefa581e7a34c` | `NOT_SUPPLIED`; manifest-like artifact, no governed version supplied. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0074` | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-internship.md` | `d36ae18c178d3677eed265264418550e7453c6f7d9552d47f3e914922c76b706` | `NOT_SUPPLIED`; manifest candidate state only. | Source-local path preserved; no separate namespace/lineage decision supplied. |
| `SRC-0075` | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-study-summary.md` | `8ee1ac17b5443ad879e4e4777a188c6a540afc867f2ee60522e8f96b5b61d1f4` | `NOT_SUPPLIED`; manifest candidate state only. | Source-local path preserved; no separate namespace/lineage decision supplied. |
| `SRC-0076` | `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-main.md` | `973e9403b5731bee2f4cb2a3308bc5dfd3a6906bf09fe5ebc79333dbe1d93c04` | `NOT_SUPPLIED`; manifest candidate state only. | Source-local path preserved; no separate namespace/lineage decision supplied. |
| `SRC-0077` | `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-study-summary.md` | `7826588463334182241ae2a7143e16f990b7ded39340bae4cf592a0cd20cf066` | `NOT_SUPPLIED`; manifest candidate state only. | Source-local path preserved; no separate namespace/lineage decision supplied. |
| `SRC-0078` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-main.md` | `189768c49b5be2df0a537a92d8c0a55ec0ea016d4f34ac10b314965a6eb10eac` | `NOT_SUPPLIED`; no governed version supplied. | `CROSSWALK` with source-local `phone-pediatrics-main` recorded as design decision; alias/distinct namespace semantics remain open. |
| `SRC-0079` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary-questions.md` | `608017bb39330062570d6faf664f74ec2c85573c426fb31c967161a560acd5ae` | `NOT_SUPPLIED`; manifest candidate state only. | Source-local path preserved; no separate namespace/lineage decision supplied. |
| `SRC-0080` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary.md` | `9d5404b0ca18949c0a0d1e514af8b87a9fb3824de9923ba9bd29680391225755` | `NOT_SUPPLIED`; manifest candidate state only. | Source-local path preserved; no separate namespace/lineage decision supplied. |
| `SRC-0081` | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-internship.md` | `91a73199e4eebbdc1d85abb8993d5a2ae488f41499699952091bb0a5dcec736f` | `NOT_SUPPLIED`; manifest candidate state only. | Source-local path preserved; no separate namespace/lineage decision supplied. |
| `SRC-0082` | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-summary.md` | `641fcea76723575ef7e6ac94b6d643f1c65e66a060848731823f87b55ab9e9b6` | `NOT_SUPPLIED`; manifest candidate state only. | Source-local path preserved; no separate namespace/lineage decision supplied. |
| `SRC-0083` | `02_Internship/JMC_Exam_Practice/Sources_Phone/_manifest.md` | `7c4bdd6c7e9a0bde90f4372f4b63bb2c730cf2b9bb5db92d39df77688eb4f3e8` | `NOT_SUPPLIED`; manifest-like artifact, no governed version supplied. | Source-local path preserved; no separate namespace/lineage decision supplied. |
| `SRC-0090` | `02_Internship/Logbook/Logbook_Requirements.md` | `8537c2e245f2240e3df6c66dd6191c17de03832a554e445ee0b4f355c899bad8` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0094` | `02_Internship/OSCE/OSCE_Internship_Framework.md` | `e0b5d40f2fd4ca2cca65ba6dec73c826b3ff6076a06865e26afa7fd0198a91c9` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0095` | `02_Internship/OSCE/README.md` | `18356f2b7d2ae19d5290ad486229afdb900b0085a0d25dff0b607a1f6b699b88` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |
| `SRC-0111` | `02_Internship/Study/Roadmap/README.md` | `a03ace5aec416597ccf949c2d258fa69b72ca473f08852f752711fcaaa7f3cab` | `NOT_SUPPLIED`; manifest candidate state only. | Source ID and preserved path only; no separate lineage decision supplied. |

## 3. Gate-level interpretation

| Gate | Current evidence supported by this register | Status | Required next authority/action |
|---|---|---|---|
| Source identity | Source IDs, preserved paths, and carried-forward SHA-256 values are listed. | `PARTIAL` | Independently reconcile each checksum to the preserved original and record an attributable event. |
| Governed version | No source-level governed version is supplied; `v2` filename tokens are explicitly insufficient. | `OPEN` | Source/version authority must supply and record governed version evidence. |
| Lineage | Duplicate-family preservation and the `SRC-0078` crosswalk are recorded as design evidence. | `PARTIAL` | Close namespace semantics and complete per-event lineage linkage. |
| Rights | No rights or display permissions are supplied by this register. | `OPEN` | Independent rights authority must review text, images, references, and display scope. |
| Reviewer | No per-source clinical/relevant reviewer decision is created here. | `OPEN` | Qualified reviewer assignment and attributable review records are required. |
| Track/taxonomy | Pathway context exists, but per-source `02_Internship`, taxonomy ID, and taxonomy version are not closed. | `PARTIAL` | Track/taxonomy authority must validate each source without filename/folder inference. |
| Audit | Fields are prepared in the bootstrap record, but no append-only event is created here. | `OPEN` | Authorized recorder must create and link append-only events. |

## 4. Non-actions

This register does not generate JSON, convert or revalidate schema, import content, modify the database or application, activate or publish content, approve clinical material, approve rights, select canonical sources, or alter original files. The 48 candidate records remain candidates only.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_REVALIDATION_ARTIFACT_MANIFEST.md "SEG Internship Revalidation Artifact Manifest"
[2]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_FINAL_SOURCE_EVIDENCE_MATRIX.md "SEG Internship Final Source Evidence Matrix"
[3]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_FINAL_GOVERNANCE_DECISION_RECORD.md "SEG Internship Final Governance Decision Record"

<!-- END OF REGISTER -->
