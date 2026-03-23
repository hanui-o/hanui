import type { Metadata } from 'next';
import BoardManagementPage from './content';

export const metadata: Metadata = {
  title: 'Board Management 게시판 관리 블록',
  description:
    '게시판별 게시글 관리, 상태 필터, 일괄 작업, 고정 기능을 제공하는 CMS 블록. KRDS, React.',
  alternates: {
    canonical: '/blocks/board-management',
  },
};

export default function Page() {
  return <BoardManagementPage />;
}
