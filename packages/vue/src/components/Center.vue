<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../lib/utils';

const props = withDefaults(
  defineProps<{
    inline?: boolean;
    class?: string;
  }>(),
  {
    inline: false,
  }
);

const classes = computed(() => {
  const baseClass = props.inline ? 'inline-flex' : 'flex';
  return cn(baseClass, 'items-center', 'justify-center', props.class);
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
