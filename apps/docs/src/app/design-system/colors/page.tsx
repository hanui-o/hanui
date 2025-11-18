'use client';

import { Stack, Heading, Body } from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { CircleX, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ColorsPage() {
  return (
    <>
      <PageHeader
        title="Colors"
        description="KRDS 색상 시스템을 Tailwind CSS로 사용하는 방법"
      />

      <PageSection>
        {/* Quick Summary */}
        <Stack spacing="heading-tight">
          <Heading level="h3">빠른 요약</Heading>
          <Body>
            <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">krds-</code>{' '}
            접두사를 사용하여 Tailwind 기본 색상과 KRDS 색상을 구분합니다.
          </Body>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
              <Heading level="h4" className="mb-2">
                Tailwind 기본 색상
              </Heading>
              <Body size="sm" className="mt-2">
                예:{' '}
                <code className="px-1.5 py-0.5 bg-krds-white rounded">
                  bg-gray-50
                </code>
              </Body>
            </div>
            <div className="p-4 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
              <Heading level="h4" className="mb-2">
                KRDS 색상 (krds- 접두사)
              </Heading>
              <Body size="sm" className="mt-2">
                예:{' '}
                <code className="px-1.5 py-0.5 bg-krds-white rounded">
                  bg-krds-gray-50
                </code>
              </Body>
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* Overview */}
      <PageSection>
        <Heading level="h2" id="overview">
          개요
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            HANUI는 KRDS(대한민국 디자인 시스템) 색상 시스템을 Tailwind CSS에서
            사용할 수 있도록 통합했습니다. Tailwind의 기본 색상(gray, red, blue
            등)과 충돌을 피하기 위해{' '}
            <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">krds-</code>{' '}
            접두사를 붙인 별도 네임스페이스를 사용합니다.
          </Body>

          <div className="p-4 bg-krds-information-5 rounded-lg border border-krds-information-20">
            <Body size="sm" className="text-krds-information-80">
              <strong>핵심:</strong>{' '}
              <code className="px-1 py-0.5 bg-krds-white rounded">krds-</code>{' '}
              접두사를 사용하면 Tailwind 기본 색상과 KRDS 색상이 공존할 수
              있습니다. 필요에 따라 둘 다 사용할 수 있습니다.
            </Body>
          </div>
        </Stack>
      </PageSection>

      {/* KRDS Color System Integration */}
      <PageSection>
        <Heading level="h2" id="krds-integration">
          KRDS 색상 시스템 통합
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            Tailwind의 기본 색상(gray, red, blue 등)과 충돌을 피하기 위해{' '}
            <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">krds-</code>{' '}
            접두사를 붙인 별도 네임스페이스를 사용합니다.
          </Body>

          {/* Why krds- prefix */}
          <Stack spacing="heading-tight">
            <Heading level="h3">왜 krds- 접두사를 사용하나요?</Heading>
            <Body>
              Tailwind CSS는 기본적으로 gray, red, blue 등의 색상을 제공합니다.
              KRDS 색상도 같은 이름을 사용하면 충돌이 발생합니다. 예를 들어:
            </Body>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
                <Heading level="h4" className="mb-2">
                  Tailwind 기본 색상
                </Heading>
                <Body size="sm" className="text-krds-gray-70">
                  gray-50, gray-100, gray-200...
                </Body>
                <Body size="sm" className="mt-2">
                  예:{' '}
                  <code className="px-1.5 py-0.5 bg-krds-white rounded">
                    bg-gray-50
                  </code>
                </Body>
              </div>
              <div className="p-4 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
                <Heading level="h4" className="mb-2">
                  KRDS 색상 (krds- 접두사)
                </Heading>
                <Body size="sm" className="text-krds-gray-70">
                  krds-gray-50, krds-primary-60...
                </Body>
                <Body size="sm" className="mt-2">
                  예:{' '}
                  <code className="px-1.5 py-0.5 bg-krds-white rounded">
                    bg-krds-gray-50
                  </code>
                </Body>
              </div>
            </div>

            <div className="p-4 bg-krds-information-5 rounded-lg border border-krds-information-20">
              <Body size="sm" className="text-krds-information-80">
                <strong>핵심:</strong>{' '}
                <code className="px-1 py-0.5 bg-krds-white rounded">krds-</code>{' '}
                접두사를 사용하면 Tailwind 기본 색상과 KRDS 색상이 공존할 수
                있습니다. 필요에 따라 둘 다 사용할 수 있습니다.
              </Body>
            </div>
          </Stack>

          {/* Implementation */}
          <Stack spacing="heading-tight">
            <Heading level="h3">구현 방법</Heading>
            <Body>
              <code className="px-1.5 py-0.5 mx-1 bg-krds-gray-10 rounded">
                globals.css
              </code>
              에서 KRDS 색상을 CSS 변수로 정의하고,
              <code className="px-1.5 py-0.5 mx-1 bg-krds-gray-10 rounded">
                tailwind.config.ts
              </code>
              에서{' '}
              <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">
                krds-
              </code>{' '}
              접두사를 붙여 Tailwind 유틸리티로 사용할 수 있도록 매핑합니다.
            </Body>

            <div className="space-y-4">
              <div>
                <Body size="sm" className="font-semibold mb-2">
                  1. globals.css - CSS 변수 정의
                </Body>
                <CodeBlock
                  language="css"
                  code={`:root {
  /* KRDS Primary Colors - Light Mode */
  --krds-color-light-primary-5: #ecf2fe;
  --krds-color-light-primary-10: #d8e5fd;
  --krds-color-light-primary-20: #b1cefb;
  --krds-color-light-primary-60: #0b50d0;
  --krds-color-light-primary-95: #020f27;
}

.dark {
  /* Dark Mode - 반전된 밝기 */
  --krds-color-light-primary-5: #020f27;
  --krds-color-light-primary-60: #4c87f6;
  --krds-color-light-primary-95: #ecf2fe;
}`}
                />
              </div>

              <div>
                <Body size="sm" className="font-semibold mb-2">
                  2. tailwind.config.ts - krds- 접두사로 매핑
                </Body>
                <CodeBlock
                  language="typescript"
                  code={`colors: {
  // krds- 접두사를 붙여서 별도 네임스페이스로 정의
  'krds-primary': {
    5: 'var(--krds-color-light-primary-5)',
    10: 'var(--krds-color-light-primary-10)',
    20: 'var(--krds-color-light-primary-20)',
    60: 'var(--krds-color-light-primary-60)',
    95: 'var(--krds-color-light-primary-95)',
  },
  'krds-gray': {
    50: 'var(--krds-color-light-gray-50)',
    // ...
  }
}`}
                />
              </div>
            </div>
          </Stack>

          {/* Usage */}
          <Stack spacing="heading-tight">
            <Heading level="h3">사용 방법</Heading>
            <Body>
              <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">
                krds-
              </code>{' '}
              접두사를 붙인 클래스명을 사용합니다.
            </Body>

            <div className="space-y-4">
              <div>
                <Body size="sm" className="font-semibold mb-2">
                  KRDS 색상 사용 예시
                </Body>
                <CodeBlock
                  language="tsx"
                  code={`// Primary 색상 - 다크 모드 자동 전환
<div className="bg-krds-primary-50 text-krds-primary-10">
  {/* 
    라이트 모드: 진한 배경(50) + 밝은 텍스트(10)
    다크 모드: 밝은 배경(50 → 60으로 자동 전환) + 어두운 텍스트(10 → 90으로 자동 전환)
    → 자동 전환됨!
  */}
</div>

// Gray 색상 - 다크 모드 자동 전환
<div className="bg-krds-gray-5 text-krds-gray-90">
  {/* 
    라이트 모드: 밝은 배경(#f4f5f6) + 검은 글씨(#1e2124)
    다크 모드: 검은 배경(#131416) + 흰 글씨(#e6e8ea)
    → 자동 전환됨!
  */}
</div>

// Danger 색상 - 다크 모드 자동 전환
<button className="bg-krds-danger-50 text-krds-danger-10 hover:bg-krds-danger-60">
  Delete
</button>`}
                />
              </div>

              <div className="p-4 bg-krds-warning-5 rounded-lg border border-krds-warning-20">
                <Body size="sm" className="text-krds-warning-80">
                  <strong>주의:</strong>
                </Body>
                <ul className="mt-2 space-y-2">
                  <li>
                    <strong>숫자 스케일도 자동 전환됨:</strong>{' '}
                    <code className="px-1 py-0.5 bg-krds-white rounded">
                      bg-krds-gray-5
                    </code>
                    ,{' '}
                    <code className="px-1 py-0.5 bg-krds-white rounded">
                      text-krds-gray-10
                    </code>
                    같은 숫자 스케일도 CSS 변수를 통해 자동 전환됩니다.{' '}
                    <code className="px-1 py-0.5 bg-krds-white rounded mx-1">
                      globals.css
                    </code>
                    의{' '}
                    <code className="px-1 py-0.5 bg-krds-white rounded mx-1">
                      .dark
                    </code>
                    에서 변수 값을 재정의하므로{' '}
                    <code className="px-1 py-0.5 bg-krds-white rounded mx-1">
                      dark:
                    </code>
                    접두사가 필요 없습니다.
                  </li>
                  <li>
                    <strong>text-white 사용:</strong>{' '}
                    <code className="px-1 py-0.5 bg-krds-white rounded">
                      text-white
                    </code>
                    는 순수 흰색(#ffffff) CSS 변수를 사용합니다. 다크 모드에서도
                    항상 흰색이므로, 배경이 모드에 따라 변한다면 KRDS 색상 변수(
                    <code className="px-1 py-0.5 bg-krds-white rounded mx-1">
                      text-krds-white
                    </code>
                    등)를 사용하세요. 순수 흰색이 필요한 경우에만 사용하세요.
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-krds-information-5 rounded-lg border border-krds-information-20">
                <Body size="sm" className="text-krds-information-80">
                  <strong>참고:</strong> Tailwind 기본 색상(gray-50, red-500
                  등)도 그대로 사용할 수 있습니다. KRDS 색상은{' '}
                  <code className="px-1 py-0.5 bg-krds-white rounded">
                    krds-
                  </code>{' '}
                  접두사가 붙은 것만 사용하면 됩니다.
                </Body>
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Colors */}
      <PageSection>
        <Heading level="h2" id="colors">
          색상 (Colors)
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            KRDS 색상 시스템은 접근성을 최우선으로 하며, WCAG 2.1 AA 기준을
            준수합니다.
          </Body>

          {/* Base Colors */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Base Colors (기본 색상)</Heading>
            <Body>
              흰색과 검은색은 모드에 따라 자동으로 반전됩니다. 순수
              흰색/검은색이 필요한 경우에는{' '}
              <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">
                white
              </code>
              와{' '}
              <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">
                black
              </code>
              을 사용하세요.
            </Body>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-krds-white text-krds-black rounded-lg border border-krds-gray-20">
                <code className="block mb-2">bg-krds-white</code>
                <p className="text-sm">
                  기본 모드: 흰색, 다크 모드: 검은색 (자동 반전)
                </p>
              </div>
              <div className="p-4 bg-krds-black text-krds-white rounded-lg border border-krds-gray-20">
                <code className="block mb-2">bg-krds-black</code>
                <p className="text-sm">
                  기본 모드: 검은색, 다크 모드: 흰색 (자동 반전)
                </p>
              </div>
            </div>

            <CodeBlock
              code={`// KRDS 흰색/검은색 - 모드에 따라 자동 반전
<div className="bg-krds-white text-krds-black">
  {/* 
    라이트 모드: 흰색 배경 + 검은색 텍스트
    다크 모드: 검은색 배경 + 흰색 텍스트
    → 자동 반전!
  */}
</div>

// 순수 흰색/검은색 (모드 무관, 항상 동일)
// 주의: white/black은 다크 모드에서 자동 전환되지 않습니다
// 참고: 실제 사용 시에는 krds-white/krds-black 사용 권장
<div className="bg-white text-black">
  {/* 항상 흰색 배경 + 검은색 텍스트 */}
</div>`}
              language="tsx"
              showLineNumbers={false}
            />

            <div className="p-4 bg-krds-information-5 rounded-lg border border-krds-information-20">
              <Body size="sm" className="text-krds-information-80">
                <strong>차이점:</strong>
              </Body>
              <ul className="mt-2 space-y-1 list-disc list-inside text-krds-information-80">
                <li>
                  <code className="px-1 py-0.5 bg-krds-white rounded">
                    krds-white
                  </code>
                  /
                  <code className="px-1 py-0.5 bg-krds-white rounded mx-1">
                    krds-black
                  </code>
                  : 모드에 따라 자동 반전 (권장)
                </li>
                <li>
                  <code className="px-1 py-0.5 bg-krds-white rounded">
                    white
                  </code>
                  /
                  <code className="px-1 py-0.5 bg-krds-white rounded mx-1">
                    black
                  </code>
                  : 모드 무관, 항상 동일 (순수 색상이 필요한 경우)
                </li>
              </ul>
            </div>
          </Stack>

          {/* Primary Colors */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Primary Colors</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-krds-primary-50 text-krds-primary-10 rounded-lg">
                <code className="block mb-2">bg-krds-primary-50</code>
                <p className="text-sm">Primary - 주요 상호작용</p>
              </div>
              <div className="p-4 bg-krds-primary-60 text-krds-primary-10 rounded-lg">
                <code className="block mb-2">hover:bg-krds-primary-60</code>
                <p className="text-sm">Primary Hover</p>
              </div>
            </div>
            <CodeBlock
              code={`<Button variant="primary">확인</Button>
// 또는
<button className="bg-krds-primary-50 text-krds-primary-10 hover:bg-krds-primary-60">
  확인
</button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </Stack>

          {/* Gray Scale */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Gray Scale</Heading>
            <Body>
              Gray는 Surface(배경/표면)로 <strong>0, 5, 10</strong> 세 가지를
              사용합니다.
            </Body>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-4 p-3 bg-krds-white rounded-lg border border-krds-gray-20">
                <div className="w-16 h-16 bg-krds-white border border-krds-gray-20 rounded"></div>
                <div>
                  <code className="text-sm">bg-krds-white</code>
                  <p className="text-xs">Surface 0 - 기본 배경</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
                <div className="w-16 h-16 bg-krds-gray-5 border border-krds-gray-20 rounded"></div>
                <div>
                  <code className="text-sm">bg-krds-gray-5</code>
                  <p className="text-xs">Surface 5 - 보조 배경</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-krds-gray-10 rounded-lg border border-krds-gray-20">
                <div className="w-16 h-16 bg-krds-gray-10 border border-krds-gray-20 rounded"></div>
                <div>
                  <code className="text-sm">bg-krds-gray-10</code>
                  <p className="text-xs">Surface 10 - 강조 배경</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-krds-gray-20 rounded-lg border border-krds-gray-30">
                <div className="w-16 h-16 bg-krds-gray-20 border border-krds-gray-30 rounded"></div>
                <div>
                  <code className="text-sm">bg-krds-gray-20</code>
                  <p className="text-xs">구분선, 테두리</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-krds-gray-40 rounded-lg border border-krds-gray-30">
                <div className="w-16 h-16 bg-krds-gray-20 border border-krds-gray-30 rounded"></div>
                <div>
                  <code className="text-sm">bg-krds-gray-40</code>
                  <p className="text-xs">비활성화</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-krds-gray-50 rounded-lg border border-krds-gray-30">
                <div className="w-16 h-16 bg-krds-gray-20 border border-krds-gray-30 rounded"></div>
                <div>
                  <code className="text-krds-gray-10">bg-krds-gray-50</code>
                  <p className="text-xs text-krds-gray-10">비활성화</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-krds-gray-70 rounded-lg">
                <div className="w-16 h-16 bg-krds-gray-60 rounded"></div>
                <div>
                  <code className="text-krds-gray-10">text-krds-gray-70</code>
                  <p className="text-xs text-krds-gray-30">보조 텍스트</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-krds-gray-90 rounded-lg">
                <div className="w-16 h-16 bg-krds-gray-90 rounded"></div>
                <div>
                  <code className="text-krds-gray-10">text-krds-gray-90</code>
                  <p className="text-xs text-krds-gray-30">본문 텍스트</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-krds-gray-95 rounded-lg">
                <div className="w-16 h-16 bg-krds-gray-90 rounded"></div>
                <div>
                  <code className="text-krds-gray-10">text-krds-gray-95</code>
                  <p className="text-xs text-krds-gray-30">굵은 텍스트</p>
                </div>
              </div>
            </div>
          </Stack>

          {/* System Colors */}
          <Stack spacing="heading-tight">
            <Heading level="h3">System Colors</Heading>
            <div className="grid grid-cols-1 gap-4 mb-4">
              {/* Danger */}
              <div className="p-4 bg-krds-danger-5 border border-krds-danger-10 rounded-lg">
                <strong className="text-krds-danger-60 mb-2 flex items-center gap-2">
                  <CircleX className="w-4 h-4 text-krds-danger-50" /> Danger -
                  오류, 삭제
                </strong>
                <code className="block">
                  icon-krds-danger-50 (다크: 20) / text-krds-danger-60 (다크:
                  20) / <br />
                  bg-krds-danger-5 (다크: 95) / border-krds-danger-10 (다크: 90)
                </code>
              </div>

              {/* Warning */}
              <div className="p-4 bg-krds-warning-5 border border-krds-warning-10 rounded-lg">
                <strong className="text-krds-warning-60 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-krds-warning-50" />{' '}
                  Warning - 경고, 주의
                </strong>
                <code className="block">
                  icon-krds-warning-50 (다크: 20) / text-krds-warning-60 (다크:
                  20) / <br /> bg-krds-warning-5 (다크: 95) /
                  border-krds-warning-10 (다크: 90)
                </code>
              </div>

              {/* Success */}
              <div className="p-4 bg-krds-success-5 border border-krds-success-10 rounded-lg">
                <strong className="text-krds-success-60 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-krds-success-50" />{' '}
                  Success - 완료, 성공
                </strong>
                <code className="block">
                  icon-krds-success-50 (다크: 20) / text-krds-success-60 (다크:
                  20) / <br /> bg-krds-success-5 (다크: 95) /
                  border-krds-success-10 (다크: 90)
                </code>
              </div>

              {/* Information */}
              <div className="p-4 bg-krds-information-5 border border-krds-information-10 rounded-lg">
                <strong className="text-krds-information-60 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-krds-information-50" /> Info -
                  정보, 안내
                </strong>
                <code className="block">
                  icon-krds-information-50 (다크: 20) / text-krds-information-60
                  (다크: 20) / <br /> bg-krds-information-5 (다크: 95) /
                  border-krds-information-10 (다크: 90)
                </code>
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Semantic Color Tokens */}
      <PageSection>
        <Heading level="h2" id="semantic-colors">
          의미 기반 색상 (Semantic Color Tokens)
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            기본 모드와 다크 모드에서 <strong>text, base, surface</strong>의
            기준이 다릅니다. 예를 들어 Primary 색상의 경우:
          </Body>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
              <Heading level="h4" className="mb-2">
                기본 모드
              </Heading>
              <ul className="space-y-1">
                <li>
                  <code className="px-1.5 py-0.5 bg-krds-white rounded">
                    base
                  </code>{' '}
                  = 50
                </li>
                <li>
                  <code className="px-1.5 py-0.5 bg-krds-white rounded">
                    text
                  </code>{' '}
                  = 60
                </li>
                <li>
                  <code className="px-1.5 py-0.5 bg-krds-white rounded">
                    surface
                  </code>{' '}
                  = 5
                </li>
              </ul>
            </div>
            <div className="p-4 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
              <Heading level="h4" className="mb-2">
                다크 모드
              </Heading>
              <ul className="space-y-1">
                <li>
                  <code className="px-1.5 py-0.5 bg-krds-white rounded">
                    base
                  </code>{' '}
                  = 50
                </li>
                <li>
                  <code className="px-1.5 py-0.5 bg-krds-white rounded">
                    text
                  </code>{' '}
                  = 20
                </li>
                <li>
                  <code className="px-1.5 py-0.5 bg-krds-white rounded">
                    surface
                  </code>{' '}
                  = 95
                </li>
              </ul>
            </div>
          </div>

          <Body>
            이를 해결하기 위해 <strong>Semantic 변수</strong>를 사용하여 모드에
            따라 자동으로 올바른 색상이 적용되도록 설정했습니다.
          </Body>

          <div className="space-y-4">
            <div>
              <Body size="sm" className="font-semibold mb-2">
                1. globals.css - Semantic 변수 정의
              </Body>
              <CodeBlock
                language="css"
                code={`:root {
  /* 기본 모드: text=60, surface=5, base=50 */
  --krds-primary-text: var(--krds-color-light-primary-60);
  --krds-primary-surface: var(--krds-color-light-primary-5);
  --krds-primary-base: var(--krds-color-light-primary-50);
}

.dark {
  /* 다크 모드: text=20, surface=95, base=50 (모드 무관) */
  --krds-primary-text: var(--krds-color-light-primary-20);
  --krds-primary-surface: var(--krds-color-light-primary-95);
  --krds-primary-base: var(--krds-color-light-primary-50);
}`}
              />
            </div>

            <div>
              <Body size="sm" className="font-semibold mb-2">
                2. tailwind.config.ts - Semantic 이름 매핑
              </Body>
              <CodeBlock
                language="typescript"
                code={`colors: {
  'krds-primary': {
    DEFAULT: 'var(--krds-primary-base)', // base 색상
    // Semantic 변수 (모드에 따라 자동 변경)
    text: 'var(--krds-primary-text)',     // 기본: 60, 다크: 20
    surface: 'var(--krds-primary-surface)', // 기본: 5, 다크: 95
    base: 'var(--krds-primary-base)',     // 기본: 50, 다크: 50 (모드 무관)
    // 숫자 스케일 (직접 사용 시)
    5: 'var(--krds-color-light-primary-5)',
    50: 'var(--krds-color-light-primary-50)',
    80: 'var(--krds-color-light-primary-80)',
    // ...
  }
}`}
              />
            </div>
          </div>

          {/* Numeric vs Semantic */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Semantic 변수 vs 숫자 스케일</Heading>
            <Body>
              둘 다 자동 전환되지만, 사용 목적이 다릅니다. 언제 무엇을 사용해야
              할까요?
            </Body>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
                <Heading level="h4" className="mb-3">
                  Semantic 변수{' '}
                  <span className="text-krds-primary-60">(권장)</span>
                </Heading>
                <Body size="sm" className="mb-3">
                  <code className="px-1.5 py-0.5 bg-krds-white rounded">
                    bg-krds-primary-surface
                  </code>
                  ,{' '}
                  <code className="px-1.5 py-0.5 bg-krds-white rounded">
                    text-krds-primary-text
                  </code>
                </Body>
                <ul className="space-y-2 list-disc list-inside">
                  <li>의미 기반 이름(surface, text, base)</li>
                  <li>CSS 변수를 통해 자동 전환됨</li>
                  <li>모드에 따라 적절한 숫자 값 자동 선택</li>
                  <li>라이트 모드: surface=5, 다크 모드: surface=95</li>
                </ul>
              </div>

              <div className="p-4 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
                <Heading level="h4" className="mb-3">
                  숫자 스케일
                </Heading>
                <Body size="sm" className="mb-3">
                  <code className="px-1.5 py-0.5 bg-krds-white rounded">
                    bg-krds-gray-5
                  </code>
                  ,{' '}
                  <code className="px-1.5 py-0.5 bg-krds-white rounded">
                    text-krds-gray-90
                  </code>
                </Body>
                <ul className="space-y-2 list-disc list-inside">
                  <li>구체적인 색상 값(5, 90 등)을 직접 지정</li>
                  <li>CSS 변수를 통해 자동 전환됨</li>
                  <li>항상 같은 숫자(5)를 참조</li>
                  <li>라이트 모드: 밝은 색, 다크 모드: 어두운 색</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-krds-information-5 rounded-lg border border-krds-information-20">
              <Body size="sm" className="text-krds-information-80">
                <strong>언제 무엇을 사용하나요?</strong>
              </Body>
              <ul className="mt-2 space-y-1 list-disc list-inside text-krds-information-80">
                <li>
                  <strong>Semantic 변수 권장:</strong> 일반적인 UI
                  컴포넌트(버튼, 카드, 알림 등)에서 의미에 맞는 색상을 사용할 때
                </li>
                <li>
                  <strong>숫자 스케일 사용:</strong> 특정 색상 값이 필요한
                  경우(예: 디자인 시스템에서 정확히 5번 색상을 지정해야 할 때)
                </li>
              </ul>
            </div>
          </Stack>

          {/* Available Semantic Tokens */}
          <Stack spacing="heading-tight">
            <Heading level="h3">사용 가능한 Semantic 변수</Heading>
            <Body>다음 컬러들이 Semantic 변수를 지원합니다:</Body>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
                <Heading level="h4" className="mb-3">
                  Primary
                </Heading>
                <ul className="space-y-2">
                  <li>
                    <code className="px-1.5 py-0.5 bg-krds-white rounded">
                      text-krds-primary-text
                    </code>
                  </li>
                  <li>
                    <code className="px-1.5 py-0.5 bg-krds-white rounded">
                      bg-krds-primary-surface
                    </code>
                  </li>
                  <li>
                    <code className="px-1.5 py-0.5 bg-krds-white rounded">
                      bg-krds-primary-base
                    </code>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
                <Heading level="h4" className="mb-3">
                  Secondary
                </Heading>
                <ul className="space-y-2">
                  <li>
                    <code className="px-1.5 py-0.5 bg-krds-white rounded">
                      text-krds-secondary-text
                    </code>
                  </li>
                  <li>
                    <code className="px-1.5 py-0.5 bg-krds-white rounded">
                      bg-krds-secondary-surface
                    </code>
                  </li>
                  <li>
                    <code className="px-1.5 py-0.5 bg-krds-white rounded">
                      bg-krds-secondary-base
                    </code>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
                <Heading level="h4" className="mb-3">
                  Accent (강조)
                </Heading>
                <ul className="space-y-2">
                  <li>
                    <code className="px-1.5 py-0.5 bg-krds-white rounded">
                      text-krds-accent-text
                    </code>
                  </li>
                  <li>
                    <code className="px-1.5 py-0.5 bg-krds-white rounded">
                      bg-krds-accent-surface
                    </code>
                  </li>
                  <li>
                    <code className="px-1.5 py-0.5 bg-krds-white rounded">
                      bg-krds-accent-base
                    </code>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-krds-gray-5 rounded-lg border border-krds-gray-20">
                <Heading level="h4" className="mb-3">
                  Danger (위험/에러)
                </Heading>
                <ul className="space-y-2">
                  <li>
                    <code className="px-1.5 py-0.5 bg-krds-white rounded">
                      text-krds-danger-text
                    </code>
                  </li>
                  <li>
                    <code className="px-1.5 py-0.5 bg-krds-white rounded">
                      bg-krds-danger-surface
                    </code>
                  </li>
                  <li>
                    <code className="px-1.5 py-0.5 bg-krds-white rounded">
                      border-krds-danger-border
                    </code>
                  </li>
                </ul>
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Dark Mode */}
      <PageSection>
        <Heading level="h2" id="dark-mode">
          다크 모드
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            HANUI는 CSS 변수를 활용하여 다크 모드를 자동으로 지원합니다.{' '}
            <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">html</code>
            요소에{' '}
            <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">dark</code>
            클래스를 추가하면 모든 KRDS 색상이 자동으로 전환됩니다.
          </Body>

          {/* How it works */}
          <Stack spacing="heading-tight">
            <Heading level="h3">작동 원리</Heading>
            <Body>
              CSS 변수는 상위 요소의 값을 상속받습니다.{' '}
              <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">
                globals.css
              </code>
              에서{' '}
              <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">
                :root
              </code>
              와{' '}
              <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">
                .dark
              </code>
              에서 같은 변수명을 사용하지만 다른 값을 할당하여, 모드에 따라
              자동으로 색상이 변경되도록 구현했습니다.
            </Body>

            <div className="space-y-4">
              <div>
                <Body size="sm" className="font-semibold mb-2">
                  1. globals.css - CSS 변수 정의
                </Body>
                <CodeBlock
                  language="css"
                  code={`:root {
  /* 기본 모드 (라이트 모드) */
  --krds-color-light-primary-5: #ecf2fe;  /* 밝은 파란색 */
  --krds-color-light-primary-50: #256ef4;  /* 중간 파란색 */
  --krds-color-light-primary-80: #052561;   /* 진한 파란색 */
}

.dark {
  /* 다크 모드 - 같은 변수명에 다른 값 할당 */
  --krds-color-light-primary-5: #020f27;   /* 어두운 파란색 */
  --krds-color-light-primary-50: #256ef4;  /* 중간 파란색 (동일) */
  --krds-color-light-primary-80: #b1cefb;  /* 밝은 파란색 */
}`}
                />
              </div>

              <div>
                <Body size="sm" className="font-semibold mb-2">
                  2. tailwind.config.ts - CSS 변수 참조
                </Body>
                <CodeBlock
                  language="typescript"
                  code={`colors: {
  'krds-primary': {
    5: 'var(--krds-color-light-primary-5)',   // CSS 변수 참조
    50: 'var(--krds-color-light-primary-50)',
    80: 'var(--krds-color-light-primary-80)',
  }
}`}
                />
              </div>

              <div>
                <Body size="sm" className="font-semibold mb-2">
                  3. 실제 사용 - 자동 전환
                </Body>
                <CodeBlock
                  language="tsx"
                  code={`// HTML에 dark 클래스가 없을 때 (기본 모드)
<div className="bg-krds-primary-5">
  → var(--krds-color-light-primary-5) 참조
  → :root의 값 #ecf2fe 사용 (밝은 파란색)
</div>

// HTML에 dark 클래스가 있을 때 (다크 모드)
<html className="dark">
  <div className="bg-krds-primary-5">
    → var(--krds-color-light-primary-5) 참조
    → .dark의 값 #020f27 사용 (어두운 파란색)
    → dark: 접두사 불필요!
  </div>
</html>`}
                />
              </div>
            </div>
          </Stack>

          {/* Automatic switching */}
          <Stack spacing="heading-tight">
            <Heading level="h3">자동 전환 예시</Heading>
            <Body>
              모든 KRDS 색상(숫자 스케일, semantic 변수,
              `krds-white`/`krds-black` 모두)은 CSS 변수를 통해 자동 전환됩니다.
            </Body>

            <div className="space-y-4">
              <div>
                <Body size="sm" className="font-semibold mb-2">
                  숫자 스케일 - 자동 전환
                </Body>
                <CodeBlock
                  language="tsx"
                  code={`<div className="bg-krds-gray-5 text-krds-gray-90">
  {/* 
    라이트 모드: 
    - bg-krds-gray-5 → #f4f5f6 (밝은 회색, 거의 흰색)
    - text-krds-gray-90 → #1e2124 (진한 회색, 거의 검은색)
    → 흰 배경 + 검은 글씨
    
    다크 모드 (html에 dark 클래스 추가 시):
    - bg-krds-gray-5 → #131416 (어두운 회색, 거의 검은색) 자동 전환!
    - text-krds-gray-90 → #e6e8ea (밝은 회색, 거의 흰색) 자동 전환!
    → 검은 배경 + 흰 글씨
    
    → dark: 접두사 불필요!
  */}
</div>`}
                />
              </div>

              <div>
                <Body size="sm" className="font-semibold mb-2">
                  Semantic 변수 - 자동 전환
                </Body>
                <CodeBlock
                  language="tsx"
                  code={`<div className="bg-krds-primary-surface text-krds-primary-text">
  {/* 
    라이트 모드:
    - bg-krds-primary-surface → var(--krds-primary-surface) → #ecf2fe
    - text-krds-primary-text → var(--krds-primary-text) → #0b50d0 (primary-60)
    
    다크 모드:
    - bg-krds-primary-surface → var(--krds-primary-surface) → #ecf2fe 자동 전환!
    - text-krds-primary-text → var(--krds-primary-text) → #052561 (primary-20) 자동 전환!
    
    → dark: 접두사 불필요!
  */}
</div>`}
                />
              </div>

              <div>
                <Body size="sm" className="font-semibold mb-2">
                  Base Colors - 자동 반전
                </Body>
                <CodeBlock
                  language="tsx"
                  code={`<div className="bg-krds-white text-krds-black">
  {/* 
    라이트 모드:
    - bg-krds-white → var(--krds-white) → #ffffff (흰색)
    - text-krds-black → var(--krds-black) → #000000 (검은색)
    
    다크 모드:
    - bg-krds-white → var(--krds-white) → #000000 (검은색) 자동 반전!
    - text-krds-black → var(--krds-black) → #ffffff (흰색) 자동 반전!
    
    → dark: 접두사 불필요!
  */}
</div>`}
                />
              </div>
            </div>
          </Stack>

          {/* How to enable dark mode */}
          <Stack spacing="heading-tight">
            <Heading level="h3">다크 모드 활성화 방법</Heading>
            <Body>
              <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">
                html
              </code>
              요소에{' '}
              <code className="px-1.5 py-0.5 bg-krds-gray-10 rounded">
                dark
              </code>{' '}
              클래스를 추가하면 됩니다.
            </Body>

            <CodeBlock
              language="tsx"
              code={`// React/Next.js 예시
import { useEffect, useState } from 'react';

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return [isDark, setIsDark];
}

// 사용
function App() {
  const [isDark, setIsDark] = useDarkMode();
  
  return (
    <button onClick={() => setIsDark(!isDark)}>
      {isDark ? '라이트 모드' : '다크 모드'}
    </button>
  );
}`}
            />
          </Stack>

          {/* Important Notes */}
          <Stack spacing="heading-tight">
            <Heading level="h3">주의사항</Heading>
            <div className="space-y-3">
              <div className="p-4 bg-krds-warning-5 rounded-lg border border-krds-warning-20">
                <Body size="sm" className="text-krds-warning-80">
                  <strong>text-white 사용:</strong>{' '}
                  <code className="px-1 py-0.5 bg-krds-white rounded">
                    text-white
                  </code>
                  는 순수 흰색(#ffffff) CSS 변수를 사용하지만, 모드에 따라 값이
                  변하지 않으므로 항상 흰색입니다. 배경이 모드에 따라 변한다면
                  KRDS 색상 변수(
                  <code className="px-1 py-0.5 bg-krds-white rounded mx-1">
                    text-krds-gray-10
                  </code>
                  등)를 사용하세요. 순수 흰색이 필요한 경우(로고, 아이콘 등)에만
                  사용하세요.
                </Body>
              </div>

              <div className="p-4 bg-krds-information-5 rounded-lg border border-krds-information-20">
                <Body size="sm" className="text-krds-information-80">
                  <strong>핵심:</strong> 모든 KRDS 색상(숫자 스케일, semantic
                  변수, `krds-white`/`krds-black` 모두)은 CSS 변수를 통해 자동
                  전환되므로,{' '}
                  <code className="px-1 py-0.5 bg-krds-white rounded mx-1">
                    dark:
                  </code>{' '}
                  접두사가 필요 없습니다.{' '}
                  <code className="px-1 py-0.5 bg-krds-white rounded mx-1">
                    html
                  </code>{' '}
                  요소에{' '}
                  <code className="px-1 py-0.5 bg-krds-white rounded mx-1">
                    dark
                  </code>{' '}
                  클래스만 추가하면 됩니다.
                </Body>
              </div>
            </div>
          </Stack>
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
                의미 있는 색상 사용
              </h3>
              <p className="text-body-sm text-krds-gray-70 mb-3">
                System Colors를 올바른 의미로 사용하세요.
              </p>
              <CodeBlock
                code={`// Success는 긍정적 결과에
<Button variant="success">저장 완료</Button>

// Danger는 위험한 액션에
<Button variant="danger">삭제</Button>`}
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
            href="https://www.krds.go.kr/html/site/style/style_02.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-krds-white border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
          >
            <h4 className="font-semibold mb-1">KRDS 색상 시스템</h4>
            <p className="text-krds-gray-70">색상 팔레트, 접근성 기준</p>
          </a>
        </div>
      </PageSection>
    </>
  );
}
