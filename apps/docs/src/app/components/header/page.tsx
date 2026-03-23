import type { Metadata } from 'next';
import HeaderPage from './content';

export const metadata: Metadata = {
  title: 'Header 헤더 컴포넌트',
  description:
    'KRDS 표준 Header 컴포넌트. 메가메뉴, 네비게이션, 패널메뉴 3가지 버전 제공. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/header',
  },
};

export default function Page() {
  return <HeaderPage />;
}
