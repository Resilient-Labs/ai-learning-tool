import { NextResponse } from 'next/server';
import { emailLimiter } from '@/lib/rate-limit';
import { hashEmail } from '@/lib/security';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  const accepted = NextResponse.json({ ok: true }, { status: 202 });

  let email: string | null = null;
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  try {
    const body = await req.json();
    if (typeof body?.email === 'string') email = body.email;
  } catch {}

  if (!email) return accepted; // no enumeration

  const key = `e:${email.toLowerCase().trim()}`;
  const { success, remaining, reset } = await emailLimiter.limit(key);

  // Best-effort audit (remove if you don't log)
  if (supabaseAdmin) {
    const insertPromise = supabaseAdmin.from('security_events').insert({
      kind: success ? 'password_reset_request' : 'rate_limit_email',
      hashed_email: hashEmail(email),
      ip,
      meta: { remaining, reset },
    });

    // Handle the promise properly
    Promise.resolve(insertPromise).catch(() => {});
  }

  // We do NOT trigger Clerk; user uses <SignIn/> "Forgot password?"
  return accepted;
}
