<script setup lang="ts">
import { computed, ref } from 'vue';
import { cn } from '@/lib/utils';

type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

const objectFitMap: Record<ObjectFit, string> = {
  contain: 'object-contain',
  cover: 'object-cover',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down',
};

const props = withDefaults(
  defineProps<{
    src: string;
    alt: string;
    loading?: 'eager' | 'lazy';
    fit?: ObjectFit;
    align?: string;
    fallbackSrc?: string;
    width?: number | string;
    height?: number | string;
    srcSet?: string;
    sizes?: string;
    class?: string;
  }>(),
  {
    loading: 'lazy',
  }
);

const emit = defineEmits<{
  error: [event: Event];
}>();

const hasError = ref(false);

const handleError = (e: Event) => {
  hasError.value = true;
  emit('error', e);
};

const fitClass = computed(() => (props.fit ? objectFitMap[props.fit] : ''));
const alignClass = computed(() => (props.align ? `object-[${props.align}]` : ''));

const defaultSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
const computedSizes = computed(() => (props.srcSet ? props.sizes || defaultSizes : undefined));

const classes = computed(() => cn(fitClass.value, alignClass.value, props.class));
</script>

<template>
  <!-- Fallback image when error -->
  <img
    v-if="hasError && fallbackSrc"
    :src="fallbackSrc"
    :alt="alt"
    :class="classes"
  />
  <!-- Normal image -->
  <img
    v-else
    :src="src"
    :srcset="srcSet"
    :sizes="computedSizes"
    :alt="alt"
    :loading="loading"
    decoding="async"
    :width="width"
    :height="height"
    :class="classes"
    @error="handleError"
  />
</template>
