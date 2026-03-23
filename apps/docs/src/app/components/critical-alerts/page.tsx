import type { Metadata } from 'next';
import CriticalAlertsPage from './content';

export const metadata: Metadata = {
  title: 'Critical Alerts 긴급 공지',
  description:
    'KRDS 기반 Critical Alerts 컴포넌트. 긴급하거나 중요한 정보를 전달하는 UI. KRDS 긴급 공지 가이드라인 준수. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/critical-alerts',
  },
};

export default function Page() {
  return <CriticalAlertsPage />;
}
