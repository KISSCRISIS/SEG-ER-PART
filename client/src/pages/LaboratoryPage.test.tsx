import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LaboratoryPage from "./LaboratoryPage";

describe("Laboratory Foundation", () => {
  afterEach(() => cleanup());

  it("renders the explicitly non-clinical demo foundation", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <LaboratoryPage />
      </ThemeProvider>
    );

    expect(
      screen.getByRole("heading", { name: "Laboratory Guide" })
    ).not.toBeNull();
    expect(screen.getAllByText("DEMO_DATA_ONLY").length).toBeGreaterThan(0);
    expect(screen.getByText("No approved dataset")).not.toBeNull();
    expect(
      screen.getByRole("button", { name: /DEMO TEST ALPHA/ })
    ).not.toBeNull();
    expect(
      screen
        .getByRole("link", { name: "Return to SEG home" })
        .getAttribute("href")
    ).toBe("/");
  });

  it("filters only the local demo inventory by query and category", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="dark">
        <LaboratoryPage />
      </ThemeProvider>
    );

    const search = screen.getByRole("searchbox", {
      name: "Search demo laboratory items",
    });
    await user.type(search, "gamma");

    expect(
      screen.getByRole("button", { name: /DEMO TEST GAMMA/ })
    ).not.toBeNull();
    expect(
      screen.queryByRole("button", { name: /DEMO TEST ALPHA/ })
    ).toBeNull();
    expect(screen.getByText("1 demo item")).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "Clear demo search" }));
    await user.click(screen.getByRole("button", { name: "Demo Category Two" }));

    expect(
      screen.getByRole("button", { name: /DEMO TEST GAMMA/ })
    ).not.toBeNull();
    expect(
      screen.queryByRole("button", { name: /DEMO TEST ALPHA/ })
    ).toBeNull();
  });
});
