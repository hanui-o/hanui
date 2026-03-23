import type { Metadata } from 'next';
import TabsPage from './content';

export const metadata: Metadata = {
  title: 'Tabs 탭 네비게이션',
  description:
    'KRDS 기반 Tabs 컴포넌트. 여러 콘텐츠 영역을 전환하는 탭 네비게이션 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/tabs',
  },
};

export default function Page() {
  return <TabsPage />;
}
