import type { Metadata } from 'next';
import ContainerPage from './content';

export const metadata: Metadata = {
  title: 'Container 반응형 컨테이너',
  description:
    'KRDS 레이아웃 시스템 기반 반응형 Container 컴포넌트. 최대 너비 제한 및 자동 패딩. React.',
  alternates: {
    canonical: '/components/container',
  },
};

export default function Page() {
  return <ContainerPage />;
}
