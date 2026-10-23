import { chromium } from "@playwright/test";
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";

const baseUrl = process.env.UI_BASE_URL ?? "http://127.0.0.1:3000";
const outputDir = path.resolve("reports", "lighthouse");
mkdirSync(outputDir, { recursive: true });

for (const route of ["", "/login", "/register"]) {
  const name = route === "" ? "landing" : route.slice(1);
  const result = spawnSync(process.execPath, [
    path.resolve("node_modules/lighthouse/cli/index.js"), `${baseUrl}${route}`, "--quiet",
    "--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage", `--chrome-path=${chromium.executablePath()}`,
    "--output=json", "--output=html", `--output-path=${path.join(outputDir, name)}`,
  ], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
