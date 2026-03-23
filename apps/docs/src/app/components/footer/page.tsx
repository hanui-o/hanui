import type { Metadata } from 'next';
import FooterPage from './content';

export const metadata: Metadata = {
  title: 'Footer 푸터 컴포넌트',
  description:
    'KRDS 표준 Footer(푸터) 컴포넌트. 정부 서비스 푸터 구조. CSS Modules, 반응형, WCAG 2.1 접근성 준수. React.',
  alternates: {
    canonical: '/components/footer',
  },
};

export default function Page() {
  return <FooterPage />;
}
