<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted } from 'vue';

// Context
const DropdownMenuContextKey = Symbol('DropdownMenuContext');


const isOpen = ref(false);

const close = () => {
  isOpen.value = false;
};

provide(DropdownMenuContextKey, {
  get isOpen() {
    return isOpen.value;
  },
  close,
});

// Close on click outside
const menuRef = ref<HTMLElement | null>(null);

const handleClickOutside = (e: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

defineExpose({ isOpen, close });
</script>

<template>
  <div ref="menuRef" class="relative inline-block">
    <slot :is-open="isOpen" :toggle="() => (isOpen = !isOpen)" :close="close" />
  </div>
</template>
