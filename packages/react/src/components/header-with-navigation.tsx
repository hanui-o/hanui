'use client';

import React from 'react';
import { Search, Menu, X, SquareArrowOutUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { Button } from './button';
import { Logo } from './logo';
import { NavigationMenu, NavigationMenuItem } from './menu-navigation';
import {
  SearchModal,
  SAMPLE_POPULAR_KEYWORDS,
  SAMPLE_RECENT_KEYWORDS,
} from './search-modal';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './dropdown-menu';

// Re-export for convenience
export type { NavigationMenuItem } from './menu-navigation';

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
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center gap-1 text-krds-body-sm font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors py-2 px-3">
                      관련사이트
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="rounded-xl min-w-[140px] py-2.5 z-[100]"
                      sideOffset={5}
                      align="end"
                    >
                      {relatedSites.map((site) => (
                        <a
                          key={site.label}
                          href={site.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <DropdownMenuItem className="flex items-center gap-1 text-krds-body-sm">
                            {site.label}
                            <SquareArrowOutUpRight
                              className="w-3 h-3"
                              aria-hidden="true"
                            />
                          </DropdownMenuItem>
                        </a>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
          <Button
            variant="ghost"
            size="icon"
            className="min-w-0 hover:bg-krds-gray-10"
            aria-label="검색"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-6 h-6" aria-hidden="true" />
          </Button>
          <SearchModal
            open={isSearchOpen}
            onOpenChange={setIsSearchOpen}
            popularKeywords={SAMPLE_POPULAR_KEYWORDS}
            recentKeywords={SAMPLE_RECENT_KEYWORDS}
            onSearch={(value) => {
              console.log('검색:', value);
              setIsSearchOpen(false);
            }}
          />
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
