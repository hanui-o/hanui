import type { Metadata } from 'next';
import SliderPage from './content';

export const metadata: Metadata = {
  title: 'Slider 슬라이더 컴포넌트',
  description:
    'KRDS 기반 Slider 컴포넌트. 범위 내 값 선택, 단일 값/범위 선택 지원. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/slider',
  },
};

export default function Page() {
  return <SliderPage />;
}
