import type { Metadata } from 'next';
import LinkPage from './content';

export const metadata: Metadata = {
  title: 'Link 링크 컴포넌트',
  description:
    'KRDS 기반 Link 컴포넌트. 하이퍼링크 표시 UI. 외부 링크 처리 지원. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/link',
  },
};

export default function Page() {
  return <LinkPage />;
}
