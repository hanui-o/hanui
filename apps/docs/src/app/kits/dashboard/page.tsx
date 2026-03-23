import type { Metadata } from 'next';
import DashboardKitPage from './content';

export const metadata: Metadata = {
  title: 'Dashboard Kit 대시보드 키트',
  description:
    'HANUI 대시보드 키트. 통계 카드, 차트, 최근 활동 등 대시보드 완성형 세트. React.',
  alternates: {
    canonical: '/kits/dashboard',
  },
};

export default function Page() {
  return <DashboardKitPage />;
}
