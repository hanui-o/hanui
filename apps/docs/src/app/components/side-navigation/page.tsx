import type { Metadata } from 'next';
import SideNavigationPage from './content';

export const metadata: Metadata = {
  title: 'Side Navigation 사이드 네비게이션',
  description:
    'KRDS 표준 Side Navigation 컴포넌트. 최대 4단계 depth, 토글 기능, 접근성 속성 자동 관리. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/side-navigation',
  },
};

export default function Page() {
  return <SideNavigationPage />;
}
