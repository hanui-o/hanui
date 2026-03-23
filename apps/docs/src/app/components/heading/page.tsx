import type { Metadata } from 'next';
import HeadingPage from './content';

export const metadata: Metadata = {
  title: 'Heading 제목 컴포넌트',
  description:
    'KRDS 타이포그래피 시스템 Heading 컴포넌트. 시맨틱 HTML(h1-h5), 자동 ID 생성, TOC 링크 지원. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/heading',
  },
};

export default function Page() {
  return <HeadingPage />;
}
