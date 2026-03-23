import type { Metadata } from 'next';
import AspectRatioPage from './content';

export const metadata: Metadata = {
  title: 'AspectRatio 종횡비 컴포넌트',
  description:
    'KRDS 기반 AspectRatio 컴포넌트. 비디오, 지도, 이미지 임베드 시 종횡비를 유지하는 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/aspect-ratio',
  },
};

export default function Page() {
  return <AspectRatioPage />;
}
