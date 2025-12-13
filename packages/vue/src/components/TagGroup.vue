<script setup lang="ts">
/**
 * TagGroup 컴포넌트
 * 여러 태그를 그룹화하는 컨테이너
 */
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    /** 접근성 라벨 */
    label?: string;
    /** 간격 크기 */
    gap?: 'sm' | 'md' | 'lg';
    /** 추가 클래스 */
    class?: string;
  }>(),
  {
    gap: 'sm',
  }
);

const gapStyles: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
};

const classes = computed(() =>
  cn(
    'flex flex-wrap items-center',
    gapStyles[props.gap],
    props.class
  )
);
</script>

<template>
  <div
    role="group"
    :aria-label="label"
    :class="classes"
  >
    <slot />
  </div>
</template>
