import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { ThemeToggle } from "@/components/ThemeToggle";
import { trpc } from "@/lib/trpc";
import {
  Bell,
  CheckCircle2,
  CircleUserRound,
  Globe2,
  GraduationCap,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";
import Bi from "@/components/Bi";
import { biText } from "@/lib/seg-i18n";

function formatDate(value?: string | Date | null) {
  if (!value) return biText("account.not.recorded");
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? biText("account.not.recorded") : date.toLocaleString();
}

const TRAINING_LEVEL_OPTIONS = [
  {
    value: "pgy1",
    label: "PGY-1 / Foundations",
    detail: "Core ED safety, triage, initial resuscitation",
  },
  {
    value: "pgy2",
    label: "PGY-2 / Core practice",
    detail: "Higher volume decision-making and common emergencies",
  },
  {
    value: "pgy3",
    label: "PGY-3 / Senior resident",
    detail: "Critical care, risk, flow, and independent practice",
  },
  {
    value: "pgy4",
    label: "PGY-4 / Advanced leadership",
    detail: "Systems leadership, supervision, and complex disposition",
  },
  {
    value: "pgy5_plus",
    label: "PGY-5+ / Advanced trainee",
    detail: "Fellow-level review, exam mastery, and teaching",
  },
  {
    value: "attending",
    label: "Attending / Consultant",
    detail: "Maintenance, teaching, governance, and review",
  },
  {
    value: "pilot_reviewer",
    label: "Private pilot reviewer",
    detail: "Internal SEG content review and testing",
  },
] as const;

type TrainingLevel = (typeof TRAINING_LEVEL_OPTIONS)[number]["value"];

function getTrainingLevel(value?: string | null) {
  return (
    TRAINING_LEVEL_OPTIONS.find(option => option.value === value) ??
    TRAINING_LEVEL_OPTIONS[0]
  );
}

export default function AccountPage() {
  const { user, logout, loading } = useAuth();
  const profile = trpc.account.profile.useQuery();
  const updateProfile = trpc.account.updateProfile.useMutation();
  const utils = trpc.useUtils();
  const learningProfile = profile.data?.learningProfile;
  const displayName = profile.data?.user.name ?? user?.name ?? "SEG User";
  const displayEmail = profile.data?.user.email ?? user?.email ?? "No email";
  const [form, setForm] = useState({
    fullName: "",
    professionalTrack: "Emergency medicine",
    country: "Jordan",
    graduationYear: "",
    preferredLanguage: "en" as "en" | "ar",
    trainingLevel: "pgy1" as TrainingLevel,
  });

  useEffect(() => {
    if (!profile.data) return;
    setForm({
      fullName: profile.data.user.name ?? "",
      professionalTrack:
        profile.data.learningProfile?.professionalTrack ?? "Emergency medicine",
      country: profile.data.learningProfile?.country ?? "",
      graduationYear: profile.data.learningProfile?.graduationYear
        ? String(profile.data.learningProfile.graduationYear)
        : "",
      preferredLanguage:
        profile.data.learningProfile?.preferredLanguage === "ar" ? "ar" : "en",
      trainingLevel: getTrainingLevel(
        profile.data.learningProfile?.trainingLevel
      ).value,
    });
  }, [profile.data]);
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join("");
  const preferredLanguage =
    learningProfile?.preferredLanguage === "ar" ? "Arabic" : "English";
  const trainingLevel = getTrainingLevel(learningProfile?.trainingLevel);
  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const graduationYear = form.graduationYear
      ? Number(form.graduationYear)
      : null;
    if (graduationYear && !Number.isInteger(graduationYear)) {
      toast.error(biText("account.error.gradyear"));
      return;
    }
    await updateProfile.mutateAsync({
      fullName: form.fullName,
      professionalTrack: form.professionalTrack,
      country: form.country || null,
      graduationYear,
      preferredLanguage: form.preferredLanguage,
      trainingLevel: form.trainingLevel,
    });
    await Promise.all([
      utils.account.profile.invalidate(),
      utils.auth.me.invalidate(),
    ]);
    toast.success(biText("account.error.save"));
  };

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-6xl space-y-5 text-slate-100">
        <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl border border-cyan-200/25 bg-cyan-300/10 text-xl font-black text-cyan-100">
                {initials || "SEG"}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
                  <Bi t="account.title" />
                </p>
                <h1 className="mt-1 text-2xl font-black">{displayName}</h1>
                <p className="mt-1 text-sm text-slate-400">{displayEmail}</p>
              </div>
            </div>
            <button
              onClick={logout}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-red-300/25 bg-red-400/10 px-4 py-2.5 text-sm font-bold text-red-100 disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              <Bi t="account.logout" />
            </button>
          </div>
          <div className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-300/[.06] p-3 text-xs leading-5 text-emerald-100">
            <Bi t="account.notice" />
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <Metric
            icon={ShieldCheck}
            label={bi("account.metric.status")}
            value={
              profile.data?.user.emailVerifiedAt ? bi("account.status.verified") : bi("account.status.protected")
            }
            detail={
              profile.data?.user.emailVerifiedAt
                ? bi("account.status.verified.detail")
                : bi("account.status.protected.detail")
            }
          />
          <Metric
            icon={Stethoscope}
            label={bi("account.metric.track")}
            value={learningProfile?.professionalTrack ?? "Emergency medicine"}
            detail={bi("account.metric.track.detail")}
          />
          <Metric
            icon={GraduationCap}
            label={bi("account.metric.training")}
            value={trainingLevel.label.split(" / ")[0]}
            detail={trainingLevel.detail}
          />
          <Metric
            icon={Globe2}
            label={bi("account.metric.language")}
            value={preferredLanguage}
            detail={bi("account.metric.language.detail")}
          />
          <Metric
            icon={GraduationCap}
            label={bi("account.metric.graduation")}
            value={learningProfile?.graduationYear ?? biText("account.not.set")}
            detail={learningProfile?.country ?? biText("account.country.not.set")}
          />
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <div className="flex items-center gap-2">
                <UserRoundCheck className="h-5 w-5 text-cyan-300" />
                <h2 className="font-black">{bi("account.profile.heading")}</h2>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Info label={bi("account.label.name")} value={displayName} />
                <Info label={bi("account.label.email")} value={displayEmail} />
                <Info
                  label={bi("account.label.track")}
                  value={
                    learningProfile?.professionalTrack ??
                    "Emergency medicine resident"
                  }
                />
                <Info
                  label="Training level"
                  value={trainingLevel.label}
                  detail={trainingLevel.detail}
                />
                <Info
                  label={bi("account.label.country")}
                  value={learningProfile?.country ?? biText("account.not.set")}
                />
              </div>
              <div className="mt-4 rounded-xl border border-cyan-200/15 bg-cyan-300/[.05] p-3 text-xs leading-5 text-cyan-50">
                {bi("account.route.title")}
              </div>
            </section>

            <form
              onSubmit={saveProfile}
              className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CircleUserRound className="h-5 w-5 text-cyan-300" />
                  <h2 className="font-black">{bi("account.edit.prefs")}</h2>
                </div>
                <button
                  type="submit"
                  disabled={updateProfile.isPending}
                  className="rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-black text-slate-950 disabled:opacity-50"
                >
                  {updateProfile.isPending ? bi("account.save.pending") : bi("account.save.changes")}
                </button>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-bold text-slate-300">
                  {bi("account.label.fullname")}
                  <input
                    value={form.fullName}
                    onChange={event =>
                      setForm({ ...form, fullName: event.target.value })
                    }
                    required
                    minLength={2}
                    maxLength={120}
                    className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white"
                  />
                </label>
                <label className="grid gap-1.5 text-xs font-bold text-slate-300">
                  {bi("account.label.proftrack")}
                  <select
                    value={form.professionalTrack}
                    onChange={event =>
                      setForm({
                        ...form,
                        professionalTrack: event.target.value,
                      })
                    }
                    className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white"
                  >
                    <option value="Emergency medicine">{bi("account.track.em")}</option>
                    <option value="Emergency medicine resident">{bi("account.track.emr")}</option>
                    <option value="FRCEM preparation">{bi("account.track.frcem")}</option>
                    <option value="Private pilot reviewer">{bi("account.track.pilot")}</option>
                  </select>
                </label>
                <label className="grid gap-1.5 text-xs font-bold text-slate-300">
                  {bi("account.label.traininglevel")}
                  <select
                    value={form.trainingLevel}
                    onChange={event =>
                      setForm({
                        ...form,
                        trainingLevel: event.target.value as TrainingLevel,
                      })
                    }
                    className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white"
                  >
                    {TRAINING_LEVEL_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1.5 text-xs font-bold text-slate-300">
                  {bi("account.label.country")}
                  <input
                    value={form.country}
                    onChange={event =>
                      setForm({ ...form, country: event.target.value })
                    }
                    maxLength={96}
                    className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white"
                  />
                </label>
                <label className="grid gap-1.5 text-xs font-bold text-slate-300">
                  {bi("account.label.gradyear")}
                  <input
                    type="number"
                    min={1950}
                    max={2100}
                    value={form.graduationYear}
                    onChange={event =>
                      setForm({ ...form, graduationYear: event.target.value })
                    }
                    className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white"
                  />
                </label>
                <label className="grid gap-1.5 text-xs font-bold text-slate-300">
                  {bi("account.label.preferredlang")}
                  <select
                    value={form.preferredLanguage}
                    onChange={event =>
                      setForm({
                        ...form,
                        preferredLanguage: event.target.value as "en" | "ar",
                      })
                    }
                    className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white"
                  >
                    <option value="en">{bi("account.lang.en")}</option>
                    <option value="ar">{bi("account.lang.ar")}</option>
                  </select>
                </label>
              </div>
              <p className="mt-3 text-[11px] leading-5 text-slate-400">
                {bi("account.prefs.note")}
              </p>
            </form>

            <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-cyan-300" />
                <h2 className="font-black">{bi("account.preferences")}</h2>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/[.03] p-4">
                  <p className="text-xs font-bold text-slate-300">
                    {bi("account.display.mode")}
                  </p>
                  <ThemeToggle className="mt-3" showLabel />
                </div>
                <Info
                  label={bi("account.info.language")}
                  value={preferredLanguage}
                  detail={bi("account.info.language.detail")}
                />
                <Info
                  label={bi("account.info.notifications")}
                  value={bi("account.info.notifications.value")}
                  detail={bi("account.info.notifications.detail")}
                />
                <Info
                  label={bi("account.info.privacy")}
                  value={bi("account.info.privacy.value")}
                  detail={bi("account.info.privacy.detail")}
                />
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <div className="flex items-center gap-2">
                <LockKeyhole className="h-5 w-5 text-cyan-300" />
                <h2 className="font-black">{bi("account.session.security")}</h2>
              </div>
              <div className="mt-4 space-y-3">
                <Info
                  label={bi("account.role")}
                  value={profile.data?.user.role ?? "user"}
                  detail={bi("account.role.detail")}
                />
                <Info
                  label={bi("account.login.method")}
                  value={profile.data?.user.loginMethod ?? "session"}
                />
                <Info
                  label={bi("account.last.signed.in")}
                  value={formatDate(profile.data?.user.lastSignedIn)}
                />
                <Info
                  label={bi("account.account.created")}
                  value={formatDate(profile.data?.user.createdAt)}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-cyan-200/15 bg-cyan-300/[.05] p-5">
              <h2 className="font-black">{bi("account.quick.actions")}</h2>
              <div className="mt-4 grid gap-2">
                <Link
                  href="/pathway"
                  className="rounded-xl border border-cyan-200/20 px-4 py-3 text-sm font-bold text-cyan-100"
                >
                  {bi("account.view.pathway")}
                </Link>
                <Link
                  href="/journal"
                  className="rounded-xl border border-cyan-200/20 px-4 py-3 text-sm font-bold text-cyan-100"
                >
                  {bi("account.review.journal")}
                </Link>
                <Link
                  href="/practice/settings"
                  className="rounded-xl border border-cyan-200/20 px-4 py-3 text-sm font-bold text-cyan-100"
                >
                  {bi("account.practice.settings")}
                </Link>
              </div>
            </section>
          </aside>
        </section>
      </main>
    </DashboardLayout>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof CircleUserRound;
  label: React.ReactNode;
  value: string | number;
  detail: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
      <Icon className="h-5 w-5 text-cyan-300" />
      <p className="mt-4 text-lg font-black text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{label}</p>
      <p className="mt-2 flex items-center gap-1 text-[10px] text-emerald-200">
        <CheckCircle2 className="h-3 w-3" />
        {detail}
      </p>
    </article>
  );
}

function Info({
  label,
  value,
  detail,
}: {
  label: React.ReactNode;
  value: string | number;
  detail?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/[.06] bg-slate-950/45 p-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-cyan-300">
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-white">{value}</p>
      {detail ? (
        <p className="mt-1 text-[11px] leading-5 text-slate-400">{detail}</p>
      ) : null}
    </div>
  );
}
