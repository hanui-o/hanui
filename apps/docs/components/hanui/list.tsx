'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * List Props
 */
export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * List variant
   * @default 'unordered'
   */
  variant?: 'unordered' | 'ordered' | 'dash' | 'check';

  /**
   * Spacing between items
   * @default 'default'
   */
  spacing?: 'tight' | 'default' | 'loose';
}

/**
 * List Context - variant를 ListItem에 전달
 */
const ListContext = React.createContext<
  'unordered' | 'ordered' | 'dash' | 'check'
>('unordered');

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
 * // Ordered List
 * <List variant="ordered">
 *   <ListItem>단계 1</ListItem>
 *   <ListItem>단계 2</ListItem>
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
      variant = 'unordered',
      spacing = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = variant === 'ordered' ? 'ol' : 'ul';

    return (
      <ListContext.Provider value={variant}>
        <Component
          ref={ref as any}
          className={cn(
            'text-krds-gray-90',
            variant === 'ordered' && 'list-decimal list-inside',
            spacingStyles[spacing],
            className
          )}
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
    const variant = React.useContext(ListContext);
    const isOrdered = variant === 'ordered';
    const isDash = variant === 'dash';
    const isCheck = variant === 'check';

    // ordered list의 경우 기본 번호를 사용
    if (isOrdered && showIndicator) {
      return (
        <li ref={ref} className={cn(className)} {...props}>
          {children}
        </li>
      );
    }

    // unordered, dash, check list 또는 showIndicator=false인 경우
    return (
      <li
        ref={ref}
        className={cn(
          'flex items-start gap-3',
          isOrdered && 'list-none', // ordered에서 showIndicator=false면 번호 숨김
          className
        )}
        {...props}
      >
        {showIndicator && !isOrdered && (
          <span
            className="text-krds-gray-70 font-bold w-3 flex-shrink-0"
            aria-hidden="true"
          >
            {isCheck ? '✓' : isDash ? '−' : '•'}
          </span>
        )}
        <span className="flex-1">{children}</span>
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';
