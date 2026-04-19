// Mock auth + onboarding state stored in localStorage.
// Demo only — no real backend.

const KEY = "noor.session";

export type Level = "Beginner" | "Intermediate" | "Advanced";

export interface Session {
  email: string;
  name: string;
  onboarded: boolean;
  level?: Level;
  goal?: string;
  reciter?: string;
  minutes?: number;
  completedRules?: string[];
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(s: Session) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("noor.session"));
}

export function updateSession(patch: Partial<Session>) {
  const cur = getSession();
  if (!cur) return;
  setSession({ ...cur, ...patch });
}

export function clearSession() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("noor.session"));
}

export function signInMock(email: string, name?: string): Session {
  const existing = getSession();
  const s: Session =
    existing && existing.email === email
      ? existing
      : { email, name: name ?? email.split("@")[0], onboarded: false, completedRules: [] };
  setSession(s);
  return s;
}
