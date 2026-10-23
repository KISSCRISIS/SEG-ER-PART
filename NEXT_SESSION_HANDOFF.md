# SEG — saved handoff, 2026-09-09

User requested a pause and a saved backlog for tomorrow. All edits remain on disk in the working tree. No commit, push, deployment, or database migration was performed for this checkpoint.

## Resume here

1. Run TypeScript and the relevant tests after the latest engine changes. Include/fix the previously excluded shared tests; their task-list assertion predates the added review task. Do not claim those tests passed based on the older 48-test suite.
2. Complete study-plan configuration UI in My Pathway: six plan choices, exam date, available hours, rest days, save/load/error handling. Currently the page only displays saved-plan status.
3. Replace loosely typed plan storage/API with validated settings. Derive progress from authenticated user records rather than accepting client-supplied progress. Local SQLite persistence exists; hosted persistence is not implemented and now reports an error.
4. Generate dated tasks linked to actual chapter/question/asset IDs. Persist completion per user. Add weekly scheduling, catch-up allocation within available hours, and reproducible date handling. Current tasks are generic links. Review the arbitrary readiness calculation before showing it as a meaningful indicator.
5. Test reload persistence, user isolation, new and partial-progress users, weak areas, approaching/past exams, rest days, and exhausted content. Verify UI behavior, not only compilation.
6. Rosen High-Yield Arabic translation is complete at 626/626 source-indexed topics. It remains machine-translated under review (except six existing bilingual editorial drafts); clinical/editorial review still must sample and approve it before any clinical-use claim.
7. Audit normalized Qbank before runtime integration. The generated output retains 5,590 of 5,612 records, but deduplication used question stem alone and could merge differing options/answers. Recover aliases/provenance from preserved originals, detect conflicts, and deduplicate only equivalent records. Category currently uses family and is not a validated clinical category. Recount unresolved answer keys and explanations after exact-text inference.
8. Integrate validated Qbank with the existing runtime contract in server/residentContent.ts. Verify filters, saved exams, resume, flag/skip state, per-question timing, and review with real database records.
9. Audit medical source excerpts and page numbering against manifests. 204 outline records do not prove 204 valid source excerpts. Reconciliation omitted summary-samples.json; fix inventory logic. Do not subtract independent summary records from 204 to calculate completion.
10. Populate source-grounded medical units progressively with verified references, English sections, Arabic explanations, and review status. The three sample units have added sections but empty tables and unverified locators; later short drafts are not complete chapters. Keep clinical review pending.
11. Finish Learn reader features and source/question/plan links; inspect existing reader first. Then verify Atlas and Journal persistence/linking and feed their real activity into Home/Pathway.
12. Implement and rehearse backup/restore using a disposable dataset. Complete security, accessibility, responsive UI, performance, build, and local release checks. Preserve source files and user data.

## Evidence and limitations

- Latest executed test: server/studyPlanEngine.test.ts — 3 passed (daily budget, rest days, invalid hours).
- Full build and TypeScript must be rerun for the latest checkpoint.
- Clinical approval, official board topic weighting, and rights clearance remain outstanding. No claim of board coverage or guaranteed success is supported.
- Existing reports contain earlier overstatements; this handoff and the checkpoint section of PROJECT_PROGRESS.md take precedence for the next session.
