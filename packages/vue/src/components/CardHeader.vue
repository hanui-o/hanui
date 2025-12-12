<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../lib/utils';

const props = defineProps<{
  class?: string;
}>();

const classes = computed(() => cn('flex flex-col space-y-1.5', props.class));
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
