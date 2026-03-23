import type { Metadata } from 'next';
import TableKitPage from './content';

export const metadata: Metadata = {
  title: 'Table Kit 테이블 키트',
  description:
    'HANUI 테이블 키트. 정렬, 필터, 페이지네이션, 행 선택 등 고급 테이블 기능 완성형 세트. React, TanStack Table.',
  alternates: {
    canonical: '/kits/table',
  },
};

export default function Page() {
  return <TableKitPage />;
}
