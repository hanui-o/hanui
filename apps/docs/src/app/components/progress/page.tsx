import type { Metadata } from 'next';
import ProgressPage from './content';

export const metadata: Metadata = {
  title: 'Progress 진행률 표시 컴포넌트',
  description:
    'KRDS 기반 Progress 컴포넌트. 작업 진행 상태를 시각적으로 표시하는 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/progress',
  },
};

export default function Page() {
  return <ProgressPage />;
}
