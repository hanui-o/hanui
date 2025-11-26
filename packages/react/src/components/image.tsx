'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// Next.js Image import를 동적으로 처리
let NextImage: any = null;
try {
  // Next.js 환경에서만 next/image import 시도
  NextImage = require('next/image').default;
} catch {
  // Next.js가 아닌 환경에서는 null로 유지
  NextImage = null;
}

type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
type ObjectPosition = string;
type Loading = 'eager' | 'lazy';

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
  loading?: Loading;
  fit?: ObjectFit;
  align?: ObjectPosition;
  fallbackSrc?: string;
  fallback?: React.ReactNode;
  htmlWidth?: number;
  htmlHeight?: number;

  // 반응형 이미지 (일반 React 환경)
  srcSet?: string;

  // Next.js Image 최적화 관련 props
  useNextImage?: boolean;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;

  className?: string;
}

const objectFitMap: Record<ObjectFit, string> = {
  contain: 'object-contain',
  cover: 'object-cover',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down',
};

/**
 * Image - 최적화된 이미지 컴포넌트
 *
 * Next.js 환경에서는 자동으로 next/image를 사용하여 이미지를 최적화합니다.
 * 일반 React 환경에서는 표준 img 태그를 사용합니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Image src="/image.jpg" alt="Description" />
 *
 * // Next.js 최적화 (자동 감지)
 * <Image
 *   src="/image.jpg"
 *   alt="Description"
 *   width={500}
 *   height={300}
 * />
 *
 * // 명시적으로 일반 img 사용
 * <Image
 *   src="/image.jpg"
 *   alt="Description"
 *   useNextImage={false}
 * />
 * ```
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      loading = 'lazy',
      fit,
      align,
      fallbackSrc,
      fallback,
      htmlWidth,
      htmlHeight,
      srcSet,
      useNextImage,
      priority = false,
      quality = 85, // 기본 품질 85%
      fill,
      sizes,
      className,
      style,
      onError,
      ...props
    },
    ref
  ) => {
    const [hasError, setHasError] = React.useState(false);

    // Next.js Image 사용 여부 결정
    const shouldUseNextImage = useNextImage !== false && NextImage !== null;

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setHasError(true);
      onError?.(e);
    };

    // 에러 발생 시 fallback 처리
    if (hasError) {
      if (fallback) {
        return <>{fallback}</>;
      }
      if (fallbackSrc) {
        return (
          <img
            ref={ref}
            src={fallbackSrc}
            alt={alt}
            className={cn(
              fit && objectFitMap[fit],
              align && `object-[${align}]`,
              className
            )}
            style={style}
            {...props}
          />
        );
      }
    }

    const fitClass = fit ? objectFitMap[fit] : '';
    const alignClass = align ? `object-[${align}]` : '';

    // Next.js Image 사용
    if (shouldUseNextImage && (props.width || props.height || fill)) {
      // sizes 기본값 설정 (반응형 최적화)
      const defaultSizes = fill
        ? '100vw' // fill 모드: 항상 100vw
        : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'; // 일반: 반응형

      const computedSizes = sizes || defaultSizes;

      return (
        <NextImage
          ref={ref}
          src={src}
          alt={alt}
          width={props.width || htmlWidth}
          height={props.height || htmlHeight}
          loading={priority ? undefined : loading}
          priority={priority}
          quality={quality}
          fill={fill}
          sizes={computedSizes}
          className={cn(fitClass, alignClass, className)}
          style={style}
          onError={handleError}
          {...props}
        />
      );
    }

    // 일반 img 태그 사용 (srcSet 지원 추가)
    // sizes 기본값 (srcSet이 있을 때만 의미있음)
    const defaultImgSizes =
      '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    const computedImgSizes = srcSet ? sizes || defaultImgSizes : undefined;

    return (
      <img
        ref={ref}
        src={src}
        srcSet={srcSet}
        sizes={computedImgSizes}
        alt={alt}
        loading={loading}
        decoding="async"
        width={htmlWidth || props.width}
        height={htmlHeight || props.height}
        className={cn(fitClass, alignClass, className)}
        style={style}
        onError={handleError}
        {...props}
      />
    );
  }
);

Image.displayName = 'Image';
