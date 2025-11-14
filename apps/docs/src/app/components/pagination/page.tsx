'use client';

import { Pagination, Heading, Body, Stack, SkipLink } from '@hanui/react';
import { useState } from 'react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { GuidelineSection } from '@/components/content/GuidelineSection';

export default function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(10);
  const [currentPage4, setCurrentPage4] = useState(10);
  const [currentPage5, setCurrentPage5] = useState(1);
  const [currentPage6, setCurrentPage6] = useState(1);
  const [currentPage7, setCurrentPage7] = useState(1);

  return (
    <>
      {/* Skip Link */}
      <SkipLink
        links={[{ href: '#pagination-content', label: '본문 바로가기' }]}
      />

      {/* Header */}
      <PageHeader
        title="Pagination (페이지네이션)"
        description="페이지 네비게이션을 제공하는 KRDS 기반 페이지네이션 컴포넌트입니다."
      />

      {/* Quick Start */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="pagination-content">
            Quick Start
          </Heading>
          <Body>
            Pagination 컴포넌트는 많은 콘텐츠를 여러 페이지로 나누어 표시할 때
            사용하는 네비게이션 컴포넌트입니다.
          </Body>
        </Stack>

        <div className="mt-4 space-y-4">
          <div className="flex justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
            />
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            현재 페이지: {currentPage}
          </p>

          <CodeBlock
            code={`import { Pagination } from '@hanui/react';
import { useState } from 'react';

export default function Example() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
    />
  );
}`}
            language="tsx"
            showLineNumbers={false}
          />
        </div>
      </PageSection>

      {/* Examples */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="examples">
            Examples
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Basic Pagination */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="basic">
              Basic Pagination
            </Heading>
            <Body>
              기본 페이지네이션입니다. 이전/다음 버튼과 페이지 번호를
              표시합니다.
            </Body>

            <div className="space-y-4">
              <div className="flex justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <Pagination
                  currentPage={currentPage2}
                  totalPages={20}
                  onPageChange={setCurrentPage2}
                />
              </div>

              <CodeBlock
                code={`<Pagination
  currentPage={currentPage}
  totalPages={20}
  onPageChange={setCurrentPage}
/>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </Stack>

          {/* With Sibling Count */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="sibling-count">
              Sibling Count
            </Heading>
            <Body>
              siblingCount로 현재 페이지 양쪽에 표시할 페이지 수를 조정할 수
              있습니다. 기본값은 1입니다.
            </Body>

            <div className="space-y-4">
              <div className="space-y-6 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div>
                  <Body size="sm" className="mb-2 text-center">
                    siblingCount = 1 (기본값)
                  </Body>
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={currentPage3}
                      totalPages={20}
                      onPageChange={setCurrentPage3}
                      siblingCount={1}
                    />
                  </div>
                </div>
                <div>
                  <Body size="sm" className="mb-2 text-center">
                    siblingCount = 2
                  </Body>
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={currentPage4}
                      totalPages={20}
                      onPageChange={setCurrentPage4}
                      siblingCount={2}
                    />
                  </div>
                </div>
              </div>

              <CodeBlock
                code={`// 기본값
<Pagination
  currentPage={currentPage}
  totalPages={20}
  onPageChange={setCurrentPage}
  siblingCount={1}
/>

// 더 많은 페이지 번호 표시
<Pagination
  currentPage={currentPage}
  totalPages={20}
  onPageChange={setCurrentPage}
  siblingCount={2}
/>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </Stack>

          {/* Few Pages */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="few-pages">
              Few Pages
            </Heading>
            <Body>
              페이지가 적을 때는 생략 부호(...) 없이 모든 페이지 번호가
              표시됩니다.
            </Body>

            <div className="space-y-4">
              <div className="flex justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <Pagination
                  currentPage={currentPage5}
                  totalPages={5}
                  onPageChange={setCurrentPage5}
                />
              </div>

              <CodeBlock
                code={`<Pagination
  currentPage={currentPage}
  totalPages={5}
  onPageChange={setCurrentPage}
/>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </Stack>

          {/* Many Pages */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="many-pages">
              Many Pages
            </Heading>
            <Body>
              페이지가 많을 때는 생략 부호(...)를 사용하여 간결하게 표시됩니다.
            </Body>

            <div className="space-y-4">
              <div className="flex justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <Pagination
                  currentPage={currentPage6}
                  totalPages={100}
                  onPageChange={setCurrentPage6}
                />
              </div>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                총 100페이지 중 {currentPage6}페이지
              </p>

              <CodeBlock
                code={`<Pagination
  currentPage={currentPage}
  totalPages={100}
  onPageChange={setCurrentPage}
/>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </Stack>

          {/* Practical Example */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="practical">
              Practical Example
            </Heading>
            <Body>
              실제 데이터 목록과 함께 사용하는 예제입니다. 페이지 변경 시 목록이
              업데이트됩니다.
            </Body>

            <div className="space-y-4">
              <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                {/* Mock Data List */}
                <div className="space-y-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        항목 {(currentPage7 - 1) * 5 + i + 1}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        페이지 {currentPage7}의 항목입니다.
                      </p>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center pt-4">
                  <Pagination
                    currentPage={currentPage7}
                    totalPages={10}
                    onPageChange={setCurrentPage7}
                  />
                </div>
              </div>

              <CodeBlock
                code={`// 데이터 계산
const itemsPerPage = 5;
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentItems = allItems.slice(startIndex, endIndex);
const totalPages = Math.ceil(allItems.length / itemsPerPage);

return (
  <div>
    {/* 현재 페이지의 항목 표시 */}
    {currentItems.map(item => (
      <div key={item.id}>{item.name}</div>
    ))}

    {/* 페이지네이션 */}
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  </div>
);`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Guidelines */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="guidelines">
            Guidelines
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <GuidelineSection title="언제 사용하나요?" type="do">
            <ul className="list-disc list-inside space-y-2">
              <li>한 페이지에 표시하기에 너무 많은 항목이 있을 때</li>
              <li>사용자가 콘텐츠를 순차적으로 탐색할 때</li>
              <li>검색 결과, 데이터 테이블, 게시판 등에서</li>
              <li>페이지 단위로 데이터를 로드해야 할 때</li>
              <li>전체 데이터의 양을 사용자에게 보여주고 싶을 때</li>
            </ul>
          </GuidelineSection>

          <GuidelineSection title="언제 사용하지 말아야 하나요?" type="dont">
            <ul className="list-disc list-inside space-y-2">
              <li>
                항목이 20개 이하일 때는 한 페이지에 모두 표시하는 것을
                고려하세요
              </li>
              <li>
                무한 스크롤이 더 적합한 소셜 미디어 피드 같은 경우는 피하세요
              </li>
              <li>
                순서가 중요하지 않은 콘텐츠에는 다른 네비게이션을 고려하세요
              </li>
              <li>
                페이지 수가 너무 많으면 (100개 이상) 검색이나 필터 기능을 먼저
                제공하세요
              </li>
            </ul>
          </GuidelineSection>
        </Stack>
      </PageSection>

      {/* Accessibility */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="accessibility">
            Accessibility
          </Heading>
          <Body weight="bold">
            이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 AA 기준을 준수합니다:
          </Body>
        </Stack>

        <Stack spacing="content" className="mt-2 md:mt-4">
          <Body weight="bold">시맨틱 HTML</Body>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>nav 요소를 사용하여 네비게이션 영역임을 명시합니다</li>
            <li>적절한 button 요소로 모든 상호작용 지점을 구현합니다</li>
          </ul>

          <Body weight="bold" className="mt-4">
            스크린 리더 지원
          </Body>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>aria-label로 페이지네이션 영역임을 설명합니다</li>
            <li>aria-current="page"로 현재 페이지를 명확히 표시합니다</li>
            <li>각 버튼에 명확한 aria-label을 제공합니다</li>
            <li>생략 부호(...)는 aria-hidden으로 스크린 리더에서 숨깁니다</li>
          </ul>

          <Body weight="bold" className="mt-4">
            키보드 탐색
          </Body>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Tab 키로 모든 버튼에 접근할 수 있습니다</li>
            <li>Enter 또는 Space 키로 페이지를 변경할 수 있습니다</li>
            <li>포커스 상태가 명확한 링 스타일로 표시됩니다</li>
            <li>
              현재 페이지 버튼은 disabled 처리되어 불필요한 탐색을 방지합니다
            </li>
          </ul>

          <Body weight="bold" className="mt-4">
            터치 접근성
          </Body>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>모든 버튼은 최소 40px 이상의 터치 영역을 보장합니다</li>
            <li>버튼 간 충분한 간격으로 오터치를 방지합니다</li>
          </ul>
        </Stack>
      </PageSection>

      {/* Design Principles */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="design-principles">
            Design Principles
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Stack spacing="heading-tight">
            <Heading level="h3">
              1. 명확한 현재 위치 (Clear Current Position)
            </Heading>
            <Body>
              현재 페이지는 파란색 배경으로 강조되어 사용자가 자신의 위치를 쉽게
              파악할 수 있습니다.
            </Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">
              2. 효율적인 탐색 (Efficient Navigation)
            </Heading>
            <Body>
              이전/다음 버튼과 직접 페이지 선택을 모두 제공하여 빠른 탐색을
              가능하게 합니다. 생략 부호로 많은 페이지도 간결하게 표시합니다.
            </Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">
              3. 예측 가능한 동작 (Predictable Behavior)
            </Heading>
            <Body>
              첫 페이지에서는 이전 버튼이, 마지막 페이지에서는 다음 버튼이
              비활성화되어 예측 가능한 인터페이스를 제공합니다.
            </Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">
              4. 유연한 설정 (Flexible Configuration)
            </Heading>
            <Body>
              siblingCount로 표시되는 페이지 수를 조정할 수 있어 다양한 화면
              크기와 요구사항에 맞출 수 있습니다.
            </Body>
          </Stack>
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api">
            API Reference
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Stack spacing="heading-tight">
            <Heading level="h3">Pagination</Heading>
            <Body>페이지네이션의 루트 컴포넌트입니다.</Body>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold w-1/5">
                      Prop
                    </th>
                    <th className="text-left py-3 px-4 font-semibold w-2/5">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-semibold w-1/6">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 font-semibold w-1/4">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-mono text-sm">currentPage</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      number
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      현재 페이지 번호 (1부터 시작)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-mono text-sm">totalPages</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      number
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      전체 페이지 수
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-mono text-sm">
                      onPageChange
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      (page: number) =&gt; void
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      페이지 변경 시 호출되는 함수
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-mono text-sm">
                      siblingCount
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      number
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">1</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      현재 페이지 양쪽에 표시할 페이지 수
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-mono text-sm">className</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      string
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      추가 CSS 클래스
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Best Practices */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="best-practices">
            Best Practices
          </Heading>
        </Stack>

        <Stack spacing="content" className="mt-2 md:mt-4">
          <Body weight="bold">1. URL 동기화</Body>
          <Body>
            페이지 번호를 URL 쿼리 파라미터와 동기화하면 사용자가 페이지를
            북마크하거나 공유할 수 있습니다.
          </Body>

          <Body weight="bold" className="mt-4">
            2. 로딩 상태 표시
          </Body>
          <Body>
            페이지 변경 시 로딩 인디케이터를 표시하여 사용자에게 명확한 피드백을
            제공하세요.
          </Body>

          <Body weight="bold" className="mt-4">
            3. 스크롤 위치 관리
          </Body>
          <Body>
            페이지 변경 시 목록의 상단으로 자동 스크롤하면 사용자 경험이
            향상됩니다.
          </Body>

          <Body weight="bold" className="mt-4">
            4. 반응형 siblingCount
          </Body>
          <Body>
            화면 크기에 따라 siblingCount를 조정하면 모바일에서도 깔끔한
            레이아웃을 유지할 수 있습니다.
          </Body>

          <Body weight="bold" className="mt-4">
            5. 컨텍스트 정보 제공
          </Body>
          <Body>
            &quot;총 500개 항목 중 1-20&quot;과 같은 정보를 함께 표시하면
            사용자가 전체 맥락을 이해하기 쉽습니다.
          </Body>
        </Stack>
      </PageSection>

      {/* Foundation Layer */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="foundation-layer">
            Foundation Layer
          </Heading>
          <Body>
            HANUI의 Pagination 컴포넌트는 다음과 같은 기반 기능을 자동으로
            제공합니다:
          </Body>
        </Stack>

        <Stack spacing="content" className="mt-2 md:mt-4">
          <Body weight="bold">1. 시맨틱 HTML 구조</Body>
          <Body>
            nav 요소와 button 요소를 사용하여 접근성과 의미 있는 HTML 구조를
            제공합니다.
          </Body>

          <Body weight="bold" className="mt-4">
            2. WCAG 2.1 / KWCAG 2.2 준수
          </Body>
          <Body>
            aria-label, aria-current 속성을 통해 웹 접근성 표준을 준수합니다.
          </Body>

          <Body weight="bold" className="mt-4">
            3. 스크린 리더 지원
          </Body>
          <Body>
            각 버튼에 명확한 레이블을 제공하고, 현재 페이지를 aria-current로
            표시하여 스크린 리더 사용자가 현재 위치를 파악할 수 있습니다.
          </Body>

          <Body weight="bold" className="mt-4">
            4. 키보드 네비게이션
          </Body>
          <Body>
            Tab 키로 모든 버튼에 접근 가능하며, Enter/Space 키로 페이지를 변경할
            수 있습니다. 포커스 상태가 명확하게 표시됩니다.
          </Body>

          <Body weight="bold" className="mt-4">
            5. 다크 모드
          </Body>
          <Body>
            버튼, 텍스트, 배경색이 자동으로 다크 모드에 최적화되어 표시됩니다.
          </Body>
        </Stack>
      </PageSection>
    </>
  );
}
