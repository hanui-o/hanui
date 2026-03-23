import type { Metadata } from 'next';
import NotificationKitPage from './content';

export const metadata: Metadata = {
  title: 'Notification Kit 알림 키트',
  description:
    'HANUI 알림 키트. 실시간 알림, 알림 목록, 읽음 처리 등 알림 기능 완성형 세트. React.',
  alternates: {
    canonical: '/kits/notification',
  },
};

export default function Page() {
  return <NotificationKitPage />;
}
