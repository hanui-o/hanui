<script setup lang="ts">
import { inject, computed } from 'vue';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-vue-next';
import { cn } from '../lib/utils';

const accordionTriggerVariants = cva(
  'flex w-full items-center justify-between px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-base focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-krds-gray-5',
        line: 'hover:bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const props = defineProps<{
  variant?: 'default' | 'line';
  disabled?: boolean;
  class?: string;
}>();

const accordion = inject<{
  variant: 'default' | 'line';
  toggleItem: (value: string) => void;
  isOpen: (value: string) => boolean;
}>('accordion');

const accordionItem = inject<{
  value: string;
  variant: 'default' | 'line';
}>('accordionItem');

const effectiveVariant = computed(() => props.variant || accordionItem?.variant || 'default');
const isOpen = computed(() => accordion?.isOpen(accordionItem?.value || '') || false);

const handleClick = () => {
  if (!props.disabled && accordionItem?.value) {
    accordion?.toggleItem(accordionItem.value);
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
};

const classes = computed(() =>
  cn(accordionTriggerVariants({ variant: effectiveVariant.value }), props.class)
);
</script>

<template>
  <h3 class="flex">
    <button
      type="button"
      :class="classes"
      :aria-expanded="isOpen"
      :disabled="disabled"
      @click="handleClick"
      @keydown="handleKeyDown"
    >
      <span class="flex-1 font-medium text-krds-gray-90">
        <slot />
      </span>
      <ChevronDown
        class="h-4 w-4 shrink-0 transition-transform duration-200 text-krds-gray-50"
        :class="{ 'rotate-180': isOpen }"
        aria-hidden="true"
      />
    </button>
  </h3>
</template>
