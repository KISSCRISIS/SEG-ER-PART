# SEG Architecture Rules

## Current stack

المشروع الحالي هو React/Vite/TypeScript/Tailwind/Express/tRPC مع Manus OAuth وقاعدة البيانات الحالية. لا يُعامل المشروع كتطبيق Next.js حتى يصدر قرار هجرة مستقل.

## Protected architecture

| Rule | Requirement |
|---|---|
| Dashboard route | Keep `/dashboard` as the only protected Dashboard route. |
| Internal navigation | Preserve `#pathway`, `#learn`, `#practice`, `#reference`, `#journal`, and `#account` where present in the frozen implementation. |
| Authentication | Preserve the existing Manus OAuth event-handler and session boundary. |
| Database | Do not change schema, migrations, or persistence behavior for a visual or content-preparation task. |
| API | Preserve existing tRPC/Express contracts unless a separately authorized API change is recorded. |
| Assets | Use the approved registry and managed URLs; do not use screenshots or reference boards as UI assets. |
| Medical content | Receive only approved records through a future adapter; do not invent or modify medical data. |
| Next.js | Keep migration documentation separate until a user-authorized migration checkpoint exists. |

## Release behavior

Phase 3 uses the current Express boundary for CSP, security headers, rate limiting, logging, health checks, compression, and environment validation. A static-only deployment is insufficient because it cannot run those server controls.

## Reversibility

Every implementation change must be narrow, tested, documented, and reversible by restoring the prior checkpoint or delivery archive. Never mix framework migration, visual redesign, content activation, and security-boundary changes in one unscoped wave.
