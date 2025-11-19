import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Stack Variants Definition
 *
 * KRDS gap-layout semantic spacing (responsive PC/Mobile)
 * Context-based naming for intuitive usage
 */
const stackVariants = cva('flex', {
  variants: {
    /**
     * Spacing - Context-based semantic spacing
     *
     * Choose spacing based on the relationship between elements:
     * - section: Large block separation (like major sections)
     * - heading-content: Title and its description (tight relationship)
     * - content: Same-level elements (paragraphs, cards, list items)
     * - inline: Small related elements (tags, chips, badges)
     */
    spacing: {
      // ===== No Spacing =====
      none: 'gap-0', // 0px - No gap between items

      // ===== Section Level (큰 블록 구분) =====
      section: 'gap-10 md:gap-20', // 40px/80px - Major section breaks
      'section-tight': 'gap-8 md:gap-16', // 32px/64px - Minor section breaks

      // ===== Heading-Content (제목-콘텐츠 관계) =====
      'heading-content': 'gap-3 md:gap-5', // 12px/20px - Title → description (tight)
      'heading-tight': 'gap-2 md:gap-4', // 8px/16px - Title → very close content
      'heading-loose': 'gap-5 md:gap-6', // 20px/24px - Title → spaced content

      // ===== Content Level (같은 레벨 콘텐츠) =====
      content: 'gap-4 md:gap-6', // 16px/24px - Paragraphs, cards, list items
      'content-tight': 'gap-3 md:gap-4', // 12px/16px - Close content blocks
      'content-loose': 'gap-6 md:gap-10', // 24px/40px - Spaced content blocks

      // ===== Inline/Compact (인라인/컴팩트) =====
      inline: 'gap-2 md:gap-3', // 8px/12px - Tags, chips, small elements
      compact: 'gap-1 md:gap-2', // 4px/8px - Very tight elements

      // ===== Special Contexts (특수 맥락) =====
      form: 'gap-4', // 16px - Form field spacing
      nav: 'gap-4 md:gap-6', // 16px/24px - Navigation items
      breadcrumb: 'gap-8 md:gap-10', // 32px/40px - Breadcrumb to heading

      // ===== Legacy Support (하위 호환성) =====
      // @deprecated Use context-based names instead
      'h1-h2': 'gap-8 md:gap-12', // → use 'heading-loose'
      'h2-h2': 'gap-10 md:gap-20', // → use 'section'
      'h2-h3': 'gap-2 md:gap-4', // → use 'heading-tight'
      'h3-h3': 'gap-8 md:gap-16', // → use 'section-tight'
      'h3-h4': 'gap-4 md:gap-6', // → use 'content'
      'h3-content': 'gap-6 md:gap-10', // → use 'content-loose'
      'title-body-small': 'gap-2 md:gap-4', // → use 'heading-tight'
      'title-body-medium': 'gap-3 md:gap-5', // → use 'heading-content'
      'title-body-large': 'gap-5 md:gap-6', // → use 'heading-loose'
      'card-list': 'gap-6', // → use 'content'
      'input-group': 'gap-2', // → use 'compact'

      // Generic numeric spacing (use sparingly)
      xs: 'gap-2', // 8px
      sm: 'gap-3', // 12px
      md: 'gap-4', // 16px
      lg: 'gap-6', // 24px
      xl: 'gap-8', // 32px
      '2xl': 'gap-10', // 40px
      '3xl': 'gap-16', // 64px
    },
    /**
     * Direction - flex direction (Stack only)
     */
    direction: {
      row: 'flex-row',
    },
    /**
     * Align items
     */
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    /**
     * Justify content
     */
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
  },
  defaultVariants: {
    spacing: 'none', // 기본값 0 - KRDS 가이드라인에 따라 명시적 간격 지정 권장
  },
});

/**
 * Stack Props Interface
 */
export interface StackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'gap'>,
    Omit<VariantProps<typeof stackVariants>, 'spacing'> {
  /**
   * Context-based semantic spacing
   * @default "none" (0px) - KRDS 가이드라인에 따라 명시적 간격 지정 권장
   */
  gap?: // No Spacing
  | 'none'
    // Section Level
    | 'section'
    | 'section-tight'
    // Heading-Content
    | 'heading-content'
    | 'heading-tight'
    | 'heading-loose'
    // Content Level
    | 'content'
    | 'content-tight'
    | 'content-loose'
    // Inline/Compact
    | 'inline'
    | 'compact'
    // Special Contexts
    | 'form'
    | 'nav'
    | 'breadcrumb'
    // Legacy (deprecated)
    | 'h1-h2'
    | 'h2-h2'
    | 'h2-h3'
    | 'h3-h3'
    | 'h3-h4'
    | 'h3-content'
    | 'title-body-small'
    | 'title-body-medium'
    | 'title-body-large'
    | 'card-list'
    | 'input-group'
    // Generic numeric
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    // Numeric string (e.g., "10" for gap-10)
    | `${number}`
    // Number literal (e.g., 0, 4, 10 for gap-0, gap-4, gap-10)
    | number;

  /**
   * Stack direction (Stack only, not available for HStack/VStack)
   * @default undefined (vertical)
   */
  direction?: 'row';

  /**
   * Align items
   */
  align?: 'start' | 'center' | 'end' | 'stretch';

  /**
   * Justify content
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';

  /**
   * Element to render as
   * @default "div"
   */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
}

/**
 * Stack Component
 *
 * KRDS-compliant spacing component with context-based semantic spacing
 *
 * @example
 * ```tsx
 * // Title and description
 * <Stack gap="heading-content">
 *   <Heading level="h2">제목</Heading>
 *   <Body>설명 내용...</Body>
 * </Stack>
 *
 * // Content blocks
 * <Stack gap="content">
 *   <Card>카드 1</Card>
 *   <Card>카드 2</Card>
 * </Stack>
 *
 * // Form layout
 * <Stack gap="form">
 *   <Input label="이름" />
 *   <Input label="이메일" />
 *   <Button>제출</Button>
 * </Stack>
 * ```
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      gap,
      direction,
      align,
      justify,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    // 숫자 또는 숫자 문자열인 경우 gap-{number} 클래스로 변환
    const isNumericGap =
      typeof gap === 'number' ||
      (typeof gap === 'string' &&
        /^\d+$/.test(gap) &&
        !['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(gap));

    const gapClass = isNumericGap ? `gap-${gap}` : undefined;

    // gap이 숫자이거나 숫자 문자열이면 stackVariants에서 제외
    const variantSpacing = isNumericGap
      ? undefined
      : (gap as VariantProps<typeof stackVariants>['spacing']);

    return (
      <Component
        ref={ref as any}
        className={cn(
          stackVariants({ spacing: variantSpacing, direction, align, justify }),
          gapClass,
          !direction && 'flex-col', // Default to vertical if direction not specified
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Stack.displayName = 'Stack';

/**
 * VStack Component - Vertical Stack
 *
 * Alias for Stack (always vertical). Use Stack or VStack interchangeably.
 *
 * @example
 * ```tsx
 * <VStack gap="md">
 *   <div>First</div>
 *   <div>Second</div>
 * </VStack>
 * ```
 */
export const VStack = React.forwardRef<
  HTMLDivElement,
  Omit<StackProps, 'direction'>
>((props, ref) => {
  return <Stack ref={ref} {...props} />;
});
VStack.displayName = 'VStack';

/**
 * HStack Component - Horizontal Stack
 *
 * Horizontal stack component. Always uses flex-row direction.
 * Default align is 'center' for better horizontal alignment
 *
 * @example
 * ```tsx
 * <HStack gap="md">
 *   <div>Left</div>
 *   <div>Right</div>
 * </HStack>
 * ```
 */
export const HStack = React.forwardRef<
  HTMLDivElement,
  Omit<StackProps, 'direction'>
>(({ align = 'center', className, ...props }, ref) => {
  return (
    <Stack
      ref={ref}
      direction="row"
      align={align}
      className={className}
      {...props}
    />
  );
});
HStack.displayName = 'HStack';

/**
 * Export stackVariants for extending
 */
export { stackVariants };
