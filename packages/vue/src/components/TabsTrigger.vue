<script setup lang="ts">
import { inject, computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import type { ComputedRef } from 'vue';

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-func-info focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-transparent -mb-px data-[state=active]:border-krds-secondary-80 data-[state=active]:text-krds-secondary-80 data-[state=active]:hover:bg-krds-primary-5 data-[state=inactive]:text-krds-gray-70 data-[state=inactive]:hover:bg-krds-primary-5',
        pills:
          'flex-1 border-r border-krds-gray-20 last:border-r-0 data-[state=active]:bg-krds-secondary-80 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-krds-gray-70 data-[state=inactive]:hover:bg-krds-gray-20',
      },
      size: {
        sm: 'h-10 px-6 py-1.5 text-krds-body-md font-medium',
        default: 'h-14 px-10 py-2 text-krds-body-lg font-bold',
      },
    },
    compoundVariants: [
      { variant: 'default', size: 'sm', className: 'border-b-2' },
      { variant: 'default', size: 'default', className: 'border-b-4' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const props = withDefaults(
  defineProps<{
    value: string;
    variant?: 'default' | 'pills';
    size?: 'sm' | 'default';
    disabled?: boolean;
    class?: string;
  }>(),
  {
    disabled: false,
  }
);

const tabsContext = inject<{
  value: ComputedRef<string>;
  onValueChange: (value: string) => void;
  variant: 'default' | 'pills';
  size: 'sm' | 'default';
}>('tabsContext');

const variant = computed(() => props.variant || tabsContext?.variant || 'default');
const size = computed(() => props.size || tabsContext?.size || 'default');
const isActive = computed(() => tabsContext?.value.value === props.value);
const panelId = computed(() => `tabpanel-${props.value}`);

const handleClick = () => {
  tabsContext?.onValueChange(props.value);
};

const classes = computed(() =>
  cn(tabsTriggerVariants({ variant: variant.value, size: size.value }), props.class)
);
</script>

<template>
  <button
    role="tab"
    type="button"
    :aria-selected="isActive"
    :aria-controls="panelId"
    :data-state="isActive ? 'active' : 'inactive'"
    :disabled="disabled"
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
