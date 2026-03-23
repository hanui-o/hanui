import type { Metadata } from 'next';
import ContactFormPage from './content';

export const metadata: Metadata = {
  title: 'Contact Form 문의 폼 블록',
  description:
    '이름, 이메일, 제목, 내용을 입력하는 문의 폼 UI 블록. KRDS, React, 접근성 AA.',
  alternates: {
    canonical: '/blocks/contact-form',
  },
};

export default function Page() {
  return <ContactFormPage />;
}
