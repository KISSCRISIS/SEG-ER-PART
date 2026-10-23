/**
 * Android-compatible local storage abstraction.
 * - Web/Electron: synchronous localStorage/sessionStorage (unchanged behavior)
 * - Capacitor Android: localStorage still works (WebView persistent), but this
 *   abstraction provides a single place to later swap to @capacitor/preferences
 *   or @capacitor-community/sqlite without touching call sites.
 * - API is synchronous for now to preserve existing call-site contracts;
 *   async variants are provided for future Capacitor Preferences migration.
 */
import { isCapacitor } from "./capacitor-platform";

// --- Synchronous API (drop-in for localStorage) ---
export function storageGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function storageSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // quota exceeded or restricted context — ignore
  }
}

export function storageRemove(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {}
}

export function sessionGet(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function sessionSet(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {}
}

export function sessionRemove(key: string): void {
  try {
    window.sessionStorage.removeItem(key);
  } catch {}
}

// --- Async variants (Capacitor Preferences-ready) ---
// Currently backed by localStorage, but call sites can `await` them.
// When @capacitor/preferences is added, switch internals to Preferences.get/set without API change.
export async function storageGetAsync(key: string): Promise<string | null> {
  if (!isCapacitor()) return storageGet(key);
  // Lazy dynamic import to keep web bundle free of capacitor plugin when not needed.
  try {
    const { Preferences } = await import("@capacitor/preferences");
    const { value } = await Preferences.get({ key });
    return value;
  } catch {
    return storageGet(key);
  }
}

export async function storageSetAsync(key: string, value: string): Promise<void> {
  if (!isCapacitor()) {
    storageSet(key, value);
    return;
  }
  try {
    const { Preferences } = await import("@capacitor/preferences");
    await Preferences.set({ key, value });
  } catch {
    storageSet(key, value);
  }
}

export async function storageRemoveAsync(key: string): Promise<void> {
  if (!isCapacitor()) {
    storageRemove(key);
    return;
  }
  try {
    const { Preferences } = await import("@capacitor/preferences");
    await Preferences.remove({ key });
  } catch {
    storageRemove(key);
  }
}
