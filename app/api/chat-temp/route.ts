// TEMPORARY IN-MEMORY CHAT API
// This file is a temporary solution to get chat working without database tables
// TODO: Remove this file once proper database tables are set up and use /api/chat

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// In-memory storage (will be lost on server restart)
const conversations = new Map<string, Array<{ role: string, content: string }>>();

export async function POST(request: NextRequest) {
    try {
        // Validate request
        const { messages, sessionId: clientSessionId } = await request.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { error: 'Messages array is required and cannot be empty.' },
                { status: 400 }
            );
        }

        // Get authenticated user with Clerk
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Create simple session ID for in-memory storage
        const sessionId = clientSessionId || `session_${userId}_${Date.now()}`;

        // Get the latest user message
        const userMessage = messages[messages.length - 1];
        if (!userMessage.content?.trim()) {
            return NextResponse.json(
                { error: 'Message content cannot be empty.' },
                { status: 400 }
            );
        }

        // Store conversation in memory
        if (!conversations.has(sessionId)) {
            conversations.set(sessionId, []);
        }
        const conversation = conversations.get(sessionId)!;
        conversation.push({ role: 'user', content: userMessage.content });

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
                // Store AI response in memory
                if (result.text) {
                    conversation.push({ role: 'assistant', content: result.text });
                }
            },
        });

        // Return streaming response with session metadata
        const response = result.toTextStreamResponse();
        response.headers.set('X-Session-ID', sessionId);
        response.headers.set('X-User-ID', userId);

        return response;

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' + error },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');

        if (!sessionId) {
            return NextResponse.json(
                { error: 'Session ID is required to fetch conversation history.' },
                { status: 400 }
            );
        }

        // Get authenticated user with Clerk
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Get conversation from memory
        const conversation = conversations.get(sessionId) || [];

        return NextResponse.json({
            data: conversation,
            session: { id: sessionId, user_id: userId },
            metadata: {
                messageCount: conversation.length,
            }
        });

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' + error },
            { status: 500 }
        );
    }
}
