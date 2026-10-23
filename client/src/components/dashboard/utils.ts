import { getResidentSection } from "@shared/resident-taxonomy";

/** Dashboard formatting and lookup helpers (pure, no I/O). */

export function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function scorePercent(
  correct: number | null | undefined,
  total: number
) {
  return total > 0 ? Math.round(((correct ?? 0) / total) * 100) : 0;
}

export function sectionTitle(sectionId: number) {
  return getResidentSection(sectionId)?.[1] ?? "Emergency Medicine Foundations";
}

export function formatActivityTime(value?: string | Date) {
  if (!value) return "Recently";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
