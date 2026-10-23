// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@/contexts/ThemeContext";
import DashboardLayout from "./DashboardLayout";

const setLocation = vi.fn();

vi.mock("@/_core/hooks/useAuth", () => ({
  useAuth: () => ({ loading: false, user: { id: 1 }, logout: vi.fn() }),
}));

vi.mock("@/components/SEGBrand", () => ({
  SEGBrand: () => <span>SEG</span>,
}));

vi.mock("wouter", () => ({
  useLocation: () => ["/dashboard", setLocation],
}));

describe("DashboardLayout reference-parity rail", () => {
  it("renders the functional Dark Mode control without creating another route", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <DashboardLayout>
          <div>Dashboard content</div>
        </DashboardLayout>
      </ThemeProvider>
    );

    expect(screen.getByText("Dark Mode")).not.toBeNull();
    expect(screen.getAllByLabelText("Switch to light mode")).toHaveLength(2);
    expect(screen.getByText("My Account")).not.toBeNull();
  });

  it("routes Learn to the protected resident learning page", async () => {
    const user = userEvent.setup();
    setLocation.mockClear();
    render(
      <ThemeProvider defaultTheme="dark">
        <DashboardLayout>
          <div>Dashboard content</div>
        </DashboardLayout>
      </ThemeProvider>
    );

    await user.click(screen.getAllByRole("button", { name: "Learn" })[0]);

    expect(setLocation).toHaveBeenCalledWith("/learn");
  });

  it("routes My Account to the protected account page", async () => {
    const user = userEvent.setup();
    setLocation.mockClear();
    render(
      <ThemeProvider defaultTheme="dark">
        <DashboardLayout>
          <div>Dashboard content</div>
        </DashboardLayout>
      </ThemeProvider>
    );

    await user.click(screen.getAllByRole("button", { name: "My Account" })[0]);

    expect(setLocation).toHaveBeenCalledWith("/account");
  });
});
