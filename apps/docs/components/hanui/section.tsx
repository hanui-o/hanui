'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Global Styles for KRDS Section Spacing System
 *
 * This component injects the required CSS for automatic spacing.
 * Import any Section component to automatically include these styles.
 */
function GlobalStyles() {
  return (
    <style jsx global>{`
      /* KRDS Section Spacing System v3 */
      /*
       * 공식 KRDS Gap-layout 명세 기반:
       * - 헤딩과 본문 사이 간격 (title-body): 컴포넌트 내부 gap으로 관리
       * - 헤딩 간 간격 (heading-to-heading): CSS 인접 선택자로 관리
       * - description은 모든 레벨에서 선택사항
       */

      /* ============================================
         헤딩 → 본문 간격 (Heading-to-Body)
         ============================================ */

      /* h1 → 본문: 24px */
      .krds-heading-h1 + * {
        margin-top: 1.5rem; /* 24px */
      }

      /* h2 → 본문: 20px */
      .krds-heading-h2 + *:not(.krds-subsection):not(.krds-heading-h3) {
        margin-top: 1.25rem; /* 20px */
      }

      /* h3 → 본문: 20px */
      .krds-heading-h3 + *:not(.krds-item):not(.krds-heading-h4) {
        margin-top: 1.25rem; /* 20px */
      }

      /* h4 → 본문: 20px */
      .krds-heading-h4 + *:not(.krds-subitem):not(.krds-heading-h5) {
        margin-top: 1.25rem; /* 20px */
      }

      /* h5 → 본문: 16px */
      .krds-heading-h5 + * {
        margin-top: 1rem; /* 16px */
      }

      /* ============================================
         헤딩 간 간격 (Heading-to-Heading)
         ============================================ */

      /* h1 → h2: 48px */
      .krds-heading-h1 + .krds-heading-h2,
      .krds-heading-h1 + .krds-section {
        margin-top: 3rem; /* 48px */
      }

      /* h2 → h3: 40px */
      .krds-heading-h2 + .krds-heading-h3 {
        margin-top: 2.5rem; /* 40px */
      }

      /* h3 → h4: 24px */
      .krds-heading-h3 + .krds-heading-h4 {
        margin-top: 1.5rem; /* 24px */
      }

      /* h4 → h5: 16px */
      .krds-heading-h4 + .krds-heading-h5 {
        margin-top: 1rem; /* 16px */
      }

      /* ============================================
         Subsection 간 간격 (h3 래퍼)
         ============================================ */

      /* h2 헤딩 → 첫 Subsection: 40px */
      .krds-heading-h2 + .krds-subsection {
        margin-top: 2.5rem; /* 40px */
      }

      /* Subsection 사이: 40px (h2 → h3 간격과 동일) */
      .krds-subsection + .krds-subsection {
        margin-top: 2.5rem; /* 40px */
      }

      /* 본문 콘텐츠 → Subsection: 40px */
      .krds-section
        > *:not(.krds-heading-h2):not(.krds-subsection)
        + .krds-subsection {
        margin-top: 2.5rem; /* 40px */
      }

      /* ============================================
         Item 간 간격 (h4 래퍼)
         ============================================ */

      /* Item 사이: 24px (h3 → h4 간격과 동일) */
      .krds-item + .krds-item {
        margin-top: 1.5rem; /* 24px */
      }

      /* ============================================
         SubItem 간 간격 (h5 래퍼)
         ============================================ */

      /* SubItem 사이: 16px (h4 → h5 간격과 동일) */
      .krds-subitem + .krds-subitem {
        margin-top: 1rem; /* 16px */
      }

      /* ============================================
         Section 간 간격
         ============================================ */

      /* Section 사이: 48px (데스크톱 기준, 모바일은 32px) */
      .krds-section + .krds-section {
        margin-top: 2rem; /* 32px */
      }

      @media (min-width: 768px) {
        .krds-section + .krds-section {
          margin-top: 3rem; /* 48px */
        }
      }
    `}</style>
  );
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
      <>
        <GlobalStyles />
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
      </>
    );
  }

  // description 없을 때: 헤딩만
  return (
    <>
      <GlobalStyles />
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
    </>
  );
});

SectionHeading.displayName = 'SectionHeading';

/**
 * Section Props (h2 레벨)
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 섹션 레벨
   */
  level?: 'h2';

  /**
   * 제목 (선택사항, 제공시 자동으로 SectionHeading 렌더링)
   */
  title?: string;

  /**
   * 설명 (선택사항)
   */
  description?: string;

  /**
   * 헤딩 ID (선택사항)
   */
  headingId?: string;

  /**
   * 섹션 콘텐츠
   */
  children: React.ReactNode;
}

/**
 * Section - KRDS 메인 섹션 컨테이너 (h2)
 *
 * ## 사용 방법
 *
 * ### 1. title prop으로 간단하게
 * ```tsx
 * <Section title="개요" description="...">
 *   <p>내용</p>
 * </Section>
 * ```
 *
 * ### 2. SectionHeading을 직접 사용 (커스터마이징)
 * ```tsx
 * <Section>
 *   <SectionHeading level="h2" title="개요" id="custom-id" />
 *   <p>내용</p>
 * </Section>
 * ```
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      level = 'h2',
      title,
      description,
      headingId,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // title prop이 있으면 자동으로 SectionHeading 렌더링
    if (title) {
      return (
        <section
          ref={ref}
          className={cn('krds-section', `krds-section-${level}`, className)}
          {...props}
        >
          <SectionHeading
            level={level}
            title={title}
            description={description}
            id={headingId}
          />
          {children}
        </section>
      );
    }

    // title이 없으면 children을 그대로 렌더링 (유연한 방식)
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

/**
 * Subsection Props (h3 레벨)
 */
export interface SubsectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 서브섹션 레벨
   */
  level?: 'h3';

  /**
   * 제목 (선택사항, 제공시 자동으로 SectionHeading 렌더링)
   */
  title?: string;

  /**
   * 설명 (선택사항)
   */
  description?: string;

  /**
   * 헤딩 ID (선택사항)
   */
  headingId?: string;

  /**
   * 콘텐츠
   */
  children: React.ReactNode;
}

/**
 * Subsection - KRDS 서브 섹션 컨테이너 (h3)
 *
 * Section 내부에서 사용하여 h3 레벨의 서브섹션을 명확히 구분합니다.
 *
 * @example
 * ```tsx
 * <Section title="주요 기능">
 *   <Subsection title="KRDS 디자인" description="...">
 *     <p>내용</p>
 *   </Subsection>
 * </Section>
 * ```
 */
export const Subsection = React.forwardRef<HTMLDivElement, SubsectionProps>(
  (
    {
      level = 'h3',
      title,
      description,
      headingId,
      children,
      className,
      ...props
    },
    ref
  ) => {
    if (title) {
      return (
        <div
          ref={ref}
          className={cn(
            'krds-subsection',
            `krds-subsection-${level}`,
            className
          )}
          {...props}
        >
          <SectionHeading
            level={level}
            title={title}
            description={description}
            id={headingId}
          />
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('krds-subsection', `krds-subsection-${level}`, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Subsection.displayName = 'Subsection';

/**
 * Item Props (h4 레벨)
 */
export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 항목 레벨
   */
  level?: 'h4';

  /**
   * 제목 (선택사항, 제공시 자동으로 SectionHeading 렌더링)
   */
  title?: string;

  /**
   * 설명 (선택사항)
   */
  description?: string;

  /**
   * 헤딩 ID (선택사항)
   */
  headingId?: string;

  /**
   * 콘텐츠
   */
  children: React.ReactNode;
}

/**
 * Item - KRDS 섹션 항목 컨테이너 (h4)
 *
 * Subsection 내부에서 사용하여 h4 레벨의 세부 항목을 명확히 구분합니다.
 *
 * @example
 * ```tsx
 * <Subsection title="Props">
 *   <Item title="variant" description="버튼 스타일">
 *     <p>primary, secondary, outline</p>
 *   </Item>
 * </Subsection>
 * ```
 */
export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      level = 'h4',
      title,
      description,
      headingId,
      children,
      className,
      ...props
    },
    ref
  ) => {
    if (title) {
      return (
        <div
          ref={ref}
          className={cn('krds-item', `krds-item-${level}`, className)}
          {...props}
        >
          <SectionHeading
            level={level}
            title={title}
            description={description}
            id={headingId}
          />
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('krds-item', `krds-item-${level}`, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Item.displayName = 'Item';

/**
 * SubItem Props (h5 레벨)
 */
export interface SubItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 하위 항목 레벨
   */
  level?: 'h5';

  /**
   * 제목 (선택사항, 제공시 자동으로 SectionHeading 렌더링)
   */
  title?: string;

  /**
   * 설명 (선택사항)
   */
  description?: string;

  /**
   * 헤딩 ID (선택사항)
   */
  headingId?: string;

  /**
   * 콘텐츠
   */
  children: React.ReactNode;
}

/**
 * SubItem - KRDS 하위 항목 컨테이너 (h5)
 *
 * Item 내부에서 사용하여 h5 레벨의 더 작은 항목을 명확히 구분합니다.
 *
 * @example
 * ```tsx
 * <Item title="variant">
 *   <SubItem title="primary" description="기본 버튼">
 *     <p>가장 중요한 액션</p>
 *   </SubItem>
 * </Item>
 * ```
 */
export const SubItem = React.forwardRef<HTMLDivElement, SubItemProps>(
  (
    {
      level = 'h5',
      title,
      description,
      headingId,
      children,
      className,
      ...props
    },
    ref
  ) => {
    if (title) {
      return (
        <div
          ref={ref}
          className={cn('krds-subitem', `krds-subitem-${level}`, className)}
          {...props}
        >
          <SectionHeading
            level={level}
            title={title}
            description={description}
            id={headingId}
          />
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('krds-subitem', `krds-subitem-${level}`, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SubItem.displayName = 'SubItem';

/**
 * ============================================
 * CSS for KRDS Section Spacing System
 * ============================================
 *
 * CSS is automatically injected via <style jsx global> when you import this component.
 * No manual CSS setup required!
 *
 * For reference, the injected CSS includes:
 *
 * ```css
 * /* KRDS Section Spacing System v3 *\/
 * /*
 *  * 공식 KRDS Gap-layout 명세 기반:
 *  * - 헤딩과 본문 사이 간격 (title-body): 컴포넌트 내부 gap으로 관리
 *  * - 헤딩 간 간격 (heading-to-heading): CSS 인접 선택자로 관리
 *  * - description은 모든 레벨에서 선택사항
 *  *
 *  * KRDS 공식 명세:
 *  * - h1 → body: 24px (title-body-large)
 *  * - h2 → body: 20px (title-body-medium)
 *  * - h3 → body: 20px (title-body-medium)
 *  * - h4 → body: 20px (title-body-medium)
 *  * - h5 → body: 16px (title-body-small)
 *  *
 *  * - h1 → h2: 48px
 *  * - h2 → h3: 40px
 *  * - h3 → h4: 24px
 *  * - h4 → h5: 16px
 *  *\/
 *
 * /* ============================================
 *    헤딩 → 본문 간격 (Heading-to-Body)
 *    ============================================ *\/
 *
 * /* h1 → 본문: 24px *\/
 * .krds-heading-h1 + * {
 *   margin-top: 1.5rem; /* 24px *\/
 * }
 *
 * /* h2 → 본문: 20px *\/
 * .krds-heading-h2 + *:not(.krds-subsection):not(.krds-heading-h3) {
 *   margin-top: 1.25rem; /* 20px *\/
 * }
 *
 * /* h3 → 본문: 20px *\/
 * .krds-heading-h3 + *:not(.krds-item):not(.krds-heading-h4) {
 *   margin-top: 1.25rem; /* 20px *\/
 * }
 *
 * /* h4 → 본문: 20px *\/
 * .krds-heading-h4 + *:not(.krds-subitem):not(.krds-heading-h5) {
 *   margin-top: 1.25rem; /* 20px *\/
 * }
 *
 * /* h5 → 본문: 16px *\/
 * .krds-heading-h5 + * {
 *   margin-top: 1rem; /* 16px *\/
 * }
 *
 * /* ============================================
 *    헤딩 간 간격 (Heading-to-Heading)
 *    ============================================ *\/
 *
 * /* h1 → h2: 48px *\/
 * .krds-heading-h1 + .krds-heading-h2,
 * .krds-heading-h1 + .krds-section {
 *   margin-top: 3rem; /* 48px *\/
 * }
 *
 * /* h2 → h3: 40px *\/
 * .krds-heading-h2 + .krds-heading-h3 {
 *   margin-top: 2.5rem; /* 40px *\/
 * }
 *
 * /* h3 → h4: 24px *\/
 * .krds-heading-h3 + .krds-heading-h4 {
 *   margin-top: 1.5rem; /* 24px *\/
 * }
 *
 * /* h4 → h5: 16px *\/
 * .krds-heading-h4 + .krds-heading-h5 {
 *   margin-top: 1rem; /* 16px *\/
 * }
 *
 * /* ============================================
 *    Subsection 간 간격 (h3 래퍼)
 *    ============================================ *\/
 *
 * /* h2 헤딩 → 첫 Subsection: 40px *\/
 * .krds-heading-h2 + .krds-subsection {
 *   margin-top: 2.5rem; /* 40px *\/
 * }
 *
 * /* Subsection 사이: 40px (h2 → h3 간격과 동일) *\/
 * .krds-subsection + .krds-subsection {
 *   margin-top: 2.5rem; /* 40px *\/
 * }
 *
 * /* 본문 콘텐츠 → Subsection: 40px *\/
 * .krds-section > *:not(.krds-heading-h2):not(.krds-subsection) + .krds-subsection {
 *   margin-top: 2.5rem; /* 40px *\/
 * }
 *
 * /* ============================================
 *    Item 간 간격 (h4 래퍼)
 *    ============================================ *\/
 *
 * /* Item 사이: 24px (h3 → h4 간격과 동일) *\/
 * .krds-item + .krds-item {
 *   margin-top: 1.5rem; /* 24px *\/
 * }
 *
 * /* ============================================
 *    SubItem 간 간격 (h5 래퍼)
 *    ============================================ *\/
 *
 * /* SubItem 사이: 16px (h4 → h5 간격과 동일) *\/
 * .krds-subitem + .krds-subitem {
 *   margin-top: 1rem; /* 16px *\/
 * }
 *
 * /* ============================================
 *    Section 간 간격
 *    ============================================ *\/
 *
 * /* Section 사이: 48px (데스크톱 기준, 모바일은 32px) *\/
 * .krds-section + .krds-section {
 *   margin-top: 2rem; /* 32px *\/
 * }
 *
 * @media (min-width: 768px) {
 *   .krds-section + .krds-section {
 *     margin-top: 3rem; /* 48px *\/
 *   }
 * }
 * ```
 */
