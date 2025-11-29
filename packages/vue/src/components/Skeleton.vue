<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const skeletonVariants = cva('animate-pulse bg-krds-gray-20', {
  variants: {
    variant: {
      rectangular: 'rounded-md',
      rounded: 'rounded-lg',
      circular: 'rounded-full',
      text: 'rounded h-4 w-full',
    },
  },
  defaultVariants: {
    variant: 'rectangular',
  },
});

const props = withDefaults(
  defineProps<{
    variant?: 'rectangular' | 'rounded' | 'circular' | 'text';
    width?: string | number;
    height?: string | number;
    disableAnimation?: boolean;
    class?: string;
  }>(),
  {
    variant: 'rectangular',
    disableAnimation: false,
  }
);

const classes = computed(() =>
  cn(
    skeletonVariants({ variant: props.variant }),
    props.disableAnimation && 'animate-none',
    props.class
  )
);

const computedStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width;
  }
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height;
  }

  // 원형일 때 기본 크기
  if (props.variant === 'circular' && !props.width && !props.height) {
    style.width = '40px';
    style.height = '40px';
  }

  return style;
});
</script>

<template>
  <div :class="classes" :style="computedStyle" aria-hidden="true" />
</template>
