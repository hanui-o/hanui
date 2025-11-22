'use client';

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './header.module.scss';
import { ChevronDown, Search, Menu, X } from 'lucide-react';

export interface HeaderProps {
  className?: string;
}

// 유틸리티 메뉴 데이터
const UTILITY_LINKS = [
  { label: '로그인', href: '#' },
  { label: '회원가입', href: '#' },
  { label: 'ENGLISH', href: '#' },
];

const RELATED_SITES = [
  { label: '건강iN', href: '#' },
  { label: 'The건강보험', href: '#' },
  { label: '요양기관업무포털', href: '#' },
  { label: '민원신청', href: '#' },
];

// 메인 메뉴 데이터
const MAIN_MENU = [
  {
    title: '건강보험',
    subItems: ['보험료', '급여', '요양기관', '건강검진'],
  },
  {
    title: '장기요양',
    subItems: ['장기요양보험', '장기요양인정', '장기요양기관', '장기요양급여'],
  },
  {
    title: '민원·증명서',
    subItems: ['민원신청', '증명서발급', '민원처리결과'],
  },
  {
    title: '건강정보',
    subItems: ['건강정보', '질병정보', '의학정보'],
  },
  {
    title: '건강IN',
    subItems: ['건강관리', '건강검진', '진료내역', '약제비'],
  },
  {
    title: '병원·약국',
    subItems: ['병원찾기', '약국찾기', '응급실찾기'],
  },
  {
    title: '소개',
    subItems: ['공단소개', '조직·업무', '채용정보', '알림·소식'],
  },
];

export function Header({ className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUtilityDropdownOpen, setIsUtilityDropdownOpen] =
    React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <header className={`${styles.header} ${className || ''}`}>
      {/* Header Utility */}
      <div className={styles.headerUtility}>
        <div className={styles.inner}>
          <ul className={styles.utilityList}>
            {UTILITY_LINKS.map((link) => (
              <li key={link.label}>
                <button type="button" className={styles.utilityLink}>
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <DropdownMenu.Root
                open={isUtilityDropdownOpen}
                onOpenChange={setIsUtilityDropdownOpen}
                modal={false}
              >
                <DropdownMenu.Trigger asChild>
                  <button
                    type="button"
                    className={styles.utilityDropdownBtn}
                    aria-label="관련사이트 메뉴"
                    onMouseEnter={() => setIsUtilityDropdownOpen(true)}
                    onMouseLeave={() => setIsUtilityDropdownOpen(false)}
                  >
                    관련사이트
                    <ChevronDown className={styles.dropdownIcon} />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className={styles.utilityDropdown}
                    sideOffset={5}
                    align="end"
                    onMouseEnter={() => setIsUtilityDropdownOpen(true)}
                    onMouseLeave={() => setIsUtilityDropdownOpen(false)}
                  >
                    {RELATED_SITES.map((site) => (
                      <DropdownMenu.Item key={site.label} asChild>
                        <a
                          href={site.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="새 창 열기"
                        >
                          {site.label}
                        </a>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </li>
          </ul>
        </div>
      </div>

      {/* Header Branding */}
      <div className={styles.headerBranding}>
        <div className={styles.inner}>
          <div className={styles.branding}>
            <a
              href="/"
              className={styles.logo}
              aria-label="대한민국정부 홈으로 이동"
            >
              <img
                src="https://www.krds.go.kr/resources/img/pattern/layout/head_logo.svg"
                alt="대한민국정부"
              />
            </a>
            <span className={styles.slogan}>
              <span className={styles.srOnly}>슬로건</span>
            </span>
          </div>

          {/* Header Actions */}
          <div className={styles.headerActions}>
            <Dialog.Root open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className={styles.searchBtn}
                  aria-label="검색"
                >
                  <Search />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className={styles.searchOverlay} />
                <Dialog.Content className={styles.searchContent}>
                  <Dialog.Title className={styles.searchTitle}>
                    검색
                  </Dialog.Title>
                  <div className={styles.searchInputWrapper}>
                    <Search className={styles.searchIcon} aria-hidden="true" />
                    <input
                      type="search"
                      placeholder="검색어를 입력하세요"
                      className={styles.searchInput}
                      autoFocus
                    />
                  </div>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className={styles.searchClose}
                      aria-label="닫기"
                    >
                      <X />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <button
              type="button"
              className={styles.menuBtn}
              aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Header Main Menu */}
      <NavigationMenu.Root className={styles.mainMenu} delayDuration={0}>
        <NavigationMenu.List className={styles.menuList}>
          {MAIN_MENU.map((menu) => (
            <NavigationMenu.Item key={menu.title} className={styles.menuItem}>
              <NavigationMenu.Trigger className={styles.menuLink}>
                {menu.title}
                <ChevronDown className={styles.menuIcon} aria-hidden="true" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={styles.subMenuWrapper}>
                <div className={styles.subMenuInner}>
                  <ul className={styles.subMenuList}>
                    {menu.subItems.map((subItem) => (
                      <li key={subItem}>
                        <NavigationMenu.Link
                          href="#"
                          className={styles.subMenuLink}
                        >
                          {subItem}
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>

      {/* Mobile Main Menu */}
      {isMobileMenuOpen && (
        <nav className={styles.mainMenuMobile} aria-label="모바일 메뉴">
          <div className={styles.mobileMenuInner}>
            <Accordion.Root type="multiple" className={styles.mobileMenuList}>
              {MAIN_MENU.map((menu) => (
                <Accordion.Item
                  key={menu.title}
                  value={menu.title}
                  className={styles.mobileMenuItem}
                >
                  <Accordion.Trigger className={styles.mobileMenuLink}>
                    {menu.title}
                    <ChevronDown
                      className={styles.mobileMenuIcon}
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                  <Accordion.Content className={styles.mobileSubMenuList}>
                    <ul>
                      {menu.subItems.map((subItem) => (
                        <li key={subItem}>
                          <a href="#" className={styles.mobileSubMenuLink}>
                            {subItem}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>

            {/* Mobile Utility */}
            <div className={styles.mobileUtility}>
              {UTILITY_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className={styles.mobileUtilityBtn}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
