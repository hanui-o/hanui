'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Container } from './container';
import { Logo } from './logo';

export interface FooterProps {
  className?: string;
  logo?: string;
  logoAlt?: string;
  logoHref?: string;
}

// SNS Icon Components
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const BlogIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
  </svg>
);

// 관련 사이트
const RELATED_SITES = [
  {
    id: 'family-sites',
    title: '가족 사이트',
    links: [
      { name: '건강iN', url: '#' },
      { name: 'The건강보험', url: '#' },
      { name: '요양기관업무포털', url: '#' },
    ],
  },
  {
    id: 'service-sites',
    title: '서비스 사이트',
    links: [
      { name: '민원신청', url: '#' },
      { name: '증명서발급', url: '#' },
      { name: '건강검진', url: '#' },
    ],
  },
  {
    id: 'info-sites',
    title: '정보 사이트',
    links: [
      { name: '건강정보', url: '#' },
      { name: '질병정보', url: '#' },
      { name: '의학정보', url: '#' },
    ],
  },
  {
    id: 'external-sites',
    title: '외부 사이트',
    links: [
      { name: '보건복지부', url: '#' },
      { name: '질병관리청', url: '#' },
      { name: '식품의약품안전처', url: '#' },
    ],
  },
];

// 연락처 정보
const CONTACT_INFO = [
  {
    label: '대표전화 1577-1000',
    description: '(유료, 평일 09시~18시)',
  },
  {
    label: '해외이용 82-33-811-2001',
    description: '(유료, 평일 09시~18시)',
  },
];

// 바로가기 링크
const QUICK_LINKS = [
  { label: '찾아오시는 길', href: '#' },
  { label: '이용안내', href: '#' },
  { label: '직원검색', href: '#' },
];

// SNS 링크
const SNS_LINKS = [
  { name: '인스타그램', icon: InstagramIcon, href: '#' },
  { name: '유튜브', icon: YoutubeIcon, href: '#' },
  { name: 'X (트위터)', icon: XIcon, href: '#', label: 'X' },
  { name: '페이스북', icon: FacebookIcon, href: '#' },
  { name: '블로그', icon: BlogIcon, href: '#' },
];

// 하단 메뉴
const FOOTER_MENU = [
  { label: '개인정보처리방침', href: '#', highlighted: true },
  { label: '저작권 정책', href: '#' },
  { label: '웹 접근성 품질인증 마크 획득', href: '#' },
];

export function Footer({
  className,
  logo = 'https://www.krds.go.kr/resources/img/component/icon/ico_logo_krds.svg',
  logoAlt = 'KRDS - Korea Design System',
  logoHref = '/',
}: FooterProps) {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <footer
      id="krds-footer"
      className={cn('relative z-50 bg-krds-gray-5', className)}
    >
      {/* Quick Links Section */}
      <div className="border-y border-krds-gray-10 bg-white">
        <Container className="flex flex-col lg:flex-row">
          <nav
            className="flex flex-col lg:flex-row w-full border-l border-krds-gray-10 max-md:border-l-0"
            aria-label="관련 사이트"
          >
            {RELATED_SITES.map((site, index) => (
              <Dialog.Root
                key={site.id}
                open={openModal === site.id}
                onOpenChange={(open) => setOpenModal(open ? site.id : null)}
              >
                <Dialog.Trigger asChild>
                  <button
                    className={cn(
                      'inline-flex justify-between items-center w-full gap-3 h-[calc(4rem-2px)] px-8 bg-white border-none border-r border-krds-gray-10 transition-all duration-200 cursor-pointer text-left',
                      'hover:bg-krds-primary-5 active:bg-krds-primary-10 focus:bg-krds-primary-10',
                      'max-md:text-krds-body-sm max-md:min-h-[calc(3.5rem-2px)] max-md:px-6 max-md:border-r-0',
                      index !== 0 &&
                        'max-md:border-t max-md:border-t-krds-gray-10'
                    )}
                    title={`${site.title} 메뉴`}
                  >
                    {site.title}
                    <ChevronRight
                      className="w-6 h-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[1000] animate-in fade-in-0" />
                  <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl w-[90%] max-w-[896px] max-h-[85vh] z-[1001] animate-in fade-in-0 zoom-in-95 max-md:w-[95%] max-md:max-h-[90vh]">
                    <div className="flex justify-between items-center py-6 px-8 border-b border-krds-gray-10 max-md:py-5 max-md:px-6">
                      <Dialog.Title className="text-xl font-bold text-krds-gray-90 m-0 max-md:text-lg">
                        {site.title}
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="min-w-0"
                          aria-label="닫기"
                        >
                          <X className="w-6 h-6" aria-hidden="true" />
                        </Button>
                      </Dialog.Close>
                    </div>

                    <Dialog.Description className="sr-only">
                      {site.title} 관련 사이트 목록
                    </Dialog.Description>

                    <div className="p-8 overflow-y-auto max-h-[calc(85vh-5rem)] max-md:p-6 max-md:max-h-[calc(90vh-4.5rem)]">
                      <ul className="list-none m-0 p-0 grid grid-cols-4 gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-4">
                        {site.links.map((link) => (
                          <li key={link.name} className="m-0">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-4 text-krds-gray-70 no-underline border border-krds-gray-10 rounded-lg transition-all duration-200 text-center hover:text-krds-primary-60 hover:border-krds-primary-20 hover:bg-krds-primary-5"
                            >
                              {link.name}
                              <span className="sr-only"> (새 창 열기)</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            ))}
          </nav>
        </Container>
      </div>

      {/* Main Footer Content */}
      <Container className="flex flex-col gap-8 py-10 lg:gap-12 max-lg:gap-8 max-lg:py-8 max-md:py-6">
        {/* Logo - Footer에서는 슬로건 없이 사용 */}
        <Logo
          src={logo}
          alt={logoAlt}
          href={logoHref}
          logoClassName="w-[137px] h-14 max-md:w-[99px] max-md:h-8"
        />

        {/* Content Section */}
        <div className="flex gap-8 lg:justify-between lg:flex-1 max-lg:gap-5 max-md:flex-col">
          {/* Info Section */}
          <div className="flex flex-col flex-1 gap-5 max-lg:flex-[3] max-md:text-sm">
            <p className="m-0">
              (26464) 강원특별자치도 원주시 건강로 32(반곡동) 국민건강보험공단
            </p>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {CONTACT_INFO.map((contact) => (
                <li
                  key={contact.label}
                  className="flex items-center max-lg:flex-col max-lg:items-start max-md:flex-wrap max-md:break-all"
                >
                  <strong className="font-bold">{contact.label}</strong>
                  <span className="font-normal ml-2 max-lg:ml-0">
                    {contact.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Section */}
          <div className="flex flex-col flex-shrink-0 gap-12 lg:w-[23.5%] max-md:gap-10">
            {/* Quick Links */}
            <nav className="flex flex-col gap-2" aria-label="바로가기">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 text-krds-gray-90 no-underline hover:underline max-md:p-0 max-md:text-sm"
                >
                  {link.label}{' '}
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </nav>

            {/* SNS Links */}
            <nav
              className="flex flex-wrap gap-3 max-lg:gap-2"
              aria-label="소셜 미디어"
            >
              {SNS_LINKS.map((sns) => {
                const IconComponent = sns.icon;
                return (
                  <a
                    key={sns.name}
                    href={sns.href}
                    className="inline-flex items-center justify-center w-12 h-12 border border-krds-gray-20 rounded-full bg-white no-underline transition-all duration-200 hover:bg-krds-gray-5 hover:border-krds-gray-30 active:bg-krds-gray-10 focus:bg-krds-gray-10 [&>svg]:w-[55%]"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${sns.name} (새 창 열기)`}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </Container>

      {/* Bottom Section */}
      <div className="border-t border-krds-gray-10">
        <Container className="flex flex-col pt-6 gap-12">
          <div className="flex justify-between items-center w-full max-md:flex-col max-md:items-start max-md:gap-6">
            {/* Footer Menu */}
            <nav
              className="inline-flex flex-wrap gap-3"
              aria-label="사이트 정책"
            >
              {FOOTER_MENU.map((menu) => (
                <a
                  key={menu.label}
                  href={menu.href}
                  className={cn(
                    'no-underline text-krds-gray-90 hover:underline',
                    menu.highlighted && 'text-krds-error font-bold'
                  )}
                >
                  {menu.label}
                </a>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-sm text-krds-gray-50 m-0">
              © 2023 National Health Insurance Service. All rights reserved.
            </p>
          </div>

          {/* KRDS Identifier */}
          <div className="flex items-center gap-3">
            <span
              className="w-16 h-6 bg-center bg-contain bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://www.krds.go.kr/resources/img/component/icon/ico_logo_krds_small.svg')",
              }}
            >
              <span className="sr-only">KRDS - Korea Design System</span>
            </span>
            <span className="text-sm text-krds-gray-70 whitespace-nowrap">
              이 누리집은 보건복지부 누리집입니다.
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
