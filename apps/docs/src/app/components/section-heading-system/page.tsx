import type { Metadata } from 'next';
import HeadingSystemPage from './content';

export const metadata: Metadata = {
  title: 'Section Heading System 섹션 헤딩',
  description:
    'KRDS Gap-layout 자동 준수 Section Heading System. 헤딩 간 간격, 헤딩-본문 간격을 CSS 인접 선택자로 자동 관리. React.',
  alternates: {
    canonical: '/components/section-heading-system',
  },
};

export default function Page() {
  return <HeadingSystemPage />;
}
