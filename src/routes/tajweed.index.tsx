import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { getSession, type Session } from "@/lib/auth";
import { TAJWEED_RULES } from "@/lib/tajweed-data";

export const Route = createFileRoute("/tajweed/")({
  head: () => ({
    meta: [
      { title: "Tajweed lessons" },
      { name: "description", content: "Learn the rules of Tajweed step by step." },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const s = getSession();
      if (!s) throw redirect({ to: "/signin" });
      if (!s.onboarded) throw redirect({ to: "/onboarding" });
    }
  },
  component: TajweedList,
});

function TajweedList() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(getSession());
    const onChange = () => setSession(getSession());
    window.addEventListener("noor.session", onChange);
    return () => window.removeEventListener("noor.session", onChange);
  }, []);

  const completed = new Set(session?.completedRules ?? []);
  const completedCount = completed.size;
  const total = TAJWEED_RULES.length;
  const next = TAJWEED_RULES.find((r) => !completed.has(r.id)) ?? TAJWEED_RULES[0];

  return (
    <AppShell>
      <div className="flex h-full flex-col arabesque">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-3">
          <Link
            to="/home"
            className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-foreground/70 text-sm"
          >
            ‹
          </Link>
          <h1 className="font-serif text-xl text-foreground">Tajweed</h1>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-foreground/40 text-sm">
            ⌕
          </div>
        </div>

        {/* Continue card */}
        <div className="px-5 pt-3">
          <Link
            to="/tajweed/$ruleId"
            params={{ ruleId: next.id }}
            className="relative block overflow-hidden rounded-3xl bg-gradient-gold p-4 shadow-gold"
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-foreground/70">
                  {completedCount === 0 ? "Start here" : "Continue"}
                </p>
                <p className="mt-0.5 font-serif text-2xl text-foreground">{next.name}</p>
                <p className="mt-0.5 text-[11px] text-foreground/70">{next.meta}</p>
                <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-foreground/90 px-3 py-1 text-[10px] text-background">
                  Begin lesson →
                </span>
              </div>
              <div className="ml-auto font-arabic text-[3.5rem] leading-none text-foreground/30">
                {next.arabic.charAt(0)}
              </div>
            </div>
          </Link>
        </div>

        {/* Progress */}
        <div className="px-5 pt-3">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>Your progress</span>
            <span>
              {completedCount} / {total}
            </span>
          </div>
          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full bg-gradient-emerald transition-all duration-500"
              style={{ width: `${(completedCount / total) * 100}%` }}
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-5 space-y-2">
          {TAJWEED_RULES.map((r, i) => {
            const done = completed.has(r.id);
            return (
              <Link
                key={r.id}
                to="/tajweed/$ruleId"
                params={{ ruleId: r.id }}
                className="flex items-center gap-3 rounded-2xl border border-foreground/5 bg-surface/80 p-3 transition-all hover:border-gold/40"
              >
                <div
                  className={`grid h-10 w-10 place-items-center rounded-xl font-arabic text-lg ${
                    done
                      ? "bg-gradient-emerald text-background"
                      : "bg-gradient-cream text-emerald-deep border border-gold/30"
                  }`}
                >
                  {r.arabic.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {String(i + 1).padStart(2, "0")} · {r.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">{r.meta}</p>
                </div>
                {done ? (
                  <span className="text-[10px] text-emerald font-medium">✓ done</span>
                ) : (
                  <span className="text-foreground/40">›</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
