import type { Metadata } from 'next';
import ProfileCardPage from './content';

export const metadata: Metadata = {
  title: 'Profile Card 프로필 카드 블록',
  description:
    '아바타, 이름, 역할, 연락처를 표시하는 프로필 카드 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/profile-card',
  },
};

export default function Page() {
  return <ProfileCardPage />;
}
