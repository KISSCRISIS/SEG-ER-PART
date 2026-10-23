import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      ".manus-logs/**",
      ".local-py/**",
      "reports/**",
      "**/*.min.js",
      "client/public/**",
      "drizzle/meta/**",
      "phase_*/**",
      "RECOVERY_HANDOFF/**",
      "SEG_*_EVIDENCE/**",
      "SEG_CONTENT_LIBRARY/**",
      "SEG_PROJECT_CONTINUITY_PACKAGE/**",
      "scripts/capture_*.mjs",
      "*.py",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,ts,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.flat.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "@typescript-eslint/no-namespace": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
    },
  },
  {
    files: ["client/src/components/ui/**/*.{ts,tsx}"],
    rules: { "react-hooks/static-components": "off" },
  }
);
