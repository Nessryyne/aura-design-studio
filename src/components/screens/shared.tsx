import type { ReactNode } from "react";

export function ScreenHeader({
  title,
  back,
  actions,
}: {
  title: string;
  back?: boolean;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div className="flex items-center gap-3">
        {back && (
          <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-foreground/70">
            ‹
          </span>
        )}
        <h2 className="font-serif text-xl text-foreground">{title}</h2>
      </div>
      <div className="flex items-center gap-2 text-foreground/60">
        {actions ?? (
          <>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-2">⌕</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-2">♪</span>
          </>
        )}
      </div>
    </div>
  );
}

export function BottomNav({ active = "home" }: { active?: string }) {
  const items = [
    { id: "home", label: "◇" },
    { id: "explore", label: "✦" },
    { id: "play", label: "❋" },
    { id: "save", label: "❀" },
    { id: "me", label: "◉" },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="relative mx-3 mb-3 rounded-3xl bg-surface/95 backdrop-blur shadow-elevated border border-foreground/5 px-5 py-3 flex items-center justify-between">
        {items.map((it) => (
          <span
            key={it.id}
            className={`text-base ${active === it.id ? "text-emerald" : "text-foreground/40"}`}
          >
            {it.label}
          </span>
        ))}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-gradient-gold shadow-gold grid place-items-center text-foreground text-lg">
          ﷽
        </div>
      </div>
    </div>
  );
}
