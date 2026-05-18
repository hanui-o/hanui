import type { Metadata } from 'next';
import LineChartPage from './content';

export const metadata: Metadata = {
  title: 'Line Chart 선 차트 (Visx)',
  description:
    'Visx 기반 선 차트 블록. linear/monotone/step 곡선, 데이터 포인트, KRDS 색상. React.',
  alternates: {
    canonical: '/blocks/line-chart',
  },
};

export default function Page() {
  return <LineChartPage />;
}
