// Admin-only: list registered (Clerk) accounts. See lib/admin-auth.mjs for
// the authorization gate — every request here re-verifies the caller is on
// the ADMIN_EMAILS allowlist before touching Clerk's user data.
import { requireAdmin, getClerkClient } from "../../lib/admin-auth.mjs";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const admin = await requireAdmin(req);
  if (!admin) return res.status(403).json({ error: "Forbidden" });

  const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 200);
  const offset = Math.max(Number(req.query.offset) || 0, 0);

  try {
    const clerk = getClerkClient();
    const { data, totalCount } = await clerk.users.getUserList({ limit, offset, orderBy: "-created_at" });
    const users = data.map((u) => ({
      id: u.id,
      email: u.primaryEmailAddress?.emailAddress || u.emailAddresses?.[0]?.emailAddress || null,
      createdAt: u.createdAt,
      lastSignInAt: u.lastSignInAt,
      banned: u.banned
    }));
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).json({ users, totalCount, limit, offset });
  } catch {
    return res.status(502).json({ error: "Could not load users" });
  }
}
