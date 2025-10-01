-- Migration: Add RPC function for updating chat session statistics
-- This function automatically updates session metadata when messages are stored

create or replace function update_chat_session_stats(
  p_session_id uuid,
  p_token_count int
)
returns void as $$
begin
  update chat_sessions
  set 
    total_messages = total_messages + 1,
    total_tokens = total_tokens + coalesce(p_token_count, 0),
    last_activity_at = now(),
    updated_at = now()
  where id = p_session_id;
end;
$$ language plpgsql;

-- Grant execute permission to authenticated users
grant execute on function update_chat_session_stats(uuid, int) to authenticated;
