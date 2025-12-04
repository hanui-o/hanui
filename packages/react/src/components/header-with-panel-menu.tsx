'use client';

import React from 'react';
import {
  Search,
  Menu,
  X,
  SquareArrowOutUpRight,
  Globe,
  Eye,
  Check,
  LogIn,
  UserPlus,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { Button } from './button';
import { Logo } from './logo';
import { PanelMenu, PanelMenuItem } from './menu-panel';
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
export type { PanelMenuItem } from './menu-panel';

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
  /** 아이콘 (라벨 앞에 표시) */
  icon?: React.ReactNode;
  /** 선택된 상태 (radio-like 동작) */
  isSelected?: boolean;
  /** 클릭 핸들러 (href 대신 스크립트 실행) */
  onClick?: () => void;
}

/**
 * Action Button 타입
 * - 헤더 우측 세로 레이아웃 버튼 (아이콘 + 라벨)
 */
export interface ActionButton {
  /** 버튼 라벨 */
  label: string;
  /** 버튼 아이콘 */
  icon: React.ReactNode;
  /** 링크 URL (href가 있으면 링크, 없으면 onClick 사용) */
  href?: string;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 검색 모달 트리거 여부 (내부적으로 SearchModal 연동) */
  isSearchTrigger?: boolean;
}

export interface HeaderWithPanelMenuProps {
  className?: string;
  /** PanelMenu 항목 */
  panelItems: PanelMenuItem[];
  utilityLinks?: UtilityLink[];
  /** 헤더 우측 액션 버튼 (세로 레이아웃) */
  actionButtons?: ActionButton[];
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
  {
    label: 'Language',
    icon: <Globe className="w-4 h-4" />,
    children: [
      { label: '한국어', href: '#' },
      { label: 'English (영어)', href: '#' },
      { label: '中文 (중국어)', href: '#' },
      { label: '日本語 (일본어)', href: '#' },
      { label: 'français (프랑스어)', href: '#' },
    ],
  },
  { label: '지원', href: '#' },
  {
    label: '글자·화면 설정',
    icon: <Eye className="w-4 h-4" />,
    children: [
      { label: '작게', onClick: () => console.log('작게') },
      { label: '보통', isSelected: true, onClick: () => console.log('보통') },
      { label: '조금 크게', onClick: () => console.log('조금 크게') },
      { label: '크게', onClick: () => console.log('크게') },
      { label: '가장 크게', onClick: () => console.log('가장 크게') },
    ],
  },
];

const DEFAULT_ACTION_BUTTONS: ActionButton[] = [
  {
    label: '통합검색',
    icon: <Search className="w-5 h-5" />,
    isSearchTrigger: true,
  },
  {
    label: '로그인',
    icon: <LogIn className="w-5 h-5" />,
    href: '#',
  },
  {
    label: '회원가입',
    icon: <UserPlus className="w-5 h-5" />,
    href: '#',
  },
  {
    label: '나의 GOV',
    icon: <User className="w-5 h-5" />,
    href: '#',
  },
];

/**
 * Header with PanelMenu (Tailwind CSS version)
 *
 * Stacked layout:
 * - Line 1: logo | actions
 * - Line 2: PanelMenu (full width)
 */
export function HeaderWithPanelMenuTailwind({
  className,
  panelItems,
  utilityLinks = DEFAULT_UTILITY_LINKS,
  actionButtons = DEFAULT_ACTION_BUTTONS,
  logo = 'https://www.krds.go.kr/resources/img/pattern/layout/head_logo.svg',
  logoAlt = '대한민국정부',
  logoHref = '/',
  slogan,
  stickyBehavior = 'always',
  scrollThreshold = 150,
}: HeaderWithPanelMenuProps) {
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
                        {link.icon && (
                          <span className="flex-shrink-0" aria-hidden="true">
                            {link.icon}
                          </span>
                        )}
                        {link.label}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="rounded-xl min-w-[140px] py-2.5 z-[100]"
                        sideOffset={5}
                        align="end"
                      >
                        {link.children.map((child) => {
                          const itemContent = (
                            <DropdownMenuItem
                              className={cn(
                                'flex items-center justify-between gap-2 text-krds-body-sm',
                                child.isSelected &&
                                  'bg-krds-primary-5 font-medium'
                              )}
                              aria-checked={child.isSelected}
                              onSelect={child.onClick}
                            >
                              {child.label}
                              {child.external && (
                                <SquareArrowOutUpRight
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                />
                              )}
                              {child.isSelected && (
                                <Check
                                  className="w-4 h-4 text-krds-primary-60 ml-auto"
                                  aria-hidden="true"
                                />
                              )}
                            </DropdownMenuItem>
                          );

                          // href가 있으면 링크, 없으면 버튼 동작
                          return child.href ? (
                            <a
                              key={child.label}
                              href={child.href}
                              {...(child.external && {
                                target: '_blank',
                                rel: 'noopener noreferrer',
                              })}
                            >
                              {itemContent}
                            </a>
                          ) : (
                            <React.Fragment key={child.label}>
                              {itemContent}
                            </React.Fragment>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    // Depth 1: 일반 링크
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1 text-krds-body-sm font-medium text-krds-gray-90 hover:text-krds-primary-60 transition-colors py-2 px-3"
                      {...(link.external && {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      })}
                    >
                      {link.icon && (
                        <span className="flex-shrink-0" aria-hidden="true">
                          {link.icon}
                        </span>
                      )}
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

      {/* Branding + Actions (Line 1) */}
      <Container className="flex items-center justify-between pb-1 gap-2">
        {/* Logo */}
        <Logo src={logo} alt={logoAlt} href={logoHref} slogan={slogan} />

        {/* Actions */}
        <div className="hidden lg:inline-flex gap-2">
          {actionButtons.map((button) => (
            <Button
              key={button.label}
              variant="ghost"
              href={button.isSearchTrigger ? undefined : button.href}
              className="flex flex-col gap-1 items-center min-w-0 h-full !py-2 !px-3 hover:bg-krds-gray-10"
              aria-label={button.isSearchTrigger ? '검색' : undefined}
              onClick={
                button.isSearchTrigger
                  ? () => setIsSearchOpen(true)
                  : button.onClick
              }
            >
              <span aria-hidden="true">{button.icon}</span>
              {button.label}
            </Button>
          ))}
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
        </div>

        {/* Mobile Menu Toggle */}
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
      </Container>

      {/* PanelMenu (Line 2) - Desktop only */}
      <nav
        id="gnb"
        className="hidden lg:flex justify-center w-full bg-white border-t border-krds-gray-20"
        aria-label="주 메뉴"
      >
        <Container>
          <PanelMenu items={panelItems} />
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
              {panelItems.map((item) => (
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

export { HeaderWithPanelMenuTailwind as HeaderWithPanelMenu };
