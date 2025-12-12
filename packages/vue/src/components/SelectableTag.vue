<script setup lang="ts">
/**
 * SelectableTag 컴포넌트
 * 클릭하여 선택/해제할 수 있는 태그
 */
import { computed } from 'vue';
import { cn } from '../utils';
import type { TagVariant, TagSize } from './Tag.vue';

const props = withDefaults(
  defineProps<{
    /** 선택된 상태 */
    selected?: boolean;
    /** 태그 스타일 변형 */
    variant?: TagVariant;
    /** 태그 크기 */
    size?: TagSize;
    /** 비활성화 상태 */
    disabled?: boolean;
    /** 추가 클래스 */
    class?: string;
  }>(),
  {
    selected: false,
    variant: 'gray',
    size: 'md',
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: 'update:selected', value: boolean): void;
  (e: 'change', value: boolean): void;
}>();

const variantStyles: Record<TagVariant, { base: string; selected: string }> = {
  primary: {
    base: 'bg-krds-primary-5 text-krds-primary-70 border-krds-primary-30 hover:bg-krds-primary-10',
    selected: 'bg-krds-primary-50 text-white border-krds-primary-50',
  },
  gray: {
    base: 'bg-krds-gray-5 text-krds-gray-70 border-krds-gray-30 hover:bg-krds-gray-10',
    selected: 'bg-krds-gray-70 text-white border-krds-gray-70',
  },
  success: {
    base: 'bg-krds-success-5 text-krds-success-70 border-krds-success-30 hover:bg-krds-success-10',
    selected: 'bg-krds-success-50 text-white border-krds-success-50',
  },
  danger: {
    base: 'bg-krds-danger-5 text-krds-danger-70 border-krds-danger-30 hover:bg-krds-danger-10',
    selected: 'bg-krds-danger-50 text-white border-krds-danger-50',
  },
  warning: {
    base: 'bg-krds-warning-5 text-krds-warning-80 border-krds-warning-40 hover:bg-krds-warning-10',
    selected: 'bg-krds-warning-50 text-white border-krds-warning-50',
  },
  info: {
    base: 'bg-krds-info-5 text-krds-info-70 border-krds-info-30 hover:bg-krds-info-10',
    selected: 'bg-krds-info-50 text-white border-krds-info-50',
  },
};

const sizeStyles: Record<TagSize, string> = {
  sm: 'px-2 py-0.5 text-krds-label-sm',
  md: 'px-2.5 py-1 text-krds-label-md',
  lg: 'px-3 py-1.5 text-krds-label-lg',
};

const classes = computed(() =>
  cn(
    'inline-flex items-center rounded-md border font-medium cursor-pointer transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-krds-primary-base focus:ring-offset-1',
    props.selected
      ? variantStyles[props.variant].selected
      : variantStyles[props.variant].base,
    sizeStyles[props.size],
    props.disabled && 'opacity-50 cursor-not-allowed',
    props.class
  )
);

function handleClick() {
  if (props.disabled) return;
  const newValue = !props.selected;
  emit('update:selected', newValue);
  emit('change', newValue);
}
</script>

<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="selected"
    :aria-disabled="disabled"
    :disabled="disabled"
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
