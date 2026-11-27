"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { WEB_APP_URL } from "@/lib/config";
import { fetchSignUpStatus, sendSignUp, type SignUpStatus } from "@/lib/registration";

type Role = "student" | "teacher";

const PASSWORD_RULES: Array<{ label: string; test: (value: string) => boolean }> = [
  { label: "At least 12 characters", test: (v) => v.length >= 12 },
  { label: "An uppercase and a lowercase letter", test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { label: "A number", test: (v) => /[0-9]/.test(v) },
  { label: "A symbol, such as ! or #", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

const STUDENT_NUMBER = /^\d{4}-\d{5}-[A-Z]{2}-\d$/;

// 16px text keeps phones from zooming in when a field is tapped.
const FIELD =
  "mt-1.5 block w-full min-h-12 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-base text-zinc-900 dark:text-white";
const LABEL = "block text-sm font-semibold text-zinc-800 dark:text-zinc-200";

const EMPTY = {
  fullName: "",
  studentId: "",
  program: "",
  yearLevel: "",
  email: "",
  password: "",
  confirm: "",
  website: "",
};

export default function SignUpForm() {
  const [status, setStatus] = useState<SignUpStatus | null>(null);
  const [unreachable, setUnreachable] = useState<string | null>(null);
  const [role, setRole] = useState<Role>("student");
  const [form, setForm] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [show, setShow] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentAs, setSentAs] = useState<{ role: Role; identity: string } | null>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  const load = useCallback(() => {
    setUnreachable(null);
    fetchSignUpStatus()
      .then(setStatus)
      .catch(() => setUnreachable("Sign-up can't be reached right now."));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const set = (field: keyof typeof EMPTY) => (event: { target: { value: string } }) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    // The message was about the old value.
    setError(null);
  };

  const problem = () => {
    if (form.fullName.trim().length < 2) return "Enter your full name.";
    if (role === "student") {
      if (!STUDENT_NUMBER.test(form.studentId.trim().toUpperCase())) {
        return "Enter your student number like 2024-00001-MN-0.";
      }
      if (!form.program) return "Choose your program.";
      if (!form.yearLevel) return "Choose your year level.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Enter a valid email address.";
    if (PASSWORD_RULES.some((rule) => !rule.test(form.password))) return "Your password does not meet all the rules yet.";
    if (form.password !== form.confirm) return "The two passwords do not match.";
    if (!consent) return "Accept the Privacy Policy and Terms to continue.";
    return null;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (sending) return;
    const invalid = problem();
    if (invalid) {
      setError(invalid);
      return;
    }
    setSending(true);
    setError(null);
    const studentId = form.studentId.trim().toUpperCase();
    const email = form.email.trim();
    try {
      await sendSignUp({
        role,
        fullName: form.fullName.trim(),
        email,
        password: form.password,
        ...(role === "student"
          ? { studentId, program: form.program, yearLevel: Number(form.yearLevel) }
          : {}),
        consent,
        website: form.website,
      });
      setSentAs({ role, identity: role === "student" ? studentId : email });
      setForm(EMPTY);
      setConsent(false);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Your request could not be sent.");
    } finally {
      setSending(false);
    }
  };

  if (unreachable) {
    return (
      <div role="alert" className="bento-card p-8 text-center">
        <p className="mb-4 text-zinc-700 dark:text-zinc-200">{unreachable}</p>
        <button type="button" onClick={load} className="btn-primary">
          Try again
        </button>
      </div>
    );
  }

  if (!status) {
    return (
      <p className="flex items-center justify-center gap-2 py-16 text-zinc-500">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading…
      </p>
    );
  }

  if (sentAs) {
    return (
      <div role="status" className="bento-card p-8">
        <CheckCircle2 className="mb-4 w-10 h-10 text-maroon dark:text-golden" />
        <h2 className="font-lora font-bold text-2xl mb-3 text-zinc-900 dark:text-white">Request sent</h2>
        <p className="mb-3 leading-relaxed text-zinc-700 dark:text-zinc-200">
          An administrator will review it. <strong>You cannot sign in until it is approved.</strong>
        </p>
        <p className="mb-6 leading-relaxed text-zinc-700 dark:text-zinc-200">
          Once approved, sign in with <strong className="break-all">{sentAs.identity}</strong> and the password you
          just chose. No email is sent, so try again later or ask your administrator.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={WEB_APP_URL} className="btn-primary">
            Open Web Dashboard
          </a>
          <button type="button" onClick={() => setSentAs(null)} className="btn-ghost">
            Send another request
          </button>
        </div>
      </div>
    );
  }

  if (!status.open) {
    return (
      <div role="status" className="bento-card p-8 text-center">
        <h2 className="font-lora font-bold text-2xl mb-3 text-zinc-900 dark:text-white">Sign-up is closed</h2>
        <p className="mb-6 text-zinc-700 dark:text-zinc-200">
          New requests are not being accepted. If you already have an account, sign in on the web dashboard or the app.
        </p>
        <Link href="/" className="btn-ghost">
          Back to the home page
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="bento-card p-5 sm:p-8 space-y-5">
      <fieldset>
        <legend className={LABEL}>I am a</legend>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          {(["student", "teacher"] as const).map((option) => (
            <label
              key={option}
              className={`flex min-h-12 cursor-pointer items-center justify-center border text-sm font-bold ${
                role === option
                  ? "border-maroon bg-maroon text-golden dark:border-golden dark:bg-golden dark:text-maroon-dark"
                  : "border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200"
              }`}
            >
              <input
                type="radio"
                name="role"
                className="sr-only"
                checked={role === option}
                onChange={() => {
                  setRole(option);
                  setError(null);
                }}
              />
              {option === "student" ? "Student" : "Teacher"}
            </label>
          ))}
        </div>
      </fieldset>

      <label className={LABEL}>
        Full name
        <input className={FIELD} value={form.fullName} onChange={set("fullName")} autoComplete="name" maxLength={150} />
      </label>

      {role === "student" ? (
        <>
          <label className={LABEL}>
            Student number
            <input
              className={`${FIELD} uppercase placeholder:normal-case`}
              value={form.studentId}
              onChange={set("studentId")}
              placeholder="2024-00001-MN-0"
              autoCapitalize="characters"
              autoComplete="off"
              maxLength={32}
            />
          </label>
          <label className={LABEL}>
            Program
            <select className={FIELD} value={form.program} onChange={set("program")}>
              <option value="">Choose your program</option>
              {status.programs.map((program) => (
                <option key={program.code} value={program.code}>
                  {program.code} — {program.name}
                </option>
              ))}
            </select>
          </label>
          <label className={LABEL}>
            Year level
            <select className={FIELD} value={form.yearLevel} onChange={set("yearLevel")}>
              <option value="">Choose your year</option>
              {[1, 2, 3, 4, 5].map((year) => (
                <option key={year} value={year}>
                  Year {year}
                </option>
              ))}
            </select>
          </label>
        </>
      ) : null}

      <label className={LABEL}>
        Email
        <input
          className={FIELD}
          type="email"
          inputMode="email"
          value={form.email}
          onChange={set("email")}
          autoComplete="email"
          autoCapitalize="none"
          maxLength={254}
        />
      </label>

      <div>
        <label htmlFor="signup-password" className={LABEL}>
          Password
        </label>
        <div className="relative">
          <input
            id="signup-password"
            className={`${FIELD} pr-12`}
            type={show ? "text" : "password"}
            value={form.password}
            onChange={set("password")}
            autoComplete="new-password"
            maxLength={128}
            aria-describedby="password-rules"
          />
          <button
            type="button"
            onClick={() => setShow((value) => !value)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-0 top-1.5 flex h-12 w-12 items-center justify-center text-zinc-500"
          >
            {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <ul id="password-rules" className="mt-2 space-y-1 text-xs">
          {PASSWORD_RULES.map((rule) => {
            const met = rule.test(form.password);
            return (
              <li key={rule.label} className={met ? "text-green-700 dark:text-green-400" : "text-zinc-500"}>
                <span aria-hidden="true">{met ? "✓" : "•"}</span> {rule.label}
                <span className="sr-only">{met ? " (done)" : " (not yet)"}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <label className={LABEL}>
        Confirm password
        <input
          className={FIELD}
          type={show ? "text" : "password"}
          value={form.confirm}
          onChange={set("confirm")}
          autoComplete="new-password"
          maxLength={128}
        />
      </label>

      {/* Left empty by people; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
        <input
          type="checkbox"
          className="mt-0.5 h-5 w-5 shrink-0"
          checked={consent}
          onChange={(event) => {
            setConsent(event.target.checked);
            setError(null);
          }}
        />
        <span>
          I have read and accept the{" "}
          <Link href="/privacy" target="_blank" className="font-bold underline text-maroon dark:text-golden">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" target="_blank" className="font-bold underline text-maroon dark:text-golden">
            Terms
          </Link>
          , and agree to my details being used to create my account.
        </span>
      </label>

      {error ? (
        <p
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200"
        >
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60">
        {sending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send request"
        )}
      </button>
    </form>
  );
}
