<script setup lang="ts">
import { computed, ref } from 'vue';
import { cva } from 'class-variance-authority';
import { Info, CircleCheck, AlertTriangle, CircleX, X } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative flex items-start gap-3 rounded-lg border p-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        info: 'border-krds-info-20 bg-krds-info-5 text-krds-info-70 [&>svg]:text-krds-info-base',
        success:
          'border-krds-success-20 bg-krds-success-5 text-krds-success-70 [&>svg]:text-krds-success-base',
        warning:
          'border-krds-warning-20 bg-krds-warning-5 text-krds-warning-70 [&>svg]:text-krds-warning-base',
        error:
          'border-krds-danger-20 bg-krds-danger-5 text-krds-danger-70 [&>svg]:text-krds-danger-base',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const alertTitleVariants = cva('font-semibold leading-tight tracking-tight', {
  variants: {
    variant: {
      info: 'text-krds-info-70',
      success: 'text-krds-success-70',
      warning: 'text-krds-warning-70',
      error: 'text-krds-danger-70',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

const alertDescriptionVariants = cva('text-sm [&_p]:leading-relaxed', {
  variants: {
    variant: {
      info: 'text-krds-info-60',
      success: 'text-krds-success-60',
      warning: 'text-krds-warning-60',
      error: 'text-krds-danger-60',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

const closeButtonVariants = cva(
  'absolute right-3 top-3 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        info: 'hover:bg-krds-info-10 focus:ring-krds-info-base',
        success: 'hover:bg-krds-success-10 focus:ring-krds-success-base',
        warning: 'hover:bg-krds-warning-10 focus:ring-krds-warning-base',
        error: 'hover:bg-krds-danger-10 focus:ring-krds-danger-base',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const props = withDefaults(
  defineProps<{
    variant?: AlertVariant;
    title?: string;
    closable?: boolean;
    hideIcon?: boolean;
    role?: 'alert' | 'status';
    class?: string;
  }>(),
  {
    variant: 'info',
    closable: false,
    hideIcon: false,
    role: 'alert',
  }
);

const emit = defineEmits<{
  close: [];
}>();

const isVisible = ref(true);

const handleClose = () => {
  isVisible.value = false;
  emit('close');
};

const iconComponents = {
  info: Info,
  success: CircleCheck,
  warning: AlertTriangle,
  error: CircleX,
};

const IconComponent = computed(() => iconComponents[props.variant]);

const alertClasses = computed(() =>
  cn(alertVariants({ variant: props.variant }), props.closable && 'pr-10', props.class)
);

const titleClasses = computed(() => alertTitleVariants({ variant: props.variant }));

const descriptionClasses = computed(() =>
  cn(alertDescriptionVariants({ variant: props.variant }), props.title && 'mt-1')
);

const closeButtonClasses = computed(() => closeButtonVariants({ variant: props.variant }));
</script>

<template>
  <div
    v-if="isVisible"
    :role="role"
    :aria-live="role === 'alert' ? 'assertive' : 'polite'"
    aria-atomic="true"
    :class="alertClasses"
  >
    <component
      :is="IconComponent"
      v-if="!hideIcon"
      class="h-5 w-5 mt-0.5"
      aria-hidden="true"
    />
    <div class="flex-1 min-w-0">
      <h5 v-if="title" :class="titleClasses">{{ title }}</h5>
      <div :class="descriptionClasses">
        <slot />
      </div>
    </div>
    <button
      v-if="closable"
      type="button"
      :class="closeButtonClasses"
      @click="handleClose"
      aria-label="닫기"
    >
      <X class="h-4 w-4" aria-hidden="true" />
    </button>
  </div>
</template>
