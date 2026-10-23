import Bi from "@/components/Bi";
import { SEG_PUBLIC_ACTIONS } from "@/lib/seg-copy";
import { segAssets } from "@/lib/seg-assets";
import { SEG_ROUTES } from "@/lib/seg-navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import React from "react";
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  BrainCircuit,
  BriefcaseMedical,
  ChartNoAxesCombined,
  ChevronRight,
  ClipboardList,
  Crosshair,
  GraduationCap,
  HeartPulse,
  House,
  Mail,
  NotebookPen,
  Settings,
  ShieldCheck,
  Siren,
  Sparkles,
  Stethoscope,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Link } from "wouter";

const navigation = [
  { label: <Bi t="home.nav.home" />, icon: House, href: "#top" },
  { label: <Bi t="home.nav.pathway" />, icon: BrainCircuit, href: "#capabilities" },
  { label: <Bi t="home.nav.learn" />, icon: BookOpen, href: "#capabilities" },
  { label: <Bi t="home.nav.practice" />, icon: Crosshair, href: "#capabilities" },
  { label: <Bi t="home.nav.atlas" />, icon: ClipboardList, href: "#capabilities", current: true },
  { label: <Bi t="home.nav.journal" />, icon: BookOpen, href: "#capabilities" },
  { label: <Bi t="home.nav.account" />, icon: UserRound, href: "#trust" },
];

const benefits = [
  { key: "home.benefit.ai", detail: "home.benefit.ai.detail", icon: BrainCircuit },
  { key: "home.benefit.evidence", detail: "home.benefit.evidence.detail", icon: ShieldCheck },
  { key: "home.benefit.track", detail: "home.benefit.track.detail", icon: ChartNoAxesCombined },
];

const metrics = [
  { value: "50+", label: "Medical Specialties", icon: HeartPulse },
  { value: "1,000+", label: "Learning Modules", icon: BookOpen },
  { value: "10,000+", label: "Practice Questions", icon: BrainCircuit },
  { value: "5,000+", label: "Clinical Cases", icon: BriefcaseMedical },
  { value: "12K+", label: "Active Professionals", icon: UsersRound },
];

const capabilities = [
  { key: "cap.emergency", body: "cap.emergency.desc", icon: Siren, kind: "emergency" },
  { key: "cap.references", body: "cap.references.desc", details: ["cap.ref.resources", "cap.ref.references", "cap.ref.tools", "cap.ref.support"], icon: ClipboardList, kind: "references" },
  { title: "Clinical Tools", body: "ECG Â· POCUS Â· Calculators & more", icon: Activity, kind: "tools" },
  { key: "cap.practice", body: "cap.practice.desc", details: null, icon: Stethoscope, kind: "practice" },
  { key: "cap.learn", body: "cap.learn.desc", details: null, icon: BookOpen, kind: "learn" },
  { key: "cap.journal", body: "cap.journal.desc", details: null, icon: NotebookPen, kind: "journal" },
];

const trustValues = [
  { key: "trust.worldwide", icon: ShieldCheck },
  { key: "trust.uptoDate", icon: ShieldCheck },
  { key: "trust.secure", icon: ClipboardList },
  { key: "trust.available", icon: Crosshair },
  { key: "trust.experts", icon: GraduationCap },
  { key: "trust.outcomes", icon: HeartPulse },
];

export default function Home() {
  return (
    <div id="top" className="seg-landing-v4">
      <header className="seg-landing-v4-header">
        <Link href={SEG_ROUTES.landing} className="seg-landing-v4-brand" aria-label="SEG home">
          <img src={segAssets.landingOfficialLockup} alt="SEG Smart Emergency Guide" decoding="async" fetchPriority="high" />
        </Link>

        <nav className="seg-landing-v4-nav" aria-label="Primary navigation">
          {navigation.map(({ label, icon: Icon, href, current }) => (
            <a key={label} href={href} aria-label={label} className={`seg-landing-v4-nav-item${current ? " is-active" : ""}`} aria-current={current ? "page" : undefined}>
              <Icon aria-hidden="true" />
              <span><Bi t={label as any} /></span>
            </a>
          ))}
        </nav>

        <div className="seg-landing-v4-profile">
          <img src={segAssets.landingProfileThumbnail} alt="" aria-hidden="true" decoding="async" loading="lazy" />
          <div className="seg-landing-v4-profile-copy"><strong><Bi t="home.profile.doctor" /></strong><span><Bi t="home.profile.role" /></span><em><i aria-hidden="true" /><Bi t="home.profile.online" /></em></div>
          <ThemeToggle />
          <button type="button" className="seg-landing-v4-utility" aria-label="Notifications"><Bell aria-hidden="true" /><b>4</b></button>
          <button type="button" className="seg-landing-v4-utility" aria-label="Messages"><Mail aria-hidden="true" /></button>
          <button type="button" className="seg-landing-v4-utility" aria-label="Settings"><Settings aria-hidden="true" /></button>
        </div>
      </header>

      <main className="seg-landing-v4-main">
        <section className="seg-landing-v4-hero" aria-labelledby="landing-title">
          <section className="seg-landing-v4-critical" aria-label="Emergency response countdown">
            <div className="seg-landing-v4-critical-ring" aria-hidden="true"><i /></div>
            <div className="seg-landing-v4-critical-copy">
              <span><Bi t="home.hero.critical" /></span>
              <strong>02:45:18</strong>
              <small><b>HRS</b><b>MIN</b><b>SEC</b></small>
              <em><Bi t="home.hero.counts" /></em>
            </div>
          </section>

          <div className="seg-landing-v4-copy">
            <p className="seg-landing-v4-kicker"><Sparkles aria-hidden="true" /><Bi t="home.hero.subtitle" /></p>
            <h1 id="landing-title"><Bi t="home.hero.title" /></h1>
            <p><Bi t="home.hero.desc" /></p>
            <div className="seg-landing-v4-benefits">
              {benefits.map(({ key, detail, icon: Icon }) => <article key={key}><Icon aria-hidden="true" /><div><strong><Bi t={key as any} /></strong><span><Bi t={detail as any} /></span></div></article>)}
            </div>
            <Link href={SEG_ROUTES.register} className="seg-landing-v4-action" aria-label={SEG_PUBLIC_ACTIONS.startJourney}>
              <span><Bi t="home.hero.action" /></span><ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="seg-landing-v4-scene" role="img" aria-label="Approved SEG emergency-response and brain-heart intelligence visuals">
            <div className="seg-landing-v4-grid" aria-hidden="true" />
            <div className="seg-landing-v4-monitor" aria-hidden="true"><BrainCircuit /><span /><Activity /></div>
            <img className="seg-landing-v4-response" src={segAssets.landingEmergencyResponseStage} alt="" aria-hidden="true" decoding="async" loading="lazy" />
            <img className="seg-landing-v4-brain-heart" src={segAssets.landingBrainHeartStage} alt="" aria-hidden="true" decoding="async" loading="lazy" />
            <div className="seg-landing-v4-ecg" aria-hidden="true"><svg viewBox="0 0 620 80" preserveAspectRatio="none"><path d="M0 45h88l26-24 25 47 38-66 28 43h84l24-17 25 35 37-51 35 33h89" /></svg></div>
          </div>
        </section>

        <section className="seg-landing-v4-metrics" aria-label="SEG learning statistics">
          {metrics.map(({ value, label, icon: Icon }) => <article key={label}><Icon aria-hidden="true" /><div><strong>{value}</strong><span><Bi t={label as any} /></span><i aria-hidden="true" /></div></article>)}
        </section>

        <section id="capabilities" className="seg-landing-v4-capabilities" aria-labelledby="capabilities-title">
          <h2 id="capabilities-title"><Bi t="home.capabilities.title" /></h2>
          <div>
            {capabilities.map(({ key, body, details, icon: Icon, kind }) => <article className={`is-${kind}`} key={key}><Icon aria-hidden="true" /><ChevronRight aria-hidden="true" /><h3><Bi t={key as any} /></h3><p><Bi t={body as any} /></p>{details && <ul aria-label="Smart References and Tools content">{details.map((detail) => <li key={detail}><Bi t={detail as any} /></li>)}</ul>}{kind === "references" ? <Link href={SEG_ROUTES.laboratory} className="seg-button-secondary mt-4 inline-flex w-full text-xs" aria-label="Open Laboratory Guide foundation"><span><Bi t="cap.lab.link" /></span><ArrowRight aria-hidden="true" /></Link> : null}</article>)}
          </div>
        </section>

        <section id="trust" className="seg-landing-v4-trust" aria-label="Why professionals trust SEG">
          {trustValues.map(({ key, icon: Icon }) => <article key={key}><Icon aria-hidden="true" /><span><Bi t={key as any} /></span></article>)}
        </section>
      </main>
    </div>
  );
}












