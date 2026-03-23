import type { Metadata } from 'next';
import PricingTablePage from './content';

export const metadata: Metadata = {
  title: 'Pricing Table 가격표 블록',
  description:
    '플랜 비교 및 선택이 가능한 가격표 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/pricing-table',
  },
};

export default function Page() {
  return <PricingTablePage />;
}
