import type { Metadata } from 'next';
import TeamMembersPage from './content';

export const metadata: Metadata = {
  title: 'Team Members 팀원 관리 블록',
  description:
    '팀원 목록을 관리하고 새 멤버를 초대하는 CMS 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/team-members',
  },
};

export default function Page() {
  return <TeamMembersPage />;
}
