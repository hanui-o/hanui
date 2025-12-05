'use client';

import { Masthead as MastheadComponent } from '@hanui/react';

// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
  Installation,
  ComponentPreview,
} from '@/components/content';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Body,
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

export default function MastheadPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Masthead"
        description="정부 웹사이트의 최상단에 위치하여 대한민국 공식 전자정부 누리집임을 나타내는 컴포넌트입니다. KRDS 표준에 따라 정부 서비스 전체의 통일성을 제공합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Overview */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />

            <ComponentPreview>
              <div className="w-full">
                <MastheadComponent />
              </div>
            </ComponentPreview>

            <Body className="mt-4">
              <strong>Masthead(공식 배너)</strong>는 정부 웹사이트의 가장
              최상단에 위치하여 대한민국 공식 전자정부 누리집임을 명시하는
              컴포넌트입니다. KRDS 표준에 따라 모든 정부 웹사이트에서 일관된
              형태로 표시되며, SkipLink 다음, Header보다 상위에 배치되어 정부
              서비스 전체의 통일성을 제공합니다.
            </Body>
          </Section>

          <Installation componentName="masthead" />

          {/* Usage */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Masthead는 페이지 레이아웃의 최상단에 배치하며, SkipLink 다음, Header보다 앞에 위치해야 합니다."
            />

            <Code variant="block" language="tsx">
              {`import { SkipLink } from '@/components/hanui/skiplink';
import { Masthead } from '@/components/hanui/masthead';
import { Header } from '@/components/hanui/header';

export default function Layout({ children }) {
  return (
    <body>
      {/* 1. SkipLink가 가장 먼저 */}
      <SkipLink
        links={[
          { href: '#main-content', label: '본문 바로가기' },
        ]}
      />

      {/* 2. Masthead (국기 아이콘 자동 표시) */}
      <Masthead />

      {/* 3. Header */}
      <Header>
        {/* Header 콘텐츠 */}
      </Header>

      {/* 4. 메인 콘텐츠 */}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </body>
  );
}`}
            </Code>
          </Section>

          {/* Examples */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="기본 사용"
                description="기본 Masthead는 대한민국 국기 아이콘과 함께 표준 텍스트를 표시합니다."
              />
              <ComponentPreview>
                <div className="w-full">
                  <MastheadComponent />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Masthead />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="커스텀 텍스트"
                description="필요한 경우 텍스트를 커스터마이징할 수 있습니다. 국기 아이콘은 자동으로 표시됩니다."
              />
              <ComponentPreview>
                <div className="w-full">
                  <MastheadComponent text="대한민국 정부 공식 누리집" />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Masthead text="대한민국 정부 공식 누리집" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="페이지 레이아웃 예제"
                description="실제 페이지 레이아웃에서의 Masthead 배치 예제입니다."
              />
              <Code variant="block" language="tsx">
                {`import { SkipLink } from '@/components/hanui/skiplink';
import { Masthead } from '@/components/hanui/masthead';
import { Header } from '@/components/hanui/header';
import { Footer } from '@/components/hanui/footer';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* Skip Links */}
        <SkipLink
          links={[
            { href: '#main-content', label: '본문 바로가기' },
            { href: '#main-menu', label: '주메뉴 바로가기' },
            { href: '#footer', label: '페이지 하단 바로가기' },
          ]}
        />

        {/* Masthead - 최상단 */}
        <Masthead />

        {/* Header with Main Menu */}
        <Header>
          <nav id="main-menu">
            {/* 메인 메뉴 */}
          </nav>
        </Header>

        {/* Main Content */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        {/* Footer */}
        <Footer id="footer" />
      </body>
    </html>
  );
}`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* MastheadProps */}
          <Section level="h2">
            <Heading level="h2" id="masthead-props" title="Masthead Props" />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>속성</TableHead>
                  <TableHead>타입</TableHead>
                  <TableHead>기본값</TableHead>
                  <TableHead>설명</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>text</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>
                    <Code>
                      &quot;이 누리집은 대한민국 공식 전자정부
                      누리집입니다&quot;
                    </Code>
                  </TableCell>
                  <TableCell>Masthead에 표시할 텍스트</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>className</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>추가 CSS 클래스</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Body className="mt-4">
              <strong>참고:</strong> Masthead는 모든 표준 HTML div 속성을
              지원합니다 (
              <Code>React.HTMLAttributes&lt;HTMLDivElement&gt;</Code>).
            </Body>
          </Section>

          {/* KRDS Standards */}
          <Section level="h2">
            <Heading
              level="h2"
              id="krds-standards"
              title="KRDS 표준"
              description="Masthead 컴포넌트가 자동으로 처리하는 KRDS 필수 요구사항입니다."
            />

            <List variant="check" spacing="default">
              <ListItem>
                <strong>KRDS 필수 ID:</strong> <Code>#krds-masthead</Code> ID가
                자동으로 적용됩니다
              </ListItem>
              <ListItem>
                <strong>국기 아이콘:</strong> 대한민국 국기 아이콘이 텍스트 앞에
                자동으로 표시됩니다
              </ListItem>
              <ListItem>
                <strong>표준 텍스트:</strong> &quot;이 누리집은 대한민국 공식
                전자정부 누리집입니다&quot; 텍스트가 기본으로 제공됩니다
              </ListItem>
              <ListItem>
                <strong>KRDS 색상:</strong> bg-krds-gray-5, border-krds-gray-20,
                text-krds-gray-90 사용
              </ListItem>
              <ListItem>
                <strong>KRDS 타이포그래피:</strong> 15px (KRDS body-sm), 150%
                line-height, font-medium
              </ListItem>
              <ListItem>
                <strong>반응형 디자인:</strong> 모든 화면 크기에서 최적화된
                표시를 제공합니다
              </ListItem>
              <ListItem>
                <strong>접근성:</strong> role=&quot;banner&quot;,
                aria-label=&quot;대한민국 공식 전자정부 배너&quot; 자동 적용
              </ListItem>
            </List>

            <Body className="mt-4">
              <strong>중요:</strong> Masthead는 정부 기관 웹사이트에만 사용해야
              합니다. 모든 페이지에서 일관된 Masthead를 사용하여 정부 서비스
              전체의 통일성을 유지하세요.
            </Body>
          </Section>

          {/* Styling */}
          <Section level="h2">
            <Heading level="h2" id="styling" title="스타일링" />

            <Subsection level="h3">
              <Heading level="h3" title="기본 스타일" />
              <Code variant="block" language="css">
                {`/* 배경 및 테두리 */
background-color: var(--krds-color-light-gray-5);
border-bottom: 1px solid var(--krds-color-light-gray-20);

/* 컨테이너 */
min-height: 40px;
padding: 8px 16px;

/* 텍스트 */
font-size: 15px;           /* KRDS body-sm */
line-height: 150%;
font-weight: 500;          /* medium */
color: var(--krds-color-light-gray-90);

/* 국기 아이콘 */
width: 20px;
height: 20px;
flex-shrink: 0;
gap: 8px;                  /* 아이콘과 텍스트 사이 간격 */`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Tailwind 클래스" />
              <Code variant="block" language="css">
                {`/* 컨테이너 */
.w-full
.bg-krds-gray-5
.border-b .border-krds-gray-20

/* 레이아웃 */
.container .mx-auto .px-4 .sm:px-6 .lg:px-8
.flex .items-center .gap-2
.min-h-[40px] .py-2

/* 아이콘 */
.w-5 .h-5 .shrink-0

/* 텍스트 */
.text-[15px] .text-krds-gray-90 .font-medium .leading-[150%]`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Main Menu', href: '/components/main-menu' }}
        next={{ title: 'Modal', href: '/components/modal' }}
      />
    </>
  );
}
