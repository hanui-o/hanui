import type { Metadata } from 'next';
import ButtonPage from './content';

export const metadata: Metadata = {
  title: 'Button 버튼 컴포넌트',
  description:
    'KRDS 기반 Button(버튼) 컴포넌트. primary, secondary, danger, ghost 등 다양한 variant와 크기 지원. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/button',
  },
};

export default function Page() {
  return <ButtonPage />;
}
