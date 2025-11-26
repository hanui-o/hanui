import * as React from 'react';
import { cn } from '@/lib/utils';

type WrapGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type WrapAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type WrapJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface WrapProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: WrapGap | number;
  align?: WrapAlign;
  justify?: WrapJustify;
  children: React.ReactNode;
  className?: string;
}

const gapMap: Record<WrapGap, string> = {
  none: 'gap-0',
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-10',
};

const alignMap: Record<WrapAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyMap: Record<WrapJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export const Wrap = React.forwardRef<HTMLDivElement, WrapProps>(
  (
    {
      gap = 'md',
      align = 'start',
      justify = 'start',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const gapClass = typeof gap === 'number' ? `gap-[${gap}px]` : gapMap[gap];
    const alignClass = alignMap[align];
    const justifyClass = justifyMap[justify];

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-wrap',
          gapClass,
          alignClass,
          justifyClass,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Wrap.displayName = 'Wrap';
