import type { Metadata } from 'next';
import SiteSettingsPage from './content';

export const metadata: Metadata = {
  title: 'Site Settings 사이트 설정 블록',
  description:
    'CMS 사이트 기본 정보 설정 폼. 기관명, 로고, 주소, 전화번호 등. KRDS, React.',
  alternates: {
    canonical: '/blocks/site-settings',
  },
};

export default function Page() {
  return <SiteSettingsPage />;
}
