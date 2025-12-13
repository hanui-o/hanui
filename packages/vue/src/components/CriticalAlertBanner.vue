<script setup lang="ts">
/**
 * CriticalAlertBanner 컴포넌트
 * KRDS 긴급 공지 - 배너 스타일
 */
import { computed } from 'vue';
import { cn } from '@/lib/utils';
import type { CriticalAlertVariant } from './CriticalAlertItem.vue';

const props = withDefaults(
  defineProps<{
    /** 뱃지 variant */
    variant?: CriticalAlertVariant;
    /** 뱃지 레이블 텍스트 */
    label?: string;
    /** 공지 내용 */
    message: string;
    /** 링크 URL */
    href?: string;
    /** 링크 텍스트 */
    linkText?: string;
    /** 추가 클래스 */
    class?: string;
  }>(),
  {
    variant: 'info',
    linkText: '자세히 보기',
  }
);

const emit = defineEmits<{
  (e: 'linkClick'): void;
}>();

const defaultLabels: Record<CriticalAlertVariant, string> = {
  danger: '긴급',
  ok: '안전',
  info: '안내',
};

const bannerVariantStyles: Record<CriticalAlertVariant, string> = {
  danger: 'bg-krds-danger-base text-white',
  ok: 'bg-krds-success-base text-white',
  info: 'bg-krds-info-base text-white',
};

const displayLabel = computed(() => props.label || defaultLabels[props.variant]);

const bannerClasses = computed(() =>
  cn(
    'w-full py-3 px-4 sm:py-4',
    bannerVariantStyles[props.variant],
    props.class
  )
);
</script>

<template>
  <div
    role="alert"
    aria-live="polite"
    :class="bannerClasses"
  >
    <div class="max-w-[84.6rem] mx-auto flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
      <!-- 뱃지 -->
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/20 rounded text-krds-label-sm font-bold">
        <!-- 긴급 아이콘 -->
        <svg
          v-if="variant === 'danger'"
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M7 18v-6a5 5 0 1 1 10 0v6" />
          <path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1z" />
          <path d="M21 12h1" />
          <path d="M18.5 4.5 18 5" />
          <path d="M2 12h1" />
          <path d="M12 2v1" />
          <path d="m4.929 4.929.707.707" />
          <path d="M12 12v6" />
        </svg>
        <!-- 안전 아이콘 -->
        <svg
          v-if="variant === 'ok'"
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
        <!-- 안내 아이콘 -->
        <svg
          v-if="variant === 'info'"
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <span>{{ displayLabel }}</span>
      </span>

      <!-- 공지 내용 -->
      <p class="text-krds-body-md font-bold flex-1 text-center line-clamp-2">
        {{ message }}
      </p>

      <!-- 링크 -->
      <a
        v-if="href"
        :href="href"
        :class="cn(
          'inline-flex items-center gap-0.5 text-krds-body-sm font-medium',
          'underline underline-offset-2 hover:no-underline',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-current rounded'
        )"
        @click="emit('linkClick')"
      >
        {{ linkText }}
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </a>
    </div>
  </div>
</template>
