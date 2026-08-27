// Shared server-side gate for the admin endpoints (api/admin/*). Deliberately
// kept outside api/ so it's never picked up as a route of its own — Vercel
// only auto-deploys functions from files directly under api/.
//
// The gate is real authorization, not a hidden URL: every admin endpoint
// verifies the caller's Clerk session JWT, looks up that user's actual email
// via the Clerk Backend API (a JWT's own claims aren't trustworthy for this —
// they reflect what the session had at issuance, not a live authorization
// check), and only proceeds if that email is on the ADMIN_EMAILS allowlist.
// Anyone else — including any other signed-in, fully legitimate account
// holder — gets a 403 with no information about why.
import { createClerkClient, verifyToken } from "@clerk/backend";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);

export function getClerkClient() {
  return createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
}

export async function requireAdmin(req) {
  if (!process.env.CLERK_SECRET_KEY || !ADMIN_EMAILS.length) return null;
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return null;
  try {
    const claims = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
    if (!claims.sub) return null;
    const clerk = getClerkClient();
    const user = await clerk.users.getUser(claims.sub);
    const email = (user.primaryEmailAddress?.emailAddress || "").toLowerCase();
    if (!email || !ADMIN_EMAILS.includes(email)) return null;
    return { userId: claims.sub, email };
  } catch {
    return null;
  }
}
