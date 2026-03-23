import type { Metadata } from 'next';
import ImagePage from './content';

export const metadata: Metadata = {
  title: 'Image 이미지 컴포넌트',
  description:
    'Next.js 자동 최적화 지원 반응형 Image 컴포넌트. KRDS 스타일. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/image',
  },
};

export default function Page() {
  return <ImagePage />;
}
