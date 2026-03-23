import type { Metadata } from 'next';
import GridPage from './content';

export const metadata: Metadata = {
  title: 'Grid CSS 그리드 레이아웃',
  description:
    'KRDS 기반 Grid 컴포넌트. CSS Grid 레이아웃을 구성하는 UI. 반응형 columns, gap 지원. React.',
  alternates: {
    canonical: '/components/grid',
  },
};

export default function Page() {
  return <GridPage />;
}
