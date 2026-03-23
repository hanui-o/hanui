import type { Metadata } from 'next';
import SpinnerPage from './content';

export const metadata: Metadata = {
  title: 'Spinner 로딩 스피너',
  description:
    'KRDS 기반 Spinner 컴포넌트. 로딩 상태를 표시하는 회전 애니메이션 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/spinner',
  },
};

export default function Page() {
  return <SpinnerPage />;
}
