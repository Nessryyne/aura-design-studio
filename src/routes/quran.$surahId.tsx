import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { getSession } from "@/lib/auth";
import mushafAalImran from "@/assets/mushaf-aal-imran.png";

const SURAHS: Record<
  string,
  { name: string; translation: string; meta: string; pageImage?: string }
> = {
  "1": { name: "Al-Fatiha", translation: "The Opening", meta: "Meccan · 7 Verses" },
  "2": { name: "Al-Baqarah", translation: "The Cow", meta: "Medinan · 286 Verses" },
  "3": {
    name: "Aal-Imran",
    translation: "Family of Imran",
    meta: "Medinan · 200 Verses",
    pageImage: mushafAalImran,
  },
  "4": { name: "An-Nisa", translation: "The Women", meta: "Medinan · 176 Verses" },
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
  const pageImage = surah.pageImage ?? mushafAalImran;

  const [showChoice, setShowChoice] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const choose = (mode: string) => {
    setSelected(mode);
    setTimeout(() => setShowChoice(false), 600);
  };

  return (
    <AppShell>
      <div className="relative flex h-full flex-col bg-[oklch(0.96_0.03_85)]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 bg-background/80 backdrop-blur z-10">
          <Link
            to="/quran"
            className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-foreground/70 text-sm"
          >
            ‹
          </Link>
          <div className="text-center">
            <p className="font-serif text-base text-foreground">{surah.name}</p>
            <p className="text-[10px] text-muted-foreground">{surah.meta}</p>
          </div>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-foreground/60 text-xs">
            ⇅
          </span>
        </div>

        {/* Mushaf page — full */}
        <div className="flex-1 overflow-y-auto pb-28">
          <img
            src={pageImage}
            alt={`${surah.name} mushaf page`}
            className="w-full h-auto block"
          />
        </div>

        {/* Bottom record bar */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="rounded-3xl bg-surface/95 backdrop-blur border border-foreground/10 shadow-elevated px-5 py-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Recite this page
              </p>
              <p className="text-[11px] text-foreground/70">Tap to start a test</p>
            </div>
            <button
              onClick={() => {
                setSelected(null);
                setShowChoice(true);
              }}
              className="grid h-12 w-12 place-items-center rounded-full bg-gradient-emerald text-background shadow-elevated active:scale-95 transition-transform"
              aria-label="Start recitation test"
            >
              <span className="text-lg">●</span>
            </button>
          </div>
        </div>

        {/* Choice modal */}
        {showChoice && (
          <div className="absolute inset-0 z-20 flex items-end justify-center bg-foreground/40 backdrop-blur-sm">
            <div className="w-full rounded-t-3xl bg-surface border-t border-gold/30 shadow-elevated px-5 pt-5 pb-7">
              <div className="mx-auto h-1 w-10 rounded-full bg-foreground/20" />
              <p className="mt-4 text-[10px] uppercase tracking-widest text-emerald text-center">
                Choose a test
              </p>
              <h3 className="mt-1 font-serif text-xl text-foreground text-center">
                What should we test?
              </h3>
              <div className="mt-5 space-y-2.5">
                <button
                  onClick={() => choose("memorization")}
                  className={`w-full rounded-2xl border px-4 py-3.5 text-left transition-all ${
                    selected === "memorization"
                      ? "border-gold bg-gradient-gold text-foreground shadow-gold"
                      : "border-foreground/10 bg-surface-2 text-foreground/80"
                  }`}
                >
                  <p className="text-sm font-medium">Test memorization</p>
                  <p className="text-[11px] opacity-70 mt-0.5">
                    We listen to your hifz of this page.
                  </p>
                </button>
                <button
                  onClick={() => choose("memorization-tajweed")}
                  className={`w-full rounded-2xl border px-4 py-3.5 text-left transition-all ${
                    selected === "memorization-tajweed"
                      ? "border-gold bg-gradient-gold text-foreground shadow-gold"
                      : "border-foreground/10 bg-surface-2 text-foreground/80"
                  }`}
                >
                  <p className="text-sm font-medium">Test memorization & Tajweed</p>
                  <p className="text-[11px] opacity-70 mt-0.5">
                    We check both your hifz and Tajweed rules.
                  </p>
                </button>
              </div>
              <button
                onClick={() => setShowChoice(false)}
                className="mt-4 w-full text-center text-[11px] uppercase tracking-widest text-muted-foreground py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
