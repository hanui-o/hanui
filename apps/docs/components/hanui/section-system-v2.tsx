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
 * 헤딩-설명 사이 gap (description이 있는 h2, h3용)
 */
const headingDescriptionGap = {
  h2: 'gap-2 md:gap-5',
  h3: 'gap-2 md:gap-4',
} as const;

/**
 * SectionHeading Props
 */
export interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 헤딩 레벨
   * - h2, h3: 항상 description 필요 (섹션 헤더)
   * - h4, h5: description 없음 (섹션 내부 항목)
   */
  level: 'h2' | 'h3' | 'h4' | 'h5';

  /**
   * 제목
   */
  title: string;

  /**
   * 설명 (h2, h3는 필수, h4/h5는 사용 안함)
   */
  description?: string;

  /**
   * HTML id 속성
   */
  id?: string;

  /**
   * 커스텀 설명 콘텐츠 (description 대신 사용 가능)
   */
  children?: React.ReactNode;
}

/**
 * SectionHeading - KRDS 섹션 헤딩 컴포넌트
 *
 * ## 구조
 * - **h2, h3**: 항상 description과 함께 사용 (섹션의 시작을 표시)
 * - **h4, h5**: 섹션 내부의 세부 항목 (description 없음)
 *
 * ## 간격 시스템
 * - 섹션 간 간격: CSS 인접 선택자로 자동 관리
 * - 헤딩-설명 gap: 컴포넌트에서 관리
 * - 설명-본문 간격: CSS로 관리
 *
 * @example
 * ```tsx
 * // h2 섹션 헤더 (description 필수)
 * <SectionHeading
 *   level="h2"
 *   title="개요"
 *   description="HANUI는 KRDS를 준수하는 React 컴포넌트 라이브러리입니다."
 * />
 *
 * // h3 서브 섹션 헤더 (description 필수)
 * <SectionHeading
 *   level="h3"
 *   title="주요 기능"
 *   description="다음과 같은 기능을 제공합니다."
 * />
 *
 * // h4 섹션 내부 항목 (description 없음)
 * <SectionHeading level="h4" title="설치 방법" />
 *
 * // h5 더 작은 항목
 * <SectionHeading level="h5" title="npm 사용" />
 * ```
 */
export const SectionHeading = React.forwardRef<
  HTMLDivElement,
  SectionHeadingProps
>(({ level, title, description, id, children, className, ...props }, ref) => {
  const Tag = level;
  const headingId = id || generateId(title);

  const headingClasses = cn(
    'font-bold leading-[150%] text-krds-gray-95',
    headingStyles[level]
  );

  const descriptionClasses = 'text-krds-gray-70 leading-relaxed text-[17px]';

  // h2, h3: description과 함께 사용 (섹션 헤더)
  if (level === 'h2' || level === 'h3') {
    return (
      <div
        ref={ref}
        className={cn(
          'krds-section-header',
          `krds-heading-${level}`,
          'flex flex-col',
          headingDescriptionGap[level],
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

  // h4, h5: 섹션 내부 항목 (description 없음)
  return (
    <Tag
      ref={ref}
      id={headingId}
      className={cn(
        'krds-section-subheading',
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
 * CSS 인접 선택자를 통해 섹션 간 간격이 자동으로 조정됩니다.
 *
 * @example
 * ```tsx
 * <Section level="h2">
 *   <SectionHeading
 *     level="h2"
 *     title="개요"
 *     description="이 섹션의 설명입니다."
 *   />
 *   <p>본문 내용...</p>
 *
 *   <SectionHeading level="h3" title="서브 섹션" description="설명..." />
 *   <p>서브 섹션 내용...</p>
 *
 *   <SectionHeading level="h4" title="세부 항목" />
 *   <p>세부 내용...</p>
 * </Section>
 *
 * <Section level="h2">
 *   <SectionHeading level="h2" title="다음 섹션" description="..." />
 *   <p>다음 섹션 내용...</p>
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
