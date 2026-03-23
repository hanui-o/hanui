import type { Metadata } from 'next';
import BoardKitPage from './content';

export const metadata: Metadata = {
  title: 'Board Kit 게시판 키트',
  description:
    'HANUI 게시판 키트. 게시글 CRUD, 검색, 페이지네이션, 댓글 등 게시판 완성형 세트. React, Zustand, React Query.',
  alternates: {
    canonical: '/kits/board',
  },
};

export default function Page() {
  return <BoardKitPage />;
}
