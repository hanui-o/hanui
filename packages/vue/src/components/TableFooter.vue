<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: string;
}>();

const classes = computed(() =>
  cn(
    'bg-krds-primary-5',
    'border-t border-krds-gray-20',
    'font-medium',
    '[&>tr]:last:border-b-0',
    props.class
  )
);
</script>

<template>
  <tfoot :class="classes">
    <slot />
  </tfoot>
</template>
