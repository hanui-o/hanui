'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// UI components - from @hanui/react
import {
  Code,
  Body,
  Card,
  Link,
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
  Stack,
  Container,
  Grid,
  GridItem,
  SimpleGrid,
} from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function LayoutPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Layout"
        description="KRDS 기반 레이아웃 시스템입니다. Container, Breakpoints, Grid를 활용하여 일관된 반응형 레이아웃을 구성합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 핵심 요약 */}
          <Section level="h2">
            <Card variant="filled">
              <Body>
                <strong>핵심:</strong> HANUI 레이아웃 시스템은 3가지 핵심 요소로
                구성됩니다.
              </Body>
              <List className="mt-2 text-krds-gray-90">
                <ListItem>
                  <Code>Container</Code> — max-width와 반응형 패딩 관리
                </ListItem>
                <ListItem>
                  <Code>Breakpoints</Code> — 6단계 반응형 분기점 (xs~2xl)
                </ListItem>
                <ListItem>
                  <Code>Grid</Code> / <Code>SimpleGrid</Code> — CSS Grid 기반
                  레이아웃
                </ListItem>
              </List>
            </Card>

            <Body className="mt-4">
              Container는 <Code>@hanui/react/variables.css</Code>의 CSS 변수를
              사용하고, Breakpoints는 <Code>tailwind.preset.ts</Code>의{' '}
              <Code>screens</Code> 설정에 정의되어 있습니다.
            </Body>
          </Section>

          {/* Container */}
          <Section level="h2">
            <Heading
              level="h2"
              id="container"
              title="Container"
              description="콘텐츠의 최대 너비와 반응형 패딩을 관리하는 래퍼 컴포넌트입니다."
            />

            <Card variant="filled">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>CSS 변수 기반:</strong>{' '}
                  <Code>@hanui/react/variables.css</Code>의{' '}
                  <Code>--krds-container-*</Code> 변수를 사용합니다.
                </ListItem>
                <ListItem>
                  <strong>반응형 패딩:</strong> 화면 크기에 따라 자동으로 패딩이
                  조절됩니다 (16px → 24px → 32px).
                </ListItem>
                <ListItem>
                  <strong>유연한 max-width:</strong> xs(480px) ~ 2xl(1440px)
                  또는 full 중 선택 가능합니다.
                </ListItem>
              </List>
            </Card>

            <Subsection level="h3">
              <Heading level="h3" title="기본 사용" />

              <ComponentPreview>
                <Container className="border border-dashed border-krds-gray-30 rounded-lg py-4">
                  <Body className="text-center text-krds-gray-70">
                    Container (기본: xl = 1280px)
                  </Body>
                </Container>
              </ComponentPreview>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { Container } from '@hanui/react';

// 기본 사용 (maxWidth: xl = 1280px)
<Container>
  콘텐츠가 중앙 정렬되고 반응형 패딩이 적용됩니다.
</Container>

// maxWidth 변경
<Container maxWidth="2xl">  {/* 1440px */}
  KRDS 권장 최대 너비
</Container>

// 패딩 제거
<Container disablePadding>
  수평 패딩 없이 사용
</Container>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="CSS 변수" />

              <Card variant="outlined">
                <Code variant="block" language="css" showLineNumbers={false}>
                  {`/* @hanui/react/variables.css */

/* Container Max-Width */
--krds-container-xs: 480px;
--krds-container-sm: 640px;
--krds-container-md: 768px;
--krds-container-lg: 1024px;
--krds-container-xl: 1280px;   /* 기본값 */
--krds-container-2xl: 1440px;  /* KRDS 권장 최대 너비 */

/* 반응형 패딩 */
--krds-container-padding-mobile: 1rem;   /* 16px - 기본 */
--krds-container-padding-tablet: 1.5rem; /* 24px - sm: */
--krds-container-padding-desktop: 2rem;  /* 32px - lg: */`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="maxWidth 옵션" />

              <ComponentPreview>
                <Stack gap="sm">
                  <Container
                    maxWidth="sm"
                    className="border border-dashed border-krds-primary-30 rounded py-2"
                  >
                    <Body size="sm" className="text-center text-krds-gray-70">
                      sm (640px)
                    </Body>
                  </Container>
                  <Container
                    maxWidth="md"
                    className="border border-dashed border-krds-primary-30 rounded py-2"
                  >
                    <Body size="sm" className="text-center text-krds-gray-70">
                      md (768px)
                    </Body>
                  </Container>
                  <Container
                    maxWidth="lg"
                    className="border border-dashed border-krds-primary-30 rounded py-2"
                  >
                    <Body size="sm" className="text-center text-krds-gray-70">
                      lg (1024px)
                    </Body>
                  </Container>
                  <Container
                    maxWidth="xl"
                    className="border border-dashed border-krds-primary-30 rounded py-2"
                  >
                    <Body size="sm" className="text-center text-krds-gray-70">
                      xl (1280px) - 기본값
                    </Body>
                  </Container>
                  <Container
                    maxWidth="2xl"
                    className="border border-dashed border-krds-primary-30 rounded py-2"
                  >
                    <Body size="sm" className="text-center text-krds-gray-70">
                      2xl (1440px) - KRDS 권장
                    </Body>
                  </Container>
                </Stack>
              </ComponentPreview>
            </Subsection>
          </Section>

          {/* Breakpoints */}
          <Section level="h2">
            <Heading
              level="h2"
              id="breakpoints"
              title="Breakpoints"
              description="화면 크기에 따라 레이아웃이 변경되는 지점을 정의합니다."
            />

            <Card variant="filled">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>하이브리드 시스템:</strong> Tailwind 기본값과 KRDS
                  브레이크포인트를 모두 지원합니다.
                </ListItem>
                <ListItem>
                  <strong>모바일 우선:</strong> Mobile First 접근 방식을
                  따릅니다.
                </ListItem>
                <ListItem>
                  <strong>6단계 스케일:</strong> xs(360px) ~ 2xl(1440px)
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* 브레이크포인트 스케일 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="breakpoint-scale"
              title="브레이크포인트 스케일"
              description="HANUI는 Tailwind 기본값과 KRDS 브레이크포인트를 모두 지원하는 하이브리드 방식을 사용합니다."
            />

            <Card
              variant="outlined"
              className="bg-krds-primary-5 border-krds-primary-20"
            >
              <Heading
                level="h3"
                title="하이브리드 브레이크포인트 시스템"
                description="국제 표준과의 호환성을 유지하면서 KRDS 요구사항도 충족합니다."
              />

              <List className="text-krds-gray-70 mt-3">
                <ListItem>
                  <strong className="text-krds-primary-text">
                    xs (360px):
                  </strong>{' '}
                  KRDS small 기준으로 추가. 국제 표준과의 호환성을 위해 기존{' '}
                  <Code>sm</Code>을 640px로 유지하고, KRDS 요구사항인 360px는{' '}
                  <Code>xs</Code>로 추가했습니다.
                </ListItem>
                <ListItem>
                  <strong className="text-krds-primary-text">
                    sm, md, lg, xl:
                  </strong>{' '}
                  Tailwind 기본값을 그대로 유지 (640px, 768px, 1024px, 1280px).
                  국제 표준과 외부 라이브러리와의 호환성을 보장합니다.
                </ListItem>
                <ListItem>
                  <strong className="text-krds-primary-text">
                    2xl (1440px):
                  </strong>{' '}
                  Tailwind 기본값(1536px)을 KRDS xxlarge 기준인 1440px로 변경.
                  KRDS 권장 최대 너비와 일치합니다.
                </ListItem>
              </List>
            </Card>

            <Subsection level="h3">
              <Heading level="h3" title="브레이크포인트 상세 표" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>브레이크포인트</TableHead>
                    <TableHead>뷰포트</TableHead>
                    <TableHead>칼럼 수 (적정-최대)</TableHead>
                    <TableHead>가터 너비 (최소-적정)</TableHead>
                    <TableHead>최소 스크린 마진</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>xs</Code>
                      <Body size="xs" className="text-krds-gray-70 ml-1">
                        (KRDS)
                      </Body>
                    </TableCell>
                    <TableCell>360px-</TableCell>
                    <TableCell>4-6</TableCell>
                    <TableCell>16px - 16px</TableCell>
                    <TableCell>16px</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sm</Code>
                      <Body size="xs" className="text-krds-gray-70 ml-1">
                        (Tailwind)
                      </Body>
                    </TableCell>
                    <TableCell>640px-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>md</Code>
                      <Body size="xs" className="text-krds-gray-70 ml-1">
                        (KRDS/Tailwind)
                      </Body>
                    </TableCell>
                    <TableCell>768px-</TableCell>
                    <TableCell>8-12</TableCell>
                    <TableCell>16px - 24px</TableCell>
                    <TableCell>24px</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>lg</Code>
                      <Body size="xs" className="text-krds-gray-70 ml-1">
                        (KRDS/Tailwind)
                      </Body>
                    </TableCell>
                    <TableCell>1024px-</TableCell>
                    <TableCell>12-16</TableCell>
                    <TableCell>16px - 24px</TableCell>
                    <TableCell>24px</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>xl</Code>
                      <Body size="xs" className="text-krds-gray-70 ml-1">
                        (KRDS/Tailwind)
                      </Body>
                    </TableCell>
                    <TableCell>1280px-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>2xl</Code>
                      <Body size="xs" className="text-krds-gray-70 ml-1">
                        (KRDS)
                      </Body>
                    </TableCell>
                    <TableCell>1440px-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="브레이크포인트 선택 가이드" />

              <Card
                variant="outlined"
                className="bg-krds-warning-5 border-krds-warning-20"
              >
                <List className="text-krds-gray-70">
                  <ListItem>
                    브레이크포인트 단계가 적을수록 관리와 개발이 용이하지만
                    세분화가 어려울 수 있습니다.
                  </ListItem>
                  <ListItem>
                    단계가 많아질수록 디자인 세분화가 가능하지만 복잡성은
                    증가합니다.
                  </ListItem>
                  <ListItem>
                    프로젝트의 요구사항에 따라 최소 3단계에서 6단계로 설정하여
                    사용합니다.
                  </ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="사용 가이드" />

              <Card
                variant="outlined"
                className="bg-krds-success-5 border-krds-success-20"
              >
                <List className="text-krds-gray-70">
                  <ListItem>
                    <strong>KRDS 정부 사이트:</strong> <Code>xs:</Code>를
                    사용하여 360px 이상의 모바일 기기를 지원합니다.
                  </ListItem>
                  <ListItem>
                    <strong>일반 웹사이트:</strong> <Code>sm:</Code>부터
                    사용하여 Tailwind 표준을 따릅니다.
                  </ListItem>
                  <ListItem>
                    <strong>공통 브레이크포인트:</strong> <Code>md:</Code>,{' '}
                    <Code>lg:</Code>, <Code>xl:</Code>는 KRDS와 Tailwind가
                    동일하므로 어느 프로젝트에서나 사용 가능합니다.
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>

          {/* 사용 방법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용 방법"
              description="Breakpoints를 사용하여 반응형 레이아웃을 만드는 방법입니다."
            />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="기본 사용"
                description="Tailwind CSS의 브레이크포인트 접두사를 사용하여 반응형 스타일을 적용합니다"
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 모바일 우선 접근 방식
<div className="text-sm md:text-base lg:text-lg">
  모바일: 14px, 태블릿: 16px, 데스크톱: 18px
</div>

// 그리드 레이아웃
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 모바일: 1열, 태블릿: 2열, 데스크톱: 3열 */}
</div>

// 조건부 표시/숨김
<div className="hidden md:block">
  태블릿 이상에서만 표시
</div>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="반응형 그리드 예시"
                description="화면 크기에 따라 열의 개수가 변경되는 그리드 레이아웃입니다"
              />

              <ComponentPreview>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                    1
                  </div>
                  <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                    2
                  </div>
                  <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                    3
                  </div>
                </div>
              </ComponentPreview>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 모바일: 1열, 태블릿: 2열, 데스크톱: 3열 */}
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="KRDS xs 브레이크포인트 사용"
                description="정부 사이트에서 360px 이상의 작은 모바일 기기를 지원할 때 사용합니다"
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 360px 이상에서 스타일 적용
<div className="xs:px-4 md:px-6 lg:px-8">
  360px 이상: 16px, 768px 이상: 24px, 1024px 이상: 32px 패딩
</div>

// 작은 모바일 기기 대응
<div className="text-xs xs:text-sm md:text-base">
  작은 모바일에서도 읽기 쉬운 크기
</div>`}
              </Code>
            </Subsection>
          </Section>

          {/* Grid */}
          <Section level="h2">
            <Heading
              level="h2"
              id="grid"
              title="Grid"
              description="CSS Grid 기반의 유연한 레이아웃 컴포넌트입니다."
            />

            <Card variant="filled">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Grid:</strong> CSS Grid의 모든 기능을 props로 제어할
                  수 있는 유연한 컴포넌트입니다.
                </ListItem>
                <ListItem>
                  <strong>SimpleGrid:</strong> 고정 열 개수 또는 auto-fit 반응형
                  그리드를 간편하게 구현합니다.
                </ListItem>
              </List>
            </Card>

            <Subsection level="h3">
              <Heading level="h3" title="SimpleGrid - 기본 사용" />

              <ComponentPreview>
                <SimpleGrid columns={3} gap="md">
                  <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                    1
                  </div>
                  <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                    2
                  </div>
                  <div className="p-4 bg-krds-primary-surface rounded-lg text-center">
                    3
                  </div>
                </SimpleGrid>
              </ComponentPreview>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { SimpleGrid } from '@hanui/react';

// 고정 열 개수
<SimpleGrid columns={3} gap="md">
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</SimpleGrid>

// 자동 반응형 (minChildWidth)
<SimpleGrid minChildWidth="200px" gap="lg">
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</SimpleGrid>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="SimpleGrid - 자동 반응형"
                description="minChildWidth를 사용하면 화면 크기에 따라 자동으로 열 개수가 조절됩니다."
              />

              <ComponentPreview>
                <SimpleGrid minChildWidth="150px" gap="md">
                  <div className="p-4 bg-krds-success-surface rounded-lg text-center">
                    A
                  </div>
                  <div className="p-4 bg-krds-success-surface rounded-lg text-center">
                    B
                  </div>
                  <div className="p-4 bg-krds-success-surface rounded-lg text-center">
                    C
                  </div>
                  <div className="p-4 bg-krds-success-surface rounded-lg text-center">
                    D
                  </div>
                </SimpleGrid>
              </ComponentPreview>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// auto-fit으로 자동 열 조절
<SimpleGrid minChildWidth="150px" gap="md">
  <Card>A</Card>
  <Card>B</Card>
  <Card>C</Card>
  <Card>D</Card>
</SimpleGrid>

// 내부적으로 다음과 같이 변환됩니다:
// grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Grid - 고급 사용"
                description="templateColumns, templateRows 등 CSS Grid의 모든 기능을 사용할 수 있습니다."
              />

              <ComponentPreview>
                <Grid templateColumns="1fr 2fr 1fr" gap="4" className="w-full">
                  <GridItem className="p-4 bg-krds-warning-surface rounded-lg text-center">
                    1fr
                  </GridItem>
                  <GridItem className="p-4 bg-krds-warning-surface rounded-lg text-center">
                    2fr
                  </GridItem>
                  <GridItem className="p-4 bg-krds-warning-surface rounded-lg text-center">
                    1fr
                  </GridItem>
                </Grid>
              </ComponentPreview>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { Grid, GridItem } from '@hanui/react';

// 커스텀 열 비율
<Grid templateColumns="1fr 2fr 1fr" gap="4">
  <GridItem>1fr</GridItem>
  <GridItem>2fr</GridItem>
  <GridItem>1fr</GridItem>
</Grid>

// GridItem으로 span 조절
<Grid templateColumns="repeat(3, 1fr)" gap="4">
  <GridItem colSpan={2}>2열 차지</GridItem>
  <GridItem>1열</GridItem>
</Grid>`}
              </Code>
            </Subsection>
          </Section>

          {/* 모범 사례 */}
          <Section level="h2">
            <Heading level="h2" id="best-practices" title="Best Practices" />

            <List>
              <ListItem>
                <strong>Container 사용:</strong> 페이지 레벨에서 Container로
                max-width를 설정하세요.
              </ListItem>
              <ListItem>
                <strong>모바일 우선:</strong> 기본 스타일을 모바일용으로
                작성하고 브레이크포인트로 확장하세요.
              </ListItem>
              <ListItem>
                <strong>SimpleGrid 우선:</strong> 단순한 그리드는 SimpleGrid로,
                복잡한 레이아웃만 Grid를 사용하세요.
              </ListItem>
              <ListItem>
                <strong>일관성 유지:</strong> 프로젝트 전체에서 동일한 Container
                maxWidth와 브레이크포인트를 사용하세요.
              </ListItem>
              <ListItem>
                <strong>접근성 고려:</strong> 모든 화면 크기에서 콘텐츠가 접근
                가능하고 사용 가능한지 확인하세요.
              </ListItem>
            </List>
          </Section>

          {/* 참고 자료 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="reference"
              title="참고 자료"
              description="KRDS Breakpoints 관련 문서입니다."
            />

            <Link
              href="https://www.krds.go.kr/html/site/style/style_05.html"
              external
              className="block p-4 bg-krds-white border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
            >
              <strong className="font-semibold mb-1">
                KRDS 레이아웃 가이드
              </strong>
              <Body size="sm" className="text-krds-gray-70">
                간격, 그리드, 브레이크포인트 기준
              </Body>
            </Link>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* API 레퍼런스 */}
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            {/* Container API */}
            <Subsection level="h3">
              <Heading level="h3" title="Container Props" />

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
                    <TableCell className="font-mono">maxWidth</TableCell>
                    <TableCell className="font-mono text-xs">
                      {`'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | false`}
                    </TableCell>
                    <TableCell className="font-mono">{`'xl'`}</TableCell>
                    <TableCell>최대 너비 설정</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">disablePadding</TableCell>
                    <TableCell className="font-mono text-xs">boolean</TableCell>
                    <TableCell className="font-mono">false</TableCell>
                    <TableCell>수평 패딩 제거</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">as</TableCell>
                    <TableCell className="font-mono text-xs">
                      {`'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer'`}
                    </TableCell>
                    <TableCell className="font-mono">{`'div'`}</TableCell>
                    <TableCell>렌더링할 HTML 요소</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Container CSS 변수" />

              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>변수</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      --krds-container-xs
                    </TableCell>
                    <TableCell>480px</TableCell>
                    <TableCell>xs 최대 너비</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      --krds-container-sm
                    </TableCell>
                    <TableCell>640px</TableCell>
                    <TableCell>sm 최대 너비</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      --krds-container-md
                    </TableCell>
                    <TableCell>768px</TableCell>
                    <TableCell>md 최대 너비</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      --krds-container-lg
                    </TableCell>
                    <TableCell>1024px</TableCell>
                    <TableCell>lg 최대 너비</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      --krds-container-xl
                    </TableCell>
                    <TableCell>1280px</TableCell>
                    <TableCell>xl 최대 너비 (기본값)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      --krds-container-2xl
                    </TableCell>
                    <TableCell>1440px</TableCell>
                    <TableCell>2xl 최대 너비 (KRDS 권장)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      --krds-container-padding-mobile
                    </TableCell>
                    <TableCell>1rem (16px)</TableCell>
                    <TableCell>모바일 수평 패딩</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      --krds-container-padding-tablet
                    </TableCell>
                    <TableCell>1.5rem (24px)</TableCell>
                    <TableCell>태블릿 수평 패딩 (sm:)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      --krds-container-padding-desktop
                    </TableCell>
                    <TableCell>2rem (32px)</TableCell>
                    <TableCell>데스크톱 수평 패딩 (lg:)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* Breakpoints API */}
            <Subsection level="h3">
              <Heading level="h3" title="Breakpoint Prefixes" />

              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prefix</TableHead>
                    <TableHead>Min Width</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">xs:</TableCell>
                    <TableCell>360px</TableCell>
                    <TableCell>KRDS</TableCell>
                    <TableCell>작은 모바일 기기 (정부 사이트)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">sm:</TableCell>
                    <TableCell>640px</TableCell>
                    <TableCell>Tailwind</TableCell>
                    <TableCell>모바일 가로/작은 태블릿</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">md:</TableCell>
                    <TableCell>768px</TableCell>
                    <TableCell>KRDS/Tailwind</TableCell>
                    <TableCell>태블릿</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">lg:</TableCell>
                    <TableCell>1024px</TableCell>
                    <TableCell>KRDS/Tailwind</TableCell>
                    <TableCell>데스크톱</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">xl:</TableCell>
                    <TableCell>1280px</TableCell>
                    <TableCell>KRDS/Tailwind</TableCell>
                    <TableCell>큰 데스크톱</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">2xl:</TableCell>
                    <TableCell>1440px</TableCell>
                    <TableCell>KRDS</TableCell>
                    <TableCell>매우 큰 화면 (KRDS 최대 너비)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Common Patterns" />

              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pattern</TableHead>
                    <TableHead>Example</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      display:value md:value
                    </TableCell>
                    <TableCell className="font-mono">hidden md:block</TableCell>
                    <TableCell>
                      모바일에서 숨기고 태블릿 이상에서 표시
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      grid-cols-n md:grid-cols-m
                    </TableCell>
                    <TableCell className="font-mono">
                      grid-cols-1 md:grid-cols-2
                    </TableCell>
                    <TableCell>반응형 그리드 열 개수 조정</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      text-size md:text-size
                    </TableCell>
                    <TableCell className="font-mono">
                      text-sm md:text-base
                    </TableCell>
                    <TableCell>화면 크기에 따른 폰트 크기 조정</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      p-size md:p-size
                    </TableCell>
                    <TableCell className="font-mono">p-4 md:p-6</TableCell>
                    <TableCell>반응형 패딩 조정</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      flex-direction md:flex-direction
                    </TableCell>
                    <TableCell className="font-mono">
                      flex-col md:flex-row
                    </TableCell>
                    <TableCell>모바일에서 세로, 데스크톱에서 가로</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Configuration (tailwind.config.ts)" />

              <Code
                variant="block"
                language="typescript"
                showLineNumbers={false}
              >
                {`// HANUI의 브레이크포인트 설정
module.exports = {
  theme: {
    screens: {
      xs: '360px',    // KRDS small
      sm: '640px',    // Tailwind default
      md: '768px',    // KRDS medium / Tailwind default
      lg: '1024px',   // KRDS large / Tailwind default
      xl: '1280px',   // KRDS xlarge / Tailwind default
      '2xl': '1440px' // KRDS xxlarge (modified from Tailwind 1536px)
    }
  }
}`}
              </Code>
            </Subsection>

            {/* Grid API */}
            <Subsection level="h3">
              <Heading level="h3" title="SimpleGrid Props" />

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
                    <TableCell className="font-mono">columns</TableCell>
                    <TableCell className="font-mono text-xs">1-12</TableCell>
                    <TableCell className="font-mono">1</TableCell>
                    <TableCell>그리드 열 개수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">minChildWidth</TableCell>
                    <TableCell className="font-mono text-xs">string</TableCell>
                    <TableCell className="font-mono">-</TableCell>
                    <TableCell>
                      최소 자식 너비 (설정 시 auto-fit 적용)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">gap</TableCell>
                    <TableCell className="font-mono text-xs">
                      {`'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'`}
                    </TableCell>
                    <TableCell className="font-mono">{`'md'`}</TableCell>
                    <TableCell>아이템 간 간격</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Grid Props" />

              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">templateColumns</TableCell>
                    <TableCell className="font-mono text-xs">string</TableCell>
                    <TableCell>grid-template-columns 값</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">templateRows</TableCell>
                    <TableCell className="font-mono text-xs">string</TableCell>
                    <TableCell>grid-template-rows 값</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">gap</TableCell>
                    <TableCell className="font-mono text-xs">
                      string | number
                    </TableCell>
                    <TableCell>아이템 간 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">autoFlow</TableCell>
                    <TableCell className="font-mono text-xs">
                      {`'row' | 'column' | 'dense'`}
                    </TableCell>
                    <TableCell>grid-auto-flow 값</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="GridItem Props" />

              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">colSpan</TableCell>
                    <TableCell className="font-mono text-xs">
                      number | {`'auto'`}
                    </TableCell>
                    <TableCell>차지할 열 개수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rowSpan</TableCell>
                    <TableCell className="font-mono text-xs">
                      number | {`'auto'`}
                    </TableCell>
                    <TableCell>차지할 행 개수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">colStart</TableCell>
                    <TableCell className="font-mono text-xs">
                      number | {`'auto'`}
                    </TableCell>
                    <TableCell>시작 열 위치</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">area</TableCell>
                    <TableCell className="font-mono text-xs">string</TableCell>
                    <TableCell>grid-area 값</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      {/* 페이지 네비게이션 */}
      <PageNavigation
        prev={{ title: 'Border Radius', href: '/docs/border-radius' }}
      />
    </>
  );
}
