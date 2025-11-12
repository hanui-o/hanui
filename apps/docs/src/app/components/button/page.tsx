'use client';

import { Button } from '@hanui/react';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Installation } from '@/components/docs/Installation';
import { GuidelineSection } from '@/components/docs/GuidelineSection';

export default function ButtonPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Button</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          다양한 스타일과 크기를 지원하는 버튼 컴포넌트
        </p>
      </div>

      <div className="mb-12">
        <ComponentPreview>
          <div className="flex items-center gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
          </div>
        </ComponentPreview>
      </div>

      {/* Overview */}
      <div className="mb-12">
        <h2 id="overview" className="text-2xl font-bold mb-4">
          개요
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          버튼은 사용자가 서비스를 이용하는 과정에서 어떤 행동이 중요한지
          알려주는 핵심 인터랙션 요소입니다. HANUI Button은{' '}
          <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>를 준수하여 공공
          웹사이트에 최적화된 접근성과 사용성을 제공합니다.
        </p>
      </div>

      {/* Usage Guidelines */}
      <div className="mb-12">
        <h2 id="guidelines" className="text-2xl font-bold mb-6">
          사용 가이드라인
        </h2>

        <div className="space-y-8">
          {/* When to use */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              언제 사용해야 하나요?
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <GuidelineSection type="do" title="버튼을 사용하기 적합한 경우">
                <ul className="list-disc list-inside space-y-2">
                  <li>입력폼 제출, 대화창 실행, 기능 취소 등</li>
                  <li>일반적인 기능을 실행할 때</li>
                  <li>상태를 전환할 때</li>
                  <li>도움말을 제공할 때</li>
                  <li>전행 중인 프로세스를 중단하거나 취소할 때</li>
                  <li>중요한 데이터를 완전히 삭제할 때</li>
                </ul>
              </GuidelineSection>

              <GuidelineSection
                type="dont"
                title="버튼을 사용하지 말아야 하는 경우"
              >
                <p>
                  현재 화면에서 완전히 다른 화면이나 서비스로 이동하는 경우에는
                  Link 컴포넌트를 사용해야 합니다.
                </p>
              </GuidelineSection>
            </div>
          </div>

          {/* Button Hierarchy */}
          <div>
            <h3 className="text-xl font-semibold mb-4">버튼 위계</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              버튼의 시각적 강조도는 액션의 중요도와 일치해야 합니다.
            </p>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Primary - 가장 중요한 액션</h4>
                  <Button variant="primary" size="sm">
                    제출
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  페이지당 하나만 사용 권장. 주요 목표 달성 액션 (제출, 저장,
                  구매 등)
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Secondary - 보조 액션</h4>
                  <Button variant="secondary" size="sm">
                    취소
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Primary와 함께 사용. 취소, 이전 단계 등
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Outline - 낮은 강조</h4>
                  <Button variant="outline" size="sm">
                    옵션
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  추가 옵션이나 덜 중요한 액션
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Ghost - 최소 강조</h4>
                  <Button variant="ghost" size="sm">
                    닫기
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  인라인 액션, 닫기 버튼 등
                </p>
              </div>
            </div>
          </div>

          {/* Button Placement */}
          <div>
            <h3 className="text-xl font-semibold mb-4">버튼 배치</h3>
            <div className="space-y-4">
              <GuidelineSection type="do" title="올바른 배치">
                <p className="mb-3">
                  가장 중요한 버튼을 오른쪽에 배치 (수평 배치 시)
                </p>
                <ComponentPreview>
                  <div className="flex items-center gap-3">
                    <Button variant="outline">취소</Button>
                    <Button variant="primary">확인</Button>
                  </div>
                </ComponentPreview>
              </GuidelineSection>

              <GuidelineSection type="dont" title="피해야 할 배치">
                <p className="mb-3">
                  한 페이지에 Primary 버튼을 여러 개 사용하지 마세요
                </p>
                <ComponentPreview>
                  <div className="flex items-center gap-3">
                    <Button variant="primary">취소</Button>
                    <Button variant="primary">확인</Button>
                  </div>
                </ComponentPreview>
              </GuidelineSection>
            </div>
          </div>

          {/* Accessibility */}
          <div>
            <h3 className="text-xl font-semibold mb-4">접근성</h3>
            <div className="space-y-4">
              <GuidelineSection type="do" title="중복 클릭 방지">
                <p className="mb-3">
                  네트워크 지연 시 사용자가 버튼을 여러 번 클릭할 수 있습니다.
                  loading 상태를 활용하세요.
                </p>
                <ComponentPreview>
                  <Button loading disabled>
                    처리 중...
                  </Button>
                </ComponentPreview>
              </GuidelineSection>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <Installation componentName="button" />
      </div>

      {/* Usage */}
      <div className="mb-12">
        <h2 id="usage" className="text-2xl font-bold mb-4">
          Usage
        </h2>
        <CodeBlock
          code={`import { Button } from '@hanui/react'

<Button variant="primary">Click me</Button>`}
          language="tsx"
          showLineNumbers={false}
        />
      </div>

      {/* Examples */}
      <div className="mb-12">
        <h2 id="examples" className="text-2xl font-bold mb-6">
          Examples
        </h2>

        {/* Default */}
        <div className="mb-10">
          <h3 id="default" className="text-xl font-semibold mb-4">
            Default
          </h3>
          <ComponentPreview>
            <Button>Button</Button>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button>Button</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-10">
          <h3 id="sizes" className="text-xl font-semibold mb-4">
            Sizes
          </h3>
          <ComponentPreview>
            <div className="flex items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Primary */}
        <div className="mb-10">
          <h3 id="primary" className="text-xl font-semibold mb-4">
            Primary
          </h3>
          <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>언제 사용하나요?</strong> 페이지에서 가장 중요한 액션에
              사용합니다. 예: 회원가입 완료, 결제하기, 제출
            </p>
          </div>
          <ComponentPreview>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">회원가입</Button>
              <Button variant="primary">결제하기</Button>
              <Button variant="primary">제출</Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button variant="primary">회원가입</Button>
<Button variant="primary">결제하기</Button>
<Button variant="primary">제출</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Secondary */}
        <div className="mb-10">
          <h3 id="secondary" className="text-xl font-semibold mb-4">
            Secondary
          </h3>
          <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>언제 사용하나요?</strong> Primary 버튼의 보조 액션에
              사용합니다. 예: 취소, 뒤로가기, 건너뛰기
            </p>
          </div>
          <ComponentPreview>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary">취소</Button>
              <Button variant="secondary">뒤로가기</Button>
              <Button variant="secondary">건너뛰기</Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button variant="secondary">취소</Button>
<Button variant="secondary">뒤로가기</Button>
<Button variant="secondary">건너뛰기</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Success & Danger */}
        <div className="mb-10">
          <h3 id="status-variants" className="text-xl font-semibold mb-4">
            Success & Danger
          </h3>
          <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>언제 사용하나요?</strong> Success는 긍정적 결과, Danger는
              삭제나 위험한 액션에 사용합니다.
            </p>
          </div>
          <ComponentPreview>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="success">승인</Button>
              <Button variant="danger">삭제</Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button variant="success">승인</Button>
<Button variant="danger">삭제</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Outline */}
        <div className="mb-10">
          <h3 id="outline" className="text-xl font-semibold mb-4">
            Outline
          </h3>
          <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>언제 사용하나요?</strong> 중간 수준의 강조가 필요한 경우에
              사용합니다. 예: 필터 옵션, 추가 설정, 보조 기능
            </p>
          </div>
          <ComponentPreview>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline">필터</Button>
              <Button variant="outline">설정</Button>
              <Button variant="outline">더보기</Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button variant="outline">필터</Button>
<Button variant="outline">설정</Button>
<Button variant="outline">더보기</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Ghost */}
        <div className="mb-10">
          <h3 id="ghost" className="text-xl font-semibold mb-4">
            Ghost
          </h3>
          <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>언제 사용하나요?</strong> 최소한의 시각적 강조가 필요한
              경우에 사용합니다. 예: 닫기, 접기/펼치기, 인라인 액션
            </p>
          </div>
          <ComponentPreview>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="ghost">닫기</Button>
              <Button variant="ghost">접기</Button>
              <Button variant="ghost">편집</Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button variant="ghost">닫기</Button>
<Button variant="ghost">접기</Button>
<Button variant="ghost">편집</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Black */}
        <div className="mb-10">
          <h3 id="ghost-primary" className="text-xl font-semibold mb-4">
            Ghost Primary
          </h3>
          <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>언제 사용하나요?</strong> Ghost 스타일이지만 Primary
              색상으로 약간의 강조가 필요한 경우. 예: 중요한 링크형 액션
            </p>
          </div>
          <ComponentPreview>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="ghost-primary">자세히 보기</Button>
              <Button variant="ghost-primary">더 알아보기</Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button variant="ghost-primary">자세히 보기</Button>
<Button variant="ghost-primary">더 알아보기</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Loading */}
        <div className="mb-10">
          <h3 id="loading" className="text-xl font-semibold mb-4">
            Loading
          </h3>
          <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>언제 사용하나요?</strong> 비동기 작업 처리 중임을 표시하고
              중복 클릭을 방지할 때 사용합니다. 예: 데이터 전송, 파일 업로드
            </p>
          </div>
          <ComponentPreview>
            <div className="flex flex-wrap items-center gap-3">
              <Button loading>처리 중...</Button>
              <Button loading disabled>
                제출 중...
              </Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button loading>처리 중...</Button>
<Button loading disabled>제출 중...</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Disabled */}
        <div className="mb-10">
          <h3 id="disabled" className="text-xl font-semibold mb-4">
            Disabled
          </h3>
          <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>언제 사용하나요?</strong> 특정 조건이 충족되지 않아 액션을
              수행할 수 없을 때 사용합니다. 예: 필수 입력 미완료, 권한 없음
            </p>
          </div>
          <ComponentPreview>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>제출 불가</Button>
              <Button variant="outline" disabled>
                권한 없음
              </Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button disabled>제출 불가</Button>
<Button variant="outline" disabled>권한 없음</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
