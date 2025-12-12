<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const bodyVariants = cva('leading-[var(--krds-leading-body)]', {
  variants: {
    size: {
      lg: '[font-size:var(--krds-size-body-lg)]',
      md: '[font-size:var(--krds-size-body-md)]',
      sm: '[font-size:var(--krds-size-body-sm)]',
      xs: '[font-size:var(--krds-size-body-xs)]',
    },
    weight: {
      normal: 'font-normal text-krds-gray-90',
      bold: 'font-bold text-krds-gray-95',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
  },
});

const props = withDefaults(
  defineProps<{
    size?: 'lg' | 'md' | 'sm' | 'xs';
    weight?: 'normal' | 'bold';
    as?: 'p' | 'span' | 'div' | 'article' | 'section' | 'strong';
    class?: string;
  }>(),
  {
    size: 'md',
    as: 'p',
  }
);

const finalWeight = computed(() => {
  if (props.weight) return props.weight;
  return props.as === 'strong' ? 'bold' : 'normal';
});

const classes = computed(() =>
  cn(bodyVariants({ size: props.size, weight: finalWeight.value }), props.class)
);
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
