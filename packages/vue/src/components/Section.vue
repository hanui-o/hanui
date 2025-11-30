<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const sectionVariants = cva('w-full', {
  variants: {
    padding: {
      'card-large': 'p-6 md:p-10',
      'card-medium': 'p-6 md:p-8',
      'card-small': 'p-5 md:p-6',
      'card-xsmall': 'p-3 md:p-4',
      'page-section': 'px-4 py-10 md:px-6 md:py-16',
      'content-area': 'px-4 py-8 md:px-6 md:py-12',
      'form-section': 'p-6',
      'input-container': 'p-4',
      header: 'px-4 py-4 md:px-6',
      footer: 'px-4 py-10 md:px-6 md:py-16',
      'card-sm': 'p-4',
      'card-md': 'p-6',
      'card-lg': 'p-8',
      xs: 'p-2',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
      '2xl': 'p-10',
      '3xl': 'p-16',
      none: 'p-0',
    },
    background: {
      white: 'bg-krds-white',
      gray: 'bg-krds-gray-5',
      primary: 'bg-krds-primary-5',
      transparent: 'bg-transparent',
    },
  },
  defaultVariants: {
    padding: 'page-section',
    background: 'transparent',
  },
});

type PaddingType =
  | 'card-large'
  | 'card-medium'
  | 'card-small'
  | 'card-xsmall'
  | 'page-section'
  | 'content-area'
  | 'form-section'
  | 'input-container'
  | 'header'
  | 'footer'
  | 'card-sm'
  | 'card-md'
  | 'card-lg'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'none';

const props = withDefaults(
  defineProps<{
    padding?: PaddingType;
    background?: 'white' | 'gray' | 'primary' | 'transparent';
    as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer' | 'nav';
    class?: string;
  }>(),
  {
    padding: 'page-section',
    background: 'transparent',
    as: 'section',
  }
);

const classes = computed(() =>
  cn(sectionVariants({ padding: props.padding, background: props.background }), props.class)
);
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
