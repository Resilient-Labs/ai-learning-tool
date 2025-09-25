/*
TODO: To be determined backend team if we want this optional security
*/

-- Create security_events table for audit logging
-- Run this SQL in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS public.security_events (
  id BIGSERIAL PRIMARY KEY,
  kind TEXT NOT NULL,               -- 'password_reset_request' | 'rate_limit_ip' | 'rate_limit_email'
  hashed_email TEXT,                -- SHA-256 hash of email (privacy-safe)
  ip TEXT,                          -- Client IP address
  meta JSONB,                       -- Additional metadata (rate limit info, etc.)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policy (only service role can access for MVP)
-- This allows the service role to insert and read records
CREATE POLICY "Service role can manage security events" ON public.security_events
  FOR ALL USING (auth.role() = 'service_role');

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_security_events_kind ON public.security_events(kind);
CREATE INDEX IF NOT EXISTS idx_security_events_created_at ON public.security_events(created_at);
CREATE INDEX IF NOT EXISTS idx_security_events_hashed_email ON public.security_events(hashed_email);
