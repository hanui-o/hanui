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
import { Home, Search, Bell, User, Menu } from 'lucide-react';

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

export default function TabBarsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const basicItems: TabBarItem[] = [
    {
      label: '홈',
      icon: <Home size={24} strokeWidth={1.5} />,
      activeIcon: <Home size={24} strokeWidth={2.5} />,
      href: '/',
      active: true,
    },
    {
      label: '검색',
      icon: <Search size={24} strokeWidth={1.5} />,
      activeIcon: <Search size={24} strokeWidth={2.5} />,
      href: '/search',
    },
    {
      label: '알림',
      icon: <Bell size={24} strokeWidth={1.5} />,
      activeIcon: <Bell size={24} strokeWidth={2.5} />,
      href: '/notifications',
      badge: 3,
    },
    {
      label: '내 정보',
      icon: <User size={24} strokeWidth={1.5} />,
      activeIcon: <User size={24} strokeWidth={2.5} />,
      href: '/profile',
    },
    {
      label: '전체 메뉴',
      icon: <Menu size={24} strokeWidth={1.5} />,
      activeIcon: <Menu size={24} strokeWidth={2.5} />,
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Body size="sm" className="mb-2 text-krds-gray-60">
                  <strong>Default</strong> - 활성화: 면 아이콘 + gray-95 + bold
                </Body>
                <ComponentPreview className="pb-20">
                  <TabBars
                    items={basicItems}
                    variant="default"
                    onItemClick={handleItemClick}
                    className="!absolute !bottom-0"
                  />
                </ComponentPreview>
              </div>
              <div>
                <Body size="sm" className="mb-2 text-krds-gray-60">
                  <strong>Border</strong> - 활성화: 선 아이콘 + gray-95 + bold +
                  border-top
                </Body>
                <ComponentPreview className="pb-20">
                  <TabBars
                    items={basicItems}
                    variant="border"
                    onItemClick={handleItemClick}
                    className="!absolute !bottom-0"
                  />
                </ComponentPreview>
              </div>
            </div>
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
import { Home, Search, Bell } from 'lucide-react';

const items: TabBarItem[] = [
  {
    label: '홈',
    icon: <Home size={24} strokeWidth={1.5} />,
    activeIcon: <Home size={24} strokeWidth={2.5} />,
    href: '/',
    active: true,
  },
  {
    label: '검색',
    icon: <Search size={24} strokeWidth={1.5} />,
    href: '/search',
  },
  {
    label: '알림',
    icon: <Bell size={24} strokeWidth={1.5} />,
    activeIcon: <Bell size={24} strokeWidth={2.5} />,
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
  icon: <Bell size={24} strokeWidth={1.5} />,
  activeIcon: <Bell size={24} strokeWidth={2.5} />,
  href: '/notifications',
  badge: 3, // Badge 숫자
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="활성 아이콘"
                description="선택 상태에서 다른 스타일의 아이콘을 표시하려면 activeIcon을 설정합니다."
              />
              <Code variant="block" language="tsx">
                {`{
  label: '홈',
  icon: <Home size={24} strokeWidth={1.5} />,        // 기본 아이콘
  activeIcon: <Home size={24} strokeWidth={2.5} />, // 활성화 아이콘 (더 굵게)
  href: '/',
  active: true,
}`}
              </Code>
            </Subsection>
          </Section>

          {/* 주요 기능 */}
          <Section level="h2">
            <Heading level="h2" id="key-features" title="주요 기능" />
            <List>
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
                <strong>선택 상태 표시:</strong> 활성 메뉴는 더 굵은 아이콘과
                색상 변화로 구분됩니다
              </ListItem>
              <ListItem>
                <strong>Badge 지원:</strong> 알림 개수 등을 표시할 수 있는 배지
                기능
              </ListItem>
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
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;default&apos; | &apos;border&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;default&apos;</Code>
                    </TableCell>
                    <TableCell>
                      스타일 변형. default: 활성화 시 면 아이콘, border: 활성화
                      시 선 아이콘 + 상단 보더
                    </TableCell>
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
  icon: React.ReactNode;     // 메뉴 아이콘
  activeIcon?: React.ReactNode; // 선택된 상태의 아이콘
  href: string;              // 메뉴 링크
  badge?: number;            // Badge 숫자 (선택사항)
  active?: boolean;          // 초기 활성 상태
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="사용 시 주의사항" />
              <List>
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
