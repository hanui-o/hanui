import type { Metadata } from 'next';
import PaymentCardPage from './content';

export const metadata: Metadata = {
  title: 'Payment Card 카드 결제 폼 블록',
  description:
    '카드번호, 유효기간, CVV를 입력하는 카드 결제 폼 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/payment-card',
  },
};

export default function Page() {
  return <PaymentCardPage />;
}
