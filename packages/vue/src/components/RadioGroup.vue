<script setup lang="ts">
import { computed, provide, watch, ref, onMounted } from 'vue';
import { cn } from '@/lib/utils';

// RadioGroup Context
interface RadioGroupContext {
  modelValue: string | undefined;
  size: 'sm' | 'md' | 'lg';
  status?: 'error' | 'success' | 'info';
  disabled: boolean;
  updateValue: (value: string) => void;
  registerRadio: (value: string, element: HTMLElement) => void;
  unregisterRadio: (value: string) => void;
}

const radioGroupKey = Symbol('radioGroup');

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    size?: 'sm' | 'md' | 'lg';
    status?: 'error' | 'success' | 'info';
    disabled?: boolean;
    orientation?: 'horizontal' | 'vertical';
    class?: string;
  }>(),
  {
    size: 'md',
    disabled: false,
    orientation: 'horizontal',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const groupRef = ref<HTMLElement | null>(null);
const radios = ref<Map<string, HTMLElement>>(new Map());

const updateValue = (value: string) => {
  emit('update:modelValue', value);
};

const registerRadio = (value: string, element: HTMLElement) => {
  radios.value.set(value, element);
};

const unregisterRadio = (value: string) => {
  radios.value.delete(value);
};

const handleKeyDown = (e: KeyboardEvent) => {
  const keys = props.orientation === 'vertical'
    ? ['ArrowUp', 'ArrowDown']
    : ['ArrowLeft', 'ArrowRight'];

  if (!keys.includes(e.key)) return;

  e.preventDefault();

  const radioElements = Array.from(radios.value.entries())
    .map(([value, element]) => ({ value, element }))
    .filter(({ element }) => !element.hasAttribute('disabled'));

  if (radioElements.length === 0) return;

  const currentIndex = radioElements.findIndex(
    ({ value }) => value === props.modelValue
  );

  let nextIndex: number;
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    nextIndex = currentIndex < radioElements.length - 1 ? currentIndex + 1 : 0;
  } else {
    nextIndex = currentIndex > 0 ? currentIndex - 1 : radioElements.length - 1;
  }

  const nextRadio = radioElements[nextIndex];
  updateValue(nextRadio.value);
  nextRadio.element.focus();
};

provide<RadioGroupContext>(radioGroupKey, {
  modelValue: props.modelValue,
  size: props.size,
  status: props.status,
  disabled: props.disabled,
  updateValue,
  registerRadio,
  unregisterRadio,
});

// 반응형으로 context 업데이트
watch(
  () => props.modelValue,
  (newValue) => {
    provide<RadioGroupContext>(radioGroupKey, {
      modelValue: newValue,
      size: props.size,
      status: props.status,
      disabled: props.disabled,
      updateValue,
      registerRadio,
      unregisterRadio,
    });
  }
);

onMounted(() => {
  groupRef.value?.addEventListener('keydown', handleKeyDown);
});

const classes = computed(() =>
  cn(
    'flex',
    props.orientation === 'vertical' ? 'flex-col gap-3' : 'flex-row gap-4',
    props.class
  )
);
</script>

<template>
  <div
    ref="groupRef"
    role="radiogroup"
    :class="classes"
    :aria-invalid="status === 'error' ? true : undefined"
  >
    <slot />
  </div>
</template>
