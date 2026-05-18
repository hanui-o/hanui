import type { Metadata } from 'next';
import PieChartPage from './content';

export const metadata: Metadata = {
  title: 'Pie Chart 파이/도넛 차트 (Visx)',
  description:
    'Visx 기반 파이 차트 블록. innerRadius로 도넛 전환, 슬라이스 라벨, KRDS 색상. React.',
  alternates: {
    canonical: '/blocks/pie-chart',
  },
};

export default function Page() {
  return <PieChartPage />;
}
