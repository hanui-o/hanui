<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const displayVariants = cva(
  'font-bold leading-[var(--krds-leading-display)] text-krds-gray-95',
  {
    variants: {
      size: {
        xl: 'text-krds-display-xl',
        lg: 'text-krds-display-lg',
        md: 'text-krds-display-md',
        sm: 'text-krds-display-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const props = withDefaults(
  defineProps<{
    size?: 'xl' | 'lg' | 'md' | 'sm';
    as?: 'h1' | 'h2' | 'h3' | 'div' | 'p';
    class?: string;
  }>(),
  {
    size: 'md',
    as: 'h1',
  }
);

const classes = computed(() => cn(displayVariants({ size: props.size }), props.class));
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
