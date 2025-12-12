<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../lib/utils';

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

const directionMap: Record<FlexDirection, string> = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
};

const alignMap: Record<FlexAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyMap: Record<FlexJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const wrapMap: Record<FlexWrap, string> = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
};

const props = withDefaults(
  defineProps<{
    direction?: FlexDirection;
    align?: FlexAlign;
    justify?: FlexJustify;
    wrap?: FlexWrap;
    gap?: string | number;
    inline?: boolean;
    class?: string;
  }>(),
  {
    direction: 'row',
    wrap: 'nowrap',
    inline: false,
  }
);

const gapStyle = computed(() => {
  if (!props.gap) return {};
  if (typeof props.gap === 'number') {
    return { gap: `${props.gap}px` };
  }
  return {};
});

const gapClass = computed(() => {
  if (!props.gap) return '';
  if (typeof props.gap === 'string') {
    return `gap-${props.gap}`;
  }
  return '';
});

const classes = computed(() =>
  cn(
    props.inline ? 'inline-flex' : 'flex',
    directionMap[props.direction],
    props.align && alignMap[props.align],
    props.justify && justifyMap[props.justify],
    wrapMap[props.wrap],
    gapClass.value,
    props.class
  )
);
</script>

<template>
  <div :class="classes" :style="gapStyle">
    <slot />
  </div>
</template>
