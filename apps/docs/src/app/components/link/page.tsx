'use client';

// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Link as LinkComponent,
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

// Example icon
const ExternalIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    <path
      d="M12.5 5.5L12.5 2.5L9.5 2.5M12.3536 2.64645L7.5 7.5M11.5 9.5V12.5C11.5 13.0523 11.0523 13.5 10.5 13.5H3.5C2.94772 13.5 2.5 13.0523 2.5 12.5V5.5C2.5 4.94772 2.94772 4.5 3.5 4.5H6.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function LinkPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Link"
        description="하이퍼링크를 표시하는 기본 링크 컴포넌트입니다. KRDS 색상 시스템을 사용하며 3가지 variant와 외부 링크 처리를 지원합니다."
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
              <div className="flex flex-col gap-4">
                <LinkComponent href="/docs">기본 링크</LinkComponent>
                <LinkComponent variant="primary" href="/primary">
                  Primary 파란색 링크
                </LinkComponent>
                <LinkComponent variant="plain" href="/plain">
                  밑줄 없음
                </LinkComponent>
                <LinkComponent href="https://github.com" external>
                  외부 링크
                </LinkComponent>
              </div>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { Link } from '@hanui/react'

<Link href="/docs">기본 링크</Link>
<Link variant="primary" href="/primary">Primary 파란색 링크</Link>
<Link variant="plain" href="/plain">밑줄 없음</Link>
<Link href="https://github.com" external>외부 링크</Link>`}
            </Code>
          </Section>

          <Installation componentName="link" />

          {/* Usage */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Link } from '@hanui/react'

<Link href="/components">컴포넌트 보기</Link>`}
            </Code>
          </Section>

          {/* Examples */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Variant" />
              <Body className="mb-4">링크는 세 가지 variant를 지원합니다:</Body>
              <List className="mb-4">
                <ListItem>
                  <Code>default</Code>
                </ListItem>
                <ListItem>
                  <Code>primary</Code>
                </ListItem>
                <ListItem>
                  <Code>plain</Code>
                </ListItem>
              </List>
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <LinkComponent variant="default" href="/home">
                    Default 링크
                  </LinkComponent>
                  <LinkComponent variant="primary" href="/primary">
                    Primary 링크
                  </LinkComponent>
                  <LinkComponent variant="plain" href="/plain">
                    Plain 링크
                  </LinkComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 기본 링크 - 검은색 + 밑줄, hover: Primary
<Link variant="default" href="/home">Default 링크</Link>

// Primary 링크 - Primary 파란색 + 밑줄, hover: 더 진한 Primary
<Link variant="primary" href="/primary">Primary 링크</Link>

// 밑줄 없음 - 검은색, hover: Primary
<Link variant="plain" href="/plain">Plain 링크</Link>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Size" />
              <Body className="mb-4">링크는 세 가지 크기를 지원합니다:</Body>
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <LinkComponent size="small" href="/small">
                    Small 링크 (15px)
                  </LinkComponent>
                  <LinkComponent size="medium" href="/medium">
                    Medium 링크 (17px - 기본)
                  </LinkComponent>
                  <LinkComponent size="large" href="/large">
                    Large 링크 (19px)
                  </LinkComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Link size="small" href="/small">Small 링크</Link>
<Link size="medium" href="/medium">Medium 링크 (기본)</Link>
<Link size="large" href="/large">Large 링크</Link>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="외부 링크" />
              <Body className="mb-4">
                <Code>external</Code> prop을 사용하면 자동으로{' '}
                <Code>target=&quot;_blank&quot;</Code>,{' '}
                <Code>rel=&quot;noopener noreferrer&quot;</Code>가 추가되고 새창
                열기 아이콘이 자동으로 표시됩니다.
              </Body>
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <LinkComponent href="https://github.com" external>
                    GitHub 바로가기
                  </LinkComponent>
                  <LinkComponent href="https://docs.example.com" external>
                    외부 문서
                  </LinkComponent>
                  <LinkComponent
                    variant="primary"
                    href="https://example.com"
                    external
                  >
                    Primary 스타일 외부 링크
                  </LinkComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 외부 링크 - 아이콘 자동 추가
<Link href="https://github.com" external>
  GitHub 바로가기
</Link>

<Link href="https://docs.example.com" external>
  외부 문서
</Link>

// Variant와 함께 사용
<Link variant="primary" href="https://example.com" external>
  Primary 스타일 외부 링크
</Link>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="비활성화 상태" />
              <ComponentPreview>
                <LinkComponent
                  href="/disabled"
                  className="pointer-events-none opacity-50"
                >
                  비활성화된 링크
                </LinkComponent>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Link
  href="/disabled"
  className="pointer-events-none opacity-50"
>
  비활성화된 링크
</Link>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="커스텀 스타일" />
              <Body className="mb-4">
                <Code>className</Code>으로 추가 스타일을 적용할 수 있습니다.
              </Body>
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <LinkComponent href="/custom" className="text-lg font-bold">
                    큰 볼드 링크
                  </LinkComponent>
                  <LinkComponent href="/no-underline" className="no-underline">
                    밑줄 없는 링크
                  </LinkComponent>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Link href="/custom" className="text-lg font-bold">
  큰 볼드 링크
</Link>

<Link href="/no-underline" className="no-underline">
  밑줄 없는 링크
</Link>`}
              </Code>
            </Subsection>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Link 컴포넌트는 WCAG 2.1 AA 기준을 준수하며 완전한 접근성을 제공합니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="키보드 지원" />
              <List variant="check" spacing="default">
                <ListItem>
                  <Code>Tab</Code> - 링크로 포커스 이동
                </ListItem>
                <ListItem>
                  <Code>Enter</Code> - 링크 활성화 (페이지 이동)
                </ListItem>
                <ListItem>
                  <Code>Shift + Tab</Code> - 이전 요소로 포커스 이동
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="스크린 리더 지원" />
              <List variant="check" spacing="default">
                <ListItem>
                  시맨틱 <Code>&lt;a&gt;</Code> 요소 사용으로 스크린 리더가
                  자동으로 링크임을 인식
                </ListItem>
                <ListItem>
                  외부 링크는 <Code>target=&quot;_blank&quot;</Code>로 새 탭에서
                  열림을 전달
                </ListItem>
                <ListItem>
                  <Code>rel=&quot;noopener noreferrer&quot;</Code>로 보안 강화
                </ListItem>
                <ListItem>
                  포커스 링(<Code>focus-visible:ring-2</Code>)으로 포커스 상태를
                  명확히 표시
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="링크 vs 버튼" />
              <Card variant="warning" className="mb-4">
                <Body weight="bold" className="mb-2">
                  언제 링크를 사용하고, 언제 버튼을 사용해야 할까요?
                </Body>
                <List spacing="default">
                  <ListItem>
                    <strong>Link 사용:</strong> 페이지 이동, 외부 리소스 참조
                  </ListItem>
                  <ListItem>
                    <strong>Button 사용:</strong> 폼 제출, 모달 열기, JavaScript
                    함수 실행
                  </ListItem>
                </List>
              </Card>
              <Code variant="block" language="tsx">
                {`// ✅ 올바른 사용
<Link href="/profile">프로필 보기</Link>
<Button onClick={handleSubmit}>제출</Button>

// ❌ 잘못된 사용
<Button onClick={() => router.push('/profile')}>프로필 보기</Button>
<Link href="#" onClick={handleSubmit}>제출</Link>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* Props */}
          <Section level="h2">
            <Heading level="h2" id="props" title="Props" />

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
                  <TableCell>
                    <Code>href</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>링크 URL (필수)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>variant</Code>
                  </TableCell>
                  <TableCell>
                    <Code>
                      &quot;default&quot; | &quot;primary&quot; |
                      &quot;plain&quot;
                    </Code>
                  </TableCell>
                  <TableCell>
                    <Code>&quot;default&quot;</Code>
                  </TableCell>
                  <TableCell>링크 스타일</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>size</Code>
                  </TableCell>
                  <TableCell>
                    <Code>
                      &quot;small&quot; | &quot;medium&quot; | &quot;large&quot;
                    </Code>
                  </TableCell>
                  <TableCell>
                    <Code>&quot;medium&quot;</Code>
                  </TableCell>
                  <TableCell>링크 크기</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>external</Code>
                  </TableCell>
                  <TableCell>
                    <Code>boolean</Code>
                  </TableCell>
                  <TableCell>
                    <Code>false</Code>
                  </TableCell>
                  <TableCell>
                    외부 링크 여부 (true 시 새 탭 + 아이콘 자동 추가)
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
                  <TableCell>링크 내용 (필수)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* Variant Details */}
          <Section level="h2">
            <Heading level="h2" id="variant-details" title="Variant 상세" />

            <Table small>
              <TableHeader>
                <TableRow>
                  <TableHead>Variant</TableHead>
                  <TableHead>색상</TableHead>
                  <TableHead>밑줄</TableHead>
                  <TableHead>Hover</TableHead>
                  <TableHead>사용 사례</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>default</Code>
                  </TableCell>
                  <TableCell>검은색 (gray-90)</TableCell>
                  <TableCell>있음</TableCell>
                  <TableCell>Primary 파란색</TableCell>
                  <TableCell>일반적인 모든 링크 (기본값)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>primary</Code>
                  </TableCell>
                  <TableCell>Primary 파란색</TableCell>
                  <TableCell>있음</TableCell>
                  <TableCell>더 진한 Primary</TableCell>
                  <TableCell>강조되어야 하는 Primary 링크</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>plain</Code>
                  </TableCell>
                  <TableCell>검은색 (gray-90)</TableCell>
                  <TableCell>없음</TableCell>
                  <TableCell>Primary 파란색</TableCell>
                  <TableCell>네비게이션, 메뉴 등</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* Size Details */}
          <Section level="h2">
            <Heading level="h2" id="size-details" title="Size 상세" />

            <Table small>
              <TableHeader>
                <TableRow>
                  <TableHead>Size</TableHead>
                  <TableHead>Font Size</TableHead>
                  <TableHead>사용 사례</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>small</Code>
                  </TableCell>
                  <TableCell>15px</TableCell>
                  <TableCell>작은 텍스트 영역의 링크</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>medium</Code>
                  </TableCell>
                  <TableCell>17px</TableCell>
                  <TableCell>일반 본문 링크 (기본)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>large</Code>
                  </TableCell>
                  <TableCell>19px</TableCell>
                  <TableCell>강조되어야 하는 큰 링크</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* CSS Classes */}
          <Section level="h2">
            <Heading level="h2" id="css-classes" title="CSS 클래스" />

            <Code variant="block" language="css">
              {`/* KRDS 색상 변수 - Variant */
--krds-color-light-gray-90     /* Default/Plain 기본 색상 (검은색) */
--krds-color-light-primary-50  /* Primary 기본 색상, Default hover 색상 (파란색) */
--krds-color-light-primary-60  /* Primary hover 색상 (더 진한 파란색) */

/* Tailwind 클래스 - Variant */
/* default */
[color:var(--krds-color-light-gray-90)]       /* 기본 색상 (검은색) */
.underline                                     /* 밑줄 */
hover:[color:var(--krds-color-light-primary-50)] /* hover Primary */

/* primary */
[color:var(--krds-color-light-primary-50)]    /* 기본 색상 (파란색) */
.underline                                     /* 밑줄 */
hover:[color:var(--krds-color-light-primary-60)] /* hover 더 진한 Primary */

/* plain */
[color:var(--krds-color-light-gray-90)]       /* 기본 색상 (검은색) */
hover:[color:var(--krds-color-light-primary-50)] /* hover Primary */

/* Size */
.text-krds-body-sm             /* Small (15px) */
.text-krds-body-md             /* Medium (17px) */
.text-krds-body-lg             /* Large (19px) */

/* Accessibility */
.focus-visible:ring-2          /* 포커스 링 */
.focus-visible:ring-offset-2   /* 포커스 링 오프셋 */`}
            </Code>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Label', href: '/components/label' }}
        next={{ title: 'List', href: '/components/list' }}
      />
    </>
  );
}
