<script setup lang="ts">
import { inject, computed } from 'vue';
import { cn } from '@/lib/utils';
import type { ComputedRef } from 'vue';

const props = defineProps<{
  value: string;
  class?: string;
}>();

const tabsContext = inject<{
  value: ComputedRef<string>;
}>('tabsContext');

const isActive = computed(() => tabsContext?.value.value === props.value);
const panelId = computed(() => `tabpanel-${props.value}`);

const classes = computed(() => cn('pt-10 focus-visible:outline-none', props.class));
</script>

<template>
  <div
    v-if="isActive"
    role="tabpanel"
    :id="panelId"
    :aria-labelledby="`tab-${value}`"
    :class="classes"
  >
    <slot />
  </div>
</template>
