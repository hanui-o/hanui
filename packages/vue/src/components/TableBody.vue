<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: string;
}>();

const classes = computed(() =>
  cn(
    '[&_tr:last-child]:border-0',
    '[&_tr]:border-b [&_tr]:border-krds-gray-20',
    props.class
  )
);
</script>

<template>
  <tbody :class="classes">
    <slot />
  </tbody>
</template>
