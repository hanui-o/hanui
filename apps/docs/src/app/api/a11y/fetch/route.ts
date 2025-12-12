import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL이 필요합니다.' }, { status: 400 });
    }

    // Validate URL format
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      return NextResponse.json(
        { error: '올바른 URL 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // Fetch the URL
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; HanuiA11yChecker/1.0; +https://hanui.kr)',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `페이지를 가져올 수 없습니다. (HTTP ${response.status})` },
        { status: 400 }
      );
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return NextResponse.json(
        { error: 'HTML 페이지가 아닙니다.' },
        { status: 400 }
      );
    }

    const html = await response.text();

    // Limit HTML size (5MB max)
    if (html.length > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: '페이지가 너무 큽니다. (최대 5MB)' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      html,
      url: parsedUrl.href,
      contentType,
    });
  } catch (error) {
    console.error('A11y fetch error:', error);

    if (error instanceof Error && error.name === 'TimeoutError') {
      return NextResponse.json(
        { error: '요청 시간이 초과되었습니다. (10초)' },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: '페이지를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
