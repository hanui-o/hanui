import type { Metadata } from 'next';
import AreaChartPage from './content';

export const metadata: Metadata = {
  title: 'Area Chart 영역 차트 (Visx)',
  description:
    'Visx 기반 영역 차트 블록. 선 + 영역 채움 조합, monotone/linear 곡선, 누적 수치 시각화. React.',
  alternates: {
    canonical: '/blocks/area-chart',
  },
};

export default function Page() {
  return <AreaChartPage />;
}
