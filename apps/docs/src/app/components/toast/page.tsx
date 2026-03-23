import type { Metadata } from 'next';
import ToastPage from './content';

export const metadata: Metadata = {
  title: 'Toast 토스트 알림',
  description:
    'Radix UI 기반 Toast 컴포넌트. 일시적 알림 메시지 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/toast',
  },
};

export default function Page() {
  return <ToastPage />;
}
