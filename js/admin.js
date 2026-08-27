// Client helpers for the admin dashboard (/admin) — see api/admin/* and
// lib/admin-auth.mjs for the actual authorization; this module just carries
// the signed-in user's token along with each request.
import { getToken } from "./auth.js";

async function adminFetch(path) {
  const token = await getToken();
  if (!token) return { status: 401, data: null };
  try {
    const res = await fetch(path, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json().catch(() => null);
    return { status: res.status, data };
  } catch {
    return { status: 0, data: null };
  }
}

export const fetchAdminUsers = (limit = 100, offset = 0) => adminFetch(`/api/admin/users?limit=${limit}&offset=${offset}`);
export const fetchAdminStats = () => adminFetch("/api/admin/stats");
