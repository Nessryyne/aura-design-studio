export function LoginScreen() {
  return (
    <div className="h-full flex flex-col">
      {/* ornate top */}
      <div className="relative h-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cream" />
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="arabesque" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M10 0 L20 10 L10 20 L0 10 Z M10 4 L16 10 L10 16 L4 10 Z"
                fill="none"
                stroke="oklch(0.72 0.14 75)"
                strokeWidth="0.4"
              />
            </pattern>
          </defs>
          <rect width="200" height="100" fill="url(#arabesque)" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="flex-1 px-7 -mt-6">
        <h1 className="font-serif text-4xl text-foreground">Welcome</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Don't have an account?{" "}
          <span className="text-gold-deep font-medium">Sign up</span>
        </p>

        <div className="mt-7 space-y-3">
          <div className="rounded-2xl border border-foreground/10 bg-surface px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</p>
            <p className="text-sm text-foreground mt-0.5">yassine@noor.app</p>
          </div>
          <div className="rounded-2xl border border-foreground/10 bg-surface px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Password</p>
            <p className="text-sm text-foreground mt-0.5 tracking-widest">••••••••</p>
          </div>
          <p className="text-right text-[11px] text-emerald">Forgot password?</p>
        </div>

        <button className="mt-6 w-full rounded-2xl bg-gradient-gold py-3.5 text-sm font-medium text-foreground shadow-gold">
          Sign in
        </button>

        <div className="mt-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-foreground/10" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            or continue with
          </span>
          <span className="h-px flex-1 bg-foreground/10" />
        </div>

        <div className="mt-4 flex justify-center gap-3">
          {["", "G", ""].map((l, i) => (
            <button
              key={i}
              className="h-11 w-11 rounded-full bg-surface border border-foreground/10 grid place-items-center text-sm text-foreground/70 shadow-soft"
            >
              {l || (i === 0 ? "" : "f")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
