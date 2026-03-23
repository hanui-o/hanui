import type { Metadata } from 'next';
import TextareaPage from './content';

export const metadata: Metadata = {
  title: 'Textarea 여러 줄 입력 필드',
  description:
    'KRDS 기반 Textarea 컴포넌트. 자동 높이 조절, FormField 자동 통합 지원 여러 줄 입력 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/textarea',
  },
};

export default function Page() {
  return <TextareaPage />;
}
