import type { Metadata } from 'next';
import GettingStartedPage from './content';

export const metadata: Metadata = {
  title: 'Kits 시작하기',
  description: 'HANUI Kits 시작 가이드. 키트 설치, 설정, API 연동 방법 안내.',
  alternates: {
    canonical: '/kits/getting-started',
  },
};

export default function Page() {
  return <GettingStartedPage />;
}
