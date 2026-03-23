import type { Metadata } from 'next';
import FlexPage from './content';

export const metadata: Metadata = {
  title: 'Flex 플렉스박스 레이아웃',
  description:
    'KRDS 기반 Flex 컴포넌트. Flexbox 레이아웃을 쉽게 구성하는 UI. React.',
  alternates: {
    canonical: '/components/flex',
  },
};

export default function Page() {
  return <FlexPage />;
}
