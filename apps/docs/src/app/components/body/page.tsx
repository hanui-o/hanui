import type { Metadata } from 'next';
import BodyPage from './content';

export const metadata: Metadata = {
  title: 'Body 본문 텍스트 컴포넌트',
  description:
    'KRDS 기반 Body 컴포넌트. 본문 텍스트를 위한 타이포그래피 컴포넌트. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/body',
  },
};

export default function Page() {
  return <BodyPage />;
}
