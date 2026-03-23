import type { Metadata } from 'next';
import FormFieldPage from './content';

export const metadata: Metadata = {
  title: 'FormField 폼 필드 컴포넌트',
  description:
    'KRDS 기반 FormField 컴포넌트. 레이블, 입력, 에러 메시지, 도움말을 자동 연결하는 접근성 완전 폼 필드. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/form-field',
  },
};

export default function Page() {
  return <FormFieldPage />;
}
