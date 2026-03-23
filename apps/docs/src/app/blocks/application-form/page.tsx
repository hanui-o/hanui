import type { Metadata } from 'next';
import ApplicationFormPage from './content';

export const metadata: Metadata = {
  title: 'Application Form 민원신청 폼 블록',
  description:
    '신청인 정보와 첨부파일을 포함한 민원신청 폼 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/application-form',
  },
};

export default function Page() {
  return <ApplicationFormPage />;
}
