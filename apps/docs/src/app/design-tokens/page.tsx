'use client';

import { Button, Input, Card, Stack, Heading, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function DesignTokensPage() {
  return (
    <>
      <PageHeader
        title="Design Tokens"
        description="KRDS 기반 디자인 토큰을 Tailwind CSS로 사용하는 방법"
      />

      {/* Overview */}
      <PageSection>
        <Heading level="h2" id="overview">
          개요
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <Body className="leading-relaxed">
            디자인 토큰은 색상, 간격, 타이포그래피 등 디자인 시스템의 기본
            단위입니다. HANUI는{' '}
            <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>를 따르는 디자인
            토큰을 제공하며, Tailwind CSS를 통해 쉽게 사용할 수 있습니다.
          </Body>
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
            <Body size="sm" className="text-blue-900 dark:text-blue-100">
              <strong>💡 Tip:</strong> 모든 토큰은 CSS 변수로도 사용 가능하며,
              네임스페이스는{' '}
              <code className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">
                --krds
              </code>
              로 시작합니다.
            </Body>
          </div>
        </Stack>
      </PageSection>

      {/* Spacing */}
      <PageSection>
        <Heading level="h2" id="spacing">
          Spacing (간격)
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            KRDS는 8-point grid system을 기반으로 합니다. 일관된 간격 사용으로
            시각적 리듬과 정렬을 유지할 수 있습니다.
          </Body>

          {/* Spacing Scale */}
          <Stack spacing="heading-tight">
            <Heading level="h3">간격 스케일</Heading>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
                <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded min-w-[80px]">
                  gap-3
                </code>
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{ width: '8px' }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  8px (0.5rem) - 작은 요소 간격
                </span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
                <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded min-w-[80px]">
                  gap-5
                </code>
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{ width: '16px' }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  16px (1rem) - 기본 간격
                </span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
                <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded min-w-[80px]">
                  gap-7
                </code>
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{ width: '24px' }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  24px (1.5rem) - 카드/섹션 간격
                </span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
                <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded min-w-[80px]">
                  gap-8
                </code>
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{ width: '32px' }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  32px (2rem) - 큰 섹션 간격
                </span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
                <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded min-w-[80px]">
                  gap-10
                </code>
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{ width: '40px' }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  40px (2.5rem) - 레이아웃 간격
                </span>
              </div>
            </div>
          </Stack>

          {/* Form Layout Example */}
          <Stack spacing="heading-tight">
            <Heading level="h3">폼 레이아웃 예시</Heading>
            <GuidelineSection type="do" title="세로 폼 - gap-5 (16px)">
              <ComponentPreview>
                <form className="flex flex-col gap-5 max-w-sm">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      이름
                    </label>
                    <Input placeholder="홍길동" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      이메일
                    </label>
                    <Input type="email" placeholder="example@email.com" />
                  </div>
                  <Button variant="primary">제출</Button>
                </form>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<form className="flex flex-col gap-5">
  <div>
    <label className="block text-sm font-medium mb-1.5">이름</label>
    <Input placeholder="홍길동" />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1.5">이메일</label>
    <Input type="email" placeholder="example@email.com" />
  </div>
  <Button variant="primary">제출</Button>
</form>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </GuidelineSection>
          </Stack>

          {/* Card Grid Example */}
          <Stack spacing="heading-tight">
            <Heading level="h3">카드 그리드 예시</Heading>
            <GuidelineSection type="do" title="카드 리스트 - gap-7 (24px)">
              <ComponentPreview>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <Card variant="default" padding="md">
                    <h4 className="font-semibold mb-2">카드 1</h4>
                    <p className="text-sm text-gray-600">카드 내용</p>
                  </Card>
                  <Card variant="default" padding="md">
                    <h4 className="font-semibold mb-2">카드 2</h4>
                    <p className="text-sm text-gray-600">카드 내용</p>
                  </Card>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<div className="grid grid-cols-2 gap-7">
  <Card variant="default" padding="md">
    <h4 className="font-semibold">카드 1</h4>
    <p className="text-sm">카드 내용</p>
  </Card>
  <Card variant="default" padding="md">
    <h4 className="font-semibold">카드 2</h4>
    <p className="text-sm">카드 내용</p>
  </Card>
</div>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </GuidelineSection>
          </Stack>

          {/* Padding */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Padding (내부 여백)</Heading>
            <Stack spacing="heading-content">
              <Body>
                컴포넌트 내부 여백은{' '}
                <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                  p-*
                </code>{' '}
                또는{' '}
                <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                  padding
                </code>{' '}
                prop을 사용합니다.
              </Body>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded min-w-[100px]">
                    p-4
                  </code>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    16px - Small padding
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded min-w-[100px]">
                    p-6
                  </code>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    24px - Medium padding (기본값)
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded min-w-[100px]">
                    p-8
                  </code>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    32px - Large padding
                  </span>
                </div>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </PageSection>

      {/* Typography */}
      <PageSection>
        <Heading level="h2" id="typography">
          Typography (타이포그래피)
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            KRDS는 Pretendard GOV 폰트를 기본으로 하며, 최소 16px 크기와 150%
            line-height를 권장합니다.
          </Body>

          {/* Heading Scale */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Heading Scale</Heading>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
                <code className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                  text-heading-xl
                </code>
                <h1 className="text-4xl font-bold">
                  40px / 700 - 페이지 제목 (h1)
                </h1>
              </div>
              <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
                <code className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                  text-heading-lg
                </code>
                <h2 className="text-3xl font-bold">
                  32px / 700 - 섹션 제목 (h2)
                </h2>
              </div>
              <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
                <code className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                  text-heading-md
                </code>
                <h3 className="text-2xl font-bold">
                  24px / 700 - 하위 섹션 제목 (h3)
                </h3>
              </div>
              <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
                <code className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                  text-heading-sm
                </code>
                <h4 className="text-lg font-bold">
                  19px / 700 - 카드 제목 (h4)
                </h4>
              </div>
            </div>
          </Stack>

          {/* Body Text */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Body Text</Heading>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
                <code className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                  text-body-lg
                </code>
                <p className="text-lg">
                  19px / 400 - 큰 본문 텍스트 (강조된 문단)
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
                <code className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                  text-body-md (기본값)
                </code>
                <p className="text-base">
                  17px / 400 - 기본 본문 텍스트 (가장 많이 사용)
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
                <code className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                  text-body-sm
                </code>
                <p className="text-sm">
                  15px / 400 - 작은 본문 텍스트 (보조 정보)
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
                <code className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                  text-body-xs
                </code>
                <p className="text-xs">
                  13px / 400 - 매우 작은 텍스트 (캡션, 라벨)
                </p>
              </div>
            </div>
          </Stack>

          {/* Typography Example */}
          <Stack spacing="heading-tight">
            <Heading level="h3">실제 사용 예시</Heading>
            <ComponentPreview>
              <article className="space-y-4">
                <h2 className="text-3xl font-bold">섹션 제목</h2>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  이것은 기본 본문 텍스트입니다. KRDS 기준에 따라 17px 크기와
                  150% line-height를 사용하여 최적의 가독성을 제공합니다.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  보조 정보는 작은 텍스트로 표시합니다. (15px)
                </p>
              </article>
            </ComponentPreview>
            <div className="mt-4">
              <CodeBlock
                code={`<article className="space-y-4">
  <h2 className="text-3xl font-bold">섹션 제목</h2>
  <p className="text-base text-gray-700 leading-relaxed">
    기본 본문 텍스트 (17px)
  </p>
  <p className="text-sm text-gray-600">
    보조 정보 (15px)
  </p>
</article>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Colors */}
      <PageSection>
        <Heading level="h2" id="colors">
          Colors (색상)
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            KRDS 색상 시스템은 접근성을 최우선으로 하며, WCAG 2.1 AA 기준을
            준수합니다.
          </Body>

          {/* Primary Colors */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Primary Colors</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-[#256ef4] text-white rounded-lg">
                <code className="text-sm block mb-2">bg-[#256ef4]</code>
                <p className="text-sm">Primary - 주요 상호작용</p>
              </div>
              <div className="p-4 bg-[#0b50d0] text-white rounded-lg">
                <code className="text-sm block mb-2">hover:bg-[#0b50d0]</code>
                <p className="text-sm">Primary Hover</p>
              </div>
            </div>
            <CodeBlock
              code={`<Button variant="primary">확인</Button>
// 또는
<button className="bg-[#256ef4] hover:bg-[#0b50d0] text-white">
  확인
</button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </Stack>

          {/* Gray Scale */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Gray Scale</Heading>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-4 p-3 bg-white rounded-lg">
                <div className="w-16 h-16 bg-white border border-gray-300 rounded"></div>
                <div>
                  <code className="text-sm">bg-white</code>
                  <p className="text-xs text-gray-600">배경색 (밝은 테마)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gray-50 border border-gray-300 rounded"></div>
                <div>
                  <code className="text-sm">bg-gray-50</code>
                  <p className="text-xs text-gray-600">보조 배경색</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg">
                <div className="w-16 h-16 bg-gray-100 border border-gray-300 rounded"></div>
                <div>
                  <code className="text-sm">bg-gray-100</code>
                  <p className="text-xs text-gray-600">비활성 배경</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 border border-gray-300 rounded"></div>
                <div>
                  <code className="text-sm">bg-gray-200</code>
                  <p className="text-xs text-gray-600">구분선, 테두리</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-600 rounded-lg">
                <div className="w-16 h-16 bg-gray-600 rounded"></div>
                <div>
                  <code className="text-sm text-white">text-gray-600</code>
                  <p className="text-xs text-gray-300">보조 텍스트</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-900 rounded-lg">
                <div className="w-16 h-16 bg-gray-900 rounded"></div>
                <div>
                  <code className="text-sm text-white">text-gray-900</code>
                  <p className="text-xs text-gray-300">본문 텍스트</p>
                </div>
              </div>
            </div>
          </Stack>

          {/* System Colors */}
          <Stack spacing="heading-tight">
            <Heading level="h3">System Colors</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <code className="text-sm text-red-700 block mb-2">
                  bg-red-50 / text-red-700
                </code>
                <p className="text-sm text-red-900">Danger - 오류, 삭제</p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <code className="text-sm text-yellow-700 block mb-2">
                  bg-yellow-50 / text-yellow-700
                </code>
                <p className="text-sm text-yellow-900">Warning - 경고, 주의</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <code className="text-sm text-green-700 block mb-2">
                  bg-green-50 / text-green-700
                </code>
                <p className="text-sm text-green-900">Success - 완료, 성공</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <code className="text-sm text-blue-700 block mb-2">
                  bg-blue-50 / text-blue-700
                </code>
                <p className="text-sm text-blue-900">Info - 정보, 안내</p>
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Border Radius */}
      <PageSection>
        <Heading level="h2" id="border-radius">
          Border Radius (모서리 둥글기)
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <Body>
            KRDS는 5단계의 border-radius를 제공하며, 최대 12px를 권장합니다.
          </Body>

          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-500 rounded-sm"></div>
              <div>
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  rounded-sm
                </code>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  4px - 작은 요소 (Badge, Tag)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-500 rounded-md"></div>
              <div>
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  rounded-md
                </code>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  6px - 기본값 (Button, Input)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-500 rounded-lg"></div>
              <div>
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  rounded-lg
                </code>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  10px - 큰 요소 (Card, Modal)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-500 rounded-xl"></div>
              <div>
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  rounded-xl
                </code>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  12px - 최대값
                </p>
              </div>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* Breakpoints */}
      <PageSection>
        <Heading level="h2" id="breakpoints">
          Breakpoints (반응형)
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>KRDS는 모바일 우선(Mobile First) 접근 방식을 따릅니다.</Body>

          <div className="space-y-3 mb-6">
            <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
              <code className="text-sm font-mono">sm: 360px~</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Small - 모바일 (기준 348px)
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
              <code className="text-sm font-mono">md: 768px~</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Medium - 태블릿
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
              <code className="text-sm font-mono">lg: 1024px~</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Large - 데스크톱 (기준 1200px)
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
              <code className="text-sm font-mono">xl: 1280px~</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                XLarge - 큰 데스크톱
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
              <code className="text-sm font-mono">2xl: 1440px~</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                XXLarge - 매우 큰 화면
              </p>
            </div>
          </div>

          <Stack spacing="heading-tight">
            <Heading level="h3">반응형 그리드 예시</Heading>
            <ComponentPreview>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">
                  1
                </div>
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">
                  2
                </div>
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">
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
        </Stack>
      </PageSection>

      {/* Best Practices */}
      <PageSection>
        <Heading level="h2" id="best-practices">
          모범 사례
        </Heading>

        <div className="space-y-6 mt-2 md:mt-4">
          <GuidelineSection type="do" title="일관된 간격 사용">
            <p className="mb-3">
              8-point grid system을 따라 gap-3, gap-5, gap-7 등을 일관되게
              사용하세요.
            </p>
            <CodeBlock
              code={`// 좋은 예
<div className="flex flex-col gap-5">
  <Input label="이름" />
  <Input label="이메일" />
</div>`}
              language="tsx"
              showLineNumbers={false}
            />
          </GuidelineSection>

          <GuidelineSection type="dont" title="임의의 값 지양">
            <p className="mb-3">
              임의의 간격 값(gap-[13px])은 디자인 시스템의 일관성을 해칩니다.
            </p>
            <CodeBlock
              code={`// 피해야 할 예
<div className="flex flex-col gap-[13px]">
  <Input />
  <Input />
</div>`}
              language="tsx"
              showLineNumbers={false}
            />
          </GuidelineSection>

          <GuidelineSection type="do" title="의미 있는 색상 사용">
            <p className="mb-3">System Colors를 올바른 의미로 사용하세요.</p>
            <CodeBlock
              code={`// Success는 긍정적 결과에
<Button variant="success">저장 완료</Button>

// Danger는 위험한 액션에
<Button variant="danger">삭제</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </GuidelineSection>

          <GuidelineSection type="do" title="접근성 고려">
            <p className="mb-3">
              최소 텍스트 크기(16px), 충분한 대비(4.5:1), 터치 타겟
              크기(44x44px)를 준수하세요.
            </p>
            <CodeBlock
              code={`// 최소 폰트 크기 16px
<p className="text-base">본문 텍스트</p>

// 충분한 색상 대비
<p className="text-gray-900 bg-white">높은 대비</p>

// 터치 타겟 크기
<Button size="md">최소 40px 높이</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </GuidelineSection>
        </div>
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
            className="block p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-[#256ef4] transition-colors"
          >
            <h4 className="font-semibold mb-1">KRDS 레이아웃 가이드</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              간격, 그리드, 브레이크포인트 기준
            </p>
          </a>
          <a
            href="https://www.krds.go.kr/html/site/style/style_03.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-[#256ef4] transition-colors"
          >
            <h4 className="font-semibold mb-1">KRDS 타이포그래피 가이드</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              폰트, 크기, line-height 기준
            </p>
          </a>
          <a
            href="https://www.krds.go.kr/html/site/style/style_02.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-[#256ef4] transition-colors"
          >
            <h4 className="font-semibold mb-1">KRDS 색상 시스템</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              색상 팔레트, 접근성 기준
            </p>
          </a>
        </div>
      </PageSection>
    </>
  );
}
