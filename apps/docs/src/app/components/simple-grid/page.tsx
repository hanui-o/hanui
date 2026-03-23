import type { Metadata } from 'next';
import SimpleGridPage from './content';

export const metadata: Metadata = {
  title: 'SimpleGrid 간단 그리드 레이아웃',
  description:
    'KRDS 기반 SimpleGrid 컴포넌트. 자동 반응형 그리드 레이아웃 생성. minChildWidth, columns 지원. React.',
  alternates: {
    canonical: '/components/simple-grid',
  },
};

export default function Page() {
  return <SimpleGridPage />;
}
