import { defineConfig } from "@playwright/test";

const externalServer = process.env.SEG_UI_EXTERNAL_SERVER === "true";

export default defineConfig({
  testDir: "./tests/ui",
  outputDir: "./reports/playwright-results",
  reporter: [["html", { outputFolder: "reports/playwright-report", open: "never" }], ["list"]],
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: process.env.UI_BASE_URL ?? "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } } : {}),
  },
  webServer: externalServer
    ? undefined
    : { command: "node scripts/start-ui-test.mjs", url: "http://127.0.0.1:3000/healthz", reuseExistingServer: !process.env.CI, timeout: 60_000 },
});
