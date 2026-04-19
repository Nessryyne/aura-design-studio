import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoginScreen } from "@/components/screens/LoginScreen";
import { QuranScreen } from "@/components/screens/QuranScreen";
import { SurahScreen } from "@/components/screens/SurahScreen";
import { TajweedScreen } from "@/components/screens/TajweedScreen";
import { AchievementsScreen } from "@/components/screens/AchievementsScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noor — A more elegant Qur'an companion" },
      {
        name: "description",
        content:
          "An elegant, modern Qur'an, Tajweed and recitation companion. Cream, emerald and gold — designed with restraint.",
      },
      { property: "og:title", content: "Noor — A more elegant Qur'an companion" },
      {
        property: "og:description",
        content: "An elegant, modern Qur'an, Tajweed and recitation companion.",
      },
    ],
  }),
  component: Index,
});

const SCREENS = [
  { id: "login", label: "Welcome", el: <LoginScreen /> },
  { id: "quran", label: "Library", el: <QuranScreen /> },
  { id: "surah", label: "Recitation", el: <SurahScreen /> },
  { id: "tajweed", label: "Tajweed", el: <TajweedScreen /> },
  { id: "progress", label: "Progress", el: <AchievementsScreen /> },
];

function Index() {
  const [active, setActive] = useState(1);

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Top bar */}
      <header className="px-8 lg:px-16 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-gold grid place-items-center shadow-gold">
            <span className="font-arabic text-foreground text-sm">ن</span>
          </div>
          <span className="font-serif text-xl tracking-wide text-foreground">Noor</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>Recite</span>
          <span>Learn</span>
          <span>Journal</span>
          <span>About</span>
        </nav>
        <button className="rounded-full bg-foreground text-background px-4 py-2 text-xs tracking-wide">
          Download
        </button>
      </header>

      {/* Hero */}
      <section className="px-8 lg:px-16 pt-12 lg:pt-20 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 space-y-6">
          <p className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold-deep">
            <span className="h-px w-8 bg-gold-deep" /> Iteration v.02
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl leading-[1.05] text-foreground">
            A quieter,
            <br />
            <em className="text-emerald-deep">more elegant</em>
            <br />
            way to recite.
          </h1>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            Reimagined from the ground up — cream, emerald, and brushed gold. Every screen
            considered, every gesture refined. A companion worthy of the words it carries.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <button className="rounded-full bg-gradient-gold px-6 py-3 text-sm font-medium text-foreground shadow-gold">
              Try the experience
            </button>
            <button className="text-sm text-emerald-deep underline-offset-4 hover:underline">
              Read the design notes →
            </button>
          </div>

          <dl className="grid grid-cols-3 gap-6 pt-8 border-t border-foreground/10">
            {[
              { k: "114", v: "Surahs" },
              { k: "30+", v: "Tajweed rules" },
              { k: "12", v: "Reciters" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-serif text-3xl text-foreground">{s.k}</dt>
                <dd className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Phone stage */}
        <div className="lg:col-span-7 relative h-[720px] flex items-center justify-center">
          {/* ornament */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="h-[520px] w-[520px] rounded-full border border-gold/30" />
          </div>
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="h-[640px] w-[640px] rounded-full border border-emerald/20" />
          </div>
          <div className="absolute top-12 right-6 font-arabic text-[10rem] leading-none text-emerald/5 select-none">
            ﷽
          </div>

          {/* Phones layout */}
          <div className="relative flex items-center justify-center gap-[-40px]">
            {SCREENS.map((s, i) => {
              const offset = i - active;
              const abs = Math.abs(offset);
              if (abs > 2) return null;
              const scale = abs === 0 ? 1 : abs === 1 ? 0.78 : 0.6;
              const tx = offset * 180;
              const z = 10 - abs;
              const opacity = abs === 0 ? 1 : abs === 1 ? 0.85 : 0.5;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className="absolute transition-all duration-700 ease-out"
                  style={{
                    transform: `translateX(${tx}px) scale(${scale})`,
                    zIndex: z,
                    opacity,
                  }}
                  aria-label={`Show ${s.label}`}
                >
                  <PhoneFrame>{s.el}</PhoneFrame>
                </button>
              );
            })}
          </div>

          {/* selector */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-surface/80 backdrop-blur border border-foreground/10 shadow-soft px-2 py-2">
            {SCREENS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`px-3 py-1.5 rounded-full text-[11px] tracking-wide transition-colors ${
                  i === active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <footer className="mt-20 px-8 lg:px-16 py-10 border-t border-foreground/10 flex items-center justify-between text-xs text-muted-foreground">
        <span>© Noor Studio · Crafted with intention</span>
        <span className="font-arabic text-base text-emerald-deep">و الحمد لله</span>
      </footer>
    </main>
  );
}
