import { NextRequest, NextResponse } from "next/server";
import { ipLimiter, emailLimiter } from "@/lib/rate-limit";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { hashEmail } from "@/lib/security";

const BLOCK_EMAILS = process.env.RATE_LIMIT_EMAIL_BLOCK === "1";

export async function POST(req: NextRequest) {
  const accepted = NextResponse.json({ ok: true }, { status: 202 });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    "::1";

  // Server-side IP guard (middleware should already enforce)
  const ipRes = await ipLimiter.limit(`ip:${ip}`);
  if (!ipRes.success) {
    const tooMany = NextResponse.json(
      { error: "Too many requests. Try again soon." },
      { status: 429 }
    );
    tooMany.headers.set("X-RateLimit-Limit", "5");
    tooMany.headers.set("X-RateLimit-Remaining", String(ipRes.remaining ?? 0));
    tooMany.headers.set("X-RateLimit-Reset", new Date(ipRes.reset).toISOString());
    return tooMany;
  }

  // Parse email safely
  let email: string | null = null;
  try {
    const body = await req.json();
    if (typeof body?.email === "string") {
      email = body.email.trim().toLowerCase();
    }
  } catch {
    // ignore bad JSON
  }

  // If no email, still 202 with IP headers
  if (!email) {
    accepted.headers.set("X-RateLimit-Limit", "5");
    accepted.headers.set("X-RateLimit-Remaining", String(ipRes.remaining ?? 0));
    accepted.headers.set("X-RateLimit-Reset", new Date(ipRes.reset).toISOString());
    return accepted;
  }

  // Per-email limiter
  const eRes = await emailLimiter.limit(`e:${email}`);

  // Fire-and-forget audit
  if (supabaseAdmin) {
    (async () => {
      try {
        await supabaseAdmin.from("security_events").insert({
          kind: eRes.success ? "password_reset_request" : "rate_limit_email",
          hashed_email: hashEmail(email),
          ip,
          meta: { remaining: eRes.remaining, reset: eRes.reset },
        });
      } catch {}
    })();
  }

  // If env says to actively block per-email, return 429 when exceeded
  if (BLOCK_EMAILS && !eRes.success) {
    const tooMany = NextResponse.json(
      { error: "Too many requests for this email. Try again later." },
      { status: 429 }
    );
    tooMany.headers.set("X-Email-Remaining", String(eRes.remaining ?? 0));
    tooMany.headers.set("X-Email-Reset", new Date(eRes.reset).toISOString());
    tooMany.headers.set("X-RateLimit-Limit", "5");
    tooMany.headers.set("X-RateLimit-Remaining", String(ipRes.remaining ?? 0));
    tooMany.headers.set("X-RateLimit-Reset", new Date(ipRes.reset).toISOString());
    return tooMany;
  }

  // Default: 202 with helpful headers (no enumeration)
  accepted.headers.set("X-Email-Remaining", String(eRes.remaining ?? 0));
  accepted.headers.set("X-Email-Reset", new Date(eRes.reset).toISOString());
  accepted.headers.set("X-RateLimit-Limit", "5");
  accepted.headers.set("X-RateLimit-Remaining", String(ipRes.remaining ?? 0));
  accepted.headers.set("X-RateLimit-Reset", new Date(ipRes.reset).toISOString());
  return accepted;
}
