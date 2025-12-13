<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: string;
}>();

const classes = computed(() =>
  cn('text-2xl font-bold leading-6 text-krds-gray-90', props.class)
);
</script>

<template>
  <h3 :class="classes">
    <slot />
  </h3>
</template>
