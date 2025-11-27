'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './footer.module.scss';
import { ChevronRight, X } from 'lucide-react';
import { Container } from '../container';

export interface FooterProps {
  className?: string;
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

export function Footer({ className }: FooterProps) {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <footer id="krds-footer" className={`${styles.footer} ${className || ''}`}>
      <div className={styles.footQuick}>
        <Container className={styles.inner}>
          <nav className={styles.relatedSitesNav} aria-label="관련 사이트">
            {RELATED_SITES.map((site) => (
              <Dialog.Root
                key={site.id}
                open={openModal === site.id}
                onOpenChange={(open) => setOpenModal(open ? site.id : null)}
              >
                <Dialog.Trigger asChild>
                  <button className={styles.link} title={`${site.title} 메뉴`}>
                    {site.title}
                    <ChevronRight
                      className={styles.chevron}
                      aria-hidden="true"
                    />
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className={styles.modalOverlay} />
                  <Dialog.Content className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                      <Dialog.Title className={styles.modalTitle}>
                        {site.title}
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <button className={styles.modalClose} aria-label="닫기">
                          <X aria-hidden="true" />
                        </button>
                      </Dialog.Close>
                    </div>

                    <Dialog.Description className={styles.srOnly}>
                      {site.title} 관련 사이트 목록
                    </Dialog.Description>

                    <div className={styles.modalBody}>
                      <ul className={styles.relatedSitesList}>
                        {site.links.map((link) => (
                          <li key={link.name}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.name}
                              <span className={styles.srOnly}>
                                {' '}
                                (새 창 열기)
                              </span>
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
      <Container className={styles.inner}>
        <div className={styles.fLogo}>
          <span className={styles.srOnly}>KRDS - Korea Design System</span>
        </div>
        <div className={styles.fCnt}>
          <div className={styles.fInfo}>
            <p className={styles.infoAddr}>
              (26464) 강원특별자치도 원주시 건강로 32(반곡동) 국민건강보험공단
            </p>
            <ul className={styles.infoCs}>
              {CONTACT_INFO.map((contact) => (
                <li key={contact.label}>
                  <strong className={styles.strong}>{contact.label}</strong>
                  <span className={styles.span}>{contact.description}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.fLink}>
            <nav className={styles.linkGo} aria-label="바로가기">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.linkGoBtn}
                >
                  {link.label} <ChevronRight aria-hidden="true" />
                </a>
              ))}
            </nav>
            <nav className={styles.linkSns} aria-label="소셜 미디어">
              {SNS_LINKS.map((sns) => {
                const IconComponent = sns.icon;
                return (
                  <a
                    key={sns.name}
                    href={sns.href}
                    className={styles.snsLink}
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

        <div className={styles.fBtm}>
          <div className={styles.fBtmText}>
            <nav className={styles.fMenu} aria-label="사이트 정책">
              {FOOTER_MENU.map((menu) => (
                <a
                  key={menu.label}
                  href={menu.href}
                  className={menu.highlighted ? styles.point : undefined}
                >
                  {menu.label}
                </a>
              ))}
            </nav>
            <p className={styles.fCopy}>
              © 2023 National Health Insurance Service. All rights reserved.
            </p>
          </div>
          <div className={styles.krdsIdentifier}>
            <span className={styles.logo}>
              <span className={styles.srOnly}>KRDS - Korea Design System</span>
            </span>
            <span className={styles.banTxt}>
              이 누리집은 보건복지부 누리집입니다.
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
