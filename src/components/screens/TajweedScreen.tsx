import { ScreenHeader, BottomNav } from "./shared";

export function TajweedScreen({ showModal = true }: { showModal?: boolean }) {
  return (
    <div className="h-full flex flex-col arabesque relative">
      <ScreenHeader title="Tajweed" back />

      <div className="px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-gold p-4 shadow-gold flex items-center gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-foreground/70">Hafs An-Asim</p>
            <p className="font-serif text-2xl text-foreground mt-0.5">Level 3</p>
            <button className="mt-2 inline-flex items-center gap-2 rounded-full bg-foreground/90 text-background px-3 py-1 text-[10px]">
              Continue →
            </button>
          </div>
          <div className="ml-auto font-arabic text-[3rem] leading-none text-foreground/30">
            ﷲ
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-5 mt-4 space-y-2.5 pb-24">
        {[
          { name: "Al-Qalqalah", meta: "Bouncing letters", icon: "ق" },
          { name: "Al-Idgham", meta: "Merging of letters", icon: "د" },
          { name: "Al-Ikhfa", meta: "Concealment", icon: "خ" },
          { name: "Madd", meta: "Prolongation rules", icon: "م" },
        ].map((l) => (
          <div
            key={l.name}
            className="flex items-center gap-3 rounded-2xl bg-surface/80 border border-foreground/5 p-3"
          >
            <div className="h-10 w-10 grid place-items-center rounded-xl bg-gradient-emerald text-background font-arabic text-lg">
              {l.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium">{l.name}</p>
              <p className="text-[10px] text-muted-foreground">{l.meta}</p>
            </div>
            <span className="text-foreground/40">›</span>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="absolute inset-0 z-40 flex items-center justify-center px-6 bg-foreground/40 backdrop-blur-sm">
          <div className="w-full rounded-3xl bg-surface shadow-elevated p-5 border border-gold/30">
            <div className="flex items-center justify-between">
              <p className="font-serif text-lg text-foreground">Al-Qalqalah</p>
              <span className="text-foreground/40 text-sm">✕</span>
            </div>
            <div className="mt-2 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="mt-3 text-[11px] uppercase tracking-widest text-emerald text-center">
              What is Qalqalah?
            </p>
            <p className="mt-2 text-xs leading-relaxed text-foreground/80 text-center">
              Qalqalah means <em>"echo"</em> or <em>"reverberation"</em> in Arabic. It occurs when
              one of the five Qalqalah letters{" "}
              <span className="font-arabic text-emerald">(ق ط ب ج د)</span> appears with sukoon —
              creating a subtle bouncing clarity in recitation.
            </p>
            <button className="mt-4 w-full rounded-full bg-gradient-gold py-2.5 text-xs font-medium text-foreground shadow-gold">
              Preview →
            </button>
          </div>
        </div>
      )}

      <BottomNav active="explore" />
    </div>
  );
}
