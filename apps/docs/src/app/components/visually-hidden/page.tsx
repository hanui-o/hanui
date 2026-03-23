import type { Metadata } from 'next';
import VisuallyHiddenPage from './content';

export const metadata: Metadata = {
  title: 'Visually Hidden 접근성 유틸리티',
  description:
    '화면에는 보이지 않지만 스크린리더가 읽을 수 있는 Visually Hidden 접근성 유틸리티 컴포넌트. React.',
  alternates: {
    canonical: '/components/visually-hidden',
  },
};

export default function Page() {
  return <VisuallyHiddenPage />;
}
