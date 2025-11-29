<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../lib/utils';

const props = defineProps<{
  class?: string;
}>();

const classes = computed(() =>
  cn(
    'transition-colors',
    'hover:bg-krds-primary-5',
    'data-[state=selected]:bg-krds-primary-5',
    props.class
  )
);
</script>

<template>
  <tr :class="classes">
    <slot />
  </tr>
</template>
