'use client';

import { Masthead } from '@hanui/react';
// Docs layout components
import {
  PageSection as Section,
  Subsection,
  SectionHeading,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { DoCard } from '@/components/helpers';

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

export default function MastheadPage() {
  return (
    <Section>
      <SectionHeading
        level="h1"
        id="masthead"
        title="Masthead"
        description="정부 웹사이트의 최상단에 위치하여 대한민국 공식 전자정부 누리집임을 나타내는 컴포넌트입니다. KRDS 표준에 따라 정부 서비스 전체의 통일성을 제공합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="installation" title="설치" />
            <Body>
              CLI를 사용하여 컴포넌트를 프로젝트에 설치할 수 있습니다.
            </Body>
            <Card>
              <Code language="bash">npx @hanui/cli add masthead</Code>
            </Card>
          </Subsection>

          {/* What is it */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="what-is-it" title="Masthead란?" />
            <Body>
              Masthead(공식 배너)는 정부 웹사이트의 가장 최상단에 위치하여
              대한민국 공식 전자정부 누리집임을 명시하는 컴포넌트입니다.
            </Body>
            <Body>
              KRDS 표준에 따라 모든 정부 웹사이트에서 일관된 형태로 표시되며,
              SkipLink 다음, Header보다 상위에 배치되어 정부 서비스 전체의
              통일성을 제공합니다.
            </Body>
          </Subsection>

          {/* Preview */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />

            <Subsection level="h3">
              <SectionHeading level="h3" id="basic" title="기본 사용" />
              <Body>
                기본 Masthead는 대한민국 공식 전자정부를 나타내는 표준 텍스트를
                표시합니다.
              </Body>
              <Card>
                <Masthead />
              </Card>
              <Card>
                <Code language="tsx">{`<Masthead />`}</Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="custom-text"
                title="커스텀 텍스트"
              />
              <Body>필요한 경우 텍스트를 커스터마이징할 수 있습니다.</Body>
              <Card>
                <Masthead text="이 누리집은 대한민국 공식 전자정부 누리집입니다" />
              </Card>
              <Card>
                <Code language="tsx">
                  {`<Masthead text="이 누리집은 대한민국 공식 전자정부 누리집입니다" />`}
                </Code>
              </Card>
            </Subsection>
          </Subsection>

          {/* Usage */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="usage" title="사용 방법" />
            <Body>
              Masthead는 페이지 레이아웃의 최상단에 배치하며, SkipLink 다음,
              Header보다 앞에 위치해야 합니다.
            </Body>
            <Card>
              <Code language="tsx">
                {`import { SkipLink, Masthead, Header } from '@hanui/react';

export default function Layout({ children }) {
  return (
    <body>
      {/* 1. SkipLink가 가장 먼저 */}
      <SkipLink
        links={[
          { href: '#main-content', label: '본문 바로가기' },
        ]}
      />

      {/* 2. Masthead */}
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
                    정부 공식 웹사이트 - 대한민국 정부 기관의 공식 누리집
                  </ListItem>
                  <ListItem>
                    최상단 배치 - SkipLink 다음, Header보다 위에 배치
                  </ListItem>
                  <ListItem>
                    일관된 표시 - 모든 페이지에서 동일한 Masthead 사용
                  </ListItem>
                  <ListItem>
                    정부 브랜딩 - 정부 서비스 전체의 통일성 제공
                  </ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="implementation-tips"
                title="구현 팁"
              />
              <List variant="disc">
                <ListItem>
                  <strong>최상단 고정:</strong> Masthead는 항상 페이지 최상단에
                  배치합니다 (SkipLink 제외)
                </ListItem>
                <ListItem>
                  <strong>Header 이전:</strong> Header 컴포넌트보다 앞에
                  위치시킵니다
                </ListItem>
                <ListItem>
                  <strong>시각적 절제:</strong> 지나치게 주의를 끌지 않는
                  subtle한 표현을 사용합니다
                </ListItem>
                <ListItem>
                  <strong>일관성 유지:</strong> 모든 페이지에서 동일한
                  Masthead를 사용합니다
                </ListItem>
              </List>
            </Subsection>
          </Subsection>

          {/* Accessibility */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="accessibility" title="접근성" />
            <Body>
              이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 Level A 기준을 준수합니다.
            </Body>

            <List variant="disc">
              <ListItem>
                <strong>Semantic HTML:</strong> div 요소를 사용하여 명확한
                구조를 제공합니다
              </ListItem>
              <ListItem>
                <strong>Skip Link 호환:</strong> SkipLink와 함께 작동하도록
                설계되어 Bypass Blocks (2.4.1) 준수를 지원합니다
              </ListItem>
              <ListItem>
                <strong>명확한 텍스트:</strong> 스크린 리더가 공식 정부
                누리집임을 명확히 전달합니다
              </ListItem>
              <ListItem>
                <strong>시각적 피드백:</strong> 충분한 대비율로 텍스트를
                표시합니다
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
            <Body>Masthead 컴포넌트는 다음 기능들을 자동으로 처리합니다:</Body>

            <Card variant="info">
              <List variant="check">
                <ListItem>
                  <strong>KRDS 필수 ID:</strong> <Code>#krds-masthead</Code>{' '}
                  ID가 자동으로 적용됩니다 (KRDS 필수 요구사항)
                </ListItem>
                <ListItem>
                  <strong>기본 텍스트:</strong> "이 누리집은 대한민국 공식
                  전자정부 누리집입니다" 텍스트가 기본으로 제공됩니다
                </ListItem>
                <ListItem>
                  <strong>다크 모드:</strong> 라이트/다크 모드를 자동으로
                  지원합니다
                </ListItem>
                <ListItem>
                  <strong>반응형 디자인:</strong> 모든 화면 크기에서 최적화된
                  표시를 제공합니다
                </ListItem>
                <ListItem>
                  <strong>일관된 스타일:</strong> 정부 서비스 전체에서 일관된
                  스타일을 유지합니다
                </ListItem>
              </List>
            </Card>
          </Subsection>

          {/* KRDS Standards */}
          <Subsection level="h2">
            <SectionHeading level="h2" id="krds-standards" title="KRDS 표준" />

            <Card variant="warning">
              <List variant="disc">
                <ListItem>
                  <strong>필수 ID:</strong> <Code>#krds-masthead</Code> ID 사용
                  필수
                </ListItem>
                <ListItem>
                  <strong>최상단 배치:</strong> 페이지 최상단에 배치 (SkipLink
                  다음, Header보다 위)
                </ListItem>
                <ListItem>
                  <strong>표준 텍스트:</strong> "이 누리집은 대한민국 공식
                  전자정부 누리집입니다" 사용 권장
                </ListItem>
                <ListItem>
                  <strong>시각적 절제:</strong> 지나치게 주의를 끌지 않는 디자인
                </ListItem>
                <ListItem>
                  <strong>일관성:</strong> 모든 정부 웹사이트에서 동일한 형태로
                  표시
                </ListItem>
                <ListItem>
                  <strong>정부 전용:</strong> 정부 기관 웹사이트에만 사용
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
                      <Code>text</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;이 누리집은...&quot;</Code>
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
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" id="examples" title="사용 예제" />

              <Body className="font-medium mb-2">기본 사용:</Body>
              <Card>
                <Code language="tsx">{`<Masthead />`}</Code>
              </Card>

              <Body className="font-medium mb-2 mt-4">커스텀 텍스트:</Body>
              <Card>
                <Code language="tsx">
                  {`<Masthead text="이 누리집은 대한민국 공식 전자정부 누리집입니다" />`}
                </Code>
              </Card>

              <Body className="font-medium mb-2 mt-4">
                SkipLink와 함께 사용 (권장):
              </Body>
              <Card>
                <Code language="tsx">
                  {`import { SkipLink, Masthead } from '@hanui/react';

<>
  <SkipLink
    links={[
      { href: '#main-content', label: '본문 바로가기' },
    ]}
  />
  <Masthead />
  <main id="main-content" tabIndex={-1}>
    {/* 콘텐츠 */}
  </main>
</>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="krds-note"
                title="KRDS 표준 준수"
              />
              <Card variant="warning">
                <Body className="font-medium mb-2">중요사항:</Body>
                <List variant="disc">
                  <ListItem>
                    Masthead는 자동으로 <Code>#krds-masthead</Code> ID를
                    적용하여 KRDS 표준을 준수합니다
                  </ListItem>
                  <ListItem>
                    반드시 페이지 최상단에 배치해야 합니다 (SkipLink 다음)
                  </ListItem>
                  <ListItem>정부 기관 웹사이트에만 사용해야 합니다</ListItem>
                  <ListItem>
                    모든 페이지에서 일관된 Masthead를 사용해야 합니다
                  </ListItem>
                  <ListItem>
                    SkipLink와 함께 사용하여 Bypass Blocks (2.4.1) 기준을
                    준수하세요
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Subsection>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Main Menu', href: '/components/mainmenu' }}
        next={{ title: 'Modal', href: '/components/modal' }}
      />
    </Section>
  );
}
