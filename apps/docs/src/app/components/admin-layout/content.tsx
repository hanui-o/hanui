'use client';

import {
  PageSection as Section,
  Heading,
  Subsection,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { FrameworkCodeBlock } from '@/components/content/FrameworkCodeBlock';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import {
  Code,
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
import { AdminLayout, ADMIN_CMS_MENU } from '@hanui/react';
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  Image,
  Trash2,
  Menu,
} from 'lucide-react';

const DEMO_MENU = [
  {
    label: '대시보드',
    href: '/admin',
    icon: <LayoutDashboard className="w-5 h-5" />,
    active: true,
  },
  {
    label: '콘텐츠 관리',
    icon: <FileText className="w-5 h-5" />,
    children: [
      { label: '고정 페이지', href: '/admin/pages' },
      { label: '메뉴 관리', href: '/admin/menus' },
    ],
  },
  {
    label: '게시판 관리',
    icon: <Menu className="w-5 h-5" />,
    children: [
      { label: '게시글 관리', href: '/admin/posts' },
      { label: '게시판 설정', href: '/admin/boards' },
    ],
  },
  {
    label: '미디어 관리',
    href: '/admin/media',
    icon: <Image className="w-5 h-5" />,
  },
  {
    label: '사이트 설정',
    href: '/admin/settings',
    icon: <Settings className="w-5 h-5" />,
  },
  {
    label: '계정 관리',
    href: '/admin/users',
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: '휴지통',
    href: '/admin/trash',
    icon: <Trash2 className="w-5 h-5" />,
  },
];

export default function AdminLayoutPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Admin Layout"
        description="CMS 어드민 페이지의 공통 레이아웃 — 사이드바, 상단바, 메인 콘텐츠 영역"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview className="p-0">
              <div className="w-full h-[500px] relative overflow-hidden rounded-lg">
                <AdminLayout
                  menuItems={DEMO_MENU}
                  user={{ name: '홍길동', role: '최고관리자' }}
                  onLogout={() => alert('로그아웃')}
                  onMenuClick={(href) => alert(`이동: ${href}`)}
                  siteTitle="OO기관 CMS"
                >
                  <div className="p-6 text-center text-krds-gray-50">
                    메인 콘텐츠 영역
                  </div>
                </AdminLayout>
              </div>
            </ComponentPreview>
            <FrameworkCodeBlock
              reactCode={`import { AdminLayout } from '@hanui/react'

<AdminLayout
  menuItems={menuItems}
  user={{ name: '홍길동', role: '최고관리자' }}
  onLogout={() => console.log('로그아웃')}
  onMenuClick={(href) => router.push(href)}
  siteTitle="OO기관 CMS"
>
  {children}
</AdminLayout>`}
              vueCode={`<!-- Coming Soon -->`}
            />
          </Section>

          <Section level="h2">
            <Installation componentName="admin-layout" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <FrameworkCodeBlock
              reactCode={`import { AdminLayout, ADMIN_CMS_MENU } from '@hanui/react'

export default function AdminPage({ children }) {
  return (
    <AdminLayout
      menuItems={ADMIN_CMS_MENU}
      user={{ name: '관리자', role: '최고관리자' }}
      onLogout={() => signOut()}
      onMenuClick={(href) => router.push(href)}
      siteTitle="OO기관 관리자"
    >
      {children}
    </AdminLayout>
  );
}`}
              vueCode={`<!-- Coming Soon -->`}
            />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="customization" title="커스터마이징" />

            <Subsection>
              <Heading level="h3" id="collapsed" title="사이드바 접힘 상태" />
              <ComponentPreview className="p-0">
                <div className="w-full h-[400px] relative overflow-hidden rounded-lg">
                  <AdminLayout
                    menuItems={DEMO_MENU}
                    user={{ name: '홍길동', role: '편집자' }}
                    onMenuClick={(href) => alert(`이동: ${href}`)}
                    siteTitle="OO기관 CMS"
                    defaultCollapsed
                  >
                    <div className="p-6 text-center text-krds-gray-50">
                      사이드바 접힘 상태
                    </div>
                  </AdminLayout>
                </div>
              </ComponentPreview>
              <FrameworkCodeBlock
                reactCode={`<AdminLayout
  menuItems={menuItems}
  defaultCollapsed
  siteTitle="OO기관 CMS"
>
  {children}
</AdminLayout>`}
                vueCode={`<!-- Coming Soon -->`}
              />
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 레퍼런스 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="props" title="Props" />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>menuItems</Code>
                  </TableCell>
                  <TableCell>
                    <Code>AdminMenuItem[]</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>사이드바 메뉴 아이템 배열 (필수)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>user</Code>
                  </TableCell>
                  <TableCell>
                    <Code>AdminUser</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>로그인 사용자 정보 (name, role, avatar)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>onLogout</Code>
                  </TableCell>
                  <TableCell>
                    <Code>() =&gt; void</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>로그아웃 핸들러</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>onMenuClick</Code>
                  </TableCell>
                  <TableCell>
                    <Code>(href: string) =&gt; void</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>메뉴 클릭 핸들러</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>logo</Code>
                  </TableCell>
                  <TableCell>
                    <Code>ReactNode</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>로고 이미지 또는 텍스트</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>siteTitle</Code>
                  </TableCell>
                  <TableCell>
                    <Code>string</Code>
                  </TableCell>
                  <TableCell>
                    <Code>&quot;관리자&quot;</Code>
                  </TableCell>
                  <TableCell>사이트 타이틀</TableCell>
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
                  <TableCell>사이드바 초기 접힘 상태</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>sidebarFooter</Code>
                  </TableCell>
                  <TableCell>
                    <Code>ReactNode</Code>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>사이드바 하단 콘텐츠</TableCell>
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

          <Section level="h2">
            <Heading level="h2" id="types" title="타입" />
            <Subsection>
              <Heading level="h3" id="admin-menu-item" title="AdminMenuItem" />
              <Code variant="block" language="tsx">{`interface AdminMenuItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  children?: AdminMenuItem[];
}`}</Code>
            </Subsection>
            <Subsection>
              <Heading level="h3" id="admin-user" title="AdminUser" />
              <Code variant="block" language="tsx">{`interface AdminUser {
  name: string;
  role?: string;
  avatar?: string;
}`}</Code>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>
    </>
  );
}
