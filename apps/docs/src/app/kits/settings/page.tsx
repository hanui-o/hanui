import type { Metadata } from 'next';
import SettingsKitPage from './content';

export const metadata: Metadata = {
  title: 'Settings Kit 설정 키트',
  description:
    'HANUI 설정 키트. 프로필, 알림, 보안, 외관 설정 등 설정 기능 완성형 세트. React.',
  alternates: {
    canonical: '/kits/settings',
  },
};

export default function Page() {
  return <SettingsKitPage />;
}
