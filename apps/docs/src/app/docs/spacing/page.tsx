import type { Metadata } from 'next';
import SpacingPage from './content';

export const metadata: Metadata = {
  title: 'Spacing 여백 시스템',
  description:
    'KRDS 디자인 시스템의 Spacing(여백) 토큰. 일관된 간격 체계와 사용법 가이드.',
  alternates: {
    canonical: '/docs/spacing',
  },
};

export default function Page() {
  return <SpacingPage />;
}
