import type { Metadata } from 'next';
import FormKitPage from './content';

export const metadata: Metadata = {
  title: 'Form Kit 폼 키트',
  description:
    'HANUI 폼 키트. 폼 빌더, 유효성 검증, 다단계 폼 등 폼 기능 완성형 세트. React, Zod.',
  alternates: {
    canonical: '/kits/form',
  },
};

export default function Page() {
  return <FormKitPage />;
}
