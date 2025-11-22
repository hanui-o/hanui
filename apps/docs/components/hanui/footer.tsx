'use client';

import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import styles from './footer.module.scss';
import { ChevronRight, ChevronDown } from 'lucide-react';

export interface FooterProps {
  className?: string;
}

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
  { name: '인스타그램', icon: 'ico-instagram', href: '#' },
  { name: '유튜브', icon: 'ico-youtube', href: '#' },
  { name: 'X (트위터)', icon: 'ico-sns-x', href: '#', label: 'X' },
  { name: '페이스북', icon: 'ico-facebook', href: '#' },
  { name: '블로그', icon: 'ico-blog', href: '#' },
];

// 하단 메뉴
const FOOTER_MENU = [
  { label: '개인정보처리방침', href: '#', highlighted: true },
  { label: '저작권 정책', href: '#' },
  { label: '웹 접근성 품질인증 마크 획득', href: '#' },
];

export function Footer({ className }: FooterProps) {
  return (
    <footer id="krds-footer" className={`${styles.footer} ${className || ''}`}>
      <div className={styles.footQuick}>
        <div className={styles.inner}>
          <Accordion.Root
            type="single"
            collapsible
            className={styles.accordionRoot}
          >
            {RELATED_SITES.map((site) => (
              <Accordion.Item
                key={site.id}
                value={site.id}
                className={styles.accordionItem}
              >
                <Accordion.Trigger
                  className={styles.link}
                  title={`${site.title} 메뉴`}
                >
                  {site.title}
                  <ChevronDown className={styles.chevron} aria-hidden="true" />
                </Accordion.Trigger>
                <Accordion.Content className={styles.accordionContent}>
                  <ul className={styles.relatedSitesList}>
                    {site.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="새 창 열기"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
      <div className={styles.inner}>
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
            <div className={styles.linkGo}>
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.linkGoBtn}
                >
                  {link.label} <ChevronRight aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className={styles.linkSns}>
              {SNS_LINKS.map((sns) => (
                <a
                  key={sns.name}
                  href={sns.href}
                  className={styles.snsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="새 창 열기"
                  aria-label={sns.name}
                >
                  <span className={styles.srOnly}>{sns.label || sns.name}</span>
                  <i className={`svg-icon ${sns.icon}`} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.fBtm}>
          <div className={styles.fBtmText}>
            <div className={styles.fMenu}>
              {FOOTER_MENU.map((menu) => (
                <a
                  key={menu.label}
                  href={menu.href}
                  className={menu.highlighted ? styles.point : undefined}
                >
                  {menu.label}
                </a>
              ))}
            </div>
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
      </div>
    </footer>
  );
}
