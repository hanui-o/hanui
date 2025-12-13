<script setup lang="ts">
/**
 * TagLink 컴포넌트
 * 링크 역할을 하는 태그
 */
import { computed } from 'vue';
import { cn } from '@/lib/utils';
import type { TagVariant, TagSize } from './Tag.vue';

const props = withDefaults(
  defineProps<{
    /** 링크 URL */
    href: string;
    /** 태그 스타일 변형 */
    variant?: TagVariant;
    /** 태그 크기 */
    size?: TagSize;
    /** 새 탭에서 열기 */
    external?: boolean;
    /** 추가 클래스 */
    class?: string;
  }>(),
  {
    variant: 'gray',
    size: 'md',
    external: false,
  }
);

const variantStyles: Record<TagVariant, string> = {
  primary: 'bg-krds-primary-10 text-krds-primary-70 border-krds-primary-30 hover:bg-krds-primary-20',
  gray: 'bg-krds-gray-10 text-krds-gray-70 border-krds-gray-30 hover:bg-krds-gray-20',
  success: 'bg-krds-success-10 text-krds-success-70 border-krds-success-30 hover:bg-krds-success-20',
  danger: 'bg-krds-danger-10 text-krds-danger-70 border-krds-danger-30 hover:bg-krds-danger-20',
  warning: 'bg-krds-warning-10 text-krds-warning-80 border-krds-warning-40 hover:bg-krds-warning-20',
  info: 'bg-krds-info-10 text-krds-info-70 border-krds-info-30 hover:bg-krds-info-20',
};

const sizeStyles: Record<TagSize, string> = {
  sm: 'px-2 py-0.5 text-krds-label-sm',
  md: 'px-2.5 py-1 text-krds-label-md',
  lg: 'px-3 py-1.5 text-krds-label-lg',
};

const classes = computed(() =>
  cn(
    'inline-flex items-center rounded-md border font-medium transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-krds-primary-base focus:ring-offset-1',
    'no-underline',
    variantStyles[props.variant],
    sizeStyles[props.size],
    props.class
  )
);
</script>

<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="classes"
  >
    <slot />
    <svg
      v-if="external"
      class="ml-1 h-3 w-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  </a>
</template>
