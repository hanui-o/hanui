import type { Metadata } from 'next';
import BarChartPage from './content';

export const metadata: Metadata = {
  title: 'Bar Chart 바 차트 (Visx)',
  description:
    'Visx 기반 바 차트 블록. 수직/수평 방향, KRDS 색상, 반응형, 접근성 대체 테이블 지원. React.',
  alternates: {
    canonical: '/blocks/bar-chart',
  },
};

export default function Page() {
  return <BarChartPage />;
}
