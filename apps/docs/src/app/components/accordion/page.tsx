import type { Metadata } from 'next';
import AccordionPage from './content';

export const metadata: Metadata = {
  title: 'Accordion 아코디언',
  description:
    'KRDS 기반 Accordion(아코디언) 컴포넌트. 접었다 펼칠 수 있는 콘텐츠 섹션 UI. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/accordion',
  },
};

export default function Page() {
  return <AccordionPage />;
}
