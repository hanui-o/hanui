<script setup lang="ts">
import { computed, useSlots, onMounted } from 'vue';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

const isDev = () => {
  try {
    return import.meta.env?.DEV === true;
  } catch {
    return false;
  }
};

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 min-w-20 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-base focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-krds-primary-50 text-krds-white hover:bg-krds-primary-60 active:bg-krds-primary-70',
        secondary:
          'border border-krds-primary-50 bg-krds-primary-5 text-krds-primary-base hover:bg-krds-primary-10 active:bg-krds-primary-20',
        tertiary:
          'border border-krds-gray-40 bg-krds-gray-0 text-krds-gray-95 hover:bg-krds-gray-5 active:bg-krds-gray-10',
        success:
          'bg-krds-success-base text-krds-white hover:bg-krds-success-60 active:bg-krds-success-70',
        danger:
          'bg-krds-danger-base text-krds-white hover:bg-krds-danger-60 active:bg-krds-danger-70',
        ghost:
          'bg-transparent text-krds-gray-95 hover:bg-krds-gray-5 active:bg-krds-gray-10',
        'ghost-primary':
          'bg-transparent text-krds-primary-base hover:bg-krds-primary-5 active:bg-krds-primary-10',
        outline:
          'border border-krds-primary-base bg-transparent text-krds-primary-base hover:bg-krds-primary-5 active:bg-krds-primary-10',
        black:
          'bg-krds-gray-95 text-krds-white hover:bg-krds-gray-90 active:bg-krds-gray-80',
      },
      size: {
        xs: 'h-8 px-3 [font-size:var(--krds-size-body-sm)] leading-[var(--krds-leading-body)]',
        sm: 'h-10 px-4 [font-size:var(--krds-size-body-sm)] leading-[var(--krds-leading-body)]',
        md: 'h-12 px-5 [font-size:var(--krds-size-body-md)] leading-[var(--krds-leading-body)]',
        lg: 'h-14 px-6 [font-size:var(--krds-size-body-lg)] leading-[var(--krds-leading-body)]',
        xl: 'h-16 px-8 [font-size:var(--krds-size-body-lg)] leading-[var(--krds-leading-body)]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  rel?: string;
  class?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
});

const slots = useSlots();

const isDisabled = computed(() => props.disabled || props.loading);
const isIconOnly = computed((): boolean => !slots.default && !!(slots.iconLeft || slots.iconRight));
const isLink = computed(() => !!props.href);

const classes = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)
);

onMounted(() => {
  if (isDev() && isIconOnly.value && !props.ariaLabel) {
    console.warn(
      '[HANUI Button] Icon-only buttons must have an aria-label attribute for accessibility.\n' +
        'Example: <Button size="icon" aria-label="검색"><SearchIcon /></Button>'
    );
  }
});
</script>

<template>
  <component
    :is="isLink ? 'a' : 'button'"
    :class="classes"
    :type="isLink ? undefined : type"
    :disabled="isLink ? undefined : isDisabled"
    :href="href"
    :target="target"
    :rel="rel"
    :aria-busy="loading"
    :aria-disabled="isDisabled"
    :aria-label="ariaLabel"
  >
    <Loader2 v-if="loading" class="h-4 w-4 animate-spin" aria-hidden="true" />
    <span v-if="!loading && $slots.iconLeft" class="inline-flex" :aria-hidden="isIconOnly ? 'true' : undefined">
      <slot name="iconLeft" />
    </span>
    <slot />
    <span v-if="!loading && $slots.iconRight" class="inline-flex" :aria-hidden="isIconOnly ? 'true' : undefined">
      <slot name="iconRight" />
    </span>
  </component>
</template>
