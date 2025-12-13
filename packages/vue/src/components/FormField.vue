<script setup lang="ts">
import { computed, provide, useId } from 'vue';
import { cn } from '@/lib/utils';
import { FormFieldContextKey } from '../composables/useFormField';

const props = withDefaults(
  defineProps<{
    id?: string;
    status?: 'error' | 'success' | 'info';
    disabled?: boolean;
    required?: boolean;
    class?: string;
  }>(),
  {}
);

const generatedId = useId();
const fieldId = computed(() => props.id || generatedId);

const hasError = computed(() => props.status === 'error');
const errorId = computed(() => (hasError.value ? `${fieldId.value}-error` : undefined));
const helperId = computed(() => `${fieldId.value}-helper`);

provide(FormFieldContextKey, {
  get id() {
    return fieldId.value;
  },
  get status() {
    return props.status;
  },
  get disabled() {
    return props.disabled;
  },
  get required() {
    return props.required;
  },
  get errorId() {
    return errorId.value;
  },
  get helperId() {
    return helperId.value;
  },
});

const classes = computed(() => cn('flex flex-col gap-2', props.class));
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
