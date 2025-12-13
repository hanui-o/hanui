<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    inset?: boolean;
    class?: string;
  }>(),
  {
    inset: false,
  }
);
</script>

<template>
  <div
    :class="
      cn('px-2 py-1.5 text-sm font-semibold text-krds-gray-70', inset && 'pl-8', props.class)
    "
  >
    <slot />
  </div>
</template>
