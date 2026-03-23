import type { Metadata } from 'next';
import CenterPage from './content';

export const metadata: Metadata = {
  title: 'Center 중앙 정렬 레이아웃',
  description:
    'KRDS 기반 Center 컴포넌트. 콘텐츠를 수평/수직 중앙에 배치하는 레이아웃 UI. React.',
  alternates: {
    canonical: '/components/center',
  },
};

export default function Page() {
  return <CenterPage />;
}
