import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { getSession, updateSession } from "@/lib/auth";
import mockup from "@/assets/reading-test-mockup.png";

export const Route = createFileRoute("/reading-test")({
  head: () => ({
    meta: [
      { title: "Reading test — Tajweed" },
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

function ReadingTest() {
  const navigate = useNavigate();

  const finish = () => {
    updateSession({ readingTested: true } as never);
    navigate({ to: "/home" });
  };

  return (
    <AppShell>
      <div className="flex h-full flex-col">
        <div className="px-6 pt-6 pb-3">
          <p className="text-[10px] uppercase tracking-widest text-emerald">
            Reading test
          </p>
          <h1 className="mt-3 font-serif text-2xl leading-tight text-foreground">
            Recite this page aloud
          </h1>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            Take your time — we'll listen and tune your level.
          </p>
        </div>

        <div className="flex-1 overflow-hidden px-5 pt-3 pb-5">
          <div className="h-full overflow-hidden rounded-3xl border border-gold/30 shadow-elevated bg-gradient-cream">
            <img
              src={mockup}
              alt="Reading test mushaf page in cream and gold"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="px-5 pb-7 pt-3">
          <button
            onClick={finish}
            className="w-full rounded-2xl bg-gradient-emerald py-3.5 text-sm font-medium text-background shadow-elevated transition-transform active:scale-[0.98]"
          >
            Continue to dashboard →
          </button>
        </div>
      </div>
    </AppShell>
  );
}
