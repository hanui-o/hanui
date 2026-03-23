'use client';

import React from 'react';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';

// UI components - from @hanui/react
import {
  Table as TableComponent,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  Code,
  List,
  ListItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
} from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';

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
      <Heading
        level="h1"
        title="Table"
        description="데이터를 구조화하여 표시하는 테이블 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* ============================================ */}
        {/* 개요 탭 - 기본 Table */}
        {/* ============================================ */}
        <TabsContent value="overview">
          {/* 1. 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              description="Table은 정형 데이터를 표 형식으로 표시하는 컴포넌트입니다. Compound pattern으로 유연하고 접근성 높은 테이블을 구성합니다."
              className="sr-only"
            />
            <ComponentPreview>
              <div className="overflow-x-auto">
                <TableComponent>
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
                </TableComponent>
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Table>
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
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="table" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Table 관련 컴포넌트들을 import하여 조합합니다."
            />
            <Code variant="block" language="tsx">
              {`import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@hanui/react'

<Table>
  <TableCaption>테이블 설명</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>헤더 1</TableHead>
      <TableHead>헤더 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>데이터 1</TableCell>
      <TableCell>데이터 2</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Caption"
                description="TableCaption으로 테이블의 목적을 설명합니다. 스크린리더 사용자에게 필수입니다."
              />
              <ComponentPreview>
                <div className="overflow-x-auto">
                  <TableComponent>
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
                        <TableCell align="right">+15%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2월</TableCell>
                        <TableCell>1,450만원</TableCell>
                        <TableCell align="right">+20.8%</TableCell>
                      </TableRow>
                    </TableBody>
                  </TableComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Table>
  <TableCaption>2024년 1분기 매출 현황</TableCaption>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Footer"
                description="TableFooter로 합계나 요약 정보를 표시합니다."
              />
              <ComponentPreview>
                <div className="overflow-x-auto">
                  <TableComponent>
                    <TableHeader>
                      <TableRow>
                        <TableHead>항목</TableHead>
                        <TableHead>수량</TableHead>
                        <TableHead>금액</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>상품 A</TableCell>
                        <TableCell>10</TableCell>
                        <TableCell>50,000원</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>상품 B</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>60,000원</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2}>합계</TableCell>
                        <TableCell>110,000원</TableCell>
                      </TableRow>
                    </TableFooter>
                  </TableComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Table>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>합계</TableCell>
      <TableCell>110,000원</TableCell>
    </TableRow>
  </TableFooter>
</Table>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="정렬"
                description="TableHead에 sortable, sortDirection, onSort props로 정렬 기능을 구현합니다."
              />
              <ComponentPreview>
                <div className="overflow-x-auto">
                  <TableComponent>
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
                    </TableBody>
                  </TableComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const [sortColumn, setSortColumn] = useState<string | null>(null)
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

const handleSort = (column: string) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  } else {
    setSortColumn(column)
    setSortDirection('asc')
  }
}

<TableHead
  sortable
  sortDirection={sortColumn === 'name' ? sortDirection : null}
  onSort={() => handleSort('name')}
>
  제품명
</TableHead>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="배열 데이터"
                description="배열 데이터를 map()으로 렌더링하는 실전 패턴입니다. align prop으로 숫자/금액 열을 오른쪽 정렬합니다."
              />
              <ComponentPreview>
                <div className="overflow-x-auto">
                  <TableComponent>
                    <TableCaption>2024년 월별 매출 현황</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>월</TableHead>
                        <TableHead>담당자</TableHead>
                        <TableHead align="right">매출</TableHead>
                        <TableHead align="right">성장률</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          month: '1월',
                          manager: '김철수',
                          sales: 12000000,
                          growth: 15.2,
                        },
                        {
                          month: '2월',
                          manager: '이영희',
                          sales: 14500000,
                          growth: 20.8,
                        },
                        {
                          month: '3월',
                          manager: '박민수',
                          sales: 18200000,
                          growth: 25.5,
                        },
                        {
                          month: '4월',
                          manager: '정지원',
                          sales: 16800000,
                          growth: -7.7,
                        },
                      ].map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.month}</TableCell>
                          <TableCell>{row.manager}</TableCell>
                          <TableCell align="right">
                            {row.sales.toLocaleString()}원
                          </TableCell>
                          <TableCell align="right">
                            <span
                              className={
                                row.growth >= 0
                                  ? 'text-krds-func-success'
                                  : 'text-krds-func-danger'
                              }
                            >
                              {row.growth >= 0 ? '+' : ''}
                              {row.growth}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2}>합계</TableCell>
                        <TableCell align="right">
                          {(
                            12000000 +
                            14500000 +
                            18200000 +
                            16800000
                          ).toLocaleString()}
                          원
                        </TableCell>
                        <TableCell align="right">+13.5%</TableCell>
                      </TableRow>
                    </TableFooter>
                  </TableComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const data = [
  { month: '1월', manager: '김철수', sales: 12000000, growth: 15.2 },
  { month: '2월', manager: '이영희', sales: 14500000, growth: 20.8 },
  { month: '3월', manager: '박민수', sales: 18200000, growth: 25.5 },
]

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>월</TableHead>
      <TableHead>담당자</TableHead>
      <TableHead align="right">매출</TableHead>
      <TableHead align="right">성장률</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row.month}</TableCell>
        <TableCell>{row.manager}</TableCell>
        <TableCell align="right">
          {row.sales.toLocaleString()}원
        </TableCell>
        <TableCell align="right">
          {row.growth >= 0 ? '+' : ''}{row.growth}%
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
              </Code>
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Table은 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>시맨틱 HTML:</strong> table, thead, tbody, tfoot, tr,
                th, td 태그를 적절히 사용합니다.
              </ListItem>
              <ListItem>
                <strong>Caption:</strong> TableCaption으로 테이블의 목적을
                설명합니다.
              </ListItem>
              <ListItem>
                <strong>Scope 속성:</strong> TableHead는 scope 속성으로 헤더의
                범위를 명시합니다.
              </ListItem>
              <ListItem>
                <strong>정렬 상태:</strong> 정렬 가능한 헤더는 시각적 표시와
                함께 정렬 상태를 전달합니다.
              </ListItem>
              <ListItem>
                <strong>키보드 탐색:</strong> Tab 키로 상호작용 요소 접근,
                Enter/Space 키로 정렬 실행이 가능합니다.
              </ListItem>
              <ListItem>
                레이아웃 목적으로 Table을 사용하지 마세요. Container, Stack 등의
                레이아웃 컴포넌트를 사용하세요.
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* ============================================ */}
        {/* API 레퍼런스 탭 */}
        {/* ============================================ */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            {/* Table Props */}
            <Subsection level="h3">
              <Heading level="h3" title="Table Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>테이블 내용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>small</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>작은 텍스트 크기 적용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* TableHead Props */}
            <Subsection level="h3">
              <Heading level="h3" title="TableHead Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>align</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;left&apos; | &apos;center&apos; |
                        &apos;right&apos;
                      </Code>
                    </TableCell>
                    <TableCell>&apos;left&apos;</TableCell>
                    <TableCell>텍스트 정렬</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>sortable</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>정렬 가능 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>sortDirection</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;asc&apos; | &apos;desc&apos; | null
                      </Code>
                    </TableCell>
                    <TableCell>null</TableCell>
                    <TableCell>현재 정렬 방향</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onSort</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>정렬 핸들러</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* TableCell Props */}
            <Subsection level="h3">
              <Heading level="h3" title="TableCell Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>align</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;left&apos; | &apos;center&apos; |
                        &apos;right&apos;
                      </Code>
                    </TableCell>
                    <TableCell>&apos;left&apos;</TableCell>
                    <TableCell>텍스트 정렬</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>colSpan</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>열 병합 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>rowSpan</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>행 병합 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>small</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>작은 텍스트 크기 적용</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Tab Bars', href: '/components/tabbars' }}
        next={{ title: 'DataTable', href: '/components/data-table' }}
      />
    </>
  );
}
