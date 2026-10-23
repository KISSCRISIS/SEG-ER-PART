# SEG resident workflow map

This is the agreed source-of-truth map for the Emergency Medicine resident path in JEM Nexus / SEG.

## Sections and boundaries

| Section               | Contains                                                                                                                                                                                                                                                                         | Does not contain                                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| My Home               | Personal starting dashboard: daily plan, resident progress, latest activity, saved items, due review questions, shortcuts to Learn/Practice/Atlas/Journal, and progress alerts.                                                                                                  | It does not create new medical content and does not replace the curriculum; it summarizes existing personal content and activity.                     |
| My Pathway            | Resident training map: stages, modules, topics, learning objectives, progress level, linked sources, and movement from foundations to advanced topics. ECG, Critical Care, Toxicology, Drug Essentials, FRCEM, HIPPO, and reviewed PreTest families attach here when normalized. | It does not mix resident content with student, intern, nursing, or other career paths. It is not a final approved curriculum before clinical review.  |
| Learn                 | Lessons, modules, readings, books, summaries, and flashcards. Every item should carry source, version, location, and review status. Current sources include Oxford, FRCEM, HIPPO, PreTest, and 1400q according to each source state.                                             | It does not automatically activate a book or lesson, and does not add doses or medical claims that are absent from the source.                        |
| Practice              | Qbank: FRCEM, HIPPO, PreTest, 1400q, and OSCE-linked questions with answer options, correct answer, explanation, source, chapter, difficulty, topic, exam traps, flashcards, practice mode, timed mode, review mode, and weak areas.                                             | It does not present a question as final approved content before clinical and rights review, and does not mix questions between professional pathways. |
| Atlas & Visual Assets | Educational visual cases and assets: OSCE images, ECGs, emergency images, linked question/lesson images, metadata, image source, version, rights, clinical label, and accessibility requirements. Confirmed current material includes OSCE Imaging and 14 recovered images.      | Visual assets are not displayed as diagnostic or final clinical references without labeling, review, rights clearance, and accessibility work.        |
| Medical Journal       | Personal notes, reflections, saved cases, error review, links to lessons/questions/images, and personal review history.                                                                                                                                                          | It does not store real patient identifiers or sensitive patient data, and personal notes do not become published medical recommendations.             |
| My Account            | Profile, selected professional path, preferences, language, notifications, privacy settings, progress log, session management, logout, and account state.                                                                                                                        | It does not change medical approval state, bypass OAuth, or grant access to another professional path.                                                |

## Usage flow

```text
My Home
  ↓
My Pathway → decides what the resident studies next
  ↓
Learn → read lesson, book, or flashcards
  ↓
Practice → answer questions, review explanations, reveal weak areas
  ↓
Atlas & Visual Assets → review linked visual cases and assets
  ↓
Medical Journal → record personal notes, reflections, and review
  ↓
My Home → show progress and due review items
```

## Current content placement

| Content type                                         | Primary section                    | Current use state                                                                            |
| ---------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------- |
| FRCEM, HIPPO, Oxford                                 | Learn and My Pathway               | Stored educational sources; linked to review and rights status.                              |
| FRCEM questions, HIPPO questions, PreTest, 1400q     | Practice                           | Candidate Qbank material; requires normalization and clinical review before full activation. |
| `appFlashcards.json`, `flashcards.json`              | Learn and Practice                 | Flashcards and review material; source linkage required.                                     |
| `examTraps.json`, `masterTrapIndex.json`             | Practice                           | Exam error traps and smart review material.                                                  |
| `chapterStudyMap.json`, topic indexes                | My Pathway and Learn               | Topic/chapter/source mapping.                                                                |
| OSCE Imaging and 14 images                           | Atlas & Visual Assets and Practice | Recovered visual material; needs labeling, rights, and accessibility review.                 |
| `fullReferenceLibrary.json`, `referenceLibrary.json` | Learn and Atlas                    | Reference indexes, not standalone study content.                                             |
