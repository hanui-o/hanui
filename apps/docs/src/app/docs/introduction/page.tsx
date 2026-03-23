import type { Metadata } from 'next';
import IntroductionPage from './content';

export const metadata: Metadata = {
  title: '소개',
  description:
    'HANUI는 KRDS 2.2 기반 공공 웹 개발용 React 컴포넌트 라이브러리입니다. 접근성 AA, TypeScript 지원.',
  alternates: {
    canonical: '/docs/introduction',
  },
};

export default function Page() {
  return <IntroductionPage />;
}
