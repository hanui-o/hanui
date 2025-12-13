<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    position?:
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right';
    class?: string;
  }>(),
  {
    position: 'bottom-right',
  }
);

const positionStyles = {
  'top-left': 'top-0 left-0 flex-col',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 flex-col items-center',
  'top-right': 'top-0 right-0 flex-col items-end',
  'bottom-left': 'bottom-0 left-0 flex-col-reverse',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse items-center',
  'bottom-right': 'bottom-0 right-0 flex-col-reverse items-end',
};
</script>

<template>
  <div
    :class="
      cn(
        'fixed z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-[420px]',
        positionStyles[position],
        props.class
      )
    "
    role="region"
    aria-label="알림"
  >
    <slot />
  </div>
</template>
