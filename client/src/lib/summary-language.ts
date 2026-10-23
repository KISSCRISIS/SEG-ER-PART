import { useEffect, useState } from "react";

export type SummaryLanguageMode = "english" | "both" | "arabic";

/** Stores a display preference only; the medical content and its provenance remain unchanged. */
export function useSummaryLanguageMode(book: string) {
  const storageKey = `seg:summary-language:${book}:v1`;
  const [mode, setMode] = useState<SummaryLanguageMode>("both");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "english" || saved === "both" || saved === "arabic") setMode(saved);
    } catch {
      // Browser privacy settings must not prevent reading source content.
    }
  }, [storageKey]);

  const changeMode = (next: SummaryLanguageMode) => {
    setMode(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      // The in-memory selection remains usable if storage is unavailable.
    }
  };

  return { mode, changeMode };
}
