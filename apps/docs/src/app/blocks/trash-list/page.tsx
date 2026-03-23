import type { Metadata } from 'next';
import TrashListPage from './content';

export const metadata: Metadata = {
  title: 'Trash List 휴지통 블록',
  description:
    '삭제된 항목을 목록으로 표시하고 복구/영구삭제 기능을 제공하는 CMS 블록. KRDS, React.',
  alternates: {
    canonical: '/blocks/trash-list',
  },
};

export default function Page() {
  return <TrashListPage />;
}
