'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * SkipLink 표시 방식
 */
export type SkipLinkVariant = 'visible' | 'hidden';

/**
 * SkipLink 링크 아이템
 */
export interface SkipLinkItem {
  /** 링크 목적지 (예: '#main-content') */
  href: string;
  /** 링크 라벨 텍스트 (예: '본문 바로가기') */
  label: string;
}

/**
 * SkipLink Props
 */
export interface SkipLinkProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * 건너뛰기 링크 배열 (최대 3개 권장)
   * @example [{ href: '#main-content', label: '본문 바로가기' }]
   */
  links: SkipLinkItem[];

  /**
   * 표시 방식
   * - hidden: 포커스 시에만 표시 (기본값)
   * - visible: 항상 표시
   * @default "hidden"
   */
  variant?: SkipLinkVariant;

  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 기본 건너뛰기 링크
 */
const DEFAULT_LINKS: SkipLinkItem[] = [
  { href: '#main-content', label: '본문 바로가기' },
];

/**
 * SkipLink - 건너뛰기 링크 컴포넌트
 *
 * 키보드 및 스크린 리더 사용자가 반복적인 콘텐츠를 건너뛰고
 * 주요 콘텐츠로 바로 이동할 수 있도록 돕는 접근성 필수 컴포넌트입니다.
 *
 * KRDS 필수 요구사항:
 * - id="krds-skip-link" 자동 적용
 * - 페이지 최상단 배치 (쿠키 배너/모달 제외)
 * - 최대 3개 링크 권장
 *
 * WCAG 2.1 / KWCAG 2.2 준수:
 * - Bypass Blocks (2.4.1) Level A
 * - Focus Visible (2.4.7) Level AA
 *
 * @example
 * <SkipLink
 *   links={[
 *     { href: '#main-content', label: '본문 바로가기' },
 *     { href: '#main-navigation', label: '주 메뉴 바로가기' },
 *   ]}
 * />
 */
export const SkipLink = React.forwardRef<HTMLElement, SkipLinkProps>(
  ({ links = DEFAULT_LINKS, variant = 'hidden', className, ...props }, ref) => {
    // 개발 환경에서 3개 초과 링크 경고
    React.useEffect(() => {
      if (process.env.NODE_ENV === 'development' && links.length > 3) {
        console.warn(
          'SkipLink: 최대 3개 링크를 권장합니다. 현재 개수:',
          links.length
        );
      }
    }, [links.length]);

    // 링크 클릭 핸들러 - 대상 요소로 스크롤 및 포커스 이동
    const handleClick = (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string
    ) => {
      e.preventDefault();

      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // 대상 요소로 스크롤
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // 컨테이너 내 첫 번째 포커스 가능 요소 찾기
        const firstFocusable = targetElement.querySelector(
          'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;

        // 스크롤 완료 후 포커스 이동
        setTimeout(() => {
          if (firstFocusable) {
            firstFocusable.focus();
          } else {
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
          }
        }, 100);

        // URL 해시 업데이트 (스크롤 트리거 방지)
        if (window.history.pushState) {
          window.history.pushState(null, '', href);
        } else {
          // eslint-disable-next-line react-hooks/immutability
          window.location.hash = href;
        }
      }
    };

    // hidden: 포커스 시에만 표시
    const hiddenLinkClass =
      'fixed left-0 -top-full z-[9999] w-full h-8 px-4 py-2 text-[15px] text-center ' +
      'bg-krds-gray-90 text-white ' +
      'focus:top-0 focus:outline-none focus:ring-2 focus:ring-krds-func-info focus:ring-offset-2';

    // visible: 항상 표시
    const visibleLinkClass =
      'block w-full px-4 py-2 text-krds-body-sm text-center ' +
      'bg-krds-gray-90 text-white ' +
      'hover:bg-krds-gray-80 ' +
      'focus:outline-none focus:ring-2 focus:ring-krds-func-info focus:ring-offset-2';

    return (
      <nav
        ref={ref}
        id="krds-skip-link"
        aria-label="건너뛰기 링크"
        className={cn(variant === 'visible' && 'flex flex-col', className)}
        {...props}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className={
              variant === 'visible' ? visibleLinkClass : hiddenLinkClass
            }
          >
            {link.label}
          </a>
        ))}
      </nav>
    );
  }
);

SkipLink.displayName = 'SkipLink';
