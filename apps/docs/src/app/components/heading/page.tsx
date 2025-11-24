'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Heading as HeadingComponent,
  Body,
  Stack,
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
  Card,
} from '@hanui/react';

export default function HeadingPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Heading"
        description="KRDS 타이포그래피 시스템의 페이지 및 섹션 제목 컴포넌트입니다."
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
            <ComponentPreview>
              <Stack gap="md">
                <HeadingComponent level="h1">h1 - 페이지 제목</HeadingComponent>
                <HeadingComponent level="h2">h2 - 주요 섹션</HeadingComponent>
                <HeadingComponent level="h3">h3 - 하위 섹션</HeadingComponent>
                <HeadingComponent level="h4">h4 - 세부 항목</HeadingComponent>
                <HeadingComponent level="h5">h5 - 작은 제목</HeadingComponent>
              </Stack>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Heading level="h1">h1 - 페이지 제목</Heading>
<Heading level="h2">h2 - 주요 섹션</Heading>
<Heading level="h3">h3 - 하위 섹션</Heading>
<Heading level="h4">h4 - 세부 항목</Heading>
<Heading level="h5">h5 - 작은 제목</Heading>`}
            </Code>
          </Section>

          {/* 설치 */}
          <Installation componentName="heading" />

          {/* 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Heading } from '@hanui/react'

<Heading level="h1">페이지 제목</Heading>
<Heading level="h2">주요 섹션</Heading>
<Heading level="h3">세부 제목</Heading>`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* 레벨별 크기 */}
            <Subsection level="h3">
              <Heading level="h3" title="레벨별 크기" />
              <Body className="mb-4">
                h1부터 h5까지 5단계의 제목 레벨을 제공합니다. h1-h3는 PC와
                모바일에서 크기가 다르게 적용되며, h4-h5는 고정 크기를
                사용합니다.
              </Body>
              <ComponentPreview>
                <Stack gap="lg">
                  <Stack gap="sm">
                    <HeadingComponent level="h1">
                      h1 - Extra Large
                    </HeadingComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      40px (PC) / 28px (Mobile)
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <HeadingComponent level="h2">h2 - Large</HeadingComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      32px (PC) / 24px (Mobile)
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <HeadingComponent level="h3">h3 - Medium</HeadingComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      24px (PC) / 22px (Mobile)
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <HeadingComponent level="h4">h4 - Small</HeadingComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      19px
                    </Body>
                  </Stack>

                  <Stack gap="sm">
                    <HeadingComponent level="h5">
                      h5 - Extra Small
                    </HeadingComponent>
                    <Body size="sm" className="text-krds-gray-70">
                      17px
                    </Body>
                  </Stack>
                </Stack>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Heading level="h1">h1 - Extra Large</Heading>
<Heading level="h2">h2 - Large</Heading>
<Heading level="h3">h3 - Medium</Heading>
<Heading level="h4">h4 - Small</Heading>
<Heading level="h5">h5 - Extra Small</Heading>`}
              </Code>
            </Subsection>

            {/* 페이지 구조 */}
            <Subsection level="h3">
              <Heading level="h3" title="페이지 구조" />
              <Body className="mb-4">
                계층적으로 제목을 사용하여 명확한 페이지 구조를 만듭니다.
                시맨틱한 HTML 태그를 사용하여 스크린 리더 사용자도 콘텐츠 구조를
                쉽게 파악할 수 있습니다.
              </Body>
              <ComponentPreview>
                <Stack gap="md">
                  <HeadingComponent level="h1">페이지 제목</HeadingComponent>
                  <HeadingComponent level="h2">주요 섹션</HeadingComponent>
                  <HeadingComponent level="h3">하위 섹션</HeadingComponent>
                  <HeadingComponent level="h4">세부 항목</HeadingComponent>
                </Stack>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Heading level="h1">페이지 제목</Heading>
<Heading level="h2">주요 섹션</Heading>
<Heading level="h3">하위 섹션</Heading>
<Heading level="h4">세부 항목</Heading>`}
              </Code>
            </Subsection>

            {/* 자동 ID 생성 */}
            <Subsection level="h3">
              <Heading level="h3" title="자동 ID 생성" />
              <Body className="mb-4">
                children 텍스트에서 자동으로 URL-friendly ID를 생성하여
                TOC(Table of Contents) 링크를 지원합니다. 커스텀 ID를 지정할
                수도 있습니다.
              </Body>
              <ComponentPreview>
                <Stack gap="md">
                  <HeadingComponent level="h2">API 레퍼런스</HeadingComponent>
                  <Body size="sm" className="text-krds-gray-70">
                    자동 생성 ID: &quot;api-레퍼런스&quot;
                  </Body>
                </Stack>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 자동 ID 생성
<Heading level="h2">API 레퍼런스</Heading>
// 생성된 ID: "api-레퍼런스"

// 커스텀 ID 지정
<Heading level="h2" id="custom-id">API 레퍼런스</Heading>`}
              </Code>
            </Subsection>

            {/* 커스텀 스타일 */}
            <Subsection level="h3">
              <Heading level="h3" title="커스텀 스타일" />
              <Body className="mb-4">
                className prop으로 추가 스타일을 적용할 수 있습니다.
              </Body>
              <ComponentPreview>
                <HeadingComponent level="h2" className="text-krds-primary-base">
                  브랜드 컬러 제목
                </HeadingComponent>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Heading level="h2" className="text-krds-primary-base">
  브랜드 컬러 제목
</Heading>`}
              </Code>
            </Subsection>
          </Section>

          {/* 가이드라인 */}
          <Section level="h2">
            <Heading level="h2" id="guidelines" title="가이드라인" />

            <Subsection level="h3">
              <Heading level="h3" title="사용 권장 사항" />
              <Card variant="info">
                <List variant="check" spacing="tight">
                  <ListItem>페이지의 메인 제목 (h1은 페이지당 하나만)</ListItem>
                  <ListItem>주요 섹션 구분 (h2)</ListItem>
                  <ListItem>하위 섹션의 제목 (h3-h5)</ListItem>
                  <ListItem>명확한 콘텐츠 계층 구조가 필요한 곳</ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="주의사항" />
              <Card variant="warning">
                <List variant="dash" spacing="tight">
                  <ListItem>
                    <Body size="sm" weight="bold" as="span">
                      레벨 순차성:
                    </Body>
                    <Body size="sm" as="span">
                      {' '}
                      레벨을 건너뛰지 말고 순차적으로 사용하세요 (h2 다음 h4는
                      지양)
                    </Body>
                  </ListItem>
                  <ListItem>
                    <Body size="sm" weight="bold" as="span">
                      단일 h1:
                    </Body>
                    <Body size="sm" as="span">
                      {' '}
                      페이지당 h1은 하나만 사용하여 주제를 명확히 하세요
                    </Body>
                  </ListItem>
                  <ListItem>
                    <Body size="sm" weight="bold" as="span">
                      구조적 의미:
                    </Body>
                    <Body size="sm" as="span">
                      {' '}
                      스타일 목적이 아닌 구조적 의미로 사용하세요
                    </Body>
                  </ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="대안 컴포넌트" />
              <Body className="mb-4">
                다음 상황에서는 Heading 대신 다른 타이포그래피 컴포넌트를
                사용하세요:
              </Body>
              <List spacing="tight">
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    배너나 히어로 섹션:
                  </Body>
                  <Body size="sm" as="span">
                    {' '}
                    Display 컴포넌트 사용
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    본문 텍스트:
                  </Body>
                  <Body size="sm" as="span">
                    {' '}
                    Body 컴포넌트 사용
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    폼 라벨:
                  </Body>
                  <Body size="sm" as="span">
                    {' '}
                    Label 컴포넌트 사용
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    네비게이션 메뉴:
                  </Body>
                  <Body size="sm" as="span">
                    {' '}
                    NavText 컴포넌트 사용
                  </Body>
                </ListItem>
              </List>
            </Subsection>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading level="h2" id="accessibility" title="접근성" />
            <Body className="mb-4">
              Heading은 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다.
            </Body>
            <Card variant="info">
              <List variant="check" spacing="tight">
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    시맨틱 HTML:
                  </Body>
                  <Body size="sm" as="span">
                    {' '}
                    h1-h5 태그를 사용하여 스크린 리더를 지원합니다
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    명확한 계층:
                  </Body>
                  <Body size="sm" as="span">
                    {' '}
                    명확한 계층 구조로 콘텐츠 탐색이 용이합니다
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    단일 h1:
                  </Body>
                  <Body size="sm" as="span">
                    {' '}
                    페이지당 h1은 하나만 사용하여 주제를 명확히 합니다
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    순차적 레벨:
                  </Body>
                  <Body size="sm" as="span">
                    {' '}
                    순차적 레벨 사용으로 문서 구조 이해가 개선됩니다
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    자동 ID:
                  </Body>
                  <Body size="sm" as="span">
                    {' '}
                    자동 ID 생성으로 TOC 링크를 지원합니다
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    명도 대비:
                  </Body>
                  <Body size="sm" as="span">
                    {' '}
                    4.5:1 이상의 명도 대비로 가독성을 보장합니다
                  </Body>
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Heading Props" />
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
                    <TableCell className="font-mono">
                      <Code>level</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;h1&apos; | &apos;h2&apos; | &apos;h3&apos; |
                        &apos;h4&apos; | &apos;h5&apos;
                      </Code>
                    </TableCell>
                    <TableCell className="font-mono">
                      <Code>&apos;h2&apos;</Code>
                    </TableCell>
                    <TableCell>제목 레벨 (시맨틱 태그)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>id</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell className="font-mono">auto-generated</TableCell>
                    <TableCell>
                      제목 ID (children에서 자동 생성, 커스텀 지정 가능)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>제목 내용</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="레벨별 스타일" />
              <Table small>
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
                    <TableCell className="font-mono">
                      <Code>h1</Code>
                    </TableCell>
                    <TableCell>40px</TableCell>
                    <TableCell>28px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>h2</Code>
                    </TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>h3</Code>
                    </TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>22px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>h4</Code>
                    </TableCell>
                    <TableCell>19px</TableCell>
                    <TableCell>19px</TableCell>
                    <TableCell>700 (Bold)</TableCell>
                    <TableCell>150%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
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

            <Subsection level="h3">
              <Heading level="h3" title="KRDS 준수사항" />
              <Card variant="info">
                <List variant="check" spacing="tight">
                  <ListItem>모든 Heading은 Bold (700) 폰트 굵기 사용</ListItem>
                  <ListItem>150% 줄 간격으로 가독성 확보</ListItem>
                  <ListItem>
                    반응형 크기 (h1-h3는 PC/모바일 최적화, h4-h5는 고정 크기)
                  </ListItem>
                  <ListItem>Pretendard GOV 폰트 적용</ListItem>
                  <ListItem>
                    명도 대비 4.5:1 이상 (WCAG 2.1 / KWCAG 2.2 Level AA)
                  </ListItem>
                  <ListItem>시맨틱 HTML 태그 사용 (h1-h5)</ListItem>
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
