import { defineConfig } from "@playwright/test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
export default defineConfig({
  testDir: "./tests/study", workers: 1,
  use: { baseURL: "http://127.0.0.1:3027", screenshot: "only-on-failure" },
  outputDir: "reports/study-playwright",
  webServer: {
    command: "node scripts/start-local-workspace.mjs", url: "http://127.0.0.1:3027/healthz", reuseExistingServer: false,
    env: { PORT: "3027", SEG_LOCAL_DATA_DIR: mkdtempSync(path.join(tmpdir(), "seg-study-ui-")), JWT_SECRET: "isolated-test-secret-not-for-production-123456789", VITE_APP_ID: "seg-local" },
  },
});
