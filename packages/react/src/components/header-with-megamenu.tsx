'use client';

import React from 'react';
import { Search, Menu, X, SquareArrowOutUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { Button } from './button';
import { Logo } from './logo';
import { MegaMenu, MegaMenuColumn } from './menu-mega';
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
export type { MegaMenuColumn } from './menu-mega';

/**
 * Utility Link 타입
 * - href만 있으면 일반 링크
 * - children이 있으면 DropdownMenu로 렌더링
 */
export interface UtilityLink {
  label: string;
  href?: string;
  children?: UtilityLink[];
  /** 외부 링크 여부 (새 창에서 열기) */
  external?: boolean;
}

export interface HeaderWithMegaMenuTailwindProps {
  className?: string;
  megaColumns: MegaMenuColumn[];
  utilityLinks?: UtilityLink[];
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

const DEFAULT_UTILITY_LINKS: UtilityLink[] = [
  { label: '로그인', href: '#' },
  { label: '회원가입', href: '#' },
  { label: 'ENGLISH', href: '#' },
  {
    label: '관련사이트',
    children: [
      { label: '건강iN', href: '#', external: true },
      { label: 'The건강보험', href: '#', external: true },
      { label: '요양기관업무포털', href: '#', external: true },
      { label: '민원신청', href: '#', external: true },
    ],
  },
];

/**
 * Header with MegaMenu (Tailwind CSS version)
 *
 * Inline layout: logo | MegaMenu | Actions (single line)
 * - 유틸리티 바 (선택)
 * - 로고, MegaMenu, 검색/메뉴 버튼이 한 줄에 배치
 */
export function HeaderWithMegaMenuTailwind({
  className,
  megaColumns,
  utilityLinks = DEFAULT_UTILITY_LINKS,
  logo = 'https://www.krds.go.kr/resources/img/pattern/layout/head_logo.svg',
  logoAlt = '대한민국정부',
  logoHref = '/',
  slogan,
  stickyBehavior = 'always',
  scrollThreshold = 150,
}: HeaderWithMegaMenuTailwindProps) {
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
        'relative left-0 z-[70] bg-white border-b border-krds-gray-20 transition-transform duration-500 ease-in-out',
        // gnb 호버 시 ::before로 흰색 배경 오버레이
        'before:content-[""] before:absolute before:left-0 before:top-full before:w-full before:h-0 before:mt-[1px] before:bg-krds-white before:transition-all before:duration-200 before:z-40',
        '[&:has(#gnb:hover)]:before:h-[290px] [&:has(#gnb:hover)]:before:shadow-lg',
        positionClass,
        hideClass,
        className
      )}
    >
      {/* Utility Bar */}
      {utilityLinks && utilityLinks.length > 0 && (
        <div className="hidden lg:flex justify-end">
          <Container className="flex justify-end">
            <ul className="flex justify-end list-none m-0 p-0">
              {utilityLinks.map((link, index) => (
                <li key={link.label} className="relative flex items-center">
                  {index !== 0 && (
                    <span className="inline-flex w-px h-3 bg-krds-gray-20" />
                  )}
                  {link.children && link.children.length > 0 ? (
                    // Depth 2: DropdownMenu
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center gap-1 text-krds-body-sm font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors py-2 px-3">
                        {link.label}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="rounded-xl min-w-[140px] py-2.5 z-[100]"
                        sideOffset={5}
                        align="end"
                      >
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            {...(child.external && {
                              target: '_blank',
                              rel: 'noopener noreferrer',
                            })}
                          >
                            <DropdownMenuItem className="flex items-center gap-1 text-krds-body-sm">
                              {child.label}
                              {child.external && (
                                <SquareArrowOutUpRight
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                />
                              )}
                            </DropdownMenuItem>
                          </a>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    // Depth 1: 일반 링크
                    <a
                      href={link.href}
                      className="inline-flex items-center text-krds-body-sm font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors py-2 px-3"
                      {...(link.external && {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      })}
                    >
                      {link.label}
                      {link.external && (
                        <SquareArrowOutUpRight
                          className="w-3 h-3 ml-1"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}

      {/* Branding + MegaMenu + Actions (Inline) */}
      <Container className="flex items-center justify-between pt-2 lg:pt-2 gap-2">
        {/* Logo */}
        <Logo src={logo} alt={logoAlt} href={logoHref} slogan={slogan} />

        {/* MegaMenu - Inline */}
        <MegaMenu columns={megaColumns} />

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
              {megaColumns.map((column, index) => (
                <li
                  key={`${column.title}-${index}`}
                  className="border-b border-krds-gray-20 last:border-b-0"
                >
                  <div className="py-4 text-base font-bold text-krds-gray-90">
                    {column.title}
                  </div>
                  {column.links && column.links.length > 0 && (
                    <ul className="list-none m-0 p-0 pb-3 pl-4">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="block py-2 text-krds-body-sm font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            {utilityLinks && utilityLinks.length > 0 && (
              <div className="flex flex-col gap-3 mt-8 pt-5 border-t border-krds-gray-20">
                {utilityLinks
                  .filter((link) => !link.children)
                  .map((link) => (
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

export { HeaderWithMegaMenuTailwind as HeaderWithMegaMenu };
