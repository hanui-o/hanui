import type { Metadata } from 'next';
import GovLoginPage from './content';

export const metadata: Metadata = {
  title: 'Gov Login 정부 로그인 블록',
  description:
    '정부24 스타일 로그인 블록. 아이디/간편인증/공동인증서 탭 지원. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/gov-login',
  },
};

export default function Page() {
  return <GovLoginPage />;
}
