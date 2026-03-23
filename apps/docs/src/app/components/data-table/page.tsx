import type { Metadata } from 'next';
import DataTablePage from './content';

export const metadata: Metadata = {
  title: 'DataTable 데이터 테이블',
  description:
    'TanStack Table 기반 DataTable 컴포넌트. 정렬, 필터링, 페이지네이션, 행 선택 기능 제공. KRDS 스타일. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/data-table',
  },
};

export default function Page() {
  return <DataTablePage />;
}
