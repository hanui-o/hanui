'use client';

import {
  PageSection as Section,
  Heading,
  Installation,
} from '@/components/content';
import {
  Code,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Alert,
  AlertDescription,
} from '@hanui/react';
import Link from 'next/link';

const usageCode = `'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar, type SidebarMenuItem } from '@hanui/react';
import { LayoutDashboard, FileText, Settings } from 'lucide-react';

const menuItems: SidebarMenuItem[] = [
  {
    label: '대시보드',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: '콘텐츠',
    icon: <FileText className="w-5 h-5" />,
    children: [
      { label: '게시물', href: '/posts' },
      { label: '페이지', href: '/pages' },
    ],
  },
  {
    label: '설정',
    href: '/settings',
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const items = menuItems.map((item) => ({
    ...item,
    active: item.href === pathname,
    children: item.children?.map((child) => ({
      ...child,
      active: child.href === pathname,
    })),
  }));

  return (
    <div className="min-h-screen">
      <Sidebar
        menuItems={items}
        siteTitle="My App"
        onMenuClick={(href) => router.push(href)}
        onCollapsedChange={setCollapsed}
      />
      <main className={\`transition-all duration-300 \${collapsed ? 'ml-16' : 'ml-64'}\`}>
        {children}
      </main>
    </div>
  );
}`;

export default function SidebarPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Sidebar"
        description="어드민/대시보드용 좌측 사이드바. 접기/펼치기, 2depth 메뉴 트리, 활성 상태 자동 펼침을 지원합니다."
      />

      <Section>
        <Alert variant="info">
          <AlertDescription>
            Sidebar는 <Code>fixed</Code> 포지션으로 동작합니다. 페이지
            레이아웃은 호출하는 쪽에서 직접 구성하세요. 실제 동작 예시는{' '}
            <Link
              href="/showcase/cms"
              className="underline text-krds-primary-base"
            >
              CMS Showcase
            </Link>
            에서 확인할 수 있습니다.
          </AlertDescription>
        </Alert>
      </Section>

      <Section>
        <Heading level="h2" title="사용법" />
        <pre className="rounded-md bg-krds-gray-5 p-4 text-sm overflow-x-auto">
          <code>{usageCode}</code>
        </pre>
      </Section>

      <Section>
        <Heading level="h2" title="API 레퍼런스" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>설명</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>menuItems</Code>
              </TableCell>
              <TableCell>
                <Code>SidebarMenuItem[]</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>사이드바에 표시할 메뉴 트리. 필수.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onMenuClick</Code>
              </TableCell>
              <TableCell>
                <Code>{'(href: string) => void'}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                메뉴 클릭 핸들러. Next.js라면 router.push에 연결.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>logo</Code>
              </TableCell>
              <TableCell>
                <Code>ReactNode</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>사이트 타이틀 좌측에 들어갈 로고.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>siteTitle</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>
                <Code>{"'관리자'"}</Code>
              </TableCell>
              <TableCell>사이드바 헤더에 표시할 타이틀.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>defaultCollapsed</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>초기 접힘 상태.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onCollapsedChange</Code>
              </TableCell>
              <TableCell>
                <Code>{'(collapsed: boolean) => void'}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                접힘 상태 변경 콜백. 메인 영역 ml 동기화에 사용.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>footer</Code>
              </TableCell>
              <TableCell>
                <Code>ReactNode</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                사이드바 하단 슬롯. 사용자 정보·로그아웃 버튼 등.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      <Section>
        <Heading level="h2" title="SidebarMenuItem" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>설명</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>label</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>메뉴 라벨. 필수.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>href</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>링크 URL. children이 있으면 생략 가능.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>icon</Code>
              </TableCell>
              <TableCell>
                <Code>ReactNode</Code>
              </TableCell>
              <TableCell>메뉴 아이콘. lucide-react 권장.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>active</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                활성 상태. 자식 중 active가 있으면 부모도 자동으로 펼쳐집니다.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>children</Code>
              </TableCell>
              <TableCell>
                <Code>SidebarMenuItem[]</Code>
              </TableCell>
              <TableCell>2depth 자식 메뉴.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      <Installation componentName="sidebar" />
    </>
  );
}
