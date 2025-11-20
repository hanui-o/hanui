'use client';

import {
  Section,
  SectionHeading,
  Subsection,
  Code,
  Card,
  Stack,
  Link,
  PageNavigation,
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
} from '@/components/hanui';

export default function TypographyPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Typography"
        description="KRDS 기반 타이포그래피 시스템입니다. Pretendard GOV 폰트를 사용하며 접근성을 고려한 크기와 간격을 제공합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="installation"
              title="설치"
              description="타이포그래피는 HANUI의 기본 스타일에 포함되어 있습니다. 별도 설치가 필요 없습니다."
            />

            <Code variant="block" language="bash" showLineNumbers={false}>
              {`# HANUI 설치 시 자동으로 포함됩니다
npx create-next-app@latest my-app
npx @hanui/cli init`}
            </Code>
          </Section>

          {/* What is it */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Typography는 KRDS 디자인 시스템을 준수하는 타이포그래피 스타일을 제공합니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Pretendard GOV 폰트:</strong> 한국 정부 웹사이트를
                  위한 최적화된 폰트를 사용합니다.
                </ListItem>
                <ListItem>
                  <strong>접근성 준수:</strong> 최소 16px 크기와 150%
                  line-height로 가독성을 보장합니다.
                </ListItem>
                <ListItem>
                  <strong>일관된 스케일:</strong> Heading과 Body Text의 체계적인
                  크기 시스템을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>KRDS 색상:</strong> KRDS 디자인 시스템의 색상 팔레트와
                  통합됩니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Heading Scale */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="heading-scale"
              title="Heading Scale"
              description="제목을 위한 4가지 크기의 타이포그래피 스케일을 제공합니다."
            />

            <Stack gap="sm">
              <Card gap="sm">
                <Code>text-heading-xl</Code>
                <SectionHeading
                  level="h1"
                  title="40px / 700 - 페이지 제목 (h1)"
                />
              </Card>
              <Card gap="sm">
                <Code>text-heading-lg</Code>
                <SectionHeading
                  level="h2"
                  title="32px / 700 - 섹션 제목 (h2)"
                />
              </Card>
              <Card gap="sm">
                <Code>text-heading-md</Code>
                <SectionHeading
                  level="h3"
                  title="24px / 700 - 하위 섹션 제목 (h3)"
                />
              </Card>
              <Card gap="sm">
                <Code>text-heading-sm</Code>
                <SectionHeading
                  level="h4"
                  title="19px / 700 - 카드 제목 (h4)"
                />
              </Card>
            </Stack>
          </Section>

          {/* Body Text */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="body-text"
              title="Body Text"
              description="본문 텍스트를 위한 4가지 크기를 제공합니다."
            />

            <Stack gap="sm">
              <Card gap="sm">
                <Code>text-body-lg</Code>
                <p className="text-lg">
                  19px / 400 - 큰 본문 텍스트 (강조된 문단)
                </p>
              </Card>
              <Card gap="sm">
                <Code>text-body-md (기본값)</Code>
                <p className="text-base">
                  17px / 400 - 기본 본문 텍스트 (가장 많이 사용)
                </p>
              </Card>
              <Card gap="sm">
                <Code>text-body-sm</Code>
                <p className="text-sm">
                  15px / 400 - 작은 본문 텍스트 (보조 정보)
                </p>
              </Card>
              <Card gap="sm">
                <Code>text-body-xs</Code>
                <p className="text-xs">
                  13px / 400 - 매우 작은 텍스트 (캡션, 라벨)
                </p>
              </Card>
            </Stack>
          </Section>

          {/* Usage */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="usage"
              title="사용 방법"
              description="타이포그래피 클래스를 적용하는 방법입니다."
            />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="기본 사용"
                description="Tailwind CSS 클래스를 사용하여 타이포그래피를 적용합니다:"
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// Heading 사용
<h1 className="text-4xl font-bold">페이지 제목</h1>
<h2 className="text-3xl font-bold">섹션 제목</h2>

// Body Text 사용
<p className="text-base">기본 본문 텍스트</p>
<p className="text-sm text-krds-gray-70">보조 정보</p>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="실제 사용 예시"
                description="문서에서 타이포그래피를 활용하는 실제 예시입니다:"
              />

              <Card variant="outlined">
                <article className="space-y-4">
                  <h2 className="text-3xl font-bold">섹션 제목</h2>
                  <p className="text-base text-krds-gray-90 leading-relaxed">
                    이것은 기본 본문 텍스트입니다. KRDS 기준에 따라 17px 크기와
                    150% line-height를 사용하여 최적의 가독성을 제공합니다.
                  </p>
                  <p className="text-sm text-krds-gray-70">
                    보조 정보는 작은 텍스트로 표시합니다. (15px)
                  </p>
                </article>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<article className="space-y-4">
  <h2 className="text-3xl font-bold">섹션 제목</h2>
  <p className="text-base text-krds-gray-90 leading-relaxed">
    기본 본문 텍스트 (17px)
  </p>
  <p className="text-sm text-krds-gray-70">
    보조 정보 (15px)
  </p>
</article>`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="best-practices"
              title="Best Practices"
            />

            <List>
              <ListItem>
                <strong>최소 폰트 크기</strong>는 16px 이상을 사용하여 가독성을
                보장하세요.
              </ListItem>
              <ListItem>
                <strong>Line-height</strong>는 최소 150%를 유지하여 텍스트
                간격을 확보하세요.
              </ListItem>
              <ListItem>
                <strong>색상 대비</strong>는 WCAG 기준(4.5:1 이상)을 준수하세요.
              </ListItem>
              <ListItem>
                <strong>터치 타겟</strong> 크기는 최소 44x44px를 유지하세요.
              </ListItem>
              <ListItem>
                <strong>Heading 계층</strong>을 논리적으로 사용하여 문서 구조를
                명확하게 하세요.
              </ListItem>
            </List>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="accessibility"
              title="접근성"
              description="타이포그래피 접근성 가이드라인입니다."
            />

            <Card variant="outlined">
              <SectionHeading
                level="h3"
                title="접근성 고려사항"
                description="최소 텍스트 크기(16px), 충분한 대비(4.5:1), 터치 타겟 크기(44x44px)를 준수하세요."
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 최소 폰트 크기 16px
<p className="text-base">본문 텍스트</p>

// 충분한 색상 대비
<p className="text-krds-gray-90 bg-krds-white">높은 대비</p>

// 터치 타겟 크기
<Button size="md">최소 40px 높이</Button>`}
              </Code>
            </Card>
          </Section>

          {/* Reference */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="reference"
              title="참고 자료"
              description="KRDS 타이포그래피 관련 문서입니다."
            />

            <Link
              href="https://www.krds.go.kr/html/site/style/style_03.html"
              external
              className="block p-4 bg-krds-white border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
            >
              <h4 className="font-semibold mb-1">KRDS 타이포그래피 가이드</h4>
              <p className="text-sm text-krds-gray-70">
                폰트, 크기, line-height 기준
              </p>
            </Link>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* API Reference */}
          <Section level="h2">
            <SectionHeading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Heading Classes" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">text-4xl</TableCell>
                    <TableCell>40px</TableCell>
                    <TableCell>700</TableCell>
                    <TableCell>페이지 제목 (h1)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">text-3xl</TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>700</TableCell>
                    <TableCell>섹션 제목 (h2)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">text-2xl</TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>700</TableCell>
                    <TableCell>하위 섹션 제목 (h3)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">text-lg</TableCell>
                    <TableCell>19px</TableCell>
                    <TableCell>700</TableCell>
                    <TableCell>카드 제목 (h4)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Body Text Classes" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">text-lg</TableCell>
                    <TableCell>19px</TableCell>
                    <TableCell>400</TableCell>
                    <TableCell>큰 본문 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">text-base</TableCell>
                    <TableCell>17px</TableCell>
                    <TableCell>400</TableCell>
                    <TableCell>기본 본문 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">text-sm</TableCell>
                    <TableCell>15px</TableCell>
                    <TableCell>400</TableCell>
                    <TableCell>작은 본문 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">text-xs</TableCell>
                    <TableCell>13px</TableCell>
                    <TableCell>400</TableCell>
                    <TableCell>매우 작은 텍스트</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Font Weight Classes" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">font-bold</TableCell>
                    <TableCell>700</TableCell>
                    <TableCell>제목, 강조</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">font-semibold</TableCell>
                    <TableCell>600</TableCell>
                    <TableCell>부제목, 레이블</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">font-normal</TableCell>
                    <TableCell>400</TableCell>
                    <TableCell>본문 텍스트</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      {/* Page Navigation */}
      <PageNavigation
        prev={{ title: 'Tooltip', href: '/components/tooltip' }}
        next={{ title: 'Wrap', href: '/components/wrap' }}
      />
    </>
  );
}
