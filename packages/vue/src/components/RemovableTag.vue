<script setup lang="ts">
/**
 * RemovableTag 컴포넌트
 * X 버튼으로 제거할 수 있는 태그
 */
import { computed } from 'vue';
import { cn } from '../utils';
import type { TagVariant, TagSize } from './Tag.vue';

const props = withDefaults(
  defineProps<{
    /** 태그 스타일 변형 */
    variant?: TagVariant;
    /** 태그 크기 */
    size?: TagSize;
    /** 비활성화 상태 */
    disabled?: boolean;
    /** 제거 버튼 접근성 라벨 */
    removeLabel?: string;
    /** 추가 클래스 */
    class?: string;
  }>(),
  {
    variant: 'gray',
    size: 'md',
    disabled: false,
    removeLabel: '제거',
  }
);

const emit = defineEmits<{
  (e: 'remove'): void;
}>();

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

const buttonSizeStyles: Record<TagSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-3.5 w-3.5',
  lg: 'h-4 w-4',
};

const classes = computed(() =>
  cn(
    'inline-flex items-center gap-1 rounded-md border font-medium',
    variantStyles[props.variant],
    sizeStyles[props.size],
    props.disabled && 'opacity-50',
    props.class
  )
);

function handleRemove() {
  if (props.disabled) return;
  emit('remove');
}
</script>

<template>
  <span :class="classes">
    <slot />
    <button
      type="button"
      :aria-label="removeLabel"
      :disabled="disabled"
      :class="cn(
        'ml-0.5 rounded-full hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current',
        disabled && 'cursor-not-allowed'
      )"
      @click.stop="handleRemove"
    >
      <svg
        :class="buttonSizeStyles[size]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </span>
</template>
