import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { getSession, updateSession } from "@/lib/auth";
import mockup from "@/assets/reading-test-mockup.png";

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

function ReadingTest() {
  const navigate = useNavigate();

  const finish = () => {
    updateSession({ readingTested: true } as never);
    navigate({ to: "/home" });
  };

  return (
    <AppShell>
      <div className="flex h-full flex-col">
        <div className="px-6 pt-4">
          <p className="text-[10px] uppercase tracking-widest text-emerald">
            Reading test
          </p>
          <h1 className="mt-1 font-serif text-2xl leading-tight text-foreground">
            Recite this page aloud
          </h1>
        </div>

        <div className="flex-1 overflow-hidden px-5 pt-4">
          <div className="h-full overflow-hidden rounded-3xl border border-gold/30 shadow-elevated bg-gradient-cream">
            <img
              src={mockup}
              alt="Reading test mushaf page in cream and gold"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="px-5 pb-4 pt-4">
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
