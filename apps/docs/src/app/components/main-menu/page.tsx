import type { Metadata } from 'next';
import MainMenuPage from './content';

export const metadata: Metadata = {
  title: 'Main Menu 메인 메뉴 컴포넌트',
  description:
    'KRDS 기반 Main Menu 컴포넌트. 메가메뉴, 네비게이션메뉴, 패널메뉴 3가지 독립 컴포넌트. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/main-menu',
  },
};

export default function Page() {
  return <MainMenuPage />;
}
