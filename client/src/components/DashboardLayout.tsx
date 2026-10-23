import { useAuth } from "@/_core/hooks/useAuth";
import { SEGBrand } from "@/components/SEGBrand";
import { DashboardLayoutSkeleton } from "@/components/DashboardLayoutSkeleton";
import Bi from "@/components/Bi";
import { ThemeToggle } from "@/components/ThemeToggle";
import { startLogin } from "@/const";
import { getDashboardAccessState, SEG_ROUTES } from "@/lib/seg-navigation";
import { segDashboardPresentationProfile } from "@/lib/seg-dashboard-profile";
import {
  Bell,
  BookOpen,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  Compass,
  Globe2,
  Home,
  LibraryBig,
  LogOut,
  Menu,
  NotebookPen,
  Search,
  Settings,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useLocation } from "wouter";

const navigation = [
  { id: "nav.home", label: <Bi t="nav.home" />, icon: Home, path: SEG_ROUTES.dashboard },
  { id: "nav.pathway", label: <Bi t="nav.pathway" />, icon: Compass, path: SEG_ROUTES.pathway },
  { id: "nav.learn", label: <Bi t="nav.learn" />, icon: BookOpen, path: SEG_ROUTES.learn },
  { id: "nav.practice", label: <Bi t="nav.practice" />, icon: ClipboardList, path: SEG_ROUTES.practice },
  { id: "nav.aqrab", label: <Bi t="nav.aqrab" />, icon: BookOpen, path: "/practice/create?family=AQRAB" },
  { id: "nav.atlas", label: <Bi t="nav.atlas" />, icon: LibraryBig, path: SEG_ROUTES.atlas },
  { id: "nav.journal", label: <Bi t="nav.journal" />, icon: NotebookPen, path: SEG_ROUTES.journal },
  { id: "nav.account", label: <Bi t="nav.account" />, icon: CircleUserRound, path: SEG_ROUTES.account },
] as const;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const accessState = getDashboardAccessState({
    loading,
    isAuthenticated: Boolean(user),
  });
  const accountName = user?.name ?? segDashboardPresentationProfile.displayName;
  const accountInitials = accountName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join("");

  function navigateTo(path: string) {
    if (path.startsWith("#")) {
      const target = document.querySelector<HTMLElement>(path);
      if (target) {
        const reduceMotion = window.matchMedia?.(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        const header = document.querySelector<HTMLElement>(
          ".seg-app > div > header"
        );
        const headerHeight = header?.getBoundingClientRect().height ?? 52;
        const targetTop =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          16;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: reduceMotion ? "auto" : "smooth",
        });
        setActiveSection(path.slice(1));
        if (!reduceMotion) window.setTimeout(() => setActiveSection(""), 320);
      }
    } else {
      setLocation(path);
    }
    setMobileOpen(false);
  }

  if (accessState === "loading") {
    return (
      <div className="seg-app seg-dashboard-loading relative">
        <DashboardLayoutSkeleton />
        <p className="seg-dashboard-loading-status" role="status">
          Preparing your secure workspace…
        </p>
      </div>
    );
  }

  if (accessState === "unauthenticated" || !user) {
    return (
      <main className="seg-app flex min-h-screen items-center justify-center p-5">
        <section
          className="seg-glass max-w-md rounded-[2rem] p-8 text-center"
          aria-labelledby="dashboard-sign-in-title"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-200/25 bg-cyan-300/10 text-cyan-200">
            <CircleUserRound className="h-7 w-7" />
          </div>
          <h1
            id="dashboard-sign-in-title"
            className="mt-6 text-2xl font-semibold text-white"
          >
            Sign in to access My Home
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Your SEG dashboard is protected by the existing secure
            authentication boundary.
          </p>
          <button
            className="seg-button-primary mt-7 w-full"
            onClick={startLogin}
          >
            Login <ChevronRight className="h-4 w-4" />
          </button>
        </section>
      </main>
    );
  }

  return (
    <div className="seg-app min-h-screen lg:flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[184px] flex-col border-r border-cyan-100/10 bg-[#060e19]/95 px-3 py-3 backdrop-blur-xl transition-transform duration-200 lg:sticky lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-2 py-2">
          <SEGBrand inverse compact />
          <button
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-6 space-y-1" aria-label="My Home navigation">
          {navigation.map(({ id, label, icon: Icon, path }) => (
            <button
              key={id}
              onClick={() => navigateTo(path)}
              className={`flex min-h-9 w-full items-center gap-3 rounded-lg px-3 text-left text-[11px] font-semibold transition-colors ${
                location === path
                  ? "bg-gradient-to-r from-cyan-400/35 to-blue-500/15 text-white shadow-[0_0_22px_rgba(0,212,255,0.12)]"
                  : "text-slate-300 hover:bg-white/7 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 text-cyan-200" />
              {label !== undefined ? <Bi t={label as any} /> : label}
            </button>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 pt-4">
          <button
            id="account"
            onClick={() => navigateTo(SEG_ROUTES.account)}
            className="w-full rounded-xl bg-white/[0.035] p-3 text-center transition hover:bg-cyan-300/[.06]"
          >
            <div className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-cyan-200/30 bg-gradient-to-br from-cyan-200/25 to-blue-500/10 text-sm font-bold text-cyan-100">
              {accountInitials || segDashboardPresentationProfile.initials}
            </div>
            <p className="mt-3 truncate text-sm font-semibold text-white">
              {accountName}
            </p>
            <p className="mt-1 text-[10px] text-slate-400">
              {segDashboardPresentationProfile.specialty}
            </p>
            <span className="mt-3 block text-[10px] font-semibold text-cyan-200">
              View Profile
            </span>
          </button>
          <ThemeToggle className="seg-dashboard-dark-mode mt-3" showLabel />
          <button
            onClick={logout}
            className="mt-3 flex min-h-9 w-full items-center justify-center gap-2 rounded-lg border border-white/10 text-[11px] font-semibold text-slate-300 hover:border-red-300/30 hover:bg-red-400/10 hover:text-red-100"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </aside>
      {mobileOpen ? (
        <button
          aria-label="Close navigation overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/70 lg:hidden"
        />
      ) : null}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-[52px] items-center justify-between border-b border-cyan-100/10 bg-[#07111e]/85 px-4 backdrop-blur-xl sm:px-5">
          <button
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
            className="rounded-xl p-2 text-slate-300 hover:bg-white/10 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden text-[11px] font-semibold text-slate-300 sm:block">
            {navigation.find(item => item.path === location)?.label ??
              "My Home"}
          </div>
          <div className="ml-auto flex items-center gap-3 text-slate-300">
            <ThemeToggle />
            <Search className="h-4 w-4" />
            <Bell className="h-4 w-4" />
            <button
              type="button"
              onClick={() => navigateTo(SEG_ROUTES.account)}
              aria-label="Open account settings"
            >
              <Settings className="h-4 w-4" />
            </button>
            <Globe2 className="h-4 w-4" />
            <span className="hidden text-[10px] sm:inline">EN</span>
          </div>
        </header>
        <main className="p-4 sm:p-5">
          <p className="sr-only" aria-live="polite">
            {activeSection
              ? `Opening ${
                  navigation.find(item => item.path === `#${activeSection}`)
                    ?.label ?? "section"
                }`
              : ""}
          </p>
          <div className={activeSection ? "seg-section-transition" : ""}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
