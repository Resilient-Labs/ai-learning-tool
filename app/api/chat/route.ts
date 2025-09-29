import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/supabase/server';
import { ConversationManager } from '@/lib/chat/conversation-manager';
import {
  withErrorHandling,
  createValidationError,
} from '@/lib/middleware/error-handler';
import { logApiRequest, logInfo } from '@/lib/utils/logger';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';


export const POST = async (request: NextRequest) => {
  const startTime = Date.now();
  
  try {
    // Validate request
    const { messages, sessionId: clientSessionId, sessionType = 'general' } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required and cannot be empty.' }, { status: 400 });
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
      return NextResponse.json({ error: 'Message content cannot be empty.' }, { status: 400 });
    }

    // Store user message with validation and sanitization
    await conversationManager.storeMessage(sessionId, 'user', userMessage.content);
    await logInfo(`User message stored for session ${sessionId}`, { 
      userId, 
      sessionId,
      messageLength: userMessage.content.length 
    });

    // AI response using Vercel AI SDK with OpenAI streaming
    const result = await streamText({
      model: openai('gpt-4o'),
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content
      })),
      system: `You are an AI tutor for Resilient Coders students learning full-stack JavaScript development. 
      
      Your role is to:
      - Provide clear, helpful explanations about JavaScript, React, TypeScript, HTML, CSS, and web development concepts
      - Break down complex topics into digestible parts
      - Give practical examples and code snippets when helpful
      - Encourage learning and problem-solving
      - Adapt your explanations to the student's level of understanding
      - Ask follow-up questions to ensure comprehension
      
      Keep your responses focused on web development topics and maintain an encouraging, supportive tone.`,
      onFinish: async (result) => {
        // Store AI response with metadata when streaming is complete
        if (result.text) {
          await conversationManager.storeMessage(sessionId, 'assistant', result.text, {
            tokenCount: result.usage?.totalTokens || 0,
            modelName: 'gpt-4o',
            responseTimeMs: Date.now() - startTime,
          });

          // Log completion
          const updatedContext = await conversationManager.getConversationHistory(sessionId, 10);
          const totalTime = Date.now() - startTime;
          await logApiRequest('POST', '/api/chat', 200, totalTime, { 
            userId, 
            sessionId, 
            messageCount: messages.length,
            totalTokens: updatedContext.totalTokens,
            responseTime: totalTime
          });
        }
      },
    });

    // Return streaming response with session metadata
    const response = result.toTextStreamResponse();
    response.headers.set('X-Session-ID', sessionId);
    response.headers.set('X-User-ID', userId);
    
    return response;

  } catch (error) {
    const totalTime = Date.now() - startTime;
    await logApiRequest('POST', '/api/chat', 500, totalTime, { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    
    console.error('Chat API error:', error);
    
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
      }
      if (error.message.includes('quota')) {
        return NextResponse.json({ error: 'API quota exceeded' }, { status: 429 });
      }
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};

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
