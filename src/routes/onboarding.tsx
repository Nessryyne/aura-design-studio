import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { getSession, updateSession, type Level } from "@/lib/auth";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started — Noor" },
      { name: "description", content: "Set up your Noor experience." },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getSession()) {
      throw redirect({ to: "/signin" });
    }
  },
  component: Onboarding,
});

type Step = "goal" | "reciter" | "minutes" | "result";
const STEPS: Step[] = ["goal", "reciter", "minutes", "result"];

const GOALS = ["Improve recitation", "Learn Tajweed", "Memorise (Hifz)", "Daily habit"];
const RECITERS = ["Al-Afasy", "Al-Sudais", "Al-Ghamdi", "Al-Husary"];
const MINUTES = ["5 min", "10 min", "20 min", "30 min+"];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("goal");
  const [goal, setGoal] = useState<string | null>(null);
  const [reciter, setReciter] = useState<string | null>(null);
  const [minutes, setMinutes] = useState<string | null>(null);

  const idx = STEPS.indexOf(step);
  const progress = ((idx + 1) / STEPS.length) * 100;

  const next = () => setStep(STEPS[Math.min(idx + 1, STEPS.length - 1)]);
  const back = () => idx > 0 && setStep(STEPS[idx - 1]);

  const level: Level = "Beginner";

  const finish = () => {
    updateSession({
      onboarded: true,
      level,
      goal: goal ?? undefined,
      reciter: reciter ?? undefined,
      minutes: minutes ? parseInt(minutes) : undefined,
    });
    navigate({ to: "/home" });
  };

  return (
    <AppShell>
      <div className="flex h-full flex-col">
        {/* progress bar */}
        <div className="px-5 pt-2">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
            <button onClick={back} disabled={idx === 0} className="disabled:opacity-30">
              ‹ back
            </button>
            <span>
              {idx + 1} / {STEPS.length}
            </span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full bg-gradient-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-hidden px-6 pt-6">
          {step === "goal" && (
            <Pick
              kicker="Your intention"
              title="What brings you to Tajweed?"
              options={GOALS}
              value={goal}
              onPick={(v) => {
                setGoal(v);
                setTimeout(next, 200);
              }}
            />
          )}
          {step === "reciter" && (
            <Pick
              kicker="Your companion"
              title="Pick a reciter"
              options={RECITERS}
              value={reciter}
              onPick={(v) => {
                setReciter(v);
                setTimeout(next, 200);
              }}
            />
          )}
          {step === "minutes" && (
            <Pick
              kicker="Daily rhythm"
              title="How long each day?"
              options={MINUTES}
              value={minutes}
              onPick={(v) => {
                setMinutes(v);
                setTimeout(next, 200);
              }}
            />
          )}
          {step === "q1" && (
            <Quiz
              kicker="Quick check · 1 of 3"
              title={Q1.q}
              options={Q1.options}
              value={a1}
              onPick={(i) => {
                setA1(i);
                setTimeout(next, 250);
              }}
            />
          )}
          {step === "q2" && (
            <Quiz
              kicker="Quick check · 2 of 3"
              title={Q2.q}
              options={Q2.options}
              value={a2}
              onPick={(i) => {
                setA2(i);
                setTimeout(next, 250);
              }}
            />
          )}
          {step === "q3" && (
            <Quiz
              kicker="Quick check · 3 of 3"
              title={Q3.q}
              options={Q3.options}
              value={a3}
              onPick={(i) => {
                setA3(i);
                setTimeout(next, 250);
              }}
            />
          )}
          {step === "result" && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-gold shadow-gold">
                <span className="font-arabic text-2xl text-foreground">
                  {level === "Advanced" ? "★" : level === "Intermediate" ? "✦" : "✧"}
                </span>
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-emerald">
                Your level
              </p>
              <h2 className="font-serif text-3xl text-foreground">{level}</h2>
              <p className="mt-2 max-w-[260px] text-xs leading-relaxed text-muted-foreground">
                You scored {score}/3. We'll start your Tajweed path
                {level === "Beginner" ? " from the foundations." : level === "Intermediate" ? " with intermediate rules." : " with advanced refinements."}
              </p>
              <button
                onClick={finish}
                className="mt-6 w-full rounded-2xl bg-gradient-gold py-3 text-sm font-medium text-foreground shadow-gold"
              >
                Enter Noor →
              </button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Pick({
  kicker,
  title,
  options,
  value,
  onPick,
}: {
  kicker: string;
  title: string;
  options: string[];
  value: string | null;
  onPick: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-emerald">{kicker}</p>
      <h2 className="mt-1 font-serif text-2xl leading-tight text-foreground">{title}</h2>
      <div className="mt-5 space-y-2.5">
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              onClick={() => onPick(o)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-all ${
                active
                  ? "border-gold bg-gradient-gold text-foreground shadow-gold"
                  : "border-foreground/10 bg-surface text-foreground/80 hover:border-gold/50"
              }`}
            >
              <span>{o}</span>
              <span className={active ? "text-foreground" : "text-foreground/30"}>›</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Quiz({
  kicker,
  title,
  options,
  value,
  onPick,
}: {
  kicker: string;
  title: string;
  options: string[];
  value: number | null;
  onPick: (i: number) => void;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-gold-deep">{kicker}</p>
      <h2 className="mt-1 font-serif text-xl leading-tight text-foreground">{title}</h2>
      <div className="mt-5 space-y-2">
        {options.map((o, i) => {
          const active = value === i;
          return (
            <button
              key={o}
              onClick={() => onPick(i)}
              className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-all ${
                active
                  ? "border-emerald bg-emerald/10 text-foreground"
                  : "border-foreground/10 bg-surface text-foreground/80 hover:border-emerald/40"
              }`}
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-full border text-[10px] ${
                  active
                    ? "border-emerald bg-emerald text-background"
                    : "border-foreground/20 text-foreground/40"
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span>{o}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
