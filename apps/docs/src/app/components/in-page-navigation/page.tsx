import type { Metadata } from 'next';
import InPageNavigationPage from './content';

export const metadata: Metadata = {
  title: 'In-page Navigation 페이지 내 탐색',
  description:
    'KRDS 기반 In-page Navigation 컴포넌트. 스크롤 위치에 따라 활성 링크가 업데이트되는 고정 사이드바 네비게이션. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/in-page-navigation',
  },
};

export default function Page() {
  return <InPageNavigationPage />;
}
