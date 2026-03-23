import type { Metadata } from 'next';
import AccountRecoveryPage from './content';

export const metadata: Metadata = {
  title: 'Account Recovery 계정 찾기 블록',
  description:
    '아이디 찾기와 비밀번호 찾기를 탭으로 제공하는 계정 찾기 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/account-recovery',
  },
};

export default function Page() {
  return <AccountRecoveryPage />;
}
