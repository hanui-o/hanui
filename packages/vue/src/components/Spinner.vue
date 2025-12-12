<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    variant: {
      default: 'text-krds-gray-40',
      primary: 'text-krds-primary-base',
      secondary: 'text-krds-gray-60',
      white: 'text-white',
      inherit: 'text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});

const props = withDefaults(
  defineProps<{
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'primary' | 'secondary' | 'white' | 'inherit';
    label?: string;
    strokeWidth?: number;
    class?: string;
  }>(),
  {
    size: 'md',
    variant: 'primary',
    label: '로딩 중',
    strokeWidth: 2,
  }
);

const classes = computed(() =>
  cn(spinnerVariants({ size: props.size, variant: props.variant }), props.class)
);
</script>

<template>
  <span role="status" aria-live="polite" class="inline-flex items-center justify-center">
    <svg
      :class="classes"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        :stroke-width="strokeWidth"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span class="sr-only">{{ label }}</span>
  </span>
</template>
