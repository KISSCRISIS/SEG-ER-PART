# SEG Full QA — Phase 1 Baseline Checks

Captured: 2026-08-22T16:13:32Z
Repository: /home/ubuntu/seg-manus-status
Branch: main
Commit: 47f1fff5a1c82820cc772a10b162a5920f3a3333

## pnpm check
```text
[WARN] The "pnpm" field in package.json is no longer read by pnpm. The following keys were ignored: "pnpm.patchedDependencies", "pnpm.overrides". See https://pnpm.io/settings for the new home of each setting.

> seg-phase1@1.0.0 check /home/ubuntu/seg-manus-status
> tsc --noEmit

EXIT_CODE=0
```

## pnpm build
```text
[WARN] The "pnpm" field in package.json is no longer read by pnpm. The following keys were ignored: "pnpm.patchedDependencies", "pnpm.overrides". See https://pnpm.io/settings for the new home of each setting.

> seg-phase1@1.0.0 build /home/ubuntu/seg-manus-status
> vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

vite v7.1.9 building for production...
transforming...
✓ 1769 modules transformed.
rendering chunks...
../dist/public/index.html                       368.23 kB
../dist/public/assets/index-U_a_TetQ.css        229.72 kB
../dist/public/assets/vendor-react-bNcsr7c2.js   17.47 kB
../dist/public/assets/vendor-data-C16s1bxA.js    54.56 kB
../dist/public/assets/vendor-ui-O8KUtL4C.js      59.37 kB
../dist/public/assets/index-BAozTvAf.js         468.18 kB
✓ built in 3.88s

  dist/index.js  40.7kb

⚡ Done in 5ms
EXIT_CODE=0
```

## pnpm test
```text
[WARN] The "pnpm" field in package.json is no longer read by pnpm. The following keys were ignored: "pnpm.patchedDependencies", "pnpm.overrides". See https://pnpm.io/settings for the new home of each setting.

> seg-phase1@1.0.0 test /home/ubuntu/seg-manus-status
> vitest run


 RUN  v2.1.9 /home/ubuntu/seg-manus-status

stderr | client/src/components/DashboardLayout.test.tsx > DashboardLayout reference-parity rail > uses the existing anchor navigation and exposes concise transition feedback
Not implemented: Window's scrollTo() method

 ❯ client/src/components/DashboardLayout.test.tsx (2 tests | 1 failed) 408ms
   × DashboardLayout reference-parity rail > uses the existing anchor navigation and exposes concise transition feedback 314ms
     → expected "spy" to be called with arguments: [ ObjectContaining {"block": "start"} ]

Received: 



Number of calls: 0

 ✓ client/src/pages/Home.test.tsx (1 test) 594ms
   ✓ Landing approved replacement implementation > keeps the approved SEG command-surface hierarchy and public Start Journey route available 593ms
 ✓ client/src/pages/LoginPage.test.tsx (1 test) 909ms
   ✓ Login final reference implementation interactions > keeps the approved lockup, form controls, password-recovery feedback, OAuth actions, and Register navigation available 908ms
 ✓ server/_core/oauth.redirect.test.ts (1 test) 7ms
 ✓ client/src/accessibility-remediation.test.ts (3 tests) 5ms
 ✓ client/src/pages/DashboardPage.test.tsx (1 test) 1386ms
   ✓ My Home visual-only reference alignment > keeps the approved dashboard hierarchy and existing internal-section anchors 1377ms
 ✓ server/auth.logout.test.ts (1 test) 5ms
 ❯ scripts/audit-final-package.test.ts (0 test)
 ✓ server/_core/cookies.test.ts (2 tests) 4ms
 ✓ client/src/lib/seg-navigation.test.ts (3 tests) 4ms
 ✓ client/src/lib/seg-registration.test.ts (1 test) 3ms
 ✓ client/src/lib/seg-dashboard-profile.test.ts (1 test) 4ms
 ✓ client/src/lib/seg-copy.test.ts (1 test) 3ms
 ✓ client/src/contexts/ThemeContext.test.tsx (1 test) 193ms
 ✓ client/src/pages/RegisterPage.test.tsx (1 test) 2012ms
   ✓ Registration reference implementation interactions > validates missing required fields, toggles password visibility, updates role selection, submits complete details, and opens sign in 2011ms

⎯⎯⎯⎯⎯⎯ Failed Suites 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  scripts/audit-final-package.test.ts [ scripts/audit-final-package.test.ts ]
Error: ENOENT: no such file or directory, open '/home/ubuntu/webdev-static-assets/SEG_FINAL_PACKAGE/assets_manifest.json'
 ❯ scripts/audit-final-package.test.ts:20:3
     18| const packageRoot = process.env.SEG_FINAL_PACKAGE_ROOT ?? path.resolve…
     19| const manifest = JSON.parse(
     20|   readFileSync(path.join(packageRoot, 'assets_manifest.json'), 'utf8')
       |   ^
     21| ) as FinalManifest;
     22| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  client/src/components/DashboardLayout.test.tsx > DashboardLayout reference-parity rail > uses the existing anchor navigation and exposes concise transition feedback
AssertionError: expected "spy" to be called with arguments: [ ObjectContaining {"block": "start"} ]

Received: 



Number of calls: 0

 ❯ client/src/components/DashboardLayout.test.tsx:38:28
     36|     await user.click(screen.getAllByRole("button", { name: "Learn" })[…
     37| 
     38|     expect(scrollIntoView).toHaveBeenCalledWith(expect.objectContainin…
       |                            ^
     39|     expect(screen.getByText("Opening Learn")).not.toBeNull();
     40|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯

 Test Files  2 failed | 13 passed (15)
      Tests  1 failed | 19 passed (20)
   Start at  16:13:44
   Duration  3.73s (transform 594ms, setup 0ms, collect 2.73s, tests 5.54s, environment 5.54s, prepare 1.24s)

 ELIFECYCLE  Test failed. See above for more details.
EXIT_CODE=1
```

## prettier check
```text
[WARN] The "pnpm" field in package.json is no longer read by pnpm. The following keys were ignored: "pnpm.patchedDependencies", "pnpm.overrides". See https://pnpm.io/settings for the new home of each setting.
Checking formatting...
[warn] client/src/accessibility-remediation.test.ts
[warn] client/src/components/AIChatBox.tsx
[warn] client/src/components/DashboardLayout.test.tsx
[warn] client/src/components/DashboardLayout.tsx
[warn] client/src/components/DashboardLayoutSkeleton.tsx
[warn] client/src/components/SEGBadge.tsx
[warn] client/src/components/SEGBrand.tsx
[warn] client/src/components/SEGGlassCard.tsx
[warn] client/src/components/SEGSectionHeading.tsx
[warn] client/src/components/ThemeToggle.tsx
[warn] client/src/components/ui/button.tsx
[warn] client/src/components/ui/dialog.tsx
[warn] client/src/components/ui/input.tsx
[warn] client/src/components/ui/sidebar.tsx
[warn] client/src/components/ui/textarea.tsx
[warn] client/src/contexts/ThemeContext.test.tsx
[warn] client/src/contexts/ThemeContext.tsx
[warn] client/src/index.css
[warn] client/src/lib/seg-assets.ts
[warn] client/src/lib/seg-navigation.test.ts
[warn] client/src/lib/seg-navigation.ts
[warn] client/src/main.tsx
[warn] client/src/pages/ComponentShowcase.tsx
[warn] client/src/pages/DashboardPage.test.tsx
[warn] client/src/pages/DashboardPage.tsx
[warn] client/src/pages/Home.test.tsx
[warn] client/src/pages/Home.tsx
[warn] client/src/pages/LoginPage.test.tsx
[warn] client/src/pages/LoginPage.tsx
[warn] client/src/pages/RegisterPage.test.tsx
[warn] client/src/pages/RegisterPage.tsx
[warn] server/_core/dataApi.ts
[warn] server/_core/env.ts
[warn] server/_core/heartbeat.ts
[warn] server/_core/imageGeneration.ts
[warn] server/_core/index.ts
[warn] server/_core/llm.ts
[warn] server/_core/logger.ts
[warn] server/_core/map.ts
[warn] server/_core/notification.ts
[warn] server/_core/oauth.redirect.test.ts
[warn] server/_core/oauth.ts
[warn] server/_core/production.ts
[warn] server/_core/sdk.ts
[warn] server/_core/storageProxy.ts
[warn] server/_core/trpc.ts
[warn] server/_core/vite.ts
[warn] server/_core/voiceTranscription.ts
[warn] server/auth.logout.test.ts
[warn] server/db.ts
[warn] server/routers.ts
[warn] server/storage.ts
[warn] drizzle/meta/_journal.json
[warn] drizzle/meta/0000_snapshot.json
[warn] drizzle/schema.ts
[warn] scripts/audit-final-package.mjs
[warn] scripts/audit-final-package.test.ts
[warn] scripts/capture_ui_patch1_cdp.mjs
[warn] Code style issues found in 58 files. Run Prettier with --write to fix.
EXIT_CODE=1
```

## Lint script availability
```text
{
  "scripts": {
    "dev": "NODE_ENV=development tsx watch server/_core/index.ts",
    "build": "vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc --noEmit",
    "format": "prettier --write .",
    "test": "vitest run",
    "audit:final-package": "node scripts/audit-final-package.mjs",
    "db:push": "drizzle-kit generate && drizzle-kit migrate"
  },
  "eslint": false,
  "biome": false
}
```
