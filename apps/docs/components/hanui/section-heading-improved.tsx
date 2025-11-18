'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * SectionHeading Component Props
 */
export interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  title: string;
  description?: string;
  id?: string;
  children?: React.ReactNode;
}

/**
 * Generate a URL-friendly ID from text
 */
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s가-힣-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * KRDS 타이포그래피 스타일
 */
const headingStyles = {
  h1: 'text-[28px] md:text-[40px]',
  h2: 'text-[24px] md:text-[32px]',
  h3: 'text-[22px] md:text-[24px]',
  h4: 'text-[19px]',
  h5: 'text-[17px]',
} as const;

/**
 * KRDS 섹션 간격 시스템
 *
 * 원칙:
 * 1. 섹션 간격은 CSS 인접 선택자로 자동 관리
 * 2. 헤딩-콘텐츠 gap만 컴포넌트에서 관리
 * 3. mt는 제거하고 CSS에서 처리
 */
const contentGap = {
  h1: 'gap-3 md:gap-6', // 헤딩과 설명 사이
  h2: 'gap-2 md:gap-5',
  h3: 'gap-2 md:gap-4',
  h4: 'gap-1.5 md:gap-3',
  h5: 'gap-1 md:gap-2',
} as const;

/**
 * SectionHeading - 섹션 제목 컴포넌트
 *
 * KRDS 간격 시스템:
 * - 섹션 간 간격: CSS 인접 선택자로 자동 처리 (globals.css)
 * - 헤딩-콘텐츠 간격: 이 컴포넌트에서 gap으로 관리
 * - 콘텐츠-다음섹션 간격: CSS로 자동 처리
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <SectionHeading level="h2" title="개요" />
 *
 * // 설명과 함께
 * <SectionHeading
 *   level="h2"
 *   title="설치 방법"
 *   description="HANUI를 프로젝트에 설치하는 방법을 안내합니다."
 * />
 *
 * // 커스텀 콘텐츠
 * <SectionHeading level="h2" title="고급 기능">
 *   <div className="text-krds-gray-70">
 *     커스텀 설명 <strong>강조</strong>
 *   </div>
 * </SectionHeading>
 * ```
 */
export const SectionHeading = React.forwardRef<
  HTMLDivElement,
  SectionHeadingProps
>(({ level, title, description, id, children, className, ...props }, ref) => {
  const Tag = level;
  const headingId = id || generateId(title);
  const hasDescription = Boolean(description || children);

  const headingClasses = cn(
    'font-bold leading-[150%] text-krds-gray-95',
    headingStyles[level]
  );

  const descriptionClasses = 'text-krds-gray-70 leading-relaxed text-[17px]';

  // 설명이 있을 때: flex column으로 헤딩-설명 gap 관리
  if (hasDescription) {
    return (
      <div
        ref={ref}
        className={cn(
          'krds-section-heading',
          `krds-heading-${level}`,
          'flex flex-col',
          contentGap[level],
          className
        )}
        {...props}
      >
        <Tag id={headingId} className={headingClasses}>
          {title}
        </Tag>
        {description && <p className={descriptionClasses}>{description}</p>}
        {children}
      </div>
    );
  }

  // 설명 없을 때: 헤딩만
  return (
    <Tag
      ref={ref}
      id={headingId}
      className={cn(
        'krds-section-heading',
        `krds-heading-${level}`,
        headingClasses,
        className
      )}
      {...props}
    >
      {title}
    </Tag>
  );
});

SectionHeading.displayName = 'SectionHeading';
