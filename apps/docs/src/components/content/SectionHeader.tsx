import type { ReactNode } from 'react';
import { Heading, Body, Stack, type StackProps, cn } from '@hanui/react';

interface SectionHeaderProps {
  /**
   * Heading 레벨 (h1-h5)
   */
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

  /**
   * 제목 텍스트
   */
  title: string;

  /**
   * 설명 텍스트 (선택사항)
   * 제공되면 title-body-* 간격 적용
   * 없으면 heading-* 간격 적용
   */
  description?: string;

  /**
   * HTML id 속성 (선택사항)
   * 앵커 링크 및 목차 생성에 사용
   */
  id?: string;

  /**
   * 커스텀 설명 콘텐츠 (description 대신 사용 가능)
   */
  children?: ReactNode;
}

/**
 * title-body 간격 매핑
 * description이 있을 때 사용하는 간격
 * h1은 gap-4 md:gap-6 (mb-4 md:mb-6과 동일)을 사용
 */
function getTitleBodySpacing(
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
): NonNullable<StackProps['spacing']> {
  const spacingMap: Record<
    'h1' | 'h2' | 'h3' | 'h4' | 'h5',
    NonNullable<StackProps['spacing']>
  > = {
    h1: 4, // gap-4 md:gap-6을 위해 className으로 처리
    h2: 'title-body-medium',
    h3: 'title-body-medium', // 일관성을 위해 h2와 동일
    h4: 'title-body-medium',
    h5: 'title-body-small',
  };
  return spacingMap[level] || 'title-body-medium';
}

/**
 * 레벨별 간격 매핑 (Heading의 mb 값을 그대로 사용)
 * h1: mb-4 md:mb-6
 * h2: mb-3 md:mb-5
 * h3: mb-3 md:mb-5
 * h4: mb-3 md:mb-5
 * h5: mb-2 md:mb-4
 */
function getLevelMarginBottom(level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'): string {
  const marginMap: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5', string> = {
    h1: 'mb-4 md:mb-6',
    h2: 'mb-3 md:mb-5',
    h3: 'mb-3 md:mb-5',
    h4: 'mb-3 md:mb-5',
    h5: 'mb-2 md:mb-4',
  };
  return marginMap[level] || 'mb-3 md:mb-5';
}

/**
 * SectionHeader - 섹션 내부 제목과 설명 컴포넌트
 *
 * PageSection 내부에서 사용하는 제목과 설명을 일관되게 표시합니다.
 * description이 있으면 title-body-* 간격을, 없으면 heading-* 간격을 적용합니다.
 *
 * @example
 * ```tsx
 * // 설명과 함께
 * <SectionHeader
 *   level="h2"
 *   id="overview"
 *   title="개요"
 *   description="이 섹션에 대한 설명입니다."
 * />
 *
 * // 설명 없이 (KRDS 가이드대로 heading-* 간격 적용)
 * <SectionHeader
 *   level="h3"
 *   title="서브 섹션"
 * />
 *
 * // 커스텀 설명 콘텐츠
 * <SectionHeader level="h2" title="고급 기능">
 *   <Body className="text-krds-gray-70">
 *     커스텀 내용 <strong>강조</strong> 가능
 *   </Body>
 * </SectionHeader>
 * ```
 */
export function SectionHeader({
  level,
  title,
  description,
  id,
  children,
}: SectionHeaderProps) {
  const hasDescription = Boolean(description || children);

  // description이 있으면 Stack으로 감싸서 title-body 간격 적용
  // 외부 간격은 레벨별 margin-bottom으로 적용 (다음 요소와의 간격)
  if (hasDescription) {
    const titleBodySpacing = getTitleBodySpacing(level);
    const marginBottom = getLevelMarginBottom(level);
    // h1의 경우 반응형 gap을 위해 className 사용
    const titleBodyClassName = level === 'h1' ? 'gap-4 md:gap-6' : undefined;
    return (
      <Stack
        spacing={titleBodyClassName ? 0 : titleBodySpacing}
        className={cn(titleBodyClassName, marginBottom)}
      >
        <Heading level={level} id={id}>
          {title}
        </Heading>
        {description && (
          <Body className="text-krds-gray-70">{description}</Body>
        )}
        {children}
      </Stack>
    );
  }

  // description이 없으면 div로 감싸서 레벨별 margin-bottom만 적용
  const marginBottom = getLevelMarginBottom(level);
  return (
    <div className={marginBottom}>
      <Heading level={level} id={id}>
        {title}
      </Heading>
    </div>
  );
}
