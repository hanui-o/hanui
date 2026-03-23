import type { Metadata } from 'next';
import CardPage from './content';

export const metadata: Metadata = {
  title: 'Card 카드 컴포넌트',
  description:
    'KRDS 기반 Card 컴포넌트. 관련 콘텐츠를 그룹화하여 표시하는 유연한 컨테이너 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/card',
  },
};

export default function Page() {
  return <CardPage />;
}
