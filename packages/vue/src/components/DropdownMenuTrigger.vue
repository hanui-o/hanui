<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';
import { cn } from '../lib/utils';

const props = withDefaults(
  defineProps<{
    hideArrow?: boolean;
    class?: string;
  }>(),
  {
    hideArrow: false,
  }
);

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    type="button"
    :class="cn('inline-flex items-center gap-1', props.class)"
    @click="emit('click')"
  >
    <slot />
    <ChevronDown v-if="!hideArrow" class="h-4 w-4 shrink-0" aria-hidden="true" />
  </button>
</template>
