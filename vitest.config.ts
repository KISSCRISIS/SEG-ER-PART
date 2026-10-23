import { defineConfig } from "vitest/config";
import path from "node:path";

const templateRoot = path.resolve(
  process.env.VITEST_PROJECT_ROOT ?? process.cwd()
);

export default defineConfig({
  root: templateRoot,
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(templateRoot, "client", "src"),
      "@shared": path.resolve(templateRoot, "shared"),
      "@assets": path.resolve(templateRoot, "attached_assets"),
    },
  },
  test: {
    environment: "jsdom",
    include: [
      "shared/**/*.test.ts",
      "server/**/*.test.ts",
      "server/**/*.spec.ts",
      "client/**/*.test.{ts,tsx}",
      "client/**/*.spec.{ts,tsx}",
      "scripts/**/*.test.ts",
    ],
  },
});
