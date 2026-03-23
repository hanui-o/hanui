'use client';

import { Pagination } from '@hanui/react';
import { useState } from 'react';
// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
  Installation,
} from '@/components/content';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
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
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Heading
        level="h1"
        id="pagination"
        title="Pagination"
        description="페이지 네비게이션을 제공하는 KRDS 기반 페이지네이션 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 1. 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
/>`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="pagination" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Pagination } from '@/components/hanui/pagination';
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
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="많은 페이지"
                description="페이지가 많을 때는 생략 부호(...)를 사용하여 간결하게 표시됩니다."
              />
              <ComponentPreview>
                <div className="flex flex-col items-center gap-4">
                  <Pagination
                    currentPage={currentPage2}
                    totalPages={20}
                    onPageChange={setCurrentPage2}
                  />
                  <p className="text-sm text-krds-gray-70">
                    총 20페이지 중 {currentPage2}페이지
                  </p>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Pagination
  currentPage={currentPage}
  totalPages={20}
  onPageChange={setCurrentPage}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Sibling Count"
                description="siblingCount로 현재 페이지 양쪽에 표시할 페이지 수를 조정할 수 있습니다. 기본값은 1입니다."
              />
              <ComponentPreview>
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-krds-gray-70">
                      siblingCount = 1 (기본값)
                    </p>
                    <Pagination
                      currentPage={currentPage3}
                      totalPages={20}
                      onPageChange={setCurrentPage3}
                      siblingCount={1}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-krds-gray-70">
                      siblingCount = 2
                    </p>
                    <Pagination
                      currentPage={currentPage4}
                      totalPages={20}
                      onPageChange={setCurrentPage4}
                      siblingCount={2}
                    />
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
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
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="직접 이동"
                description="페이지 번호를 직접 입력하여 원하는 페이지로 이동할 수 있습니다."
              />
              <ComponentPreview>
                <Pagination
                  variant="direct-input"
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Pagination
  variant="direct-input"
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="목록 확장"
                description="더 보기 버튼을 클릭하여 다음 페이지를 로드합니다. 무한 스크롤이나 점진적 로딩에 적합합니다."
              />
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <Pagination
                    variant="load-more"
                    currentPage={currentPage2}
                    totalPages={10}
                    onPageChange={setCurrentPage2}
                    onLoadMore={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setCurrentPage2((prev) => prev + 1);
                        setIsLoading(false);
                      }, 1000);
                    }}
                    hasMore={currentPage2 < 10}
                    isLoading={isLoading}
                  />
                  <p className="text-sm text-krds-gray-70 text-center">
                    {isLoading
                      ? '콘텐츠를 불러오는 중...'
                      : `${currentPage2}페이지 로드됨`}
                  </p>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const [currentPage, setCurrentPage] = useState(1);
const [isLoading, setIsLoading] = useState(false);

const handleLoadMore = () => {
  setIsLoading(true);
  // API 호출 또는 데이터 로딩
  setTimeout(() => {
    setCurrentPage((prev) => prev + 1);
    setIsLoading(false);
  }, 1000);
};

<Pagination
  variant="load-more"
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
  onLoadMore={handleLoadMore}
  hasMore={currentPage < 10}
  isLoading={isLoading}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="적은 페이지"
                description="페이지가 적을 때는 생략 부호(...) 없이 모든 페이지 번호가 표시됩니다."
              />
              <ComponentPreview>
                <Pagination
                  currentPage={currentPage5}
                  totalPages={5}
                  onPageChange={setCurrentPage5}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Pagination
  currentPage={currentPage}
  totalPages={5}
  onPageChange={setCurrentPage}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="매우 많은 페이지"
                description="100페이지 이상의 경우에도 간결하게 표시됩니다."
              />
              <ComponentPreview>
                <div className="flex flex-col items-center gap-4">
                  <Pagination
                    currentPage={currentPage6}
                    totalPages={100}
                    onPageChange={setCurrentPage6}
                  />
                  <p className="text-sm text-krds-gray-70">
                    총 100페이지 중 {currentPage6}페이지
                  </p>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Pagination
  currentPage={currentPage}
  totalPages={100}
  onPageChange={setCurrentPage}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="실제 사용 예제"
                description="실제 데이터 목록과 함께 사용하는 예제입니다. 페이지 변경 시 목록이 업데이트됩니다."
              />
              <ComponentPreview>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className="p-4 bg-krds-white rounded-lg border border-krds-gray-20"
                      >
                        <p className="font-semibold text-krds-gray-95">
                          항목 {(currentPage7 - 1) * 5 + i + 1}
                        </p>
                        <p className="text-sm text-krds-gray-70 mt-1">
                          페이지 {currentPage7}의 항목입니다.
                        </p>
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
              </ComponentPreview>
              <Code variant="block" language="tsx">
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
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>Semantic HTML:</strong> <Code>nav</Code> 요소와 적절한
                ARIA 속성 사용
              </ListItem>
              <ListItem>
                <strong>Screen Reader:</strong> <Code>aria-label</Code>,{' '}
                <Code>aria-current</Code>, <Code>aria-live</Code> 속성으로 현재
                페이지와 페이지 변경 사항을 스크린 리더에 알림
              </ListItem>
              <ListItem>
                <strong>키보드 내비게이션:</strong> Tab 키로 포커스 이동,
                Enter/Space로 페이지 변경. 직접 이동 variant는 Enter 키로 입력
                가능
              </ListItem>
              <ListItem>
                <strong>입력 검증 (직접 이동):</strong>{' '}
                <Code>aria-invalid</Code>, <Code>aria-describedby</Code>{' '}
                속성으로 유효하지 않은 입력 시 시각적, 청각적 피드백 제공
              </ListItem>
              <ListItem>
                <strong>로딩 상태 (목록 확장):</strong> <Code>aria-busy</Code>{' '}
                속성으로 콘텐츠 로딩 중 상태를 스크린 리더에 전달
              </ListItem>
              <ListItem>
                <strong>터치 타겟:</strong> 최소 40px 크기로 모바일 접근성 보장
              </ListItem>
              <ListItem>
                <strong>시각적 피드백:</strong> 현재 페이지, 호버, 포커스, 에러
                상태를 명확히 표시
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api-reference" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code>'default' | 'direct-input' | 'load-more'</Code>
                    </TableCell>
                    <TableCell>
                      <Code>'default'</Code>
                    </TableCell>
                    <TableCell>페이지네이션 타입</TableCell>
                  </TableRow>
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
                      <Code>showFirstLast</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>true</Code>
                    </TableCell>
                    <TableCell>처음/마지막 버튼 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showPreviousNext</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>true</Code>
                    </TableCell>
                    <TableCell>이전/다음 버튼 표시 여부</TableCell>
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
                  <TableRow>
                    <TableCell>
                      <Code>labels</Code>
                    </TableCell>
                    <TableCell>
                      <Code>{`{ first?: string; previous?: string; next?: string; last?: string; page?: string; goTo?: string; loadMore?: string; invalidInput?: string; loading?: string; }`}</Code>
                    </TableCell>
                    <TableCell>
                      <Code>{`{ first: '처음', previous: '이전', next: '다음', last: '마지막', page: '페이지', goTo: '이동', loadMore: '더 보기', invalidInput: '유효하지 않은 페이지 번호입니다', loading: '콘텐츠를 불러오는 중' }`}</Code>
                    </TableCell>
                    <TableCell>접근성 레이블 커스터마이징</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onLoadMore</Code>
                    </TableCell>
                    <TableCell>
                      <Code>{`() => void`}</Code>
                    </TableCell>
                    <TableCell>
                      <Code>undefined</Code>
                    </TableCell>
                    <TableCell>
                      load-more variant에서 더 보기 버튼 클릭 시 호출되는 콜백
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>hasMore</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>true</Code>
                    </TableCell>
                    <TableCell>
                      load-more variant에서 더 보기 버튼 활성화 여부
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>isLoading</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>false</Code>
                    </TableCell>
                    <TableCell>
                      load-more variant에서 로딩 상태 표시. 로딩 중에는 버튼
                      비활성화 및 aria-busy 적용
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Modal', href: '/components/modal' }}
        next={{ title: 'Progress', href: '/components/progress' }}
      />
    </>
  );
}
