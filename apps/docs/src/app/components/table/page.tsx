'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  Heading,
  Body,
  Stack,
  SkipLink,
} from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { GuidelineSection } from '@/components/content/GuidelineSection';

export default function TablePage() {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>(
    'asc'
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <>
      {/* Skip Link */}
      <SkipLink links={[{ href: '#table-content', label: '본문 바로가기' }]} />

      {/* Header */}
      <PageHeader
        title="Table (테이블)"
        description="데이터를 구조화하여 표시하는 KRDS 기반 테이블 컴포넌트입니다."
      />

      {/* Quick Start */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="table-content">
            Quick Start
          </Heading>
          <Body>
            Table 컴포넌트는 정형 데이터를 표 형식으로 표시하는 컴포넌트입니다.
            compound pattern을 사용하여 유연하고 접근성 높은 테이블을
            구성합니다.
          </Body>
        </Stack>

        <div className="mt-4 space-y-4">
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>역할</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>김철수</TableCell>
                  <TableCell>개발자</TableCell>
                  <TableCell>활성</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>이영희</TableCell>
                  <TableCell>디자이너</TableCell>
                  <TableCell>활성</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>박민수</TableCell>
                  <TableCell>기획자</TableCell>
                  <TableCell>대기</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <CodeBlock
            code={`import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>이름</TableHead>
      <TableHead>역할</TableHead>
      <TableHead>상태</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>김철수</TableCell>
      <TableCell>개발자</TableCell>
      <TableCell>활성</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>이영희</TableCell>
      <TableCell>디자이너</TableCell>
      <TableCell>활성</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
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
          {/* With Caption */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="with-caption">
              With Caption
            </Heading>
            <Body>
              TableCaption을 사용하여 테이블에 설명을 추가할 수 있습니다. 스크린
              리더 사용자에게 테이블의 목적을 명확히 전달합니다.
            </Body>

            <div className="space-y-4">
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <Table>
                  <TableCaption>2024년 1분기 매출 현황</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>월</TableHead>
                      <TableHead>매출</TableHead>
                      <TableHead>성장률</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1월</TableCell>
                      <TableCell>1,200만원</TableCell>
                      <TableCell>+15%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2월</TableCell>
                      <TableCell>1,450만원</TableCell>
                      <TableCell>+20.8%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3월</TableCell>
                      <TableCell>1,680만원</TableCell>
                      <TableCell>+15.9%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <CodeBlock
                code={`<Table>
  <TableCaption>2024년 1분기 매출 현황</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>월</TableHead>
      <TableHead>매출</TableHead>
      <TableHead>성장률</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>1월</TableCell>
      <TableCell>1,200만원</TableCell>
      <TableCell>+15%</TableCell>
    </TableRow>
    {/* ... */}
  </TableBody>
</Table>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </Stack>

          {/* With Footer */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="with-footer">
              With Footer
            </Heading>
            <Body>
              TableFooter를 사용하여 합계나 요약 정보를 표시할 수 있습니다.
            </Body>

            <div className="space-y-4">
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>항목</TableHead>
                      <TableHead>수량</TableHead>
                      <TableHead>단가</TableHead>
                      <TableHead>금액</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>상품 A</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>5,000원</TableCell>
                      <TableCell>50,000원</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>상품 B</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>12,000원</TableCell>
                      <TableCell>60,000원</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>상품 C</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>30,000원</TableCell>
                      <TableCell>90,000원</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>합계</TableCell>
                      <TableCell>200,000원</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>

              <CodeBlock
                code={`<Table>
  <TableHeader>
    {/* ... */}
  </TableHeader>
  <TableBody>
    {/* ... */}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>합계</TableCell>
      <TableCell>200,000원</TableCell>
    </TableRow>
  </TableFooter>
</Table>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </Stack>

          {/* Striped Rows */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="striped-rows">
              Striped Rows
            </Heading>
            <Body>
              TableBody에 striped prop을 사용하여 교차 배경색을 적용할 수
              있습니다. 많은 데이터가 있을 때 가독성을 높입니다.
            </Body>

            <div className="space-y-4">
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>순번</TableHead>
                      <TableHead>이름</TableHead>
                      <TableHead>부서</TableHead>
                      <TableHead>직급</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody striped>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>김철수</TableCell>
                      <TableCell>개발팀</TableCell>
                      <TableCell>팀장</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>이영희</TableCell>
                      <TableCell>디자인팀</TableCell>
                      <TableCell>팀장</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>박민수</TableCell>
                      <TableCell>기획팀</TableCell>
                      <TableCell>대리</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4</TableCell>
                      <TableCell>정수진</TableCell>
                      <TableCell>마케팅팀</TableCell>
                      <TableCell>과장</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5</TableCell>
                      <TableCell>최동욱</TableCell>
                      <TableCell>개발팀</TableCell>
                      <TableCell>주임</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <CodeBlock
                code={`<Table>
  <TableHeader>
    {/* ... */}
  </TableHeader>
  <TableBody striped>
    <TableRow>
      <TableCell>1</TableCell>
      <TableCell>김철수</TableCell>
      <TableCell>개발팀</TableCell>
      <TableCell>팀장</TableCell>
    </TableRow>
    {/* ... */}
  </TableBody>
</Table>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </Stack>

          {/* Sortable Headers */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="sortable-headers">
              Sortable Headers
            </Heading>
            <Body>
              TableHead에 sortable, sortDirection, onSort props를 사용하여 정렬
              기능을 구현할 수 있습니다. 키보드 접근성도 자동으로 지원됩니다.
            </Body>

            <div className="space-y-4">
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        sortable
                        sortDirection={
                          sortColumn === 'name' ? sortDirection : null
                        }
                        onSort={() => handleSort('name')}
                      >
                        제품명
                      </TableHead>
                      <TableHead
                        sortable
                        sortDirection={
                          sortColumn === 'price' ? sortDirection : null
                        }
                        onSort={() => handleSort('price')}
                      >
                        가격
                      </TableHead>
                      <TableHead
                        sortable
                        sortDirection={
                          sortColumn === 'stock' ? sortDirection : null
                        }
                        onSort={() => handleSort('stock')}
                      >
                        재고
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>노트북</TableCell>
                      <TableCell>1,500,000원</TableCell>
                      <TableCell>23</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>마우스</TableCell>
                      <TableCell>35,000원</TableCell>
                      <TableCell>156</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>키보드</TableCell>
                      <TableCell>89,000원</TableCell>
                      <TableCell>87</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <CodeBlock
                code={`const [sortColumn, setSortColumn] = useState<string | null>(null);
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

const handleSort = (column: string) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  } else {
    setSortColumn(column);
    setSortDirection('asc');
  }
};

<Table>
  <TableHeader>
    <TableRow>
      <TableHead
        sortable
        sortDirection={sortColumn === 'name' ? sortDirection : null}
        onSort={() => handleSort('name')}
      >
        제품명
      </TableHead>
      <TableHead
        sortable
        sortDirection={sortColumn === 'price' ? sortDirection : null}
        onSort={() => handleSort('price')}
      >
        가격
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* ... */}
  </TableBody>
</Table>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </Stack>

          {/* Complex Example */}
          <Stack spacing="heading-tight">
            <Heading level="h3" id="complex-example">
              Complex Example
            </Heading>
            <Body>
              Caption, striped rows, footer를 모두 활용한 복합 예시입니다.
            </Body>

            <div className="space-y-4">
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <Table>
                  <TableCaption>
                    2024년 부서별 예산 집행 현황 (단위: 만원)
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>부서</TableHead>
                      <TableHead>예산</TableHead>
                      <TableHead>집행</TableHead>
                      <TableHead>잔액</TableHead>
                      <TableHead>집행률</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody striped>
                    <TableRow>
                      <TableCell>개발팀</TableCell>
                      <TableCell>5,000</TableCell>
                      <TableCell>3,200</TableCell>
                      <TableCell>1,800</TableCell>
                      <TableCell>64%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>디자인팀</TableCell>
                      <TableCell>3,000</TableCell>
                      <TableCell>2,100</TableCell>
                      <TableCell>900</TableCell>
                      <TableCell>70%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>마케팅팀</TableCell>
                      <TableCell>4,000</TableCell>
                      <TableCell>2,800</TableCell>
                      <TableCell>1,200</TableCell>
                      <TableCell>70%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>기획팀</TableCell>
                      <TableCell>2,500</TableCell>
                      <TableCell>1,500</TableCell>
                      <TableCell>1,000</TableCell>
                      <TableCell>60%</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell>합계</TableCell>
                      <TableCell>14,500</TableCell>
                      <TableCell>9,600</TableCell>
                      <TableCell>4,900</TableCell>
                      <TableCell>66%</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>

              <CodeBlock
                code={`<Table>
  <TableCaption>2024년 부서별 예산 집행 현황 (단위: 만원)</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>부서</TableHead>
      <TableHead>예산</TableHead>
      <TableHead>집행</TableHead>
      <TableHead>잔액</TableHead>
      <TableHead>집행률</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody striped>
    <TableRow>
      <TableCell>개발팀</TableCell>
      <TableCell>5,000</TableCell>
      <TableCell>3,200</TableCell>
      <TableCell>1,800</TableCell>
      <TableCell>64%</TableCell>
    </TableRow>
    {/* ... */}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>합계</TableCell>
      <TableCell>14,500</TableCell>
      <TableCell>9,600</TableCell>
      <TableCell>4,900</TableCell>
      <TableCell>66%</TableCell>
    </TableRow>
  </TableFooter>
</Table>`}
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
              <li>정형화된 데이터를 행과 열로 표시할 때</li>
              <li>여러 항목을 비교하거나 검토해야 할 때</li>
              <li>데이터 간의 관계를 명확히 보여줄 때</li>
              <li>정렬이나 필터링이 필요한 데이터 목록</li>
              <li>합계나 통계 정보를 함께 표시할 때</li>
            </ul>
          </GuidelineSection>

          <GuidelineSection title="언제 사용하지 말아야 하나요?" type="dont">
            <ul className="list-disc list-inside space-y-2">
              <li>레이아웃 목적으로 테이블을 사용하지 마세요</li>
              <li>단순한 키-값 쌍은 정의 목록(dl)을 사용하세요</li>
              <li>복잡한 중첩 데이터는 다른 시각화 방법을 고려하세요</li>
              <li>모바일에서 너무 많은 열은 가독성을 해칩니다</li>
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
            <li>
              적절한 table, thead, tbody, tfoot, tr, th, td 태그를 사용합니다
            </li>
            <li>TableHead는 scope 속성으로 헤더의 범위를 명시합니다</li>
            <li>복잡한 테이블은 id와 headers 속성으로 관계를 명확히 합니다</li>
          </ul>

          <Body weight="bold" className="mt-4">
            스크린 리더 지원
          </Body>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>TableCaption으로 테이블의 목적을 설명합니다</li>
            <li>
              정렬 가능한 헤더는 aria-sort 속성으로 정렬 상태를 전달합니다
            </li>
            <li>선택 가능한 행은 data-state 속성으로 선택 상태를 표시합니다</li>
          </ul>

          <Body weight="bold" className="mt-4">
            키보드 탐색
          </Body>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Tab 키로 테이블 내 상호작용 요소에 접근할 수 있습니다</li>
            <li>정렬 가능한 헤더는 Enter 또는 Space 키로 정렬을 실행합니다</li>
            <li>포커스 상태가 명확하게 표시됩니다</li>
          </ul>

          <Body weight="bold" className="mt-4">
            반응형 디자인
          </Body>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>작은 화면에서는 가로 스크롤이 가능합니다</li>
            <li>필요시 중요한 열을 고정하거나 우선순위를 조정하세요</li>
            <li>모바일에서는 카드 레이아웃으로 변경하는 것도 고려하세요</li>
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
            <Heading level="h3">1. 명확한 구조 (Clear Structure)</Heading>
            <Body>
              테이블은 명확한 헤더, 본문, 푸터 구조를 가집니다. 각 섹션의 역할이
              명확하여 데이터를 쉽게 이해할 수 있습니다.
            </Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">2. 가독성 우선 (Readability First)</Heading>
            <Body>
              적절한 여백, 테두리, 교차 배경색을 사용하여 많은 데이터도 쉽게
              읽을 수 있습니다. 시각적 혼란을 최소화합니다.
            </Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">3. 상호작용성 (Interactivity)</Heading>
            <Body>
              정렬, 선택, 호버 효과를 통해 사용자가 데이터를 능동적으로 탐색할
              수 있습니다. 모든 상호작용은 키보드로도 가능합니다.
            </Body>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">4. 유연한 구성 (Flexible Composition)</Heading>
            <Body>
              Compound pattern을 사용하여 다양한 테이블 구조를 자유롭게 구성할
              수 있습니다. Caption, Footer, striped rows 등을 필요에 따라
              조합합니다.
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
          {/* Table */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Table</Heading>
            <Body>테이블의 루트 컴포넌트입니다.</Body>

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
                    <td className="py-3 px-4 font-mono text-sm">children</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      React.ReactNode
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      테이블 내용
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

          {/* TableHeader */}
          <Stack spacing="heading-tight">
            <Heading level="h3">TableHeader</Heading>
            <Body>테이블 헤더 섹션 컴포넌트입니다.</Body>

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
                    <td className="py-3 px-4 font-mono text-sm">children</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      React.ReactNode
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      헤더 행
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>

          {/* TableBody */}
          <Stack spacing="heading-tight">
            <Heading level="h3">TableBody</Heading>
            <Body>테이블 본문 섹션 컴포넌트입니다.</Body>

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
                    <td className="py-3 px-4 font-mono text-sm">striped</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      boolean
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">false</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      교차 배경색 적용
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-mono text-sm">children</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      React.ReactNode
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      데이터 행
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>

          {/* TableHead */}
          <Stack spacing="heading-tight">
            <Heading level="h3">TableHead</Heading>
            <Body>테이블 헤더 셀 컴포넌트입니다.</Body>

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
                    <td className="py-3 px-4 font-mono text-sm">sortable</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      boolean
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">false</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      정렬 가능 여부
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-mono text-sm">
                      sortDirection
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      &apos;asc&apos; | &apos;desc&apos; | null
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">null</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      현재 정렬 방향
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-mono text-sm">onSort</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      () =&gt; void
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      정렬 핸들러
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-mono text-sm">scope</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      string
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      &apos;col&apos;
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      헤더 범위
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>

          {/* Other Components */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Other Components</Heading>
            <Body>
              TableFooter, TableRow, TableCell, TableCaption은 기본 HTML 속성과
              children을 받습니다.
            </Body>
          </Stack>
        </Stack>
      </PageSection>

      {/* Foundation Layer */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="foundation-layer">
            Foundation Layer
          </Heading>
          <Body>
            HANUI의 Table 컴포넌트는 다음과 같은 기반 기능을 자동으로
            제공합니다:
          </Body>
        </Stack>

        <Stack spacing="content" className="mt-2 md:mt-4">
          <Body weight="bold">1. 시맨틱 HTML 구조</Body>
          <Body>
            적절한 table 요소(table, thead, tbody, tfoot, tr, th, td)를 사용하여
            의미있는 HTML 구조를 제공합니다.
          </Body>

          <Body weight="bold" className="mt-4">
            2. WCAG 2.1 / KWCAG 2.2 준수
          </Body>
          <Body>
            scope 속성, aria-sort 속성, caption 요소를 통해 웹 접근성 표준을
            준수합니다.
          </Body>

          <Body weight="bold" className="mt-4">
            3. 스크린 리더 지원
          </Body>
          <Body>
            TableCaption을 통한 테이블 설명, 적절한 헤더 연결로 스크린 리더
            사용자가 테이블 구조를 이해할 수 있습니다.
          </Body>

          <Body weight="bold" className="mt-4">
            4. 키보드 네비게이션
          </Body>
          <Body>
            Tab 키로 상호작용 요소 탐색, Enter/Space 키로 정렬 실행 등 완전한
            키보드 접근성을 제공합니다.
          </Body>

          <Body weight="bold" className="mt-4">
            5. 다크 모드
          </Body>
          <Body>
            테두리, 배경색, 텍스트 색상이 자동으로 다크 모드에 최적화되어
            표시됩니다.
          </Body>
        </Stack>
      </PageSection>
    </>
  );
}
