import type { Metadata } from 'next';
import DateInputPage from './content';

export const metadata: Metadata = {
  title: 'Date Input 날짜 입력 컴포넌트',
  description:
    'KRDS 기반 Date Input 컴포넌트. 단일 필드, 다중 필드(년/월/일), 범위 필드 세 가지 유형 지원. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/date-input',
  },
};

export default function Page() {
  return <DateInputPage />;
}
