import type { ReactNode } from 'react';
import { cn } from '@hanui/react';

interface HeadingProps {
  /**
   * Heading 레벨 (h1-h5)
   */
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

  /**
   * 제목 텍스트
   */
  title: string;

  /**
   * 설명 텍스트 (선택사항)
   */
  description?: string;

  /**
   * HTML id 속성 (선택사항)
   * 앵커 링크 및 목차 생성에 사용
   */
  id?: string;

  /**
   * 커스텀 설명 콘텐츠 (description 대신 사용 가능)
   */
  children?: ReactNode;

  /**
   * 추가 className
   */
  className?: string;
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
 * Get heading styles based on level
 */
function getHeadingStyles(level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'): string {
  const styles: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5', string> = {
    h1: 'text-[28px] md:text-[40px]',
    h2: 'text-[24px] md:text-[32px]',
    h3: 'text-[22px] md:text-[24px]',
    h4: 'text-[19px]',
    h5: 'text-[17px]',
  };
  return styles[level];
}

/**
 * Get spacing styles (margin + gap) based on level
 */
function getSpacing(level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'): string {
  const spacing: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5', string> = {
    h1: 'mb-4 md:mb-12 gap-3 md:gap-6',
    h2: 'mt-4 md:mt-12 mb-3 md:mb-10 gap-2 md:gap-5',
    h3: 'mt-4 md:mt-10 mb-3 md:mb-6 gap-2 md:gap-4',
    h4: 'mt-3 md:mt-6 mb-2 md:mb-4 gap-1.5 md:gap-3',
    h5: 'mt-3 md:mt-4 mb-2 md:mb-4 gap-1.5 md:gap-2',
  };
  return spacing[level];
}

/**
 * Heading - 섹션 내부 제목과 설명 컴포넌트
 *
 * PageSection 내부에서 사용하는 제목과 설명을 일관되게 표시합니다.
 * KRDS 타이포그래피 가이드라인을 준수합니다.
 *
 * @example
 * ```tsx
 * // 설명과 함께
 * <Heading
 *   level="h2"
 *   id="overview"
 *   title="개요"
 *   description="이 섹션에 대한 설명입니다."
 * />
 *
 * // 설명 없이
 * <Heading
 *   level="h3"
 *   title="서브 섹션"
 * />
 *
 * // 커스텀 설명 콘텐츠
 * <Heading level="h2" title="고급 기능">
 *   <div className="text-krds-gray-70">
 *     커스텀 내용 <strong>강조</strong> 가능
 *   </div>
 * </Heading>
 * ```
 */
export function Heading({
  level,
  title,
  description,
  id,
  children,
  className,
}: HeadingProps) {
  const Tag = level;
  const headingId = id || generateId(title);
  const hasDescription = Boolean(description || children);

  const headingClasses = cn(
    'font-bold leading-[150%] text-krds-gray-95',
    getHeadingStyles(level)
  );

  const descriptionClasses = 'text-krds-gray-70 leading-relaxed text-[17px]';
  const spacing = getSpacing(level);

  // With description: use flex column with spacing
  if (hasDescription) {
    return (
      <div className={cn('flex flex-col', spacing, className)}>
        <Tag id={headingId} className={headingClasses}>
          {title}
        </Tag>
        {description && <p className={descriptionClasses}>{description}</p>}
        {children}
      </div>
    );
  }

  // Without description: just heading with margin
  return (
    <div className={cn(spacing, className)}>
      <Tag id={headingId} className={headingClasses}>
        {title}
      </Tag>
    </div>
  );
}
