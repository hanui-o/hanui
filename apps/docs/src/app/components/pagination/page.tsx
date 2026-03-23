import type { Metadata } from 'next';
import PaginationPage from './content';

export const metadata: Metadata = {
  title: 'Pagination 페이지네이션',
  description:
    'KRDS 기반 Pagination(페이지네이션) 컴포넌트. 페이지 네비게이션 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/pagination',
  },
};

export default function Page() {
  return <PaginationPage />;
}
