import type { Metadata } from 'next';
import SearchBarPage from './content';

export const metadata: Metadata = {
  title: 'Search Bar 검색 바 블록',
  description:
    '카테고리 필터가 포함된 검색 바 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/search-bar',
  },
};

export default function Page() {
  return <SearchBarPage />;
}
