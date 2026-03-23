import type { Metadata } from 'next';
import TagPage from './content';

export const metadata: Metadata = {
  title: 'Tag 태그 컴포넌트',
  description:
    'KRDS 기반 Tag 컴포넌트. 키워드/레이블로 콘텐츠를 분류하는 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/tag',
  },
};

export default function Page() {
  return <TagPage />;
}
