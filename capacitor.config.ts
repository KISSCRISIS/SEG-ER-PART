import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor Foundation — Android (Isolated Phase 1)
 * Additive only. Does not affect Windows Electron build (desktop/, electron-builder.json).
 * webDir points to Vite build output (vite.config.ts: outDir dist/public).
 */
const config: CapacitorConfig = {
  appId: "org.seg.resident.android",
  appName: "SEG Resident",
  webDir: "dist/public",
  server: {
    androidScheme: "https",
    // No server.url — bundled SPA is primary. Hosted API remains separate.
    // cleartext: false (default) — requires https API in production.
  },
  plugins: {
    // No plugins required for foundation; added additively in later phases.
  },
};

export default config;
