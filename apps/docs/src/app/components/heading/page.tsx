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
  Heading as HeadingComponent,
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

export default function HeadingPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Heading"
        description="시맨틱한 페이지 및 섹션 제목 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section>
            <SectionHeading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 Heading 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>
            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add heading
            </Code>
          </Section>

          {/* What is it */}
          <Section>
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Heading은 KRDS 타이포그래피 시스템의 제목 스타일로, 페이지와 섹션의 구조를 명확히 표현합니다. h1부터 h5까지의 시맨틱 HTML 태그를 사용하여 접근성을 보장합니다."
            />
            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>시맨틱 HTML:</strong> h1-h5 태그를 사용하여 스크린
                  리더를 지원합니다.
                </ListItem>
                <ListItem>
                  <strong>자동 ID 생성:</strong> children에서 자동으로 ID를
                  생성하여 TOC 링크를 지원합니다.
                </ListItem>
                <ListItem>
                  <strong>반응형 크기:</strong> h1-h3는 PC와 모바일에서 최적의
                  가독성을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>KRDS 준수:</strong> Bold(700) 폰트 굵기와 150% 줄
                  간격으로 가독성을 확보합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section>
            <SectionHeading level="h2" id="preview" title="미리보기" />
            <Card>
              <Stack gap="md">
                <HeadingComponent level="h1">h1 - 페이지 제목</HeadingComponent>
                <HeadingComponent level="h2">h2 - 주요 섹션</HeadingComponent>
                <HeadingComponent level="h3">h3 - 하위 섹션</HeadingComponent>
                <HeadingComponent level="h4">h4 - 세부 항목</HeadingComponent>
                <HeadingComponent level="h5">h5 - 작은 제목</HeadingComponent>
              </Stack>
            </Card>
            <Code variant="block" language="tsx">
              {`<Heading level="h1">h1 - 페이지 제목</Heading>
<Heading level="h2">h2 - 주요 섹션</Heading>
<Heading level="h3">h3 - 하위 섹션</Heading>
<Heading level="h4">h4 - 세부 항목</Heading>
<Heading level="h5">h5 - 작은 제목</Heading>`}
            </Code>
          </Section>

          {/* Usage */}
          <Section>
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            {/* Levels */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="levels"
                title="레벨 (Levels)"
                description="h1부터 h5까지 5단계의 제목 레벨을 제공합니다."
              />
              <Card>
                <Stack gap="lg">
                  <Stack gap="sm">
                    <HeadingComponent level="h1">
                      h1 - Extra Large
                    </HeadingComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      40px (PC) / 28px (Mobile) · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <HeadingComponent level="h2">h2 - Large</HeadingComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      32px (PC) / 24px (Mobile) · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <HeadingComponent level="h3">h3 - Medium</HeadingComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      24px (PC) / 22px (Mobile) · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <HeadingComponent level="h4">h4 - Small</HeadingComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      19px · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <HeadingComponent level="h5">
                      h5 - Extra Small
                    </HeadingComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      17px · 700 (Bold) · 150% 줄 간격
                    </Body>
                  </Stack>
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<Heading level="h1">페이지 제목</Heading>
<Heading level="h2">주요 섹션 제목</Heading>
<Heading level="h3">하위 섹션 제목</Heading>
<Heading level="h4">세부 항목 제목</Heading>
<Heading level="h5">작은 제목</Heading>`}
              </Code>
            </Subsection>

            {/* Page Structure */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="page-structure"
                title="페이지 구조"
                description="계층적으로 제목을 사용하여 명확한 페이지 구조를 만듭니다."
              />
              <Card>
                <Stack gap="md">
                  <HeadingComponent level="h1">페이지 제목</HeadingComponent>
                  <HeadingComponent level="h2">주요 섹션</HeadingComponent>
                  <HeadingComponent level="h3">하위 섹션</HeadingComponent>
                  <HeadingComponent level="h4">세부 항목</HeadingComponent>
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<Heading level="h1">페이지 제목</Heading>
<Heading level="h2">주요 섹션</Heading>
<Heading level="h3">하위 섹션</Heading>
<Heading level="h4">세부 항목</Heading>`}
              </Code>
            </Subsection>

            {/* Auto ID Generation */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="auto-id"
                title="자동 ID 생성"
                description="children에서 자동으로 URL-friendly ID를 생성합니다."
              />
              <Card>
                <Stack gap="md">
                  <HeadingComponent level="h2">API 레퍼런스</HeadingComponent>
                  <Body size="sm" className="text-krds-gray-70">
                    위 제목의 ID는 자동으로 &quot;api-레퍼런스&quot;로
                    생성됩니다.
                  </Body>
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<Heading level="h2">API 레퍼런스</Heading>
// 자동 생성된 ID: "api-레퍼런스"

// 커스텀 ID 지정도 가능
<Heading level="h2" id="custom-id">API 레퍼런스</Heading>`}
              </Code>
            </Subsection>

            {/* Custom Styling */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="custom-styling"
                title="커스텀 스타일"
                description="className prop으로 추가 스타일을 적용할 수 있습니다."
              />
              <Card>
                <HeadingComponent level="h2" className="text-krds-primary-base">
                  브랜드 컬러 제목
                </HeadingComponent>
              </Card>
              <Code variant="block" language="tsx">
                {`<Heading level="h2" className="text-krds-primary-base">
  브랜드 컬러 제목
</Heading>`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section>
            <SectionHeading level="h2" id="best-practices" title="모범 사례" />
            <Stack gap="md">
              <DoCard title="Heading을 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>페이지의 메인 제목 (h1)</ListItem>
                  <ListItem>주요 섹션 구분 (h2)</ListItem>
                  <ListItem>하위 섹션의 제목 (h3-h5)</ListItem>
                  <ListItem>명확한 콘텐츠 계층 구조가 필요한 곳</ListItem>
                </List>
              </DoCard>

              <Card variant="warning">
                <SectionHeading level="h3" id="caution" title="주의사항" />
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>페이지당 h1은 하나만 사용</ListItem>
                  <ListItem>
                    레벨을 건너뛰지 말고 순차적으로 사용 (h2 다음 h4는 지양)
                  </ListItem>
                  <ListItem>스타일 목적이 아닌 구조적 의미로 사용</ListItem>
                </List>
              </Card>

              <DontCard title="Heading을 사용하지 말아야 하는 경우">
                <List variant="cross">
                  <ListItem>배너나 히어로 섹션 (Display 사용 권장)</ListItem>
                  <ListItem>본문 텍스트 (Body 사용 권장)</ListItem>
                  <ListItem>폼 라벨 (Label 사용 권장)</ListItem>
                  <ListItem>네비게이션 메뉴 (NavText 사용 권장)</ListItem>
                </List>
              </DontCard>
            </Stack>
          </Section>

          {/* Accessibility */}
          <Section>
            <SectionHeading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Heading은 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>시맨틱 HTML:</strong> h1-h5 태그를 사용하여 스크린
                  리더를 지원합니다.
                </ListItem>
                <ListItem>
                  <strong>명확한 계층:</strong> 명확한 계층 구조로 콘텐츠 탐색이
                  용이합니다.
                </ListItem>
                <ListItem>
                  <strong>단일 h1:</strong> 페이지당 h1은 하나만 사용하여 주제를
                  명확히 합니다.
                </ListItem>
                <ListItem>
                  <strong>순차적 레벨:</strong> 순차적 레벨 사용으로 문서 구조
                  이해가 개선됩니다.
                </ListItem>
                <ListItem>
                  <strong>자동 ID:</strong> 자동 ID 생성으로 TOC 링크를
                  지원합니다.
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
              title="API 레퍼런스"
            />

            {/* Props */}
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
                      <Code>level</Code>
                    </TableCell>
                    <TableCell>
                      <Code>
                        &quot;h1&quot; | &quot;h2&quot; | &quot;h3&quot; |
                        &quot;h4&quot; | &quot;h5&quot;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;h2&quot;</Code>
                    </TableCell>
                    <TableCell>제목 레벨 (시맨틱 태그)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>id</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>
                      <Code>auto-generated</Code>
                    </TableCell>
                    <TableCell>
                      제목 ID (children에서 자동 생성, 커스텀 지정 가능)
                    </TableCell>
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
                  <TableRow>
                    <TableCell>
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code>ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>제목 내용</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* Level Variants */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="level-variants"
                title="Level Variants"
              />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Level</TableHead>
                    <TableHead>PC</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Font Weight</TableHead>
                    <TableHead>Line Height</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>h1</Code>
                    </TableCell>
                    <TableCell>40px</TableCell>
                    <TableCell>28px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>h2</Code>
                    </TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>h3</Code>
                    </TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>22px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>h4</Code>
                    </TableCell>
                    <TableCell>19px</TableCell>
                    <TableCell>19px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>h5</Code>
                    </TableCell>
                    <TableCell>17px</TableCell>
                    <TableCell>17px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* KRDS Compliance */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="krds-compliance"
                title="KRDS 준수사항"
              />
              <Card variant="info">
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>모든 Heading은 Bold (700) 폰트 굵기 사용</ListItem>
                  <ListItem>150% 줄 간격으로 가독성 확보</ListItem>
                  <ListItem>
                    반응형 크기 (h1-h3는 PC/모바일 최적화, h4-h5는 고정 크기)
                  </ListItem>
                  <ListItem>Pretendard GOV 폰트 적용</ListItem>
                  <ListItem>
                    명도 대비 4.5:1 이상 (WCAG 2.1 / KWCAG 2.2 Level AA)
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Header', href: '/components/header' }}
        next={{ title: 'Identifier', href: '/components/identifier' }}
      />
    </>
  );
}
