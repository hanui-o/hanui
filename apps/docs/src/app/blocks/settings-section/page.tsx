import type { Metadata } from 'next';
import SettingsSectionPage from './content';

export const metadata: Metadata = {
  title: 'Settings Section 설정 패널 블록',
  description:
    '토글 스위치로 설정을 관리하는 설정 패널 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/settings-section',
  },
};

export default function Page() {
  return <SettingsSectionPage />;
}
