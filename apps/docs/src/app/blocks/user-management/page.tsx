import type { Metadata } from 'next';
import UserManagementPage from './content';

export const metadata: Metadata = {
  title: 'User Management 사용자 관리 블록',
  description:
    '관리자 계정을 목록으로 표시하고 추가/수정/삭제 기능을 제공하는 CMS 블록. KRDS, React.',
  alternates: {
    canonical: '/blocks/user-management',
  },
};

export default function Page() {
  return <UserManagementPage />;
}
