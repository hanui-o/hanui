import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SimpleGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?:
    | number
    | { base?: number; sm?: number; md?: number; lg?: number; xl?: number };
  spacing?: string | number;
  spacingX?: string | number;
  spacingY?: string | number;
  minChildWidth?: string;
  children: React.ReactNode;
  className?: string;
}

export const SimpleGrid = React.forwardRef<HTMLDivElement, SimpleGridProps>(
  (
    {
      columns,
      spacing,
      spacingX,
      spacingY,
      minChildWidth,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Gap 클래스 생성
    const gapClass = spacing
      ? typeof spacing === 'number'
        ? `gap-[${spacing}px]`
        : `gap-${spacing}`
      : '';

    const gapXClass = spacingX
      ? typeof spacingX === 'number'
        ? `gap-x-[${spacingX}px]`
        : `gap-x-${spacingX}`
      : '';

    const gapYClass = spacingY
      ? typeof spacingY === 'number'
        ? `gap-y-[${spacingY}px]`
        : `gap-y-${spacingY}`
      : '';

    // Columns 처리
    let gridTemplateColumns = '';
    let responsiveClasses = '';

    if (minChildWidth) {
      // minChildWidth를 사용한 자동 반응형 그리드
      gridTemplateColumns = `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`;
    } else if (typeof columns === 'number') {
      // 고정 컬럼 수
      gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
    } else if (typeof columns === 'object') {
      // 반응형 컬럼 수 (Tailwind breakpoints)
      const { base, sm, md, lg, xl } = columns;
      const classes: string[] = [];

      if (base) classes.push(`grid-cols-${base}`);
      if (sm) classes.push(`sm:grid-cols-${sm}`);
      if (md) classes.push(`md:grid-cols-${md}`);
      if (lg) classes.push(`lg:grid-cols-${lg}`);
      if (xl) classes.push(`xl:grid-cols-${xl}`);

      responsiveClasses = classes.join(' ');
    }

    const gridStyle: React.CSSProperties = {
      ...style,
      ...(gridTemplateColumns && { gridTemplateColumns }),
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          responsiveClasses,
          gapClass,
          gapXClass,
          gapYClass,
          className
        )}
        style={gridStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SimpleGrid.displayName = 'SimpleGrid';
