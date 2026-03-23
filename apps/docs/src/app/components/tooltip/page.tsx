import type { Metadata } from 'next';
import TooltipPage from './content';

export const metadata: Metadata = {
  title: 'Tooltip 툴팁 컴포넌트',
  description:
    'KRDS 2.2 기반 Tooltip 컴포넌트. 마우스 오버/키보드 포커스 시 추가 정보 표시. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/tooltip',
  },
};

export default function Page() {
  return <TooltipPage />;
}
