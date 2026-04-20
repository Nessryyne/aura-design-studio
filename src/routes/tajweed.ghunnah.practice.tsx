import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { getSession, updateSession } from "@/lib/auth";

export const Route = createFileRoute("/tajweed/ghunnah/practice")({
  head: () => ({
    meta: [
      { title: "Al-Ghunnah practice — Tajweed" },
      { name: "description", content: "Practice the Ghunnah nasal sound with live feedback." },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const s = getSession();
      if (!s) throw redirect({ to: "/signin" });
      if (!s.onboarded) throw redirect({ to: "/onboarding" });
    }
  },
  component: GhunnahPractice,
});

function GhunnahPractice() {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);

  const complete = () => {
    const s = getSession();
    if (s) {
      const set = new Set(s.completedRules ?? []);
      set.add("ghunnah");
      updateSession({ completedRules: Array.from(set) });
    }
    navigate({ to: "/tajweed" });
  };

  return (
    <AppShell>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-3">
          <Link
            to="/tajweed/$ruleId"
            params={{ ruleId: "ghunnah" }}
            className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-foreground/70 text-sm"
          >
            ‹
          </Link>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Practice
          </p>
          <div className="h-8 w-8" />
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-3">
          {/* Audio example card */}
          <div className="rounded-2xl border border-foreground/5 bg-surface p-3 shadow-soft">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-gold shadow-gold text-foreground"
              >
                {playing ? "❚❚" : "▶"}
              </button>
              <div className="flex-1">
                {/* waveform */}
                <div className="flex h-7 items-center gap-[3px]">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const h = 6 + Math.abs(Math.sin(i * 0.9)) * 18;
                    return (
                      <span
                        key={i}
                        className={`w-[3px] rounded-full ${
                          playing && i < 14 ? "bg-gold-deep" : "bg-gold/60"
                        }`}
                        style={{ height: `${h}px` }}
                      />
                    );
                  })}
                </div>
                <p className="mt-1 text-[11px] text-foreground/70">
                  Listen to Ghunnah example in Surat Al-Falaq
                </p>
              </div>
              <span className="text-[10px] tabular-nums text-foreground/40">1:20</span>
            </div>
          </div>

          {/* Practice card */}
          <div className="mt-3 rounded-3xl bg-gradient-cream border border-gold/30 p-5 text-center shadow-elevated">
            <span className="inline-block rounded-full bg-gradient-emerald px-3 py-1 text-[10px] uppercase tracking-widest text-gold-light shadow-soft">
              Al-Ghunnah
            </span>

            <p className="mt-5 font-arabic text-3xl leading-relaxed text-foreground">
              مِن شَرِّ مَا خَلَقَ
            </p>

            <button
              onClick={() => {
                if (recording) {
                  setRecording(false);
                  setHasRecording(true);
                } else {
                  setRecording(true);
                  setHasRecording(false);
                }
              }}
              className={`mt-6 grid h-16 w-16 mx-auto place-items-center rounded-full shadow-gold transition-transform ${
                recording
                  ? "bg-emerald text-background animate-pulse scale-110"
                  : "bg-gradient-gold text-foreground active:scale-95"
              }`}
            >
              <span className="text-xl">🎙</span>
            </button>
            <p className="mt-3 text-[11px] text-foreground/60">
              {recording ? "Listening… tap to stop" : "Tap to start recording"}
            </p>
          </div>

          {/* Feedback */}
          <div className="mt-3 rounded-2xl border border-foreground/5 bg-surface p-4 text-center shadow-soft">
            {!hasRecording ? (
              <p className="text-[12px] text-foreground/60">
                Record your recitation to see feedback
              </p>
            ) : (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald">
                  Nice — Ghunnah held for 2 counts
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2 text-[10px]">
                  <Stat label="Nasal" value="92%" />
                  <Stat label="Length" value="2.0c" />
                  <Stat label="Clarity" value="A" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom action */}
        <div className="px-5 pb-4">
          <button
            onClick={complete}
            disabled={!hasRecording}
            className="w-full rounded-2xl bg-gradient-emerald py-3 text-sm font-medium text-background shadow-elevated transition-opacity disabled:opacity-40"
          >
            Mark complete →
          </button>
        </div>

        {/* Bottom nav */}
        <div className="border-t border-foreground/10 bg-surface/80 backdrop-blur px-5 py-2">
          <div className="flex items-center justify-around text-[10px] text-foreground/50">
            <NavItem icon="⌂" label="Home" to="/home" />
            <NavItem icon="✦" label="Rules" to="/tajweed" active />
            <NavItem icon="❒" label="Saved" />
            <NavItem icon="◔" label="Profile" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gradient-cream border border-gold/20 py-1.5">
      <p className="font-serif text-sm text-emerald-deep">{value}</p>
      <p className="text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function NavItem({
  icon,
  label,
  to,
  active,
}: {
  icon: string;
  label: string;
  to?: "/home" | "/tajweed";
  active?: boolean;
}) {
  const cls = `flex flex-col items-center gap-0.5 ${
    active ? "text-gold-deep" : "text-foreground/50"
  }`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        <span className="text-base">{icon}</span>
        <span>{label}</span>
      </Link>
    );
  }
  return (
    <div className={cls}>
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
