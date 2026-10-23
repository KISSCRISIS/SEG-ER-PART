# SEG Phase 7.8.5 — Metadata State Closure

> **Mode:** Controlled preparation only. This report converts unresolved metadata into explicit controlled states; it does not fill, infer, approve, or activate any field.
>
> **Review timestamp (UTC):** `2026-08-21T11:25:53Z`
>
> **Overall metadata status:** `BLOCKED_PENDING_FINAL_GATES`

## 1. Controlled state vocabulary

| Controlled state | Meaning in this phase | Permitted evidence to close later |
|---|---|---|
| `OWNER_PENDING` | Owner/publisher evidence is not supplied in the authorized handoff. | Explicit owner/publisher evidence with provenance. |
| `VERSION_PENDING` | A source SHA is preserved, but a source version value is not supplied. | Explicit version value tied to the source and checksum. |
| `RIGHTS_PENDING` | Rights scope is not classified by an independent rights review. | Independent text/image/display rights decision. |
| `TAXONOMY_PENDING` | Taxonomy ID/version evidence is not supplied or closed. | Explicit taxonomy assignment and version evidence. |
| `LOCATOR_PENDING` | A complete v1.1 reference/content locator is not supplied. | Exact locator tied to the source/version and, where applicable, display policy. |

These states are preparation metadata, not v1.1 enum values and not approvals. The existing `MISSING_FROM_SOURCE`, `PENDING_EXTERNAL_EVIDENCE`, and `UNRESOLVED` findings remain preserved in the Phase 7.8 map and field-mapping record [1] [2].

## 2. Closure summary

| Content type | Candidate count | OWNER_PENDING | VERSION_PENDING | RIGHTS_PENDING | TAXONOMY_PENDING | LOCATOR_PENDING |
|---|---:|---:|---:|---:|---:|---:|
| lesson | 16 | 16 | 16 | 16 | 16 | 16 |
| question_bank | 17 | 17 | 17 | 17 | 17 | 17 |
| clinical_case | 6 | 6 | 6 | 6 | 6 | 6 |
| clinical_skill | 5 | 5 | 5 | 5 | 5 | 5 |
| book | 4 | 4 | 4 | 4 | 4 | 4 |
| **Total** | **48** | **48** | **48** | **48** | **48** | **48** |

## 3. Candidate-level state register

| Candidate ID | Source ID | content_type | SHA-256 | Controlled states | Evidence handling | Readiness |
|---|---|---|---|---|---|---|
| CAND-7.6-SRC-0003 | SRC-0003 | question_bank | 8c1df6ff33d01eaa58d996ca218485701db3b25afdc3c0aee3eb3f30227de7f2 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0004 | SRC-0004 | question_bank | c09e38390df246d1702365db11796e05fef1e378d9e71bcfb766831ac778246a | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0007 | SRC-0007 | lesson | 6905896a44c7cd82696876ca5d6e4a7e0ca969d3d9af4e524390d26a0abc90fd | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0008 | SRC-0008 | lesson | 4e70507f9248eb1e8babef0a7d0882989c2609934725cfd4b757a16474560a86 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0010 | SRC-0010 | lesson | 8c5ba43ad4d14a788f8f152a8fab65e9bb2c5478404538726a22106c66626988 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0012 | SRC-0012 | lesson | 6028f47c68a813428aa563166e93cd28bc18cb082eee7437e8993d3938dd8bef | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0014 | SRC-0014 | lesson | 4e179a35361f619bc63d495d871473d6cbad232c71188956f4ea23015de4ba72 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0015 | SRC-0015 | lesson | 94d6b002261f320a9c8e71188926204837e5918d073a40e170b3d3b50a31b62a | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0017 | SRC-0017 | lesson | 1cc4aa679dce0c3ef1fc9f1a8abd193945041804296e044c524a292b0f0a348a | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0019 | SRC-0019 | clinical_skill | 2ee9c201e9e431fac17ab1644bfb826ecfd5d546683acc5ec128b8482ab10d27 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0020 | SRC-0020 | clinical_skill | 6e3156e5deabcbbf63b6b8c7f0c097bf66941a59c0267a4f86603e254901119b | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0023 | SRC-0023 | lesson | bb0508f5b5a4bbdbf4919d28f4115f444c26ed514c2c4f50f13723bab91225fb | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0024 | SRC-0024 | lesson | 810d08ed40ef7f190995b2eead2d8ee670d06de511223e1455dea5bb3d9d1e1e | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0025 | SRC-0025 | lesson | 64469d1134e1045a96230469388ea31b7f4adc797be7f2260696df30a0e93401 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0027 | SRC-0027 | lesson | 2bc084ccf0d074cf22573b8ca352b0918eb1ca448eed8f2a6885a3f5e2777d27 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0028 | SRC-0028 | lesson | 5a30d419e6aa14626652532d3d657a7657f4cea2dc49980805497d29d5a36831 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0029 | SRC-0029 | lesson | 5c2377e8c30aa6c901eb5bb5a3b4c6679c33f27de883c480a42e38eab6282eb5 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0033 | SRC-0033 | clinical_case | 2b3afae2bf4d19d837f0075ca979c5810d49eb3e82f0dcb9356ce1a47962a99c | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0034 | SRC-0034 | clinical_case | 6b74fe4e4b450289df6cb54358f32f46da737236646310da9784d5cefde649a8 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0035 | SRC-0035 | clinical_case | e22eeb24f6ed69e75ae1d4d6c90e4ce67a4b0549a2c7af5364e578011e8a17bd | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0037 | SRC-0037 | clinical_case | 455983813a4f540fc6b5f9520e245886ed775c1ae472ade79ce7089b6ed068a4 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0038 | SRC-0038 | clinical_case | 4fedbe459e19e938cb63fb164d025e651593d0b7dc56a75237d05c8fd83d3495 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0039 | SRC-0039 | clinical_case | 81d8a30163db1bc453c936dc9815a42630acebd88f48905d4befb44b626c0ce1 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0041 | SRC-0041 | book | d6374402fc43b236023cebf6679240c4229d6e570be4f81a216a9498a9f7543d | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0042 | SRC-0042 | book | 2ea59d2787806fc09d0922f0e8116b08e41ca57c2aaa2aa42b4d179f1f9138f9 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0043 | SRC-0043 | book | 9817f7cf2a905d76deb029a1658f81eb1c0e4e05e7de104ea71b6914626aee7a | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0044 | SRC-0044 | book | c5d05145b2cb796da45a07870ef4b7917890efb42731761f3cbba96282c8dc8f | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0046 | SRC-0046 | lesson | 9b86500a51bef6b28db1b8636f99b77f153353711392c59e91ccf191eb7863f1 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0047 | SRC-0047 | lesson | 0fa4aaff3bc1e698e15f8e51a405aa33d2ec8f72199a54e8271ed38e62d0efc2 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0068 | SRC-0068 | question_bank | 7fe6260a61598ba5aaf41652cee25c9a6fb63cdccc511e176005109eb5d2feb0 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0069 | SRC-0069 | question_bank | d7516728cccd2f008f2d1d17ccb20c12724dee94566a780aa05f4c093d6159ee | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0070 | SRC-0070 | question_bank | b6b682469b93b74713589db3747e00aa94d33a8e75a439e91f2d79f382c6122b | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0071 | SRC-0071 | question_bank | 8e0e975051fb0bf814d84516b356de0171d5cc24ac41d4c5340cb0dd6827d035 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0072 | SRC-0072 | question_bank | f69b14e2030f58e348d8591743a4ba10a95a1fcb41a8fe06f2dfefa581e7a34c | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0074 | SRC-0074 | question_bank | d36ae18c178d3677eed265264418550e7453c6f7d9552d47f3e914922c76b706 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0075 | SRC-0075 | question_bank | 8ee1ac17b5443ad879e4e4777a188c6a540afc867f2ee60522e8f96b5b61d1f4 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0076 | SRC-0076 | question_bank | 973e9403b5731bee2f4cb2a3308bc5dfd3a6906bf09fe5ebc79333dbe1d93c04 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0077 | SRC-0077 | question_bank | 7826588463334182241ae2a7143e16f990b7ded39340bae4cf592a0cd20cf066 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0078 | SRC-0078 | question_bank | 189768c49b5be2df0a537a92d8c0a55ec0ea016d4f34ac10b314965a6eb10eac | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0079 | SRC-0079 | question_bank | 608017bb39330062570d6faf664f74ec2c85573c426fb31c967161a560acd5ae | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0080 | SRC-0080 | question_bank | 9d5404b0ca18949c0a0d1e514af8b87a9fb3824de9923ba9bd29680391225755 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0081 | SRC-0081 | question_bank | 91a73199e4eebbdc1d85abb8993d5a2ae488f41499699952091bb0a5dcec736f | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0082 | SRC-0082 | question_bank | 641fcea76723575ef7e6ac94b6d643f1c65e66a060848731823f87b55ab9e9b6 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0083 | SRC-0083 | question_bank | 7c4bdd6c7e9a0bde90f4372f4b63bb2c730cf2b9bb5db92d39df77688eb4f3e8 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0090 | SRC-0090 | clinical_skill | 8537c2e245f2240e3df6c66dd6191c17de03832a554e445ee0b4f355c899bad8 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0094 | SRC-0094 | clinical_skill | e0b5d40f2fd4ca2cca65ba6dec73c826b3ff6076a06865e26afa7fd0198a91c9 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0095 | SRC-0095 | clinical_skill | 18356f2b7d2ae19d5290ad486229afdb900b0085a0d25dff0b607a1f6b699b88 | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |
| CAND-7.6-SRC-0111 | SRC-0111 | lesson | a03ace5aec416597ccf949c2d258fa69b72ca473f08852f752711fcaaa7f3cab | OWNER_PENDING, VERSION_PENDING, RIGHTS_PENDING, TAXONOMY_PENDING, LOCATOR_PENDING | No value invented; source evidence remains incomplete | BLOCKED_PENDING_FINAL_GATES |

## 4. Closure rules

No owner, publisher, version value, rights decision, taxonomy ID/version, locator, reviewer identity, or clinical conclusion is inferred from a filename, legacy JSON field, framework name, topic label, or SHA. The legacy JSON assets are analyzed separately as metadata enrichment candidates and do not close any of the five states in this register.

A future closure event must cite the exact source, version, locator, reviewer/rights authority where applicable, timestamp, and append-only audit event. Until then, each candidate remains `BLOCKED_PENDING_FINAL_GATES` and is not production-ready.

## Non-actions

| Action | Result |
|---|---|
| Metadata values invented | `false` |
| Original sources modified | `false` |
| Production JSON generated | `false` |
| Import or database write | `false` |
| Activation or publication | `false` |

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_IMPORT_PREPARATION_MAP.md "SEG Phase 7.8 Import Preparation Map"
[2]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_FIELD_MAPPING_VALIDATION.md "SEG Phase 7.8 Field Mapping Validation"
[3]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG Content Record v1.1 schema profile"
[4]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_7_6_FINAL_MEDICAL_OWNER_DECISION.md "SEG Phase 7.7.6 Final Medical Owner Decision"
