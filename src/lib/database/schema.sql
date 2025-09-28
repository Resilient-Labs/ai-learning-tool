-- AI Learning Tool Database Schema
-- Engineer 12: Conversation History Storage

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_sessions table for tracking AI tutoring sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) DEFAULT 'New Chat Session',
  session_type VARCHAR(50) DEFAULT 'general' CHECK (session_type IN ('practice', 'tutoring', 'review', 'general')),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  total_messages INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  session_duration_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_messages table for storing conversation history
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  token_count INTEGER DEFAULT 0,
  model_name VARCHAR(100),
  response_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_sessions table for tracking user activity
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_type VARCHAR(50) NOT NULL CHECK (session_type IN ('login', 'learning', 'chat', 'community')),
  duration_seconds INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  actions_count INTEGER DEFAULT 0,
  device_type VARCHAR(50),
  browser VARCHAR(100),
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Create analytics_events table for tracking user behavior and errors
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  event_type VARCHAR(100) NOT NULL,
  event_category VARCHAR(100) NOT NULL,
  event_data JSONB,
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create instructor_analytics view for admin dashboard
CREATE OR REPLACE VIEW instructor_analytics AS
SELECT 
  u.id as user_id,
  u.display_name,
  u.created_at as user_created_at,
  u.role,
  COUNT(DISTINCT cs.id) as total_chat_sessions,
  COUNT(DISTINCT cm.id) as total_messages,
  COALESCE(SUM(cs.total_tokens), 0) as total_tokens_used,
  COALESCE(AVG(cs.session_duration_seconds), 0) as avg_session_duration,
  MAX(cs.last_activity_at) as last_chat_activity,
  COUNT(DISTINCT us.id) as total_sessions,
  MAX(us.created_at) as last_activity
FROM users u
LEFT JOIN chat_sessions cs ON u.id = cs.user_id
LEFT JOIN chat_messages cm ON cs.id = cm.session_id
LEFT JOIN user_sessions us ON u.id = us.user_id
GROUP BY u.id, u.display_name, u.created_at, u.role;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON chat_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_created_at ON user_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);

-- Create RPC function for updating chat session statistics
-- This function is called manually from the application for better control
CREATE OR REPLACE FUNCTION update_chat_session_stats(
  p_session_id uuid,
  p_token_count int
)
RETURNS void AS $$
BEGIN
  UPDATE chat_sessions
  SET 
    total_messages = total_messages + 1,
    total_tokens = total_tokens + COALESCE(p_token_count, 0),
    last_activity_at = NOW(),
    updated_at = NOW()
  WHERE id = p_session_id;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_chat_session_stats(uuid, int) TO authenticated;

-- Create function to track user sessions
CREATE OR REPLACE FUNCTION track_user_session(
  p_user_id UUID,
  p_session_type VARCHAR(50),
  p_duration_seconds INTEGER DEFAULT 0,
  p_page_views INTEGER DEFAULT 0,
  p_actions_count INTEGER DEFAULT 0,
  p_device_type VARCHAR(50) DEFAULT NULL,
  p_browser VARCHAR(100) DEFAULT NULL,
  p_ip_address INET DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  session_id UUID;
BEGIN
  INSERT INTO user_sessions (
    user_id, session_type, duration_seconds, page_views, 
    actions_count, device_type, browser, ip_address
  ) VALUES (
    p_user_id, p_session_type, p_duration_seconds, p_page_views,
    p_actions_count, p_device_type, p_browser, p_ip_address
  ) RETURNING id INTO session_id;
  
  RETURN session_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to track analytics events
CREATE OR REPLACE FUNCTION track_analytics_event(
  p_user_id UUID,
  p_event_type VARCHAR(100),
  p_event_category VARCHAR(100),
  p_event_data JSONB DEFAULT NULL,
  p_page_url TEXT DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_ip_address INET DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  event_id UUID;
BEGIN
  INSERT INTO analytics_events (
    user_id, event_type, event_category, event_data,
    page_url, referrer, user_agent, ip_address
  ) VALUES (
    p_user_id, p_event_type, p_event_category, p_event_data,
    p_page_url, p_referrer, p_user_agent, p_ip_address
  ) RETURNING id INTO event_id;
  
  RETURN event_id;
END;
$$ LANGUAGE plpgsql;
