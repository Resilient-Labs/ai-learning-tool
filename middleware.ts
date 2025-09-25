// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ipLimiter } from "./src/lib/rate-limit";

const isPublicRoute = createRouteMatcher([
  "/api/webhooks/clerk",
  "/api/test",
]);

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;

  // Apply rate limiting only to /api/auth/*
  if (path.startsWith("/api/auth/")) {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      // req.ip is not always set in middleware, so fall back to 'unknown'
      "unknown";

    const { success, remaining, reset } = await ipLimiter.limit(ip);

    const res = success
      ? NextResponse.next()
      : NextResponse.json(
          { error: "Too many requests. Try again in a few minutes." },
          { status: 429 }
        );

    // Add rate-limit headers (limit value must match your limiter config)
    res.headers.set("X-RateLimit-Limit", "5");
    res.headers.set("X-RateLimit-Remaining", String(remaining ?? 0));
    res.headers.set("X-RateLimit-Reset", new Date(reset).toISOString());

    return res;
  }

  // Protect all non-public routes with Clerk
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
