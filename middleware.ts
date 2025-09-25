import { NextRequest, NextResponse } from 'next/server';
import { ipLimiter } from './src/lib/rate-limit';

export async function middleware(request: NextRequest) {
  // Only apply rate limiting to /api/auth/* endpoints
  if (!request.nextUrl.pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const { success, remaining, reset } = await ipLimiter.limit(ip);

  const response = success 
    ? NextResponse.next() 
    : NextResponse.json(
        { error: 'Too many requests. Try again in a few minutes.' },
        { status: 429 }
      );

  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', '5');
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());

  return response;
}

export const config = {
  matcher: '/api/auth/:path*',
};
