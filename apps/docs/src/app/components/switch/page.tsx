import type { Metadata } from 'next';
import SwitchPage from './content';

export const metadata: Metadata = {
  title: 'Switch 토글 스위치',
  description:
    'KRDS 기반 Switch 컴포넌트. 켜기/끄기 상태 전환 토글 UI. FormField 통합. React, 접근성 AA 준수.',
  alternates: {
    canonical: '/components/switch',
  },
};

export default function Page() {
  return <SwitchPage />;
}
