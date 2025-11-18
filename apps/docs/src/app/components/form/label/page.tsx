'use client';

import { Label, Body } from '@hanui/react';
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

export default function LabelPage() {
  return (
    <>
      <PageHeader title="Label" description="폼 요소를 위한 라벨 컴포넌트" />

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
                <div className="flex flex-col gap-4">
                  <div>
                    <Label size="lg" htmlFor="input-large">
                      Large Label
                    </Label>
                    <input
                      id="input-large"
                      type="text"
                      className="mt-1 w-full px-3 py-2 border border-krds-gray-20 rounded"
                    />
                  </div>
                  <div>
                    <Label size="md" htmlFor="input-medium">
                      Medium Label
                    </Label>
                    <input
                      id="input-medium"
                      type="text"
                      className="mt-1 w-full px-3 py-2 border border-krds-gray-20 rounded"
                    />
                  </div>
                  <div>
                    <Label size="sm" htmlFor="input-small">
                      Small Label
                    </Label>
                    <input
                      id="input-small"
                      type="text"
                      className="mt-1 w-full px-3 py-2 border border-krds-gray-20 rounded"
                    />
                  </div>
                </div>
              </ComponentPreview>
            </PageSection>

            {/* Overview */}
            <SectionHeading level="h2" id="overview" title="개요">
              <Body className="leading-relaxed">
                Label은 <strong>KRDS 타이포그래피 시스템</strong>의 폼 라벨
                스타일입니다. 입력 필드, 체크박스, 라디오 버튼 등 폼 요소와 함께
                사용되어 접근성을 향상시킵니다.
              </Body>
              <Body className="leading-relaxed">
                시맨틱 label 태그를 사용하며, htmlFor 속성을 통해 입력 요소와
                명시적으로 연결됩니다.
              </Body>
            </SectionHeading>

            <SectionHeading
              level="h2"
              id="installation"
              title="설치"
              description="CLI 명령어로 Label 컴포넌트를 프로젝트에 추가합니다."
            />
            <CodeBlock
              code={`npx @hanui/cli add label`}
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
              code={`import { Label } from '@/components/hanui/label'

<Label size="md" htmlFor="input-id">라벨 텍스트</Label>
<input id="input-id" type="text" />`}
              language="tsx"
              showLineNumbers={false}
            />

            {/* 가이드라인 섹션 */}
            <SectionHeading
              level="h2"
              id="guidelines"
              title="사용 가이드라인"
            />

            <SectionHeading level="h3" title="언제 사용해야 하나요?" />
            <div className="grid grid-cols-1 gap-4">
              <GuidelineSection type="do" title="Label을 사용하기 적합한 경우">
                <ul className="list-disc list-inside space-y-2">
                  <li>텍스트 입력 필드</li>
                  <li>체크박스와 라디오 버튼</li>
                  <li>셀렉트 박스</li>
                  <li>텍스트 영역 (textarea)</li>
                  <li>모든 폼 요소의 설명</li>
                </ul>
              </GuidelineSection>

              <GuidelineSection
                type="dont"
                title="Label을 사용하지 말아야 하는 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>일반 본문 텍스트 → Body 사용 권장</li>
                  <li>페이지 제목 → Heading 사용 권장</li>
                  <li>버튼 텍스트 → Button 컴포넌트 사용</li>
                </ul>
              </GuidelineSection>
            </div>

            <SectionHeading level="h3" title="주요 원칙" />
            <GuidelineSection type="do" title="필수 사항">
              <ul className="list-disc list-inside space-y-2">
                <li>항상 htmlFor 속성으로 입력 요소와 연결</li>
                <li>필수 필드는 명확하게 표시 (*, 필수 등)</li>
                <li>라벨 텍스트는 간결하고 명확하게 작성</li>
              </ul>
            </GuidelineSection>

            {/* 예제 섹션 */}
            <SectionHeading level="h2" id="examples" title="예제" />

            {/* Sizes */}
            <SectionHeading level="h3" id="sizes" title="크기 (Size)" />
            <div className="space-y-4">
              <div className="rounded-lg border border-krds-gray-20 p-6">
                <div className="mb-3">
                  <Label size="lg" htmlFor="demo-large">
                    Large Label - 중요한 폼 필드
                  </Label>
                  <input
                    id="demo-large"
                    type="text"
                    placeholder="입력하세요"
                    className="mt-2 w-full px-3 py-2 border border-krds-gray-20 rounded"
                  />
                </div>
                <Body size="sm" className="text-krds-gray-70">
                  19px · 700 (Bold) · 150% 줄 간격
                </Body>
              </div>

              <div className="rounded-lg border border-krds-gray-20 p-6">
                <div className="mb-3">
                  <Label size="md" htmlFor="demo-medium">
                    Medium Label - 일반 폼 필드
                  </Label>
                  <input
                    id="demo-medium"
                    type="text"
                    placeholder="입력하세요"
                    className="mt-2 w-full px-3 py-2 border border-krds-gray-20 rounded"
                  />
                </div>
                <Body size="sm" className="text-krds-gray-70">
                  17px · 700 (Bold) · 150% 줄 간격
                </Body>
              </div>

              <div className="rounded-lg border border-krds-gray-20 p-6">
                <div className="mb-3">
                  <Label size="sm" htmlFor="demo-small">
                    Small Label - 보조 필드
                  </Label>
                  <input
                    id="demo-small"
                    type="text"
                    placeholder="입력하세요"
                    className="mt-2 w-full px-3 py-2 border border-krds-gray-20 rounded"
                  />
                </div>
                <Body size="sm" className="text-krds-gray-70">
                  15px · 700 (Bold) · 150% 줄 간격
                </Body>
              </div>

              <div className="rounded-lg border border-krds-gray-20 p-6">
                <div className="mb-3">
                  <Label size="xs" htmlFor="demo-xsmall">
                    XSmall Label - 인라인 옵션
                  </Label>
                  <input
                    id="demo-xsmall"
                    type="text"
                    placeholder="입력하세요"
                    className="mt-2 w-full px-3 py-2 border border-krds-gray-20 rounded"
                  />
                </div>
                <Body size="sm" className="text-krds-gray-70">
                  13px · 700 (Bold) · 150% 줄 간격
                </Body>
              </div>
            </div>
            <CodeBlock
              code={`<Label size="lg" htmlFor="input-id">Large Label</Label>
<Label size="md" htmlFor="input-id">Medium Label</Label>
<Label size="sm" htmlFor="input-id">Small Label</Label>
<Label size="xs" htmlFor="input-id">XSmall Label</Label>`}
              language="tsx"
              showLineNumbers={false}
            />

            {/* Form Fields */}
            <SectionHeading level="h3" id="form-fields" title="폼 필드" />
            <ComponentPreview>
              <div className="space-y-4 max-w-md">
                <div>
                  <Label size="md" htmlFor="name">
                    이름 *
                  </Label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="mt-1 w-full px-3 py-2 border border-krds-gray-20 rounded"
                  />
                </div>
                <div>
                  <Label size="md" htmlFor="email">
                    이메일
                  </Label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 w-full px-3 py-2 border border-krds-gray-20 rounded"
                  />
                </div>
              </div>
            </ComponentPreview>
            <CodeBlock
              code={`<Label size="md" htmlFor="name">이름 *</Label>
<input id="name" type="text" required />

<Label size="md" htmlFor="email">이메일</Label>
<input id="email" type="email" />`}
              language="tsx"
              showLineNumbers={false}
            />

            {/* Checkbox & Radio */}
            <SectionHeading
              level="h3"
              id="checkbox-radio"
              title="체크박스 & 라디오"
            />
            <ComponentPreview>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input id="agree" type="checkbox" />
                  <Label size="md" htmlFor="agree" className="mb-0">
                    이용약관에 동의합니다
                  </Label>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input id="option1" type="radio" name="option" />
                    <Label size="sm" htmlFor="option1" className="mb-0">
                      옵션 1
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="option2" type="radio" name="option" />
                    <Label size="sm" htmlFor="option2" className="mb-0">
                      옵션 2
                    </Label>
                  </div>
                </div>
              </div>
            </ComponentPreview>
            <CodeBlock
              code={`<input id="agree" type="checkbox" />
<Label size="md" htmlFor="agree">이용약관에 동의합니다</Label>

<input id="option1" type="radio" name="option" />
<Label size="sm" htmlFor="option1">옵션 1</Label>`}
              language="tsx"
              showLineNumbers={false}
            />

            {/* Required Fields */}
            <SectionHeading
              level="h3"
              id="required-fields"
              title="필수 필드 표시"
            />
            <ComponentPreview>
              <div className="max-w-md">
                <Label size="md" htmlFor="required-field">
                  필수 입력 항목{' '}
                  <span className="text-krds-danger-text">*</span>
                </Label>
                <input
                  id="required-field"
                  type="text"
                  required
                  className="mt-1 w-full px-3 py-2 border border-krds-gray-20 rounded"
                />
              </div>
            </ComponentPreview>
            <CodeBlock
              code={`<Label size="md" htmlFor="required-field">
  필수 입력 항목 <span className="text-krds-danger-text">*</span>
</Label>
<input id="required-field" type="text" required />`}
              language="tsx"
              showLineNumbers={false}
            />

            {/* Custom Styling */}
            <SectionHeading
              level="h3"
              id="custom-styling"
              title="커스텀 스타일"
            />
            <ComponentPreview>
              <div>
                <Label
                  size="md"
                  htmlFor="custom"
                  className="text-krds-primary-base"
                >
                  브랜드 컬러 라벨
                </Label>
                <input
                  id="custom"
                  type="text"
                  className="mt-1 w-full px-3 py-2 border border-krds-gray-20 rounded"
                />
              </div>
            </ComponentPreview>
            <CodeBlock
              code={`<Label size="md" htmlFor="custom" className="text-krds-primary-base">
  브랜드 컬러 라벨
</Label>`}
              language="tsx"
              showLineNumbers={false}
            />

            {/* Accessibility */}
            <SectionHeading level="h2" id="accessibility" title="접근성" />
            <div className="rounded-lg border border-krds-primary-border bg-krds-primary-surface p-6">
              <ul className="space-y-2 text-krds-primary-text">
                <li>
                  ✓ label 태그 사용으로 스크린 리더가 폼 요소를 정확히 식별
                </li>
                <li>✓ htmlFor 속성으로 입력 요소와 명시적 연결</li>
                <li>✓ 라벨 클릭 시 연결된 입력 요소에 포커스</li>
                <li>✓ 필수 필드는 시각적/의미적으로 명확히 표시</li>
              </ul>
            </div>

            {/* KRDS Compliance */}
            <SectionHeading level="h2" id="krds" title="KRDS 준수사항" />
            <div className="rounded-lg border border-krds-primary-border bg-krds-primary-surface p-6">
              <ul className="space-y-2 text-krds-primary-text">
                <li>✓ 모든 Label은 Bold (700) 폰트 굵기 사용</li>
                <li>✓ 150% 줄 간격으로 가독성 확보</li>
                <li>✓ 4단계 크기 시스템 (Large, Medium, Small, XSmall)</li>
                <li>✓ Pretendard GOV 폰트 적용</li>
              </ul>
            </div>
          </TabsContent>

          {/* API 탭 */}
          <TabsContent value="api">
            <SectionHeading level="h2" id="props" title="Props" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
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
                    <td className="py-3 px-4 font-mono text-xs">size</td>
                    <td className="py-3 px-4 font-mono text-xs">
                      lg | md | sm | xs
                    </td>
                    <td className="py-3 px-4">md</td>
                    <td className="py-3 px-4">
                      라벨 크기 (19px / 17px / 15px / 13px)
                    </td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">htmlFor</td>
                    <td className="py-3 px-4 font-mono text-xs">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">연결할 입력 요소의 id</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">className</td>
                    <td className="py-3 px-4 font-mono text-xs">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">추가 CSS 클래스</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">children</td>
                    <td className="py-3 px-4 font-mono text-xs">ReactNode</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">라벨 내용</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <SectionHeading level="h2" id="size-specs" title="크기 상세" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-krds-gray-20">
                    <th className="text-left py-3 px-4 font-semibold">Size</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Font Size
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Font Weight
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Line Height
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Use Case
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">lg</td>
                    <td className="py-3 px-4">19px</td>
                    <td className="py-3 px-4">700 (Bold)</td>
                    <td className="py-3 px-4">150%</td>
                    <td className="py-3 px-4">중요한 폼 필드</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">md</td>
                    <td className="py-3 px-4">17px</td>
                    <td className="py-3 px-4">700 (Bold)</td>
                    <td className="py-3 px-4">150%</td>
                    <td className="py-3 px-4">일반 폼 필드 (기본)</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">sm</td>
                    <td className="py-3 px-4">15px</td>
                    <td className="py-3 px-4">700 (Bold)</td>
                    <td className="py-3 px-4">150%</td>
                    <td className="py-3 px-4">보조 필드</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4 font-mono text-xs">xs</td>
                    <td className="py-3 px-4">13px</td>
                    <td className="py-3 px-4">700 (Bold)</td>
                    <td className="py-3 px-4">150%</td>
                    <td className="py-3 px-4">인라인 옵션</td>
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
