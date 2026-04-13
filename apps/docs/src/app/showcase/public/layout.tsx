'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { SkipLink, HeaderWithNavigation, PublicFooter } from '@hanui/react';
import type { NavigationMenuItem } from '@hanui/react';

const navigationItems: NavigationMenuItem[] = [
  {
    label: '기관소개',
    children: [
      { label: '인사말', href: '/showcase/public' },
      { label: '연혁', href: '/showcase/public' },
      { label: '조직도', href: '/showcase/public' },
      { label: '오시는 길', href: '/showcase/public' },
    ],
  },
  {
    label: '알림마당',
    children: [
      { label: '공지사항', href: '/showcase/public/notice' },
      { label: '보도자료', href: '/showcase/public/notice' },
      { label: '사업공고', href: '/showcase/public/notice' },
    ],
  },
  {
    label: '민원안내',
    children: [
      { label: '온라인 민원', href: '/showcase/public/civil' },
      { label: '자주 묻는 질문', href: '/showcase/public/faq' },
      { label: '민원서식', href: '/showcase/public/civil' },
    ],
  },
  {
    label: '정보공개',
    children: [
      { label: '사전공개', href: '/showcase/public' },
      { label: '정보목록', href: '/showcase/public' },
    ],
  },
];

export default function PublicShowcaseLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SkipLink
        links={[
          { href: '#main-content', label: '본문 바로가기' },
          { href: '#footer', label: '하단 정보 바로가기' },
        ]}
      />

      <HeaderWithNavigation
        navigationItems={navigationItems}
        logoAlt="○○기관"
        logoHref="/showcase/public"
        actionButtons={[
          {
            label: '로그인',
            href: '/showcase/public/login',
          },
          {
            label: '회원가입',
            href: '/showcase/public/signup',
          },
        ]}
        utilityLinks={[{ label: '사이트맵', href: '/showcase/public/sitemap' }]}
      />

      <main id="main-content" className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      <div id="footer">
        <PublicFooter
          orgName="○○기관"
          address="서울특별시 종로구 세종대로 209"
          tel="02-1234-5678"
          email="admin@example.go.kr"
          policyLinks={[
            { label: '개인정보처리방침', href: '/showcase/public' },
            { label: '이용약관', href: '/showcase/public' },
            { label: '저작권정책', href: '/showcase/public' },
            { label: '이메일무단수집거부', href: '/showcase/public' },
          ]}
          relatedLinks={[
            { label: '정부24', href: 'https://www.gov.kr', external: true },
            {
              label: '국민신문고',
              href: 'https://www.epeople.go.kr',
              external: true,
            },
          ]}
        />
      </div>
    </div>
  );
}
