import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

export const ipLimiter = new Ratelimit({
  redis, limiter: Ratelimit.slidingWindow(5, '5 m'), prefix: 'rl:ip',
});

export const emailLimiter = new Ratelimit({
  redis, limiter: Ratelimit.slidingWindow(5, '30 m'), prefix: 'rl:email',
});
