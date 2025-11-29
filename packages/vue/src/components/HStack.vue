<script setup lang="ts">
import Stack from './Stack.vue';

type GapVariant = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

const props = withDefaults(
  defineProps<{
    gap?: GapVariant | number | string;
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
    class?: string;
  }>(),
  {
    gap: 'none',
    align: 'center',
    as: 'div',
  }
);
</script>

<template>
  <Stack
    direction="row"
    :gap="gap"
    :align="align"
    :justify="justify"
    :as="as"
    :class="props.class"
  >
    <slot />
  </Stack>
</template>
