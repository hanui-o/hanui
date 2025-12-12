<script setup lang="ts">
import { provide, reactive, computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const accordionVariants = cva('w-full', {
  variants: {
    variant: {
      default: 'space-y-2',
      line: 'divide-y divide-krds-gray-20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const props = withDefaults(
  defineProps<{
    type?: 'single' | 'multiple';
    variant?: 'default' | 'line';
    collapsible?: boolean;
    defaultValue?: string | string[];
    modelValue?: string | string[];
    class?: string;
  }>(),
  {
    type: 'single',
    variant: 'default',
    collapsible: true,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]];
}>();

const state = reactive({
  openItems: new Set<string>(
    props.modelValue
      ? Array.isArray(props.modelValue)
        ? props.modelValue
        : [props.modelValue]
      : props.defaultValue
        ? Array.isArray(props.defaultValue)
          ? props.defaultValue
          : [props.defaultValue]
        : []
  ),
});

const toggleItem = (value: string) => {
  if (props.type === 'single') {
    if (state.openItems.has(value)) {
      if (props.collapsible) {
        state.openItems.clear();
        emit('update:modelValue', '');
      }
    } else {
      state.openItems.clear();
      state.openItems.add(value);
      emit('update:modelValue', value);
    }
  } else {
    if (state.openItems.has(value)) {
      state.openItems.delete(value);
    } else {
      state.openItems.add(value);
    }
    emit('update:modelValue', Array.from(state.openItems));
  }
};

const isOpen = (value: string) => state.openItems.has(value);

provide('accordion', {
  variant: props.variant,
  toggleItem,
  isOpen,
});

const classes = computed(() => cn(accordionVariants({ variant: props.variant }), props.class));
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
