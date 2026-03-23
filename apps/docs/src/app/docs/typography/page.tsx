import type { Metadata } from 'next';
import TypographyPage from './content';

export const metadata: Metadata = {
  title: 'Typography 타이포그래피',
  description:
    'KRDS 디자인 시스템의 Typography 토큰. Pretendard GOV 폰트, 크기, 행간 설정 가이드.',
  alternates: {
    canonical: '/docs/typography',
  },
};

export default function Page() {
  return <TypographyPage />;
}
