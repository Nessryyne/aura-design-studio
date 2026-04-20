import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { signInMock, getSession } from "@/lib/auth";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — Noor" },
      { name: "description", content: "Sign in to your Noor Qur'an companion." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    const s = signInMock(email, mode === "signup" ? name || undefined : undefined);
    // Reading test first, then onboarding, then home
    if (mode === "signup" || !s.readingTested) {
      navigate({ to: "/reading-test" });
    } else if (!s.onboarded) {
      navigate({ to: "/onboarding" });
    } else {
      navigate({ to: "/home" });
    }
  };

  return (
    <AppShell>
      <div className="flex h-full flex-col">
        <div className="relative h-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-cream" />
          <div className="absolute inset-0 arabesque opacity-70" />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 grid h-12 w-12 place-items-center rounded-full bg-gradient-gold shadow-gold">
            <span className="font-arabic text-foreground">ن</span>
          </div>
        </div>

        <div className="-mt-4 flex-1 px-6">
          <h1 className="font-serif text-3xl text-foreground">
            {mode === "signin" ? "Welcome back" : "Create account"}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {mode === "signin" ? "Don't have an account? " : "Already have one? "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-medium text-gold-deep"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>

          <form className="mt-5 space-y-2.5" onSubmit={onSubmit}>
            {mode === "signup" && (
              <Field
                label="Name"
                value={name}
                onChange={setName}
                placeholder="Your name"
                type="text"
              />
            )}
            <Field
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="you@noor.app"
              type="email"
            />
            <Field
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              type="password"
            />

            {mode === "signin" && (
              <p className="text-right text-[11px] text-emerald">Forgot password?</p>
            )}

            <button
              type="submit"
              className="mt-3 w-full rounded-2xl bg-gradient-gold py-3 text-sm font-medium text-foreground shadow-gold transition-transform active:scale-[0.98]"
            >
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="mt-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-foreground/10" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              or continue with
            </span>
            <span className="h-px flex-1 bg-foreground/10" />
          </div>

          <div className="mt-3 flex justify-center gap-3">
            {["", "G", "f"].map((l, i) => (
              <button
                key={i}
                type="button"
                onClick={onSubmit}
                className="h-10 w-10 rounded-full border border-foreground/10 bg-surface grid place-items-center text-sm text-foreground/70 shadow-soft"
              >
                {l || ""}
              </button>
            ))}
          </div>

          <p className="mt-5 text-center text-[10px] text-muted-foreground">
            <Link to="/" className="underline-offset-4 hover:underline">
              ← back to landing
            </Link>
          </p>
        </div>
      </div>
    </AppShell>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type: string;
}) {
  return (
    <label className="block rounded-2xl border border-foreground/10 bg-surface px-4 py-2.5">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-0.5 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/30"
      />
    </label>
  );
}
