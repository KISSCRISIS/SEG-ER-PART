import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import DashboardPage from "./DashboardPage";

vi.mock("@/components/DashboardLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <main>{children}</main>
  ),
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    residentContent: {
      practiceSummary: {
        useQuery: () => ({ data: { attempted: 0, correct: 0 } }),
      },
      chapters: {
        useQuery: () => ({ data: [] }),
      },
      studyProgress: {
        useQuery: () => ({ data: [] }),
      },
      performanceSummary: {
        useQuery: () => ({
          data: {
            attempted: 12,
            correct: 9,
            accuracy: 75,
            strongest: [
              {
                sectionId: 4,
                sectionTitle: "Cardiovascular Emergencies",
                attempted: 8,
                correct: 7,
                accuracy: 88,
                questionCount: 120,
              },
            ],
            weakest: [
              {
                sectionId: 6,
                sectionTitle: "Neurological Emergencies",
                attempted: 4,
                correct: 2,
                accuracy: 50,
                questionCount: 90,
              },
            ],
            nextRecommendedSection: {
              sectionId: 6,
              sectionTitle: "Neurological Emergencies",
              attempted: 4,
              correct: 2,
              accuracy: 50,
              questionCount: 90,
            },
          },
        }),
      },
    },
    qbank: {
      exams: {
        useQuery: () => ({ data: [] }),
      },
    },
    journalNotes: {
      list: {
        useQuery: () => ({ data: [] }),
      },
    },
    account: {
      profile: {
        useQuery: () => ({
          data: {
            user: {
              name: "Dr. Layla Haddad",
            },
            learningProfile: {
              trainingLevel: "pgy3",
            },
          },
        }),
      },
    },
  },
}));

describe("My Home core dashboard", () => {
  it("keeps the approved core cards without the removed anchor previews", () => {
    render(<DashboardPage />);

    expect(screen.getByRole("heading", { name: "Dr. Layla Haddad" })).not.toBeNull();
    expect(screen.queryByText("EMERGENCY ACTION")).toBeNull();
    expect(screen.queryByText("Professional Growth Core")).toBeNull();
    expect(screen.getByText("Today’s resident routing")).not.toBeNull();
    expect(screen.getAllByText("PGY-3").length).toBeGreaterThan(0);
    expect(screen.getByText("My Progress Overview")).not.toBeNull();
    expect(screen.getByText("Knowledge Mastery")).not.toBeNull();
    expect(screen.getByText("Upcoming Learning")).not.toBeNull();
    expect(screen.getByText("Daily Plan")).not.toBeNull();
    expect(screen.getByText("Recent Activity")).not.toBeNull();
    expect(screen.getByText("Quick Actions")).not.toBeNull();
    expect(screen.getByText("Weak Areas")).not.toBeNull();
    expect(screen.getByText("Practice Performance")).not.toBeNull();
    expect(screen.getByText("Due Review Items")).not.toBeNull();
    expect(screen.getByText("Board Readiness Index")).not.toBeNull();
    expect(screen.getByText("High Priority Improvement")).not.toBeNull();
    expect(
      screen.getByText(/not an exam outcome prediction/)
    ).not.toBeNull();
    expect(screen.getByText("Topic Evidence")).not.toBeNull();
    expect(
      screen.getAllByText("Neurological Emergencies").length
    ).toBeGreaterThan(1);
    expect(screen.getByText("Error Recovery")).not.toBeNull();
    expect(
      screen.getAllByText(/Question Interpretation Error/).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("link", { name: "Continue Learning" })
    ).toHaveProperty("href");
    expect(document.getElementById("learn")).toBeNull();
    expect(document.getElementById("pathway")).toBeNull();
    expect(document.getElementById("practice")).toBeNull();
    expect(document.getElementById("reference")).toBeNull();
    expect(document.getElementById("journal")).toBeNull();
    expect(
      screen.queryByRole("heading", { name: "My Learning Pathway" })
    ).toBeNull();
    expect(
      screen.queryByRole("heading", { name: "Atlas & Visual Assets" })
    ).toBeNull();
    expect(
      screen.queryByRole("heading", { name: "Medical Journal" })
    ).toBeNull();
  });
});
