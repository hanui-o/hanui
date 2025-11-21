'use client';

import {
  Section,
  Subsection,
  SectionHeading,
  Body,
  Card,
  Code,
  List,
  ListItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PageNavigation,
} from '@/components/hanui';
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
      <SectionHeading
        level="h1"
        title="Side Navigation"
        description="KRDS 표준을 따르는 사이드 네비게이션 컴포넌트입니다. 최대 4단계 depth를 지원하며, Props 기반 API와 CSS Modules로 구현되었습니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="installation"
              title="설치"
              description="Side Navigation 컴포넌트를 프로젝트에 추가합니다."
            />

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx hanui add side-navigation
            </Code>

            <Card variant="info" className="mt-6">
              <Body className="mb-3">설치 시 다음 파일이 추가됩니다:</Body>
              <List className="text-krds-gray-90">
                <ListItem>
                  <Code>components/hanui/side-navigation.tsx</Code> - Side
                  Navigation 컴포넌트
                </ListItem>
                <ListItem>
                  <Code>components/hanui/side-navigation.module.scss</Code> -
                  CSS Modules 스타일
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* What is it */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="Side Navigation이란?"
              description="다단계 콘텐츠 구조를 위한 사이드 네비게이션 컴포넌트입니다."
            />

            <Card variant="info">
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
                  <strong>CSS Modules:</strong> SCSS를 활용한 독립적인 스타일
                  관리
                </ListItem>
                <ListItem>
                  <strong>접근성:</strong> ARIA 속성, 키보드 네비게이션 지원
                </ListItem>
                <ListItem>
                  <strong>KRDS 디자인 토큰:</strong> CSS 변수를 통한 일관된
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
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="usage"
              title="사용 예제"
              description="Side Navigation 컴포넌트의 기본 사용법입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="기본 사용" />
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
              <SectionHeading level="h3" title="4단계 Depth 사용" />
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
              <SectionHeading level="h3" title="Active 상태 지정" />
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
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="structure"
              title="데이터 구조"
              description="Side Navigation의 데이터 구조를 이해합니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="SideNavSection (2nd Depth)" />
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
              <SectionHeading level="h3" title="SideNavLink (3rd/4th Depth)" />
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
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="styling"
              title="스타일 커스터마이징"
              description="CSS Modules를 활용한 스타일 수정 방법입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="KRDS 디자인 토큰 활용" />
              <Body className="mb-4 text-krds-gray-70">
                side-navigation.module.scss에서 KRDS CSS 변수를 사용합니다.
              </Body>

              <Code variant="block" language="scss" showLineNumbers={false}>
                {`.krds-side-navigation {
  .lnb-tit {
    padding-bottom: var(--krds-spacing-10);
    border-bottom: 1px solid var(--krds-color-divider-gray);
    font-size: var(--krds-font-size-md);
    font-weight: var(--krds-font-weight-bold);
    color: var(--krds-color-text-primary);
  }

  .lnb-btn {
    padding: var(--krds-spacing-6) var(--krds-spacing-3);
    background-color: var(--krds-color-action-secondary);
    border-radius: var(--krds-border-radius-sm);
    font-size: var(--krds-font-size-sm);
  }
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="토글 아이콘 애니메이션" />
              <Body className="mb-4 text-krds-gray-70">
                chevron 아이콘은 확장 시 180도 회전합니다.
              </Body>

              <Code variant="block" language="scss" showLineNumbers={false}>
                {`.lnb-toggle {
  &::after {
    content: '';
    background-image: url("data:image/svg+xml...");
    transition: transform 0.2s ease;
  }

  &[aria-expanded='true']::after {
    transform: rotate(180deg);
  }
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Grid 기반 확장 애니메이션" />
              <Body className="mb-4 text-krds-gray-70">
                서브메뉴는 CSS Grid를 활용하여 부드럽게 확장/축소됩니다.
              </Body>

              <Code variant="block" language="scss" showLineNumbers={false}>
                {`.lnb-submenu {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
  overflow: hidden;

  &[style*='display: grid'] {
    grid-template-rows: 1fr;
  }
}`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section level="h2">
            <SectionHeading
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
          <Section level="h2">
            <SectionHeading
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
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="krds-standards"
              title="KRDS 표준"
              description="Side Navigation이 준수하는 KRDS 표준입니다."
            />

            <Card variant="info">
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
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="props"
              title="Props"
              description="SideNavigation 컴포넌트의 속성입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="title" />
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
              <SectionHeading level="h3" title="sections" />
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
              <SectionHeading level="h3" title="className" />
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
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="types"
              title="TypeScript 타입"
              description="Side Navigation의 TypeScript 인터페이스입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="SideNavSection" />
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
              <SectionHeading level="h3" title="SideNavLink" />
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
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="state-management"
              title="상태 관리"
              description="컴포넌트 내부의 상태 관리입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="expandedSections" />
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
              <SectionHeading level="h3" title="expandedSubItems" />
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

          {/* CSS Modules Classes */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="css-modules"
              title="CSS Modules 클래스"
              description="side-navigation.module.scss의 클래스 목록입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="메인 구조" />
              <List variant="unordered">
                <ListItem>
                  <Code>.krds-side-navigation</Code> - 메인 컨테이너
                </ListItem>
                <ListItem>
                  <Code>.lnb-tit</Code> - 1st Depth 제목
                </ListItem>
                <ListItem>
                  <Code>.lnb-list</Code> - 2nd Depth 리스트
                </ListItem>
                <ListItem>
                  <Code>.lnb-item</Code> - 2nd Depth 아이템
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="버튼 및 링크" />
              <List variant="unordered">
                <ListItem>
                  <Code>.lnb-btn</Code> - 기본 버튼/링크 스타일
                </ListItem>
                <ListItem>
                  <Code>.lnb-toggle</Code> - 토글 버튼 (chevron 아이콘 포함)
                </ListItem>
                <ListItem>
                  <Code>.lnb-link</Code> - 일반 링크
                </ListItem>
                <ListItem>
                  <Code>.lnb-btn-tit</Code> - 3rd Depth 제목 버튼
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="서브메뉴" />
              <List variant="unordered">
                <ListItem>
                  <Code>.lnb-submenu</Code> - 3rd Depth 서브메뉴 컨테이너
                </ListItem>
                <ListItem>
                  <Code>.lnb-subitem</Code> - 3rd Depth 아이템
                </ListItem>
                <ListItem>
                  <Code>.lnb-submenu-lv2</Code> - 4th Depth 서브메뉴 컨테이너
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="상태 클래스" />
              <List variant="unordered">
                <ListItem>
                  <Code>.active</Code> - 활성화 상태
                </ListItem>
                <ListItem>
                  <Code>[aria-current='page']</Code> - 현재 페이지 표시
                </ListItem>
                <ListItem>
                  <Code>[aria-expanded='true']</Code> - 확장된 상태
                </ListItem>
              </List>
            </Subsection>
          </Section>

          {/* CSS Variables */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="css-variables"
              title="CSS 변수"
              description="사용되는 KRDS 디자인 토큰입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Spacing" />
              <Code variant="block" language="css" showLineNumbers={false}>
                {`--krds-spacing-3
--krds-spacing-6
--krds-spacing-9
--krds-spacing-10`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Colors" />
              <Code variant="block" language="css" showLineNumbers={false}>
                {`--krds-color-text-primary
--krds-color-divider-gray
--krds-color-border
--krds-color-focus
--krds-color-action-secondary
--krds-color-action-secondary-hover
--krds-color-action-secondary-pressed
--krds-color-action-secondary-selected
--krds-color-action-secondary-active`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Typography" />
              <Code variant="block" language="css" showLineNumbers={false}>
                {`--krds-font-size-xs
--krds-font-size-sm
--krds-font-size-md
--krds-font-weight-regular
--krds-font-weight-medium
--krds-font-weight-bold
--krds-line-height-sm
--krds-line-height-md`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Border Radius" />
              <Code variant="block" language="css" showLineNumbers={false}>
                {`--krds-border-radius-sm`}
              </Code>
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
