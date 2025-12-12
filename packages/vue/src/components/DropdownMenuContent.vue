<script setup lang="ts">
import { cn } from '../lib/utils';

const props = withDefaults(
  defineProps<{
    sideOffset?: number;
    class?: string;
  }>(),
  {
    sideOffset: 4,
  }
);
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-100"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-75"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      :class="
        cn(
          'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-krds-gray-20 bg-white p-1 text-krds-gray-95 shadow-md',
          'top-full left-0',
          props.class
        )
      "
      :style="{ marginTop: `${sideOffset}px` }"
      role="menu"
    >
      <slot />
    </div>
  </Transition>
</template>
