import { NextRequest, NextResponse } from 'next/server';
import { HANUI_SYSTEM_PROMPT } from '@/lib/ai/system-prompt';

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const { query } = await request.json();

    if (!query || query.trim().length < 5) {
      return NextResponse.json(
        { error: 'Query must be at least 5 characters' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: HANUI_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: query }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', errorText);
      return NextResponse.json(
        { error: 'AI search failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || '';

    return NextResponse.json({ result: content });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
