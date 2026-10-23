# SEG Release Closure — Local Final Validation

captured_at_utc=2026-08-22T20:56:45Z
branch=main
commit=47f1fff5a1c82820cc772a10b162a5920f3a3333

## Type check: pnpm check
[WARN] The "pnpm" field in package.json is no longer read by pnpm. The following keys were ignored: "pnpm.patchedDependencies", "pnpm.overrides". See https://pnpm.io/settings for the new home of each setting.

> seg-phase1@1.0.0 check /home/ubuntu/seg-manus-status
> tsc --noEmit

EXIT_CODE=0

## Production build: pnpm build
[WARN] The "pnpm" field in package.json is no longer read by pnpm. The following keys were ignored: "pnpm.patchedDependencies", "pnpm.overrides". See https://pnpm.io/settings for the new home of each setting.

> seg-phase1@1.0.0 build /home/ubuntu/seg-manus-status
> vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

vite v7.1.9 building for production...
transforming...
✓ 1769 modules transformed.
rendering chunks...
../dist/public/index.html                       368.23 kB
../dist/public/assets/index-_gIcw5uh.css        230.79 kB
../dist/public/assets/vendor-react-bNcsr7c2.js   17.47 kB
../dist/public/assets/vendor-data-C16s1bxA.js    54.56 kB
../dist/public/assets/vendor-ui-O8KUtL4C.js      59.37 kB
../dist/public/assets/index-DEDnZyT2.js         468.17 kB
✓ built in 4.04s

  dist/index.js  40.7kb

⚡ Done in 5ms
EXIT_CODE=0

## Tests: pnpm test
[WARN] The "pnpm" field in package.json is no longer read by pnpm. The following keys were ignored: "pnpm.patchedDependencies", "pnpm.overrides". See https://pnpm.io/settings for the new home of each setting.

> seg-phase1@1.0.0 test /home/ubuntu/seg-manus-status
> vitest run


 RUN  v2.1.9 /home/ubuntu/seg-manus-status

 ✓ client/src/pages/Home.test.tsx (1 test) 546ms
   ✓ Landing approved replacement implementation > keeps the approved SEG command-surface hierarchy and public Start Journey route available 545ms
 ✓ client/src/pages/LaboratoryPage.test.tsx (2 tests) 772ms
   ✓ Laboratory Foundation > renders the explicitly non-clinical demo foundation 432ms
   ✓ Laboratory Foundation > filters only the local demo inventory by query and category 338ms
 ✓ client/src/pages/LoginPage.test.tsx (1 test) 896ms
   ✓ Login final reference implementation interactions > keeps the approved lockup, form controls, password-recovery feedback, OAuth actions, and Register navigation available 895ms
 ✓ server/_core/oauth.redirect.test.ts (1 test) 6ms
 ✓ client/src/pages/DashboardPage.test.tsx (1 test) 1473ms
   ✓ My Home visual-only reference alignment > keeps the approved dashboard hierarchy and existing internal-section anchors 1472ms
 ↓ scripts/audit-final-package.test.ts (2 tests | 2 skipped)
 ✓ client/src/accessibility-remediation.test.ts (3 tests) 4ms
 ✓ server/auth.logout.test.ts (1 test) 5ms
 ✓ client/src/lib/seg-navigation.test.ts (3 tests) 4ms
 ✓ client/src/pages/RegisterPage.test.tsx (1 test) 1978ms
   ✓ Registration reference implementation interactions > validates missing required fields, toggles password visibility, updates role selection, submits complete details, and opens sign in 1977ms
 ✓ server/_core/cookies.test.ts (2 tests) 7ms
 ✓ client/src/lib/seg-registration.test.ts (1 test) 3ms
 ✓ client/src/lib/seg-dashboard-profile.test.ts (1 test) 3ms
 ✓ client/src/lib/seg-copy.test.ts (1 test) 4ms
 ✓ client/src/contexts/ThemeContext.test.tsx (1 test) 206ms
 ✓ client/src/components/DashboardLayout.test.tsx (2 tests) 404ms
   ✓ DashboardLayout reference-parity rail > uses the existing anchor navigation and exposes concise transition feedback 315ms

 Test Files  15 passed | 1 skipped (16)
      Tests  22 passed | 2 skipped (24)
   Start at  20:56:58
   Duration  4.16s (transform 682ms, setup 0ms, collect 3.11s, tests 6.31s, environment 6.54s, prepare 1.33s)

EXIT_CODE=0

## Diff whitespace: git diff --check
EXIT_CODE=0

## Lint command availability
lint_script=MISSING
eslint_dependency=false
biome_dependency=false

## Local entry resource identity
/assets/index-_gIcw5uh.css|230792 bytes|b9cd5a7b097a118955c1d96f453de518d8e15c40a91d48a72cbcf2df155f075a
/assets/vendor-data-C16s1bxA.js|54564 bytes|e6f93422ce4407518a82224cea851b5369ea318fc9b21dd443403bae2a40adc3
/assets/vendor-react-bNcsr7c2.js|17468 bytes|c7e15638826bf72bed2fadaefe59aecd03345375d9492e44369c88c1cc783158
/assets/vendor-ui-O8KUtL4C.js|59372 bytes|3cdabb721388e36da10a51407ded6ea9a65e188a6781f5917cb3dfd7a669c33f
/assets/index-DEDnZyT2.js|468166 bytes|f2c69f223bb527e8d023f140515762f0e6c83a33c72b9ee8cced8b2274bc1c07
