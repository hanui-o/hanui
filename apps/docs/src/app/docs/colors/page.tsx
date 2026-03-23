import type { Metadata } from 'next';
import ColorsPage from './content';

export const metadata: Metadata = {
  title: 'Colors 색상 시스템',
  description:
    'KRDS 디자인 시스템 색상 토큰. Primary, Gray, Semantic 색상 팔레트 및 사용법 가이드.',
  alternates: {
    canonical: '/docs/colors',
  },
};

export default function Page() {
  return <ColorsPage />;
}
