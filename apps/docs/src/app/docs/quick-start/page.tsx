import type { Metadata } from 'next';
import QuickStartPage from './content';

export const metadata: Metadata = {
  title: '빠른 시작',
  description:
    'HANUI 컴포넌트 라이브러리 빠른 시작 가이드. 5분 안에 첫 컴포넌트를 사용해보세요.',
  alternates: {
    canonical: '/docs/quick-start',
  },
};

export default function Page() {
  return <QuickStartPage />;
}
