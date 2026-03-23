'use client';

import { SkipLink } from '@hanui/react';
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';
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

export default function SkipLinkPage() {
  return (
    <>
      <Heading
        level="h1"
        id="skiplink"
        title="SkipLink"
        description="키보드 및 스크린 리더 사용자가 반복적인 콘텐츠를 건너뛰고 주요 콘텐츠로 바로 이동할 수 있도록 돕는 접근성 필수 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <Body className="mb-3">
              SkipLink(건너뛰기 링크)는 키보드 사용자와 스크린 리더 사용자가
              헤더, 네비게이션 등 반복적인 콘텐츠를 건너뛰고 페이지의 주요
              콘텐츠로 바로 이동할 수 있도록 돕는 컴포넌트입니다.{' '}
              <strong>WCAG 2.1 / KWCAG 2.2 Level A</strong> 기준 &quot;Bypass
              Blocks (2.4.1)&quot;을 충족하기 위해 반드시 구현해야 합니다.
            </Body>
            <ComponentPreview>
              <SkipLink
                variant="visible"
                links={[{ href: '#main-content', label: '본문 바로가기' }]}
              />
            </ComponentPreview>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Installation componentName="skip-link" />
          </Section>

          {/* 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="SkipLink는 페이지의 가장 첫 번째 요소로 배치해야 합니다 (쿠키 배너/모달 제외)."
            />
            <Code variant="block" language="tsx">
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
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="숨김 (기본)"
                description="기본적으로 숨겨진 상태이며, Tab 키를 눌러 포커스를 받으면 화면에 나타납니다."
              />
              <ComponentPreview>
                <SkipLink
                  links={[{ href: '#main-content', label: '본문 바로가기' }]}
                />
                <Body className="text-krds-gray-70 text-center mt-4">
                  Tab 키를 눌러 포커스를 확인하세요
                </Body>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<SkipLink
  links={[
    { href: '#main-content', label: '본문 바로가기' },
  ]}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="단일 링크"
                description="대부분의 경우 본문 바로가기 링크 하나만 제공하면 충분합니다."
              />
              <ComponentPreview>
                <SkipLink
                  variant="visible"
                  links={[{ href: '#main-content', label: '본문 바로가기' }]}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<SkipLink
  links={[
    { href: '#main-content', label: '본문 바로가기' }
  ]}
/>`}
              </Code>
            </Subsection>
          </Section>

          {/* 구현 팁 */}
          <Section level="h2">
            <Heading level="h2" id="implementation-tips" title="구현 팁" />
            <List>
              <ListItem>
                <strong>페이지 최상단 배치:</strong> body 요소의 첫 번째 자식
                요소로 배치하세요 (쿠키 배너/모달 제외)
              </ListItem>
              <ListItem>
                <strong>단순하게 유지:</strong> 링크는 최대 3개까지만
                권장합니다. 대부분의 경우 &quot;본문 바로가기&quot; 하나면
                충분합니다
              </ListItem>
              <ListItem>
                <strong>명확한 라벨:</strong> &quot;본문 바로가기&quot;,
                &quot;주 메뉴 바로가기&quot; 등 명확한 한글 라벨을 사용하세요
              </ListItem>
              <ListItem>
                <strong>대상 요소 설정:</strong> 대상 요소(main, nav 등)에{' '}
                <Code>id</Code>와 <Code>tabIndex={'{-1}'}</Code>을 설정하세요
              </ListItem>
              <ListItem>
                <strong>KRDS ID 자동 적용:</strong> 컴포넌트는 자동으로{' '}
                <Code>id=&quot;krds-skip-link&quot;</Code>를 가집니다
              </ListItem>
            </List>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 AA 레벨을 준수합니다."
            />
            <List variant="check">
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
                <strong>시각적 피드백:</strong> 포커스 시 명확한 포커스 링 표시
              </ListItem>
              <ListItem>
                <strong>Semantic HTML:</strong> <Code>&lt;nav&gt;</Code> 요소와{' '}
                <Code>aria-label</Code> 속성으로 스크린 리더 지원
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api-reference" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="SkipLink Props" />
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
                      <Code>links</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">SkipLinkItem[]</Code>
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
                      <Code className="text-xs">
                        &apos;visible&apos; | &apos;hidden&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;hidden&apos;</Code>
                    </TableCell>
                    <TableCell>표시 방식 (숨김/항상 표시)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
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

            <Subsection level="h3">
              <Heading level="h3" title="SkipLinkItem Type" />
              <Code variant="block" language="tsx">
                {`interface SkipLinkItem {
  href: string;   // 링크 목적지 (예: '#main-content')
  label: string;  // 링크 라벨 텍스트 (예: '본문 바로가기')
}`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Skeleton', href: '/components/skeleton' }}
        next={{ title: 'Slider', href: '/components/slider' }}
      />
    </>
  );
}
