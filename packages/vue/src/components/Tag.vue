<script setup lang="ts">
/**
 * Tag 컴포넌트
 * KRDS 태그 - 콘텐츠를 분류하거나 필터링하는데 사용
 */
import { computed } from 'vue';
import { cn } from '@/lib/utils';

export type TagVariant = 'primary' | 'gray' | 'success' | 'danger' | 'warning' | 'info';
export type TagSize = 'sm' | 'md' | 'lg';

const props = withDefaults(
  defineProps<{
    /** 태그 스타일 변형 */
    variant?: TagVariant;
    /** 태그 크기 */
    size?: TagSize;
    /** 추가 클래스 */
    class?: string;
  }>(),
  {
    variant: 'gray',
    size: 'md',
  }
);

const variantStyles: Record<TagVariant, string> = {
  primary: 'bg-krds-primary-10 text-krds-primary-70 border-krds-primary-30',
  gray: 'bg-krds-gray-10 text-krds-gray-70 border-krds-gray-30',
  success: 'bg-krds-success-10 text-krds-success-70 border-krds-success-30',
  danger: 'bg-krds-danger-10 text-krds-danger-70 border-krds-danger-30',
  warning: 'bg-krds-warning-10 text-krds-warning-80 border-krds-warning-40',
  info: 'bg-krds-info-10 text-krds-info-70 border-krds-info-30',
};

const sizeStyles: Record<TagSize, string> = {
  sm: 'px-2 py-0.5 text-krds-label-sm',
  md: 'px-2.5 py-1 text-krds-label-md',
  lg: 'px-3 py-1.5 text-krds-label-lg',
};

const classes = computed(() =>
  cn(
    'inline-flex items-center rounded-md border font-medium',
    variantStyles[props.variant],
    sizeStyles[props.size],
    props.class
  )
);
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
