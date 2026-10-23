# Technical Issues Register

Updated: 2026-09-09

- Main client bundle is above the Vite 500KB advisory threshold; code-splitting remains.
- Dependency audit may fail when the package registry/network is unavailable.
- Hosted Drizzle migrations require `DATABASE_URL`; local mode uses SQLite.
- Semantic mapping is required between editorial summary IDs and source chapter IDs.
- Backup restore rehearsal is still pending on a disposable dataset.
