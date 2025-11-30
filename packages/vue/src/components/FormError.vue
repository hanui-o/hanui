<script setup lang="ts">
import { inject, computed } from 'vue';
import { CircleX } from 'lucide-vue-next';
import { cn } from '../lib/utils';
import { FormFieldContextKey, type FormFieldContext } from '../composables/useFormField';

const props = defineProps<{
  class?: string;
}>();

const formField = inject<FormFieldContext | null>(FormFieldContextKey, null);

const classes = computed(() =>
  cn('flex items-center gap-1 text-[15px] text-krds-danger-60 leading-[150%]', props.class)
);
</script>

<template>
  <div :id="formField?.errorId" :class="classes" role="alert" aria-live="polite">
    <span class="text-krds-danger-60 shrink-0" aria-hidden="true">
      <CircleX class="w-4 h-4" />
    </span>
    <span><slot /></span>
  </div>
</template>
