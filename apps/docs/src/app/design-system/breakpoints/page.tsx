'use client';

import { Stack, Heading, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function BreakpointsPage() {
  return (
    <>
      <PageHeader
        title="Breakpoints"
        description="KRDS 기반 반응형 브레이크포인트 시스템"
      />

      <PageSection>
        <Heading level="h2" id="overview">
          개요
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>KRDS는 모바일 우선(Mobile First) 접근 방식을 따릅니다.</Body>
        </Stack>
      </PageSection>

      <PageSection>
        <Heading level="h2" id="breakpoint-scale">
          브레이크포인트 스케일
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <div className="space-y-3 mb-6">
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <code className="text-sm font-mono">sm: 360px~</code>
              <p className="text-sm text-krds-gray-70 mt-1">
                Small - 모바일 (기준 348px)
              </p>
            </div>
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <code className="text-sm font-mono">md: 768px~</code>
              <p className="text-sm text-krds-gray-70 mt-1">Medium - 태블릿</p>
            </div>
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <code className="text-sm font-mono">lg: 1024px~</code>
              <p className="text-sm text-krds-gray-70 mt-1">
                Large - 데스크톱 (기준 1200px)
              </p>
            </div>
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <code className="text-sm font-mono">xl: 1280px~</code>
              <p className="text-sm text-krds-gray-70 mt-1">
                XLarge - 큰 데스크톱
              </p>
            </div>
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <code className="text-sm font-mono">2xl: 1440px~</code>
              <p className="text-sm text-krds-gray-70 mt-1">
                XXLarge - 매우 큰 화면
              </p>
            </div>
          </div>
        </Stack>
      </PageSection>

      <PageSection>
        <Heading level="h2" id="example">
          반응형 그리드 예시
        </Heading>

        <Stack spacing="heading-tight" className="mt-2 md:mt-4">
          <ComponentPreview>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                1
              </div>
              <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                2
              </div>
              <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                3
              </div>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 모바일: 1열, 태블릿: 2열, 데스크톱: 3열 */}
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </Stack>
      </PageSection>

      {/* Reference */}
      <PageSection>
        <Heading level="h2" id="reference">
          참고 자료
        </Heading>

        <div className="space-y-3 mt-2 md:mt-4">
          <a
            href="https://www.krds.go.kr/html/site/style/style_05.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-krds-white border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
          >
            <h4 className="font-semibold mb-1">KRDS 레이아웃 가이드</h4>
            <p className="text-sm text-krds-gray-70">
              간격, 그리드, 브레이크포인트 기준
            </p>
          </a>
        </div>
      </PageSection>
    </>
  );
}
