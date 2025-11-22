'use client';

import { Pagination } from '@hanui/react';
import { useState } from 'react';
// Docs layout components
import {
  PageSection as Section,
  Subsection,
  SectionHeading,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Body,
  Card,
  Code,
  List,
  ListItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';

export default function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(10);
  const [currentPage4, setCurrentPage4] = useState(10);
  const [currentPage5, setCurrentPage5] = useState(1);
  const [currentPage6, setCurrentPage6] = useState(1);
  const [currentPage7, setCurrentPage7] = useState(1);

  return (
    <Section>
      <SectionHeading
        level="h1"
        id="pagination"
        title="Pagination"
        description="페이지 네비게이션을 제공하는 KRDS 기반 페이지네이션 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="installation" title="설치" />
            <Body>
              CLI를 사용하여 컴포넌트를 프로젝트에 설치할 수 있습니다.
            </Body>
            <Card>
              <Code language="bash">npx @hanui/cli add pagination</Code>
            </Card>
          </Subsection>

          {/* What is it */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="Pagination이란?"
            />
            <Body>
              Pagination 컴포넌트는 많은 콘텐츠를 여러 페이지로 나누어 표시할 때
              사용하는 네비게이션 컴포넌트입니다. 이전/다음 버튼과 페이지 번호를
              제공하며, 페이지가 많을 때는 생략 부호(...)를 사용하여 간결하게
              표시합니다.
            </Body>
            <Body>
              WCAG 2.1 / KWCAG 2.2 AA 기준을 준수하여 키보드 내비게이션, 스크린
              리더 지원, 충분한 터치 타겟 크기를 제공합니다.
            </Body>
          </Subsection>

          {/* Preview */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />

            <Subsection level="h3">
              <SectionHeading level="h3" id="basic" title="기본" />
              <Card>
                <div className="flex flex-col items-center gap-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                  />
                  <Body className="text-krds-gray-70">
                    현재 페이지: {currentPage}
                  </Body>
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`import { Pagination } from '@hanui/react';
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
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" id="many-pages" title="많은 페이지" />
              <Body>
                페이지가 많을 때는 생략 부호(...)를 사용하여 간결하게
                표시됩니다.
              </Body>
              <Card>
                <div className="flex flex-col items-center gap-4">
                  <Pagination
                    currentPage={currentPage2}
                    totalPages={20}
                    onPageChange={setCurrentPage2}
                  />
                  <Body className="text-krds-gray-70">
                    총 20페이지 중 {currentPage2}페이지
                  </Body>
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<Pagination
  currentPage={currentPage}
  totalPages={20}
  onPageChange={setCurrentPage}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="sibling-count"
                title="Sibling Count"
              />
              <Body>
                siblingCount로 현재 페이지 양쪽에 표시할 페이지 수를 조정할 수
                있습니다. 기본값은 1입니다.
              </Body>
              <Card>
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-2">
                    <Body size="sm" className="text-krds-gray-70">
                      siblingCount = 1 (기본값)
                    </Body>
                    <Pagination
                      currentPage={currentPage3}
                      totalPages={20}
                      onPageChange={setCurrentPage3}
                      siblingCount={1}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Body size="sm" className="text-krds-gray-70">
                      siblingCount = 2
                    </Body>
                    <Pagination
                      currentPage={currentPage4}
                      totalPages={20}
                      onPageChange={setCurrentPage4}
                      siblingCount={2}
                    />
                  </div>
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`// 기본값
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
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" id="few-pages" title="적은 페이지" />
              <Body>
                페이지가 적을 때는 생략 부호(...) 없이 모든 페이지 번호가
                표시됩니다.
              </Body>
              <Card>
                <div className="flex justify-center">
                  <Pagination
                    currentPage={currentPage5}
                    totalPages={5}
                    onPageChange={setCurrentPage5}
                  />
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<Pagination
  currentPage={currentPage}
  totalPages={5}
  onPageChange={setCurrentPage}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="very-many-pages"
                title="매우 많은 페이지"
              />
              <Body>100페이지 이상의 경우에도 간결하게 표시됩니다.</Body>
              <Card>
                <div className="flex flex-col items-center gap-4">
                  <Pagination
                    currentPage={currentPage6}
                    totalPages={100}
                    onPageChange={setCurrentPage6}
                  />
                  <Body className="text-krds-gray-70">
                    총 100페이지 중 {currentPage6}페이지
                  </Body>
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<Pagination
  currentPage={currentPage}
  totalPages={100}
  onPageChange={setCurrentPage}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="practical"
                title="실제 사용 예제"
              />
              <Body>
                실제 데이터 목록과 함께 사용하는 예제입니다. 페이지 변경 시
                목록이 업데이트됩니다.
              </Body>
              <Card>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className="p-4 bg-krds-white rounded-lg border border-krds-gray-20"
                      >
                        <Body className="font-semibold text-krds-gray-95">
                          항목 {(currentPage7 - 1) * 5 + i + 1}
                        </Body>
                        <Body size="sm" className="text-krds-gray-70 mt-1">
                          페이지 {currentPage7}의 항목입니다.
                        </Body>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center pt-4">
                    <Pagination
                      currentPage={currentPage7}
                      totalPages={10}
                      onPageChange={setCurrentPage7}
                    />
                  </div>
                </div>
              </Card>
              <Card>
                <Code language="tsx">
                  {`const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;
const items = /* 데이터 배열 */;

// 현재 페이지의 아이템 계산
const startIndex = (currentPage - 1) * itemsPerPage;
const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

return (
  <div>
    {currentItems.map(item => (
      <div key={item.id}>{item.name}</div>
    ))}

    <Pagination
      currentPage={currentPage}
      totalPages={Math.ceil(items.length / itemsPerPage)}
      onPageChange={setCurrentPage}
    />
  </div>
);`}
                </Code>
              </Card>
            </Subsection>
          </Subsection>

          {/* Usage */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="usage" title="사용 방법" />
            <Card>
              <Code language="tsx">
                {`import { Pagination } from '@hanui/react';
import { useState } from 'react';

export default function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}`}
              </Code>
            </Card>
          </Subsection>

          {/* Best Practices */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="best-practices" title="모범 사례" />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="when-to-use"
                title="언제 사용하나요?"
              />
              <DoCard>
                <List variant="check">
                  <ListItem>
                    검색 결과, 제품 목록 등 많은 항목을 여러 페이지로 나누어
                    표시할 때
                  </ListItem>
                  <ListItem>
                    사용자가 특정 페이지로 직접 이동할 수 있어야 할 때
                  </ListItem>
                  <ListItem>
                    전체 데이터 세트의 크기를 알고 있고, 전통적인 페이지
                    네비게이션이 적합할 때
                  </ListItem>
                  <ListItem>
                    사용자가 이전 페이지로 쉽게 돌아갈 수 있어야 할 때
                  </ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="when-not-to-use"
                title="언제 사용하지 말아야 하나요?"
              />
              <DontCard>
                <List variant="xmark">
                  <ListItem>
                    무한 스크롤이 더 적합한 소셜 미디어 피드나 타임라인
                  </ListItem>
                  <ListItem>
                    전체 데이터 크기를 알 수 없는 실시간 스트리밍 데이터
                  </ListItem>
                  <ListItem>
                    모바일 우선 인터페이스에서 Load More 버튼이 더 적합한 경우
                  </ListItem>
                  <ListItem>
                    페이지 수가 너무 많아서(수백 개 이상) 네비게이션이
                    실용적이지 않은 경우
                  </ListItem>
                </List>
              </DontCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="implementation-tips"
                title="구현 팁"
              />
              <List variant="disc">
                <ListItem>
                  <strong>페이지 크기:</strong> 한 페이지당 10-50개 항목이
                  적절합니다
                </ListItem>
                <ListItem>
                  <strong>URL 동기화:</strong> 현재 페이지를 URL 쿼리 파라미터에
                  반영하여 북마크와 공유 가능하게 만드세요
                </ListItem>
                <ListItem>
                  <strong>로딩 상태:</strong> 페이지 전환 시 로딩 상태를
                  표시하세요
                </ListItem>
                <ListItem>
                  <strong>스크롤 위치:</strong> 페이지 변경 시 목록 상단으로
                  스크롤하세요
                </ListItem>
                <ListItem>
                  <strong>총 개수 표시:</strong> "총 235개 항목" 같은 정보를
                  함께 표시하면 유용합니다
                </ListItem>
              </List>
            </Subsection>
          </Subsection>

          {/* Accessibility */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="accessibility" title="접근성" />
            <Body>
              이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 AA 기준을 준수합니다.
            </Body>

            <List variant="disc">
              <ListItem>
                <strong>Semantic HTML:</strong> <Code>nav</Code> 요소와 적절한
                ARIA 속성 사용
              </ListItem>
              <ListItem>
                <strong>Screen Reader:</strong> <Code>aria-label</Code>과{' '}
                <Code>aria-current</Code> 속성으로 현재 페이지 표시
              </ListItem>
              <ListItem>
                <strong>키보드 내비게이션:</strong> Tab 키로 포커스 이동,
                Enter/Space로 페이지 변경
              </ListItem>
              <ListItem>
                <strong>터치 타겟:</strong> 최소 40px 크기로 모바일 접근성 보장
              </ListItem>
              <ListItem>
                <strong>시각적 피드백:</strong> 현재 페이지, 호버, 포커스 상태를
                명확히 표시
              </ListItem>
              <ListItem>
                <strong>다크 모드:</strong> 자동 다크 모드 지원으로 충분한
                대비율 유지
              </ListItem>
            </List>
          </Subsection>

          {/* Foundation Layer */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="foundation-layer"
              title="Foundation Layer"
            />
            <Body>
              Pagination 컴포넌트는 다음 기능들을 자동으로 처리합니다:
            </Body>

            <Card variant="info">
              <List variant="check">
                <ListItem>
                  <strong>스마트 페이지 번호:</strong> 페이지가 많을 때 자동으로
                  생략 부호(...)를 사용하여 간결하게 표시합니다.
                </ListItem>
                <ListItem>
                  <strong>키보드 접근성:</strong> Tab 키로 네비게이션,
                  Enter/Space 키로 페이지 이동을 완벽하게 지원합니다.
                </ListItem>
                <ListItem>
                  <strong>비활성화 상태:</strong> 첫 페이지에서 이전 버튼,
                  마지막 페이지에서 다음 버튼 자동 비활성화합니다.
                </ListItem>
                <ListItem>
                  <strong>포커스 관리:</strong> 명확한 포커스 링과 호버 상태로
                  사용자 피드백을 제공합니다.
                </ListItem>
              </List>
            </Card>
          </Subsection>
        </TabsContent>

        <TabsContent value="api">
          {/* API Reference */}
          <Subsection level="h2">
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API Reference"
            />

            <Subsection level="h3">
              <SectionHeading level="h3" id="props" title="Props" />
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
                    <TableCell>
                      <Code>currentPage</Code>
                    </TableCell>
                    <TableCell>
                      <Code>number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>현재 활성 페이지 (1부터 시작, 필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>totalPages</Code>
                    </TableCell>
                    <TableCell>
                      <Code>number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>전체 페이지 수 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onPageChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code>{`(page: number) => void`}</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>페이지 변경 시 호출되는 콜백 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>siblingCount</Code>
                    </TableCell>
                    <TableCell>
                      <Code>number</Code>
                    </TableCell>
                    <TableCell>
                      <Code>1</Code>
                    </TableCell>
                    <TableCell>현재 페이지 양쪽에 표시할 페이지 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>
                      <Code>undefined</Code>
                    </TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Subsection>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'NavText', href: '/components/navtext' }}
        next={{ title: 'Section', href: '/components/section' }}
      />
    </Section>
  );
}
