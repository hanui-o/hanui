import type { Metadata } from 'next';
import ListPage from './content';

export const metadata: Metadata = {
  title: 'List 리스트 컴포넌트',
  description:
    'KRDS 기반 List 컴포넌트. 항목을 깔끔하게 나열하는 리스트 UI. 순서/비순서/체크 variant 지원. React.',
  alternates: {
    canonical: '/components/list',
  },
};

export default function Page() {
  return <ListPage />;
}
