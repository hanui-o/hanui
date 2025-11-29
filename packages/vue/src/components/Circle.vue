<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../lib/utils';

const props = defineProps<{
  size?: string | number;
  class?: string;
}>();

const circleStyle = computed(() => {
  if (!props.size) return {};
  const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size;
  return {
    width: sizeValue,
    height: sizeValue,
  };
});

const classes = computed(() =>
  cn('flex', 'items-center', 'justify-center', 'rounded-full', props.class)
);
</script>

<template>
  <div :class="classes" :style="circleStyle">
    <slot />
  </div>
</template>
