'use client';

import type { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminShell, CmsHeader, type AdminShellMenuItem } from '@hanui/react';
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Image,
  Settings,
  Megaphone,
} from 'lucide-react';

// ============================================================================
// 메뉴 정의 (기획서 사이트맵 기반)
// ============================================================================

const menuItems: AdminShellMenuItem[] = [
  {
    label: '대시보드',
    href: '/showcase/cms',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: '콘텐츠 관리',
    icon: <FileText className="w-5 h-5" />,
    children: [
      { label: '고정 페이지', href: '/showcase/cms/pages' },
      { label: '메뉴 관리', href: '/showcase/cms/menus' },
      { label: '배너·팝업', href: '/showcase/cms/banners' },
    ],
  },
  {
    label: '게시판 관리',
    icon: <Newspaper className="w-5 h-5" />,
    children: [
      { label: '공지사항', href: '/showcase/cms/posts/notice' },
      { label: '보도자료', href: '/showcase/cms/posts/press' },
      { label: '자료실', href: '/showcase/cms/posts/archive' },
      { label: '채용·입찰', href: '/showcase/cms/posts/recruit' },
    ],
  },
  {
    label: '미디어 관리',
    href: '/showcase/cms/media',
    icon: <Image className="w-5 h-5" />,
  },
  {
    label: '사이트 설정',
    icon: <Settings className="w-5 h-5" />,
    children: [
      { label: '기본 정보', href: '/showcase/cms/settings' },
      { label: '계정 관리', href: '/showcase/cms/users' },
      { label: '휴지통', href: '/showcase/cms/trash' },
    ],
  },
];

// ============================================================================
// 활성 메뉴 표시
// ============================================================================

function markActive(
  items: AdminShellMenuItem[],
  pathname: string
): AdminShellMenuItem[] {
  return items.map((item) => ({
    ...item,
    active: item.href === pathname,
    children: item.children?.map((child) => ({
      ...child,
      active: child.href === pathname,
    })),
  }));
}

// ============================================================================
// Layout
// ============================================================================

export default function CmsShowcaseLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AdminShell
      menuItems={markActive(menuItems, pathname)}
      siteTitle="hanui CMS"
      onMenuClick={(href) => router.push(href)}
      header={
        <CmsHeader
          user={{ name: '관리자', role: 'SUPER_ADMIN' }}
          notificationCount={3}
          onNotificationClick={() => {}}
          onProfileClick={() => {}}
          onSettingsClick={() => router.push('/showcase/cms/settings')}
          onLogout={() => router.push('/showcase')}
        />
      }
    >
      {children}
    </AdminShell>
  );
}
