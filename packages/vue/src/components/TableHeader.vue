<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: string;
}>();

const classes = computed(() =>
  cn(
    'bg-krds-primary-5',
    '[&_tr]:border-b [&_tr]:border-krds-gray-20',
    props.class
  )
);
</script>

<template>
  <thead :class="classes">
    <slot />
  </thead>
</template>
