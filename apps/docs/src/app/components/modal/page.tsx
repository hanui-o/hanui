import type { Metadata } from 'next';
import ModalPage from './content';

export const metadata: Metadata = {
  title: 'Modal 모달 다이얼로그',
  description:
    'Radix UI Dialog 기반 Modal 컴포넌트. 접근성 높은 모달 다이얼로그 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/modal',
  },
};

export default function Page() {
  return <ModalPage />;
}
