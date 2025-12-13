<script setup lang="ts">
/**
 * CriticalAlerts 컴포넌트
 * KRDS 긴급 공지 - 사용자에게 긴급하거나 중요한 정보를 전달하는 카드 리스트 컨테이너
 */
import { cn } from '@/lib/utils';

defineProps<{
  /** 추가 클래스 */
  class?: string;
}>();
</script>

<template>
  <div
    :class="cn(
      'main-urgent-wrap',
      'w-full',
      'max-w-[84.6rem]',
      'mx-auto',
      $props.class
    )"
  >
    <ul
      aria-label="긴급 공지 목록"
      class="krds-critical-alerts space-y-3"
    >
      <slot />
    </ul>
  </div>
</template>
