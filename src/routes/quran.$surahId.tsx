import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
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
  ssr: false,
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
    setTimeout(() => setShowChoice(false), 500);
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-[oklch(0.96_0.03_85)]">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-background/85 backdrop-blur border-b border-foreground/5">
        <Link
          to="/quran"
          className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-foreground/70"
          aria-label="Back to Qur'an library"
        >
          ‹
        </Link>
        <div className="text-center">
          <p className="font-serif text-base text-foreground leading-tight">{surah.name}</p>
          <p className="text-[10px] text-muted-foreground">{surah.meta}</p>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-foreground/60 text-xs">
          ⇅
        </span>
      </header>

      {/* Mushaf page — full width, full bleed */}
      <section
        className={`flex-1 w-full ${showChoice ? "overflow-hidden" : "overflow-y-auto"}`}
        style={{ paddingBottom: showChoice ? 0 : "7rem" }}
      >
        <img
          src={pageImage}
          alt={`${surah.name} mushaf page`}
          className="block w-full h-auto select-none"
          draggable={false}
        />
      </section>

      {/* Floating record button (hidden while sheet is open) */}
      {!showChoice && (
        <div className="fixed bottom-0 left-0 right-0 z-20 px-4 pb-4 pointer-events-none">
          <div className="pointer-events-auto mx-auto max-w-md rounded-3xl bg-surface/95 backdrop-blur border border-foreground/10 shadow-elevated px-5 py-3 flex items-center justify-between">
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
      )}

      {/* Choice bottom sheet — solid, doesn't overlay the text */}
      {showChoice && (
        <div
          className="fixed inset-0 z-30 flex items-end justify-center bg-foreground/50 backdrop-blur-sm"
          onClick={() => setShowChoice(false)}
        >
          <div
            className="w-full max-w-md rounded-t-3xl bg-surface border-t border-gold/30 shadow-elevated px-5 pt-4 pb-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-foreground/20" />
            <p className="mt-4 text-[10px] uppercase tracking-widest text-emerald text-center">
              Choose a test
            </p>
            <h3 className="mt-1 font-serif text-xl text-foreground text-center">
              What should we test?
            </h3>
            <div className="mt-5 space-y-2.5">
              {[
                {
                  id: "memorization",
                  title: "Test memorization",
                  desc: "We listen to your hifz of this page.",
                },
                {
                  id: "tajweed",
                  title: "Test tajweed",
                  desc: "We check your pronunciation and rules.",
                },
                {
                  id: "memorization-tajweed",
                  title: "Test memorization & Tajweed",
                  desc: "We check both your hifz and Tajweed rules.",
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => choose(opt.id)}
                  className={`w-full rounded-2xl border px-4 py-3.5 text-left transition-all ${
                    selected === opt.id
                      ? "border-gold bg-gradient-gold text-foreground shadow-gold"
                      : "border-foreground/10 bg-surface-2 text-foreground/85 hover:border-gold/40"
                  }`}
                >
                  <p className="text-sm font-medium">{opt.title}</p>
                  <p className="text-[11px] opacity-70 mt-0.5">{opt.desc}</p>
                </button>
              ))}
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
    </main>
  );
}
