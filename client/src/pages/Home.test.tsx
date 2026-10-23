import { render, screen, within } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "./Home";

describe("Landing approved replacement implementation", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("keeps the approved SEG command-surface hierarchy and public Start Journey route available", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <Home />
      </ThemeProvider>
    );

    expect(screen.getByAltText("SEG Smart Emergency Guide")).not.toBeNull();
    expect(
      screen.getByRole("heading", {
        name: /Prepare\s+Smarter,?\s+Respond Better/i,
      })
    ).not.toBeNull();
    expect(
      screen.getByRole("link", { name: "Start Journey" }).getAttribute("href")
    ).toBe("/register");
    expect(
      screen.getByRole("link", { name: "My Home" }).getAttribute("href")
    ).toBe("#top");
    expect(
      screen.getByRole("link", { name: "My Account" }).getAttribute("href")
    ).toBe("#trust");
    expect(screen.getByText("50+")).not.toBeNull();
    expect(screen.getByText("10,000+")).not.toBeNull();
    expect(
      screen.getByRole("heading", {
        name: "Everything you need to learn, practice and excel",
      })
    ).not.toBeNull();
    expect(screen.getByText("Smart References & Tools")).not.toBeNull();
    expect(screen.getByText("Evidence-Based Resources")).not.toBeNull();
    expect(screen.getByText("Medical References")).not.toBeNull();
    const referenceContent = screen.getByRole("list", {
      name: "Smart References and Tools content",
    });
    expect(within(referenceContent).getByText("Clinical Tools")).not.toBeNull();
    expect(screen.getByText("Learning Support")).not.toBeNull();
    expect(
      screen
        .getByRole("link", { name: "Open Laboratory Guide foundation" })
        .getAttribute("href")
    ).toBe("/laboratory");
    expect(screen.queryByText("Drug Reference")).toBeNull();
    expect(
      screen.getByText("Trusted by Professionals Worldwide")
    ).not.toBeNull();
    expect(
      screen.getByRole("button", { name: "Switch to light mode" })
    ).not.toBeNull();
  });
});
