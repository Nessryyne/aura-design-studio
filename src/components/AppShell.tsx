import type { ReactNode } from "react";
import { PhoneFrame } from "./PhoneFrame";

/**
 * Shared "device on a stage" wrapper used by every app route
 * (sign-in, onboarding, home, tajweed) to stay consistent with
 * the landing page aesthetic.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Decorative ornaments */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="h-[520px] w-[520px] rounded-full border border-gold/30" />
      </div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="h-[680px] w-[680px] rounded-full border border-emerald/20" />
      </div>
      <div className="pointer-events-none absolute top-12 right-10 select-none font-arabic text-[10rem] leading-none text-emerald/5">
        ﷽
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-10">
        <PhoneFrame>{children}</PhoneFrame>
        <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Tajweed · Demo experience
        </p>
      </div>
    </main>
  );
}
