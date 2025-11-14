'use client';

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
} from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function TablePage() {
  return (
    <>
      <PageHeader
        title="Table"
        description="데이터를 구조화하여 표시하는 KRDS 기반 테이블 컴포넌트"
      />

      {/* Quick Start */}
      <PageSection>
        <ComponentPreview>
          <div className="overflow-x-auto">
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
            </Table>
          </div>
        </ComponentPreview>
        <div className="mt-4">
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
          {/* Basic Table */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Basic Table</Heading>
            <Body className="mb-4">
              기본 테이블 구조입니다. Header, Body, Footer로 구성됩니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>제품명</TableHead>
                        <TableHead>카테고리</TableHead>
                        <TableHead>가격</TableHead>
                        <TableHead>재고</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>노트북</TableCell>
                        <TableCell>전자제품</TableCell>
                        <TableCell>1,500,000원</TableCell>
                        <TableCell>23</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>마우스</TableCell>
                        <TableCell>전자제품</TableCell>
                        <TableCell>35,000원</TableCell>
                        <TableCell>156</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>키보드</TableCell>
                        <TableCell>전자제품</TableCell>
                        <TableCell>89,000원</TableCell>
                        <TableCell>87</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>제품명</TableHead>
      <TableHead>카테고리</TableHead>
      <TableHead>가격</TableHead>
      <TableHead>재고</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>노트북</TableCell>
      <TableCell>전자제품</TableCell>
      <TableCell>1,500,000원</TableCell>
      <TableCell>23</TableCell>
    </TableRow>
    {/* ... */}
  </TableBody>
</Table>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* With Caption */}
          <Stack spacing="heading-tight">
            <Heading level="h3">With Caption</Heading>
            <Body className="mb-4">
              테이블에 설명 캡션을 추가할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="overflow-x-auto">
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
              </ComponentPreview>
              <div className="mt-4">
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
    {/* ... */}
  </TableBody>
</Table>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* With Footer */}
          <Stack spacing="heading-tight">
            <Heading level="h3">With Footer</Heading>
            <Body className="mb-4">
              합계나 요약 정보를 표시하는 Footer를 추가할 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="overflow-x-auto">
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
              </ComponentPreview>
              <div className="mt-4">
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
            </div>
          </Stack>

          {/* Striped Rows */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Striped Rows</Heading>
            <Body className="mb-4">
              교차 배경색을 적용하여 가독성을 높일 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="overflow-x-auto">
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
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Table>
  <TableHeader>
    {/* ... */}
  </TableHeader>
  <TableBody striped>
    <TableRow>
      {/* ... */}
    </TableRow>
    {/* ... */}
  </TableBody>
</Table>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
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
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
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
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">children</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      React.ReactNode
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      테이블 내용
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">className</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      string
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      추가 CSS 클래스
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>

          {/* TableBody */}
          <Stack spacing="heading-tight">
            <Heading level="h3">TableBody</Heading>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
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
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">striped</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      boolean
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">false</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      교차 배경색 적용
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">children</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      React.ReactNode
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      테이블 본문 내용
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
              TableHeader, TableFooter, TableRow, TableHead, TableCell,
              TableCaption은 기본 HTML 속성과 children을 받습니다.
            </Body>
          </Stack>
        </Stack>
      </PageSection>

      {/* Accessibility */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="accessibility">
            Accessibility
          </Heading>
          <Body>이 컴포넌트는 WCAG 2.1 AA 기준을 준수합니다:</Body>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>시맨틱 HTML:</strong> 적절한 table, thead, tbody, tfoot,
              tr, th, td 태그 사용
            </li>
            <li>
              <strong>헤더 셀:</strong> TableHead는 scope 속성으로 접근성 향상
            </li>
            <li>
              <strong>캡션:</strong> TableCaption으로 테이블 설명 제공
            </li>
            <li>
              <strong>키보드 네비게이션:</strong> 테이블 내 요소는 키보드로 탐색
              가능
            </li>
            <li>
              <strong>색상 대비:</strong> KRDS 색상 팔레트로 충분한 대비 보장
            </li>
            <li>
              <strong>반응형 디자인:</strong> 작은 화면에서는 스크롤 가능
            </li>
          </ul>
        </Stack>
      </PageSection>
    </>
  );
}
