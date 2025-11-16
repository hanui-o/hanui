import type { ReactNode } from 'react';
import { Heading, Body } from '@hanui/react';

interface PageHeaderProps {
  /**
   * 페이지 제목
   */
  title: string;

  /**
   * 페이지 설명 (선택사항)
   */
  description?: string;

  /**
   * 커스텀 설명 콘텐츠 (description 대신 사용 가능)
   */
  children?: ReactNode;
}

/**
 * PageHeader - 문서 페이지 헤더
 *
 * 모든 문서 페이지 상단의 제목과 설명을 일관되게 표시
 *
 * @example
 * ```tsx
 * // 간단한 사용
 * <PageHeader
 *   title="Stack, VStack, HStack"
 *   description="KRDS 간격 시스템을 준수하는 유연한 레이아웃 컴포넌트."
 * />
 *
 * // 설명 없이
 * <PageHeader title="Components" />
 *
 * // 커스텀 설명
 * <PageHeader title="Advanced">
 *   <Body className="text-gray-600 dark:text-gray-400">
 *     커스텀 내용 <strong>강조</strong> 가능
 *   </Body>
 * </PageHeader>
 * ```
 */
export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-8 lg:mb-12">
      <Heading level="h1">{title}</Heading>
      {description && (
        <Body className="text-gray-600 dark:text-gray-400">{description}</Body>
      )}
      {children}
    </div>
  );
}
