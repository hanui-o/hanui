import type { Metadata } from 'next';
import DisclosurePage from './content';

export const metadata: Metadata = {
  title: 'Disclosure - 펼침/접힘 UI 컴포넌트',
  description:
    'KRDS 기반 Disclosure 컴포넌트. 부가 정보를 표시하거나 숨기는 펼침/접힘 UI. Accordion과 달리 단독 사용, 동시 열기 가능. React, 접근성 AA 준수.',
  keywords: [
    'disclosure',
    'disclosure ui',
    '펼침',
    '접힘',
    'collapsible',
    'React disclosure',
    'KRDS',
  ],
  alternates: {
    canonical: '/components/disclosure',
  },
};

export default function Page() {
  return <DisclosurePage />;
}
