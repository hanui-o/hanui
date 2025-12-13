<script setup lang="ts">
import { inject, computed, ref, watch, onMounted, nextTick } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: string;
}>();

const accordion = inject<{
  variant: 'default' | 'line';
  toggleItem: (value: string) => void;
  isOpen: (value: string) => boolean;
}>('accordion');

const accordionItem = inject<{
  value: string;
  variant: 'default' | 'line';
}>('accordionItem');

const isOpen = computed(() => accordion?.isOpen(accordionItem?.value || '') || false);

const contentRef = ref<HTMLDivElement | null>(null);
const height = ref<string>('0px');

const updateHeight = async () => {
  await nextTick();
  if (contentRef.value) {
    height.value = isOpen.value ? `${contentRef.value.scrollHeight}px` : '0px';
  }
};

watch(isOpen, updateHeight);

onMounted(() => {
  updateHeight();
});

const classes = computed(() =>
  cn(
    'overflow-hidden transition-all duration-200 ease-in-out',
    props.class
  )
);
</script>

<template>
  <div
    :class="classes"
    :style="{ height }"
    :aria-hidden="!isOpen"
    role="region"
  >
    <div ref="contentRef" class="p-4 text-krds-gray-70">
      <slot />
    </div>
  </div>
</template>
