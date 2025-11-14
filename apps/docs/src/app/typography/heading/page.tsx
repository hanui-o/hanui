'use client';

import { Heading, Stack, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function HeadingPage() {
  return (
    <>
      <PageHeader
        title="Heading"
        description="시맨틱한 페이지 및 섹션 제목 컴포넌트"
      />

      <PageSection>
        <ComponentPreview>
          <div className="flex flex-col gap-4">
            <Heading level="h1">h1 - 페이지 최상위 제목</Heading>
            <Heading level="h2">h2 - 주요 섹션 제목</Heading>
            <Heading level="h3">h3 - 하위 섹션 제목</Heading>
            <Heading level="h4">h4 - 세부 항목 제목</Heading>
            <Heading level="h5">h5 - 작은 제목</Heading>
            <Heading level="h6">h6 - 최소 제목</Heading>
          </div>
        </ComponentPreview>
      </PageSection>

      {/* Overview */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="overview">
            개요
          </Heading>
          <Body className="leading-relaxed">
            Heading은 <strong>KRDS 타이포그래피 시스템</strong>의 제목 스타일로,
            페이지와 섹션의 구조를 명확히 표현합니다. h1부터 h6까지의 시맨틱
            HTML 태그를 사용하여 접근성을 보장합니다.
          </Body>
          <Body className="leading-relaxed">
            각 레벨은 명확한 계층 구조를 형성하며, 반응형으로 설계되어 PC와
            모바일에서 최적의 가독성을 제공합니다.
          </Body>
        </Stack>
      </PageSection>

      {/* Levels */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="levels">
            레벨
          </Heading>
          <Stack spacing="content-loose">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-4">
                <Heading level="h1">h1 - Extra Large Heading</Heading>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                40px (PC) / 28px (Mobile) · 700 (Bold) · 150% 줄 간격
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`<Heading level="h1">페이지 제목</Heading>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-4">
                <Heading level="h2">h2 - Large Heading</Heading>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                32px (PC) / 24px (Mobile) · 700 (Bold) · 150% 줄 간격
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`<Heading level="h2">주요 섹션 제목</Heading>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-4">
                <Heading level="h3">h3 - Medium Heading</Heading>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                24px (PC) / 22px (Mobile) · 700 (Bold) · 150% 줄 간격
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`<Heading level="h3">하위 섹션 제목</Heading>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-4">
                <Heading level="h4">h4 - Small Heading</Heading>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                19px · 700 (Bold) · 150% 줄 간격
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`<Heading level="h4">세부 항목 제목</Heading>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-4">
                <Heading level="h5">h5 - Extra Small Heading</Heading>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                17px · 700 (Bold) · 150% 줄 간격
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`<Heading level="h5">작은 제목</Heading>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-4">
                <Heading level="h6">h6 - Extra Extra Small Heading</Heading>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                15px · 700 (Bold) · 150% 줄 간격
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`<Heading level="h6">최소 제목</Heading>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Usage */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="usage">
            사용 예시
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Page Structure */}
          <Stack spacing="heading-tight">
            <Heading level="h3">페이지 구조</Heading>
            <ComponentPreview>
              <div className="space-y-4">
                <Heading level="h1">페이지 제목</Heading>
                <Heading level="h2">주요 섹션</Heading>
                <Heading level="h3">하위 섹션</Heading>
                <Heading level="h4">세부 항목</Heading>
              </div>
            </ComponentPreview>
            <div className="mt-4">
              <CodeBlock
                code={`<Heading level="h1">페이지 제목</Heading>
<Heading level="h2">주요 섹션</Heading>
<Heading level="h3">하위 섹션</Heading>
<Heading level="h4">세부 항목</Heading>`}
                language="tsx"
              />
            </div>
          </Stack>

          {/* Custom Styling */}
          <Stack spacing="heading-tight">
            <Heading level="h3">커스텀 스타일</Heading>
            <ComponentPreview>
              <Heading level="h2" className="text-primary-60">
                브랜드 컬러 제목
              </Heading>
            </ComponentPreview>
            <div className="mt-4">
              <CodeBlock
                code={`<Heading level="h2" className="text-primary-60">
  브랜드 컬러 제목
</Heading>`}
                language="tsx"
              />
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Guidelines */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="guidelines">
            사용 가이드라인
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 p-6">
            <Heading
              level="h3"
              className="text-green-900 dark:text-green-100 mb-3"
            >
              ✓ Heading을 사용하기 적합한 경우
            </Heading>
            <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
              <li>페이지의 메인 제목 (h1)</li>
              <li>주요 섹션 구분 (h2)</li>
              <li>하위 섹션의 제목 (h3-h6)</li>
              <li>명확한 콘텐츠 계층 구조가 필요한 곳</li>
            </ul>
          </div>

          <div className="rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-6">
            <Heading
              level="h3"
              className="text-amber-900 dark:text-amber-100 mb-3"
            >
              ⚠ 주의사항
            </Heading>
            <ul className="list-disc list-inside space-y-2 text-amber-800 dark:text-amber-200">
              <li>페이지당 h1은 하나만 사용</li>
              <li>레벨을 건너뛰지 말고 순차적으로 사용 (h2 다음 h4는 지양)</li>
              <li>스타일 목적이 아닌 구조적 의미로 사용</li>
            </ul>
          </div>

          <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-6">
            <Heading level="h3" className="text-red-900 dark:text-red-100 mb-3">
              ✗ Heading을 사용하지 말아야 하는 경우
            </Heading>
            <ul className="list-disc list-inside space-y-2 text-red-800 dark:text-red-200">
              <li>배너나 히어로 섹션 (Display 사용 권장)</li>
              <li>본문 텍스트 (Body 사용 권장)</li>
              <li>폼 라벨 (Label 사용 권장)</li>
              <li>네비게이션 메뉴 (NavText 사용 권장)</li>
            </ul>
          </div>
        </Stack>
      </PageSection>

      {/* API */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api">
            API
          </Heading>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4">Prop</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Default</th>
                  <th className="text-left py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code>level</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>
                      &quot;h1&quot; | &quot;h2&quot; | &quot;h3&quot; |
                      &quot;h4&quot; | &quot;h5&quot; | &quot;h6&quot;
                    </code>
                  </td>
                  <td className="py-3 px-4">
                    <code>&quot;h2&quot;</code>
                  </td>
                  <td className="py-3 px-4">제목 레벨 (시맨틱 태그)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code>className</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>string</code>
                  </td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">추가 CSS 클래스</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <code>children</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>ReactNode</code>
                  </td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">제목 내용</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Stack>
      </PageSection>

      {/* Accessibility */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="accessibility">
            접근성
          </Heading>
          <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-6">
            <ul className="space-y-2 text-blue-900 dark:text-blue-100">
              <li>✓ 시맨틱 HTML 태그 사용으로 스크린 리더 지원</li>
              <li>✓ 명확한 계층 구조로 콘텐츠 탐색 용이</li>
              <li>✓ 페이지당 h1은 하나만 사용하여 주제 명확화</li>
              <li>✓ 순차적 레벨 사용으로 문서 구조 이해 개선</li>
            </ul>
          </div>
        </Stack>
      </PageSection>

      {/* KRDS Compliance */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="krds">
            KRDS 준수사항
          </Heading>
          <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-6">
            <ul className="space-y-2 text-blue-900 dark:text-blue-100">
              <li>✓ 모든 Heading은 Bold (700) 폰트 굵기 사용</li>
              <li>✓ 150% 줄 간격으로 가독성 확보</li>
              <li>✓ 반응형 크기 (h1-h3는 PC/모바일 최적화)</li>
              <li>✓ Pretendard GOV 폰트 적용</li>
            </ul>
          </div>
        </Stack>
      </PageSection>
    </>
  );
}
