'use client';

import { SkipLink } from '@hanui/react';
// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
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

export default function SkipLinkPage() {
  return (
    <Section>
      <Heading
        level="h1"
        id="skiplink"
        title="SkipLink"
        description="키보드 및 스크린 리더 사용자가 반복적인 콘텐츠를 건너뛰고 주요 콘텐츠로 바로 이동할 수 있도록 돕는 내부 페이지 탐색 도구입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Subsection level="h2">
            <Heading level="h2" id="installation" title="설치" />
            <Body>
              CLI를 사용하여 컴포넌트를 프로젝트에 설치할 수 있습니다.
            </Body>
            <Card>
              <Code language="bash">npx @hanui/cli add skiplink</Code>
            </Card>
          </Subsection>

          {/* What is it */}
          <Subsection level="h2">
            <Heading level="h2" id="what-is-it" title="SkipLink란?" />
            <Body>
              SkipLink(건너뛰기 링크)는 키보드 사용자와 스크린 리더 사용자가
              헤더, 네비게이션 등 반복적인 콘텐츠를 건너뛰고 페이지의 주요
              콘텐츠로 바로 이동할 수 있도록 돕는 접근성 필수 컴포넌트입니다.
            </Body>
            <Body>
              WCAG 2.1 / KWCAG 2.2 Level A 기준 "Bypass Blocks (2.4.1)"을
              충족하기 위해 반드시 구현해야 하는 컴포넌트입니다.
            </Body>
          </Subsection>

          {/* Preview */}
          <Subsection level="h2">
            <Heading level="h2" id="preview" title="미리보기" />

            <Subsection level="h3">
              <Heading level="h3" id="hidden" title="숨김 (기본)" />
              <Body>
                기본적으로 숨겨진 상태이며, Tab 키를 눌러 포커스를 받으면 화면에
                나타납니다. 가장 일반적으로 사용하는 방식입니다.
              </Body>
              <Card>
                <SkipLink
                  links={[
                    { href: '#main-content', label: '본문 바로가기' },
                    { href: '#main-navigation', label: '주 메뉴 바로가기' },
                  ]}
                />
                <Body className="text-krds-gray-70 text-center mt-4">
                  Tab 키를 눌러 포커스를 확인하세요
                </Body>
              </Card>
              <Card>
                <Code language="tsx">
                  {`<SkipLink
  links={[
    { href: '#main-content', label: '본문 바로가기' },
    { href: '#main-navigation', label: '주 메뉴 바로가기' },
  ]}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" id="visible" title="항상 표시" />
              <Body>
                variant를 "visible"로 설정하면 항상 화면에 표시됩니다.
              </Body>
              <Card>
                <SkipLink
                  variant="visible"
                  links={[
                    { href: '#main-content', label: '본문 바로가기' },
                    { href: '#main-navigation', label: '주 메뉴 바로가기' },
                    { href: '#footer', label: '하단 메뉴 바로가기' },
                  ]}
                />
              </Card>
              <Card>
                <Code language="tsx">
                  {`<SkipLink
  variant="visible"
  links={[
    { href: '#main-content', label: '본문 바로가기' },
    { href: '#main-navigation', label: '주 메뉴 바로가기' },
    { href: '#footer', label: '하단 메뉴 바로가기' },
  ]}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" id="single" title="단일 링크 (권장)" />
              <Body>
                대부분의 경우 본문으로 바로가기 링크 하나만 제공하는 것이
                충분합니다.
              </Body>
              <Card>
                <SkipLink
                  links={[{ href: '#main-content', label: '본문 바로가기' }]}
                />
              </Card>
              <Card>
                <Code language="tsx">
                  {`<SkipLink
  links={[
    { href: '#main-content', label: '본문 바로가기' }
  ]}
/>`}
                </Code>
              </Card>
            </Subsection>
          </Subsection>

          {/* Usage */}
          <Subsection level="h2">
            <Heading level="h2" id="usage" title="사용 방법" />
            <Body>
              SkipLink는 페이지의 가장 첫 번째 요소로 배치해야 합니다 (쿠키
              배너/모달 제외).
            </Body>
            <Card>
              <Code language="tsx">
                {`import { SkipLink } from '@hanui/react';

export default function RootLayout({ children }) {
  return (
    <body>
      {/* SkipLink는 가장 먼저 배치 */}
      <SkipLink
        links={[
          { href: '#main-content', label: '본문 바로가기' },
        ]}
      />

      <Masthead />
      <Header />

      {/* main 요소에 id와 tabIndex 설정 */}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer />
    </body>
  );
}`}
              </Code>
            </Card>
          </Subsection>

          {/* Best Practices */}
          <Subsection level="h2">
            <Heading level="h2" id="best-practices" title="모범 사례" />

            <Subsection level="h3">
              <Heading level="h3" id="when-to-use" title="언제 사용하나요?" />
              <DoCard>
                <List variant="check">
                  <ListItem>
                    모든 페이지에서 반드시 사용 (WCAG Level A 필수 요구사항)
                  </ListItem>
                  <ListItem>
                    헤더, 네비게이션 등 반복적인 콘텐츠가 있는 페이지
                  </ListItem>
                  <ListItem>
                    키보드 사용자와 스크린 리더 사용자를 위한 필수 기능
                  </ListItem>
                  <ListItem>
                    정부 및 공공기관 웹사이트 (KRDS 필수 적용)
                  </ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" id="implementation-tips" title="구현 팁" />
              <List variant="disc">
                <ListItem>
                  <strong>페이지 최상단 배치:</strong> body 요소의 첫 번째 자식
                  요소로 배치하세요 (쿠키 배너/모달 제외)
                </ListItem>
                <ListItem>
                  <strong>단순하게 유지:</strong> 링크는 최대 3개까지만
                  권장합니다. 대부분의 경우 "본문 바로가기" 하나면 충분합니다
                </ListItem>
                <ListItem>
                  <strong>명확한 라벨:</strong> "본문 바로가기", "주 메뉴
                  바로가기" 등 명확한 한글 라벨을 사용하세요
                </ListItem>
                <ListItem>
                  <strong>대상 요소 설정:</strong> 대상 요소(main, nav 등)에{' '}
                  <Code>id</Code>와 <Code>tabIndex={'{-1}'}</Code>을 설정하세요
                </ListItem>
                <ListItem>
                  <strong>KRDS ID 필수:</strong> 컴포넌트는 자동으로{' '}
                  <Code>id="krds-skip-link"</Code>를 가집니다 (KRDS 필수)
                </ListItem>
              </List>
            </Subsection>
          </Subsection>

          {/* Accessibility */}
          <Subsection level="h2">
            <Heading level="h2" id="accessibility" title="접근성" />
            <Body>
              이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 Level A 기준을 준수합니다.
            </Body>

            <List variant="disc">
              <ListItem>
                <strong>Bypass Blocks (2.4.1):</strong> Level A 필수 기준으로,
                반복되는 콘텐츠 블록을 건너뛸 수 있는 메커니즘 제공
              </ListItem>
              <ListItem>
                <strong>키보드 접근성:</strong> Tab 키로 포커스, Enter 키로 이동
              </ListItem>
              <ListItem>
                <strong>포커스 관리:</strong> 링크 클릭 시 대상 요소로 자동
                스크롤 및 포커스 이동
              </ListItem>
              <ListItem>
                <strong>시각적 피드백:</strong> 포커스 시 명확한 시각적 표시
                (파란색 포커스 링)
              </ListItem>
              <ListItem>
                <strong>Semantic HTML:</strong> <Code>nav</Code> 요소와 적절한
                ARIA 속성 사용
              </ListItem>
            </List>
          </Subsection>

          {/* Foundation Layer */}
          <Subsection level="h2">
            <Heading
              level="h2"
              id="foundation-layer"
              title="Foundation Layer"
            />
            <Body>SkipLink 컴포넌트는 다음 기능들을 자동으로 처리합니다:</Body>

            <Card variant="info">
              <List variant="check">
                <ListItem>
                  <strong>KRDS ID 자동 적용:</strong>{' '}
                  <Code>id="krds-skip-link"</Code>가 자동으로 설정됩니다 (KRDS
                  필수 요구사항)
                </ListItem>
                <ListItem>
                  <strong>포커스 관리:</strong> 링크 클릭 시 대상 요소로
                  자동으로 스크롤하고 포커스를 이동합니다
                </ListItem>
                <ListItem>
                  <strong>키보드 내비게이션:</strong> Tab과 Enter 키를 완벽하게
                  지원합니다
                </ListItem>
                <ListItem>
                  <strong>다크 모드:</strong> 라이트/다크 모드를 자동으로
                  지원하며 충분한 대비율을 유지합니다
                </ListItem>
              </List>
            </Card>
          </Subsection>
        </TabsContent>

        <TabsContent value="api">
          {/* API Reference */}
          <Subsection level="h2">
            <Heading level="h2" id="api-reference" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" id="props" title="Props" />
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
                      <Code>links</Code>
                    </TableCell>
                    <TableCell>
                      <Code>SkipLinkItem[]</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      건너뛰기 링크 배열 (최대 3개 권장, 필수)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code>"visible" | "hidden"</Code>
                    </TableCell>
                    <TableCell>
                      <Code>"hidden"</Code>
                    </TableCell>
                    <TableCell>표시 방식 (숨김/항상 표시)</TableCell>
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

            <Subsection level="h3">
              <Heading
                level="h3"
                id="skiplink-item"
                title="SkipLinkItem Type"
              />
              <Card>
                <Code language="tsx">
                  {`interface SkipLinkItem {
  href: string;   // 링크 목적지 (예: '#main-content')
  label: string;  // 링크 라벨 텍스트 (예: '본문 바로가기')
}`}
                </Code>
              </Card>
            </Subsection>
          </Subsection>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'SimpleGrid', href: '/components/simple-grid' }}
        next={{ title: 'Spacing', href: '/components/spacing' }}
      />
    </Section>
  );
}
