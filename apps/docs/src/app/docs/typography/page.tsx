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
  Stack,
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
} from '@hanui/react';

export default function TypographyPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Typography"
        description="KRDS 기반 타이포그래피 시스템입니다. Pretendard GOV 폰트를 사용하며 접근성을 고려한 크기와 간격을 제공합니다."
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
                <strong>핵심:</strong> <Code>text-krds-</Code> 접두사로 KRDS
                타이포그래피를 사용합니다. Display, Title, Body 3가지 카테고리로
                구성됩니다.
              </Body>
            </Card>

            <Body className="mt-4">
              모든 타이포그래피 CSS 변수는{' '}
              <Code>@hanui/react/variables.css</Code>에 정의되어 있고,{' '}
              <Code>tailwind.preset.ts</Code>에서 Tailwind 클래스로 매핑됩니다.
            </Body>
          </Section>

          {/* Display 스케일 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="display"
              title="Display (특대 제목)"
              description="히어로 섹션, 대형 제목에 사용합니다. Line-height 130%."
            />

            <Stack gap="sm">
              <Card gap="sm">
                <Code>text-krds-display-xl</Code>
                <p className="text-krds-display-xl">48px / 700 — 히어로 제목</p>
              </Card>
              <Card gap="sm">
                <Code>text-krds-display-lg</Code>
                <p className="text-krds-display-lg">42px / 700 — 대형 섹션</p>
              </Card>
              <Card gap="sm">
                <Code>text-krds-display-md</Code>
                <p className="text-krds-display-md">36px / 700 — 중형 섹션</p>
              </Card>
              <Card gap="sm">
                <Code>text-krds-display-sm</Code>
                <p className="text-krds-display-sm">32px / 700 — 소형 섹션</p>
              </Card>
            </Stack>
          </Section>

          {/* Title 스케일 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="title"
              title="Title (제목)"
              description="페이지 제목, 섹션 제목에 사용합니다. Line-height 140%."
            />

            <Stack gap="sm">
              <Card gap="sm">
                <Code>text-krds-title-xl</Code>
                <p className="text-krds-title-xl">32px / 700 — 페이지 제목</p>
              </Card>
              <Card gap="sm">
                <Code>text-krds-title-lg</Code>
                <p className="text-krds-title-lg">28px / 700 — 섹션 제목</p>
              </Card>
              <Card gap="sm">
                <Code>text-krds-title-md</Code>
                <p className="text-krds-title-md">24px / 700 — 하위 섹션</p>
              </Card>
              <Card gap="sm">
                <Code>text-krds-title-sm</Code>
                <p className="text-krds-title-sm">20px / 700 — 카드 제목</p>
              </Card>
              <Card gap="sm">
                <Code>text-krds-title-xs</Code>
                <p className="text-krds-title-xs">18px / 700 — 소형 제목</p>
              </Card>
            </Stack>
          </Section>

          {/* Body 스케일 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="body"
              title="Body (본문)"
              description="본문 텍스트, 설명에 사용합니다. Line-height 150%."
            />

            <Stack gap="sm">
              <Card gap="sm">
                <Code>text-lg</Code>
                <p className="text-lg">19px — 큰 본문 (강조)</p>
              </Card>
              <Card gap="sm">
                <Code>text-base</Code>
                <p className="text-base">17px — 기본 본문 (기본값)</p>
              </Card>
              <Card gap="sm">
                <Code>text-sm</Code>
                <p className="text-sm">15px — 작은 본문 (보조)</p>
              </Card>
              <Card gap="sm">
                <Code>text-xs</Code>
                <p className="text-xs">13px — 캡션, 레이블</p>
              </Card>
            </Stack>
          </Section>

          {/* 사용 방법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용 방법" />

            <Code variant="block" language="tsx" showLineNumbers={false}>
              {`// Display - 히어로, 대형 제목
<h1 className="text-krds-display-xl">메인 히어로 제목</h1>
<h2 className="text-krds-display-md">섹션 대제목</h2>

// Title - 페이지, 섹션 제목
<h1 className="text-krds-title-xl">페이지 제목</h1>
<h2 className="text-krds-title-lg">섹션 제목</h2>
<h3 className="text-krds-title-md">하위 섹션</h3>

// Body - 본문 텍스트
<p className="text-base">기본 본문 텍스트 (17px)</p>
<p className="text-sm text-krds-gray-70">보조 정보 (15px)</p>
<span className="text-xs">캡션 (13px)</span>`}
            </Code>
          </Section>

          {/* 폰트 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="font-family"
              title="폰트"
              description="Pretendard GOV를 기본 폰트로 사용합니다."
            />

            <Code variant="block" language="css" showLineNumbers={false}>
              {`/* tailwind.preset.ts에서 정의 */
fontFamily: {
  sans: [
    'Pretendard GOV',
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'sans-serif',
  ],
}`}
            </Code>

            <Card variant="info" className="mt-4">
              <Body>
                <strong>Pretendard GOV</strong>는 정부 웹사이트용 최적화
                폰트입니다. 없으면 Pretendard, 시스템 폰트 순으로 대체됩니다.
              </Body>
            </Card>
          </Section>

          {/* 모범 사례 */}
          <Section level="h2">
            <Heading level="h2" id="best-practices" title="Best Practices" />

            <List variant="check">
              <ListItem>
                <strong>최소 폰트 크기</strong>는 13px 이상 (KRDS body-xs)
              </ListItem>
              <ListItem>
                <strong>기본 본문</strong>은 17px (KRDS body-md) 사용
              </ListItem>
              <ListItem>
                <strong>Line-height</strong>: Display 130%, Title 140%, Body
                150%
              </ListItem>
              <ListItem>
                <strong>색상 대비</strong>는 WCAG 기준 4.5:1 이상 준수
              </ListItem>
              <ListItem>
                <strong>Heading 계층</strong>을 논리적으로 사용 (h1 → h2 → h3)
              </ListItem>
            </List>
          </Section>

          {/* 참고 자료 */}
          <Section level="h2">
            <Heading level="h2" id="reference" title="참고 자료" />

            <Link
              href="https://www.krds.go.kr/html/site/style/style_03.html"
              external
              className="block p-4 bg-krds-gray-surface border border-krds-gray-border rounded-lg hover:border-krds-primary-base transition-colors"
            >
              <h4 className="font-semibold mb-1">KRDS 타이포그래피 가이드</h4>
              <p className="text-sm text-krds-gray-70">
                폰트, 크기, line-height 기준
              </p>
            </Link>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* API 레퍼런스 */}
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            {/* Display 클래스 */}
            <Subsection level="h3">
              <Heading level="h3" title="Display Classes" />

              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tailwind Class</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Line-height</TableHead>
                    <TableHead>Weight</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">text-krds-display-xl</Code>
                    </TableCell>
                    <TableCell>48px</TableCell>
                    <TableCell>130%</TableCell>
                    <TableCell>700</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">text-krds-display-lg</Code>
                    </TableCell>
                    <TableCell>42px</TableCell>
                    <TableCell>130%</TableCell>
                    <TableCell>700</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">text-krds-display-md</Code>
                    </TableCell>
                    <TableCell>36px</TableCell>
                    <TableCell>130%</TableCell>
                    <TableCell>700</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">text-krds-display-sm</Code>
                    </TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>130%</TableCell>
                    <TableCell>700</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* Title 클래스 */}
            <Subsection level="h3">
              <Heading level="h3" title="Title Classes" />

              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tailwind Class</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Line-height</TableHead>
                    <TableHead>Weight</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">text-krds-title-xl</Code>
                    </TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>140%</TableCell>
                    <TableCell>700</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">text-krds-title-lg</Code>
                    </TableCell>
                    <TableCell>28px</TableCell>
                    <TableCell>140%</TableCell>
                    <TableCell>700</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">text-krds-title-md</Code>
                    </TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>140%</TableCell>
                    <TableCell>700</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">text-krds-title-sm</Code>
                    </TableCell>
                    <TableCell>20px</TableCell>
                    <TableCell>140%</TableCell>
                    <TableCell>700</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">text-krds-title-xs</Code>
                    </TableCell>
                    <TableCell>18px</TableCell>
                    <TableCell>140%</TableCell>
                    <TableCell>700</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* Body 클래스 */}
            <Subsection level="h3">
              <Heading level="h3" title="Body Classes" />

              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tailwind Class</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Line-height</TableHead>
                    <TableHead>용도</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">text-lg</Code>
                    </TableCell>
                    <TableCell>19px</TableCell>
                    <TableCell>150%</TableCell>
                    <TableCell>큰 본문 (강조)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">text-base</Code>
                    </TableCell>
                    <TableCell>17px</TableCell>
                    <TableCell>150%</TableCell>
                    <TableCell>기본 본문</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">text-sm</Code>
                    </TableCell>
                    <TableCell>15px</TableCell>
                    <TableCell>150%</TableCell>
                    <TableCell>작은 본문</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code className="text-xs">text-xs</Code>
                    </TableCell>
                    <TableCell>13px</TableCell>
                    <TableCell>150%</TableCell>
                    <TableCell>캡션, 레이블</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* CSS 변수 */}
            <Subsection level="h3">
              <Heading level="h3" title="CSS 변수" />
              <Body className="mb-4">
                모든 CSS 변수는 <Code>@hanui/react/variables.css</Code>에
                정의되어 있습니다.
              </Body>

              <Code variant="block" language="css" showLineNumbers={false}>
                {`/* variables.css에서 정의됨 */

/* Display */
--krds-display-xl: 48px;
--krds-display-lg: 42px;
--krds-display-md: 36px;
--krds-display-sm: 32px;

/* Title */
--krds-title-xl: 32px;
--krds-title-lg: 28px;
--krds-title-md: 24px;
--krds-title-sm: 20px;
--krds-title-xs: 18px;

/* Body */
--krds-body-lg: 19px;
--krds-body-md: 17px;
--krds-body-sm: 15px;
--krds-body-xs: 13px;

/* Line Heights */
--krds-leading-display: 130%;
--krds-leading-title: 140%;
--krds-leading-body: 150%;`}
              </Code>
            </Subsection>

            {/* Tailwind Preset 매핑 */}
            <Subsection level="h3">
              <Heading level="h3" title="Tailwind Preset 매핑" />
              <Body className="mb-4">
                <Code>tailwind.preset.ts</Code>에서 CSS 변수를 Tailwind 클래스로
                매핑합니다.
              </Body>

              <Code
                variant="block"
                language="typescript"
                showLineNumbers={false}
              >
                {`// tailwind.preset.ts
fontSize: {
  // Body
  'krds-body-xs': ['13px', { lineHeight: '150%' }],
  'krds-body-sm': ['15px', { lineHeight: '150%' }],
  'krds-body-md': ['17px', { lineHeight: '150%' }],
  'krds-body-lg': ['19px', { lineHeight: '150%' }],

  // Title
  'krds-title-xs': ['18px', { lineHeight: '140%', fontWeight: '700' }],
  'krds-title-sm': ['20px', { lineHeight: '140%', fontWeight: '700' }],
  'krds-title-md': ['24px', { lineHeight: '140%', fontWeight: '700' }],
  'krds-title-lg': ['28px', { lineHeight: '140%', fontWeight: '700' }],
  'krds-title-xl': ['32px', { lineHeight: '140%', fontWeight: '700' }],

  // Display
  'krds-display-sm': ['32px', { lineHeight: '130%', fontWeight: '700' }],
  'krds-display-md': ['36px', { lineHeight: '130%', fontWeight: '700' }],
  'krds-display-lg': ['42px', { lineHeight: '130%', fontWeight: '700' }],
  'krds-display-xl': ['48px', { lineHeight: '130%', fontWeight: '700' }],
}`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      {/* 페이지 네비게이션 */}
      <PageNavigation
        prev={{ title: 'Colors', href: '/docs/colors' }}
        next={{ title: 'Spacing', href: '/docs/spacing' }}
      />
    </>
  );
}
