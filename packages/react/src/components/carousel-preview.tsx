'use client';

import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from '../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * 반응형 slidesPerView 설정
 */
export interface PreviewCarouselBreakpoints {
  /** 모바일 (기본) */
  mobile?: number;
  /** 태블릿 (768px 이상) */
  tablet?: number;
  /** 데스크톱 (1024px 이상) */
  desktop?: number;
}

/**
 * PreviewCarousel Props
 */
export interface PreviewCarouselProps {
  /** 슬라이드 아이템들 (children) */
  children: React.ReactNode;
  /** 반응형 slidesPerView 설정 */
  slidesPerView?: PreviewCarouselBreakpoints | number;
  /** 슬라이드 간격 (px) */
  spaceBetween?: number;
  /** 무한 루프 */
  loop?: boolean;
  /** 화살표 표시 여부 */
  showArrows?: boolean;
  /** 페이지네이션 표시 여부 */
  showPagination?: boolean;
  /** 추가 className */
  className?: string;
  /** 슬라이드 변경 시 콜백 */
  onSlideChange?: (index: number) => void;
}

/**
 * Preview 스타일 캐러셀 컴포넌트
 *
 * 부분적으로 다음 슬라이드가 보이는 캐러셀입니다.
 * 모바일에서 1.2개, 태블릿에서 2.2개, 데스크톱에서 3.2개처럼
 * 소수점 단위로 슬라이드를 표시하여 다음 콘텐츠를 미리 볼 수 있습니다.
 *
 * @example
 * // 기본 사용법 (반응형 기본값 적용)
 * <PreviewCarousel>
 *   <Card>내용 1</Card>
 *   <Card>내용 2</Card>
 *   <Card>내용 3</Card>
 * </PreviewCarousel>
 *
 * @example
 * // 커스텀 slidesPerView
 * <PreviewCarousel
 *   slidesPerView={{ mobile: 1.2, tablet: 2.2, desktop: 4.2 }}
 *   spaceBetween={16}
 *   showArrows
 * >
 *   {items.map(item => <Card key={item.id}>{item.title}</Card>)}
 * </PreviewCarousel>
 *
 * @example
 * // 고정 slidesPerView
 * <PreviewCarousel slidesPerView={2.5}>
 *   <Card>...</Card>
 * </PreviewCarousel>
 */
export const PreviewCarousel = React.forwardRef<
  HTMLDivElement,
  PreviewCarouselProps
>(
  (
    {
      children,
      slidesPerView = { mobile: 1.2, tablet: 2.2, desktop: 3.2 },
      spaceBetween = 16,
      loop = false,
      showArrows = false,
      showPagination = false,
      className,
      onSlideChange,
    },
    ref
  ) => {
    const [swiperInstance, setSwiperInstance] =
      React.useState<SwiperType | null>(null);

    // children을 배열로 변환
    const slides = React.Children.toArray(children);
    const hasMultipleSlides = slides.length > 1;

    // slidesPerView 설정 처리
    const getSlidesPerView = () => {
      if (typeof slidesPerView === 'number') {
        return slidesPerView;
      }
      return slidesPerView.mobile ?? 1.2;
    };

    // breakpoints 설정
    const getBreakpoints = () => {
      if (typeof slidesPerView === 'number') {
        return undefined;
      }
      return {
        768: {
          slidesPerView: slidesPerView.tablet ?? 2.2,
        },
        1024: {
          slidesPerView: slidesPerView.desktop ?? 3.2,
        },
      };
    };

    // 슬라이드 변경 핸들러
    const handleSlideChange = React.useCallback(
      (swiper: SwiperType) => {
        onSlideChange?.(swiper.realIndex);
      },
      [onSlideChange]
    );

    // 이전/다음 버튼 핸들러
    const handlePrev = React.useCallback(() => {
      swiperInstance?.slidePrev();
    }, [swiperInstance]);

    const handleNext = React.useCallback(() => {
      swiperInstance?.slideNext();
    }, [swiperInstance]);

    // 버튼 공통 스타일
    const buttonBaseClass = cn(
      'flex items-center justify-center flex-shrink-0',
      'w-9 h-9 rounded-full',
      'border border-krds-gray-30 bg-white',
      'hover:bg-krds-gray-10 active:bg-krds-gray-20',
      'disabled:bg-krds-gray-10 disabled:cursor-not-allowed',
      'transition-colors'
    );

    return (
      <div ref={ref} className={cn('relative', className)}>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={getSlidesPerView()}
          spaceBetween={spaceBetween}
          speed={400}
          loop={loop && hasMultipleSlides}
          breakpoints={getBreakpoints()}
          pagination={
            showPagination
              ? {
                  el: '.preview-carousel-pagination',
                  clickable: true,
                  type: 'bullets',
                }
              : false
          }
          a11y={{
            prevSlideMessage: '이전 슬라이드',
            nextSlideMessage: '다음 슬라이드',
            firstSlideMessage: '첫 번째 슬라이드',
            lastSlideMessage: '마지막 슬라이드',
            paginationBulletMessage: '{{index}}번째 슬라이드로 이동',
          }}
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          className="w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>{slide}</SwiperSlide>
          ))}
        </Swiper>

        {/* 컨트롤 영역 */}
        {(showArrows || showPagination) && hasMultipleSlides && (
          <div className="flex items-center justify-end gap-3 mt-4">
            {/* Pagination */}
            {showPagination && (
              <div
                className={cn(
                  'preview-carousel-pagination',
                  'flex items-center gap-1.5 h-9 px-3 bg-krds-gray-90/10 rounded-full',
                  // Swiper bullet 커스텀 스타일
                  '[&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2',
                  '[&_.swiper-pagination-bullet]:bg-krds-gray-40 [&_.swiper-pagination-bullet]:rounded-full',
                  '[&_.swiper-pagination-bullet]:opacity-100',
                  '[&_.swiper-pagination-bullet-active]:w-8 [&_.swiper-pagination-bullet-active]:bg-krds-primary-60'
                )}
              />
            )}

            {/* Navigation Arrows */}
            {showArrows && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className={buttonBaseClass}
                  aria-label="이전"
                >
                  <ChevronLeft className="w-5 h-5 text-krds-gray-70" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className={buttonBaseClass}
                  aria-label="다음"
                >
                  <ChevronRight className="w-5 h-5 text-krds-gray-70" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

PreviewCarousel.displayName = 'PreviewCarousel';

export default PreviewCarousel;
