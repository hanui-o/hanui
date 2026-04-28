import type { Metadata } from 'next';
import SidebarPage from './content';

export const metadata: Metadata = {
  title: 'Sidebar 사이드바',
  description:
    '어드민/대시보드용 좌측 사이드바. 접기/펼치기, 2depth 메뉴 트리, 활성 상태 자동 펼침. WCAG 2.1 / KWCAG 2.2 준수.',
  alternates: {
    canonical: '/components/sidebar',
  },
};

export default function Page() {
  return <SidebarPage />;
}
