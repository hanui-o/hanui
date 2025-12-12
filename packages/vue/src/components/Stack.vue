<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const stackVariants = cva('flex', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-10',
      '3xl': 'gap-12',
      '4xl': 'gap-16',
    },
    direction: {
      row: 'flex-row',
      column: 'flex-col',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
  },
  defaultVariants: {
    gap: 'none',
    direction: 'column',
  },
});

type GapVariant = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

const props = withDefaults(
  defineProps<{
    gap?: GapVariant | number | string;
    direction?: 'row' | 'column';
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
    class?: string;
  }>(),
  {
    gap: 'none',
    direction: 'column',
    as: 'div',
  }
);

const isNumericGap = computed(() => {
  return (
    typeof props.gap === 'number' ||
    (typeof props.gap === 'string' &&
      /^\d+$/.test(props.gap) &&
      !['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'].includes(props.gap))
  );
});

const gapClass = computed(() => (isNumericGap.value ? `gap-${props.gap}` : ''));

const variantGap = computed(() =>
  isNumericGap.value ? undefined : (props.gap as GapVariant)
);

const classes = computed(() =>
  cn(
    stackVariants({
      gap: variantGap.value,
      direction: props.direction,
      align: props.align,
      justify: props.justify,
    }),
    gapClass.value,
    props.class
  )
);
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
