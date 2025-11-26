'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const headingVariants = cva(
  // Heading 스타일 variants (h1~h5, KRDS 타이포그래피)
  ['font-bold', 'text-krds-gray-95'].join(' '),
  {
    variants: {
      level: {
        h1: 'text-krds-title-xl',
        h2: 'text-krds-title-lg',
        h3: 'text-krds-title-md',
        h4: 'text-krds-title-sm',
        h5: 'text-krds-title-xs',
      },
    },
    defaultVariants: {
      level: 'h2',
    },
  }
);

export interface HeadingProps // Heading Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'; // 제목 레벨 (h1~h5, 기본값: h2)
  children: React.ReactNode; // 텍스트 내용
}

function generateId(text: React.ReactNode): string {
  // 텍스트에서 URL 친화적 ID 생성
  if (typeof text === 'string') {
    return text
      .toLowerCase()
      .replace(/[^\w\s가-힣-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  return '';
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>( // KRDS 타이포그래피 Heading (시맨틱 HTML, 자동 ID 생성, TOC 지원)
  ({ className, level = 'h2', children, id, ...props }, ref) => {
    const Tag = level;
    const headingId = id || generateId(children); // id가 없으면 children으로 자동 생성

    const headingProps = {
      ref,
      id: headingId,
      className: cn(headingVariants({ level }), className),
      ...props,
    };

    switch (Tag) {
      case 'h1':
        return <h1 {...headingProps}>{children}</h1>;
      case 'h2':
        return <h2 {...headingProps}>{children}</h2>;
      case 'h3':
        return <h3 {...headingProps}>{children}</h3>;
      case 'h4':
        return <h4 {...headingProps}>{children}</h4>;
      case 'h5':
        return <h5 {...headingProps}>{children}</h5>;
      default:
        return <h2 {...headingProps}>{children}</h2>;
    }
  }
);

Heading.displayName = 'Heading';
