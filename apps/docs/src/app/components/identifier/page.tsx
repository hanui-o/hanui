import type { Metadata } from 'next';
import IdentifierPage from './content';

export const metadata: Metadata = {
  title: 'Identifier 기관 식별 컴포넌트',
  description:
    'KRDS 기반 Identifier 컴포넌트. 정부 디지털 서비스 운영 기관 식별 UI. Footer 내 배치. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/identifier',
  },
};

export default function Page() {
  return <IdentifierPage />;
}
