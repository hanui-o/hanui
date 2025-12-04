'use client';

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ChevronDown,
  Search,
  Menu,
  X,
  SquareArrowOutUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { Button } from './button';
import { Logo } from './logo';
import { NavigationMenu, NavigationMenuItem } from './menu-navigation';

// Re-export for convenience
export type { NavigationMenuItem } from './menu-navigation';

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
          <Container maxWidth="xl" className="flex justify-end">
            <ul className="flex justify-end list-none m-0 p-0">
              {utilityLinks.map((link, index) => (
                <li key={link.label} className="relative flex items-center">
                  {index !== 0 && (
                    <span className="inline-flex w-px h-3 bg-krds-gray-20" />
                  )}
                  <a
                    href={link.href}
                    className="inline-flex items-center text-krds-body-sm font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors py-2 px-3"
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
                      <Button
                        variant="ghost"
                        className="min-w-0 h-auto py-2 px-3 text-sm font-normal text-krds-gray-90 hover:text-krds-primary-60 hover:bg-transparent"
                        aria-label="관련사이트 메뉴"
                        onMouseEnter={() => setIsUtilityDropdownOpen(true)}
                        onMouseLeave={() => setIsUtilityDropdownOpen(false)}
                      >
                        관련사이트
                        <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      </Button>
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
                              className="flex items-center gap-1 text-krds-body-sm font-medium text-krds-gray-90 py-1.5 px-2.5 mx-2 no-underline rounded-lg whitespace-nowrap cursor-pointer outline-none hover:bg-krds-primary-5 data-[highlighted]:bg-krds-primary-5 data-[highlighted]:text-krds-primary-60 transition-colors"
                            >
                              {site.label}
                              <SquareArrowOutUpRight
                                className="w-3 h-3"
                                aria-hidden="true"
                              />
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

      {/* Branding + Actions (Line 1) */}
      <Container
        maxWidth="xl"
        className="flex items-center justify-between py-5 lg:py-6 gap-2"
      >
        {/* Logo */}
        <Logo src={logo} alt={logoAlt} href={logoHref} slogan={slogan} />

        {/* Actions */}
        <div className="inline-flex gap-3 md:gap-0">
          <Dialog.Root open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <Dialog.Trigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="min-w-0 hover:bg-krds-gray-10"
                aria-label="검색"
              >
                <Search className="w-6 h-6" aria-hidden="true" />
              </Button>
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-5 right-5 min-w-0 hover:bg-krds-gray-10 md:top-4 md:right-4"
                    aria-label="닫기"
                  >
                    <X className="w-6 h-6 md:w-5 md:h-5" aria-hidden="true" />
                  </Button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden min-w-0 hover:bg-krds-gray-10"
            aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </Button>
        </div>
      </Container>

      {/* NavigationMenu (Line 2) - Desktop only */}
      <nav
        id="gnb"
        className="hidden lg:flex justify-center w-full bg-white"
        aria-label="주 메뉴"
      >
        <Container maxWidth="xl">
          <NavigationMenu items={navigationItems} />
        </Container>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[1000] bg-white overflow-y-auto">
          <div className="flex justify-end items-center p-5 border-b border-krds-gray-20 sticky top-0 bg-white z-10">
            <Button
              variant="ghost"
              size="icon"
              className="min-w-0 hover:bg-krds-gray-10"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="메뉴 닫기"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </Button>
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
                    className="flex items-center justify-between w-full py-4 text-krds-body-lg font-bold text-krds-gray-90 hover:text-krds-primary-60 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {utilityLinks && utilityLinks.length > 0 && (
              <div className="flex flex-col gap-3 mt-8 pt-5 border-t border-krds-gray-20">
                {utilityLinks.map((link) => (
                  <Button
                    key={link.label}
                    href={link.href}
                    variant="tertiary"
                    className="w-full justify-center"
                  >
                    {link.label}
                  </Button>
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
