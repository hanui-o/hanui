import type { Metadata } from 'next';
import LoginFormPage from './content';

export const metadata: Metadata = {
  title: 'Login Form 로그인 폼 블록',
  description:
    '아이디, 비밀번호, 자동 로그인을 포함한 로그인 폼 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/login-form',
  },
};

export default function Page() {
  return <LoginFormPage />;
}
