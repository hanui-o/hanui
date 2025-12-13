<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    small?: boolean;
    class?: string;
  }>(),
  {
    small: false,
  }
);

const classes = computed(() =>
  cn(
    'w-full caption-bottom border-collapse border-b border-krds-gray-20',
    props.small && 'text-sm',
    props.class
  )
);
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table :class="classes">
      <slot />
    </table>
  </div>
</template>
