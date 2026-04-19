import { ScreenHeader, BottomNav } from "./shared";

export function AchievementsScreen() {
  return (
    <div className="h-full flex flex-col arabesque">
      <ScreenHeader title="Progress" back />

      <div className="px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-gold p-4 shadow-gold flex items-center gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-foreground/70">As-salāmu ʿalaykum</p>
            <p className="font-serif text-xl text-foreground mt-0.5">Yassine</p>
            <p className="text-[11px] text-foreground/70">3 milestones unlocked</p>
            <button className="mt-2 inline-flex items-center gap-2 rounded-full bg-foreground/90 text-background px-3 py-1 text-[10px]">
              Continue →
            </button>
          </div>
          <div className="ml-auto text-4xl">🏆</div>
        </div>
      </div>

      <div className="px-5 mt-5 grid grid-cols-3 gap-3">
        {[
          { t: "Hifz Al-Baqara", s: "★★★★★" },
          { t: "Quran Completion", s: "★★☆☆☆" },
          { t: "Tajweed Master", s: "★★★☆☆" },
        ].map((a) => (
          <div
            key={a.t}
            className="rounded-2xl bg-surface/80 border border-foreground/5 p-3 text-center shadow-soft"
          >
            <div className="mx-auto h-12 w-12 rounded-full bg-gradient-gold grid place-items-center shadow-gold">
              <span className="text-base">✦</span>
            </div>
            <p className="mt-2 text-[10px] font-medium text-foreground leading-tight">{a.t}</p>
            <p className="mt-0.5 text-[8px] text-gold-deep tracking-widest">{a.s}</p>
          </div>
        ))}
      </div>

      <div className="px-5 mt-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">Your next goals</p>
          <span className="text-[10px] text-emerald">See all</span>
        </div>
        <div className="mt-2 space-y-2 pb-24">
          {[
            { t: "10 days streak", s: "Open daily · 6 of 10", p: 60 },
            { t: "Qur'an Hifz", s: "Completed 30%", p: 30 },
            { t: "Level 3 Tajweed", s: "Completed 60%", p: 60 },
          ].map((g) => (
            <div
              key={g.t}
              className="rounded-2xl bg-surface/80 border border-foreground/5 p-3 flex items-center gap-3"
            >
              <div className="relative h-10 w-10 grid place-items-center">
                <svg viewBox="0 0 40 40" className="absolute inset-0">
                  <polygon
                    points="20,2 25,10 35,10 28,18 32,28 20,23 8,28 12,18 5,10 15,10"
                    fill="oklch(0.97 0.02 85)"
                    stroke="oklch(0.72 0.14 75)"
                    strokeWidth="1"
                  />
                </svg>
                <span className="relative text-xs text-emerald-deep">✦</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">{g.t}</p>
                <p className="text-[10px] text-muted-foreground">{g.s}</p>
                <div className="mt-1 h-1 rounded-full bg-foreground/5 overflow-hidden">
                  <div className="h-full bg-gradient-gold" style={{ width: `${g.p}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="me" />
    </div>
  );
}
