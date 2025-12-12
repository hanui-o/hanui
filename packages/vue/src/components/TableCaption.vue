<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../lib/utils';

const props = defineProps<{
  class?: string;
}>();

const classes = computed(() => cn('mt-4 text-krds-gray-60', props.class));
</script>

<template>
  <caption :class="classes">
    <slot />
  </caption>
</template>
