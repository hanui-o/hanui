import type { Metadata } from 'next';
import BadgePage from './content';

export const metadata: Metadata = {
  title: 'Badge 뱃지 - 상태 표시 UI 컴포넌트',
  description:
    'KRDS 기반 Badge(뱃지) 컴포넌트. 상태, 카테고리, 알림 개수를 표시하는 라벨 UI. NumberBadge, DotBadge, BadgeGroup 포함. React, 접근성 AA 준수.',
  keywords: [
    '뱃지',
    'badge',
    'UI 컴포넌트',
    '상태 표시',
    'React badge',
    'KRDS',
  ],
  alternates: {
    canonical: '/components/badge',
  },
};

export default function Page() {
  return <BadgePage />;
}
