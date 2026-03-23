import type { Metadata } from 'next';
import InstallationPage from './content';

export const metadata: Metadata = {
  title: '설치 가이드',
  description:
    'HANUI 컴포넌트 라이브러리 설치 방법. CLI 설치, 수동 설치, Next.js/Vite 프로젝트 설정 가이드.',
  alternates: {
    canonical: '/docs/installation',
  },
};

export default function Page() {
  return <InstallationPage />;
}
