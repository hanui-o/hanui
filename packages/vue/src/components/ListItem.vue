<script setup lang="ts">
import { computed, inject } from 'vue';
import { cn } from '../lib/utils';

type ListVariant = 'unordered' | 'ordered' | 'ordered-alpha' | 'ordered-circle' | 'dash' | 'check';

interface ListContext {
  variant: ListVariant;
  level: 1 | 2 | 3;
}

const props = withDefaults(
  defineProps<{
    showIndicator?: boolean;
    class?: string;
  }>(),
  {
    showIndicator: true,
  }
);

const listContext = inject<ListContext>('listContext', {
  variant: 'unordered',
  level: 1,
});

const isOrdered = computed(() => listContext.variant === 'ordered');
const isOrderedAlpha = computed(() => listContext.variant === 'ordered-alpha');
const isOrderedCircle = computed(() => listContext.variant === 'ordered-circle');
const isDash = computed(() => listContext.variant === 'dash');
const isCheck = computed(() => listContext.variant === 'check');

const getIndicatorClass = () => {
  const { level } = listContext;

  if (level === 1) {
    if (isCheck.value) {
      return "before:content-['✓'] before:text-krds-gray-70 before:left-0";
    }
    if (isDash.value) {
      return "before:content-['−'] before:text-krds-gray-70 before:left-0";
    }
    return "before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full before:bg-krds-gray-70 before:top-[7px] before:left-0";
  }

  if (level === 2) {
    return "before:content-['−'] before:text-krds-gray-60 before:left-0";
  }

  return "before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full before:border before:border-krds-gray-50 before:top-[7px] before:left-0";
};

const itemStyle = computed(() => {
  if (isOrderedAlpha.value && props.showIndicator) {
    return { counterIncrement: 'alpha-counter' };
  }
  return {};
});

const classes = computed(() => {
  if (isOrdered.value) {
    return cn(
      props.showIndicator && 'list-decimal',
      !props.showIndicator && 'list-none',
      props.class
    );
  }

  if (isOrderedAlpha.value) {
    return cn(
      'list-none relative pl-6',
      props.showIndicator &&
        "before:absolute before:left-0 before:font-medium before:text-krds-gray-90 before:content-[counter(alpha-counter,lower-alpha)'.']",
      props.class
    );
  }

  if (isOrderedCircle.value) {
    return cn(
      'list-none relative pl-6',
      props.showIndicator &&
        'before:absolute before:left-0 before:font-medium before:text-krds-gray-90 [counter-increment:circle-counter] before:content-[counter(circle-counter,circled-decimal)]',
      props.class
    );
  }

  if (!props.showIndicator) {
    return cn('list-none', props.class);
  }

  return cn(
    'list-none relative pl-5',
    listContext.level === 3 && 'text-[15px]',
    'before:absolute before:font-bold',
    getIndicatorClass(),
    props.class
  );
});
</script>

<template>
  <li :class="classes" :style="itemStyle">
    <slot />
  </li>
</template>
