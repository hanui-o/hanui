<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { cva } from 'class-variance-authority';
import { Info, CircleCheck, AlertTriangle, CircleX, X } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg border p-4 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'border-krds-gray-20 bg-white text-krds-gray-95',
        info: 'border-krds-info-20 bg-krds-info-5 text-krds-info-70',
        success: 'border-krds-success-20 bg-krds-success-5 text-krds-success-70',
        warning: 'border-krds-warning-20 bg-krds-warning-5 text-krds-warning-70',
        error: 'border-krds-danger-20 bg-krds-danger-5 text-krds-danger-70',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const toastCloseVariants = cva(
  'absolute right-3 top-3 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'hover:bg-krds-gray-10 focus:ring-krds-gray-40',
        info: 'hover:bg-krds-info-10 focus:ring-krds-info-base',
        success: 'hover:bg-krds-success-10 focus:ring-krds-success-base',
        warning: 'hover:bg-krds-warning-10 focus:ring-krds-warning-base',
        error: 'hover:bg-krds-danger-10 focus:ring-krds-danger-base',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const iconMap = {
  default: Info,
  info: Info,
  success: CircleCheck,
  warning: AlertTriangle,
  error: CircleX,
};

const iconColorMap = {
  default: 'text-krds-gray-60',
  info: 'text-krds-info-base',
  success: 'text-krds-success-base',
  warning: 'text-krds-warning-base',
  error: 'text-krds-danger-base',
};

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
    title?: string;
    description?: string;
    duration?: number;
    open?: boolean;
    showIcon?: boolean;
    class?: string;
  }>(),
  {
    variant: 'default',
    duration: 5000,
    open: true,
    showIcon: true,
  }
);

const emit = defineEmits<{
  close: [];
  'update:open': [value: boolean];
}>();

const isVisible = ref(props.open);
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const IconComponent = computed(() => iconMap[props.variant]);
const iconColor = computed(() => iconColorMap[props.variant]);

const classes = computed(() => cn(toastVariants({ variant: props.variant }), props.class));

const closeClasses = computed(() => toastCloseVariants({ variant: props.variant }));

const handleClose = () => {
  isVisible.value = false;
  emit('close');
  emit('update:open', false);
};

onMounted(() => {
  if (props.duration > 0) {
    timeoutId = setTimeout(() => {
      handleClose();
    }, props.duration);
  }
});

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div v-if="isVisible" :class="classes" role="alert" aria-live="polite">
      <!-- Icon -->
      <component
        :is="IconComponent"
        v-if="showIcon"
        class="h-5 w-5 mt-0.5 shrink-0"
        :class="iconColor"
        aria-hidden="true"
      />

      <!-- Content -->
      <div class="flex-1 min-w-0 pr-6">
        <div v-if="title" class="font-semibold leading-tight">{{ title }}</div>
        <div v-if="description || $slots.default" class="text-sm opacity-90 mt-1">
          <slot>{{ description }}</slot>
        </div>
        <div v-if="$slots.action" class="mt-2">
          <slot name="action" />
        </div>
      </div>

      <!-- Close Button -->
      <button type="button" :class="closeClasses" aria-label="닫기" @click="handleClose">
        <X class="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  </Transition>
</template>
