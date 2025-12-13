<script setup lang="ts">
import { inject, provide, computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const accordionItemVariants = cva('border border-krds-gray-20 rounded-lg', {
  variants: {
    variant: {
      default: '',
      line: 'border-0 rounded-none',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const props = defineProps<{
  value: string;
  variant?: 'default' | 'line';
  class?: string;
}>();

const accordion = inject<{
  variant: 'default' | 'line';
  toggleItem: (value: string) => void;
  isOpen: (value: string) => boolean;
}>('accordion');

const effectiveVariant = computed(() => props.variant || accordion?.variant || 'default');

provide('accordionItem', {
  value: props.value,
  variant: effectiveVariant.value,
});

const classes = computed(() =>
  cn(accordionItemVariants({ variant: effectiveVariant.value }), props.class)
);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
