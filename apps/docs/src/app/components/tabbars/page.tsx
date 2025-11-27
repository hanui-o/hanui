'use client';

import { useState } from 'react';
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

import {
  TabBars,
  TabBarItem,
  Body,
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

// 예제용 아이콘 컴포넌트
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
  const [activeIndex, setActiveIndex] = useState(0);

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
    setActiveIndex(index);
    console.log('Clicked:', item.label, 'at index', index);
  };

  return (
    <>
      <Heading
        level="h1"
        id="tabbars"
        title="Tab Bars"
        description="모바일 및 태블릿에서 주요 화면 간 빠른 이동을 위한 하단 고정 네비게이션입니다."
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
            <Body className="mb-3">
              Tab Bars는 모바일 및 태블릿에서 화면 하단에 고정되어 주요 서비스
              화면 간 빠른 이동을 제공하는 네비게이션 컴포넌트입니다.{' '}
              <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>을 준수하여
              공공 모바일 서비스에 최적화된 접근성과 사용성을 제공합니다.
            </Body>
            <ComponentPreview className="pb-20">
              <TabBars
                items={basicItems}
                onItemClick={handleItemClick}
                className="!absolute !bottom-0"
              />
            </ComponentPreview>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Installation componentName="tab-bars" />
          </Section>

          {/* 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { TabBars, TabBarItem } from '@hanui/react';

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
];

<TabBars items={items} onItemClick={(item, index) => console.log(item)} />`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="기본 사용"
                description="아이콘과 라벨을 함께 사용하며, 최대 5개의 메뉴를 권장합니다."
              />
              <ComponentPreview className="pb-20">
                <TabBars
                  items={basicItems}
                  onItemClick={handleItemClick}
                  className="!absolute !bottom-0"
                />
              </ComponentPreview>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Badge 표시"
                description="알림 개수 등을 표시할 수 있습니다. 99 이상은 '99+'로 표시됩니다."
              />
              <Code variant="block" language="tsx">
                {`{
  label: '알림',
  icon: <BellIcon />,
  activeIcon: <BellFilledIcon />,
  href: '/notifications',
  badge: 3, // Badge 숫자
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="활성 아이콘"
                description="선택 상태에서 다른 아이콘(filled)을 표시하려면 activeIcon을 설정합니다."
              />
              <Code variant="block" language="tsx">
                {`{
  label: '홈',
  icon: <HomeIcon />,        // line 아이콘
  activeIcon: <HomeFilledIcon />, // filled 아이콘
  href: '/',
  active: true,
}`}
              </Code>
            </Subsection>
          </Section>

          {/* 주요 기능 */}
          <Section level="h2">
            <Heading level="h2" id="key-features" title="주요 기능" />
            <List variant="disc">
              <ListItem>
                <strong>하단 고정:</strong> 화면 하단에 고정되어 스크롤 시에도
                항상 접근 가능합니다
              </ListItem>
              <ListItem>
                <strong>최대 5개 메뉴:</strong> KRDS 가이드라인에 따라 최대 5개
                메뉴를 권장합니다
              </ListItem>
              <ListItem>
                <strong>아이콘 + 라벨:</strong> 아이콘과 라벨을 함께 사용하여
                명확한 의미 전달
              </ListItem>
              <ListItem>
                <strong>선택 상태 표시:</strong> 활성 메뉴는 filled 아이콘과
                색상 변화로 구분됩니다
              </ListItem>
              <ListItem>
                <strong>Badge 지원:</strong> 알림 개수 등을 표시할 수 있는 배지
                기능
              </ListItem>
            </List>
          </Section>

          {/* 디자인 가이드라인 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="guidelines"
              title="디자인 가이드라인"
              description="KRDS Tab Bars 가이드라인을 준수합니다."
            />
            <List variant="disc">
              <ListItem>
                홈 버튼은 가장 왼쪽, 전체 메뉴 버튼은 가장 오른쪽에 배치
              </ListItem>
              <ListItem>라벨 텍스트는 1-2단어로 간결하게 유지</ListItem>
              <ListItem>모든 메뉴의 크기와 높이를 동일하게 유지</ListItem>
              <ListItem>
                선택/비선택 상태를 명확히 구분 (filled/line 아이콘)
              </ListItem>
              <ListItem>최소 터치 영역 44x44px 이상 확보</ListItem>
            </List>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 AA 레벨을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>Semantic HTML:</strong> <Code>&lt;nav&gt;</Code> 요소를
                사용하여 네비게이션 영역을 명확히 표시합니다
              </ListItem>
              <ListItem>
                <strong>ARIA Current:</strong>{' '}
                <Code>aria-current=&quot;page&quot;</Code>로 현재 선택된 메뉴를
                표시합니다
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> Tab 키로 모든 메뉴에 접근
                가능하며, Enter 키로 활성화합니다
              </ListItem>
              <ListItem>
                <strong>포커스 표시:</strong> 키보드 포커스 시 명확한 아웃라인을
                표시합니다
              </ListItem>
              <ListItem>
                <strong>Badge 접근성:</strong> 배지 숫자는{' '}
                <Code>aria-label</Code>로 스크린 리더에 전달됩니다
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="TabBars Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>속성</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>items</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">TabBarItem[]</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      탭 바 메뉴 아이템 배열 (최대 5개 권장)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onItemClick</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (item: TabBarItem, index: number) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>아이템 클릭 시 호출되는 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
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
              <Heading level="h3" title="TabBarItem Type" />
              <Code variant="block" language="tsx">
                {`interface TabBarItem {
  label: string;             // 메뉴 라벨 (1-2 단어 권장)
  icon: React.ReactNode;     // 메뉴 아이콘 (line icon)
  activeIcon?: React.ReactNode; // 선택된 상태의 아이콘 (filled icon)
  href: string;              // 메뉴 링크
  badge?: number;            // Badge 숫자 (선택사항)
  active?: boolean;          // 초기 활성 상태
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="사용 시 주의사항" />
              <List variant="disc">
                <ListItem>
                  메뉴는 최대 5개까지 권장합니다 (KRDS 가이드라인)
                </ListItem>
                <ListItem>
                  <Code>icon</Code>과 <Code>activeIcon</Code>을 함께 제공하여
                  선택 상태를 명확히 구분하세요
                </ListItem>
                <ListItem>라벨 텍스트는 1-2단어로 간결하게 작성하세요</ListItem>
                <ListItem>
                  홈 메뉴는 가장 왼쪽, 전체 메뉴는 가장 오른쪽에 배치하세요
                </ListItem>
                <ListItem>
                  Badge는 99 이상일 경우 &quot;99+&quot;로 표시됩니다
                </ListItem>
                <ListItem>
                  Tab Bars는 화면 하단에 고정되므로, 페이지 하단에 충분한
                  여백(padding-bottom)을 확보하세요
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Switch', href: '/components/switch' }}
        next={{ title: 'Table', href: '/components/table' }}
      />
    </>
  );
}
