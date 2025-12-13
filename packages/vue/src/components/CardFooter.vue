<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: string;
}>();

const classes = computed(() => cn('flex items-center gap-2 pt-4', props.class));
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
