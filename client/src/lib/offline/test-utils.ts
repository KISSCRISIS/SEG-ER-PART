/**
 * Shared stub: serves the real synced content files for /content/* fetches.
 * Used by offline tests to exercise the exact bundled payloads.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { setOfflineFetchImpl } from "./content";

export const OFFLINE_TEST_ROOT = path.resolve(import.meta.dirname, "..", "..", "..", "..");

function testFileFor(url: string): string | null {
  if (url.startsWith("/content/qbank/")) {
    return path.join(
      OFFLINE_TEST_ROOT,
      "SEG_CONTENT_LIBRARY",
      "02_PROCESSED_CONTENT",
      "RESIDENT_EMERGENCY_MEDICINE",
      url.slice("/content/qbank/".length)
    );
  }
  if (url.startsWith("/content/reference/")) {
    return path.join(
      OFFLINE_TEST_ROOT,
      "SEG_CONTENT_LIBRARY",
      "01_RECOVERY_SOURCE_ARTIFACTS",
      "REFERENCE_LIBRARY",
      url.slice("/content/reference/".length)
    );
  }
  if (url.startsWith("/content/osce/")) {
    return path.join(
      OFFLINE_TEST_ROOT,
      "SEG_CONTENT_LIBRARY",
      "01_RECOVERY_SOURCE_ARTIFACTS",
      url.slice("/content/osce/".length)
    );
  }
  return null;
}

export function stubContentFetch(): void {
  setOfflineFetchImpl((async (input: string | URL | Request) => {
    const file = testFileFor(String(input));
    if (!file) return { ok: false, status: 404 } as Response;
    const text = await readFile(file, "utf8");
    return {
      ok: true,
      status: 200,
      json: () => Promise.resolve(JSON.parse(text)),
      text: () => Promise.resolve(text),
    } as Response;
  }) as typeof fetch);
}
