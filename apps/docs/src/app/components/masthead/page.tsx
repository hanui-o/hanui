import type { Metadata } from 'next';
import MastheadPage from './content';

export const metadata: Metadata = {
  title: 'Masthead 정부 인증 배너',
  description:
    'KRDS 표준 Masthead 컴포넌트. 대한민국 공식 전자정부 누리집 인증 배너. 정부 서비스 통일성 제공. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/masthead',
  },
};

export default function Page() {
  return <MastheadPage />;
}
