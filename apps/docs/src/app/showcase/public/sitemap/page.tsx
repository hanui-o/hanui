'use client';

import { Breadcrumb, SitemapPage } from '@hanui/react';

const sitemapItems = [
  {
    label: '기관소개',
    href: '/showcase/public',
    children: [
      { label: '인사말', href: '/showcase/public' },
      { label: '연혁', href: '/showcase/public' },
      { label: '조직도', href: '/showcase/public' },
      { label: '오시는 길', href: '/showcase/public' },
    ],
  },
  {
    label: '알림마당',
    href: '/showcase/public/notice',
    children: [
      { label: '공지사항', href: '/showcase/public/notice' },
      { label: '보도자료', href: '/showcase/public/notice' },
      { label: '사업공고', href: '/showcase/public/notice' },
    ],
  },
  {
    label: '민원안내',
    href: '/showcase/public/civil',
    children: [
      { label: '온라인 민원', href: '/showcase/public/civil' },
      { label: '자주 묻는 질문', href: '/showcase/public/faq' },
      { label: '민원서식', href: '/showcase/public/civil' },
    ],
  },
  {
    label: '정보공개',
    href: '/showcase/public',
    children: [
      { label: '사전공개', href: '/showcase/public' },
      { label: '정보목록', href: '/showcase/public' },
    ],
  },
];

export default function SitemapShowcasePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: '홈', href: '/showcase/public' },
          { label: '사이트맵', isCurrent: true },
        ]}
      />

      <div className="mt-6">
        <SitemapPage items={sitemapItems} />
      </div>
    </>
  );
}
