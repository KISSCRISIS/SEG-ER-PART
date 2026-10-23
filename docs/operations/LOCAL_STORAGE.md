# Local workspace storage preview

To test from this checkout: `node scripts/build-desktop.mjs` then `node scripts/start-local-workspace.mjs`. Open port 3012 (or the port printed by the server). Data defaults to `local-data/workspace.sqlite`. Sign in using an existing MySQL account. The local workspace starts empty.

Opt in with `SEG_LOCAL_WORKSPACE=true` and an absolute `SEG_LOCAL_DATA_DIR` path. SQLite creates `workspace.sqlite` there. Requires a Node runtime supporting `node:sqlite` (the desktop Electron runtime includes Node). Normal web mode continues to use MySQL.

Implemented: exams/resume, question flags/skips, attempts and performance, chapter completion, journal notes, content issue reports. Dates and JSON are preserved; records are separated by user ID. Existing MySQL data is neither changed nor automatically imported.

Authentication and account profiles still require MySQL. This is not yet the fully offline USB edition. Do not enable on a shared server without migrating workspace data. Disable the flag to return to the original MySQL workspace. Close the application before backing up the SQLite file or removing a USB drive.
