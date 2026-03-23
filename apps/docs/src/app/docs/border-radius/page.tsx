import type { Metadata } from 'next';
import BorderRadiusPage from './content';

export const metadata: Metadata = {
  title: 'Border Radius 모서리 둥글기',
  description:
    'KRDS 디자인 시스템의 Border Radius(모서리 둥글기) 토큰. 컴포넌트별 적용 가이드.',
  alternates: {
    canonical: '/docs/border-radius',
  },
};

export default function Page() {
  return <BorderRadiusPage />;
}
