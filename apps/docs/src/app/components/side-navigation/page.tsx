'use client';

// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
  Installation,
} from '@/components/content';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
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
  SideNavigation,
} from '@hanui/react';

export default function SideNavigationPage() {
  const exampleSections = [
    {
      label: '2Depth-title',
      active: true,
      children: [
        {
          label: '3Depth-menu',
          children: [
            { label: '4Depth', href: '#', active: true },
            { label: '4Depth', href: '#' },
            { label: '4Depth', href: '#' },
          ],
        },
        { label: '3Depth-link', href: '#' },
        { label: '3Depth-link', href: '#' },
      ],
    },
    {
      label: '2Depth-title',
      children: [
        {
          label: '3Depth-menu',
          href: '#',
          children: [
            { label: '4Depth', href: '#' },
            { label: '4Depth', href: '#' },
            { label: '4Depth', href: '#' },
          ],
        },
        { label: '3Depth-link', href: '#' },
        { label: '3Depth-link', href: '#' },
      ],
    },
    {
      label: '2Depth-title',
      children: [
        { label: '3Depth-link', href: '#' },
        { label: '3Depth-link', href: '#' },
        { label: '3Depth-link', href: '#' },
      ],
    },
  ];

  return (
    <>
      <Heading
        level="h1"
        title="Side Navigation"
        description="KRDS 표준을 따르는 사이드 네비게이션 컴포넌트입니다. 최대 4단계 depth를 지원하며, 토글 기능과 접근성 속성을 자동으로 관리합니다."
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
            <ComponentPreview className="bg-krds-gray-5">
              <div className="w-[320px]">
                <SideNavigation
                  title="1Depth-title"
                  sections={exampleSections}
                />
              </div>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { SideNavigation } from '@/components/hanui';

<SideNavigation
  title="1Depth-title"
  sections={[
    {
      label: '2Depth-title',
      active: true,
      children: [
        { label: '3Depth-link', href: '#', active: true },
        { label: '3Depth-link', href: '#' },
      ],
    },
  ]}
/>`}
            </Code>
          </Section>

          {/* 설치 */}
          <Installation componentName="side-navigation" />

          {/* 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="title과 sections props를 제공하여 사이드 네비게이션을 생성합니다."
            />

            <Code variant="block" language="tsx">
              {`import { SideNavigation } from '@/components/hanui';

<SideNavigation
  title="주요 메뉴"
  sections={[
    {
      label: '건강보험',
      children: [
        { label: '보험료 조회', href: '/insurance/fee' },
        { label: '자격 득실 확인', href: '/insurance/status' },
      ],
    },
    {
      label: '장기요양',
      children: [
        { label: '등급 판정', href: '/care/grade' },
        { label: '장기요양 급여', href: '/care/benefit' },
      ],
    },
  ]}
/>`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="4단계 Depth"
                description="3Depth 링크에 children을 추가하여 4Depth 서브메뉴를 만들 수 있습니다."
              />
              <Code variant="block" language="tsx">
                {`<SideNavigation
  title="1Depth-title"
  sections={[
    {
      label: '건강보험',
      children: [
        {
          label: '보험료',
          children: [
            { label: '보험료 조회', href: '/fee/check' },
            { label: '보험료 납부', href: '/fee/pay' },
            { label: '보험료 환급', href: '/fee/refund' },
          ],
        },
        { label: '자격 득실', href: '/insurance/status' },
      ],
    },
  ]}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Active 상태"
                description="active: true를 설정하여 현재 페이지를 표시합니다. 부모 섹션도 자동으로 확장됩니다."
              />
              <Code variant="block" language="tsx">
                {`<SideNavigation
  title="1Depth-title"
  sections={[
    {
      label: '건강보험',
      active: true,
      children: [
        {
          label: '보험료 조회',
          href: '/insurance/fee',
          active: true,
        },
        { label: '자격 득실', href: '/insurance/status' },
      ],
    },
  ]}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="커스텀 스타일"
                description="className prop으로 추가 스타일을 적용할 수 있습니다."
              />
              <Code variant="block" language="tsx">
                {`<SideNavigation
  title="1Depth-title"
  sections={sections}
  className="shadow-lg rounded-lg"
/>`}
              </Code>
            </Subsection>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 기준을 준수합니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="시맨틱 HTML" />
              <List>
                <ListItem>
                  <Code>nav</Code>, <Code>ul</Code>, <Code>li</Code>,{' '}
                  <Code>button</Code>, <Code>a</Code> 등 시맨틱 요소 사용
                </ListItem>
                <ListItem>
                  네비게이션 제목은 <Code>aria-labelledby</Code>로 연결
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ARIA 속성" />
              <List>
                <ListItem>
                  <Code>role=&quot;menubar&quot;</Code>,{' '}
                  <Code>role=&quot;menuitem&quot;</Code>: 메뉴 역할 명시
                </ListItem>
                <ListItem>
                  <Code>aria-expanded</Code>: 토글 상태 전달
                </ListItem>
                <ListItem>
                  <Code>aria-controls</Code>: 제어 대상 연결
                </ListItem>
                <ListItem>
                  <Code>aria-current=&quot;page&quot;</Code>: 현재 페이지 표시
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="키보드 지원" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>키</TableHead>
                    <TableHead>동작</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>Tab</Code>
                    </TableCell>
                    <TableCell>메뉴 항목 간 포커스 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Enter</Code> / <Code>Space</Code>
                    </TableCell>
                    <TableCell>토글 버튼 활성화 또는 링크 이동</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* Props */}
          <Section level="h2">
            <Heading level="h2" id="props" title="SideNavigation Props" />

            <Table small>
              <TableHeader>
                <TableRow>
                  <TableHead>Prop</TableHead>
                  <TableHead>타입</TableHead>
                  <TableHead>기본값</TableHead>
                  <TableHead>설명</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>title</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>네비게이션 제목 (1Depth)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>sections</Code>
                  </TableCell>
                  <TableCell>
                    <Code>SideNavSection[]</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>섹션 배열 (2Depth)</TableCell>
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
          </Section>

          {/* Types */}
          <Section level="h2">
            <Heading
              level="h2"
              id="types"
              title="TypeScript 타입"
              description="Side Navigation의 TypeScript 인터페이스입니다."
            />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="SideNavSection"
                description="2Depth 섹션의 타입 정의입니다."
              />
              <Code variant="block" language="tsx">
                {`interface SideNavSection {
  label: string;           // 섹션 라벨
  href?: string;           // 링크 URL (선택)
  active?: boolean;        // 활성화 상태
  children?: SideNavLink[];// 하위 링크 (3Depth)
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="SideNavLink"
                description="3/4 Depth 링크의 타입 정의입니다."
              />
              <Code variant="block" language="tsx">
                {`interface SideNavLink {
  label: string;           // 링크 라벨
  href?: string;           // 링크 URL
  active?: boolean;        // 활성화 상태
  children?: SideNavLink[];// 하위 링크 (4Depth)
}`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Select', href: '/components/select' }}
        next={{ title: 'SimpleGrid', href: '/components/simple-grid' }}
      />
    </>
  );
}
