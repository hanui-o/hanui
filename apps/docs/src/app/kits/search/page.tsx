import type { Metadata } from 'next';
import SearchKitPage from './content';

export const metadata: Metadata = {
  title: 'Search Kit 검색 키트',
  description:
    'HANUI 검색 키트. 검색, 자동완성, 인기 검색어, 검색 결과 등 검색 기능 완성형 세트. React, Zustand.',
  alternates: {
    canonical: '/kits/search',
  },
};

export default function Page() {
  return <SearchKitPage />;
}
