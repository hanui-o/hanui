import type { Metadata } from 'next';
import StatsCardPage from './content';

export const metadata: Metadata = {
  title: 'Stats Card 통계 카드 블록',
  description:
    '숫자, 변화율을 표시하는 통계 카드 그리드 UI 블록. 대시보드용. KRDS, React.',
  alternates: {
    canonical: '/blocks/stats-card',
  },
};

export default function Page() {
  return <StatsCardPage />;
}
