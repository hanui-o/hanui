'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  // List Props
  variant?: // 리스트 variant (기본값: unordered)
  | 'unordered'
    | 'ordered'
    | 'ordered-alpha'
    | 'ordered-circle'
    | 'dash'
    | 'check';
  spacing?: 'tight' | 'default' | 'loose'; // 항목 간격 (기본값: default)
  level?: 1 | 2 | 3; // 중첩 레벨 (기본값: 1)
}

interface ListContextValue {
  // List Context (variant, level을 ListItem에 전달)
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

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  // ListItem Props
  showIndicator?: boolean; // bullet/number 표시기 표시 여부 (기본값: true)
}

const spacingStyles = {
  // 항목 간격 스타일
  tight: 'space-y-1',
  default: 'space-y-3',
  loose: 'space-y-4',
} as const;

export const List = React.forwardRef<
  // KRDS 리스트 컴포넌트 (ul/ol, 다양한 variant, 중첩 지원, 접근성)
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

    const isNested = parentContext.isNested; // ListItem 내부 중첩 여부
    const level = // 중첩 시 level 자동 증가 (최대 3)
      userLevel ??
      (isNested ? (Math.min(parentContext.level + 1, 3) as 1 | 2 | 3) : 1);
    const variant = userVariant ?? (isNested ? 'dash' : 'unordered'); // 중첩 시 variant=dash 자동 적용

    const isOrderedVariant =
      variant === 'ordered' ||
      variant === 'ordered-alpha' ||
      variant === 'ordered-circle';
    const Component = isOrderedVariant ? 'ol' : 'ul';

    return (
      <ListContext.Provider value={{ variant, level, isNested: false }}>
        <Component
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={ref as React.Ref<HTMLUListElement | HTMLOListElement>}
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

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>( // ListItem 컴포넌트 (List의 개별 항목)
  ({ showIndicator = true, className, children, ...props }, ref) => {
    const { variant, level } = React.useContext(ListContext);
    const isOrdered = variant === 'ordered';
    const isOrderedAlpha = variant === 'ordered-alpha';
    const isOrderedCircle = variant === 'ordered-circle';
    const isDash = variant === 'dash';
    const isCheck = variant === 'check';

    if (isOrdered) {
      // ordered list (1, 2, 3...)
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

    if (isOrderedAlpha) {
      // ordered-alpha list (a, b, c...)
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

    if (isOrderedCircle) {
      // ordered-circle list (①, ②, ③...)
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

    if (!showIndicator) {
      // showIndicator=false인 경우
      return (
        <ListContext.Provider value={{ variant, level, isNested: true }}>
          <li ref={ref} className={cn('list-none', className)} {...props}>
            {children}
          </li>
        </ListContext.Provider>
      );
    }

    const getIndicatorClass = () => {
      // depth별 indicator 스타일
      if (level === 1) {
        // Level 1
        if (isCheck) {
          return "before:content-['✓'] before:text-krds-gray-70 before:left-0";
        }
        if (isDash) {
          return "before:content-['−'] before:text-krds-gray-70 before:left-0";
        }
        return "before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full before:bg-krds-gray-70 before:top-[7px] before:left-0"; // 채워진 동그라미 (6px)
      }

      if (level === 2) {
        // Level 2 (항상 dash)
        return "before:content-['−'] before:text-krds-gray-60 before:left-0";
      }

      return "before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full before:border before:border-krds-gray-50 before:top-[7px] before:left-0"; // Level 3 (빈 동그라미)
    };

    return (
      // unordered, dash, check list
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
