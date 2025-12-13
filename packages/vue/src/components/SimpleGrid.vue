<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const simpleGridVariants = cva('grid w-full', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-10',
    },
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
    },
  },
  defaultVariants: {
    gap: 'md',
    columns: 1,
  },
});

const props = withDefaults(
  defineProps<{
    columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    minChildWidth?: string;
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    class?: string;
  }>(),
  {
    columns: 1,
    gap: 'md',
  }
);

const gridStyle = computed(() => {
  if (props.minChildWidth) {
    return {
      gridTemplateColumns: `repeat(auto-fit, minmax(${props.minChildWidth}, 1fr))`,
    };
  }
  return {};
});

const classes = computed(() => {
  const gridClass = props.minChildWidth
    ? simpleGridVariants({ gap: props.gap })
    : simpleGridVariants({ columns: props.columns, gap: props.gap });
  return cn(gridClass, props.class);
});
</script>

<template>
  <div :class="classes" :style="gridStyle">
    <slot />
  </div>
</template>
