# SEG Visual Production Readiness — Runtime Evidence

**Target:** https://seg-guide-bjjkqn7t.manus.space/  
**Mode:** Read-only validation  
**Capture date:** 2026-08-15 (UTC session timestamp)

## Initial deployment evidence

The target loaded successfully in Chromium with title `SEG — Smart Emergency Guide` and document state `complete`. The React root was present. The public page exposed the approved Landing shell, primary navigation, profile block, countdown, CTA, statistics, capability cards, and trust section.

The runtime DOM reported no horizontal overflow at the initial viewport: viewport width 1265 px, document scroll width 1265 px, body scroll width 1265 px. The viewport meta was `width=device-width, initial-scale=1.0`.

## Landmarks and routes visible from Landing

The DOM exposed a header, a labeled `nav` with `aria-label="Primary navigation"`, a `main`, a labeled Landing hero section, a labeled Emergency response countdown section, a labeled statistics section, the capabilities section, and a trust section. The visible navigation links were `#top`, `#capabilities`, and `#trust`; the primary CTA linked to `/register`.

## Runtime assets

The four image resources observed on the Landing page were complete and had non-zero intrinsic dimensions: the official SEG lockup, profile thumbnail, emergency-response stage asset, and brain/heart stage asset. No image element reported a failed load in the initial DOM sample.

## Network/resource sample

The page loaded the production JS bundle `/assets/index-QumL5cbf.js`, production CSS bundle `/assets/index-DYmvRKgr.css`, the PWA manifest, font resource, and the observed Manus-managed image assets. The browser resource sample also included analytics/telemetry resources. This is an observation only; no request was modified or blocked.

## Console and runtime caveat

The page-level capture returned an empty custom `window.__segCapturedErrors` array. This is not equivalent to a complete browser-console transcript, so console evidence must be supplemented with the browser console view before the final report. The initial page load itself did not expose a visible error state.

**Evidence source:** `/home/ubuntu/console_outputs/exec_result_2026-08-15_22-06-52_125.txt`.

## Registration runtime evidence

`/register` loaded with document state `complete` and the SEG title. The page exposed the registration form, language controls, theme toggle, role controls, country and graduation-year controls, consent links, account creation action, and social-login actions. The DOM reported two complete non-zero-sized image assets: `SEG_Official_Brain_Heart_Mark_Crop_a8cd393c.png` at 327×246 and `SEG_Registration_Approved_Heart_ECG_Stage_4079b3c9.png` at 500×425. The page exposed `main`, the professional-learning `aside`, the labeled benefits `section`, a registration heading section, and form subsections. No visible runtime error state was observed.

**Evidence source:** `/home/ubuntu/console_outputs/exec_result_2026-08-15_22-07-30_869.txt`.

## Login runtime evidence

`/login` loaded with document state `complete` and the production title. The visible page reported `SYSTEM STATUS — All Systems Operational`, exposed the display-settings navigation, main login region, labeled form, trust/privacy section, email/password fields, Remember me, Forgot password, Login, Google, Microsoft, Apple, and Register controls. The three Login image assets were complete and non-zero-sized: two 438×542 stage images and the approved 607×198 lockup. Body and document scroll widths were 1280 px at the sampled viewport, with no horizontal overflow. No form was submitted and no authentication or OAuth action was invoked.

**Evidence source:** `/home/ubuntu/console_outputs/exec_result_2026-08-15_22-08-04_125.txt`.

## Dashboard gate runtime evidence

`/dashboard` loaded with document state `complete` and displayed `Sign in to access My Home`, the existing secure authentication-boundary explanation, and a Login button. The DOM exposed a semantic `main` and a labeled section with `aria-labelledby="dashboard-sign-in-title"` containing the matching `h1`. No image asset was required for the gate. Body and document scroll widths were 1280 px at the sampled viewport, with no horizontal overflow. The runtime made the expected unauthenticated `auth.me` tRPC request; no OAuth boundary was bypassed and the Login action was not pressed.

**Evidence source:** `/home/ubuntu/console_outputs/exec_result_2026-08-15_22-08-45_217.txt`.

## HTTP deployment evidence

Direct HTTP checks returned `200` for `/`, `/register`, `/login`, and `/dashboard`, each serving the production HTML shell. The responses included `x-powered-by: Express`, `x-content-type-options: nosniff`, HSTS, Cloudflare delivery, and no-cache headers. The selected production JS and CSS bundles returned `200` with non-zero sizes, and the selected Landing, Registration, and Login approved image assets returned `200 image/png` responses.

The target `/healthz` path returned `404` from the deployed host. This is a **production-readiness gap for the requested health-check verification**, not an application crash: the four visual routes loaded successfully, while the published host does not expose the local Phase 3 `/healthz` endpoint at that URL. No change was made to compensate for this gap.

**Evidence source:** `SEG_VISUAL_PRODUCTION_HTTP_EVIDENCE.txt`.

## Mobile capture evidence

Headless Chromium captured the four public/protected-gate routes at `390×844`: `landing_mobile_390x844.png`, `register_mobile_390x844.png`, `login_mobile_390x844.png`, and `dashboard_mobile_390x844.png`. The files are stored under `SEG_VISUAL_PRODUCTION_EVIDENCE/` for visual review. Chromium emitted local environment messages for DBus/UPower, Google GCM authentication, and software WebGL fallback during headless capture; these are browser-environment diagnostics, not application HTTP or JavaScript failures. The image files were written successfully.

**Evidence directory:** `/home/ubuntu/seg-phase1/SEG_VISUAL_PRODUCTION_EVIDENCE/`.

## Visual mobile observations — first pair

The 390×844 Landing capture preserved the compact top controls, mobile navigation strip, hero heading, three feature rows, CTA, and countdown artwork without a visible cut-off or horizontal spill in the captured viewport. The approved visual hierarchy remained intact, although the lower countdown artwork continues below the viewport as expected for a vertically scrolling page.

The 390×844 Registration capture preserved the dark visual introduction, SEG lockup, hero copy, approved heart/ECG artwork, four benefit items, and protected-data message. The form itself is below the captured viewport and is reachable by vertical scrolling; no broken image or obvious horizontal overflow was visible in the capture.

**Reviewed images:** `landing_mobile_390x844.png`, `register_mobile_390x844.png`.

## Visual mobile observations — second pair

The 390×844 Login capture preserved the theme control, approved SEG lockup, Welcome Back card, email/password fields, Remember me, Forgot password, Login CTA, three social-login buttons, Register link, and the Secure & Private card. The layout remained within the viewport without a visible horizontal spill.

The 390×844 Dashboard gate capture preserved the centered protected-access card, explanatory text, Login CTA, and footer badge. The card remained intact within the viewport and no broken component or horizontal overflow was visible.

**Reviewed images:** `login_mobile_390x844.png`, `dashboard_mobile_390x844.png`.

## Asset and production-bundle evidence

The deployed app references hashed approved asset variants. The bare legacy names `SEG_Dashboard_Brain_Heart_Core_Clean_Approved.png` and `SEG_ATLAS_VISUAL_ASSETS_HERO_v1.0.png` returned `403` from the storage gateway, while the deployed hashed variants `SEG_Dashboard_Brain_Heart_Core_Clean_Approved_45d2f500.png` and `SEG_ATLAS_VISUAL_ASSETS_HERO_v1.0_b0cd2819.png` returned `200 image/png`. The other sampled approved assets, including the primary logo, hero logo, Medical Journal visual asset, official mark, Registration stage, and both Login stage assets, returned `200 image/png`. This documents the external bare-name asset gap without introducing placeholders; the production-referenced variants are available.

The deployed JS bundle was 575,851 bytes and contained the approved Dashboard labels `My Pathway`, `Learn`, `Practice`, `Atlas & Visual Assets`, `Medical Journal`, and `My Account`, as well as the internal identifiers `pathway`, `learn`, `practice`, `reference`, `journal`, and `account`. The bundle also contained the public route strings `/`, `/register`, `/login`, `/dashboard`, the OAuth callback path, and `auth.me`. The approved medical-content boundary text stating that no approved journal article is available and that an approved item must include source, version, review status, and audit trail was present. These are read-only observations from the deployed bundle.

**Evidence sources:** `SEG_VISUAL_PRODUCTION_ASSET_EVIDENCE.txt` and `SEG_VISUAL_PRODUCTION_BUNDLE_EVIDENCE.txt`.

## Visual desktop observations — first pair

The desktop Landing capture preserved the approved header/navigation, user profile, countdown hero, GET STARTED CTA, metrics strip, six capability cards, and trust strip. The visual hierarchy was intact and no broken component was visible in the viewport.

The desktop Registration capture preserved the dark story panel, official lockup, approved heart/ECG stage image, role-card grid, form sections, consent row, account CTA, and social-login row. The right form panel remained within the viewport and the composition was visually coherent.

**Reviewed images:** `seg-guide-bjjkqn7t_m_2026-08-15_22-06-38_3942.webp`, `seg-guide-bjjkqn7t_m_2026-08-15_22-07-21_8404.webp`.

## Visual desktop observations — second pair

The desktop Login capture preserved the system-status card, approved lockup, Welcome Back form, authentication controls, social-login row, Register link, and Secure & Private/Trusted By cards. The visual shell was intact without a broken component.

The desktop Dashboard capture showed the protected-access card centered on the page with the Login CTA. Because the validation was unauthenticated and read-only, the internal authenticated Dashboard sections were not opened; their preservation was instead corroborated by the deployed bundle strings and local route/layout source, while the existing authentication boundary remained untouched.

**Reviewed images:** `seg-guide-bjjkqn7t_m_2026-08-15_22-07-55_8324.webp`, `seg-guide-bjjkqn7t_m_2026-08-15_22-08-26_3814.webp`.
