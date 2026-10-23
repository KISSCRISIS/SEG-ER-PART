import { ThemeToggle } from "@/components/ThemeToggle";
import { trpc } from "@/lib/trpc";
import { SEG_ROUTES } from "@/lib/seg-navigation";
import { ArrowRight, KeyRound, LoaderCircle, MailCheck } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";

export default function VerifyEmailPage() {
  const [, setLocation] = useLocation();
  const email = useMemo(() => new URLSearchParams(window.location.search).get("email") ?? "", []);
  const [pilotCode, setPilotCode] = useState(() => window.sessionStorage.getItem("segPilotVerificationCode") ?? "");
  const [code, setCode] = useState(() => window.sessionStorage.getItem("segPilotVerificationCode") ?? "");
  const verify = trpc.auth.verifyEmail.useMutation();
  const resend = trpc.auth.resendVerification.useMutation();

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!email) return toast.error("Missing email address. Please register again.");
    try {
      await verify.mutateAsync({ email, code });
      window.sessionStorage.removeItem("segPilotVerificationCode");
      toast.success("Email verified successfully.");
      setLocation(SEG_ROUTES.dashboard);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Verification failed.");
    }
  }

  async function resendCode() {
    if (!email) return;
    try {
      const result = await resend.mutateAsync({ email });
      if (result.pilotVerificationCode) {
        setPilotCode(result.pilotVerificationCode);
        setCode(result.pilotVerificationCode);
        window.sessionStorage.setItem("segPilotVerificationCode", result.pilotVerificationCode);
        toast.success("A new pilot verification code was generated.");
      } else {
        toast.success("A new verification code was sent.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not resend the code.");
    }
  }

  return (
    <main className="seg-app flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-900">
      <section className="w-full max-w-md rounded-[2rem] border border-cyan-200 bg-white p-7 shadow-2xl shadow-cyan-950/30" aria-labelledby="verify-title">
        <div className="mb-6 flex items-center justify-between"><span className="rounded-2xl bg-cyan-50 p-3 text-cyan-600"><MailCheck size={28} /></span><ThemeToggle /></div>
        <h1 id="verify-title" className="text-3xl font-black text-slate-900">{bi("verify.title")}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{bi("verify.sent")} <strong className="break-all text-slate-900">{email || "your email"}</strong>. It expires in 10 minutes.</p>
        {pilotCode ? <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-center" role="status"><p className="text-xs font-bold uppercase tracking-wider text-amber-800">{bi("verify.code.title")}</p><strong className="mt-2 block text-3xl tracking-[0.35em] text-slate-900">{pilotCode}</strong><p className="mt-2 text-xs text-amber-800">Testing only — email ownership is not verified.</p></div> : null}
        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4 focus-within:border-cyan-500">
            <KeyRound className="text-cyan-600" aria-hidden="true" />
            <span className="sr-only">{bi("verify.code.label")}</span>
            <input className="w-full bg-transparent py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={event => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="000000" required />
          </label>
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-500 py-4 font-bold text-white disabled:opacity-60" disabled={verify.isPending || code.length !== 6}>
            {verify.isPending ? <LoaderCircle className="animate-spin" /> : <>{bi("verify.submit")} <ArrowRight /></>}
          </button>
        </form>
        <button type="button" onClick={resendCode} disabled={resend.isPending || !email} className="mt-5 w-full text-sm font-semibold text-cyan-700 disabled:opacity-50">{resend.isPending ? "Sending…" : "Resend verification code"}</button>
        <p className="mt-6 text-center text-sm text-slate-500"><Link href={SEG_ROUTES.login} className="font-semibold text-slate-800">{bi("verify.back")}</Link></p>
      </section>
    </main>
  );
}
