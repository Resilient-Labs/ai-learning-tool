import { createClient } from '@supabase/supabase-js';
import type { Database } from './types.js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Create typed Supabase client with full type safety
// This provides auto-completion and type checking for all database operations
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Re-export types for convenience
export type { Database, AnalyticsEventData } from './types.js';

/*
 * PERFORMANCE OPTIMIZATION NOTES:
 * 
 * Recommended database indexes for better query performance:
 * 
 * 1. chat_messages table:
 *    - CREATE INDEX idx_chat_messages_session_id_created_at ON chat_messages(session_id, created_at);
 *    - CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
 * 
 * 2. chat_sessions table:
 *    - CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);
 *    - CREATE INDEX idx_chat_sessions_status ON chat_sessions(status);
 * 
 * 3. analytics_events table:
 *    - CREATE INDEX idx_analytics_events_user_id_created_at ON analytics_events(user_id, created_at);
 *    - CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);
 * 
 * 4. user_sessions table:
 *    - CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
 *    - CREATE INDEX idx_user_sessions_session_type ON user_sessions(session_type);
 * 
 * DEFAULT TIMESTAMP SETUP:
 * 
 * To enable automatic timestamp handling, run these migrations:
 * 
 * ALTER TABLE users
 *   ALTER COLUMN created_at SET DEFAULT now(),
 *   ALTER COLUMN updated_at SET DEFAULT now();
 * 
 * ALTER TABLE chat_sessions
 *   ALTER COLUMN created_at SET DEFAULT now(),
 *   ALTER COLUMN updated_at SET DEFAULT now(),
 *   ALTER COLUMN last_activity_at SET DEFAULT now();
 * 
 * ALTER TABLE chat_messages
 *   ALTER COLUMN created_at SET DEFAULT now();
 * 
 * ALTER TABLE user_sessions
 *   ALTER COLUMN created_at SET DEFAULT now();
 * 
 * ALTER TABLE analytics_events
 *   ALTER COLUMN created_at SET DEFAULT now();
 * 
 * After setting defaults, you can omit created_at/updated_at from Insert operations
 * and they will be automatically populated by the database.
 */
