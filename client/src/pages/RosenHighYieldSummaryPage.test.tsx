import React from "react";
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import RosenHighYieldSummaryPage from "./RosenHighYieldSummaryPage";

vi.mock("@/components/DashboardLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock("@/components/LearningCompletionButton", () => ({
  default: () => <div data-testid="learning-completion" />,
}));
vi.mock("@/lib/trpc", () => ({
  trpc: {
    learningProgress: {
      current: { useQuery: () => ({ data: { completedIds: [] } }) },
    },
  },
}));
const data = JSON.parse(
  readFileSync(
    "client/public/content/summary-books/rosen-high-yield.json",
    "utf8"
  )
);
afterEach(() => {
  window.history.replaceState(null, "", "/learn/summaries/rosen-high-yield");
  cleanup();
  vi.unstubAllGlobals();
});

describe("Rosen bilingual reader", () => {
  it("shows every topic for direct selection and opens one topic at a time", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => data })
    );
    render(<RosenHighYieldSummaryPage />);
    await screen.findByRole("heading", { name: "ABDOMINAL AORTIC ANEURYSM" });
    expect(screen.getByText(/2\. Arabic Explanation/)).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: /Open cited source pages/ })
        .getAttribute("href")
    ).toBe("/study-books/rosen-5min.pdf#page=54");
    expect(
      screen.getByText("Book → Chapter Map → Topics → Content")
    ).toBeTruthy();
    expect(screen.getByText("Chapter Map")).toBeTruthy();
    expect(screen.getByText(/chapters · 626 topics/)).toBeTruthy();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.getAllByRole("article")).toHaveLength(1);
    fireEvent.click(
      screen.getByRole("button", {
        name: /Gastrointestinal & Surgical Emergencies/,
      })
    );
    fireEvent.click(screen.getByRole("button", { name: "ABDOMINAL PAIN" }));
    expect(
      screen.getByRole("heading", { name: "ABDOMINAL PAIN" })
    ).toBeTruthy();
    expect(screen.getAllByRole("article")).toHaveLength(1);
  });
  it("reports fetch errors and supports retry instead of claiming zero topics", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValue({ ok: true, json: async () => data });
    vi.stubGlobal("fetch", fetch);
    render(<RosenHighYieldSummaryPage />);
    await screen.findByRole("alert");
    fireEvent.click(screen.getByRole("button", { name: "إعادة المحاولة" }));
    await screen.findByRole("heading", { name: "ABDOMINAL AORTIC ANEURYSM" });
    await waitFor(() => expect(screen.queryByRole("alert")).toBeNull());
  });
});
