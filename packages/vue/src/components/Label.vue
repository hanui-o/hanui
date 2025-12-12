<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const labelVariants = cva('font-normal text-krds-gray-90', {
  variants: {
    size: {
      lg: 'text-krds-body-lg',
      md: 'text-krds-body-md',
      sm: 'text-krds-body-sm',
      xs: 'text-krds-body-xs',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const props = withDefaults(
  defineProps<{
    size?: 'lg' | 'md' | 'sm' | 'xs';
    for?: string;
    class?: string;
  }>(),
  {
    size: 'md',
  }
);

const classes = computed(() => cn(labelVariants({ size: props.size }), props.class));
</script>

<template>
  <label :for="$props.for" :class="classes">
    <slot />
  </label>
</template>
