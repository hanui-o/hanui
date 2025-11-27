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
const koreanMessages: Record<
  string,
  { title: string; description: string; help: string }
> = {
  'color-contrast': {
    title: '색상 대비',
    description: '텍스트와 배경 간의 색상 대비가 충분하지 않습니다.',
    help: '텍스트 색상과 배경 색상의 대비율을 4.5:1 이상으로 조정하세요.',
  },
  'image-alt': {
    title: '이미지 대체 텍스트',
    description: '이미지에 대체 텍스트(alt)가 없습니다.',
    help: '<img> 태그에 alt 속성을 추가하세요. 장식용 이미지는 alt=""를 사용하세요.',
  },
  label: {
    title: '폼 레이블',
    description: '입력 필드에 연결된 레이블이 없습니다.',
    help: '<label> 태그의 for 속성과 입력 필드의 id를 연결하세요.',
  },
  'heading-order': {
    title: '제목 순서',
    description: '제목 태그의 순서가 올바르지 않습니다.',
    help: '제목은 h1 → h2 → h3 순서로 사용하세요. 단계를 건너뛰지 마세요.',
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
  'link-name': {
    title: '링크 텍스트',
    description: '링크에 접근 가능한 이름이 없습니다.',
    help: '링크에 의미 있는 텍스트를 추가하거나 aria-label을 사용하세요.',
  },
  'button-name': {
    title: '버튼 이름',
    description: '버튼에 접근 가능한 이름이 없습니다.',
    help: '버튼에 텍스트를 추가하거나 aria-label을 사용하세요.',
  },
  'aria-roles': {
    title: 'ARIA 역할',
    description: '유효하지 않은 ARIA role이 사용되었습니다.',
    help: '올바른 ARIA role 값을 사용하세요.',
  },
  tabindex: {
    title: '탭 순서',
    description: 'tabindex 값이 0보다 큽니다.',
    help: 'tabindex="0" 또는 tabindex="-1"만 사용하세요.',
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
  const [activeTab, setActiveTab] = useState('current');
  const [htmlInput, setHtmlInput] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runCheck = useCallback(async () => {
    setIsChecking(true);
    setError(null);
    setResults(null);

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
      } else {
        // Check pasted HTML
        if (!htmlInput.trim()) {
          setError('HTML 코드를 입력해주세요.');
          setIsChecking(false);
          return;
        }

        // Create a hidden iframe to check HTML
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(htmlInput);
          iframeDoc.close();

          const result = await axe.run(iframeDoc.body);
          setResults({
            violations: result.violations,
            passes: result.passes,
            incomplete: result.incomplete,
            inapplicable: result.inapplicable,
          });
        }

        document.body.removeChild(iframe);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '검사 중 오류가 발생했습니다.'
      );
    } finally {
      setIsChecking(false);
    }
  }, [activeTab, htmlInput]);

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
            <TabsTrigger value="current">현재 페이지 검사</TabsTrigger>
            <TabsTrigger value="html">HTML 붙여넣기</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <Body className="text-krds-gray-70 mb-4">
              현재 보고 있는 페이지의 접근성을 검사합니다.
            </Body>
          </TabsContent>

          <TabsContent value="html">
            <Textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="검사할 HTML 코드를 붙여넣으세요..."
              rows={10}
              className="font-mono text-sm mb-4"
            />
          </TabsContent>
        </Tabs>

        <Button onClick={runCheck} disabled={isChecking}>
          {isChecking ? '검사 중...' : '검사 시작'}
        </Button>
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
