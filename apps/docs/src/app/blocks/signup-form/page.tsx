import type { Metadata } from 'next';
import SignupFormPage from './content';

export const metadata: Metadata = {
  title: 'Signup Form 회원가입 폼 블록',
  description:
    '이름, 이메일, 비밀번호, 약관동의를 포함한 회원가입 폼 UI 블록. SNS 로그인 옵션. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/signup-form',
  },
};

export default function Page() {
  return <SignupFormPage />;
}
