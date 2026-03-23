import type { Metadata } from 'next';
import StructuredListPage from './content';

export const metadata: Metadata = {
  title: 'Structured List 구조화 목록',
  description:
    'KRDS 기반 Structured List 컴포넌트. 복잡한 콘텐츠를 카드 형식으로 정리하여 표시. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/structured-list',
  },
};

export default function Page() {
  return <StructuredListPage />;
}
