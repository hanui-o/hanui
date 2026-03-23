import type { Metadata } from 'next';
import RadioPage from './content';

export const metadata: Metadata = {
  title: 'Radio 라디오 버튼 컴포넌트',
  description:
    'KRDS 기반 Radio(라디오) 컴포넌트. 여러 옵션 중 하나만 선택하는 단일 선택 UI. FormField 통합. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/radio',
  },
};

export default function Page() {
  return <RadioPage />;
}
