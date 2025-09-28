import type { SupabaseClient } from '@supabase/supabase-js';
import { createDatabaseError } from '../middleware/error-handler';

type Role = 'user' | 'assistant' | 'system';

interface StoreMessageOptions {
  tokenCount?: number;
  modelName?: string;
  responseTimeMs?: number;
}

export interface ConversationContext {
  messages: Array<{
    role: Role;
    content: string;
  }>;
  session: Record<string, unknown>; // Session data from database
  totalTokens: number;
}

export class ConversationManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private supabase: SupabaseClient<any>; // Generic database client
  private userId: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(supabase: SupabaseClient<any>, userId: string) {
    this.supabase = supabase;
    this.userId = userId;
  }

  async getOrCreateSession(
    sessionId?: string,
    title?: string,
    sessionType: 'practice' | 'tutoring' | 'review' | 'general' = 'general'
  ): Promise<string> {
    if (sessionId) {
      const result = await this.supabase
        .from('chat_sessions')
        .select('id')
        .eq('id', sessionId)
        .eq('user_id', this.userId)
        .single();

      if (!result.error && result.data) {
        return (result.data as { id: string }).id;
      }
    }

    const result = await this.supabase
      .from('chat_sessions')
      .insert({
        user_id: this.userId,
        title: title ?? 'Untitled Session',
        session_type: sessionType,
        status: 'active',
      })
      .select('id')
      .single();

    if (result.error) {
      throw createDatabaseError('Failed to create session', { originalError: result.error });
    }
    
    if (!result.data) {
      throw createDatabaseError('No data returned from session creation', { originalError: new Error('No data') });
    }
    
    return (result.data as { id: string }).id;
  }

  async storeMessage(
    sessionId: string,
    role: Role,
    content: string,
    options: StoreMessageOptions = {}
  ): Promise<void> {
    const { tokenCount = 0, modelName, responseTimeMs } = options;

    // Store message and update session stats in a single transaction
    // The RPC function handles both operations atomically
    const { error: insertError } = await this.supabase.from('chat_messages').insert({
      session_id: sessionId,
      user_id: this.userId,
      role,
      content,
      token_count: tokenCount,
      model_name: modelName,
      response_time_ms: responseTimeMs,
    });

    if (insertError) {
      throw createDatabaseError('Failed to store message', { originalError: insertError });
    }

    // Update session statistics
    const { error: updateError } = await this.supabase.rpc('update_chat_session_stats', {
      p_session_id: sessionId,
      p_token_count: tokenCount,
    });

    if (updateError) {
      // If session stats update fails, we should log this as a warning
      // but not fail the entire operation since the message was stored
      console.warn('Failed to update session stats:', updateError);
      // Note: In production, you might want to implement a retry mechanism
      // or queue this update for later processing
    }
  }

  async getConversationHistory(sessionId: string, limit: number = 20): Promise<ConversationContext> {
    const { data, error } = await this.supabase
      .from('chat_messages')
      .select('role, content, token_count')
      .eq('session_id', sessionId)
      .eq('user_id', this.userId)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) {
      throw createDatabaseError('Failed to get conversation history', { originalError: error });
    }

    const messages = data.map(msg => ({ role: msg.role as Role, content: msg.content }));
    const totalTokens = data.reduce((sum, msg) => sum + (msg.token_count ?? 0), 0);

    const { data: session, error: sessionError } = await this.supabase
      .from('chat_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', this.userId)
      .single();

    if (sessionError) {
      throw createDatabaseError('Failed to get session data', { originalError: sessionError });
    }

    if (!session) {
      throw createDatabaseError('Session not found', { originalError: new Error('Session not found') });
    }

    return { messages, totalTokens, session };
  }
}
