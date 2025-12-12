'use client';

import { useState, useCallback } from 'react';
import {
  Container,
  Heading,
  Body,
  Button,
  Card,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Textarea,
} from '@hanui/react';
import axe, { type Result, type NodeResult } from 'axe-core';

// WCAG to KWCAG mapping and Korean translations
interface A11yMessage {
  title: string;
  description: string;
  help: string;
  hanui?: string; // HANUI 컴포넌트 추천
}

const koreanMessages: Record<string, A11yMessage> = {
  // 인식의 용이성 (Perceivable)
  'color-contrast': {
    title: '색상 대비',
    description: '텍스트와 배경 간의 색상 대비가 충분하지 않습니다.',
    help: '텍스트 색상과 배경 색상의 대비율을 4.5:1 이상으로 조정하세요.',
    hanui: 'HANUI의 Body, Heading 컴포넌트는 WCAG AA 기준을 충족합니다.',
  },
  'color-contrast-enhanced': {
    title: '색상 대비 (강화)',
    description: '텍스트와 배경 간의 색상 대비가 AAA 기준을 충족하지 않습니다.',
    help: '대비율을 7:1 이상으로 조정하세요.',
  },
  'image-alt': {
    title: '이미지 대체 텍스트',
    description: '이미지에 대체 텍스트(alt)가 없습니다.',
    help: '<img> 태그에 alt 속성을 추가하세요. 장식용 이미지는 alt=""를 사용하세요.',
    hanui: 'HANUI Image 컴포넌트는 alt 속성을 필수로 요구합니다.',
  },
  'image-redundant-alt': {
    title: '중복 대체 텍스트',
    description: '이미지의 alt 텍스트가 주변 텍스트와 중복됩니다.',
    help: '이미지 alt는 주변 텍스트와 다른 정보를 제공해야 합니다.',
  },
  'input-image-alt': {
    title: '이미지 입력 대체 텍스트',
    description: 'type="image"인 입력 요소에 alt 속성이 없습니다.',
    help: '이미지 버튼에 alt 속성을 추가하세요.',
  },
  'object-alt': {
    title: 'object 대체 텍스트',
    description: '<object> 요소에 대체 텍스트가 없습니다.',
    help: '<object> 내부에 대체 콘텐츠를 제공하세요.',
  },
  'svg-img-alt': {
    title: 'SVG 대체 텍스트',
    description: 'role="img"인 SVG에 접근 가능한 이름이 없습니다.',
    help: 'SVG에 title 요소 또는 aria-label을 추가하세요.',
  },
  'video-caption': {
    title: '비디오 자막',
    description: '비디오에 자막이 없습니다.',
    help: '<track kind="captions">를 추가하여 자막을 제공하세요.',
  },
  'audio-caption': {
    title: '오디오 대체 콘텐츠',
    description: '오디오 콘텐츠에 대체 텍스트가 없습니다.',
    help: '오디오 내용을 설명하는 텍스트 대본을 제공하세요.',
  },

  // 운용의 용이성 (Operable)
  label: {
    title: '폼 레이블',
    description: '입력 필드에 연결된 레이블이 없습니다.',
    help: '<label> 태그의 for 속성과 입력 필드의 id를 연결하세요.',
    hanui: 'HANUI FormField 컴포넌트는 자동으로 레이블을 연결합니다.',
  },
  'input-button-name': {
    title: '입력 버튼 이름',
    description: '입력 버튼에 접근 가능한 이름이 없습니다.',
    help: 'value 속성 또는 aria-label을 추가하세요.',
  },
  'button-name': {
    title: '버튼 이름',
    description: '버튼에 접근 가능한 이름이 없습니다.',
    help: '버튼에 텍스트를 추가하거나 aria-label을 사용하세요.',
    hanui: 'HANUI Button 컴포넌트에 children 또는 aria-label을 전달하세요.',
  },
  'link-name': {
    title: '링크 텍스트',
    description: '링크에 접근 가능한 이름이 없습니다.',
    help: '링크에 의미 있는 텍스트를 추가하거나 aria-label을 사용하세요.',
    hanui: 'HANUI Link 컴포넌트에 의미 있는 텍스트를 전달하세요.',
  },
  'link-in-text-block': {
    title: '링크 구분',
    description: '텍스트 블록 내 링크가 색상만으로 구분됩니다.',
    help: '밑줄이나 다른 시각적 단서를 추가하세요.',
  },
  'focus-visible': {
    title: '포커스 표시',
    description: '키보드 포커스가 보이지 않습니다.',
    help: ':focus-visible 스타일을 추가하세요.',
    hanui: 'HANUI 컴포넌트는 기본적으로 포커스 스타일을 제공합니다.',
  },
  'focus-order-semantics': {
    title: '포커스 순서',
    description: '포커스 순서가 논리적이지 않습니다.',
    help: 'DOM 순서를 논리적으로 재배치하세요.',
  },
  tabindex: {
    title: '탭 순서',
    description: 'tabindex 값이 0보다 큽니다.',
    help: 'tabindex="0" 또는 tabindex="-1"만 사용하세요.',
  },
  'skip-link': {
    title: '건너뛰기 링크',
    description: '본문 바로가기 링크가 없습니다.',
    help: '페이지 상단에 "본문 바로가기" 링크를 추가하세요.',
    hanui: 'HANUI Skiplink 컴포넌트를 사용하세요.',
  },
  bypass: {
    title: '반복 영역 건너뛰기',
    description: '반복되는 콘텐츠 블록을 건너뛸 수 있는 방법이 없습니다.',
    help: '건너뛰기 링크 또는 랜드마크를 추가하세요.',
    hanui: 'HANUI Skiplink 컴포넌트를 사용하세요.',
  },
  'scrollable-region-focusable': {
    title: '스크롤 영역 포커스',
    description: '스크롤 가능한 영역이 키보드로 접근할 수 없습니다.',
    help: 'tabindex="0"를 추가하세요.',
  },

  // 이해의 용이성 (Understandable)
  'heading-order': {
    title: '제목 순서',
    description: '제목 태그의 순서가 올바르지 않습니다.',
    help: '제목은 h1 → h2 → h3 순서로 사용하세요. 단계를 건너뛰지 마세요.',
    hanui: 'HANUI Heading 컴포넌트의 level prop을 순서대로 사용하세요.',
  },
  'empty-heading': {
    title: '빈 제목',
    description: '제목 요소에 텍스트가 없습니다.',
    help: '제목에 의미 있는 텍스트를 추가하세요.',
  },
  'page-has-heading-one': {
    title: 'h1 제목 필요',
    description: '페이지에 h1 제목이 없습니다.',
    help: '페이지 제목으로 h1을 추가하세요.',
  },
  'document-title': {
    title: '문서 제목',
    description: '페이지에 <title> 태그가 없습니다.',
    help: '<head> 내에 의미 있는 <title>을 추가하세요.',
  },
  'html-has-lang': {
    title: 'HTML 언어 속성',
    description: '<html> 태그에 lang 속성이 없습니다.',
    help: '<html lang="ko">를 추가하세요.',
  },
  'html-lang-valid': {
    title: 'HTML 언어 유효성',
    description: 'lang 속성값이 유효하지 않습니다.',
    help: '유효한 언어 코드(예: ko, en)를 사용하세요.',
  },
  'valid-lang': {
    title: '유효한 언어 코드',
    description: 'lang 속성에 유효하지 않은 언어 코드가 사용되었습니다.',
    help: 'BCP 47 언어 코드를 사용하세요.',
  },
  'autocomplete-valid': {
    title: '자동완성 속성',
    description: 'autocomplete 속성값이 유효하지 않습니다.',
    help: '올바른 autocomplete 값(예: name, email)을 사용하세요.',
  },

  // 견고성 (Robust)
  'aria-roles': {
    title: 'ARIA 역할',
    description: '유효하지 않은 ARIA role이 사용되었습니다.',
    help: '올바른 ARIA role 값을 사용하세요.',
  },
  'aria-valid-attr': {
    title: 'ARIA 속성 유효성',
    description: '유효하지 않은 ARIA 속성이 사용되었습니다.',
    help: '올바른 ARIA 속성명을 사용하세요.',
  },
  'aria-valid-attr-value': {
    title: 'ARIA 속성값 유효성',
    description: 'ARIA 속성값이 유효하지 않습니다.',
    help: '올바른 ARIA 속성값을 사용하세요.',
  },
  'aria-allowed-attr': {
    title: 'ARIA 속성 허용',
    description: '해당 요소에 허용되지 않은 ARIA 속성이 사용되었습니다.',
    help: '요소의 역할에 맞는 ARIA 속성만 사용하세요.',
  },
  'aria-required-attr': {
    title: 'ARIA 필수 속성',
    description: 'ARIA 역할에 필요한 속성이 누락되었습니다.',
    help: '역할에 필요한 모든 ARIA 속성을 추가하세요.',
  },
  'aria-required-children': {
    title: 'ARIA 필수 자식 요소',
    description: 'ARIA 역할에 필요한 자식 요소가 없습니다.',
    help: '역할에 맞는 자식 요소를 추가하세요.',
  },
  'aria-required-parent': {
    title: 'ARIA 필수 부모 요소',
    description: 'ARIA 역할에 필요한 부모 요소가 없습니다.',
    help: '올바른 부모 요소 내에 배치하세요.',
  },
  'aria-hidden-focus': {
    title: 'aria-hidden 포커스',
    description: 'aria-hidden="true"인 요소에 포커스 가능한 요소가 있습니다.',
    help: '숨겨진 영역 내 포커스 가능한 요소를 제거하거나 tabindex="-1"을 추가하세요.',
  },
  'aria-hidden-body': {
    title: 'body aria-hidden',
    description: '<body>에 aria-hidden="true"가 설정되어 있습니다.',
    help: '<body>에서 aria-hidden을 제거하세요.',
  },
  'duplicate-id': {
    title: '중복 ID',
    description: '동일한 id 속성이 여러 요소에 사용되었습니다.',
    help: 'id는 페이지 내에서 고유해야 합니다.',
  },
  'duplicate-id-active': {
    title: '중복 ID (활성 요소)',
    description: '활성 요소에 중복된 id가 사용되었습니다.',
    help: 'id를 고유하게 변경하세요.',
  },
  'duplicate-id-aria': {
    title: '중복 ID (ARIA)',
    description: 'ARIA로 참조되는 요소에 중복된 id가 있습니다.',
    help: 'ARIA 참조용 id를 고유하게 변경하세요.',
  },

  // 폼 관련
  'select-name': {
    title: '선택 요소 이름',
    description: '<select> 요소에 접근 가능한 이름이 없습니다.',
    help: '레이블을 연결하거나 aria-label을 추가하세요.',
    hanui: 'HANUI Select 컴포넌트를 사용하세요.',
  },
  'form-field-multiple-labels': {
    title: '다중 레이블',
    description: '하나의 입력 필드에 여러 레이블이 연결되어 있습니다.',
    help: '각 입력 필드에는 하나의 레이블만 연결하세요.',
  },

  // 테이블 관련
  'td-headers-attr': {
    title: '테이블 헤더 참조',
    description: 'headers 속성이 존재하지 않는 id를 참조합니다.',
    help: 'headers 속성값을 올바른 th id로 수정하세요.',
  },
  'th-has-data-cells': {
    title: '테이블 헤더 데이터',
    description: '<th> 요소에 연결된 데이터 셀이 없습니다.',
    help: '테이블 구조를 확인하세요.',
  },
  'table-fake-caption': {
    title: '테이블 캡션',
    description: '테이블 캡션이 올바르게 구현되지 않았습니다.',
    help: '<caption> 요소를 사용하세요.',
    hanui: 'HANUI Table 컴포넌트의 caption prop을 사용하세요.',
  },

  // 기타
  'landmark-one-main': {
    title: 'main 랜드마크',
    description: '페이지에 main 랜드마크가 없거나 여러 개입니다.',
    help: '페이지에 <main> 또는 role="main"을 하나만 사용하세요.',
  },
  'landmark-no-duplicate-banner': {
    title: '중복 banner',
    description: '페이지에 banner 랜드마크가 여러 개 있습니다.',
    help: '<header>는 페이지당 하나만 사용하세요.',
  },
  'landmark-no-duplicate-contentinfo': {
    title: '중복 contentinfo',
    description: '페이지에 contentinfo 랜드마크가 여러 개 있습니다.',
    help: '<footer>는 페이지당 하나만 사용하세요.',
  },
  region: {
    title: '랜드마크 영역',
    description: '콘텐츠가 랜드마크 영역 내에 있지 않습니다.',
    help: '모든 콘텐츠를 랜드마크(main, nav, aside 등) 내에 배치하세요.',
  },
  'meta-viewport': {
    title: '뷰포트 확대',
    description: 'meta viewport가 확대/축소를 비활성화합니다.',
    help: 'user-scalable=no를 제거하고 maximum-scale을 1 이상으로 설정하세요.',
  },
  'meta-refresh': {
    title: '자동 새로고침',
    description: 'meta refresh가 페이지를 자동으로 새로고침합니다.',
    help: '자동 새로고침을 제거하거나 사용자가 제어할 수 있게 하세요.',
  },
  blink: {
    title: '깜빡임 요소',
    description: '<blink> 요소가 사용되었습니다.',
    help: '<blink> 요소를 제거하세요.',
  },
  marquee: {
    title: '움직이는 텍스트',
    description: '<marquee> 요소가 사용되었습니다.',
    help: '<marquee> 요소를 제거하세요.',
  },
};

function getKoreanMessage(ruleId: string) {
  return (
    koreanMessages[ruleId] || {
      title: ruleId,
      description: '',
      help: '',
    }
  );
}

interface CheckResult {
  violations: Result[];
  passes: Result[];
  incomplete: Result[];
  inapplicable: Result[];
}

export default function A11yCheckerPage() {
  const [activeTab, setActiveTab] = useState('url');
  const [htmlInput, setHtmlInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkedUrl, setCheckedUrl] = useState<string | null>(null);

  const checkHtmlInIframe = async (html: string) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    try {
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();

        const result = await axe.run(iframeDoc.body);
        return {
          violations: result.violations,
          passes: result.passes,
          incomplete: result.incomplete,
          inapplicable: result.inapplicable,
        };
      }
      throw new Error('iframe 생성 실패');
    } finally {
      document.body.removeChild(iframe);
    }
  };

  const runCheck = useCallback(async () => {
    setIsChecking(true);
    setError(null);
    setResults(null);
    setCheckedUrl(null);

    try {
      if (activeTab === 'current') {
        // Check current page
        const result = await axe.run(document.body);
        setResults({
          violations: result.violations,
          passes: result.passes,
          incomplete: result.incomplete,
          inapplicable: result.inapplicable,
        });
      } else if (activeTab === 'url') {
        // Check external URL
        if (!urlInput.trim()) {
          setError('URL을 입력해주세요.');
          setIsChecking(false);
          return;
        }

        // Fetch HTML from URL via API
        const response = await fetch('/api/a11y/fetch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: urlInput.trim() }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || '페이지를 가져올 수 없습니다.');
          setIsChecking(false);
          return;
        }

        setCheckedUrl(data.url);
        const checkResult = await checkHtmlInIframe(data.html);
        setResults(checkResult);
      } else {
        // Check pasted HTML
        if (!htmlInput.trim()) {
          setError('HTML 코드를 입력해주세요.');
          setIsChecking(false);
          return;
        }

        const checkResult = await checkHtmlInIframe(htmlInput);
        setResults(checkResult);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '검사 중 오류가 발생했습니다.'
      );
    } finally {
      setIsChecking(false);
    }
  }, [activeTab, htmlInput, urlInput]);

  const getImpactColor = (impact?: string | null) => {
    switch (impact) {
      case 'critical':
        return 'text-krds-danger-60 bg-krds-danger-5';
      case 'serious':
        return 'text-krds-danger-50 bg-krds-danger-5';
      case 'moderate':
        return 'text-krds-warning-60 bg-krds-warning-5';
      case 'minor':
        return 'text-krds-info-60 bg-krds-info-5';
      default:
        return 'text-krds-gray-60 bg-krds-gray-5';
    }
  };

  const getImpactLabel = (impact?: string | null) => {
    switch (impact) {
      case 'critical':
        return '심각';
      case 'serious':
        return '높음';
      case 'moderate':
        return '중간';
      case 'minor':
        return '낮음';
      default:
        return '-';
    }
  };

  return (
    <Container className="py-12">
      {/* Header */}
      <div className="mb-8">
        <Heading level="h1" className="mb-2">
          웹접근성 검사기
        </Heading>
        <Body className="text-krds-gray-70">
          KWCAG 2.2 기준으로 웹페이지의 접근성을 검사합니다 (axe-core 엔진 사용)
        </Body>
      </div>

      {/* Input Section */}
      <Card className="p-6 mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="url">URL 검사</TabsTrigger>
            <TabsTrigger value="current">현재 페이지</TabsTrigger>
            <TabsTrigger value="html">HTML 붙여넣기</TabsTrigger>
          </TabsList>

          <TabsContent value="url">
            <div className="space-y-4">
              <Body className="text-krds-gray-70">
                웹사이트 URL을 입력하면 접근성을 검사합니다.
              </Body>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 px-4 py-2 border border-krds-gray-20 rounded-md focus:outline-none focus:ring-2 focus:ring-krds-primary-50 focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isChecking) {
                      runCheck();
                    }
                  }}
                />
                <Button onClick={runCheck} disabled={isChecking}>
                  {isChecking ? '검사 중...' : '검사'}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="current">
            <Body className="text-krds-gray-70 mb-4">
              현재 보고 있는 페이지의 접근성을 검사합니다.
            </Body>
            <Button onClick={runCheck} disabled={isChecking}>
              {isChecking ? '검사 중...' : '검사 시작'}
            </Button>
          </TabsContent>

          <TabsContent value="html">
            <Textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="검사할 HTML 코드를 붙여넣으세요..."
              rows={10}
              className="font-mono text-sm mb-4"
            />
            <Button onClick={runCheck} disabled={isChecking}>
              {isChecking ? '검사 중...' : '검사 시작'}
            </Button>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Error */}
      {error && (
        <Card className="p-4 mb-8 border-krds-danger-30 bg-krds-danger-5">
          <Body className="text-krds-danger-60">{error}</Body>
        </Card>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-8">
          {/* Checked URL */}
          {checkedUrl && (
            <Card className="p-4 bg-krds-gray-5">
              <Body className="text-sm text-krds-gray-60">검사 대상</Body>
              <a
                href={checkedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-krds-primary-60 hover:underline break-all"
              >
                {checkedUrl}
              </a>
            </Card>
          )}

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-6 text-center border-krds-danger-30">
              <div className="text-3xl font-bold text-krds-danger-60 mb-2">
                {results.violations.length}
              </div>
              <Body className="text-krds-gray-70">오류</Body>
            </Card>
            <Card className="p-6 text-center border-krds-warning-30">
              <div className="text-3xl font-bold text-krds-warning-60 mb-2">
                {results.incomplete.length}
              </div>
              <Body className="text-krds-gray-70">검토 필요</Body>
            </Card>
            <Card className="p-6 text-center border-krds-success-30">
              <div className="text-3xl font-bold text-krds-success-60 mb-2">
                {results.passes.length}
              </div>
              <Body className="text-krds-gray-70">통과</Body>
            </Card>
          </div>

          {/* Violations */}
          {results.violations.length > 0 && (
            <div>
              <Heading level="h2" className="mb-4 flex items-center gap-2">
                <span className="text-krds-danger-60">❌</span> 오류 (
                {results.violations.length}건)
              </Heading>
              <div className="space-y-4">
                {results.violations.map((violation, idx) => {
                  const korean = getKoreanMessage(violation.id);
                  return (
                    <Card
                      key={idx}
                      className="p-4 border-l-4 border-l-krds-danger-50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Heading level="h3" className="text-lg">
                          {korean.title || violation.id}
                        </Heading>
                        <span
                          className={`px-2 py-1 text-xs rounded ${getImpactColor(violation.impact)}`}
                        >
                          {getImpactLabel(violation.impact)}
                        </span>
                      </div>
                      <Body className="text-krds-gray-70 mb-3">
                        {korean.description || violation.description}
                      </Body>
                      <div className="bg-krds-gray-5 p-3 rounded mb-3">
                        <Body className="text-sm font-medium mb-1">
                          수정 방법:
                        </Body>
                        <Body className="text-sm text-krds-gray-70">
                          {korean.help || violation.help}
                        </Body>
                      </div>
                      {korean.hanui && (
                        <div className="bg-krds-primary-5 border border-krds-primary-20 p-3 rounded mb-3">
                          <Body className="text-sm font-medium text-krds-primary-70 mb-1">
                            💡 HANUI 추천:
                          </Body>
                          <Body className="text-sm text-krds-primary-60">
                            {korean.hanui}
                          </Body>
                        </div>
                      )}
                      <div className="text-sm text-krds-gray-60">
                        <span className="font-medium">영향 요소: </span>
                        {violation.nodes.length}개
                        {violation.nodes
                          .slice(0, 3)
                          .map((node: NodeResult, nodeIdx: number) => (
                            <code
                              key={nodeIdx}
                              className="block mt-1 p-2 bg-krds-gray-5 rounded text-xs overflow-x-auto"
                            >
                              {node.html.substring(0, 100)}
                              {node.html.length > 100 ? '...' : ''}
                            </code>
                          ))}
                        {violation.nodes.length > 3 && (
                          <Body className="text-xs text-krds-gray-50 mt-1">
                            ... 외 {violation.nodes.length - 3}개
                          </Body>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Incomplete */}
          {results.incomplete.length > 0 && (
            <div>
              <Heading level="h2" className="mb-4 flex items-center gap-2">
                <span className="text-krds-warning-60">⚠️</span> 검토 필요 (
                {results.incomplete.length}건)
              </Heading>
              <div className="space-y-4">
                {results.incomplete.map((item, idx) => {
                  const korean = getKoreanMessage(item.id);
                  return (
                    <Card
                      key={idx}
                      className="p-4 border-l-4 border-l-krds-warning-50"
                    >
                      <Heading level="h3" className="text-lg mb-2">
                        {korean.title || item.id}
                      </Heading>
                      <Body className="text-krds-gray-70">
                        {korean.description || item.description}
                      </Body>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Passes */}
          {results.passes.length > 0 && (
            <div>
              <Heading level="h2" className="mb-4 flex items-center gap-2">
                <span className="text-krds-success-60">✅</span> 통과 (
                {results.passes.length}건)
              </Heading>
              <Card className="p-4">
                <div className="flex flex-wrap gap-2">
                  {results.passes.map((pass, idx) => {
                    const korean = getKoreanMessage(pass.id);
                    return (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-krds-success-5 text-krds-success-60 rounded text-sm"
                      >
                        {korean.title || pass.id}
                      </span>
                    );
                  })}
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <Card className="p-4 mt-8 bg-krds-info-5 border-krds-info-30">
        <Heading level="h4" className="mb-2 text-krds-info-70">
          검사 기준
        </Heading>
        <ul className="text-sm text-krds-gray-70 space-y-1">
          <li>• WCAG 2.1 Level AA (axe-core 기본 규칙)</li>
          <li>• KWCAG 2.2 한국 웹접근성 지침 매핑</li>
          <li>• 클라이언트 사이드 검사 (JavaScript 렌더링 후 상태)</li>
        </ul>
      </Card>
    </Container>
  );
}
