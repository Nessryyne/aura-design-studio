import { ScreenHeader, BottomNav } from "./shared";

const surahs = [
  { n: 1, name: "Al-Fatiha", meta: "Meccan · 7 Verses", ar: "الفاتحة" },
  { n: 2, name: "Al-Baqarah", meta: "Medinan · 286 Verses", ar: "البقرة" },
  { n: 3, name: "Aal-Imran", meta: "Medinan · 200 Verses", ar: "آل عمران" },
  { n: 4, name: "An-Nisa", meta: "Medinan · 176 Verses", ar: "النساء" },
  { n: 5, name: "Al-Maidah", meta: "Medinan · 120 Verses", ar: "المائدة" },
  { n: 6, name: "Al-An'am", meta: "Meccan · 165 Verses", ar: "الأنعام" },
];

export function QuranScreen() {
  return (
    <div className="h-full flex flex-col arabesque">
      <ScreenHeader title="Qur'an" back />
      <div className="px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-gold p-4 shadow-gold">
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-widest text-foreground/70">Last read</p>
            <p className="font-serif text-2xl text-foreground mt-1">Al-Fatiha</p>
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

      <div className="px-5 mt-5 flex gap-5 text-xs">
        {["Surah", "Para", "Page", "Hizb"].map((t, i) => (
          <span
            key={t}
            className={`pb-2 ${i === 0 ? "text-emerald border-b-2 border-emerald font-medium" : "text-muted-foreground"}`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex-1 overflow-hidden mt-2 px-5 pb-24">
        <div className="space-y-2">
          {surahs.map((s) => (
            <div
              key={s.n}
              className="flex items-center gap-3 rounded-2xl bg-surface/70 px-3 py-2.5 border border-foreground/5"
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
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
