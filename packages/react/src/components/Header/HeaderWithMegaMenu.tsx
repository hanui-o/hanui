'use client';

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './header.module.scss';
import { ChevronDown, Search, Menu, X } from 'lucide-react';
import { Container } from '../container';
import { MegaMenu, MegaMenuColumn } from '../mega-menu';

// SearchInput 컴포넌트 - 검색 다이얼로그에서 포커스 관리
const SearchInput = ({ className }: { className?: string }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <input
      ref={inputRef}
      type="search"
      placeholder="검색어를 입력하세요"
      className={className}
    />
  );
};

export interface UtilityLink {
  label: string;
  href: string;
}

export interface HeaderWithMegaMenuProps {
  className?: string;
  megaColumns: MegaMenuColumn[];
  utilityLinks?: UtilityLink[];
  relatedSites?: UtilityLink[];
  logo?: string;
  logoAlt?: string;
  logoHref?: string;
  slogan?: React.ReactNode;
}

const DEFAULT_UTILITY_LINKS = [
  { label: '로그인', href: '#' },
  { label: '회원가입', href: '#' },
  { label: 'ENGLISH', href: '#' },
];

const DEFAULT_RELATED_SITES = [
  { label: '건강iN', href: '#' },
  { label: 'The건강보험', href: '#' },
  { label: '요양기관업무포털', href: '#' },
  { label: '민원신청', href: '#' },
];

/**
 * Header with MegaMenu
 *
 * Inline layout: logo | MegaMenu | Actions (single line)
 * - 유틸리티 바 (선택)
 * - 로고, MegaMenu, 검색/메뉴 버튼이 한 줄에 배치
 */
export function HeaderWithMegaMenu({
  className,
  megaColumns,
  utilityLinks = DEFAULT_UTILITY_LINKS,
  relatedSites = DEFAULT_RELATED_SITES,
  logo = 'https://www.krds.go.kr/resources/img/pattern/layout/head_logo.svg',
  logoAlt = '대한민국정부',
  logoHref = '/',
  slogan,
}: HeaderWithMegaMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUtilityDropdownOpen, setIsUtilityDropdownOpen] =
    React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <header className={`${styles.header} ${className || ''}`}>
      {/* Utility Bar */}
      {utilityLinks && utilityLinks.length > 0 && (
        <div className={styles.headerUtility}>
          <Container className={styles.inner}>
            <ul className={styles.utilityList}>
              {utilityLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.utilityLink}>
                    {link.label}
                  </a>
                </li>
              ))}
              {relatedSites && relatedSites.length > 0 && (
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
                        <ChevronDown
                          className={styles.dropdownIcon}
                          aria-hidden="true"
                        />
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
                        {relatedSites.map((site) => (
                          <DropdownMenu.Item key={site.label} asChild>
                            <a
                              href={site.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {site.label}
                              <span className={styles.srOnly}>
                                {' '}
                                (새 창 열기)
                              </span>
                            </a>
                          </DropdownMenu.Item>
                        ))}
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </li>
              )}
            </ul>
          </Container>
        </div>
      )}

      {/* Branding + MegaMenu + Actions (Inline) */}
      <div className={styles.headerBranding}>
        <Container className={styles.inner}>
          <div className={styles.branding + ' flex items-center'}>
            <a
              href={logoHref}
              className={styles.logo}
              aria-label={`${logoAlt} 홈으로 이동`}
            >
              <img src={logo} alt={logoAlt} />
            </a>
            {slogan && (
              <span className={styles.slogan}>
                <span className={styles.srOnly}>슬로건</span>
                {slogan}
              </span>
            )}
          </div>

          {/* MegaMenu - Inline */}
          <div style={{ flex: 1 }}>
            <nav id="gnb" className={styles.mainMenu} aria-label="주 메뉴">
              <MegaMenu columns={megaColumns} />
            </nav>
          </div>

          {/* Actions */}
          <div className={styles.headerActions}>
            <Dialog.Root open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className={styles.searchBtn}
                  aria-label="검색"
                >
                  <Search aria-hidden="true" />
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
                    <SearchInput className={styles.searchInput} />
                  </div>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className={styles.searchClose}
                      aria-label="닫기"
                    >
                      <X aria-hidden="true" />
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
              {isMobileMenuOpen ? (
                <X aria-hidden="true" />
              ) : (
                <Menu aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>
      </div>
    </header>
  );
}
