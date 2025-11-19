import type { ReactNode } from 'react';
import { cn } from '@hanui/react';

interface SubsectionProps {
  level: 'h3' | 'h4' | 'h5';
  children: ReactNode;
  className?: string;
}

/**
 * Subsection - 섹션 내부의 하위 섹션 래퍼 컴포넌트
 *
 * 주로 h3, h4, h5 레벨의 하위 섹션을 감싸는데 사용합니다.
 * 적절한 간격을 자동으로 적용합니다.
 */
export function Subsection({ level, children, className }: SubsectionProps) {
  // Get spacing based on level
  const spacing = {
    h3: 'mt-4 md:mt-10 mb-3 md:mb-6',
    h4: 'mt-3 md:mt-6 mb-2 md:mb-4',
    h5: 'mt-3 md:mt-4 mb-2 md:mb-4',
  }[level];

  return <div className={cn(spacing, className)}>{children}</div>;
}
