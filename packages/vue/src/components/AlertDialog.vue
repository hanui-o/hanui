<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue';
import { cva } from 'class-variance-authority';
import { AlertTriangle, Info, CircleCheck, CircleX } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

const contentVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg sm:rounded-lg',
  {
    variants: {
      variant: {
        default: 'border-krds-gray-20',
        warning: 'border-krds-warning-20',
        danger: 'border-krds-danger-20',
        info: 'border-krds-info-20',
        success: 'border-krds-success-20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const actionVariants = cva(
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-krds-primary-base text-white hover:bg-krds-primary-60 focus:ring-krds-primary-base',
        danger: 'bg-krds-danger-base text-white hover:bg-krds-danger-60 focus:ring-krds-danger-base',
        warning: 'bg-krds-warning-base text-white hover:bg-krds-warning-60 focus:ring-krds-warning-base',
        success: 'bg-krds-success-base text-white hover:bg-krds-success-60 focus:ring-krds-success-base',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const iconMap = {
  default: null,
  warning: AlertTriangle,
  danger: CircleX,
  info: Info,
  success: CircleCheck,
};

const iconColorMap = {
  default: '',
  warning: 'text-krds-warning-base bg-krds-warning-10',
  danger: 'text-krds-danger-base bg-krds-danger-10',
  info: 'text-krds-info-base bg-krds-info-10',
  success: 'text-krds-success-base bg-krds-success-10',
};

const props = withDefaults(
  defineProps<{
    open?: boolean;
    variant?: 'default' | 'warning' | 'danger' | 'info' | 'success';
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    showIcon?: boolean;
    class?: string;
  }>(),
  {
    open: false,
    variant: 'default',
    confirmText: '확인',
    cancelText: '취소',
    showIcon: true,
  }
);

const emit = defineEmits<{
  'update:open': [value: boolean];
  confirm: [];
  cancel: [];
}>();

const IconComponent = computed(() => props.showIcon ? iconMap[props.variant] : null);

const actionVariant = computed(() => {
  if (props.variant === 'danger') return 'danger';
  if (props.variant === 'warning') return 'warning';
  if (props.variant === 'success') return 'success';
  return 'default';
});

const contentClasses = computed(() => cn(contentVariants({ variant: props.variant }), props.class));
const actionClasses = computed(() => actionVariants({ variant: actionVariant.value }));

const handleConfirm = () => {
  emit('confirm');
  emit('update:open', false);
};

const handleCancel = () => {
  emit('cancel');
  emit('update:open', false);
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open) {
    handleCancel();
  }
};

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 bg-black/50"
        @click="handleCancel"
      />
    </Transition>
    <Transition name="zoom">
      <div
        v-if="open"
        role="alertdialog"
        aria-modal="true"
        :aria-labelledby="title"
        :class="contentClasses"
      >
        <!-- Header -->
        <div
          :class="cn(
            'flex flex-col gap-2 text-center sm:text-left',
            IconComponent && 'sm:flex-row sm:items-start sm:gap-4'
          )"
        >
          <div
            v-if="IconComponent"
            :class="cn(
              'mx-auto sm:mx-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
              iconColorMap[variant]
            )"
          >
            <component :is="IconComponent" class="h-5 w-5" aria-hidden="true" />
          </div>
          <div class="flex flex-col gap-2">
            <h2 class="text-lg font-semibold text-krds-gray-95">{{ title }}</h2>
            <p v-if="description" class="text-sm text-krds-gray-70">{{ description }}</p>
          </div>
        </div>

        <!-- Custom content slot -->
        <slot />

        <!-- Footer -->
        <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-krds-gray-30 bg-white px-4 py-2 text-sm font-medium text-krds-gray-95 transition-colors hover:bg-krds-gray-5 focus:outline-none focus:ring-2 focus:ring-krds-gray-40 focus:ring-offset-2"
            @click="handleCancel"
          >
            {{ cancelText }}
          </button>
          <button
            type="button"
            :class="actionClasses"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.2s ease;
}
.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
}
</style>
