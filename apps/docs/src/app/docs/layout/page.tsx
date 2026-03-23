import type { Metadata } from 'next';
import LayoutPage from './content';

export const metadata: Metadata = {
  title: 'Layout 레이아웃 시스템',
  description:
    'KRDS 디자인 시스템의 레이아웃 가이드. Container, Grid, 반응형 브레이크포인트 설정.',
  alternates: {
    canonical: '/docs/layout',
  },
};

export default function Page() {
  return <LayoutPage />;
}
