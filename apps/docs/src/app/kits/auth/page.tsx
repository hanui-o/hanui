import type { Metadata } from 'next';
import AuthKitPage from './content';

export const metadata: Metadata = {
  title: 'Auth Kit 인증 키트',
  description:
    'HANUI 인증 키트. 로그인, 회원가입, OTP, 비밀번호 찾기 등 인증 기능 완성형 세트. React, Zustand, React Query.',
  alternates: {
    canonical: '/kits/auth',
  },
};

export default function Page() {
  return <AuthKitPage />;
}
