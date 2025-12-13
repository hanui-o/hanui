<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-lg border border-krds-gray-5 bg-krds-gray-5 transition-all duration-200',
  {
    variants: {
      variant: {
        outlined: 'bg-krds-white border border-krds-gray-10',
        shadow: 'bg-krds-white shadow-md border border-krds-gray-5',
        filled: 'bg-krds-gray-5',
        elevated: 'bg-krds-white shadow-md border-0',
        info: 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800',
        success: 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800',
        warning: 'bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800',
        error: 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      hoverable: {
        true: 'hover:shadow-xl hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-krds-primary-base',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      padding: 'md',
      hoverable: false,
    },
  }
);

type CardVariant = 'outlined' | 'shadow' | 'filled' | 'elevated' | 'info' | 'success' | 'warning' | 'error';

const props = withDefaults(
  defineProps<{
    variant?: CardVariant;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
    clickable?: boolean;
    class?: string;
  }>(),
  {
    variant: 'outlined',
    padding: 'md',
    hoverable: false,
    clickable: false,
  }
);

const emit = defineEmits<{
  click: [];
}>();

const isClickable = computed(() => props.clickable || props.hoverable);

const classes = computed(() =>
  cn(
    cardVariants({
      variant: props.variant,
      padding: props.padding,
      hoverable: isClickable.value,
    }),
    props.class
  )
);

const handleClick = () => {
  if (isClickable.value) {
    emit('click');
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (isClickable.value && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    emit('click');
  }
};
</script>

<template>
  <div
    :class="classes"
    :role="isClickable ? 'button' : undefined"
    :tabindex="isClickable ? 0 : undefined"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot />
  </div>
</template>
