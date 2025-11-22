'use client';

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
  Container as ContainerComponent,
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
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';

export default function ContainerPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Container"
        description="KRDS 레이아웃 시스템을 기반으로 한 반응형 컨테이너 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section>
            <SectionHeading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 Container 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add container
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Container는 페이지의 콘텐츠를 제한된 너비 내에 정렬하고, 반응형 레이아웃을 구성하는 기본 레이아웃 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>KRDS 준수:</strong> 한국형 웹 콘텐츠 접근성 지침의
                  그리드 시스템을 준수하여 모든 화면 크기에서 일관된 여백과
                  정렬을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>반응형 레이아웃:</strong> 화면 크기에 따라 자동으로
                  조정되는 여백과 최대 너비를 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>유연한 너비 옵션:</strong> sm (640px)부터 2xl
                  (1440px)까지, 콘텐츠에 맞는 다양한 너비 옵션을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>시맨틱 HTML:</strong> as prop으로 적절한 HTML 요소를
                  선택할 수 있어 접근성을 향상시킵니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section>
            <SectionHeading level="h2" id="preview" title="미리보기" />

            <Card variant="outlined">
              <div className="border-2 border-dashed border-krds-gray-20">
                <ContainerComponent className="bg-krds-primary-10 py-8">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Container</h2>
                    <Body className="text-krds-gray-70">
                      콘텐츠가 중앙에 정렬되고 최대 너비가 제한됩니다
                    </Body>
                  </div>
                </ContainerComponent>
              </div>
            </Card>
          </Section>

          {/* Usage */}
          <Section>
            <SectionHeading level="h2" id="usage" title="사용법" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="기본 사용법">
                <Body className="leading-relaxed">
                  Container 컴포넌트를 import하여 페이지 콘텐츠를 감쌉니다:
                </Body>
              </SectionHeading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { Container } from '@hanui/react'

<Container>
  <h1>페이지 제목</h1>
  <p>콘텐츠</p>
</Container>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="최대 너비 설정">
                <Body className="leading-relaxed">
                  maxWidth prop으로 콘텐츠에 맞는 최대 너비를 설정할 수
                  있습니다:
                </Body>
              </SectionHeading>

              <Stack gap="md">
                {/* Default (xl) */}
                <div>
                  <Body className="font-medium mb-2">
                    Default (xl - 1280px) - 일반적인 페이지
                  </Body>
                  <Card variant="outlined">
                    <div className="border-2 border-dashed border-krds-gray-20">
                      <ContainerComponent className="bg-krds-success-10 py-8">
                        <Body className="text-center text-krds-gray-90">
                          Default Container (max-width: 1280px)
                        </Body>
                      </ContainerComponent>
                    </div>
                  </Card>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Container>
  <h1>페이지 제목</h1>
  <p>일반적인 콘텐츠</p>
</Container>`}
                  </Code>
                </div>

                {/* Small */}
                <div>
                  <Body className="font-medium mb-2">
                    Small (sm - 640px) - 로그인 폼, 회원가입
                  </Body>
                  <Card variant="outlined">
                    <div className="border-2 border-dashed border-krds-gray-20">
                      <ContainerComponent
                        maxWidth="sm"
                        className="bg-krds-accent-10 py-8"
                      >
                        <Body className="text-center text-krds-gray-90">
                          Small Container (max-width: 640px)
                        </Body>
                      </ContainerComponent>
                    </div>
                  </Card>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Container maxWidth="sm">
  <form>
    <h2>로그인</h2>
    {/* 폼 필드 */}
  </form>
</Container>`}
                  </Code>
                </div>

                {/* Full Width */}
                <div>
                  <Body className="font-medium mb-2">
                    Full Width - 전체 너비 + 여백 유지
                  </Body>
                  <Card variant="outlined">
                    <div className="border-2 border-dashed border-krds-gray-20">
                      <ContainerComponent
                        maxWidth="full"
                        className="bg-krds-information-10 py-8"
                      >
                        <Body className="text-center text-krds-gray-90">
                          Full Width Container (max-width: 100%)
                        </Body>
                      </ContainerComponent>
                    </div>
                  </Card>
                  <Code variant="block" language="tsx" showLineNumbers={false}>
                    {`<Container maxWidth="full">
  <HeroSection />
</Container>`}
                  </Code>
                </div>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Gutters 제거 (disableGutters)">
                <Body className="leading-relaxed">
                  좌우 패딩을 제거하여 콘텐츠가 화면 끝까지 확장되도록 합니다:
                </Body>
              </SectionHeading>

              <Card variant="outlined">
                <div className="border-2 border-dashed border-krds-gray-20">
                  <ContainerComponent
                    disableGutters
                    className="bg-krds-secondary-10 py-8"
                  >
                    <Body className="text-center text-krds-gray-90">
                      No Gutters Container (패딩 없음)
                    </Body>
                  </ContainerComponent>
                </div>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Container disableGutters>
  <img src="/hero.jpg" alt="히어로 이미지" className="w-full" />
</Container>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="시맨틱 HTML (as prop)">
                <Body className="leading-relaxed">
                  접근성 향상을 위해 콘텐츠의 의미에 맞는 HTML 요소를
                  사용합니다:
                </Body>
              </SectionHeading>

              <Card variant="outlined">
                <Stack gap="md">
                  <ContainerComponent
                    as="main"
                    className="bg-krds-primary-10 py-4"
                  >
                    <Body className="text-center text-krds-gray-90">
                      &lt;main&gt; - 페이지의 주요 콘텐츠
                    </Body>
                  </ContainerComponent>
                  <ContainerComponent
                    as="section"
                    className="bg-krds-success-10 py-4"
                  >
                    <Body className="text-center text-krds-gray-90">
                      &lt;section&gt; - 섹션 그룹
                    </Body>
                  </ContainerComponent>
                  <ContainerComponent
                    as="article"
                    className="bg-krds-warning-10 py-4"
                  >
                    <Body className="text-center text-krds-gray-90">
                      &lt;article&gt; - 독립적인 콘텐츠
                    </Body>
                  </ContainerComponent>
                </Stack>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 메인 콘텐츠
<Container as="main">
  <h1>페이지 제목</h1>
  <p>주요 콘텐츠</p>
</Container>

// 섹션
<Container as="section">
  <h2>소개</h2>
  <p>섹션 내용</p>
</Container>

// 아티클
<Container as="article">
  <h2>블로그 포스트</h2>
  <p>글 내용</p>
</Container>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="여러 섹션 사용">
                <Body className="leading-relaxed">
                  여러 섹션이 있는 페이지에서 각 섹션마다 Container를
                  사용합니다. Container를 중첩하지 않도록 주의하세요:
                </Body>
              </SectionHeading>

              <Card variant="outlined">
                <Stack gap="md">
                  <div className="border-2 border-dashed border-krds-gray-20">
                    <ContainerComponent className="bg-krds-primary-10 py-6">
                      <h3 className="text-lg font-semibold text-center mb-2">
                        Header Section
                      </h3>
                      <Body className="text-center text-krds-gray-70">
                        첫 번째 섹션
                      </Body>
                    </ContainerComponent>
                  </div>
                  <div className="border-2 border-dashed border-krds-gray-20">
                    <ContainerComponent className="bg-krds-success-10 py-6">
                      <h3 className="text-lg font-semibold text-center mb-2">
                        Main Section
                      </h3>
                      <Body className="text-center text-krds-gray-70">
                        두 번째 섹션
                      </Body>
                    </ContainerComponent>
                  </div>
                </Stack>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<div>
  <Container as="header">
    <Navigation />
  </Container>

  <Container as="main">
    <MainContent />
  </Container>

  <Container as="footer">
    <FooterContent />
  </Container>
</div>`}
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
                title="페이지의 메인 콘텐츠 감싸기"
                description="페이지의 주요 콘텐츠를 Container로 감싸서 일관된 정렬과 여백을 제공하세요."
              />

              <DoCard
                title="콘텐츠에 맞는 너비 선택"
                description="로그인 폼은 sm, 블로그는 md, 일반 페이지는 xl 등 콘텐츠의 특성에 맞는 최대 너비를 선택하세요."
              />

              <DoCard
                title="시맨틱 HTML 활용"
                description="as prop 또는 시맨틱 요소로 Container를 감싸서 접근성을 향상시키세요. (선택사항)"
              />

              <DontCard
                title="Container 중첩하지 않기"
                description="Container 안에 Container를 중첩하지 마세요. 하나의 Container만 사용하세요."
              />

              <DontCard
                title="이미 크기가 제한된 컴포넌트 내부에서 사용하지 않기"
                description="Card, Modal 등 이미 크기가 제한된 컴포넌트 내부에서는 Container를 사용하지 마세요."
              />
            </Stack>

            <Subsection level="h3">
              <SectionHeading level="h3" title="KRDS 레이아웃 시스템" />

              <Card variant="info">
                <h4 className="font-semibold mb-3">그리드 요소</h4>
                <List>
                  <ListItem>
                    <strong>Screen Margin (스크린 마진):</strong> 화면 양쪽
                    가장자리의 여백 (16-24px)
                  </ListItem>
                  <ListItem>
                    <strong>Column (칼럼):</strong> UI 요소를 수직으로 정렬하는
                    분할 영역 (4-16개)
                  </ListItem>
                  <ListItem>
                    <strong>Gutter (거터):</strong> 칼럼 사이의 간격 (16-24px)
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>

          {/* Accessibility */}
          <Section>
            <SectionHeading level="h2" id="accessibility" title="접근성" />

            <Card variant="info">
              <List variant="check">
                <ListItem>
                  <strong>시맨틱 HTML:</strong> as prop을 통해 main, section,
                  article 등 적절한 HTML 요소를 사용할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>반응형 레이아웃:</strong> 모든 화면 크기에서 적절한
                  여백과 최대 너비를 제공하여 가독성을 향상시킵니다.
                </ListItem>
                <ListItem>
                  <strong>KRDS 준수:</strong> 한국형 웹 콘텐츠 접근성 지침의
                  그리드 시스템을 준수합니다.
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
              <SectionHeading level="h3" title="Container Props" />

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
                    <TableCell className="font-mono">maxWidth</TableCell>
                    <TableCell className="text-krds-gray-70">
                      &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; |
                      &apos;xl&apos; | &apos;2xl&apos; | &apos;full&apos; |
                      false
                    </TableCell>
                    <TableCell className="font-mono">&apos;lg&apos;</TableCell>
                    <TableCell>최대 너비 설정</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">disableGutters</TableCell>
                    <TableCell className="text-krds-gray-70">boolean</TableCell>
                    <TableCell className="font-mono">false</TableCell>
                    <TableCell>좌우 패딩 제거 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">as</TableCell>
                    <TableCell className="text-krds-gray-70">
                      &apos;div&apos; | &apos;section&apos; |
                      &apos;article&apos; | &apos;main&apos; | ...
                    </TableCell>
                    <TableCell className="font-mono">&apos;div&apos;</TableCell>
                    <TableCell>렌더링할 HTML 요소</TableCell>
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
              <SectionHeading level="h3" title="Max Width 값" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>값</TableHead>
                    <TableHead>최대 너비</TableHead>
                    <TableHead>용도</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">sm</TableCell>
                    <TableCell>640px</TableCell>
                    <TableCell>로그인 폼, 간단한 콘텐츠</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">md</TableCell>
                    <TableCell>768px</TableCell>
                    <TableCell>블로그 포스트, 기사</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">lg</TableCell>
                    <TableCell>1024px</TableCell>
                    <TableCell>일반 페이지 (기본값, 권장)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">xl</TableCell>
                    <TableCell>1280px</TableCell>
                    <TableCell>대시보드, 데이터 테이블</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">2xl</TableCell>
                    <TableCell>1440px</TableCell>
                    <TableCell>매우 넓은 레이아웃</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">full</TableCell>
                    <TableCell>100%</TableCell>
                    <TableCell>전체 너비 + 여백 유지</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="KRDS 스크린 마진 (Screen Margin)"
              />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>브레이크포인트</TableHead>
                    <TableHead>화면 크기</TableHead>
                    <TableHead>좌우 패딩</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Mobile (기본)</TableCell>
                    <TableCell>~640px</TableCell>
                    <TableCell className="font-mono">16px (px-4)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tablet (sm)</TableCell>
                    <TableCell>640px~</TableCell>
                    <TableCell className="font-mono">24px (px-6)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Desktop (lg)</TableCell>
                    <TableCell>1024px~</TableCell>
                    <TableCell className="font-mono">32px (px-8)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Colors', href: '/components/colors' }}
        next={{ title: 'Display', href: '/components/display' }}
      />
    </>
  );
}
