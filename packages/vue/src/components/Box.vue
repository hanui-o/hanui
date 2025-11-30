<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const boxVariants = cva('', {
  variants: {
    display: {
      flex: 'flex',
      'inline-flex': 'inline-flex',
      grid: 'grid',
      block: 'block',
      'inline-block': 'inline-block',
      none: 'hidden',
    },
    direction: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
      nowrap: 'flex-nowrap',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
    },
  },
  defaultVariants: {
    display: 'block',
  },
});

const props = withDefaults(
  defineProps<{
    display?: 'flex' | 'inline-flex' | 'grid' | 'block' | 'inline-block' | 'none';
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    wrap?: 'wrap' | 'wrap-reverse' | 'nowrap';
    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
    as?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'nav' | 'header' | 'footer';
    class?: string;
  }>(),
  {
    display: 'block',
    as: 'div',
  }
);

const classes = computed(() =>
  cn(
    boxVariants({
      display: props.display,
      direction: props.direction,
      align: props.align,
      justify: props.justify,
      wrap: props.wrap,
      gap: props.gap,
    }),
    props.class
  )
);
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
