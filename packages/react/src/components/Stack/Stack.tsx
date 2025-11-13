import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Stack Variants Definition
 *
 * KRDS gap-layout semantic spacing (responsive PC/Mobile)
 */
const stackVariants = cva('flex', {
  variants: {
    /**
     * Spacing - Semantic gap values based on KRDS
     */
    spacing: {
      // Header & Navigation
      'header-breadcrumb': 'gap-4 md:gap-6', // 16px (Mobile) / 24px (PC)

      // Layout spacing
      'left-contents': 'gap-0 md:gap-16', // 0px (Mobile) / 64px (PC)
      'contents-right': 'gap-0 md:gap-10', // 0px (Mobile) / 40px (PC)
      'contents-footer': 'gap-10 md:gap-16', // 40px (Mobile) / 64px (PC)

      // Heading hierarchy
      'h1-h2': 'gap-8 md:gap-12', // 32px (Mobile) / 48px (PC)
      'h2-h2': 'gap-10 md:gap-20', // 40px (Mobile) / 80px (PC)
      'h2-h3': 'gap-6 md:gap-10', // 24px (Mobile) / 40px (PC)
      'h3-h3': 'gap-8 md:gap-16', // 32px (Mobile) / 64px (PC)
      'h3-h4': 'gap-4 md:gap-6', // 16px (Mobile) / 24px (PC)
      'h4-h4': 'gap-6 md:gap-10', // 24px (Mobile) / 40px (PC)
      'h4-h5': 'gap-3 md:gap-4', // 12px (Mobile) / 16px (PC)
      'h5-h5': 'gap-4 md:gap-8', // 16px (Mobile) / 32px (PC)

      // Title to body spacing
      'title-body-small': 'gap-2 md:gap-4', // 8px (Mobile) / 16px (PC)
      'title-body-medium': 'gap-3 md:gap-5', // 12px (Mobile) / 20px (PC)
      'title-body-large': 'gap-5 md:gap-6', // 20px (Mobile) / 24px (PC)

      // Breadcrumb to heading
      'breadcrumb-h1': 'gap-8 md:gap-10', // 32px (Mobile) / 40px (PC)

      // Text spacing
      'text-text-large': 'gap-4 md:gap-5', // 16px (Mobile) / 20px (PC)
      'text-text-medium': 'gap-3 md:gap-4', // 12px (Mobile) / 16px (PC)
      'text-text-small': 'gap-2.5 md:gap-3', // 10px (Mobile) / 12px (PC)

      // Image to text spacing
      'image-text-small': 'gap-4 md:gap-5', // 16px (Mobile) / 20px (PC)
      'image-text-medium': 'gap-5 md:gap-6', // 20px (Mobile) / 24px (PC)
      'image-text-large': 'gap-6 md:gap-8', // 24px (Mobile) / 32px (PC)

      // Legacy aliases (backwards compatibility)
      'h3-content': 'gap-6 md:gap-10', // alias for h3-h4
      form: 'gap-4', // 16px - 폼 필드 간격
      'card-list': 'gap-6', // 24px - 카드 리스트
      'input-group': 'gap-2', // 8px - 인풋 그룹 (라벨-입력)

      // Generic spacing (fallback)
      xs: 'gap-2', // 8px
      sm: 'gap-3', // 12px
      md: 'gap-4', // 16px
      lg: 'gap-6', // 24px
      xl: 'gap-8', // 32px
      '2xl': 'gap-10', // 40px
      '3xl': 'gap-16', // 64px
    },
    /**
     * Direction - flex direction
     */
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
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
    spacing: 'md',
    direction: 'vertical',
  },
});

/**
 * Stack Props Interface
 */
export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  /**
   * Semantic spacing preset or generic size
   * @default "md"
   */
  spacing?: // Header & Navigation
  | 'header-breadcrumb'
    // Layout spacing
    | 'left-contents'
    | 'contents-right'
    | 'contents-footer'
    // Heading hierarchy
    | 'h1-h2'
    | 'h2-h2'
    | 'h2-h3'
    | 'h3-h3'
    | 'h3-h4'
    | 'h4-h4'
    | 'h4-h5'
    | 'h5-h5'
    // Title to body spacing
    | 'title-body-small'
    | 'title-body-medium'
    | 'title-body-large'
    // Breadcrumb to heading
    | 'breadcrumb-h1'
    // Text spacing
    | 'text-text-large'
    | 'text-text-medium'
    | 'text-text-small'
    // Image to text spacing
    | 'image-text-small'
    | 'image-text-medium'
    | 'image-text-large'
    // Legacy aliases
    | 'h3-content'
    | 'form'
    | 'card-list'
    | 'input-group'
    // Generic spacing
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl';

  /**
   * Stack direction
   * @default "vertical"
   */
  direction?: 'vertical' | 'horizontal';

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
 * KRDS-compliant spacing component with semantic presets
 *
 * @example
 * ```tsx
 * // Form layout
 * <Stack spacing="form">
 *   <Input label="이름" />
 *   <Input label="이메일" />
 *   <Button>제출</Button>
 * </Stack>
 *
 * // Card list
 * <Stack spacing="card-list">
 *   <Card>카드 1</Card>
 *   <Card>카드 2</Card>
 * </Stack>
 *
 * // Heading hierarchy
 * <Stack spacing="h1-h2">
 *   <h1>메인 제목</h1>
 *   <h2>서브 제목</h2>
 * </Stack>
 * ```
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      spacing,
      direction,
      align,
      justify,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          stackVariants({ spacing, direction, align, justify }),
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
 * Convenience wrapper for Stack with vertical direction
 *
 * @example
 * ```tsx
 * <VStack spacing="md">
 *   <div>First</div>
 *   <div>Second</div>
 * </VStack>
 * ```
 */
export const VStack = React.forwardRef<
  HTMLDivElement,
  Omit<StackProps, 'direction'>
>((props, ref) => {
  return <Stack ref={ref} direction="vertical" {...props} />;
});
VStack.displayName = 'VStack';

/**
 * HStack Component - Horizontal Stack
 *
 * Convenience wrapper for Stack with horizontal direction
 * Default align is 'center' for better horizontal alignment
 *
 * @example
 * ```tsx
 * <HStack spacing="md">
 *   <div>Left</div>
 *   <div>Right</div>
 * </HStack>
 * ```
 */
export const HStack = React.forwardRef<
  HTMLDivElement,
  Omit<StackProps, 'direction'>
>(({ align = 'center', ...props }, ref) => {
  return <Stack ref={ref} direction="horizontal" align={align} {...props} />;
});
HStack.displayName = 'HStack';

/**
 * Export stackVariants for extending
 */
export { stackVariants };
