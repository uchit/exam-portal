// Optional account sync, built on Clerk (loaded via <script defer> tags baked
// into every page's <head> by scripts/build-pages.mjs, publishable-key only —
// no bundler needed). Practice/exam/diagnostic/drill work fully anonymously
// and locally with no Clerk key present; this module only activates the
// account UI and cross-device sync when it is.
//
// Sync model: signing in for the first time on a device adopts whichever of
// (local, server) progress is non-empty; if both are, they're merged
// non-destructively (see mergeProgress) so neither device's history is lost.
// After that, every local saveProgress() call also pushes to the server
// (debounced), and progress is pulled from the server once per page load.

let clerkReady = null;

function waitForClerk() {
  if (clerkReady) return clerkReady;
  clerkReady = new Promise((resolve) => {
    if (typeof window === "undefined" || !window.Clerk) {
      // No publishable key baked into this page (local dev without .env.local,
      // or Clerk's script failed to load) — sync stays off, site works as before.
      resolve(null);
      return;
    }
    window.addEventListener("load", async () => {
      try {
        await window.Clerk.load({ ui: { ClerkUI: window.__internal_ClerkUICtor } });
        resolve(window.Clerk);
      } catch {
        resolve(null);
      }
    }, { once: true });
  });
  return clerkReady;
}

export async function getClerk() {
  return waitForClerk();
}

export async function getToken() {
  const clerk = await waitForClerk();
  if (!clerk || !clerk.session) return null;
  try { return await clerk.session.getToken(); } catch { return null; }
}

export async function isSignedIn() {
  const clerk = await waitForClerk();
  return !!(clerk && clerk.isSignedIn);
}

export async function currentUser() {
  const clerk = await waitForClerk();
  return clerk?.user || null;
}

// Google's flow does a full-tab redirect (not a popup), so on return the SPA
// reboots from scratch — pointing Clerk back at the exact page (path+query)
// the user was on, instead of Clerk's default '/', is what makes that reboot
// land somewhere resumable rather than dumping them on the homepage.
const here = () => location.pathname + location.search;

export async function openSignUp() {
  const clerk = await waitForClerk();
  if (clerk) clerk.openSignUp({ redirectUrl: here() });
}

export async function openSignIn() {
  const clerk = await waitForClerk();
  if (clerk) clerk.openSignIn({ redirectUrl: here() });
}

export async function signOut() {
  const clerk = await waitForClerk();
  if (clerk) await clerk.signOut();
}

// Fires `onChange({ signedIn, user })` on every auth state transition,
// including once immediately after Clerk finishes loading.
export async function onAuthChange(onChange) {
  const clerk = await waitForClerk();
  if (!clerk) { onChange({ signedIn: false, user: null }); return; }
  onChange({ signedIn: !!clerk.isSignedIn, user: clerk.user || null });
  clerk.addListener(({ user, session }) => {
    onChange({ signedIn: !!session, user: user || null });
  });
}

async function apiFetch(path, options = {}) {
  const token = await getToken();
  if (!token) return null;
  try {
    const res = await fetch(path, {
      ...options,
      headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    if (res.status === 204) return {};
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchServerProgress() {
  const data = await apiFetch("/api/progress");
  return data && data.progress ? data.progress : null;
}

export async function pushProgressToServer(progress) {
  await apiFetch("/api/progress", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ progress })
  });
}

const isEmptyProgress = (p) =>
  !p || (p.attempts === 0 && Object.keys(p.answered || {}).length === 0 && (p.exams || []).length === 0);

// Non-destructive union merge — used the first time a device with existing
// local progress signs into an account that already has server progress
// (e.g. from another device). Never drops data from either side.
export function mergeProgress(local, server) {
  if (isEmptyProgress(local)) return server;
  if (isEmptyProgress(server)) return local;

  const mergeDict = (a = {}, b = {}) => ({ ...a, ...b });
  const mergeSrs = (a = {}, b = {}) => {
    const out = { ...a };
    for (const [k, v] of Object.entries(b || {})) {
      if (!out[k] || (v?.step ?? 0) >= (out[k]?.step ?? 0)) out[k] = v;
    }
    return out;
  };
  const mergeExams = (a = [], b = []) => {
    const seen = new Set();
    const out = [];
    for (const e of [...(a || []), ...(b || [])]) {
      const key = JSON.stringify(e);
      if (!seen.has(key)) { seen.add(key); out.push(e); }
    }
    return out.sort((x, y) => (x.date || "").localeCompare(y.date || ""));
  };

  return {
    answered: mergeDict(local.answered, server.answered),
    flags: mergeDict(local.flags, server.flags),
    exams: mergeExams(local.exams, server.exams),
    streak: Math.max(local.streak || 0, server.streak || 0),
    bestStreak: Math.max(local.bestStreak || 0, server.bestStreak || 0),
    attempts: Math.max(local.attempts || 0, server.attempts || 0),
    correct: Math.max(local.correct || 0, server.correct || 0),
    recent: (local.recent && local.recent.length >= (server.recent || []).length) ? local.recent : server.recent,
    srs: mergeSrs(local.srs, server.srs),
    completedLessons: mergeDict(local.completedLessons, server.completedLessons)
  };
}
