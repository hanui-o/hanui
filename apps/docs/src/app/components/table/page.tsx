import type { Metadata } from 'next';
import TablePage from './content';

export const metadata: Metadata = {
  title: 'Table 테이블 컴포넌트',
  description:
    'KRDS 기반 Table 컴포넌트. 데이터를 구조화하여 표시하는 테이블 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/table',
  },
};

export default function Page() {
  return <TablePage />;
}
