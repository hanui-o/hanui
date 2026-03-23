import type { Metadata } from 'next';
import AlertPage from './content';

export const metadata: Metadata = {
  title: 'Alert 알림 메시지 컴포넌트',
  description:
    'KRDS 기반 Alert 컴포넌트. 사용자에게 중요한 정보를 알리는 정적 메시지 UI. info, success, warning, error variant 지원. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/alert',
  },
};

export default function Page() {
  return <AlertPage />;
}
