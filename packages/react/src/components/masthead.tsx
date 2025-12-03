'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Masthead Props
 */
export interface MastheadProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom text for the masthead banner
   * @default "이 누리집은 대한민국 공식 전자정부 누리집입니다"
   */
  text?: string;

  /**
   * Link URL for the masthead banner
   * @default "https://www.gov.kr"
   */
  href?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Masthead Component (공식 배너 컴포넌트)
 *
 * 정부 웹사이트의 최상단에 위치하여 대한민국 공식 전자정부 누리집임을 나타내는 컴포넌트
 *
 * **주요 기능:**
 * - KRDS 필수 ID 자동 적용 (#krds-masthead)
 * - SkipLink 호환성 (Bypass Blocks WCAG 2.1 / KWCAG 2.2 Level A 준수)
 * - 대한민국 국기 아이콘 자동 표시
 * - Semantic HTML 기반 접근성 지원
 *
 * **KRDS 표준:**
 * - 모든 정부 디지털 서비스 페이지 최상단 배치 필수
 * - 표준 텍스트: "이 누리집은 대한민국 공식 전자정부 누리집입니다"
 * - 시각적으로 과도한 주의를 끌지 않는 디자인
 * - 모든 정부 서비스에서 일관된 스타일 유지
 * - SkipLink가 Masthead보다 앞에 위치해야 함
 * - 공식 정부 디지털 서비스에만 사용
 *
 * **자세한 사용법:** /components/masthead 문서 참고
 */
export const Masthead = React.forwardRef<HTMLDivElement, MastheadProps>(
  (
    {
      text = '이 누리집은 대한민국 공식 전자정부 누리집입니다',
      href = 'https://www.gov.kr',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        id="krds-masthead"
        className={cn('w-full', 'bg-krds-primary-5', className)}
        role="banner"
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href={href}
            className="flex items-center gap-2 min-h-8 py-1 transition-opacity hover:opacity-80"
            aria-label="대한민국 정부포털 바로가기"
          >
            <img
              src="https://www.krds.go.kr/resources/img/component/icon/ico_flag.svg"
              alt=""
              className="w-5 h-5 shrink-0"
              aria-hidden="true"
            />
            <span className="text-sm text-krds-gray-90 font-medium leading-[150%]">
              {text}
            </span>
          </a>
        </div>
      </div>
    );
  }
);

Masthead.displayName = 'Masthead';
