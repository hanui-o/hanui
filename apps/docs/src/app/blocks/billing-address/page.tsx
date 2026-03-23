import type { Metadata } from 'next';
import BillingAddressPage from './content';

export const metadata: Metadata = {
  title: 'Billing Address 주소 입력 블록',
  description: '배송지/청구지 주소를 입력하는 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/billing-address',
  },
};

export default function Page() {
  return <BillingAddressPage />;
}
