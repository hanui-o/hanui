'use client';

import { Select, Heading, Body, Stack } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Installation } from '@/components/content/Installation';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { useState } from 'react';

export default function SelectPage() {
  const [selectedValue, setSelectedValue] = useState('');
  const [multipleValues, setMultipleValues] = useState<string[]>([]);

  const options = [
    { value: 'apple', label: '사과' },
    { value: 'banana', label: '바나나' },
    { value: 'orange', label: '오렌지' },
    { value: 'grape', label: '포도' },
    { value: 'strawberry', label: '딸기' },
  ];

  const categoryOptions = [
    { value: 'electronics', label: '전자제품' },
    { value: 'clothing', label: '의류' },
    { value: 'food', label: '식품' },
    { value: 'books', label: '도서' },
    { value: 'sports', label: '스포츠' },
  ];

  return (
    <>
      <PageHeader
        title="Select"
        description="접근성을 고려한 선택 목록 컴포넌트"
      />

      <PageSection>
        <ComponentPreview>
          <div className="max-w-md">
            <Select
              options={options}
              value={selectedValue}
              onChange={(value) =>
                setSelectedValue(Array.isArray(value) ? value[0] : value)
              }
              placeholder="과일을 선택하세요"
            />
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
            선택 목록은 여러 옵션 중 하나 또는 여러 개를 선택할 수 있는
            컴포넌트입니다. HANUI Select는{' '}
            <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>를 준수하여
            키보드 네비게이션, ARIA 속성, 스크린 리더 지원 등 완전한 접근성을
            제공합니다.
          </Body>
        </Stack>
      </PageSection>

      {/* Usage Guidelines */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="guidelines">
            사용 가이드라인
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* When to use */}
          <Stack spacing="heading-tight">
            <Heading level="h3">언제 사용해야 하나요?</Heading>
            <div className="grid grid-cols-1 gap-4">
              <GuidelineSection
                type="do"
                title="선택 목록을 사용하기 적합한 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>옵션이 5개 이상인 경우</li>
                  <li>국가, 도시 등 많은 선택지가 있는 경우</li>
                  <li>카테고리, 분류를 선택할 때</li>
                  <li>정렬 옵션 선택 (최신순, 인기순 등)</li>
                </ul>
              </GuidelineSection>

              <GuidelineSection
                type="dont"
                title="선택 목록을 사용하지 말아야 하는 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>선택지가 3개 이하인 경우 → Radio Button 사용</li>
                  <li>
                    모든 옵션을 한눈에 비교해야 하는 경우 → Radio Button 사용
                  </li>
                  <li>
                    텍스트 입력이 필요한 경우 → Input with Autocomplete 사용
                  </li>
                </ul>
              </GuidelineSection>
            </div>
          </Stack>

          {/* Sorting Options */}
          <Stack spacing="heading-tight">
            <Heading level="h3">옵션 정렬</Heading>
            <GuidelineSection type="do" title="논리적 순서로 정렬">
              <p className="mb-3">
                알파벳순, 가나다순 등 예측 가능한 순서로 정렬하거나, 사용 빈도가
                높은 순서로 배치합니다. 무작위 순서는 사용자 혼란을 야기합니다.
              </p>
              <ComponentPreview>
                <div className="max-w-md">
                  <Select
                    options={categoryOptions}
                    value=""
                    onChange={() => {}}
                    placeholder="카테고리 선택 (가나다순)"
                  />
                </div>
              </ComponentPreview>
            </GuidelineSection>
          </Stack>

          {/* Label */}
          <Stack spacing="heading-tight">
            <Heading level="h3">명확한 레이블</Heading>
            <GuidelineSection type="do" title="구체적인 레이블 제공">
              <p className="mb-3">
                &quot;선택하세요&quot;가 아닌 &quot;배송 국가를
                선택하세요&quot;처럼 무엇을 선택하는지 명확히 알려줍니다.
              </p>
              <ComponentPreview>
                <div className="max-w-md space-y-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium"
                  >
                    배송 국가
                  </label>
                  <Select
                    options={[
                      { value: 'kr', label: '대한민국' },
                      { value: 'us', label: '미국' },
                      { value: 'jp', label: '일본' },
                    ]}
                    value=""
                    onChange={() => {}}
                    placeholder="국가를 선택하세요"
                  />
                </div>
              </ComponentPreview>
            </GuidelineSection>
          </Stack>
        </Stack>
      </PageSection>

      <PageSection>
        <Installation componentName="select" />
      </PageSection>

      {/* Usage */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="usage">
            사용법
          </Heading>
          <CodeBlock
            code={`import { Select } from '@hanui/react'

const options = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
];

<Select
  options={options}
  value={value}
  onChange={setValue}
  placeholder="과일을 선택하세요"
/>`}
            language="tsx"
            showLineNumbers={false}
          />
        </Stack>
      </PageSection>

      {/* Examples */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="examples">
            예제
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Default */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="default">
              기본
            </Heading>
            <div>
              <ComponentPreview>
                <div className="max-w-md">
                  <Select
                    options={options}
                    value={selectedValue}
                    onChange={(value) =>
                      setSelectedValue(Array.isArray(value) ? value[0] : value)
                    }
                    placeholder="과일을 선택하세요"
                  />
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Select
  options={options}
  value={value}
  onChange={setValue}
  placeholder="과일을 선택하세요"
/>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* With Label */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="with-label">
              라벨 포함
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <Body size="sm" className="text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 모든 선택 목록에는 명확한
                  레이블이 필요합니다. label 요소의 htmlFor와 Select의 id를
                  연결하여 접근성을 보장합니다.
                </Body>
              </div>
              <ComponentPreview>
                <div className="max-w-md space-y-2">
                  <label
                    htmlFor="fruit-select"
                    className="block text-sm font-medium"
                  >
                    좋아하는 과일
                  </label>
                  <Select
                    options={options}
                    value=""
                    onChange={() => {}}
                    placeholder="과일을 선택하세요"
                  />
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<label className="block text-sm font-medium">
  좋아하는 과일
</label>
<Select
  options={options}
  value={value}
  onChange={setValue}
  placeholder="과일을 선택하세요"
/>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Multiple Selection */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="multiple">
              다중 선택
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <Body size="sm" className="text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 여러 항목을 동시에 선택해야
                  할 때 사용합니다. 선택된 항목은 태그 형태로 표시되어 현재 선택
                  상태를 명확히 보여줍니다.
                </Body>
              </div>
              <ComponentPreview>
                <div className="max-w-md">
                  <Select
                    options={options}
                    value={multipleValues}
                    onChange={(value) =>
                      setMultipleValues(Array.isArray(value) ? value : [value])
                    }
                    placeholder="여러 과일을 선택하세요"
                    multiple
                  />
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Select
  options={options}
  value={multipleValues}
  onChange={setMultipleValues}
  placeholder="여러 과일을 선택하세요"
  multiple
/>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Disabled */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="disabled">
              비활성화
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <Body size="sm" className="text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 특정 조건이 충족되지 않아
                  선택을 받을 수 없을 때 사용합니다. 예: 이전 단계 미완료, 권한
                  없음
                </Body>
              </div>
              <ComponentPreview>
                <div className="max-w-md">
                  <Select
                    options={options}
                    value=""
                    onChange={() => {}}
                    placeholder="비활성화된 선택"
                    disabled
                  />
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Select
  options={options}
  value=""
  onChange={() => {}}
  placeholder="비활성화된 선택"
  disabled
/>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Error State */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="error">
              에러 상태
            </Heading>
            <div>
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <Body size="sm" className="text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 필수 선택 항목이 선택되지
                  않았거나, 유효하지 않은 선택일 때 에러 상태를 표시합니다.
                </Body>
              </div>
              <ComponentPreview>
                <div className="max-w-md space-y-2">
                  <Select
                    options={options}
                    value=""
                    onChange={() => {}}
                    placeholder="과일을 선택하세요"
                    error
                  />
                  <p className="text-sm text-red-600">필수 선택 항목입니다.</p>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Select
  options={options}
  value=""
  onChange={() => {}}
  placeholder="과일을 선택하세요"
  error
/>
<p className="text-sm text-red-600">필수 선택 항목입니다.</p>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>
    </>
  );
}
