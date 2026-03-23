import type { Metadata } from 'next';
import WrapPage from './content';

export const metadata: Metadata = {
  title: 'Wrap 자동 줄바꿈 레이아웃',
  description:
    'KRDS 기반 Wrap 컴포넌트. 공간 부족 시 자동 줄바꿈되는 flexbox 레이아웃. 태그 목록, 버튼 그룹에 적합. React.',
  alternates: {
    canonical: '/components/wrap',
  },
};

export default function Page() {
  return <WrapPage />;
}
