import type { Metadata } from 'next';
import TabBarsPage from './content';

export const metadata: Metadata = {
  title: 'Tab Bars 하단 네비게이션',
  description:
    'KRDS 기반 Tab Bars 컴포넌트. 모바일/태블릿 하단 고정 네비게이션 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/tabbars',
  },
};

export default function Page() {
  return <TabBarsPage />;
}
