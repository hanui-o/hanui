'use client';

import * as React from 'react';
import { Button } from '../button';
import { Body } from '../body';
import { cn } from '@/lib/utils';

export interface PublicHeroProps {
  /** 기관명 또는 사이트명 */
  title?: string;
  /** 부제 또는 슬로건 */
  subtitle?: string;
  /** CTA 버튼 텍스트 */
  ctaLabel?: string;
  /** CTA 클릭 핸들러 */
  onCtaClick?: () => void;
  /** CTA 링크 URL */
  ctaHref?: string;
  /** 배경 이미지 URL */
  backgroundImage?: string;
  /** 추가 className */
  className?: string;
  /** 자식 요소 (검색바 등) */
  children?: React.ReactNode;
}

/**
 * PublicHero 블록
 *
 * 공공 웹사이트 메인 페이지 히어로 영역.
 * 기관 소개, 검색, CTA를 포함하는 상단 배너입니다.
 */
export function PublicHero({
  title = '○○기관 홈페이지',
  subtitle = '국민과 함께하는 행정 서비스',
  ctaLabel,
  onCtaClick,
  ctaHref,
  backgroundImage,
  className,
  children,
}: PublicHeroProps) {
  return (
    <section
      className={cn('relative py-16 md:py-24 bg-krds-primary-5', className)}
      aria-label="메인 배너"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-krds-gray-90 mb-4">
          {title}
        </h2>
        <Body size="lg" className="text-krds-gray-60 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </Body>

        {children}

        {ctaLabel && (
          <Button
            variant="primary"
            size="lg"
            onClick={onCtaClick}
            href={ctaHref}
            className="mt-6"
          >
            {ctaLabel}
          </Button>
        )}
      </div>
    </section>
  );
}
