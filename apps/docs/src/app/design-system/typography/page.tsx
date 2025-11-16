'use client';

import { Stack, Heading, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function TypographyPage() {
  return (
    <>
      <PageHeader
        title="Typography"
        description="KRDS 기반 타이포그래피 시스템"
      />

      <PageSection>
        <Heading level="h2" id="overview">
          개요
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            KRDS는 Pretendard GOV 폰트를 기본으로 하며, 최소 16px 크기와 150%
            line-height를 권장합니다.
          </Body>
        </Stack>
      </PageSection>

      {/* Heading Scale */}
      <PageSection>
        <Heading level="h2" id="heading-scale">
          Heading Scale
        </Heading>

        <Stack spacing="heading-tight" className="mt-2 md:mt-4">
          <div className="space-y-4">
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <code className="text-sm text-krds-gray-70 mb-2 block">
                text-heading-xl
              </code>
              <h1 className="text-4xl font-bold">
                40px / 700 - 페이지 제목 (h1)
              </h1>
            </div>
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <code className="text-sm text-krds-gray-70 mb-2 block">
                text-heading-lg
              </code>
              <h2 className="text-3xl font-bold">
                32px / 700 - 섹션 제목 (h2)
              </h2>
            </div>
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <code className="text-sm text-krds-gray-70 mb-2 block">
                text-heading-md
              </code>
              <h3 className="text-2xl font-bold">
                24px / 700 - 하위 섹션 제목 (h3)
              </h3>
            </div>
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <code className="text-sm text-krds-gray-70 mb-2 block">
                text-heading-sm
              </code>
              <h4 className="text-lg font-bold">19px / 700 - 카드 제목 (h4)</h4>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* Body Text */}
      <PageSection>
        <Heading level="h2" id="body-text">
          Body Text
        </Heading>

        <Stack spacing="heading-tight" className="mt-2 md:mt-4">
          <div className="space-y-4">
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <code className="text-sm text-krds-gray-70 mb-2 block">
                text-body-lg
              </code>
              <p className="text-lg">
                19px / 400 - 큰 본문 텍스트 (강조된 문단)
              </p>
            </div>
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <code className="text-sm text-krds-gray-70 mb-2 block">
                text-body-md (기본값)
              </code>
              <p className="text-base">
                17px / 400 - 기본 본문 텍스트 (가장 많이 사용)
              </p>
            </div>
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <code className="text-sm text-krds-gray-70 mb-2 block">
                text-body-sm
              </code>
              <p className="text-sm">
                15px / 400 - 작은 본문 텍스트 (보조 정보)
              </p>
            </div>
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <code className="text-sm text-krds-gray-70 mb-2 block">
                text-body-xs
              </code>
              <p className="text-xs">
                13px / 400 - 매우 작은 텍스트 (캡션, 라벨)
              </p>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* Typography Example */}
      <PageSection>
        <Heading level="h2" id="example">
          실제 사용 예시
        </Heading>

        <Stack spacing="heading-tight" className="mt-2 md:mt-4">
          <ComponentPreview>
            <article className="space-y-4">
              <h2 className="text-3xl font-bold">섹션 제목</h2>
              <p className="text-base text-krds-gray-90 leading-relaxed">
                이것은 기본 본문 텍스트입니다. KRDS 기준에 따라 17px 크기와 150%
                line-height를 사용하여 최적의 가독성을 제공합니다.
              </p>
              <p className="text-sm text-krds-gray-70">
                보조 정보는 작은 텍스트로 표시합니다. (15px)
              </p>
            </article>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<article className="space-y-4">
  <h2 className="text-3xl font-bold">섹션 제목</h2>
  <p className="text-base text-krds-gray-90 leading-relaxed">
    기본 본문 텍스트 (17px)
  </p>
  <p className="text-sm text-krds-gray-70">
    보조 정보 (15px)
  </p>
</article>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </Stack>
      </PageSection>

      {/* Best Practices */}
      <PageSection>
        <Heading level="h2" id="best-practices">
          모범 사례
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <div className="space-y-6">
            <div className="p-4 bg-krds-white border border-krds-gray-20 rounded-lg">
              <h3 className="text-heading-sm font-semibold mb-2">
                ✅ 접근성 고려
              </h3>
              <p className="text-body-sm text-krds-gray-70 mb-3">
                최소 텍스트 크기(16px), 충분한 대비(4.5:1), 터치 타겟
                크기(44x44px)를 준수하세요.
              </p>
              <CodeBlock
                code={`// 최소 폰트 크기 16px
<p className="text-base">본문 텍스트</p>

// 충분한 색상 대비
<p className="text-krds-gray-90 bg-krds-white">높은 대비</p>

// 터치 타겟 크기
<Button size="md">최소 40px 높이</Button>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
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
            href="https://www.krds.go.kr/html/site/style/style_03.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-krds-white border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
          >
            <h4 className="font-semibold mb-1">KRDS 타이포그래피 가이드</h4>
            <p className="text-sm text-krds-gray-70">
              폰트, 크기, line-height 기준
            </p>
          </a>
        </div>
      </PageSection>
    </>
  );
}
