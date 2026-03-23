import type { Metadata } from 'next';
import InputPage from './content';

export const metadata: Metadata = {
  title: 'Input 입력 필드 컴포넌트',
  description:
    'KRDS 기반 Input 컴포넌트. 비밀번호 토글, 숫자 키보드 등 타입별 최적화. FormField 자동 통합. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/input',
  },
};

export default function Page() {
  return <InputPage />;
}
