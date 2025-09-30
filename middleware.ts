// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ipLimiter, ratelimitEnabled } from "@/lib/rate-limit";

const isProd = process.env.NODE_ENV === "production";
const DEBUG_RATELIMIT = process.env.DEBUG_RATELIMIT === "1";
// Optional: set this in DEV if you want to hit any /api/* without auth
const DEV_ALLOW_ALL_API = process.env.DEV_ALLOW_ALL_API === "1";

// ---- PUBLIC ROUTES ----
// In prod: keep this MINIMAL.
// In dev: you may add more, or set DEV_ALLOW_ALL_API=1 to open /api/(.*).
const basePublicRoutes = [
  "/api/auth/request-password-reset", // your unauth endpoint
  "/api/healthz",                     // keep only if you added health check
  "/api/webhooks/(.*)",               // if you have incoming webhooks
] as const;

export default clerkMiddleware({
  publicRoutes: DEV_ALLOW_ALL_API && !isProd ? ["/api/(.*)"] : basePublicRoutes,

  async afterAuth(_auth, req) {
    const path = req.nextUrl.pathname;

    // Rate-limit only /api/auth/* at the edge (IP-based)
    if (path.startsWith("/api/auth/")) {
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("cf-connecting-ip") ||
        req.headers.get("x-real-ip") ||
        new URL(req.url).host || // dev fallback
        "unknown";

      const { success, remaining, reset } = await ipLimiter.limit(`ip:${ip}`);

      const res = success
        ? NextResponse.next()
        : NextResponse.json(
            { error: "Too many requests. Try again in a few minutes." },
            { status: 429 }
          );

      // Helpful headers (keep limit headers; restrict debug in prod)
      res.headers.set("X-RateLimit-Limit", "5");
      res.headers.set("X-RateLimit-Remaining", String(remaining ?? 0));
      res.headers.set("X-RateLimit-Reset", new Date(reset).toISOString());
      res.headers.set("X-RL-Enabled", String(ratelimitEnabled));
      if (!isProd || DEBUG_RATELIMIT) res.headers.set("X-Debug-IP", ip);

      return res;
    }

    return NextResponse.next();
  },
});

// Run on everything except static assets; always for API
export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
