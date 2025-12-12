<script setup lang="ts">
import { ref, provide, computed } from 'vue';
import { cn } from '../lib/utils';

const props = withDefaults(
  defineProps<{
    defaultValue?: string;
    modelValue?: string;
    variant?: 'default' | 'pills';
    size?: 'sm' | 'default';
    class?: string;
  }>(),
  {
    variant: 'default',
    size: 'default',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const internalValue = ref(props.defaultValue || '');

const value = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalValue.value
);

const onValueChange = (newValue: string) => {
  if (props.modelValue === undefined) {
    internalValue.value = newValue;
  }
  emit('update:modelValue', newValue);
};

provide('tabsContext', {
  value,
  onValueChange,
  variant: props.variant,
  size: props.size,
});

const classes = computed(() => cn('w-full mt-8', props.class));
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
