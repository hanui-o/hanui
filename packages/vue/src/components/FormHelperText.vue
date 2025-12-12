<script setup lang="ts">
import { inject, computed } from 'vue';
import { Check, Info } from 'lucide-vue-next';
import { cn } from '../lib/utils';
import { FormFieldContextKey, type FormFieldContext } from '../composables/useFormField';

const props = defineProps<{
  class?: string;
}>();

const formField = inject<FormFieldContext | null>(FormFieldContextKey, null);

const statusColor = computed(() => {
  if (formField?.status === 'error') return 'text-krds-danger-60';
  if (formField?.status === 'success') return 'text-krds-success-60';
  if (formField?.status === 'info') return 'text-krds-info-60';
  return 'text-krds-gray-70';
});

const StatusIcon = computed(() => {
  if (formField?.status === 'success') return Check;
  if (formField?.status === 'info') return Info;
  return null;
});

const classes = computed(() =>
  cn('text-[15px] leading-[150%]', StatusIcon.value && 'flex items-center gap-1', statusColor.value, props.class)
);
</script>

<template>
  <div :id="formField?.helperId" :class="classes">
    <component
      :is="StatusIcon"
      v-if="StatusIcon"
      class="w-4 h-4 shrink-0"
      :class="statusColor"
      aria-hidden="true"
    />
    <span><slot /></span>
  </div>
</template>
