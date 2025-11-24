import Link from 'next/link';
import { cn } from '@hanui/react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

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

  const navItems = [
    { item: prev, label: '이전', Icon: ArrowLeftIcon, isNext: false },
    { item: next, label: '다음', Icon: ArrowRightIcon, isNext: true },
  ];

  return (
    <nav
      className={cn('flex items-center justify-between gap-4 mt-8', className)}
    >
      {navItems.map(({ item, label, Icon, isNext }) =>
        item ? (
          <Link
            key={label}
            href={item.href}
            className="flex items-center gap-1 px-3 py-2 rounded-md bg-krds-gray-5 hover:bg-krds-gray-10 transition-all"
          >
            <span className="sr-only">{label}</span>
            {!isNext && <Icon className="w-4 h-4" />}
            <span className="text-sm text-krds-gray-95">{item.title}</span>
            {isNext && <Icon className="w-4 h-4" />}
          </Link>
        ) : (
          <div key={label} className="flex-1" />
        )
      )}
    </nav>
  );
}
