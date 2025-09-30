import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const ratelimitEnabled =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN &&
  !!redis;

const noOpLimiter = {
  limit: async (_key: string) => ({
    success: true,
    remaining: 9_999,
    reset: Date.now() + 60_000,
  }),
} as const;

// 5 req / min per IP (edge middleware and route fallback use this)
export const ipLimiter = ratelimitEnabled
  ? new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      prefix: "rl:ip",
      analytics: true,
    })
  : noOpLimiter;

// 5 req / 30 min per email (route never blocks in prod unless env says so)
export const emailLimiter = ratelimitEnabled
  ? new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(5, "30 m"),
      prefix: "rl:email",
    })
  : noOpLimiter;

export type RatelimitResult = Awaited<ReturnType<typeof ipLimiter.limit>>;
