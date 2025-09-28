import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/supabase/server';
import { ConversationManager } from '@/lib/chat/conversation-manager';
import { createAIProvider } from '@/lib/ai/ai-provider';
import {
  withErrorHandling,
  createValidationError,
} from '@/lib/middleware/error-handler';
import { logApiRequest, logInfo } from '@/lib/utils/logger';

// Initialize AI provider (can be easily switched)
const aiProvider = createAIProvider('placeholder');


export const POST = withErrorHandling(async (request: NextRequest) => {
  const startTime = Date.now();
  
  try {
    // Validate request
    const { messages, sessionId: clientSessionId, sessionType = 'general' } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw createValidationError('Messages array is required and cannot be empty.');
    }

    // Get authenticated user with proper server-side auth
    const { user, supabase } = await getServerUser();
    const userId = user.id;

    // Initialize conversation manager
    const conversationManager = new ConversationManager(supabase, userId);

    // Get or create session with validation
    const sessionId = await conversationManager.getOrCreateSession(
      clientSessionId,
      undefined,
      sessionType as 'practice' | 'tutoring' | 'review' | 'general'
    );

    // Get the latest user message
    const userMessage = messages[messages.length - 1];
    if (!userMessage.content?.trim()) {
      throw createValidationError('Message content cannot be empty.');
    }

    // Store user message with validation and sanitization
    await conversationManager.storeMessage(sessionId, 'user', userMessage.content);
    await logInfo(`User message stored for session ${sessionId}`, { 
      userId, 
      sessionId,
      messageLength: userMessage.content.length 
    });

    // Get conversation history for AI context
    const conversationContext = await conversationManager.getConversationHistory(sessionId, 10);
    
    // Generate AI response using the provider
    const aiResponse = await aiProvider.generateResponse(
      conversationContext.messages,
      {
        maxTokens: 1000,
        temperature: 0.7,
        model: 'placeholder-model'
      }
    );

    // Store AI response with metadata
    await conversationManager.storeMessage(sessionId, 'assistant', aiResponse.content, {
      tokenCount: aiResponse.tokenCount,
      modelName: aiResponse.modelName,
      responseTimeMs: aiResponse.responseTimeMs,
    });

    // Get updated conversation context after storing the AI response
    const updatedContext = await conversationManager.getConversationHistory(sessionId, 10);

    const totalTime = Date.now() - startTime;
    await logApiRequest('POST', '/api/chat', 200, totalTime, { 
      userId, 
      sessionId, 
      messageCount: messages.length,
      totalTokens: updatedContext.totalTokens,
      responseTime: aiResponse.responseTimeMs
    });
    
    return NextResponse.json({ 
      message: aiResponse.content,
      sessionId: sessionId,
      metadata: {
        tokenCount: aiResponse.tokenCount,
        modelName: aiResponse.modelName,
        responseTimeMs: aiResponse.responseTimeMs,
        totalTokens: updatedContext.totalTokens,
      }
    });

  } catch (error) {
    const totalTime = Date.now() - startTime;
    await logApiRequest('POST', '/api/chat', 500, totalTime, { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  }
});

export const GET = withErrorHandling(async (request: NextRequest) => {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!sessionId) {
      throw createValidationError('Session ID is required to fetch conversation history.');
    }

    // Get authenticated user
    const { user, supabase } = await getServerUser();
    const userId = user.id;

    // Initialize conversation manager
    const conversationManager = new ConversationManager(supabase, userId);

    // Get conversation history with performance optimizations
    const conversationContext = await conversationManager.getConversationHistory(sessionId, limit);

    const totalTime = Date.now() - startTime;
    await logApiRequest('GET', '/api/chat', 200, totalTime, { 
      userId, 
      sessionId, 
      messageCount: conversationContext.messages.length,
      totalTokens: conversationContext.totalTokens
    });

    return NextResponse.json({ 
      data: conversationContext.messages,
      session: conversationContext.session,
      metadata: {
        totalTokens: conversationContext.totalTokens,
        messageCount: conversationContext.messages.length,
      }
    });

  } catch (error) {
    const totalTime = Date.now() - startTime;
    await logApiRequest('GET', '/api/chat', 500, totalTime, { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  }
});
