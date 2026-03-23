import type { Metadata } from 'next';
import CheckboxPage from './content';

export const metadata: Metadata = {
  title: 'Checkbox 체크박스 컴포넌트',
  description:
    'KRDS 기반 Checkbox(체크박스) 컴포넌트. 여러 옵션 중 복수 선택 가능한 UI. FormField 통합 지원. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/checkbox',
  },
};

export default function Page() {
  return <CheckboxPage />;
}
