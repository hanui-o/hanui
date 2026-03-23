import type { Metadata } from 'next';
import SelectPage from './content';

export const metadata: Metadata = {
  title: 'Select 선택 목록 컴포넌트',
  description:
    'Radix UI 기반 Select 컴포넌트. 키보드 네비게이션, 스크린 리더 완전 지원 선택 목록 UI. KRDS 스타일. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/select',
  },
};

export default function Page() {
  return <SelectPage />;
}
