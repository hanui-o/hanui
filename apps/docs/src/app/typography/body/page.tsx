'use client';

import { Body, Heading, Stack } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { GuidelineBox } from '@/components/content/GuidelineBox';

export default function BodyPage() {
  return (
    <>
      <PageHeader title="Body" description="본문 텍스트를 위한 컴포넌트" />

      <PageSection>
        <ComponentPreview>
          <div className="flex flex-col gap-4">
            <Body size="lg">Large - 본문 텍스트입니다</Body>
            <Body size="md">Medium - 본문 텍스트입니다</Body>
            <Body size="sm">Small - 본문 텍스트입니다</Body>
            <Body size="xs">XSmall - 본문 텍스트입니다</Body>
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
            Body는 <strong>KRDS 타이포그래피 시스템</strong>의 본문 텍스트
            스타일입니다. 일반적인 문단, 설명, 콘텐츠 등 대부분의 텍스트에
            사용됩니다.
          </Body>
          <Body className="leading-relaxed">
            4가지 크기와 2가지 굵기를 제공하여 다양한 콘텐츠 요구사항을
            충족합니다.
          </Body>
        </Stack>
      </PageSection>

      {/* Sizes */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="sizes">
            크기
          </Heading>
          <Stack spacing="content-loose">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-4">
                <Body size="lg">
                  Large - 주요 본문이나 중요한 설명에 사용하는 텍스트입니다.
                  가독성이 높아 중요한 정보 전달에 적합합니다.
                </Body>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                19px · 400 (Regular) · 150% 줄 간격
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`<Body size="lg">주요 본문 텍스트</Body>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-4">
                <Body size="md">
                  Medium - 일반적인 본문 텍스트에 사용합니다. 가장 기본이 되는
                  크기로 대부분의 콘텐츠에 적용됩니다.
                </Body>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                17px · 400 (Regular) · 150% 줄 간격
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`<Body size="md">일반 본문 텍스트</Body>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-4">
                <Body size="sm">
                  Small - 보조 설명이나 부가 정보에 사용합니다. 작지만 여전히
                  읽기 편한 크기입니다.
                </Body>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                15px · 400 (Regular) · 150% 줄 간격
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`<Body size="sm">보조 설명 텍스트</Body>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-4">
                <Body size="xs">
                  XSmall - 캡션, 각주, 메타 정보 등에 사용합니다. 가장 작은
                  크기입니다.
                </Body>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                13px · 400 (Regular) · 150% 줄 간격
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`<Body size="xs">캡션 텍스트</Body>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Weights */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="weights">
            굵기
          </Heading>
          <Stack spacing="content-loose">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-4">
                <Body size="md" weight="regular">
                  Regular (400) - 일반적인 본문 텍스트에 사용하는 기본
                  굵기입니다.
                </Body>
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`<Body size="md" weight="regular">일반 텍스트</Body>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-4">
                <Body size="md" weight="bold">
                  Bold (700) - 강조가 필요한 본문 텍스트에 사용합니다.
                </Body>
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={`<Body size="md" weight="bold">강조 텍스트</Body>`}
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
          {/* Article Content */}
          <Stack spacing="heading-tight">
            <Heading level="h3">문서 콘텐츠</Heading>
            <ComponentPreview>
              <div className="space-y-4">
                <Body size="lg" weight="bold">
                  공공서비스의 디지털 전환
                </Body>
                <Body size="md">
                  공공 분야의 디지털 전환은 시민들에게 더 나은 서비스를 제공하기
                  위한 중요한 과제입니다. KRDS는 이러한 디지털 전환을 지원하는
                  디자인 시스템입니다.
                </Body>
                <Body size="sm">
                  * 본 내용은 예시이며 실제 서비스와 다를 수 있습니다.
                </Body>
              </div>
            </ComponentPreview>
            <div className="mt-4">
              <CodeBlock
                code={`<Body size="lg" weight="bold">공공서비스의 디지털 전환</Body>
<Body size="md">
  공공 분야의 디지털 전환은 시민들에게 더 나은 서비스를 제공하기 위한
  중요한 과제입니다.
</Body>
<Body size="sm">
  * 본 내용은 예시이며 실제 서비스와 다를 수 있습니다.
</Body>`}
                language="tsx"
              />
            </div>
          </Stack>

          {/* Polymorphic */}
          <Stack spacing="heading-tight">
            <Heading level="h3">다양한 HTML 태그</Heading>
            <ComponentPreview>
              <div className="space-y-2">
                <Body as="p" size="md">
                  p 태그로 렌더링된 문단
                </Body>
                <Body as="span" size="sm">
                  span 태그로 렌더링된 인라인 텍스트
                </Body>
                <Body as="div" size="md">
                  div 태그로 렌더링된 블록
                </Body>
              </div>
            </ComponentPreview>
            <div className="mt-4">
              <CodeBlock
                code={`<Body as="p" size="md">p 태그로 렌더링</Body>
<Body as="span" size="sm">span 태그로 렌더링</Body>
<Body as="div" size="md">div 태그로 렌더링</Body>`}
                language="tsx"
              />
            </div>
          </Stack>

          {/* Custom Styling */}
          <Stack spacing="heading-tight">
            <Heading level="h3">커스텀 스타일</Heading>
            <ComponentPreview>
              <Body size="md" className="text-primary-60">
                브랜드 컬러가 적용된 텍스트
              </Body>
            </ComponentPreview>
            <div className="mt-4">
              <CodeBlock
                code={`<Body size="md" className="text-primary-60">
  브랜드 컬러가 적용된 텍스트
</Body>`}
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
          <GuidelineBox title="Body를 사용하기 적합한 경우">
            <ul className="list-disc list-inside space-y-2">
              <li>일반 문단과 본문 콘텐츠</li>
              <li>설명 텍스트</li>
              <li>리스트 항목</li>
              <li>카드 내용</li>
              <li>캡션 및 메타 정보</li>
            </ul>
          </GuidelineBox>

          <GuidelineBox title="Body를 사용하지 말아야 하는 경우">
            <ul className="list-disc list-inside space-y-2">
              <li>페이지 제목 (Heading 사용 권장)</li>
              <li>배너 텍스트 (Display 사용 권장)</li>
              <li>폼 라벨 (Label 사용 권장)</li>
              <li>네비게이션 메뉴 (NavText 사용 권장)</li>
            </ul>
          </GuidelineBox>
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
                    <code>size</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>
                      &quot;lg&quot; | &quot;md&quot; | &quot;sm&quot; |
                      &quot;xs&quot;
                    </code>
                  </td>
                  <td className="py-3 px-4">
                    <code>&quot;md&quot;</code>
                  </td>
                  <td className="py-3 px-4">텍스트 크기</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code>weight</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>&quot;regular&quot; | &quot;bold&quot;</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>&quot;regular&quot;</code>
                  </td>
                  <td className="py-3 px-4">폰트 굵기</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code>as</code>
                  </td>
                  <td className="py-3 px-4">
                    <code>
                      &quot;p&quot; | &quot;span&quot; | &quot;div&quot;
                    </code>
                  </td>
                  <td className="py-3 px-4">
                    <code>&quot;p&quot;</code>
                  </td>
                  <td className="py-3 px-4">렌더링할 HTML 태그</td>
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
          <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-6">
            <ul className="space-y-2 text-blue-900 dark:text-blue-100">
              <li>✓ 150% 줄 간격으로 가독성 확보</li>
              <li>✓ 4단계 크기 시스템 (Large, Medium, Small, XSmall)</li>
              <li>✓ 2단계 굵기 시스템 (Regular, Bold)</li>
              <li>✓ Pretendard GOV 폰트 적용</li>
            </ul>
          </div>
        </Stack>
      </PageSection>
    </>
  );
}
