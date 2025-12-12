<script setup lang="ts">
import { inject, computed } from 'vue';
import { cn } from '../lib/utils';
import { FormFieldContextKey, type FormFieldContext } from '../composables/useFormField';

const props = defineProps<{
  class?: string;
}>();

const formField = inject<FormFieldContext | null>(FormFieldContextKey, null);

const classes = computed(() =>
  cn('text-[17px] font-medium text-krds-gray-90 leading-[140%]', props.class)
);
</script>

<template>
  <label :for="formField?.id" :class="classes">
    <slot />
    <template v-if="formField?.required">
      <span class="text-krds-danger-50 ml-1" aria-hidden="true">*</span>
      <span class="sr-only">(필수)</span>
    </template>
  </label>
</template>
