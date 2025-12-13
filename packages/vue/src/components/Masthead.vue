<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    text?: string;
    href?: string;
    class?: string;
  }>(),
  {
    text: '이 누리집은 대한민국 공식 전자정부 누리집입니다',
    href: 'https://www.gov.kr',
  }
);
</script>

<template>
  <div
    id="krds-masthead"
    :class="cn('w-full', 'bg-krds-primary-5', props.class)"
    role="banner"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <a
        :href="href"
        class="flex items-center gap-2 min-h-8 py-1 transition-opacity hover:opacity-80"
        aria-label="대한민국 정부포털 바로가기"
      >
        <img
          src="https://www.krds.go.kr/resources/img/component/icon/ico_flag.svg"
          alt=""
          class="w-5 h-5 shrink-0"
          aria-hidden="true"
        />
        <span class="text-krds-body-sm text-krds-gray-90 font-medium leading-[150%]">
          {{ text }}
        </span>
      </a>
    </div>
  </div>
</template>
