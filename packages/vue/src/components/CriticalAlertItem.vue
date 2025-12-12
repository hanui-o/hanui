<script setup lang="ts">
/**
 * CriticalAlertItem 컴포넌트
 * KRDS 긴급 공지 - 개별 공지 아이템
 */
import { computed } from 'vue';
import { cn } from '../utils';

export type CriticalAlertVariant = 'danger' | 'ok' | 'info';

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
    /** 아이콘 숨김 여부 */
    hideIcon?: boolean;
    /** 추가 클래스 */
    class?: string;
  }>(),
  {
    variant: 'info',
    linkText: '자세히 보기',
    hideIcon: false,
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

const badgeVariantStyles: Record<CriticalAlertVariant, string> = {
  danger: 'bg-krds-danger-base text-white',
  ok: 'bg-krds-success-base text-white',
  info: 'bg-krds-info-base text-white',
};

const displayLabel = computed(() => props.label || defaultLabels[props.variant]);

const badgeClasses = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-1.5',
    'min-w-[5rem] h-8 px-3',
    'rounded text-krds-label-sm font-bold shrink-0',
    badgeVariantStyles[props.variant]
  )
);

const linkClasses = cn(
  'inline-flex items-center gap-0.5',
  'text-krds-body-md text-krds-gray-60',
  'hover:text-krds-gray-90',
  'shrink-0',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-base focus-visible:ring-offset-2 rounded'
);
</script>

<template>
  <li
    :class="cn(
      'critical-alert-item',
      'bg-white',
      'border border-krds-gray-20',
      'rounded-lg',
      props.class
    )"
  >
    <div class="flex items-center gap-4 py-4 px-4 sm:px-6">
      <!-- 뱃지 -->
      <span :class="badgeClasses">
        <!-- 긴급 아이콘 -->
        <svg
          v-if="!hideIcon && variant === 'danger'"
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
          v-if="!hideIcon && variant === 'ok'"
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
          v-if="!hideIcon && variant === 'info'"
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
      <p class="flex-1 text-krds-body-md font-bold text-krds-gray-90 line-clamp-2">
        {{ message }}
      </p>

      <!-- 링크 버튼 -->
      <a
        v-if="href"
        :href="href"
        :class="linkClasses"
      >
        <span class="hidden sm:inline">{{ linkText }}</span>
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </a>
      <button
        v-else-if="$attrs.onLinkClick || emit"
        type="button"
        :class="linkClasses"
        @click="emit('linkClick')"
      >
        <span class="hidden sm:inline">{{ linkText }}</span>
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  </li>
</template>
