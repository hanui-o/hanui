'use client';

import React from 'react';
// Docs layout components
import {
  PageSection as Section,
  SectionHeading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

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
  Body,
  Stack,
  Card,
  Code,
  List,
  ListItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
} from '@hanui/react';

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
      <SectionHeading
        level="h1"
        title="Table"
        description="데이터를 구조화하여 표시하는 테이블 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section>
            <SectionHeading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 Table 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add table
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Table은 정형 데이터를 표 형식으로 표시하는 컴포넌트입니다. Compound pattern을 사용하여 유연하고 접근성 높은 테이블을 구성합니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>시맨틱 HTML:</strong> 적절한 table, thead, tbody,
                  tfoot, tr, th, td 요소를 사용합니다.
                </ListItem>
                <ListItem>
                  <strong>정렬 기능:</strong> 헤더를 클릭하여 데이터를 정렬할 수
                  있습니다.
                </ListItem>
                <ListItem>
                  <strong>Striped Rows:</strong> 교차 배경색으로 가독성을
                  향상시킵니다.
                </ListItem>
                <ListItem>
                  <strong>반응형:</strong> 작은 화면에서 자동으로 가로 스크롤을
                  지원합니다.
                </ListItem>
                <ListItem>
                  <strong>접근성:</strong> 스크린 리더와 키보드 네비게이션을
                  지원합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section>
            <SectionHeading level="h2" id="preview" title="미리보기" />

            <Card variant="outlined">
              <div className="overflow-x-auto rounded-lg border border-krds-gray-20">
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
            </Card>

            <Code variant="block" language="tsx" showLineNumbers={false}>
              {`import {
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
            </Code>
          </Section>

          {/* Usage */}
          <Section>
            <SectionHeading level="h2" id="usage" title="사용법" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="With Caption">
                <Body className="leading-relaxed">
                  TableCaption을 사용하여 테이블에 설명을 추가할 수 있습니다.
                  스크린 리더 사용자에게 테이블의 목적을 명확히 전달합니다.
                </Body>
              </SectionHeading>

              <Card variant="outlined">
                <div className="overflow-x-auto rounded-lg border border-krds-gray-20">
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
                  </TableComponent>
                </div>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Table>
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
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="With Footer">
                <Body className="leading-relaxed">
                  TableFooter를 사용하여 합계나 요약 정보를 표시할 수 있습니다:
                </Body>
              </SectionHeading>

              <Card variant="outlined">
                <div className="overflow-x-auto rounded-lg border border-krds-gray-20">
                  <TableComponent>
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
                  </TableComponent>
                </div>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Table>
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
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Sortable Headers">
                <Body className="leading-relaxed">
                  TableHead에 sortable, sortDirection, onSort props를 사용하여
                  정렬 기능을 구현할 수 있습니다. 키보드 접근성도 자동으로
                  지원됩니다:
                </Body>
              </SectionHeading>

              <Card variant="outlined">
                <div className="overflow-x-auto rounded-lg border border-krds-gray-20">
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
                      <TableRow>
                        <TableCell>키보드</TableCell>
                        <TableCell>89,000원</TableCell>
                        <TableCell>87</TableCell>
                      </TableRow>
                    </TableBody>
                  </TableComponent>
                </div>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`const [sortColumn, setSortColumn] = useState<string | null>(null);
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
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section>
            <SectionHeading
              level="h2"
              id="best-practices"
              title="Best Practices"
            />

            <Stack gap="content">
              <DoCard
                title="정형 데이터에 사용"
                description="정형화된 데이터를 행과 열로 표시할 때, 여러 항목을 비교하거나 검토해야 할 때 사용하세요."
              />

              <DoCard
                title="Caption 사용"
                description="TableCaption을 사용하여 테이블의 목적을 명확히 설명하세요. 스크린 리더 사용자에게 필수적입니다."
              />

              <DoCard
                title="적절한 헤더 범위 설정"
                description="TableHead의 scope 속성을 사용하여 헤더의 범위(col, row)를 명확히 하세요."
              />

              <DontCard
                title="레이아웃 목적으로 사용하지 않기"
                description="페이지 레이아웃을 위해 테이블을 사용하지 마세요. Container, Stack 등의 레이아웃 컴포넌트를 사용하세요."
              />

              <DontCard
                title="모바일에서 너무 많은 열 사용하지 않기"
                description="모바일에서 너무 많은 열은 가독성을 해칩니다. 중요한 열만 표시하거나 카드 레이아웃으로 변경하는 것을 고려하세요."
              />
            </Stack>
          </Section>

          {/* Accessibility */}
          <Section>
            <SectionHeading level="h2" id="accessibility" title="접근성" />

            <Card variant="info">
              <List variant="check">
                <ListItem>
                  <strong>시맨틱 HTML:</strong> 적절한 table, thead, tbody,
                  tfoot, tr, th, td 태그를 사용합니다.
                </ListItem>
                <ListItem>
                  <strong>Scope 속성:</strong> TableHead는 scope 속성으로 헤더의
                  범위를 명시합니다.
                </ListItem>
                <ListItem>
                  <strong>Caption:</strong> TableCaption으로 테이블의 목적을
                  설명합니다.
                </ListItem>
                <ListItem>
                  <strong>정렬 상태:</strong> 정렬 가능한 헤더는 aria-sort
                  속성으로 정렬 상태를 전달합니다.
                </ListItem>
                <ListItem>
                  <strong>키보드 탐색:</strong> Tab 키로 상호작용 요소 접근,
                  Enter/Space 키로 정렬 실행이 가능합니다.
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section>
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API Reference"
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Table" />

              <Table>
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
                    <TableCell className="font-mono">children</TableCell>
                    <TableCell className="text-krds-gray-70">
                      React.ReactNode
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>테이블 내용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">className</TableCell>
                    <TableCell className="text-krds-gray-70">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="TableBody" />

              <Table>
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
                    <TableCell className="font-mono">striped</TableCell>
                    <TableCell className="text-krds-gray-70">boolean</TableCell>
                    <TableCell className="font-mono">false</TableCell>
                    <TableCell>교차 배경색 적용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">children</TableCell>
                    <TableCell className="text-krds-gray-70">
                      React.ReactNode
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>데이터 행</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="TableHead" />

              <Table>
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
                    <TableCell className="font-mono">sortable</TableCell>
                    <TableCell className="text-krds-gray-70">boolean</TableCell>
                    <TableCell className="font-mono">false</TableCell>
                    <TableCell>정렬 가능 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">sortDirection</TableCell>
                    <TableCell className="text-krds-gray-70">
                      &apos;asc&apos; | &apos;desc&apos; | null
                    </TableCell>
                    <TableCell className="font-mono">null</TableCell>
                    <TableCell>현재 정렬 방향</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">onSort</TableCell>
                    <TableCell className="text-krds-gray-70">
                      () =&gt; void
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>정렬 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">scope</TableCell>
                    <TableCell className="text-krds-gray-70">string</TableCell>
                    <TableCell className="font-mono">&apos;col&apos;</TableCell>
                    <TableCell>헤더 범위</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Other Components" />

              <Stack gap="md">
                <div>
                  <Body className="font-mono font-medium mb-2">
                    TableHeader
                  </Body>
                  <Body size="sm" className="text-krds-gray-70">
                    테이블 헤더 섹션 컴포넌트입니다. children을 받습니다.
                  </Body>
                </div>
                <div>
                  <Body className="font-mono font-medium mb-2">
                    TableFooter
                  </Body>
                  <Body size="sm" className="text-krds-gray-70">
                    테이블 푸터 섹션 컴포넌트입니다. 합계나 요약 정보를
                    표시합니다.
                  </Body>
                </div>
                <div>
                  <Body className="font-mono font-medium mb-2">TableRow</Body>
                  <Body size="sm" className="text-krds-gray-70">
                    테이블 행 컴포넌트입니다. hover 효과를 지원합니다.
                  </Body>
                </div>
                <div>
                  <Body className="font-mono font-medium mb-2">TableCell</Body>
                  <Body size="sm" className="text-krds-gray-70">
                    테이블 데이터 셀 컴포넌트입니다.
                  </Body>
                </div>
                <div>
                  <Body className="font-mono font-medium mb-2">
                    TableCaption
                  </Body>
                  <Body size="sm" className="text-krds-gray-70">
                    테이블 설명을 제공합니다. 접근성 향상을 위해 권장됩니다.
                  </Body>
                </div>
              </Stack>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Tab Bars', href: '/components/tabbars' }}
        next={{ title: 'Tabs', href: '/components/tabs' }}
      />
    </>
  );
}
