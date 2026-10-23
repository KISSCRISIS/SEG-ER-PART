import { segAssets } from "@/lib/seg-assets";
import { SEG_ROUTES } from "@/lib/seg-navigation";
import { isRegistrationPasswordStrong } from "@/lib/seg-registration";
import { ThemeToggle } from "@/components/ThemeToggle";
import { trpc } from "@/lib/trpc";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Ambulance,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  ShieldCheck,
  ShieldPlus,
  Stethoscope,
  Trophy,
  UserRound,
  UsersRound,
} from "lucide-react";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";

const roles = [
  { value: "Emergency medicine", label: "Emergency\nPhysician", icon: Stethoscope },
  { value: "Paramedic practice", label: "Paramedic /\nEMS", icon: Ambulance },
  { value: "Acute care nursing", label: "Emergency\nNursing", icon: ShieldPlus },
  { value: "Medical student", label: "Medical\nStudent", icon: GraduationCap },
  { value: "First responder", label: "First\nResponder", icon: ShieldCheck },
  { value: "Allied health professional", label: "Allied Health\nProfessional", icon: UsersRound },
] as const;

const benefits = [
  { label: "High-Yield\nContent", icon: BookOpen },
  { label: "Smart\nLearning", icon: BrainCircuit },
  { label: "Clinical\nPractice", icon: ShieldCheck },
  { label: "Professional\nGrowth", icon: Trophy },
] as const;

const countries = ["Jordan", "Saudi Arabia", "United Arab Emirates", "Egypt"] as const;
const graduationYears = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010"] as const;

function OfficialSEGBrand() {
  return (
    <div className="seg-register-v2-brand" aria-label="SEG — Smart Emergency Guide">
      <span className="seg-register-v2-brand-mark" aria-hidden="true">
        <img src={segAssets.officialBrainHeartMark} alt="" decoding="async" fetchPriority="high" />
      </span>
      <span className="seg-register-v2-brand-copy">
        <b>SEG</b>
        <strong>SMART <em>EMERGENCY</em> GUIDE</strong>
        <small>Emergency Medicine Learning Platform</small>
      </span>
    </div>
  );
}

function SocialMark({ provider }: { provider: "google" | "apple" | "microsoft" }) {
  if (provider === "google") return <span className="seg-register-v2-google-mark" aria-hidden="true">G</span>;
  if (provider === "apple") return <span className="seg-register-v2-apple-mark" aria-hidden="true">●</span>;
  return <span className="seg-register-v2-microsoft-mark" aria-hidden="true"><i /><i /><i /><i /></span>;
}

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const [track, setTrack] = useState("Emergency medicine");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [language, setLanguage] = useState<"English" | "العربية">("English");
  const [country, setCountry] = useState<(typeof countries)[number]>("Jordan");
  const [graduationYear, setGraduationYear] = useState<(typeof graduationYears)[number]>("2015");
  const passwordStrong = isRegistrationPasswordStrong(password);
  const registerMutation = trpc.auth.register.useMutation();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      toast.error("Please complete the required registration details.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!passwordStrong) {
      toast.error("Use at least 12 characters with uppercase, lowercase, number, and symbol.");
      return;
    }

    const data = new FormData(form);
    if (data.get("agreement") !== "on") {
      toast.error("You must accept the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      const result = await registerMutation.mutateAsync({
        fullName: String(data.get("fullName") ?? ""),
        email: String(data.get("email") ?? ""),
        password,
        professionalTrack: track,
        country,
        graduationYear: Number(graduationYear),
        preferredLanguage: language === "العربية" ? "ar" : "en",
        acceptedTerms: true,
      });
      if (result.pilotVerificationCode) {
        window.sessionStorage.setItem("segPilotVerificationCode", result.pilotVerificationCode);
      }
      if (result.verificationRequired) {
        toast.success("Verification code sent. Check your email.");
        setLocation(`${SEG_ROUTES.verifyEmail}?email=${encodeURIComponent(result.email)}`);
      } else {
        toast.success("Account created. You can sign in now.");
        setLocation(`${SEG_ROUTES.login}?email=${encodeURIComponent(result.email)}`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Account creation failed. Please try again.");
    }
  }

  return (
    <main className="seg-register-v2-page">
      <div className="seg-register-v2-shell">
        <aside className="seg-register-v2-story" aria-label="SEG professional learning introduction">
          <Link href={SEG_ROUTES.landing} className="seg-register-v2-logo-link" aria-label="Back to SEG">
            <OfficialSEGBrand />
          </Link>

          <div className="seg-register-v2-story-copy">
            <h1>Join thousands of<br />future <span>heroes.</span></h1>
            <p>Create your account and start your journey to save lives and learn smarter.</p>
          </div>

          <div className="seg-register-v2-medical-stage" aria-hidden="true">
            <img src={segAssets.registrationHeartStage} alt="" className="seg-register-v2-heart-stage-asset" decoding="async" loading="lazy" />
          </div>

          <section className="seg-register-v2-benefits" aria-label="SEG learning benefits">
            {benefits.map(({ label, icon: Icon }) => (
              <div className="seg-register-v2-benefit" key={label}>
                <span><Icon aria-hidden="true" /></span>
                <p>{label.split("\n").map((part, index) => <React.Fragment key={part}>{index ? <br /> : null}{part}</React.Fragment>)}</p>
              </div>
            ))}
          </section>

          <p className="seg-register-v2-security-note"><ShieldCheck aria-hidden="true" /><span><b>Your data is protected.</b>We follow the highest security standards.</span></p>
        </aside>

        <section className="seg-register-v2-form-shell" aria-labelledby="register-title">
          <div className="flex items-center justify-between gap-3"><div className="seg-register-v2-languages" role="group" aria-label="Language selection">
              <button type="button" onClick={() => setLanguage("English")} className={language === "English" ? "is-selected" : ""}><span>◎</span> English</button>
              <button type="button" onClick={() => setLanguage("العربية")} className={language === "العربية" ? "is-selected" : ""}><span>◎</span> العربية</button>
            </div><ThemeToggle /></div>

          <header className="seg-register-v2-form-heading">
            <h2 id="register-title">Create Your Account</h2>
            <p>Start your journey with Smart Emergency Guide</p>
          </header>

          <form className="seg-register-v2-form" onSubmit={handleSubmit} noValidate>
            <section aria-labelledby="personal-information-heading">
              <h3 id="personal-information-heading"><span>1.</span> Personal Information</h3>
              <div className="seg-register-v2-fields-grid">
                <label className="seg-register-v2-field">
                  <UserRound aria-hidden="true" />
                  <input name="fullName" autoComplete="name" placeholder="Full Name" required />
                </label>
                <label className="seg-register-v2-field">
                  <Mail aria-hidden="true" />
                  <input type="email" name="email" autoComplete="email" placeholder="Email Address" required />
                </label>
                <label className="seg-register-v2-field">
                  <LockKeyhole aria-hidden="true" />
                  <input type={showPassword ? "text" : "password"} name="password" autoComplete="new-password" placeholder="Password" minLength={12} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} required />
                  <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff /> : <Eye />}</button>
                </label>
                <label className="seg-register-v2-field">
                  <LockKeyhole aria-hidden="true" />
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" autoComplete="new-password" placeholder="Confirm Password" minLength={12} maxLength={128} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
                  <button type="button" onClick={() => setShowConfirmPassword((current) => !current)} aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}>{showConfirmPassword ? <EyeOff /> : <Eye />}</button>
                </label>
              </div>
              <p className="seg-register-v2-password-help"><span>i</span> Use 12–128 characters with uppercase, lowercase, a number &amp; a symbol</p>
              <div className="seg-register-v2-strength" aria-hidden="true"><i className={password.length ? (passwordStrong ? "is-strong" : "is-weak") : ""} /><i className={password.length > 3 ? (passwordStrong ? "is-strong" : "is-weak") : ""} /><i className={password.length > 6 ? (passwordStrong ? "is-strong" : "is-weak") : ""} /><i className={passwordStrong ? "is-strong" : ""} /></div>
            </section>

            <section aria-labelledby="professional-role-heading">
              <h3 id="professional-role-heading"><span>2.</span> Professional Role</h3>
              <p className="seg-register-v2-section-description">Select the role that best describes you</p>
              <select className="sr-only" value={track} onChange={(event) => setTrack(event.target.value)} name="track" aria-label="Professional role">
                {roles.map((role) => <option key={role.value}>{role.value}</option>)}
                <option>Critical care</option>
              </select>
              <div className="seg-register-v2-role-grid" role="radiogroup" aria-label="Professional role options">
                {roles.map(({ value, label, icon: Icon }) => {
                  const active = track === value;
                  return <button className={`seg-register-v2-role ${active ? "is-selected" : ""}`} type="button" role="radio" aria-checked={active} onClick={() => setTrack(value)} key={value}>
                    {active ? <CheckCircle2 className="seg-register-v2-role-check" aria-hidden="true" /> : null}
                    <Icon aria-hidden="true" />
                    <span>{label.split("\n").map((part, index) => <React.Fragment key={part}>{index ? <br /> : null}{part}</React.Fragment>)}</span>
                  </button>;
                })}
                <span className="seg-register-v2-role-blank" aria-hidden="true" />
              </div>
            </section>

            <section aria-labelledby="additional-information-heading">
              <h3 id="additional-information-heading"><span>3.</span> Additional Information <small>(Optional)</small></h3>
              <div className="seg-register-v2-fields-grid seg-register-v2-select-grid">
                <div className="seg-register-v2-field seg-register-v2-select-field">
                  <span className="seg-register-v2-globe" aria-hidden="true">◎</span>
                  <Select value={country} onValueChange={(value) => setCountry(value as (typeof countries)[number])}>
                    <SelectTrigger aria-label="Country" className="seg-register-v2-select-trigger"><SelectValue placeholder="Country" /></SelectTrigger>
                    <SelectContent className="seg-register-v2-select-content">
                      {countries.map((option) => <SelectItem className="seg-register-v2-select-item" key={option} value={option}>{option}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="seg-register-v2-field seg-register-v2-select-field">
                  <span className="seg-register-v2-chart" aria-hidden="true">▥</span>
                  <Select value={graduationYear} onValueChange={(value) => setGraduationYear(value as (typeof graduationYears)[number])}>
                    <SelectTrigger aria-label="Graduation year" className="seg-register-v2-select-trigger"><SelectValue placeholder="Graduation Year" /></SelectTrigger>
                    <SelectContent className="seg-register-v2-select-content">
                      {graduationYears.map((option) => <SelectItem className="seg-register-v2-select-item" key={option} value={option}>{option}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <label className="seg-register-v2-consent"><input type="checkbox" name="agreement" required /><span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a></span></label>
            </section>

            <button type="submit" className="seg-register-v2-submit" disabled={registerMutation.isPending}>{registerMutation.isPending ? <><span>Creating account…</span></> : <>Create Account <ArrowRight aria-hidden="true" /></>}</button>
          </form>

          <div className="seg-register-v2-divider"><span>OR</span></div>
          <div className="seg-register-v2-socials">
            <button type="button" onClick={() => toast.info("Google sign-in is not configured in this phase.")}><SocialMark provider="google" />Continue with Google</button>
            <button type="button" onClick={() => toast.info("Apple sign-in is not configured in this phase.")}><SocialMark provider="apple" />Continue with Apple</button>
            <button type="button" onClick={() => toast.info("Microsoft sign-in is not configured in this phase.")}><SocialMark provider="microsoft" />Continue with Microsoft</button>
          </div>
          <p className="seg-register-v2-login">Already have an account? <button type="button" onClick={() => setLocation(SEG_ROUTES.login)}>Sign in</button></p>
        </section>
      </div>
    </main>
  );
}
