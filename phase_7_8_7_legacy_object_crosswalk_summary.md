# Phase 7.8.7 Object Crosswalk Evidence Summary

- Candidate map headers: source_id | target_type | record_mapping_status | metadata_status | blockers | candidate_record_id | source_path | sha256 | duplicate_lineage | duplicate_role | medical_review_status | rights_status | closure_status
- Candidate rows: 48
- Legacy object rows analyzed: 1919

## Status counts

| Status | Count |
|---|---:|
| MATCHED | 0 |
| PROBABLE_MATCH | 0 |
| NO_MATCH | 1919 |
| CONFLICT | 0 |

## Asset counts

| Asset | Bytes | SHA-256 | Root type | Objects | Status summary |
|---|---:|---|---|---:|---|
| `officialUnifiedTopics.json` | 43523 | `9b056ce983aa1e53e5e70d4122c0fdbf6919525d5e1c1cb3098462c508b982b9` | list | 40 | NO_MATCH=40 |
| `referenceLibrary.json` | 299309 | `6c0832b83ac56319fdfe486b2824baf9c3ca49e27554e4769422029aebc16f38` | list | 194 | NO_MATCH=194 |
| `flashcards.json` | 333868 | `830bc36fcfe433566a7edb331a4dd0f5866fb807d0ba6489102976d29aae85f3` | list | 760 | NO_MATCH=760 |
| `examTraps.json` | 104277 | `0108ee68e8176914f7596e90f645546873ddc3ab708a5806972ed73eac110366` | list | 415 | NO_MATCH=415 |
| `algorithms.json` | 4809 | `5b2e6fc836aab89a9c3f2e0e7aac62565f6950eeca0e3b0305c6bf5ed2e6d0fc` | list | 28 | NO_MATCH=28 |
| `arabicMentorExplanations.json` | 180854 | `95cf6dde36e026d117b2c47eb7513f32ecc4fd1340588dc883f3c94d5e4aa153` | list | 367 | NO_MATCH=367 |
| `topicFamilyIndex.json` | 20307 | `a0e1e6a8cdbff58b05cb31ba696edf2165ec2fbddd9237466fa75161f4cd7b9b` | list | 99 | NO_MATCH=99 |
| `antidotes.json` | 2344 | `744a1993d27c0658822478bcb755fed57016f9c217f7a3ae61740d91361bf324` | list | 16 | NO_MATCH=16 |

## Matching constraints

- Exact candidate matches use only explicit ID/key equality against candidate-map identity fields.
- Probable matches use exact observed title/topic equality or exact source-path stem equality; no fuzzy similarity is used.
- No match is not a rejection of the medical content; it means no candidate-level join is evidenced by the supplied fields.
- No clinical, rights, version, locator, taxonomy, or ownership value is invented.
