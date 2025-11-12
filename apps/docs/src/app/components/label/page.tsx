'use client';

import { Label } from '@hanui/react';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { CodeBlock } from '@/components/docs/CodeBlock';

export default function LabelPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Label</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          폼 요소를 위한 라벨 컴포넌트
        </p>
      </div>

      <div className="mb-12">
        <ComponentPreview>
          <div className="flex flex-col gap-4">
            <div>
              <Label size="lg" htmlFor="input-large">
                Large Label
              </Label>
              <input
                id="input-large"
                type="text"
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded"
              />
            </div>
            <div>
              <Label size="md" htmlFor="input-medium">
                Medium Label
              </Label>
              <input
                id="input-medium"
                type="text"
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded"
              />
            </div>
            <div>
              <Label size="sm" htmlFor="input-small">
                Small Label
              </Label>
              <input
                id="input-small"
                type="text"
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded"
              />
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Overview */}
      <div className="mb-12">
        <h2 id="overview" className="text-2xl font-bold mb-4">
          개요
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Label은 <strong>KRDS 타이포그래피 시스템</strong>의 폼 라벨
          스타일입니다. 입력 필드, 체크박스, 라디오 버튼 등 폼 요소와 함께
          사용되어 접근성을 향상시킵니다.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          시맨틱 label 태그를 사용하며, htmlFor 속성을 통해 입력 요소와
          명시적으로 연결됩니다.
        </p>
      </div>

      {/* Sizes */}
      <div className="mb-12">
        <h2 id="sizes" className="text-2xl font-bold mb-6">
          크기
        </h2>
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="mb-4">
              <Label size="lg" htmlFor="demo-large">
                Large Label - 중요한 폼 필드
              </Label>
              <input
                id="demo-large"
                type="text"
                placeholder="입력하세요"
                className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded"
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              19px · 700 (Bold) · 150% 줄 간격
            </div>
            <div className="mt-4">
              <CodeBlock
                code={`<Label size="lg" htmlFor="input-id">라벨 텍스트</Label>
<input id="input-id" type="text" />`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="mb-4">
              <Label size="md" htmlFor="demo-medium">
                Medium Label - 일반 폼 필드
              </Label>
              <input
                id="demo-medium"
                type="text"
                placeholder="입력하세요"
                className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded"
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              17px · 700 (Bold) · 150% 줄 간격
            </div>
            <div className="mt-4">
              <CodeBlock
                code={`<Label size="md" htmlFor="input-id">라벨 텍스트</Label>
<input id="input-id" type="text" />`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="mb-4">
              <Label size="sm" htmlFor="demo-small">
                Small Label - 보조 필드
              </Label>
              <input
                id="demo-small"
                type="text"
                placeholder="입력하세요"
                className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded"
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              15px · 700 (Bold) · 150% 줄 간격
            </div>
            <div className="mt-4">
              <CodeBlock
                code={`<Label size="sm" htmlFor="input-id">라벨 텍스트</Label>
<input id="input-id" type="text" />`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="mb-4">
              <Label size="xs" htmlFor="demo-xsmall">
                XSmall Label - 인라인 옵션
              </Label>
              <input
                id="demo-xsmall"
                type="text"
                placeholder="입력하세요"
                className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded"
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              13px · 700 (Bold) · 150% 줄 간격
            </div>
            <div className="mt-4">
              <CodeBlock
                code={`<Label size="xs" htmlFor="input-id">라벨 텍스트</Label>
<input id="input-id" type="text" />`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-12">
        <h2 id="usage" className="text-2xl font-bold mb-6">
          사용 예시
        </h2>

        <div className="space-y-8">
          {/* Form Fields */}
          <div>
            <h3 className="text-xl font-semibold mb-4">폼 필드</h3>
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
                    className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded"
                  />
                </div>
                <div>
                  <Label size="md" htmlFor="email">
                    이메일
                  </Label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded"
                  />
                </div>
              </div>
            </ComponentPreview>
            <div className="mt-4">
              <CodeBlock
                code={`<Label size="md" htmlFor="name">이름 *</Label>
<input id="name" type="text" required />

<Label size="md" htmlFor="email">이메일</Label>
<input id="email" type="email" />`}
                language="tsx"
              />
            </div>
          </div>

          {/* Checkbox & Radio */}
          <div>
            <h3 className="text-xl font-semibold mb-4">체크박스 & 라디오</h3>
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
            <div className="mt-4">
              <CodeBlock
                code={`<input id="agree" type="checkbox" />
<Label size="md" htmlFor="agree">이용약관에 동의합니다</Label>

<input id="option1" type="radio" name="option" />
<Label size="sm" htmlFor="option1">옵션 1</Label>`}
                language="tsx"
              />
            </div>
          </div>

          {/* Required Fields */}
          <div>
            <h3 className="text-xl font-semibold mb-4">필수 필드 표시</h3>
            <ComponentPreview>
              <div className="max-w-md">
                <Label size="md" htmlFor="required-field">
                  필수 입력 항목 <span className="text-red-500">*</span>
                </Label>
                <input
                  id="required-field"
                  type="text"
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded"
                />
              </div>
            </ComponentPreview>
            <div className="mt-4">
              <CodeBlock
                code={`<Label size="md" htmlFor="required-field">
  필수 입력 항목 <span className="text-red-500">*</span>
</Label>
<input id="required-field" type="text" required />`}
                language="tsx"
              />
            </div>
          </div>

          {/* Custom Styling */}
          <div>
            <h3 className="text-xl font-semibold mb-4">커스텀 스타일</h3>
            <ComponentPreview>
              <Label size="md" htmlFor="custom" className="text-primary-60">
                브랜드 컬러 라벨
              </Label>
              <input
                id="custom"
                type="text"
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded"
              />
            </ComponentPreview>
            <div className="mt-4">
              <CodeBlock
                code={`<Label size="md" htmlFor="custom" className="text-primary-60">
  브랜드 컬러 라벨
</Label>`}
                language="tsx"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div className="mb-12">
        <h2 id="guidelines" className="text-2xl font-bold mb-6">
          사용 가이드라인
        </h2>

        <div className="space-y-6">
          <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 p-6">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
              ✓ Label을 사용하기 적합한 경우
            </h3>
            <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
              <li>텍스트 입력 필드</li>
              <li>체크박스와 라디오 버튼</li>
              <li>셀렉트 박스</li>
              <li>텍스트 영역 (textarea)</li>
              <li>모든 폼 요소의 설명</li>
            </ul>
          </div>

          <div className="rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-6">
            <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
              ⚠ 주의사항
            </h3>
            <ul className="list-disc list-inside space-y-2 text-amber-800 dark:text-amber-200">
              <li>항상 htmlFor 속성으로 입력 요소와 연결</li>
              <li>필수 필드는 명확하게 표시 (*, 필수 등)</li>
              <li>라벨 텍스트는 간결하고 명확하게 작성</li>
            </ul>
          </div>

          <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-6">
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-3">
              ✗ Label을 사용하지 말아야 하는 경우
            </h3>
            <ul className="list-disc list-inside space-y-2 text-red-800 dark:text-red-200">
              <li>일반 본문 텍스트 (Body 사용 권장)</li>
              <li>페이지 제목 (Heading 사용 권장)</li>
              <li>버튼 텍스트 (Button 컴포넌트 사용)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* API */}
      <div className="mb-12">
        <h2 id="api" className="text-2xl font-bold mb-6">
          API
        </h2>
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
                <td className="py-3 px-4">라벨 크기</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 px-4">
                  <code>htmlFor</code>
                </td>
                <td className="py-3 px-4">
                  <code>string</code>
                </td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">연결할 입력 요소의 id</td>
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
                <td className="py-3 px-4">라벨 내용</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility */}
      <div className="mb-12">
        <h2 id="accessibility" className="text-2xl font-bold mb-6">
          접근성
        </h2>
        <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-6">
          <ul className="space-y-2 text-blue-900 dark:text-blue-100">
            <li>✓ label 태그 사용으로 스크린 리더가 폼 요소를 정확히 식별</li>
            <li>✓ htmlFor 속성으로 입력 요소와 명시적 연결</li>
            <li>✓ 라벨 클릭 시 연결된 입력 요소에 포커스</li>
            <li>✓ 필수 필드는 시각적/의미적으로 명확히 표시</li>
          </ul>
        </div>
      </div>

      {/* KRDS Compliance */}
      <div className="mb-12">
        <h2 id="krds" className="text-2xl font-bold mb-6">
          KRDS 준수사항
        </h2>
        <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-6">
          <ul className="space-y-2 text-blue-900 dark:text-blue-100">
            <li>✓ 모든 Label은 Bold (700) 폰트 굵기 사용</li>
            <li>✓ 150% 줄 간격으로 가독성 확보</li>
            <li>✓ 4단계 크기 시스템 (Large, Medium, Small, XSmall)</li>
            <li>✓ Pretendard GOV 폰트 적용</li>
          </ul>
        </div>
      </div>
    </>
  );
}
