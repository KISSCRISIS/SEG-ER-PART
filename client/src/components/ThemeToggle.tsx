import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const nextModeLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      className={`seg-theme-toggle ${isDark ? "is-dark" : "is-light"} ${className}`.trim()}
      aria-label={nextModeLabel}
      aria-pressed={isDark}
      title={nextModeLabel}
      onClick={toggleTheme}
    >
      <Sun className="seg-theme-toggle-sun" aria-hidden="true" />
      {showLabel ? <span>{isDark ? "Dark Mode" : "Light Mode"}</span> : <span className="sr-only">{nextModeLabel}</span>}
      <span className="seg-theme-toggle-track" aria-hidden="true"><i /></span>
      <Moon className="seg-theme-toggle-moon" aria-hidden="true" />
    </button>
  );
}
