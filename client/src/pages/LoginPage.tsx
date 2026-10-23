import { startLogin } from "@/const";
import Bi from "@/components/Bi";
import { biText } from "@/lib/seg-i18n";
import { segAssets } from "@/lib/seg-assets";
import { SEG_PUBLIC_ACTIONS } from "@/lib/seg-copy";
import { getSafePostLoginPath, SEG_ROUTES } from "@/lib/seg-navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { trpc } from "@/lib/trpc";
import { ArrowRight, HeartPulse, LoaderCircle, Mail, ShieldCheck } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";

const socialOptions = [
  { label: "Google", mark: "G", className: "is-google" },
  { label: "Microsoft", mark: "", className: "is-microsoft" },
  { label: "Apple", mark: "●", className: "is-apple" },
] as const;

export default function LoginPage() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [, setLocation] = useLocation();
  const loginMutation = trpc.auth.login.useMutation();

  function beginAuthentication() {
    setIsRedirecting(true);
    startLogin();
  }

  async function beginLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    try {
      await loginMutation.mutateAsync({
        email,
        remember: data.get("remember") === "on",
      });
      setLocation(getSafePostLoginPath(window.location.search));
    } catch (error) {
      const message = error instanceof Error ? error.message : biText("login.login.failed");
      if (message.includes("Verify your email address")) {
        toast.info(biText("login.verify.toast"));
        setLocation(`${SEG_ROUTES.verifyEmail}?email=${encodeURIComponent(email)}`);
        return;
      }
      toast.error(message);
    }
  }

  return (
    <div className="seg-login-v2-page">
      <div className="seg-login-v2-layout">
        <div className="seg-login-v2-particles" aria-hidden="true" />
        <img className="seg-login-v2-stage seg-login-v2-heart-stage" src={segAssets.loginHeartStage} alt="" aria-hidden="true" decoding="async" loading="lazy" />
        <img className="seg-login-v2-stage seg-login-v2-brain-stage" src={segAssets.loginBrainHeartStage} alt="" aria-hidden="true" decoding="async" loading="lazy" />
        <aside className="seg-login-v2-status" aria-label="System status: all systems operational">
          <span>{bi("login.system.p")}</span>
          <strong><i aria-hidden="true" />{bi("login.system.ops.p")}</strong>
        </aside>
        <header className="seg-login-v2-brand-wrap">
          <nav aria-label="Display settings">
            <p className="seg-login-v2-language"><span className="sr-only">Current language: </span>EN</p>
            <ThemeToggle className="seg-login-v2-theme-toggle" />
          </nav>
          <img className="seg-login-v2-brand-lockup" src={segAssets.loginOfficialLockup} alt="SEG — Smart Emergency Guide. Emergency Medicine Learning Platform" decoding="async" fetchPriority="high" />
        </header>

        <main className="seg-login-v2-main">
          <section className="seg-login-v2-card" aria-labelledby="login-heading">
            <div className="seg-login-v2-heading">
              <h1 id="login-heading">{bi("login.welcome.p")}</h1>
              <p>{bi("login.login.desc.p")}</p>
            </div>

            <form className="seg-login-v2-form" onSubmit={beginLogin}>
              <label className="seg-login-v2-field">
                <span className="sr-only">{bi("login.email.p")}</span>
                <Mail aria-hidden="true" />
                <input autoComplete="email" type="email" name="email" placeholder={biText("login.email.p")} required />
              </label>
              <div className="seg-login-v2-options">
                <label className="seg-login-v2-remember">
                <input type="checkbox" name="remember" defaultChecked />
                  <span>{bi("login.remember.p")}</span>
                </label>
                <button type="button" title={biText("login.pilot.p") + " — coming soon"} onClick={() => toast.info(biText("login.forgot.toast"))}>{bi("login.forgot.p")} <span aria-hidden="true" className="ml-1 rounded bg-amber-300/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-amber-200">{biText("login.pilot.p")}</span></button>
              </div>
              <button type="submit" className="seg-login-v2-submit" disabled={isRedirecting || loginMutation.isPending}>
                {loginMutation.isPending ? <><LoaderCircle className="seg-auth-loading-icon" aria-hidden="true" /> <Bi t="login.signing.in" /></> : <>{SEG_PUBLIC_ACTIONS.login}<ArrowRight aria-hidden="true" /></>}
              </button>
            </form>

            <div className="seg-login-v2-divider"><span />{bi("login.or.continue")}<span /></div>
            <div className="seg-login-v2-socials">
              {socialOptions.map((option) => (
                <button type="button" key={option.label} title={biText("login.pilot.p") + " — OAuth disabled in local pilot, use Email"} onClick={beginAuthentication} disabled={isRedirecting} className="seg-login-v2-social">
                  <span className={`seg-login-v2-social-mark ${option.className}`} aria-hidden="true">{option.mark}</span>
                  <span>{option.label}</span>
                  <span aria-hidden="true" className="ml-1 rounded bg-white/10 px-1 py-0.5 text-[8px] font-bold uppercase tracking-widest text-slate-300">{biText("login.pilot.p")}</span>
                </button>
              ))}
            </div>
            <p className="seg-login-v2-register-prompt">{bi("login.register.p")} <Link href={SEG_ROUTES.register}>{bi("login.register")}</Link></p>
          </section>

          <section className="seg-login-v2-trust-grid" aria-label="Trust and privacy information">
            <article className="seg-login-v2-trust-card">
              <ShieldCheck aria-hidden="true" />
              <div><h2>{bi("login.secure.p")}</h2><p>{bi("login.trust.secure.p")}</p></div>
            </article>
            <article className="seg-login-v2-trust-card">
              <HeartPulse aria-hidden="true" />
              <div><h2>{bi("login.trusted.by.p")}</h2><p>{bi("login.trust.trusted.p")}</p></div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
