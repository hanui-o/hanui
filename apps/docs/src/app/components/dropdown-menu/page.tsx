import type { Metadata } from 'next';
import DropdownMenuPage from './content';

export const metadata: Metadata = {
  title: 'DropdownMenu 드롭다운 메뉴',
  description:
    'Radix UI 기반 DropdownMenu 컴포넌트. 체크박스, 라디오, 하위 메뉴 지원 액션 메뉴. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/dropdown-menu',
  },
};

export default function Page() {
  return <DropdownMenuPage />;
}
