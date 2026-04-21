import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { getSession, clearSession, type Session } from "@/lib/auth";
import { TAJWEED_RULES } from "@/lib/tajweed-data";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — Tajweed" },
      { name: "description", content: "Your daily Tajweed dashboard." },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const s = getSession();
      if (!s) throw redirect({ to: "/signin" });
      if (!s.onboarded) throw redirect({ to: "/onboarding" });
    }
  },
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [session, setSessionState] = useState<Session | null>(null);

  useEffect(() => {
    setSessionState(getSession());
    const onChange = () => setSessionState(getSession());
    window.addEventListener("noor.session", onChange);
    return () => window.removeEventListener("noor.session", onChange);
  }, []);

  if (!session) return null;

  const completed = session.completedRules?.length ?? 0;
  const total = TAJWEED_RULES.length;

  const cards = [
    {
      id: "tajweed",
      title: "Tajweed lessons",
      meta: `${completed}/${total} rules`,
      icon: "ﺗ",
      tone: "gold",
      to: "/tajweed" as const,
    },
    {
      id: "quran",
      title: "Quran library",
      meta: "114 surahs",
      icon: "ﻕ",
      tone: "emerald",
      to: "/quran" as const,
    },
    {
      id: "memorization",
      title: "Memorization techniques",
      meta: "Hifz companion",
      icon: "✦",
      tone: "cream",
      to: "/memorization" as const,
    },
    {
      id: "progress",
      title: "Progress",
      meta: `Level · ${session.level ?? "Beginner"}`,
      icon: "★",
      tone: "ink",
      to: "/home" as const,
    },
  ];

  return (
    <AppShell>
      <div className="flex h-full flex-col arabesque">
        {/* Top bar */}
        <div className="flex items-start justify-between px-5 pt-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Assalamu alaikum
            </p>
            <h1 className="font-serif text-2xl text-foreground capitalize">{session.name}</h1>
          </div>
          <button
            onClick={() => {
              clearSession();
              navigate({ to: "/signin" });
            }}
            className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-foreground/60 text-xs"
            aria-label="Sign out"
          >
            ⎋
          </button>
        </div>

        {/* Hero verse */}
        <div className="px-5 pt-3">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-emerald p-4 shadow-elevated">
            <div className="absolute -right-2 -top-2 font-arabic text-[5rem] leading-none text-gold/20 select-none">
              ﷽
            </div>
            <p className="text-[10px] uppercase tracking-widest text-gold-light/80">Today's verse</p>
            <p className="mt-2 font-arabic text-xl leading-relaxed text-background text-right">
              فَٱذْكُرُونِىٓ أَذْكُرْكُمْ
            </p>
            <p className="mt-1 text-[11px] italic text-background/70">
              "Remember Me, I will remember you." — 2:152
            </p>
            <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-3 py-1 text-[10px] font-medium text-foreground shadow-gold">
              Recite ▸
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="flex-1 overflow-hidden px-5 pt-4 pb-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Continue your journey
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2.5">
            {cards.map((c) => (
              <Link
                key={c.id}
                to={c.to}
                className="group relative overflow-hidden rounded-2xl border border-foreground/5 bg-surface p-3 shadow-soft transition-all hover:shadow-elevated hover:-translate-y-0.5"
              >
                <ToneAccent tone={c.tone} />
                <div className="relative">
                  <div
                    className={`grid h-9 w-9 place-items-center rounded-xl font-arabic text-base ${
                      c.tone === "gold"
                        ? "bg-gradient-gold text-foreground shadow-gold"
                        : c.tone === "emerald"
                        ? "bg-gradient-emerald text-background"
                        : c.tone === "ink"
                        ? "bg-foreground text-background"
                        : "bg-gradient-cream text-emerald-deep border border-gold/30"
                    }`}
                  >
                    {c.icon}
                  </div>
                  <p className="mt-3 font-serif text-base leading-tight text-foreground">
                    {c.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{c.meta}</p>
                  <span className="absolute right-0 bottom-0 text-foreground/30">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ToneAccent({ tone }: { tone: string }) {
  return (
    <div
      className={`pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full opacity-10 ${
        tone === "gold"
          ? "bg-gradient-gold"
          : tone === "emerald"
          ? "bg-gradient-emerald"
          : tone === "ink"
          ? "bg-foreground"
          : "bg-gold"
      }`}
    />
  );
}
