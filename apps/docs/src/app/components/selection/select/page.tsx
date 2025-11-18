'use client';

import { Select, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { SectionHeading } from '@/components/hanui/section-header';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/hanui/tabs';
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
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview">
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
            <SectionHeading level="h2" id="overview" title="개요">
              <Body className="leading-relaxed">
                선택 목록은 여러 옵션 중 하나 또는 여러 개를 선택할 수 있는
                컴포넌트입니다. HANUI Select는{' '}
                <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>를 준수하여
                키보드 네비게이션, ARIA 속성, 스크린 리더 지원 등 완전한
                접근성을 제공합니다.
              </Body>
            </SectionHeading>

            <SectionHeading
              level="h2"
              id="installation"
              title="설치"
              description="CLI 명령어로 Select 컴포넌트를 프로젝트에 추가합니다."
            />
            <CodeBlock
              code={`npx @hanui/cli add select`}
              language="bash"
              showLineNumbers={false}
            />
            <Body size="sm" className="text-krds-gray-70">
              의존성 설치, 사용 방법, 커스터마이징 등 자세한 내용은{' '}
              <a
                href="/docs/quick-start"
                className="text-gray-900 hover:text-gray-700 underline"
              >
                Quick Start 가이드
              </a>
              를 참고하세요.
            </Body>

            <SectionHeading level="h2" id="usage" title="사용법" />
            <CodeBlock
              code={`import { Select } from '@/components/hanui/select'

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

            {/* 가이드라인 섹션 */}
            <SectionHeading
              level="h2"
              id="guidelines"
              title="사용 가이드라인"
            />

            {/* When to use */}
            <SectionHeading level="h3" title="언제 사용해야 하나요?" />
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

            {/* Sorting Options */}
            <SectionHeading level="h3" title="옵션 정렬" />
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

            {/* Label */}
            <SectionHeading level="h3" title="명확한 레이블" />
            <GuidelineSection type="do" title="구체적인 레이블 제공">
              <p className="mb-3">
                &quot;선택하세요&quot;가 아닌 &quot;배송 국가를
                선택하세요&quot;처럼 무엇을 선택하는지 명확히 알려줍니다.
              </p>
              <ComponentPreview>
                <div className="max-w-md space-y-2">
                  <label htmlFor="country" className="block font-medium">
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

            {/* 예제 섹션 */}
            <SectionHeading level="h2" id="examples" title="예제" />

            {/* Default */}
            <SectionHeading level="h3" id="default" title="기본" />
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

            {/* With Label */}
            <SectionHeading level="h3" id="with-label" title="라벨 포함" />
            <div className="mb-3 p-3 bg-krds-primary-surface rounded-md border border-krds-primary-border">
              <Body size="sm" className="text-krds-primary-text">
                <strong>언제 사용하나요?</strong> 모든 선택 목록에는 명확한
                레이블이 필요합니다. label 요소의 htmlFor와 Select의 id를
                연결하여 접근성을 보장합니다.
              </Body>
            </div>
            <ComponentPreview>
              <div className="max-w-md space-y-2">
                <label htmlFor="fruit-select" className="block font-medium">
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
            <CodeBlock
              code={`<label className="block font-medium">
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

            {/* Multiple Selection */}
            <SectionHeading level="h3" id="multiple" title="다중 선택" />
            <div className="mb-3 p-3 bg-krds-primary-surface rounded-md border border-krds-primary-border">
              <Body size="sm" className="text-krds-primary-text">
                <strong>언제 사용하나요?</strong> 여러 항목을 동시에 선택해야 할
                때 사용합니다. 선택된 항목은 태그 형태로 표시되어 현재 선택
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

            {/* Disabled */}
            <SectionHeading level="h3" id="disabled" title="비활성화" />
            <div className="mb-3 p-3 bg-krds-primary-surface rounded-md border border-krds-primary-border">
              <Body size="sm" className="text-krds-primary-text">
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

            {/* Error State */}
            <SectionHeading level="h3" id="error" title="에러 상태" />
            <div className="mb-3 p-3 bg-krds-primary-surface rounded-md border border-krds-primary-border">
              <Body size="sm" className="text-krds-primary-text">
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
                <p className="text-krds-danger-text">필수 선택 항목입니다.</p>
              </div>
            </ComponentPreview>
            <CodeBlock
              code={`<Select
  options={options}
  value=""
  onChange={() => {}}
  placeholder="과일을 선택하세요"
  error
/>
<p className="text-krds-danger-text">필수 선택 항목입니다.</p>`}
              language="tsx"
              showLineNumbers={false}
            />
          </TabsContent>

          {/* API 탭 */}
          <TabsContent value="api">
            <SectionHeading level="h2" id="props" title="Props" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-krds-gray-20">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">options</td>
                    <td className="py-3 px-4 font-mono text-xs">
                      {`Array<{value: string, label: string}>`}
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">선택 가능한 옵션 목록</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">value</td>
                    <td className="py-3 px-4 font-mono text-xs">
                      string | string[]
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">
                      현재 선택된 값 (단일 또는 다중)
                    </td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">onChange</td>
                    <td className="py-3 px-4 font-mono text-xs">
                      {`(value: string | string[]) => void`}
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">값 변경 시 호출되는 함수</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">placeholder</td>
                    <td className="py-3 px-4 font-mono text-xs">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">
                      값이 선택되지 않았을 때 표시되는 텍스트
                    </td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">multiple</td>
                    <td className="py-3 px-4 font-mono text-xs">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">다중 선택 가능 여부</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">disabled</td>
                    <td className="py-3 px-4 font-mono text-xs">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">비활성화 상태</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">error</td>
                    <td className="py-3 px-4 font-mono text-xs">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">에러 상태 표시</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">label</td>
                    <td className="py-3 px-4 font-mono text-xs">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">선택 목록의 레이블</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">className</td>
                    <td className="py-3 px-4 font-mono text-xs">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">추가 CSS 클래스</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </PageSection>
    </>
  );
}
