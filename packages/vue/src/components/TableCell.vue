<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../lib/utils';

const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const props = withDefaults(
  defineProps<{
    align?: 'left' | 'center' | 'right';
    small?: boolean;
    class?: string;
  }>(),
  {
    align: 'left',
    small: false,
  }
);

const classes = computed(() =>
  cn(
    'py-2 px-4 align-middle text-krds-gray-70',
    alignmentClasses[props.align],
    '[&:has([role=checkbox])]:pr-0',
    props.small && 'text-sm',
    props.class
  )
);
</script>

<template>
  <td :class="classes">
    <slot />
  </td>
</template>
