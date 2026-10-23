import React from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "wouter";
import LaboratoryDashboard from "@/components/laboratory/LaboratoryDashboard";

export default function LaboratoryPage() {
  return (
    <div className="seg-app seg-grid-bg seg-laboratory-page min-h-screen">
      <header className="border-b border-cyan-100/10 bg-[#07111e]/85 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 w-full max-w-[1410px] items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Return to SEG home"
          >
            <ArrowLeft className="h-4 w-4 text-cyan-200" aria-hidden="true" />
            <span>SEG Home</span>
          </Link>
          <div
            className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-slate-500 sm:flex"
            aria-label="Page location"
          >
            <Home className="h-3.5 w-3.5 text-cyan-200" aria-hidden="true" />
            <span>/</span>
            <span className="text-cyan-200">Laboratory Guide</span>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1410px] px-4 py-6 sm:px-6 sm:py-8">
        <LaboratoryDashboard />
      </main>
    </div>
  );
}
