import type { Metadata } from 'next';
import NotificationSettingsPage from './content';

export const metadata: Metadata = {
  title: 'Notification Settings 알림 설정 블록',
  description:
    '이메일, SMS, 푸시 알림 수신을 설정하는 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/notification-settings',
  },
};

export default function Page() {
  return <NotificationSettingsPage />;
}
