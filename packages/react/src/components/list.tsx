'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

/**
 * List Props
 */
export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * List variant
   * @default 'unordered'
   */
  variant?:
    | 'unordered'
    | 'ordered'
    | 'ordered-alpha'
    | 'ordered-circle'
    | 'dash'
    | 'check';

  /**
   * Spacing between items
   * @default 'default'
   */
  spacing?: 'tight' | 'default' | 'loose';

  /**
   * Nested level (for nested lists)
   * @default 1
   */
  level?: 1 | 2 | 3;
}

/**
 * List Context - variant와 level을 ListItem에 전달
 */
interface ListContextValue {
  variant:
    | 'unordered'
    | 'ordered'
    | 'ordered-alpha'
    | 'ordered-circle'
    | 'dash'
    | 'check';
  level: 1 | 2 | 3;
  isNested: boolean;
}

const ListContext = React.createContext<ListContextValue>({
  variant: 'unordered',
  level: 1,
  isNested: false,
});

/**
 * List Item Props
 */
export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /**
   * Show bullet/number indicator
   * @default true
   */
  showIndicator?: boolean;
}

const spacingStyles = {
  tight: 'space-y-1',
  default: 'space-y-3',
  loose: 'space-y-4',
} as const;

/**
 * List - KRDS 준수 리스트 컴포넌트
 *
 * ## Features
 * - Unordered (ul) 및 Ordered (ol) 리스트 지원
 * - 3가지 간격 옵션 (tight, default, loose)
 * - KRDS 색상 및 타이포그래피 준수
 * - 완전한 접근성 지원
 *
 * @example
 * ```tsx
 * // Unordered List
 * <List>
 *   <ListItem>첫 번째 항목</ListItem>
 *   <ListItem>두 번째 항목</ListItem>
 * </List>
 *
 * // Nested List (자동으로 level=2, variant=dash 적용)
 * <List>
 *   <ListItem>
 *     사용자가 한 개의 항목을 선택할 수 있는 경우
 *     <List>
 *       <ListItem>라디오 버튼을 사용합니다</ListItem>
 *     </List>
 *   </ListItem>
 *   <ListItem>
 *     옵션을 선택하지마세요
 *     <List>
 *       <ListItem>토글 스위치를 사용합니다</ListItem>
 *     </List>
 *   </ListItem>
 * </List>
 *
 * // Ordered List (1, 2, 3...)
 * <List variant="ordered">
 *   <ListItem>단계 1</ListItem>
 *   <ListItem>단계 2</ListItem>
 * </List>
 *
 * // Ordered List with Alphabets (a, b, c...)
 * <List variant="ordered-alpha">
 *   <ListItem>항목 a</ListItem>
 *   <ListItem>항목 b</ListItem>
 * </List>
 *
 * // Ordered List with Circles (①, ②, ③...)
 * <List variant="ordered-circle">
 *   <ListItem>첫 번째</ListItem>
 *   <ListItem>두 번째</ListItem>
 * </List>
 *
 * // Dash List
 * <List variant="dash">
 *   <ListItem>대시 항목 1</ListItem>
 *   <ListItem>대시 항목 2</ListItem>
 * </List>
 *
 * // Check List
 * <List variant="check">
 *   <ListItem>체크 항목 1</ListItem>
 *   <ListItem>체크 항목 2</ListItem>
 * </List>
 *
 * // Tight spacing
 * <List spacing="tight">
 *   <ListItem>항목 1</ListItem>
 *   <ListItem>항목 2</ListItem>
 * </List>
 * ```
 */
export const List = React.forwardRef<
  HTMLUListElement | HTMLOListElement,
  ListProps
>(
  (
    {
      variant: userVariant,
      spacing = 'default',
      level: userLevel,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const parentContext = React.useContext(ListContext);

    // ListItem 내부에 중첩된 경우 자동으로 level 증가, variant=dash 적용
    const isNested = parentContext.isNested;
    const level =
      userLevel ??
      (isNested ? (Math.min(parentContext.level + 1, 3) as 1 | 2 | 3) : 1);
    const variant = userVariant ?? (isNested ? 'dash' : 'unordered');

    const isOrderedVariant =
      variant === 'ordered' ||
      variant === 'ordered-alpha' ||
      variant === 'ordered-circle';
    const Component = isOrderedVariant ? 'ol' : 'ul';

    return (
      <ListContext.Provider value={{ variant, level, isNested: false }}>
        <Component
          ref={ref as any}
          className={cn(
            'text-krds-gray-90',
            level === 2 && 'mt-2',
            level === 3 && 'mt-2',
            variant === 'ordered' && 'list-decimal list-inside',
            variant === 'ordered-alpha' && 'list-none',
            variant === 'ordered-circle' && 'list-none',
            spacingStyles[spacing],
            className
          )}
          style={
            variant === 'ordered-alpha'
              ? { counterReset: 'alpha-counter' }
              : variant === 'ordered-circle'
                ? { counterReset: 'circle-counter' }
                : undefined
          }
          {...props}
        >
          {children}
        </Component>
      </ListContext.Provider>
    );
  }
);

List.displayName = 'List';

/**
 * ListItem - List의 개별 항목
 *
 * @example
 * ```tsx
 * <ListItem>항목 내용</ListItem>
 *
 * // Without indicator
 * <ListItem showIndicator={false}>
 *   항목 내용
 * </ListItem>
 * ```
 */
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ showIndicator = true, className, children, ...props }, ref) => {
    const { variant, level } = React.useContext(ListContext);
    const isOrdered = variant === 'ordered';
    const isOrderedAlpha = variant === 'ordered-alpha';
    const isOrderedCircle = variant === 'ordered-circle';
    const isDash = variant === 'dash';
    const isCheck = variant === 'check';

    // ordered list (1, 2, 3...)
    if (isOrdered) {
      return (
        <ListContext.Provider value={{ variant, level, isNested: true }}>
          <li
            ref={ref}
            className={cn(
              showIndicator && 'list-decimal',
              !showIndicator && 'list-none',
              className
            )}
            {...props}
          >
            {children}
          </li>
        </ListContext.Provider>
      );
    }

    // ordered-alpha list (a, b, c...)
    if (isOrderedAlpha) {
      return (
        <ListContext.Provider value={{ variant, level, isNested: true }}>
          <li
            ref={ref}
            className={cn(
              'list-none relative pl-6',
              showIndicator &&
                "before:absolute before:left-0 before:font-medium before:text-krds-gray-90 before:content-[counter(alpha-counter,lower-alpha)'.']",
              className
            )}
            style={
              showIndicator ? { counterIncrement: 'alpha-counter' } : undefined
            }
            {...props}
          >
            {children}
          </li>
        </ListContext.Provider>
      );
    }

    // ordered-circle list (①, ②, ③...) - using Unicode circled numbers
    if (isOrderedCircle) {
      return (
        <ListContext.Provider value={{ variant, level, isNested: true }}>
          <li
            ref={ref}
            className={cn(
              'list-none relative pl-6',
              showIndicator &&
                'before:absolute before:left-0 before:font-medium before:text-krds-gray-90 [counter-increment:circle-counter] before:content-[counter(circle-counter,circled-decimal)]',
              className
            )}
            {...props}
          >
            {children}
          </li>
        </ListContext.Provider>
      );
    }

    // showIndicator=false인 경우
    if (!showIndicator) {
      return (
        <ListContext.Provider value={{ variant, level, isNested: true }}>
          <li ref={ref} className={cn('list-none', className)} {...props}>
            {children}
          </li>
        </ListContext.Provider>
      );
    }

    // depth별 indicator 스타일
    const getIndicatorClass = () => {
      // Level 1
      if (level === 1) {
        if (isCheck) {
          return "before:content-['✓'] before:text-krds-gray-70 before:left-0";
        }
        if (isDash) {
          return "before:content-['−'] before:text-krds-gray-70 before:left-0";
        }
        // 채워진 동그라미 (6px)
        return "before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full before:bg-krds-gray-70 before:top-[7px] before:left-0";
      }

      // Level 2 - 항상 dash
      if (level === 2) {
        return "before:content-['−'] before:text-krds-gray-60 before:left-0";
      }

      // Level 3 - 빈 동그라미 (6px border)
      return "before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full before:border before:border-krds-gray-50 before:top-[7px] before:left-0";
    };

    // unordered, dash, check list
    return (
      <ListContext.Provider value={{ variant, level, isNested: true }}>
        <li
          ref={ref}
          className={cn(
            'list-none relative pl-5',
            level === 3 && 'text-[15px]',
            'before:absolute before:font-bold',
            getIndicatorClass(),
            className
          )}
          {...props}
        >
          {children}
        </li>
      </ListContext.Provider>
    );
  }
);

ListItem.displayName = 'ListItem';
