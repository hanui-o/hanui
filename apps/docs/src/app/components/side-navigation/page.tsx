'use client';

// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
} from '@/components/content';

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
} from '@hanui/react';
import { SideNavigation } from '@hanui/react';

export default function SideNavigationPage() {
  const exampleSections = [
    {
      label: '건강보험',
      active: true,
      children: [
        {
          label: '보험료 조회',
          href: '#',
          children: [
            { label: '보험료 조회', href: '#', active: true },
            { label: '보험료 납부', href: '#' },
            { label: '보험료 환급', href: '#' },
          ],
        },
        { label: '자격 득실 확인', href: '#' },
        { label: '민원 신청', href: '#' },
      ],
    },
    {
      label: '장기요양',
      children: [
        {
          label: '등급 판정',
          href: '#',
          children: [
            { label: '등급 신청', href: '#' },
            { label: '등급 조회', href: '#' },
            { label: '등급 변경', href: '#' },
          ],
        },
        { label: '장기요양 급여', href: '#' },
        { label: '장기요양 기관', href: '#' },
      ],
    },
    {
      label: '건강검진',
      children: [
        { label: '검진 대상 조회', href: '#' },
        { label: '검진 기관 찾기', href: '#' },
        { label: '검진 결과 조회', href: '#' },
      ],
    },
  ];

  return (
    <>
      <Heading
        level="h1"
        title="Side Navigation"
        description="KRDS 표준을 따르는 사이드 네비게이션 컴포넌트입니다. 최대 4단계 depth를 지원하며, Props 기반 API와 Tailwind CSS로 구현되었습니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section>
            <Heading
              level="h2"
              id="installation"
              title="설치"
              description="Side Navigation 컴포넌트를 프로젝트에 추가합니다."
            />

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx hanui add side-navigation
            </Code>

            <Card variant="filled" className="mt-6">
              <Body className="mb-3">설치 시 다음 파일이 추가됩니다:</Body>
              <List className="text-krds-gray-90">
                <ListItem>
                  <Code>components/hanui/side-navigation.tsx</Code> - Side
                  Navigation 컴포넌트 (Tailwind CSS 기반)
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* What is it */}
          <Section>
            <Heading
              level="h2"
              id="what-is-it"
              title="Side Navigation이란?"
              description="다단계 콘텐츠 구조를 위한 사이드 네비게이션 컴포넌트입니다."
            />

            <Card variant="filled">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Props 기반 API:</strong> TypeScript 인터페이스로 타입
                  안전성 보장
                </ListItem>
                <ListItem>
                  <strong>4단계 Depth:</strong> 1Depth(Title) → 2Depth(Section)
                  → 3Depth(Link) → 4Depth(SubLink)
                </ListItem>
                <ListItem>
                  <strong>자동 상태 관리:</strong> 토글, 확장/축소, active 상태
                  자동 처리
                </ListItem>
                <ListItem>
                  <strong>Tailwind CSS:</strong> KRDS 변수를 활용한 유틸리티
                  기반 스타일링
                </ListItem>
                <ListItem>
                  <strong>Radix UI:</strong> 접근성이 보장된 Accordion 컴포넌트
                  기반
                </ListItem>
                <ListItem>
                  <strong>KRDS 디자인 토큰:</strong> Tailwind 변수를 통한 일관된
                  스타일 적용
                </ListItem>
              </List>
            </Card>
          </Section>

          <Section className="border border-krds-gray-10 p-6">
            <div className="w-[320px]">
              <SideNavigation title="주요 서비스" sections={exampleSections} />
            </div>
          </Section>

          {/* Usage */}
          <Section>
            <Heading
              level="h2"
              id="usage"
              title="사용 예제"
              description="Side Navigation 컴포넌트의 기본 사용법입니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="기본 사용" />
              <Body className="mb-4 text-krds-gray-70">
                <Code>title</Code>과 <Code>sections</Code> props를 제공하여
                사이드 네비게이션을 생성합니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { SideNavigation } from '@/components/hanui/side-navigation';

export default function Page() {
  return (
    <SideNavigation
      title="주요 서비스"
      sections={[
        {
          label: '건강보험',
          active: true,
          children: [
            { label: '보험료 조회', href: '/insurance/fee', active: true },
            { label: '자격 득실 확인', href: '/insurance/status' }
          ]
        },
        {
          label: '장기요양',
          children: [
            { label: '등급 판정', href: '/care/grade' },
            { label: '장기요양 급여', href: '/care/benefit' }
          ]
        }
      ]}
    />
  );
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="4단계 Depth 사용" />
              <Body className="mb-4 text-krds-gray-70">
                3Depth 링크에 <Code>children</Code>을 추가하여 4Depth 서브메뉴를
                만들 수 있습니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<SideNavigation
  title="주요 서비스"
  sections={[
    {
      label: '건강보험',
      children: [
        {
          label: '보험료',
          href: '#',
          children: [
            { label: '보험료 조회', href: '/fee/check' },
            { label: '보험료 납부', href: '/fee/pay' },
            { label: '보험료 환급', href: '/fee/refund' }
          ]
        },
        { label: '자격 득실', href: '/insurance/status' }
      ]
    }
  ]}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Active 상태 지정" />
              <Body className="mb-4 text-krds-gray-70">
                <Code>active: true</Code>를 설정하여 현재 페이지를 표시합니다.
                부모 섹션도 자동으로 확장됩니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<SideNavigation
  title="주요 서비스"
  sections={[
    {
      label: '건강보험',
      active: true,  // 부모 섹션 활성화
      children: [
        {
          label: '보험료 조회',
          href: '/insurance/fee',
          active: true  // 현재 페이지
        },
        { label: '자격 득실', href: '/insurance/status' }
      ]
    }
  ]}
/>`}
              </Code>
            </Subsection>
          </Section>

          {/* Structure */}
          <Section>
            <Heading
              level="h2"
              id="structure"
              title="데이터 구조"
              description="Side Navigation의 데이터 구조를 이해합니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="SideNavSection (2nd Depth)" />
              <Body className="mb-4 text-krds-gray-70">
                2단계 섹션은 토글 버튼으로 표시되며, children을 가질 수
                있습니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`interface SideNavSection {
  label: string;        // 섹션 라벨
  href?: string;        // 링크 URL (optional)
  active?: boolean;     // 활성화 상태
  children?: SideNavLink[];  // 3Depth 자식 링크
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="SideNavLink (3rd/4th Depth)" />
              <Body className="mb-4 text-krds-gray-70">
                3단계 및 4단계 링크는 실제 페이지 링크입니다. 3단계는 children을
                가져 4단계를 만들 수 있습니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`interface SideNavLink {
  label: string;        // 링크 라벨
  href: string;         // 링크 URL (required)
  active?: boolean;     // 활성화 상태
  children?: SideNavLink[];  // 4Depth 자식 링크 (optional)
}`}
              </Code>
            </Subsection>
          </Section>

          {/* Styling */}
          <Section>
            <Heading
              level="h2"
              id="styling"
              title="스타일 커스터마이징"
              description="Tailwind CSS를 활용한 스타일 수정 방법입니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="KRDS Tailwind 변수 활용" />
              <Body className="mb-4 text-krds-gray-70">
                컴포넌트는 KRDS Tailwind 변수를 사용하여 일관된 디자인을
                유지합니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 예시: 컴포넌트 내부의 Tailwind 클래스
<h2 className="px-3 pb-6 border-b border-krds-gray-50 text-2xl font-bold text-krds-gray-90">
  {title}
</h2>

<button className="py-3 px-3 border-b border-krds-gray-20 text-krds-gray-90 hover:bg-krds-gray-10">
  {section.label}
</button>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="커스텀 스타일 추가" />
              <Body className="mb-4 text-krds-gray-70">
                <Code>className</Code> prop을 사용하여 추가 스타일을 적용할 수
                있습니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<SideNavigation
  title="주요 서비스"
  sections={sections}
  className="shadow-lg rounded-lg" // 추가 Tailwind 클래스
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="애니메이션" />
              <Body className="mb-4 text-krds-gray-70">
                컴포넌트는 Radix UI의 data 속성을 사용하여 부드러운 애니메이션을
                제공합니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// Accordion 애니메이션 (Tailwind preset에 정의됨)
data-[state=open]:animate-slideDown
data-[state=closed]:animate-slideUp

// 토글 아이콘 회전
data-[state=open]:after:rotate-180`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section>
            <Heading
              level="h2"
              id="best-practices"
              title="모범 사례"
              description="Side Navigation을 효과적으로 사용하기 위한 가이드입니다."
            />

            <List variant="unordered">
              <ListItem>
                <strong>적절한 Depth:</strong> 3~4단계를 권장하며, 너무 깊은
                계층은 피하세요
              </ListItem>
              <ListItem>
                <strong>명확한 라벨:</strong> 각 링크는 명확하고 간결한 라벨을
                사용하세요
              </ListItem>
              <ListItem>
                <strong>Active 상태 유지:</strong> 현재 페이지에 active: true를
                설정하여 사용자 위치를 표시하세요
              </ListItem>
              <ListItem>
                <strong>일관된 그룹화:</strong> 관련된 링크는 같은 섹션으로
                그룹화하세요
              </ListItem>
              <ListItem>
                <strong>최대 너비 제한:</strong> 사이드바는 320px 내외로
                유지하는 것을 권장합니다
              </ListItem>
            </List>
          </Section>

          {/* Accessibility */}
          <Section>
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 기준을 준수합니다."
            />

            <List variant="unordered">
              <ListItem>
                <strong>Semantic HTML:</strong> nav, ul, li, button, a 등 시맨틱
                요소 사용
              </ListItem>
              <ListItem>
                <strong>ARIA 속성:</strong> role, aria-expanded, aria-controls,
                aria-current 자동 설정
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> Enter, Space 키로 토글 및
                링크 활성화
              </ListItem>
              <ListItem>
                <strong>포커스 관리:</strong> 모든 인터랙티브 요소에 명확한
                포커스 표시
              </ListItem>
              <ListItem>
                <strong>스크린 리더:</strong> 메뉴 구조를 명확히 전달하는 ARIA
                레이블
              </ListItem>
            </List>
          </Section>

          {/* KRDS Standards */}
          <Section>
            <Heading
              level="h2"
              id="krds-standards"
              title="KRDS 표준"
              description="Side Navigation이 준수하는 KRDS 표준입니다."
            />

            <Card variant="filled">
              <Body className="font-semibold mb-3">준수하는 KRDS 표준:</Body>
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>4단계 Depth:</strong> Title → Section → Link → SubLink
                  계층 구조
                </ListItem>
                <ListItem>
                  <strong>시맨틱 HTML:</strong> nav, ul, li, button, a 등 시맨틱
                  요소 사용
                </ListItem>
                <ListItem>
                  <strong>토글 인터랙션:</strong> 확장/축소 버튼 및 아이콘
                  애니메이션
                </ListItem>
                <ListItem>
                  <strong>Active 상태:</strong> 현재 페이지 표시 및 부모 섹션
                  자동 확장
                </ListItem>
                <ListItem>
                  <strong>CSS Variables:</strong> KRDS 디자인 토큰 활용
                  (--krds-spacing-*, --krds-color-*, --krds-font-*)
                </ListItem>
                <ListItem>
                  <strong>반응형:</strong> 고대비 모드 및 다크 모드 지원
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* Props */}
          <Section>
            <Heading
              level="h2"
              id="props"
              title="Props"
              description="SideNavigation 컴포넌트의 속성입니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="title" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>string</Code>
                </ListItem>
                <ListItem>
                  <strong>필수:</strong> Yes
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 네비게이션 제목 (1st Depth)
                </ListItem>
              </List>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<SideNavigation title="주요 서비스" sections={[...]} />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="sections" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>{`SideNavSection[]`}</Code>
                </ListItem>
                <ListItem>
                  <strong>필수:</strong> Yes
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 네비게이션 섹션 배열 (2nd Depth)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="className" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>string</Code>
                </ListItem>
                <ListItem>
                  <strong>필수:</strong> No
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 추가 CSS 클래스명
                </ListItem>
              </List>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<SideNavigation
  title="주요 서비스"
  sections={[...]}
  className="custom-nav"
/>`}
              </Code>
            </Subsection>
          </Section>

          {/* Types */}
          <Section>
            <Heading
              level="h2"
              id="types"
              title="TypeScript 타입"
              description="Side Navigation의 TypeScript 인터페이스입니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="SideNavSection" />
              <Body className="mb-4 text-krds-gray-70">
                2nd Depth 섹션의 타입 정의입니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`interface SideNavSection {
  /** Section label */
  label: string;

  /** Section URL (optional, for toggle buttons) */
  href?: string;

  /** Active state */
  active?: boolean;

  /** Child links or nested sections */
  children?: SideNavLink[];
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="SideNavLink" />
              <Body className="mb-4 text-krds-gray-70">
                3rd/4th Depth 링크의 타입 정의입니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`interface SideNavLink {
  /** Link label */
  label: string;

  /** Link URL */
  href: string;

  /** Active state */
  active?: boolean;

  /** Child links (3rd depth) */
  children?: SideNavLink[];
}`}
              </Code>
            </Subsection>
          </Section>

          {/* State Management */}
          <Section>
            <Heading
              level="h2"
              id="state-management"
              title="상태 관리"
              description="컴포넌트 내부의 상태 관리입니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="expandedSections" />
              <Body className="mb-4 text-krds-gray-70">
                확장된 2nd Depth 섹션의 인덱스를 Set으로 관리합니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`const [expandedSections, setExpandedSections] = useState<Set<number>>(
  new Set(
    sections
      .map((section, index) =>
        section.active || section.children?.some(child => child.active)
          ? index
          : -1
      )
      .filter(index => index >= 0)
  )
);`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="expandedSubItems" />
              <Body className="mb-4 text-krds-gray-70">
                확장된 3rd Depth 서브메뉴를 문자열 키로 관리합니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`const [expandedSubItems, setExpandedSubItems] = useState<Set<string>>(
  new Set()
);

// 키 형식: "sectionIndex-childIndex"
const childKey = \`\${sectionIndex}-\${childIndex}\`;`}
              </Code>
            </Subsection>
          </Section>

          {/* Tailwind Classes */}
          <Section>
            <Heading
              level="h2"
              id="tailwind-classes"
              title="주요 Tailwind 클래스"
              description="컴포넌트에서 사용되는 주요 Tailwind 유틸리티 클래스입니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="KRDS 컬러 클래스" />
              <List variant="unordered">
                <ListItem>
                  <Code>text-krds-gray-90</Code> - 기본 텍스트 색상
                </ListItem>
                <ListItem>
                  <Code>text-krds-blue-60</Code> - 활성 상태 색상 (primary)
                </ListItem>
                <ListItem>
                  <Code>border-krds-gray-20</Code> - 기본 보더 색상
                </ListItem>
                <ListItem>
                  <Code>border-krds-gray-50</Code> - 제목 하단 보더
                </ListItem>
                <ListItem>
                  <Code>bg-krds-gray-10</Code> - 호버 배경색
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="레이아웃 & 간격" />
              <List variant="unordered">
                <ListItem>
                  <Code>max-w-[296px]</Code> - 컨테이너 최대 너비
                </ListItem>
                <ListItem>
                  <Code>py-3 px-3</Code> - 버튼 패딩
                </ListItem>
                <ListItem>
                  <Code>pl-10</Code> - 3단계 메뉴 왼쪽 패딩
                </ListItem>
                <ListItem>
                  <Code>pl-16</Code> - 4단계 메뉴 왼쪽 패딩
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="타이포그래피" />
              <List variant="unordered">
                <ListItem>
                  <Code>text-2xl font-bold</Code> - 제목 스타일
                </ListItem>
                <ListItem>
                  <Code>text-[17px] leading-[1.5]</Code> - 본문 스타일
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="상태 클래스" />
              <List variant="unordered">
                <ListItem>
                  <Code>hover:bg-krds-gray-10</Code> - 호버 배경
                </ListItem>
                <ListItem>
                  <Code>focus-visible:outline-krds-blue-60</Code> - 포커스
                  아웃라인
                </ListItem>
                <ListItem>
                  <Code>data-[state=open]:after:rotate-180</Code> - 열림 상태
                  아이콘 회전
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Separator', href: '/components/separator' }}
        next={{ title: 'Skeleton', href: '/components/skeleton' }}
      />
    </>
  );
}
