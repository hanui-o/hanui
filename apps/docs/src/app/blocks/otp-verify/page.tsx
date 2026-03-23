import type { Metadata } from 'next';
import OtpVerifyPage from './content';

export const metadata: Metadata = {
  title: 'OTP Verify 인증번호 입력 블록',
  description: '인증번호를 입력하는 OTP 인증 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/otp-verify',
  },
};

export default function Page() {
  return <OtpVerifyPage />;
}
