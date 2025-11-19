import Link from 'next/link';
import { cn } from '@hanui/react';

interface PageLink {
  title: string;
  href: string;
}

interface PageNavigationProps {
  prev?: PageLink;
  next?: PageLink;
  className?: string;
}

/**
 * PageNavigation - 페이지 하단의 이전/다음 네비게이션
 *
 * 문서 페이지 하단에서 이전 페이지와 다음 페이지로 이동할 수 있는 네비게이션을 제공합니다.
 *
 * @example
 * ```tsx
 * <PageNavigation
 *   prev={{ title: 'Typography', href: '/design-system/typography' }}
 *   next={{ title: 'Display', href: '/typography/display' }}
 * />
 * ```
 */
export function PageNavigation({ prev, next, className }: PageNavigationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      className={cn(
        'flex items-center justify-between gap-4 pt-8 mt-8 border-t border-krds-gray-20',
        className
      )}
    >
      {prev ? (
        <Link
          href={prev.href}
          className="flex flex-col gap-1 p-4 rounded-lg border border-krds-gray-20 hover:border-krds-primary-base hover:bg-krds-primary-5 transition-all flex-1"
        >
          <span className="text-sm text-krds-gray-70">이전</span>
          <span className="font-medium text-krds-gray-95">{prev.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="flex flex-col gap-1 p-4 rounded-lg border border-krds-gray-20 hover:border-krds-primary-base hover:bg-krds-primary-5 transition-all flex-1 text-right"
        >
          <span className="text-sm text-krds-gray-70">다음</span>
          <span className="font-medium text-krds-gray-95">{next.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
