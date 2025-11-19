'use client';

import * as React from 'react';
import { Link } from './link';
import { cn } from '@/lib/utils';

export interface PageNavigationItem {
  title: string;
  href: string;
}

export interface PageNavigationProps {
  prev?: PageNavigationItem;
  next?: PageNavigationItem;
  className?: string;
}

/**
 * PageNavigation Component
 *
 * 문서 하단의 이전/다음 페이지 네비게이션
 *
 * @example
 * ```tsx
 * <PageNavigation
 *   prev={{ title: 'Installation', href: '/docs/installation' }}
 *   next={{ title: 'Quick Start', href: '/docs/quick-start' }}
 * />
 * ```
 */
export function PageNavigation({ prev, next, className }: PageNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav
      className={cn('flex gap-10 mt-12 pt-8', className)}
      aria-label="페이지 네비게이션"
    >
      {/* Previous */}
      {prev ? (
        <Link
          href={prev.href}
          variant="none"
          className="flex items-center gap-2 px-6 py-4 border border-krds-gray-20 rounded-lg hover:bg-krds-gray-5 transition-colors group flex-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0 text-krds-gray-50 group-hover:text-krds-gray-70 transition-colors"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          <div className="flex flex-col items-start min-w-0">
            <span className="text-xs text-krds-gray-50 mb-1">Previous</span>
            <span className="text-sm font-medium text-krds-gray-95 truncate w-full">
              {prev.title}
            </span>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {/* Next */}
      {next ? (
        <Link
          href={next.href}
          variant="none"
          className="flex items-center gap-2 px-6 py-4 border border-krds-gray-20 rounded-lg hover:bg-krds-gray-5 transition-colors group flex-1"
        >
          <div className="flex flex-col items-end min-w-0 flex-1">
            <span className="text-xs text-krds-gray-50 mb-1">Next</span>
            <span className="text-sm font-medium text-krds-gray-95 truncate w-full text-right">
              {next.title}
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0 text-krds-gray-50 group-hover:text-krds-gray-70 transition-colors"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
