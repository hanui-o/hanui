'use client';

// Docs layout components
import {
  PageSection,
  SectionHeading,
  PageNavigation,
} from '@/components/content';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';

// UI components - from @hanui/react
import {
  TabBars,
  TabBarItem,
  Body,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@hanui/react';

// Simple icon components for example
const HomeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const HomeFilledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const BellIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const BellFilledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default function TabBarsPage() {
  // Basic example
  const basicItems: TabBarItem[] = [
    {
      label: '홈',
      icon: <HomeIcon />,
      activeIcon: <HomeFilledIcon />,
      href: '/',
      active: true,
    },
    {
      label: '검색',
      icon: <SearchIcon />,
      href: '/search',
    },
    {
      label: '알림',
      icon: <BellIcon />,
      activeIcon: <BellFilledIcon />,
      href: '/notifications',
      badge: 3,
    },
    {
      label: '내 정보',
      icon: <UserIcon />,
      href: '/profile',
    },
    {
      label: '전체 메뉴',
      icon: <MenuIcon />,
      href: '/menu',
    },
  ];

  const handleItemClick = (item: TabBarItem, index: number) => {
    console.log('Clicked:', item.label, 'at index', index);
  };

  return (
    <>
      <SectionHeading
        level="h1"
        title="Tab Bars"
        description="모바일 및 태블릿에서 주요 화면 간 빠른 이동을 위한 하단 고정 네비게이션입니다."
      />

      <PageSection>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PageSection>
              <ComponentPreview className="pb-20">
                <TabBars
                  items={basicItems}
                  onItemClick={handleItemClick}
                  className="!absolute !bottom-0"
                />
              </ComponentPreview>
            </PageSection>

            <SectionHeading level="h2" id="overview" title="개요">
              <Body className="leading-relaxed">
                Tab Bars는 모바일 및 태블릿에서 화면 하단에 고정되어 주요 서비스
                화면 간 빠른 이동을 제공하는 네비게이션 컴포넌트입니다.
                <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>을 준수하여
                공공 모바일 서비스에 최적화된 접근성과 사용성을 제공합니다.
              </Body>
            </SectionHeading>

            <SectionHeading level="h2" id="installation" title="설치" />
            <CodeBlock code="npx hanui add tab-bars" language="bash" />
            <Body className="text-krds-gray-70 mt-2">
              이 명령은 컴포넌트 파일을 자동으로 설치합니다. Tab Bars는 Tailwind
              CSS를 사용합니다.
            </Body>

            <SectionHeading level="h2" id="examples" title="예제" />

            <SectionHeading level="h3" id="basic-example" title="기본 Tab Bars">
              <Body>
                기본적인 Tab Bars입니다. 아이콘과 라벨을 함께 사용하며, 최대
                5개의 메뉴를 권장합니다.
              </Body>
            </SectionHeading>
            <CodeBlock
              code={`import { TabBars, TabBarItem } from '@hanui/react';

const items: TabBarItem[] = [
  {
    label: '홈',
    icon: <HomeIcon />,
    activeIcon: <HomeFilledIcon />,
    href: '/',
    active: true,
  },
  {
    label: '검색',
    icon: <SearchIcon />,
    href: '/search',
  },
  {
    label: '알림',
    icon: <BellIcon />,
    activeIcon: <BellFilledIcon />,
    href: '/notifications',
    badge: 3,
  },
  {
    label: '내 정보',
    icon: <UserIcon />,
    href: '/profile',
  },
  {
    label: '전체 메뉴',
    icon: <MenuIcon />,
    href: '/menu',
  },
];

<TabBars items={items} onItemClick={(item) => console.log(item)} />`}
              language="tsx"
            />

            <SectionHeading level="h2" id="key-features" title="주요 기능" />
            <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90">
              <li>
                <strong>하단 고정:</strong> 화면 하단에 고정되어 스크롤 시에도
                항상 접근 가능합니다
              </li>
              <li>
                <strong>최대 5개 메뉴:</strong> KRDS 가이드라인에 따라 최대 5개
                메뉴를 권장합니다
              </li>
              <li>
                <strong>아이콘 + 라벨:</strong> 아이콘과 라벨을 함께 사용하여
                명확한 의미 전달
              </li>
              <li>
                <strong>선택 상태 표시:</strong> 활성 메뉴는 filled 아이콘과
                색상 변화로 구분됩니다
              </li>
              <li>
                <strong>Badge 지원:</strong> 알림 개수 등을 표시할 수 있는 배지
                기능
              </li>
              <li>
                <strong>Tailwind CSS:</strong> 외부 의존성 없이 Tailwind만으로
                구현되었습니다
              </li>
            </ul>

            <SectionHeading
              level="h2"
              id="guidelines"
              title="디자인 가이드라인"
            />
            <Body>KRDS Tab Bars 가이드라인을 준수합니다:</Body>
            <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90 mt-2">
              <li>홈 버튼은 가장 왼쪽, 전체 메뉴 버튼은 가장 오른쪽에 배치</li>
              <li>라벨 텍스트는 1-2단어로 간결하게 유지</li>
              <li>모든 메뉴의 크기와 높이를 동일하게 유지</li>
              <li>선택/비선택 상태를 명확히 구분 (filled/line 아이콘)</li>
              <li>최소 터치 영역 44x44px 이상 확보</li>
            </ul>

            <SectionHeading level="h2" id="accessibility" title="접근성" />
            <Body>
              Tab Bars 컴포넌트는 WCAG 2.1 / KWCAG 2.2 AA 레벨 준수를 목표로
              합니다:
            </Body>
            <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90 mt-2">
              <li>
                <strong>Semantic HTML:</strong> `&lt;nav&gt;` 요소를 사용하여
                네비게이션 영역을 명확히 표시합니다
              </li>
              <li>
                <strong>ARIA Current:</strong> `aria-current="page"`로 현재
                선택된 메뉴를 표시합니다
              </li>
              <li>
                <strong>Keyboard Navigation:</strong> Tab 키로 모든 메뉴에 접근
                가능하며, Enter 키로 활성화할 수 있습니다
              </li>
              <li>
                <strong>Focus Visible:</strong> 키보드 포커스 시 명확한
                아웃라인을 표시합니다
              </li>
              <li>
                <strong>Badge Accessibility:</strong> 배지 숫자는 `aria-label`로
                스크린 리더에 전달됩니다
              </li>
            </ul>
          </TabsContent>

          <TabsContent value="api">
            <SectionHeading
              level="h2"
              id="tab-bars-props"
              title="TabBars Props"
            />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-krds-gray-30">
                    <th className="text-left p-3 font-semibold">Prop</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Default</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono">items</td>
                    <td className="p-3 font-mono">TabBarItem[]</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">
                      탭 바 메뉴 아이템 배열 (최대 5개 권장)
                    </td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono">onItemClick?</td>
                    <td className="p-3 font-mono">(item, index) =&gt; void</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">아이템 클릭 시 호출되는 핸들러</td>
                  </tr>
                  <tr className="border-b border-krds-gray-20">
                    <td className="p-3 font-mono">className?</td>
                    <td className="p-3 font-mono">string</td>
                    <td className="p-3 font-mono">''</td>
                    <td className="p-3">
                      Additional CSS classes for custom styling
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <SectionHeading
              level="h2"
              id="tab-bar-item-type"
              title="TabBarItem Type"
            >
              <Body>Tab Bar 아이템의 타입입니다:</Body>
            </SectionHeading>
            <CodeBlock
              code={`export interface TabBarItem {
  label: string;           // 메뉴 라벨 (1-2 단어 권장)
  icon: React.ReactNode;   // 메뉴 아이콘 (line icon)
  activeIcon?: React.ReactNode; // 선택된 상태의 아이콘 (filled icon)
  href: string;            // 메뉴 href
  badge?: number;          // Badge 숫자 (선택사항)
  active?: boolean;        // 초기 활성 상태
}`}
              language="tsx"
            />

            <SectionHeading
              level="h2"
              id="usage-notes"
              title="사용 시 주의사항"
            />
            <ul className="list-disc pl-6 space-y-2 text-base text-krds-gray-90">
              <li>메뉴는 최대 5개까지 권장합니다 (KRDS 가이드라인)</li>
              <li>
                `icon`과 `activeIcon`을 함께 제공하여 선택 상태를 명확히
                구분하세요
              </li>
              <li>라벨 텍스트는 1-2단어로 간결하게 작성하세요</li>
              <li>홈 메뉴는 가장 왼쪽, 전체 메뉴는 가장 오른쪽에 배치하세요</li>
              <li>Badge는 99 이상일 경우 "99+"로 표시됩니다</li>
              <li>
                Tab Bars는 화면 하단에 고정되므로, 페이지 하단에 충분한
                여백(padding-bottom)을 확보하세요
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </PageSection>

      <PageNavigation
        prev={{ title: 'Structured List', href: '/components/structured-list' }}
        next={{ title: 'Table', href: '/components/table' }}
      />
    </>
  );
}
