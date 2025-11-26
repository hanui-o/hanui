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
  Section as SectionComponent,
  List,
  ListItem,
  Code,
  Body,
  Card,
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

export default function SectionPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Section"
        description="KRDS 수직 간격을 준수하는 의미론적 섹션 컴포넌트"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* 1. 개요 - 기본 예제 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <SectionComponent padding="content-area" background="gray">
                <h2 className="text-xl font-semibold mb-2">섹션 제목</h2>
                <p className="text-krds-gray-70">
                  Section 컴포넌트는 KRDS 기준에 따라 일관된 패딩을 제공합니다.
                </p>
              </SectionComponent>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Section padding="content-area" background="gray">
  <h2>섹션 제목</h2>
  <p>섹션 내용</p>
</Section>`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="section" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Section } from '@hanui/react'

<Section padding="page-section">
  <h2>섹션 제목</h2>
  <p>섹션 내용</p>
</Section>`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* Padding 예제 */}
            <Subsection level="h3">
              <Heading level="h3" title="Padding" />
              <Body className="mb-3">
                용도에 맞는 의미론적 패딩 프리셋을 제공합니다:
              </Body>
              <ComponentPreview className="max-w-full">
                <div className="flex flex-col gap-6 w-full">
                  {/* page-section */}
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      page-section (메인 페이지 섹션)
                    </div>
                    <Card variant="outlined" className="p-0">
                      <SectionComponent
                        padding="page-section"
                        background="white"
                      >
                        <Body size="sm">
                          16px/40px (모바일) / 24px/64px (PC)
                        </Body>
                      </SectionComponent>
                    </Card>
                  </div>

                  {/* content-area */}
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      content-area (일반 콘텐츠 영역)
                    </div>
                    <Card variant="outlined" className="p-0">
                      <SectionComponent
                        padding="content-area"
                        background="white"
                      >
                        <Body size="sm">
                          16px/32px (모바일) / 24px/48px (PC)
                        </Body>
                      </SectionComponent>
                    </Card>
                  </div>

                  {/* card-medium */}
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      card-medium (카드 컴포넌트)
                    </div>
                    <Card variant="outlined" className="p-0">
                      <SectionComponent
                        padding="card-medium"
                        background="white"
                      >
                        <Body size="sm">24px (모바일) / 32px (PC)</Body>
                      </SectionComponent>
                    </Card>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 메인 페이지 섹션
<Section padding="page-section">
  <h2>주요 기능</h2>
</Section>

// 일반 콘텐츠 영역
<Section padding="content-area">
  <h3>소개</h3>
</Section>

// 카드용
<Section padding="card-medium">
  <h4>카드 제목</h4>
</Section>`}
              </Code>
            </Subsection>

            {/* Background 예제 */}
            <Subsection level="h3">
              <Heading level="h3" title="Background" />
              <Body className="mb-3">
                배경색을 지정하여 섹션을 시각적으로 구분할 수 있습니다:
              </Body>
              <ComponentPreview>
                <div className="flex flex-col gap-3 w-full">
                  <SectionComponent padding="card-medium" background="white">
                    <p className="text-center font-semibold">White</p>
                  </SectionComponent>
                  <SectionComponent padding="card-medium" background="gray">
                    <p className="text-center font-semibold">Gray</p>
                  </SectionComponent>
                  <SectionComponent padding="card-medium" background="primary">
                    <p className="text-center font-semibold text-white">
                      Primary
                    </p>
                  </SectionComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Section background="white">...</Section>
<Section background="gray">...</Section>
<Section background="primary">...</Section>`}
              </Code>
            </Subsection>

            {/* 시맨틱 HTML 예제 */}
            <Subsection level="h3">
              <Heading level="h3" title="시맨틱 HTML" />
              <Body className="mb-3">
                <Code>as</Code> prop으로 적절한 HTML 태그를 지정합니다:
              </Body>
              <Code variant="block" language="tsx">
                {`// 헤더 섹션
<Section as="header" padding="header">
  <h1>사이트 제목</h1>
</Section>

// 메인 콘텐츠
<Section as="main" padding="page-section">
  <h2>메인 콘텐츠</h2>
</Section>

// 푸터
<Section as="footer" padding="footer">
  <p>저작권 정보</p>
</Section>`}
              </Code>
            </Subsection>

            {/* 여러 섹션 조합 예제 */}
            <Subsection level="h3">
              <Heading level="h3" title="여러 섹션 조합" />
              <Body className="mb-3">
                배경색을 번갈아 사용하여 페이지를 구성할 수 있습니다:
              </Body>
              <ComponentPreview>
                <div className="w-full space-y-0 border border-krds-gray-20 rounded-lg overflow-hidden">
                  <SectionComponent padding="content-area" background="white">
                    <h3 className="font-bold mb-1">첫 번째 섹션</h3>
                    <p className="text-sm text-krds-gray-70">White 배경</p>
                  </SectionComponent>
                  <SectionComponent padding="content-area" background="gray">
                    <h3 className="font-bold mb-1">두 번째 섹션</h3>
                    <p className="text-sm text-krds-gray-70">Gray 배경</p>
                  </SectionComponent>
                  <SectionComponent padding="content-area" background="white">
                    <h3 className="font-bold mb-1">세 번째 섹션</h3>
                    <p className="text-sm text-krds-gray-70">White 배경</p>
                  </SectionComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Section padding="content-area" background="white">
  <h2>소개</h2>
</Section>

<Section padding="content-area" background="gray">
  <h2>기능</h2>
</Section>

<Section padding="content-area" background="white">
  <h2>연락처</h2>
</Section>`}
              </Code>
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="시맨틱 HTML을 사용하여 접근성을 향상시킵니다."
            />
            <List variant="check">
              <ListItem>
                <strong>시맨틱 HTML 요소:</strong> <Code>as</Code> prop으로
                section, header, footer, main 등 적절한 HTML 태그로 렌더링하여
                스크린 리더가 페이지 구조를 정확히 파악할 수 있습니다.
              </ListItem>
              <ListItem>
                <strong>일관된 패딩:</strong> KRDS 패딩 프리셋을 사용하여 일관된
                간격을 유지하고 예측 가능한 레이아웃을 제공합니다.
              </ListItem>
              <ListItem>
                <strong>명확한 구역 분리:</strong> 배경색을 번갈아 사용하여
                시각적으로 섹션 간 구분을 명확히 합니다.
              </ListItem>
              <ListItem>
                각 섹션에 적절한 제목 요소를 포함하여 스크린 리더 사용자의
                탐색을 돕습니다.
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="Props" />
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
                      <Code>padding</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">SectionPadding</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'page-section'</Code>
                    </TableCell>
                    <TableCell>패딩 프리셋</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>background</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'white' | 'gray' | 'primary' | 'transparent'
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'transparent'</Code>
                    </TableCell>
                    <TableCell>배경색</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>as</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'section' | 'div' | 'header' | 'main' | ...
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'section'</Code>
                    </TableCell>
                    <TableCell>렌더링할 HTML 요소</TableCell>
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
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Padding Presets" />
              <Body className="mb-3">의미론적 패딩 프리셋 옵션:</Body>
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>값</TableHead>
                    <TableHead>패딩</TableHead>
                    <TableHead>용도</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>page-section</Code>
                    </TableCell>
                    <TableCell className="text-xs">
                      16px/40px (모바일) / 24px/64px (PC)
                    </TableCell>
                    <TableCell>메인 페이지 섹션</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>content-area</Code>
                    </TableCell>
                    <TableCell className="text-xs">
                      16px/32px (모바일) / 24px/48px (PC)
                    </TableCell>
                    <TableCell>일반 콘텐츠 영역</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>card-large</Code>
                    </TableCell>
                    <TableCell className="text-xs">
                      24px (모바일) / 40px (PC)
                    </TableCell>
                    <TableCell>큰 카드</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>card-medium</Code>
                    </TableCell>
                    <TableCell className="text-xs">
                      24px (모바일) / 32px (PC)
                    </TableCell>
                    <TableCell>중간 카드</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>card-small</Code>
                    </TableCell>
                    <TableCell className="text-xs">
                      20px (모바일) / 24px (PC)
                    </TableCell>
                    <TableCell>작은 카드</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Pagination', href: '/components/pagination' }}
        next={{
          title: 'Section Heading System',
          href: '/components/section-heading-system',
        }}
      />
    </>
  );
}
