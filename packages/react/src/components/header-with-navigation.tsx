'use client';

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavigationMenu, NavigationMenuItem } from './navigation-menu';

// Re-export for convenience
export type { NavigationMenuItem } from './navigation-menu';

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

export interface HeaderWithNavigationTailwindProps {
  className?: string;
  navigationItems: NavigationMenuItem[];
  utilityLinks?: UtilityLink[];
  relatedSites?: UtilityLink[];
  logo?: string;
  logoAlt?: string;
  logoHref?: string;
  slogan?: React.ReactNode;
  /**
   * 스크롤 시 헤더 동작
   * - 'always': 항상 sticky (기본값)
   * - 'auto': 스크롤 시 헤더가 위로 사라짐 (KRDS 스타일)
   * - 'never': 항상 relative (스크롤과 함께 이동)
   */
  stickyBehavior?: 'always' | 'auto' | 'never';
  /** auto 모드에서 헤더가 사라지기 시작하는 스크롤 위치 (px) */
  scrollThreshold?: number;
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
 * Header with NavigationMenu (Tailwind CSS version)
 *
 * Stacked layout:
 * - Line 1: logo | actions
 * - Line 2: NavigationMenu (full width)
 */
export function HeaderWithNavigationTailwind({
  className,
  navigationItems,
  utilityLinks = DEFAULT_UTILITY_LINKS,
  relatedSites = DEFAULT_RELATED_SITES,
  logo = 'https://www.krds.go.kr/resources/img/pattern/layout/head_logo.svg',
  logoAlt = '대한민국정부',
  logoHref = '/',
  slogan,
  stickyBehavior = 'always',
  scrollThreshold = 150,
}: HeaderWithNavigationTailwindProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUtilityDropdownOpen, setIsUtilityDropdownOpen] =
    React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // 스크롤 감지 (auto 모드에서만 동작)
  React.useEffect(() => {
    if (stickyBehavior !== 'auto') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    // 초기 상태 설정
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stickyBehavior, scrollThreshold]);

  // position 클래스 결정
  const positionClass =
    stickyBehavior === 'never' ? 'relative' : 'sticky top-0';

  // auto 모드에서 스크롤 시 헤더 숨기기 (transform 사용)
  const hideClass =
    stickyBehavior === 'auto' && isScrolled ? '-translate-y-full' : '';

  return (
    <header
      className={cn(
        'left-0 z-[70] bg-white border-b border-krds-gray-20 transition-transform duration-500 ease-in-out',
        positionClass,
        hideClass,
        className
      )}
    >
      {/* Utility Bar */}
      {utilityLinks && utilityLinks.length > 0 && (
        <div className="hidden lg:flex justify-end">
          <div className="max-w-[var(--krds-container-xl,1280px)] mx-auto w-full px-[var(--krds-container-padding-mobile,1rem)] sm:px-[var(--krds-container-padding-tablet,1.5rem)] lg:px-[var(--krds-container-padding-desktop,2rem)] flex justify-end">
            <ul className="flex justify-end list-none m-0 p-0">
              {utilityLinks.map((link, index) => (
                <li key={link.label} className="relative flex items-center">
                  {index !== 0 && (
                    <span className="inline-flex w-px h-3 bg-krds-gray-20" />
                  )}
                  <a
                    href={link.href}
                    className="bg-transparent border-none py-2 px-3 cursor-pointer text-sm text-krds-gray-90 transition-colors hover:text-krds-primary-60 focus-visible:outline-2 focus-visible:outline-krds-primary-60 focus-visible:outline-offset-2 focus-visible:rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {relatedSites && relatedSites.length > 0 && (
                <li className="relative flex items-center">
                  <span className="inline-flex w-px h-3 bg-krds-gray-20" />
                  <DropdownMenu.Root
                    open={isUtilityDropdownOpen}
                    onOpenChange={setIsUtilityDropdownOpen}
                    modal={false}
                  >
                    <DropdownMenu.Trigger asChild>
                      <button
                        type="button"
                        className="relative bg-transparent border-none py-2 px-3 cursor-pointer text-sm text-krds-gray-90 inline-flex items-center gap-1 transition-colors hover:text-krds-primary-60"
                        aria-label="관련사이트 메뉴"
                        onMouseEnter={() => setIsUtilityDropdownOpen(true)}
                        onMouseLeave={() => setIsUtilityDropdownOpen(false)}
                      >
                        관련사이트
                        <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="mt-[-4px] bg-white/[0.98] border border-krds-gray-20 rounded-xl shadow-lg min-w-[140px] py-2.5 z-[100] backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2"
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
                              className="block relative py-1.5 px-2.5 mx-2 text-krds-gray-90 no-underline transition-all duration-200 rounded-lg whitespace-nowrap cursor-pointer outline-none hover:bg-krds-primary-5 hover:text-krds-primary-60 data-[highlighted]:bg-krds-primary-5 data-[highlighted]:text-krds-primary-60"
                            >
                              {site.label}
                              <span className="sr-only"> (새 창 열기)</span>
                            </a>
                          </DropdownMenu.Item>
                        ))}
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Branding + Actions (Line 1) */}
      <div className="max-w-[var(--krds-container-xl,1280px)] mx-auto w-full px-[var(--krds-container-padding-mobile,1rem)] sm:px-[var(--krds-container-padding-tablet,1.5rem)] lg:px-[var(--krds-container-padding-desktop,2rem)] flex items-center justify-between py-5 lg:py-6 gap-2">
        {/* Logo */}
        <div className="flex items-center">
          <a
            href={logoHref}
            className="inline-flex h-8 md:h-12"
            aria-label={`${logoAlt} 홈으로 이동`}
          >
            <img
              src={logo}
              alt={logoAlt}
              className="w-full h-full object-contain"
            />
          </a>
          {slogan && (
            <span className="inline-flex ml-3">
              <span className="sr-only">슬로건</span>
              {slogan}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="inline-flex gap-3 md:gap-0">
          <Dialog.Root open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <Dialog.Trigger asChild>
              <button
                className="inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-krds-gray-10 transition-colors"
                aria-label="검색"
              >
                <Search className="w-6 h-6" aria-hidden="true" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[999] backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
              <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] bg-white rounded-2xl shadow-2xl p-8 z-[1000] focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 md:w-[95vw] md:p-5">
                <Dialog.Title className="text-2xl font-bold text-krds-gray-90 mb-5 md:text-xl md:mb-4">
                  검색
                </Dialog.Title>
                <div className="relative flex items-center gap-3 py-4 px-5 bg-krds-primary-5 rounded-xl border-2 border-transparent transition-colors focus-within:border-krds-primary-60 focus-within:bg-white">
                  <Search
                    className="w-6 h-6 text-krds-gray-60 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <SearchInput className="flex-1 border-none bg-transparent text-lg text-krds-gray-90 outline-none placeholder:text-krds-gray-50 md:text-base" />
                </div>
                <Dialog.Close asChild>
                  <button
                    className="absolute top-5 right-5 inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-krds-gray-10 transition-colors md:top-4 md:right-4"
                    aria-label="닫기"
                  >
                    <X className="w-6 h-6 md:w-5 md:h-5" aria-hidden="true" />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <button
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-krds-gray-10 transition-colors"
            aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* NavigationMenu (Line 2) - Desktop only */}
      <nav
        id="gnb"
        className="hidden lg:flex justify-center w-full bg-white"
        aria-label="주 메뉴"
      >
        <div className="max-w-[var(--krds-container-xl,1280px)] mx-auto w-full px-[var(--krds-container-padding-mobile,1rem)] sm:px-[var(--krds-container-padding-tablet,1.5rem)] lg:px-[var(--krds-container-padding-desktop,2rem)]">
          <NavigationMenu items={navigationItems} />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[1000] bg-white overflow-y-auto">
          <div className="flex justify-end items-center p-5 border-b border-krds-gray-20 sticky top-0 bg-white z-10">
            <button
              className="inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-krds-gray-10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="메뉴 닫기"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="p-5">
            <ul className="list-none m-0 p-0">
              {navigationItems.map((item) => (
                <li
                  key={item.label}
                  className="border-b border-krds-gray-20 last:border-b-0"
                >
                  <a
                    href={item.href}
                    className="flex items-center justify-between w-full py-4 bg-transparent border-none text-base font-bold text-krds-gray-90 cursor-pointer text-left no-underline hover:text-krds-primary-60"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {utilityLinks && utilityLinks.length > 0 && (
              <div className="flex flex-col gap-3 mt-8 pt-5 border-t border-krds-gray-20">
                {utilityLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block w-full py-3 bg-transparent border border-krds-gray-20 rounded-lg text-base text-krds-gray-90 no-underline text-center transition-colors hover:bg-krds-primary-5"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export { HeaderWithNavigationTailwind as HeaderWithNavigation };
