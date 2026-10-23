# Engineering hardening report — 2026-09-04

## Completed

- Added governed medical content tables for stable items, immutable revisions, normalized provenance, claim-level source links, and append-only attributable clinical reviews.
- Added fail-closed workflow tests preventing publication without approval, provenance, reviewer credentials, and checklist version.
- Generated and applied `drizzle/0004_rainy_beyonder.sql` to the local MySQL database.
- Added ESLint, `pnpm test`, TypeScript, repository hygiene, production build, and high-severity dependency audit gates to GitLab CI.
- Remediated all high and critical dependency advisories reported by pnpm. Remaining audit findings are low/moderate and remain visible to CI policy owners.
- Defined one runtime source of truth and verified that generated outputs, secrets, archives, dumps, and dependency directories are not tracked.
- Replaced the placeholder README and added deployment, monitoring, backup, and clinical-content governance runbooks.
- Added Playwright coverage for 320, 390, 768, and 1440 pixel viewports and axe WCAG checks.
- Split route-level pages to reduce initial JavaScript from approximately 810 KB to 525 KB.

## Verification evidence

- ESLint: passed with zero warnings.
- TypeScript: passed.
- Vitest: 39 passed, 2 skipped evidence-only tests.
- Production build: passed.
- Repository hygiene: passed.
- Dependency audit gate: no high or critical findings.
- Playwright: 13/13 passed; no horizontal overflow on public pages at all four target widths.
- axe: no serious or critical WCAG 2/2.1 A/AA violations on Login or Registration.

## Production Lighthouse (local mobile throttling)

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Landing | 78 | 100 | 92 | 92 | 4.1 s | 0.002 | 70 ms |
| Login | 78 | 100 | 92 | 92 | 4.3 s | 0 | 100 ms |
| Register | 74 | 100 | 92 | 91 | 4.2 s | 0 | 290 ms |

The Lighthouse files are generated under `reports/lighthouse/`. Scores are local lab measurements and can vary; repeat them against the deployed HTTPS origin before release. The next performance target is image/font optimization and further Landing shared-chunk reduction to bring mobile LCP below 2.5 seconds.

## LCP optimization follow-up — 2026-09-05

Production builds now exclude development-only Manus instrumentation, no longer block rendering on Google Fonts, and mark decorative imagery for asynchronous lazy decoding. Re-measurement on the local production build produced:

| Page | Performance | Accessibility | LCP | Previous LCP |
| --- | ---: | ---: | ---: | ---: |
| Landing | 94 | 100 | 2.485 s | 4.1 s |
| Login | 93 | 100 | 2.771 s | 4.3 s |
| Register | 92 | 100 | 2.615 s | 4.2 s |

The public landing page now meets the 2.5-second LCP target. The authentication pages are close to the target and remain candidates for further JavaScript/CSS reduction.

The closed-pilot operating boundaries are documented in `docs/operations/PILOT_RUNBOOK.md`.
