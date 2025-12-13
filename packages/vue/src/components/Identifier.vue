<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    organizationName: string;
    logo?: string;
    logoAlt?: string;
    variant?: 'light' | 'dark';
    text?: string;
    class?: string;
  }>(),
  {
    variant: 'light',
    text: '이 누리집은 {organization} 누리집입니다.',
  }
);

const displayText = computed(() => props.text.replace('{organization}', props.organizationName));

const textClasses = computed(() =>
  cn(
    'text-[15px] whitespace-nowrap max-md:whitespace-normal max-md:break-keep',
    props.variant === 'dark' ? 'text-krds-gray-30' : 'text-krds-gray-70'
  )
);
</script>

<template>
  <div :class="cn('krds-identifier', 'flex items-center gap-3', props.class)">
    <span v-if="logo" class="inline-flex items-center justify-center flex-shrink-0">
      <img :src="logo" :alt="logoAlt || ''" loading="lazy" class="max-w-full h-auto max-h-6" />
    </span>
    <span v-if="$slots.logo" class="inline-flex items-center justify-center flex-shrink-0 w-16 h-6">
      <slot name="logo" />
    </span>
    <span :class="textClasses">
      {{ displayText }}
    </span>
  </div>
</template>
