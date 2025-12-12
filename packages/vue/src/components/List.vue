<script setup lang="ts">
import { computed, provide } from 'vue';
import { cn } from '../lib/utils';

type ListVariant = 'unordered' | 'ordered' | 'ordered-alpha' | 'ordered-circle' | 'dash' | 'check';

const spacingStyles = {
  tight: 'space-y-1',
  default: 'space-y-3',
  loose: 'space-y-4',
} as const;

const props = withDefaults(
  defineProps<{
    variant?: ListVariant;
    spacing?: 'tight' | 'default' | 'loose';
    level?: 1 | 2 | 3;
    class?: string;
  }>(),
  {
    variant: 'unordered',
    spacing: 'default',
    level: 1,
  }
);

const isOrderedVariant = computed(() =>
  ['ordered', 'ordered-alpha', 'ordered-circle'].includes(props.variant)
);

provide('listContext', {
  variant: props.variant,
  level: props.level,
});

const listStyle = computed(() => {
  if (props.variant === 'ordered-alpha') {
    return { counterReset: 'alpha-counter' };
  }
  if (props.variant === 'ordered-circle') {
    return { counterReset: 'circle-counter' };
  }
  return {};
});

const classes = computed(() =>
  cn(
    'text-krds-gray-90',
    props.level === 2 && 'mt-2',
    props.level === 3 && 'mt-2',
    props.variant === 'ordered' && 'list-decimal list-inside',
    (props.variant === 'ordered-alpha' || props.variant === 'ordered-circle') && 'list-none',
    spacingStyles[props.spacing],
    props.class
  )
);
</script>

<template>
  <ol v-if="isOrderedVariant" :class="classes" :style="listStyle">
    <slot />
  </ol>
  <ul v-else :class="classes">
    <slot />
  </ul>
</template>
