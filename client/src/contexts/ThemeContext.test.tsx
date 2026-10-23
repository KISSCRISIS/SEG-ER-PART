// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider, useTheme } from "./ThemeContext";

function ThemeProbe() {
  const { theme, toggleTheme } = useTheme();
  return <button type="button" onClick={toggleTheme}>{theme}</button>;
}

describe("SEG ThemeProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = "";
    delete document.documentElement.dataset.segTheme;
  });

  it("uses the provided dark default, toggles to light, and persists the explicit choice", async () => {
    const user = userEvent.setup();
    render(<ThemeProvider defaultTheme="dark"><ThemeProbe /></ThemeProvider>);

    expect(screen.getByRole("button", { name: "dark" })).not.toBeNull();
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    await user.click(screen.getByRole("button", { name: "dark" }));
    expect(screen.getByRole("button", { name: "light" })).not.toBeNull();
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(window.localStorage.getItem("seg-theme")).toBe("light");
  });
});
