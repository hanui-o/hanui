import type { Metadata } from 'next';
import BreadcrumbPage from './content';

export const metadata: Metadata = {
  title: 'Breadcrumb 브레드크럼 탐색',
  description:
    'KRDS 기반 Breadcrumb(브레드크럼) 컴포넌트. 현재 위치 표시 및 상위 페이지 탐색 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/breadcrumb',
  },
};

export default function Page() {
  return <BreadcrumbPage />;
}
