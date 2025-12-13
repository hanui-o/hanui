<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const maxWidthClasses = {
  xs: 'max-w-krds-xs',
  sm: 'max-w-krds-sm',
  md: 'max-w-krds-md',
  lg: 'max-w-krds-lg',
  xl: 'max-w-krds-xl',
  '2xl': 'max-w-krds-2xl',
  full: 'max-w-full',
} as const;

const props = withDefaults(
  defineProps<{
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | false;
    disablePadding?: boolean;
    as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
    class?: string;
  }>(),
  {
    maxWidth: 'xl',
    disablePadding: false,
    as: 'div',
  }
);

const classes = computed(() =>
  cn(
    'mx-auto w-full',
    props.maxWidth !== false && maxWidthClasses[props.maxWidth],
    !props.disablePadding && 'px-4 sm:px-6 lg:px-8',
    props.class
  )
);
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
