import type { Metadata } from 'next';
import CarouselPage from './content';

export const metadata: Metadata = {
  title: 'Carousel 캐러셀 슬라이더',
  description:
    'KRDS 기반 Carousel 컴포넌트. Swiper.js 기반 터치/스와이프, 키보드 네비게이션 지원 슬라이더. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/carousel',
  },
};

export default function Page() {
  return <CarouselPage />;
}
