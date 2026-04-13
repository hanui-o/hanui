'use client';

import { useParams } from 'next/navigation';
import { Breadcrumb, FileDownload, Body, Button } from '@hanui/react';

export default function NoticeDetailPage() {
  const { id: _id } = useParams();

  return (
    <>
      <Breadcrumb
        items={[
          { label: '홈', href: '/showcase/public' },
          { label: '알림마당', href: '/showcase/public/notice' },
          { label: '공지사항', href: '/showcase/public/notice' },
          { label: '상세', isCurrent: true },
        ]}
      />

      <article className="mt-6">
        <header className="border-b border-krds-gray-20 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-krds-gray-90 mb-2">
            2026년 상반기 정보화 사업 계획 공고
          </h1>
          <div className="flex items-center gap-4">
            <Body size="sm" className="text-krds-gray-50">
              작성일: 2026-04-10
            </Body>
            <Body size="sm" className="text-krds-gray-50">
              조회수: 1,234
            </Body>
            <Body size="sm" className="text-krds-gray-50">
              작성자: 관리자
            </Body>
          </div>
        </header>

        <div className="prose max-w-none mb-8">
          <p>안녕하세요. ○○기관입니다.</p>
          <p>
            2026년 상반기 정보화 사업 계획을 다음과 같이 공고합니다. 자세한
            내용은 첨부파일을 참고하시기 바랍니다.
          </p>
          <h2>1. 사업 개요</h2>
          <ul>
            <li>사업명: 2026년 상반기 정보화 사업</li>
            <li>사업 기간: 2026년 4월 ~ 2026년 9월</li>
            <li>예산: 5억원</li>
          </ul>
          <h2>2. 참가 자격</h2>
          <p>
            국가를 당사자로 하는 계약에 관한 법률 시행령 제12조에 해당하는
            자로서, 관련 분야 수행 실적이 있는 업체
          </p>
          <h2>3. 문의</h2>
          <p>○○기관 정보화팀 (02-1234-5678)</p>
        </div>

        <FileDownload
          files={[
            {
              name: '2026년 상반기 사업계획서',
              size: '2.3MB',
              extension: 'hwp',
              href: '#',
            },
            {
              name: '제안요청서(RFP)',
              size: '1.8MB',
              extension: 'pdf',
              href: '#',
            },
            {
              name: '참가신청서 양식',
              size: '45KB',
              extension: 'docx',
              href: '#',
            },
          ]}
        />

        <div className="flex gap-3 mt-8">
          <Button variant="outline" href="/showcase/public/notice">
            목록으로
          </Button>
        </div>
      </article>
    </>
  );
}
