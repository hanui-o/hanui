import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageSectionProps {
  level?: 'h2' | 'h3';
  children: ReactNode;
  className?: string;
}

/**
 * PageSection - 문서 페이지의 섹션 래퍼
 *
 * KRDS section 간격을 자동으로 적용:
 * - section 간 간격: 40px/80px (mb-10 md:mb-20)
 *
 * 내부 간격은 Stack 컴포넌트 사용 권장:
 * - 제목→본문: Stack gap="md" (12px/20px)
 * - 제목→가까운 내용: Stack gap="sm" (8px/16px)
 * - 콘텐츠 블록: Stack gap="lg" (24px/40px)
 *
 * @example
 * ```tsx
 * <PageSection>
 *   <Stack gap="md">
 *     <Heading level="h2">개요</Heading>
 *     <Body>...</Body>
 *   </Stack>
 * </PageSection>
 * ```
 */
export function PageSection({ level, children, className }: PageSectionProps) {
  return (
    <section className={cn('mb-10 md:mb-20', className)} data-level={level}>
      {children}
    </section>
  );
}
