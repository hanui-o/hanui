<script setup lang="ts">
/**
 * VisuallyHidden 컴포넌트
 * KRDS 시각적으로 숨김 - 화면에는 보이지 않지만 스크린리더가 읽을 수 있는 콘텐츠
 */
import { computed } from 'vue';
import { cn } from '../utils';

const props = withDefaults(
  defineProps<{
    /** 렌더링할 HTML 요소 */
    as?: 'span' | 'div';
    /** 포커스 시 표시할지 여부 (인터랙티브 요소용) */
    focusable?: boolean;
    /** 추가 클래스 */
    class?: string;
  }>(),
  {
    as: 'span',
    focusable: false,
  }
);

/**
 * Visually Hidden 스타일
 * - 화면에서 시각적으로 숨김
 * - 스크린리더에서 읽을 수 있음
 * - visibility:hidden, display:none 사용 금지 (스크린리더가 무시함)
 */
const visuallyHiddenStyles = [
  'absolute',
  'w-px',
  'h-px',
  'overflow-hidden',
  'clip-path-[inset(50%)]',
  'm-[-1px]',
  'p-0',
  'whitespace-nowrap',
  'border-0',
].join(' ');

const classes = computed(() =>
  cn(
    visuallyHiddenStyles,
    props.focusable && [
      'focus:static',
      'focus:w-auto',
      'focus:h-auto',
      'focus:overflow-visible',
      'focus:clip-path-none',
      'focus:m-0',
      'focus:whitespace-normal',
    ],
    props.class
  )
);
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
