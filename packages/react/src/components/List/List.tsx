'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

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

  /**
   * Nested level (for nested lists)
   * @default 1
   */
  level?: 1 | 2;
}

/**
 * List Context - variant와 level을 ListItem에 전달
 */
interface ListContextValue {
  variant: 'unordered' | 'ordered' | 'dash' | 'check';
  level: 1 | 2;
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

    // ListItem 내부에 중첩된 경우 자동으로 level=2, variant=dash 적용
    const isNested = parentContext.isNested;
    const level = userLevel ?? (isNested ? 2 : 1);
    const variant = userVariant ?? (isNested ? 'dash' : 'unordered');

    const Component = variant === 'ordered' ? 'ol' : 'ul';

    return (
      <ListContext.Provider value={{ variant, level, isNested: false }}>
        <Component
          ref={ref as any}
          className={cn(
            'text-krds-gray-90',
            level === 2 && 'ml-6 mt-2',
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
    const { variant, level } = React.useContext(ListContext);
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

    // 2depth의 경우 다른 아이콘 사용
    const getIndicator = () => {
      if (level === 2) {
        return isDash ? '−' : '−'; // 2depth는 항상 dash
      }
      return isCheck ? '✓' : isDash ? '−' : '•';
    };

    // ListItem의 children을 Context로 감싸서 내부 List가 중첩임을 알림
    const wrappedChildren = (
      <ListContext.Provider value={{ variant, level, isNested: true }}>
        {children}
      </ListContext.Provider>
    );

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
            className={cn(
              'font-bold w-3 flex-shrink-0',
              level === 2 ? 'text-krds-gray-60' : 'text-krds-gray-70'
            )}
            aria-hidden="true"
          >
            {getIndicator()}
          </span>
        )}
        <span className="flex-1">{wrappedChildren}</span>
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';
