<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../lib/utils';

const props = defineProps<{
  class?: string;
}>();

const classes = computed(() =>
  cn('text-[15px] leading-[150%] text-krds-gray-60', props.class)
);
</script>

<template>
  <p :class="classes">
    <slot />
  </p>
</template>
