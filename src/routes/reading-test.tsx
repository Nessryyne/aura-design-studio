import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { getSession, updateSession } from "@/lib/auth";

export const Route = createFileRoute("/reading-test")({
  head: () => ({
    meta: [
      { title: "Reading test — Noor" },
      { name: "description", content: "Read a verse so we can tune your level." },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getSession()) {
      throw redirect({ to: "/signin" });
    }
  },
  component: ReadingTest,
});

const PAGES = 604;

function ReadingTest() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [recording, setRecording] = useState(false);
  const [done, setDone] = useState(false);

  const finish = () => {
    updateSession({ readingTested: true } as never);
    navigate({ to: "/onboarding" });
  };

  return (
    <AppShell>
      <div className="flex h-full flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-3">
          <div className="flex items-center gap-2 rounded-full border border-foreground/10 bg-surface px-3 py-1.5 text-[11px] text-foreground/70">
            <span className="font-serif">Hafs</span>
            <span className="text-foreground/30">·</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              QCF v2
            </span>
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-gold shadow-gold">
            <span className="text-foreground">☾</span>
          </div>
        </div>

        <p className="mt-3 px-6 text-[10px] uppercase tracking-widest text-emerald">
          Reading test · 1 of 1
        </p>
        <h1 className="mt-1 px-6 font-serif text-2xl leading-tight text-foreground">
          Recite this page aloud
        </h1>

        {/* Mushaf card */}
        <div className="mx-5 mt-4 rounded-3xl border border-gold/30 bg-gradient-cream p-5 shadow-soft">
          <div className="rounded-2xl border border-emerald-deep/40 bg-surface px-5 py-3 text-center">
            <p className="font-arabic text-2xl text-emerald-deep">الفَاتِحَة</p>
          </div>

          <div className="mt-4 text-center font-arabic text-[22px] leading-[2.2] text-foreground">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ۝
            <br />
            ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ ۝
            <br />
            ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ۝ مَٰلِكِ يَوْمِ ٱلدِّينِ ۝
            <br />
            إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝
            <br />
            ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ ۝
          </div>

          {/* Page nav */}
          <div className="mt-5 flex items-center justify-center">
            <div className="flex items-center gap-3 rounded-full border border-foreground/10 bg-surface px-2 py-1.5 shadow-soft">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="grid h-7 w-7 place-items-center rounded-full text-foreground/60 hover:text-foreground"
              >
                ‹
              </button>
              <p className="text-center text-[11px] leading-tight text-foreground/70">
                <span className="block">/ {page}</span>
                <span className="block text-foreground/40">{PAGES}</span>
              </p>
              <button
                onClick={() => setPage((p) => Math.min(PAGES, p + 1))}
                className="grid h-7 w-7 place-items-center rounded-full text-foreground/60 hover:text-foreground"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Record button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              if (recording) {
                setRecording(false);
                setDone(true);
              } else {
                setRecording(true);
                setDone(false);
              }
            }}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium shadow-elevated transition-all ${
              recording
                ? "bg-emerald text-background animate-pulse"
                : "bg-gradient-emerald text-background"
            }`}
          >
            <span className="font-arabic text-sm">🎙</span>
            {recording ? "Stop recording" : done ? "Re-record" : "تسجيل · Record"}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto px-5 pb-4 pt-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-foreground/50">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-full border border-foreground/10 bg-surface px-4 py-1.5 text-foreground/60"
            >
              ‹ Prev
            </button>
            <span>
              {page} / {PAGES}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(PAGES, p + 1))}
              className="rounded-full border border-foreground/10 bg-surface px-4 py-1.5 text-foreground/60"
            >
              Next ›
            </button>
          </div>
          <button
            onClick={finish}
            className="w-full rounded-2xl bg-gradient-emerald py-3 text-sm font-medium text-background shadow-elevated transition-transform active:scale-[0.98]"
          >
            Continue to dashboard →
          </button>
        </div>
      </div>
    </AppShell>
  );
}
