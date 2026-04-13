'use client';

import { Breadcrumb, FileDownload, ContactForm, Body } from '@hanui/react';

const forms = [
  { name: '민원 접수 신청서', size: '120KB', extension: 'hwp', href: '#' },
  { name: '정보공개 청구서', size: '85KB', extension: 'hwp', href: '#' },
  { name: '개인정보 열람 청구서', size: '95KB', extension: 'pdf', href: '#' },
  { name: '이의신청서', size: '70KB', extension: 'docx', href: '#' },
];

export default function CivilPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: '홈', href: '/showcase/public' },
          { label: '민원안내', href: '/showcase/public/civil' },
          { label: '민원서식', isCurrent: true },
        ]}
      />

      <h1 className="text-2xl font-bold text-krds-gray-90 mt-6 mb-6">
        민원서식 다운로드
      </h1>

      <Body size="md" className="text-krds-gray-60 mb-6">
        민원 접수에 필요한 서식을 다운로드하실 수 있습니다. 작성 방법은 각
        서식의 안내를 참고해 주세요.
      </Body>

      <FileDownload title="민원 서식" files={forms} />

      <div className="mt-12">
        <h2 className="text-xl font-bold text-krds-gray-90 mb-6">
          온라인 문의
        </h2>
        <ContactForm
          onSubmit={(_data) => {
            alert('문의가 접수되었습니다.');
          }}
        />
      </div>
    </>
  );
}
