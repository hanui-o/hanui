<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue';
import { X } from 'lucide-vue-next';
import { cn } from '../lib/utils';

const modalSizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
} as const;

const props = withDefaults(
  defineProps<{
    open: boolean;
    size?: keyof typeof modalSizes;
    class?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
  }>(),
  {
    size: 'md',
  }
);

const emit = defineEmits<{
  'update:open': [value: boolean];
  close: [];
}>();

const handleClose = () => {
  emit('update:open', false);
  emit('close');
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open) {
    handleClose();
  }
};

const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    handleClose();
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

const contentClasses = computed(() =>
  cn(
    'z-50 w-full',
    modalSizes[props.size],
    'relative',
    'bg-krds-white',
    'border border-krds-gray-30',
    'rounded-lg pt-14 px-10 pb-10',
    'shadow-lg',
    props.class
  )
);
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 bg-[#000000bf]"
        @click="handleOverlayClick"
      />
    </Transition>
    <Transition name="zoom">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="handleOverlayClick"
      >
        <div
          role="dialog"
          aria-modal="true"
          :aria-label="ariaLabel"
          :aria-labelledby="ariaLabelledby"
          :class="contentClasses"
          @click.stop
        >
          <slot />
          <button
            type="button"
            :class="cn(
              'absolute right-4 top-4 rounded-md w-10 h-10 p-1',
              'flex items-center justify-center',
              'text-krds-gray-90 hover:text-krds-gray-95',
              'focus:outline-none focus:ring-2 focus:ring-krds-primary-50 focus:ring-offset-2'
            )"
            @click="handleClose"
          >
            <span class="sr-only">닫기</span>
            <X class="h-6 w-6" aria-hidden="true" />
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
  transform: scale(0.95);
}
</style>
