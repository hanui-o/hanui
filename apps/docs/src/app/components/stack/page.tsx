import type { Metadata } from 'next';
import StackPage from './content';

export const metadata: Metadata = {
  title: 'Stack - 레이아웃 간격 컴포넌트',
  description:
    'KRDS 기반 Stack, VStack, HStack 레이아웃 컴포넌트. 요소 간 gap(간격)을 관리하고 수직/수평 정렬을 제어하는 UI. React, 접근성 AA 준수.',
  keywords: [
    'stack',
    'stack gap',
    'stack component',
    'VStack',
    'HStack',
    '레이아웃',
    'React layout',
    'KRDS',
  ],
  alternates: {
    canonical: '/components/stack',
  },
};

export default function Page() {
  return <StackPage />;
}
