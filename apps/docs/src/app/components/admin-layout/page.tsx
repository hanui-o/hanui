import type { Metadata } from 'next';
import AdminLayoutPage from './content';

export const metadata: Metadata = {
  title: 'Admin Layout - CMS 어드민 레이아웃',
  description:
    'KRDS 기반 Admin Layout 컴포넌트. CMS 어드민 페이지의 사이드바, 상단바, 메인 콘텐츠 영역 레이아웃.',
  alternates: {
    canonical: '/components/admin-layout',
  },
};

export default function Page() {
  return <AdminLayoutPage />;
}
