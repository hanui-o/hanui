import type { Metadata } from 'next';
import LabelPage from './content';

export const metadata: Metadata = {
  title: 'Label 라벨 컴포넌트',
  description:
    'KRDS 기반 Label 컴포넌트. 폼 요소를 위한 라벨 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/label',
  },
};

export default function Page() {
  return <LabelPage />;
}
