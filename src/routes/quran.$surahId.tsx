import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { getSession } from "@/lib/auth";

const SURAHS: Record<
  string,
  { name: string; translation: string; meta: string; bismillah?: boolean; verses: { ar: string; en: string }[] }
> = {
  "1": {
    name: "Al-Fatiha",
    translation: "The Opening",
    meta: "Meccan · 7 Verses",
    verses: [
      { ar: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ", en: "All praise is due to Allah, Lord of the worlds." },
      { ar: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", en: "The Most Compassionate, the Most Merciful." },
    ],
  },
  "2": {
    name: "Al-Baqarah",
    translation: "The Cow",
    meta: "Medinan · 286 Verses",
    verses: [
      { ar: "الٓمٓ", en: "Alif, Lam, Mim." },
      { ar: "ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ", en: "This is the Book about which there is no doubt, a guidance for the conscious." },
    ],
  },
  "3": {
    name: "Aal-Imran",
    translation: "Family of Imran",
    meta: "Medinan · 200 Verses",
    verses: [
      { ar: "الٓمٓ", en: "Alif, Lam, Mim." },
      { ar: "ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ", en: "Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence." },
    ],
  },
  "4": {
    name: "An-Nisa",
    translation: "The Women",
    meta: "Medinan · 176 Verses",
    verses: [
      { ar: "يَـٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ", en: "O mankind, fear your Lord." },
      { ar: "وَءَاتُوا۟ ٱلْيَتَـٰمَىٰٓ أَمْوَٰلَهُمْ", en: "And give to the orphans their properties." },
    ],
  },
};

export const Route = createFileRoute("/quran/$surahId")({
  head: () => ({
    meta: [
      { title: "Surah — Tajweed" },
      { name: "description", content: "Read and listen to a surah of the Qur'an." },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const s = getSession();
      if (!s) throw redirect({ to: "/signin" });
      if (!s.onboarded) throw redirect({ to: "/onboarding" });
    }
  },
  component: SurahPage,
});

function SurahPage() {
  const { surahId } = Route.useParams();
  const surah = SURAHS[surahId] ?? SURAHS["1"];

  return (
    <AppShell>
      <div className="flex h-full flex-col arabesque">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-3">
          <Link
            to="/quran"
            className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-foreground/70 text-sm"
          >
            ‹
          </Link>
          <h2 className="font-serif text-xl text-foreground">{surah.name}</h2>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-foreground/60 text-xs">
            ⇅
          </span>
        </div>

        {/* Surah hero */}
        <div className="px-5 pt-4">
          <div className="relative rounded-3xl bg-gradient-gold p-5 text-center shadow-gold overflow-hidden">
            <p className="font-serif text-3xl text-foreground">{surah.name}</p>
            <p className="text-[11px] text-foreground/70 mt-0.5 italic">{surah.translation}</p>
            <p className="mt-2 inline-block rounded-full bg-foreground/10 px-3 py-0.5 text-[10px] tracking-widest uppercase text-foreground/80">
              {surah.meta}
            </p>
            <p className="mt-3 font-arabic text-2xl text-foreground">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        </div>

        {/* Verses */}
        <div className="flex-1 overflow-y-auto mt-4 px-5 pb-6 space-y-3">
          {surah.verses.map((v, i) => (
            <div key={i} className="rounded-2xl bg-surface/80 border border-foreground/5 p-3">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 grid place-items-center rounded-full bg-emerald text-background text-[10px] font-medium">
                  {i + 1}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-foreground/5 overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-gold" />
                </div>
                <span className="text-[10px] text-muted-foreground tabular-nums">0:24</span>
                <span className="text-emerald">▶</span>
              </div>
              <p className="mt-3 font-arabic text-xl text-right text-foreground">{v.ar}</p>
              <p className="mt-1 text-xs text-muted-foreground italic text-center">"{v.en}"</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
