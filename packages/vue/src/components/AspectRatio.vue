<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

type ResponsiveRatio = {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

const props = withDefaults(
  defineProps<{
    ratio?: number | ResponsiveRatio;
    class?: string;
  }>(),
  {
    ratio: 4 / 3,
  }
);

const isResponsive = computed(() => typeof props.ratio === 'object');

const containerStyle = computed(() => {
  if (isResponsive.value) return {};

  const ratio = props.ratio as number;
  return {
    position: 'relative' as const,
    paddingBottom: `${(1 / ratio) * 100}%`,
    height: 0,
    overflow: 'hidden' as const,
  };
});

const childWrapperStyle = computed(() => {
  if (isResponsive.value) return {};

  return {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };
});

const responsiveClasses = computed(() => {
  if (!isResponsive.value) return '';

  const ratio = props.ratio as ResponsiveRatio;
  const classes: string[] = [];

  if (ratio.base) {
    const baseRatio = `${Math.round(ratio.base * 100) / 100}`.replace('.', '/');
    classes.push(`aspect-[${baseRatio}]`);
  }
  if (ratio.sm) {
    const smRatio = `${Math.round(ratio.sm * 100) / 100}`.replace('.', '/');
    classes.push(`sm:aspect-[${smRatio}]`);
  }
  if (ratio.md) {
    const mdRatio = `${Math.round(ratio.md * 100) / 100}`.replace('.', '/');
    classes.push(`md:aspect-[${mdRatio}]`);
  }
  if (ratio.lg) {
    const lgRatio = `${Math.round(ratio.lg * 100) / 100}`.replace('.', '/');
    classes.push(`lg:aspect-[${lgRatio}]`);
  }
  if (ratio.xl) {
    const xlRatio = `${Math.round(ratio.xl * 100) / 100}`.replace('.', '/');
    classes.push(`xl:aspect-[${xlRatio}]`);
  }

  return classes.join(' ');
});

const classes = computed(() => cn('w-full', responsiveClasses.value, props.class));
</script>

<template>
  <div :class="classes" :style="containerStyle">
    <div :style="childWrapperStyle">
      <slot />
    </div>
  </div>
</template>
