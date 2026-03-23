import type { Metadata } from 'next';
import ServiceCardGridPage from './content';

export const metadata: Metadata = {
  title: 'Service Card Grid 서비스 카드 블록',
  description:
    '정부24 스타일 서비스 카드 그리드 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/service-card-grid',
  },
};

export default function Page() {
  return <ServiceCardGridPage />;
}
