'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

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
 * KRDS Gap-layout: 헤딩-본문 사이 간격
 *
 * 공식 명세:
 * - h1: title-body-large (24px)
 * - h2: title-body-medium (20px)
 * - h3: title-body-medium (20px)
 * - h4: title-body-medium (20px)
 * - h5: title-body-small (16px)
 */
const titleBodyGap = {
  h1: 'gap-6', // 24px
  h2: 'gap-5', // 20px
  h3: 'gap-5', // 20px
  h4: 'gap-5', // 20px
  h5: 'gap-4', // 16px
} as const;

/**
 * SectionHeading Props
 */
export interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 헤딩 레벨
   */
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

  /**
   * 제목
   */
  title: string;

  /**
   * 설명 (모든 레벨에서 선택사항)
   */
  description?: string;

  /**
   * HTML id 속성
   */
  id?: string;

  /**
   * 커스텀 설명 콘텐츠
   */
  children?: React.ReactNode;
}

/**
 * SectionHeading - KRDS 섹션 헤딩 컴포넌트
 *
 * ## KRDS Gap-layout 준수
 * - 헤딩과 설명 사이 간격은 컴포넌트 내부에서 gap으로 관리
 * - 헤딩과 다음 콘텐츠 사이 간격은 CSS로 자동 관리
 * - 섹션 간 간격은 CSS 인접 선택자로 자동 관리
 *
 * ## 간격 명세 (KRDS 공식)
 * - h1 → body: 24px (title-body-large)
 * - h2 → body: 20px (title-body-medium)
 * - h3 → body: 20px (title-body-medium)
 * - h4 → body: 20px (title-body-medium)
 * - h5 → body: 16px (title-body-small)
 *
 * @example
 * ```tsx
 * // description과 함께
 * <SectionHeading
 *   level="h2"
 *   title="개요"
 *   description="이 섹션의 설명입니다."
 * />
 *
 * // description 없이
 * <SectionHeading level="h2" title="설치" />
 *
 * // 커스텀 콘텐츠
 * <SectionHeading level="h2" title="고급 기능">
 *   <div>커스텀 설명</div>
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

  // description이 있을 때: flex column으로 헤딩-설명 gap 관리
  if (hasDescription) {
    return (
      <div
        ref={ref}
        className={cn(
          'krds-section-heading',
          `krds-heading-${level}`,
          'flex flex-col',
          titleBodyGap[level],
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

  // description 없을 때: 헤딩만
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

/**
 * Section Props
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 섹션 레벨 (주로 h2 사용)
   */
  level?: 'h2' | 'h3';

  /**
   * 섹션 콘텐츠
   */
  children: React.ReactNode;
}

/**
 * Section - KRDS 섹션 컨테이너
 *
 * SectionHeading과 함께 사용하여 의미있는 섹션을 구성합니다.
 * CSS 인접 선택자를 통해 섹션 간 간격이 KRDS 명세대로 자동 조정됩니다.
 *
 * ## KRDS 헤딩 간 간격 (Gap-layout)
 * - h1 → h2: 48px
 * - h2 → h3: 40px
 * - h3 → h4: 24px
 * - h4 → h5: 16px
 *
 * @example
 * ```tsx
 * <Section level="h2">
 *   <SectionHeading level="h2" title="개요" description="..." />
 *   <p>본문...</p>
 *
 *   <SectionHeading level="h3" title="서브 섹션" />
 *   <p>내용...</p>
 * </Section>
 * ```
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ level = 'h2', children, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn('krds-section', `krds-section-${level}`, className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';
