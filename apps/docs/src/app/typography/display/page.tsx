'use client';

import { Display, Stack, Heading, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { GuidelineBox } from '@/components/content/GuidelineBox';

export default function DisplayPage() {
  return (
    <>
      <PageHeader
        title="Display"
        description="배너와 마케팅용 대형 텍스트 컴포넌트"
      />

      {/* Preview */}
      <PageSection>
        <ComponentPreview>
          <div className="flex flex-col gap-6">
            <Display size="lg">환영합니다</Display>
            <Display size="md">공공서비스 플랫폼</Display>
            <Display size="sm">HANUI 디자인 시스템</Display>
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
            Display는 <strong>KRDS 타이포그래피 시스템</strong>에서 가장 큰
            크기의 텍스트 스타일입니다. 배너, 히어로 섹션, 마케팅 메시지 등
            사용자의 주목을 끌어야 하는 곳에 사용됩니다.
          </Body>
          <Body className="leading-relaxed">
            모든 크기는 반응형으로 설계되어 PC와 모바일에서 최적의 가독성을
            제공합니다.
          </Body>
        </Stack>
      </PageSection>

      {/* Sizes */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="sizes">
            크기 (Size)
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <div className="rounded-lg border border-krds-gray-20 p-6">
            <Stack spacing="heading-tight">
              <Display size="lg">Large Display</Display>
              <Body size="sm" className="text-krds-gray-70">
                60px (PC) / 44px (Mobile) · 700 (Bold) · 150% 줄 간격
              </Body>
              <div>
                <CodeBlock
                  code={`<Display size="lg">최대 강조 텍스트</Display>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </Stack>
          </div>

          <div className="rounded-lg border border-krds-gray-20 p-6">
            <Stack spacing="heading-tight">
              <Display size="md">Medium Display</Display>
              <Body size="sm" className="text-krds-gray-70">
                44px (PC) / 32px (Mobile) · 700 (Bold) · 150% 줄 간격
              </Body>
              <div>
                <CodeBlock
                  code={`<Display size="md">주요 제목</Display>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </Stack>
          </div>

          <div className="rounded-lg border border-krds-gray-20 p-6">
            <Stack spacing="heading-tight">
              <Display size="sm">Small Display</Display>
              <Body size="sm" className="text-krds-gray-70">
                36px (PC) / 28px (Mobile) · 700 (Bold) · 150% 줄 간격
              </Body>
              <div>
                <CodeBlock
                  code={`<Display size="sm">보조 제목</Display>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </Stack>
          </div>
        </Stack>
      </PageSection>

      {/* Usage */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="usage">
            예제
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Polymorphic */}
          <Stack spacing="heading-tight">
            <Heading level="h3">다양한 HTML 태그</Heading>
            <div>
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <Display as="h1" size="lg">
                    h1 태그로 렌더링
                  </Display>
                  <Display as="h2" size="md">
                    h2 태그로 렌더링
                  </Display>
                  <Display as="div" size="sm">
                    div 태그로 렌더링
                  </Display>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Display as="h1" size="lg">h1 태그로 렌더링</Display>
<Display as="h2" size="md">h2 태그로 렌더링</Display>
<Display as="div" size="sm">div 태그로 렌더링</Display>`}
                  language="tsx"
                />
              </div>
            </div>
          </Stack>

          {/* Custom Styling */}
          <Stack spacing="heading-tight">
            <Heading level="h3">커스텀 스타일</Heading>
            <div>
              <ComponentPreview>
                <Display size="md" className="text-krds-primary-base">
                  브랜드 컬러 적용
                </Display>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Display size="md" className="text-krds-primary-base">
  브랜드 컬러 적용
</Display>`}
                  language="tsx"
                />
              </div>
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
          <GuidelineBox title="Display를 사용하기 적합한 경우">
            <ul className="list-disc list-inside space-y-2">
              <li>랜딩 페이지의 히어로 섹션</li>
              <li>프로모션 배너의 핵심 메시지</li>
              <li>서비스 소개 페이지의 대제목</li>
              <li>강력한 시각적 임팩트가 필요한 곳</li>
            </ul>
          </GuidelineBox>

          <GuidelineBox title="Display를 사용하지 말아야 하는 경우">
            <ul className="list-disc list-inside space-y-2">
              <li>일반 페이지 제목 (Heading 사용 권장)</li>
              <li>본문 내용 (Body 사용 권장)</li>
              <li>폼 라벨 (Label 사용 권장)</li>
              <li>텍스트가 많은 콘텐츠 영역</li>
            </ul>
          </GuidelineBox>
        </Stack>
      </PageSection>

      {/* API */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api-reference">
            API 레퍼런스
          </Heading>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-krds-gray-20">
                  <th className="text-left py-3 px-4">Prop</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Default</th>
                  <th className="text-left py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="text-krds-gray-90">
                <tr className="border-b border-krds-gray-20">
                  <td className="py-3 px-4">
                    <code>size</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>"lg" | "md" | "sm"</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>"md"</code>
                  </td>
                  <td className="py-3 px-4">Display 크기</td>
                </tr>
                <tr className="border-b border-krds-gray-20">
                  <td className="py-3 px-4">
                    <code>as</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>"h1" | "h2" | "h3" | "div" | "p"</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>"h1"</code>
                  </td>
                  <td className="py-3 px-4">렌더링할 HTML 태그</td>
                </tr>
                <tr className="border-b border-krds-gray-20">
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
                  <td className="py-3 px-4">텍스트 내용</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Stack>
      </PageSection>

      {/* KRDS Compliance */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="krds">
            KRDS 준수사항
          </Heading>
          <div className="rounded-lg border border-krds-primary-border bg-krds-primary-surface p-6">
            <ul className="space-y-2 text-krds-primary-text">
              <li>✓ 모든 Display는 Bold (700) 폰트 굵기 사용</li>
              <li>✓ 150% 줄 간격으로 가독성 확보</li>
              <li>✓ 반응형 크기 (PC/모바일 최적화)</li>
              <li>✓ Pretendard GOV 폰트 적용</li>
            </ul>
          </div>
        </Stack>
      </PageSection>
    </>
  );
}
