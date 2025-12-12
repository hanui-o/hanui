<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../lib/utils';

type GridAutoFlow = 'row' | 'column' | 'dense' | 'row dense' | 'column dense';

const autoFlowMap: Record<GridAutoFlow, string> = {
  row: 'grid-flow-row',
  column: 'grid-flow-col',
  dense: 'grid-flow-dense',
  'row dense': 'grid-flow-row-dense',
  'column dense': 'grid-flow-col-dense',
};

const props = withDefaults(
  defineProps<{
    templateColumns?: string;
    templateRows?: string;
    templateAreas?: string;
    gap?: string | number;
    rowGap?: string | number;
    columnGap?: string | number;
    autoFlow?: GridAutoFlow;
    autoRows?: string;
    autoColumns?: string;
    inline?: boolean;
    class?: string;
  }>(),
  {
    inline: false,
  }
);

const gapClass = computed(() => {
  if (!props.gap) return '';
  return typeof props.gap === 'string' ? `gap-${props.gap}` : '';
});

const rowGapClass = computed(() => {
  if (!props.rowGap) return '';
  return typeof props.rowGap === 'string' ? `gap-y-${props.rowGap}` : '';
});

const columnGapClass = computed(() => {
  if (!props.columnGap) return '';
  return typeof props.columnGap === 'string' ? `gap-x-${props.columnGap}` : '';
});

const gridStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.templateColumns) style.gridTemplateColumns = props.templateColumns;
  if (props.templateRows) style.gridTemplateRows = props.templateRows;
  if (props.templateAreas) style.gridTemplateAreas = props.templateAreas;
  if (props.autoRows) style.gridAutoRows = props.autoRows;
  if (props.autoColumns) style.gridAutoColumns = props.autoColumns;
  if (typeof props.gap === 'number') style.gap = `${props.gap}px`;
  if (typeof props.rowGap === 'number') style.rowGap = `${props.rowGap}px`;
  if (typeof props.columnGap === 'number') style.columnGap = `${props.columnGap}px`;
  return style;
});

const classes = computed(() =>
  cn(
    props.inline ? 'inline-grid' : 'grid',
    props.autoFlow && autoFlowMap[props.autoFlow],
    gapClass.value,
    rowGapClass.value,
    columnGapClass.value,
    props.class
  )
);
</script>

<template>
  <div :class="classes" :style="gridStyle">
    <slot />
  </div>
</template>
