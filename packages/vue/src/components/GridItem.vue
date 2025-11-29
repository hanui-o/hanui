<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../lib/utils';

const props = defineProps<{
  colSpan?: number | 'auto';
  rowSpan?: number | 'auto';
  colStart?: number | 'auto';
  colEnd?: number | 'auto';
  rowStart?: number | 'auto';
  rowEnd?: number | 'auto';
  area?: string;
  class?: string;
}>();

const colSpanClass = computed(() => {
  if (props.colSpan === 'auto') return 'col-auto';
  if (props.colSpan) return `col-span-${props.colSpan}`;
  return '';
});

const rowSpanClass = computed(() => {
  if (props.rowSpan === 'auto') return 'row-auto';
  if (props.rowSpan) return `row-span-${props.rowSpan}`;
  return '';
});

const gridItemStyle = computed(() => {
  const style: Record<string, string | number> = {};
  if (props.colStart) style.gridColumnStart = props.colStart;
  if (props.colEnd) style.gridColumnEnd = props.colEnd;
  if (props.rowStart) style.gridRowStart = props.rowStart;
  if (props.rowEnd) style.gridRowEnd = props.rowEnd;
  if (props.area) style.gridArea = props.area;
  return style;
});

const classes = computed(() => cn(colSpanClass.value, rowSpanClass.value, props.class));
</script>

<template>
  <div :class="classes" :style="gridItemStyle">
    <slot />
  </div>
</template>
