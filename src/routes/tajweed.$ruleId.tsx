import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { getSession, updateSession } from "@/lib/auth";
import { TAJWEED_RULES } from "@/lib/tajweed-data";

export const Route = createFileRoute("/tajweed/$ruleId")({
  head: ({ params }) => {
    const rule = TAJWEED_RULES.find((r) => r.id === params.ruleId);
    return {
      meta: [
        { title: rule ? `${rule.name} — Tajweed` : "Lesson — Tajweed" },
        {
          name: "description",
          content: rule ? rule.definition : "Learn a Tajweed rule.",
        },
      ],
    };
  },
  beforeLoad: (({ params }: { params: { ruleId: string } }) => {
    if (typeof window === "undefined") return;
    const s = getSession();
    if (!s) throw redirect({ to: "/signin" });
    if (!s.onboarded) throw redirect({ to: "/onboarding" });
    const exists = TAJWEED_RULES.some((r) => r.id === params.ruleId);
    if (!exists) throw redirect({ to: "/tajweed" });
    // Ghunnah lesson goes straight to the live practice screen
    if (params.ruleId === "ghunnah") {
      throw redirect({ to: "/tajweed/ghunnah/practice" });
    }
  }) as never,
  notFoundComponent: () => (
    <AppShell>
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="font-serif text-2xl text-foreground">Lesson not found</p>
        <Link
          to="/tajweed"
          className="mt-3 rounded-full bg-gradient-gold px-4 py-2 text-xs font-medium text-foreground shadow-gold"
        >
          ← All lessons
        </Link>
      </div>
    </AppShell>
  ),
  component: Lesson,
});

type Stage = "intro" | "explain" | "example" | "complete";
const STAGES: Stage[] = ["intro", "explain", "example", "complete"];

function Lesson() {
  const { ruleId } = Route.useParams();
  const navigate = useNavigate();
  const rule = TAJWEED_RULES.find((r) => r.id === ruleId)!;
  const ruleIdx = TAJWEED_RULES.findIndex((r) => r.id === ruleId);
  const nextRule = TAJWEED_RULES[ruleIdx + 1];

  const [stage, setStage] = useState<Stage>("intro");
  const idx = STAGES.indexOf(stage);
  const progress = ((idx + 1) / STAGES.length) * 100;

  useEffect(() => {
    setStage("intro");
  }, [ruleId]);

  const advance = () => {
    if (idx < STAGES.length - 1) setStage(STAGES[idx + 1]);
  };

  const markCompleteAndContinue = () => {
    if (rule.id === "ghunnah") {
      navigate({ to: "/tajweed/ghunnah/practice" });
      return;
    }
    const s = getSession();
    if (s) {
      const set = new Set(s.completedRules ?? []);
      set.add(rule.id);
      updateSession({ completedRules: Array.from(set) });
    }
    if (nextRule) {
      navigate({ to: "/tajweed/$ruleId", params: { ruleId: nextRule.id } });
    } else {
      navigate({ to: "/tajweed" });
    }
  };

  return (
    <AppShell>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="px-5 pt-3">
          <div className="flex items-center justify-between">
            <Link
              to="/tajweed"
              className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-foreground/70 text-sm"
            >
              ‹
            </Link>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Lesson {ruleIdx + 1} of {TAJWEED_RULES.length}
            </p>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-foreground/40 text-xs">
              ♪
            </div>
          </div>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full bg-gradient-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pt-5 pb-4">
          {stage === "intro" && (
            <Stage
              kicker="Introducing"
              titleEn={rule.name}
              titleAr={rule.arabic}
              body={rule.meta}
              accent="gold"
            >
              {rule.letters && (
                <div className="mt-4 rounded-2xl border border-gold/30 bg-gradient-cream p-3 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Letters
                  </p>
                  <p className="mt-1 font-arabic text-2xl text-emerald-deep">{rule.letters}</p>
                </div>
              )}
            </Stage>
          )}

          {stage === "explain" && (
            <Stage kicker="What it means" titleEn="Definition" body={rule.definition} accent="emerald">
              <div className="mt-3 rounded-2xl bg-surface border border-foreground/5 p-3">
                <p className="text-[10px] uppercase tracking-widest text-gold-deep">How to recite</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/80">{rule.howTo}</p>
              </div>
            </Stage>
          )}

          {stage === "example" && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-emerald">Example</p>
              <h2 className="mt-1 font-serif text-2xl text-foreground">From the Qur'an</h2>
              <div className="mt-4 rounded-3xl bg-gradient-emerald p-5 text-center shadow-elevated">
                <p className="font-arabic text-3xl leading-relaxed text-background">
                  {rule.example.arabic}
                </p>
                <p className="mt-3 text-[11px] italic text-gold-light">
                  {rule.example.translit}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-background/60">
                  {rule.example.surah}
                </p>
                <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-1.5 text-[11px] font-medium text-foreground shadow-gold">
                  ▶ Play recitation
                </button>
              </div>
              <div className="mt-3 rounded-2xl border border-gold/30 bg-gradient-cream p-3">
                <p className="text-[10px] uppercase tracking-widest text-gold-deep">✦ Tip</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/80">{rule.tip}</p>
              </div>
            </div>
          )}

          {stage === "complete" && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-gold shadow-gold">
                <span className="text-2xl text-foreground">✓</span>
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-emerald">
                Lesson complete
              </p>
              <h2 className="font-serif text-3xl text-foreground">{rule.name}</h2>
              <p className="mt-2 max-w-[260px] text-xs leading-relaxed text-muted-foreground">
                Beautifully done. Practice this rule in your next recitation to make it second nature.
              </p>
              {nextRule ? (
                <p className="mt-4 text-[11px] text-foreground/60">
                  Up next · <span className="text-emerald font-medium">{nextRule.name}</span>
                </p>
              ) : (
                <p className="mt-4 text-[11px] text-foreground/60">You've finished every rule. ★</p>
              )}
            </div>
          )}
        </div>

        {/* Footer action */}
        <div className="px-5 pb-4">
          {stage !== "complete" ? (
            <button
              onClick={advance}
              className="w-full rounded-2xl bg-gradient-gold py-3 text-sm font-medium text-foreground shadow-gold transition-transform active:scale-[0.98]"
            >
              {stage === "intro" ? "Continue →" : stage === "explain" ? "See example →" : "Mark complete →"}
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/tajweed"
                className="rounded-2xl border border-foreground/10 bg-surface py-3 text-center text-xs font-medium text-foreground/80"
              >
                All lessons
              </Link>
              <button
                onClick={markCompleteAndContinue}
                className="rounded-2xl bg-gradient-emerald py-3 text-xs font-medium text-background shadow-elevated"
              >
                {nextRule ? "Next lesson →" : "Finish"}
              </button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Stage({
  kicker,
  titleEn,
  titleAr,
  body,
  accent,
  children,
}: {
  kicker: string;
  titleEn: string;
  titleAr?: string;
  body: string;
  accent: "gold" | "emerald";
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p
        className={`text-[10px] uppercase tracking-widest ${
          accent === "gold" ? "text-gold-deep" : "text-emerald"
        }`}
      >
        {kicker}
      </p>
      <h2 className="mt-1 font-serif text-3xl text-foreground">{titleEn}</h2>
      {titleAr && (
        <p className="mt-1 font-arabic text-2xl text-emerald-deep">{titleAr}</p>
      )}
      <p className="mt-3 text-xs leading-relaxed text-foreground/80">{body}</p>
      {children}
    </div>
  );
}
