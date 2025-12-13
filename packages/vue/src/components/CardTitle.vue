<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    class?: string;
  }>(),
  {
    as: 'h3',
  }
);

const classes = computed(() =>
  cn('text-[24px] font-semibold leading-[150%] tracking-tight', props.class)
);
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
