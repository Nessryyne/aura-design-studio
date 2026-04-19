import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 320, height: 660 }}>
      {/* outer body */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-foreground to-emerald-deep shadow-phone p-[3px]">
        <div className="absolute inset-[3px] rounded-[2.85rem] bg-gradient-to-b from-emerald-deep to-foreground" />
        {/* screen */}
        <div className="relative h-full w-full rounded-[2.7rem] overflow-hidden bg-background">
          {/* notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-6 w-28 rounded-full bg-foreground" />
          {/* status bar */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-7 pt-3 text-[10px] font-medium text-foreground/80">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-3 rounded-sm border border-foreground/60" />
              <span className="inline-block h-2 w-2 rounded-full border border-foreground/60" />
            </span>
          </div>
          <div className="absolute inset-0 pt-8">{children}</div>
        </div>
      </div>
      {/* side buttons */}
      <div className="absolute -left-[3px] top-24 h-12 w-1 rounded-l bg-emerald-deep/80" />
      <div className="absolute -left-[3px] top-40 h-16 w-1 rounded-l bg-emerald-deep/80" />
      <div className="absolute -right-[3px] top-32 h-20 w-1 rounded-r bg-emerald-deep/80" />
    </div>
  );
}
