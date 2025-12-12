<script setup lang="ts">
import { computed, ref, onMounted, watch, nextTick } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const textareaVariants = cva(
  'flex w-full rounded-md font-medium min-h-36 px-4 py-2 text-[17px] leading-[150%] transition-colors resize-none placeholder:text-krds-gray-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-krds-gray-10 read-only:bg-krds-gray-5 read-only:cursor-default',
  {
    variants: {
      variant: {
        default:
          'border border-krds-gray-60 bg-krds-white focus-visible:border-2 focus-visible:border-krds-primary-base',
        filled:
          'border border-transparent bg-krds-gray-10 focus-visible:border-2 focus-visible:border-krds-primary-base',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    variant?: 'default' | 'filled';
    status?: 'error' | 'success' | 'info';
    disabled?: boolean;
    readonly?: boolean;
    autoResize?: boolean;
    maxRows?: number;
    placeholder?: string;
    class?: string;
  }>(),
  {
    variant: 'default',
    disabled: false,
    readonly: false,
    autoResize: false,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);

const hasError = computed(() => props.status === 'error');

const statusClasses = computed(() => {
  if (hasError.value) {
    return 'border-krds-danger-60 focus-visible:border-2 focus-visible:border-krds-danger-60';
  }
  return '';
});

const classes = computed(() =>
  cn(textareaVariants({ variant: props.variant }), statusClasses.value, props.class)
);

const handleInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};

const adjustHeight = () => {
  if (!props.autoResize || !textareaRef.value) return;

  const textarea = textareaRef.value;
  textarea.style.height = 'auto';
  const scrollHeight = textarea.scrollHeight;

  if (props.maxRows) {
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
    const maxHeight = lineHeight * props.maxRows;
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
  } else {
    textarea.style.height = `${scrollHeight}px`;
    textarea.style.overflowY = 'hidden';
  }
};

watch(() => props.modelValue, () => {
  nextTick(adjustHeight);
});

onMounted(() => {
  adjustHeight();
});
</script>

<template>
  <textarea
    ref="textareaRef"
    :value="modelValue"
    :disabled="disabled"
    :readonly="readonly"
    :placeholder="placeholder"
    :class="classes"
    :aria-invalid="hasError ? true : undefined"
    @input="handleInput"
  />
</template>
