import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { getSession } from "@/lib/auth";

export const Route = createFileRoute("/quran/")({
  head: () => ({
    meta: [
      { title: "Qur'an library — Tajweed" },
      { name: "description", content: "Browse the 114 surahs of the Qur'an." },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const s = getSession();
      if (!s) throw redirect({ to: "/signin" });
      if (!s.onboarded) throw redirect({ to: "/onboarding" });
    }
  },
  component: QuranLibrary,
});

const SURAHS = [
  { n: 1, name: "Al-Fatiha", meta: "Meccan · 7 Verses", ar: "الفاتحة" },
  { n: 2, name: "Al-Baqarah", meta: "Medinan · 286 Verses", ar: "البقرة" },
  { n: 3, name: "Aal-Imran", meta: "Medinan · 200 Verses", ar: "آل عمران" },
  { n: 4, name: "An-Nisa", meta: "Medinan · 176 Verses", ar: "النساء" },
  { n: 5, name: "Al-Maidah", meta: "Medinan · 120 Verses", ar: "المائدة" },
  { n: 6, name: "Al-An'am", meta: "Meccan · 165 Verses", ar: "الأنعام" },
  { n: 7, name: "Al-A'raf", meta: "Meccan · 206 Verses", ar: "الأعراف" },
  { n: 8, name: "Al-Anfal", meta: "Medinan · 75 Verses", ar: "الأنفال" },
  { n: 9, name: "At-Tawbah", meta: "Medinan · 129 Verses", ar: "التوبة" },
  { n: 10, name: "Yunus", meta: "Meccan · 109 Verses", ar: "يونس" },
];

function QuranLibrary() {
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
          <h2 className="font-serif text-xl text-foreground">Qur'an</h2>
          <div className="flex gap-2 text-foreground/60">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-xs">⌕</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-xs">♪</span>
          </div>
        </div>

        {/* Last read */}
        <div className="px-5 pt-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-gold p-4 shadow-gold">
            <div className="relative z-10 text-center">
              <p className="text-[10px] uppercase tracking-widest text-foreground/70">
                Last read
              </p>
              <p className="mt-1 font-serif text-2xl text-foreground">Al-Fatiha</p>
              <p className="text-xs text-foreground/70">Ayah 1 of 7</p>
              <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-foreground/90 text-background px-4 py-1.5 text-[11px]">
                Continue →
              </button>
            </div>
            <div className="absolute -right-2 -bottom-2 font-arabic text-[5rem] leading-none text-foreground/15 select-none">
              ﷽
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-5 mt-5 flex gap-5 text-xs">
          {["Surah", "Para", "Page", "Hizb"].map((t, i) => (
            <span
              key={t}
              className={`pb-2 ${
                i === 0
                  ? "text-emerald border-b-2 border-emerald font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto mt-2 px-5 pb-5">
          <div className="space-y-2">
            {SURAHS.map((s) => (
              <Link
                key={s.n}
                to="/quran/$surahId"
                params={{ surahId: String(s.n) }}
                className="flex items-center gap-3 rounded-2xl bg-surface/70 px-3 py-2.5 border border-foreground/5 hover:bg-surface transition-colors"
              >
                <div className="relative h-9 w-9 grid place-items-center">
                  <svg viewBox="0 0 40 40" className="absolute inset-0">
                    <polygon
                      points="20,2 25,10 35,10 28,18 32,28 20,23 8,28 12,18 5,10 15,10"
                      fill="none"
                      stroke="oklch(0.72 0.14 75)"
                      strokeWidth="1"
                    />
                  </svg>
                  <span className="text-[11px] font-serif text-emerald-deep">{s.n}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium truncate">{s.name}</p>
                  <p className="text-[10px] text-muted-foreground">{s.meta}</p>
                </div>
                <span className="font-arabic text-lg text-emerald-deep">{s.ar}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
