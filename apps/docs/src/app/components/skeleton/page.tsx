import type { Metadata } from 'next';
import SkeletonPage from './content';

export const metadata: Metadata = {
  title: 'Skeleton 로딩 플레이스홀더',
  description:
    'KRDS 기반 Skeleton 컴포넌트. 콘텐츠 로딩 중 표시되는 플레이스홀더 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/skeleton',
  },
};

export default function Page() {
  return <SkeletonPage />;
}
