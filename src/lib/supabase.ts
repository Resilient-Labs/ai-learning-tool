import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY|| 'placeholder_service_key', //temporarily using anon key here to aid with frontend development
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// For server-side operations that need service role key
export const supabaseServerSide = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY|| 'placeholder_service_key', 
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

/**
 * Create Supabase client with user's JWT token for RLS
 * This ensures RLS policies work correctly with user context
 */
export function createSupabaseClientWithAuth(accessToken: string, role?: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(role && { 'x-user-role': role })
      }
    }
  });
}
