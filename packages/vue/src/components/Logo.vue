<script setup lang="ts">
/**
 * Logo 컴포넌트
 * Header/Footer에서 공통으로 사용하는 로고 컴포넌트
 */
import { cn } from '@/lib/utils';

const DEFAULT_LOGO = 'https://www.krds.go.kr/resources/img/pattern/layout/head_logo.svg';
const DEFAULT_ALT = '대한민국정부';

const props = withDefaults(
  defineProps<{
    /** 로고 이미지 URL */
    src?: string;
    /** 로고 대체 텍스트 */
    alt?: string;
    /** 로고 클릭 시 이동할 URL */
    href?: string;
    /** 로고 컨테이너 className */
    class?: string;
    /** 로고 이미지 className */
    logoClass?: string;
  }>(),
  {
    src: DEFAULT_LOGO,
    alt: DEFAULT_ALT,
    href: '/',
  }
);
</script>

<template>
  <div :class="cn('flex items-center', props.class)">
    <a
      :href="href"
      :class="cn('inline-flex h-8 md:h-12', logoClass)"
      :aria-label="`${alt} 홈으로 이동`"
    >
      <img
        :src="src"
        :alt="alt"
        class="w-full h-full object-contain"
      />
    </a>
    <span v-if="$slots.slogan" class="inline-flex ml-3">
      <span class="sr-only">슬로건</span>
      <slot name="slogan" />
    </span>
  </div>
</template>
