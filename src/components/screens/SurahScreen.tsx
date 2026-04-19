import { ScreenHeader, BottomNav } from "./shared";

export function SurahScreen() {
  return (
    <div className="h-full flex flex-col arabesque">
      <ScreenHeader title="Al-Fatiha" back actions={<span className="text-foreground/50">⇅</span>} />

      <div className="px-5">
        <div className="relative rounded-3xl bg-gradient-gold p-5 text-center shadow-gold overflow-hidden">
          <p className="font-serif text-3xl text-foreground">Al-Fatiha</p>
          <p className="text-[11px] text-foreground/70 mt-0.5 italic">The Opening</p>
          <p className="mt-2 inline-block rounded-full bg-foreground/10 px-3 py-0.5 text-[10px] tracking-widest uppercase text-foreground/80">
            Meccan · 7 Verses
          </p>
          <p className="mt-3 font-arabic text-2xl text-foreground">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden mt-4 px-5 pb-24 space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl bg-surface/80 border border-foreground/5 p-3">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 grid place-items-center rounded-full bg-emerald text-background text-[10px] font-medium">
                {i}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-foreground/5 overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-gold" />
              </div>
              <span className="text-[10px] text-muted-foreground tabular-nums">0:24</span>
              <span className="text-emerald">▶</span>
            </div>
            <div className="mt-2 flex justify-center gap-1">
              {Array.from({ length: 7 }).map((_, k) => (
                <span
                  key={k}
                  className={`h-1.5 w-1.5 rounded-full ${k < 4 ? "bg-gold" : "bg-foreground/15"}`}
                />
              ))}
            </div>
            <p className="mt-3 font-arabic text-xl text-right text-foreground">
              ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ
            </p>
            <p className="mt-1 text-xs text-muted-foreground italic text-center">
              "All praise is due to Allah, Lord of the worlds."
            </p>
          </div>
        ))}
      </div>

      <BottomNav active="play" />
    </div>
  );
}
